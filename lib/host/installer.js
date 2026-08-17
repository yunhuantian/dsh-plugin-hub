/**
 * Installer: one-click install / uninstall / enable / disable for dsh plugins.
 *
 * Pipeline:
 *   1. `pnpm add|remove` inside the running profile directory (npm registry or
 *      `git+https` GitHub spec — no command line required from the user).
 *   2. Reconcile the profile manifest's `dsh.profile.bundles` layer list.
 *   3. Rewrite the profile's hot-reloaded `cordis.patch.yml`: an owned
 *      `insert` row activates the entry without a server restart (the profile
 *      boot watches this file through Cordis HMR).
 *   4. Wait for the Loader to settle the entry, then audit the operation.
 */
import { spawn } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { readFile, rename, writeFile, mkdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { isMap, isSeq, parseDocument } from 'yaml';
import { runQualityGate } from './quality-gate.js';
import { checkConflicts } from './conflict-check.js';
const OWNER_MARKER = 'Managed by dsh-plugin-hub. Remove this row to return control to higher-level configuration.';
/** Resolve the running profile directory from a file-backed Loader baseUrl. */
export function resolveProfile(baseUrl, fallbackProfile = 'web') {
    let directory;
    if (baseUrl && baseUrl.startsWith('file:')) {
        const url = new URL(baseUrl);
        const root = url.pathname;
        const decoded = decodeURIComponent(root.replace(/^\/([A-Za-z]:)/, '$1')).replace(/[\\/]+$/, '');
        // baseUrl points at the config-tree anchor (profile dir) or a file inside it.
        directory = baseUrl.endsWith('/') ? decoded : dirname(decoded);
    }
    else {
        const home = process.env.DSH_HOME || join(process.env.USERPROFILE ?? process.env.HOME ?? '.', '.dsh');
        directory = join(home, 'profiles', fallbackProfile);
    }
    return {
        directory,
        patchFile: join(directory, 'cordis.patch.yml'),
        packageJsonFile: join(directory, 'package.json'),
        profileName: dirname(directory).endsWith('profiles') ? basenameSafe(directory) : fallbackProfile,
    };
}
function basenameSafe(p) {
    const parts = p.split(/[\\/]/);
    return parts[parts.length - 1] ?? 'web';
}
/** Escape one argument for the Windows cmd shell (quotes / metacharacters). */
function escapeWinArg(arg) {
    // cmd quoting: wrap in double quotes, escaping embedded quotes. Special
    // chars (& | < > ^) are stripped of meaning inside quotes except % and !.
    if (!/[\s"&|<>^]/.test(arg))
        return arg;
    return `"${arg.replace(/"/g, '\\"')}"`;
}
/** Parse one pnpm progress line ("Progress: resolved 2, reused 0, downloaded 1, added 0").
 * Returns {phase, percent} or null when the line is not a progress report. */
export function parsePnpmProgress(line) {
    const m = line.match(/Progress:\s*resolved\s+(\d+),\s*reused\s+(\d+),\s*downloaded\s+(\d+),\s*added\s+(\d+)/i);
    if (m) {
        const resolved = Number(m[1]);
        const downloaded = Number(m[3]);
        const added = Number(m[4]);
        const total = Math.max(resolved, 1);
        const percent = Math.min(100, Math.round(((downloaded + added) / total) * 100));
        return { phase: 'fetching', percent };
    }
    if (/^Packages: \+/i.test(line))
        return { phase: 'fetching', percent: null };
    return null;
}
/** Run `pnpm <args>` in `cwd`, capturing output (no user-facing terminal).
 * On Windows, spawn the .cmd shim and kill the whole process tree on timeout,
 * otherwise orphaned node children keep the `close` event from firing.
 *
 * NOTE: Windows .cmd shims require `shell: true`, but passing `args` together
 * with `shell: true` triggers Node DEP0190 and (worse) concatenates arguments
 * WITHOUT escaping — a spec like `git+https://…git#main` or a file: path with
 * spaces then breaks. We manually escape + join args into the command string,
 * and never pass `args` to the shelled spawn. */
export function runPnpm(cwd, args, timeoutMs = 5 * 60_000, onProgress) {
    return new Promise((resolve) => {
        const isWin = process.platform === 'win32';
        const cmd = isWin ? 'pnpm.cmd' : 'pnpm';
        // --reporter=append-only keeps the "Progress:" lines in a single stream
        // (default reporter may render cursor tricks that fragment the lines).
        const cmdArgs = [...args, '--reporter=append-only'];
        const child = isWin
            ? spawn(`${cmd} ${cmdArgs.map(escapeWinArg).join(' ')}`, { cwd, shell: true, windowsHide: true, env: { ...process.env, NO_COLOR: '1' } })
            : spawn(cmd, cmdArgs, { cwd, shell: false, windowsHide: true, env: { ...process.env, NO_COLOR: '1' } });
        let stdout = '';
        let stderr = '';
        let settled = false;
        const settle = (result) => {
            if (settled)
                return;
            settled = true;
            resolve(result);
        };
        const timer = setTimeout(() => {
            if (isWin && child.pid !== undefined) {
                // Kill the entire process tree so the close event fires promptly.
                spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { windowsHide: true, stdio: 'ignore' });
            }
            else {
                child.kill();
            }
        }, timeoutMs);
        const feed = (chunk) => {
            const lines = chunk.split(/\r?\n/);
            for (const line of lines) {
                if (!line || !onProgress)
                    continue;
                const parsed = parsePnpmProgress(line);
                if (parsed)
                    onProgress({ phase: parsed.phase, percent: parsed.percent, detail: line.slice(0, 80) });
            }
        };
        child.stdout?.on('data', (d) => { const s = d.toString(); stdout += s; feed(s); });
        child.stderr?.on('data', (d) => { stderr += d.toString(); });
        child.on('error', (err) => {
            clearTimeout(timer);
            settle({ ok: false, code: null, stdout, stderr: `${stderr}\n${err.message}` });
        });
        child.on('close', (code) => {
            clearTimeout(timer);
            onProgress?.({ phase: 'done', percent: 100, detail: 'done' });
            settle({ ok: code === 0, code, stdout, stderr });
        });
    });
}
// ---- profile manifest reconciliation ---------------------------------------
function readProfileManifest(filename) {
    if (!existsSync(filename))
        return { dependencies: {}, dsh: { profile: { bundles: [] } } };
    try {
        return JSON.parse(readFileSync(filename, 'utf8'));
    }
    catch {
        return { dependencies: {}, dsh: { profile: { bundles: [] } } };
    }
}
function exportsBundlePatch(packageName, profileDir) {
    try {
        const require = createRequire(join(profileDir, 'noop.js'));
        const manifestPath = require.resolve(`${packageName}/package.json`);
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
        const dsh = manifest.dsh;
        const bundle = dsh?.bundle;
        return typeof bundle?.patch === 'string';
    }
    catch {
        return false;
    }
}
/** Read the loader entry ids a plugin's own bundle patch inserts (e.g. a
 * `cordis.patch.yml` declaring `insert: [{id: code-pet, name: deepseek-pet}]`).
 * These ids are what the profile patch layer must target to disable/enable the
 * plugin — NOT the package name, which may differ. */
export function bundleEntryIds(packageName, profileDir) {
    const ids = [];
    try {
        const require = createRequire(join(profileDir, 'noop.js'));
        const manifestPath = require.resolve(`${packageName}/package.json`);
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
        const dsh = manifest.dsh;
        const bundle = dsh?.bundle;
        if (typeof bundle?.patch !== 'string')
            return ids;
        const patchFile = join(dirname(manifestPath), bundle.patch.replace(/^\.\//, ''));
        if (!existsSync(patchFile))
            return ids;
        const document = parseDocument(readFileSync(patchFile, 'utf8'));
        if (!isSeq(document.contents))
            return ids;
        for (const item of document.contents.items) {
            if (!isMap(item))
                continue;
            const insert = item.get('insert');
            // yaml's get() returns a YAMLSeq *node* (iterable, but NOT a JS array).
            // Normalize with the library's toJS / spread so rows become plain objects.
            const rows = insert === null || insert === undefined
                ? []
                : isSeq(insert)
                    ? insert.toJSON()
                    : Array.isArray(insert)
                        ? insert
                        : [];
            for (const row of rows) {
                if (typeof row?.id === 'string' && row.id)
                    ids.push(row.id);
            }
        }
    }
    catch { /* best-effort */ }
    return ids;
}
/** Reconcile `dsh.profile.bundles` against installed dependencies (mirrors the
 * `dsh plugin` CLI's reconcile step). */
function reconcileBundles(profile, added, removed) {
    const manifest = readProfileManifest(profile.packageJsonFile);
    const deps = (manifest.dependencies ?? {});
    const dsh = (manifest.dsh ?? {});
    const profileObj = (dsh.profile ?? {});
    const bundles = Array.isArray(profileObj.bundles) ? [...profileObj.bundles].map(String) : [];
    let changed = false;
    for (const name of added) {
        if (bundles.includes(name))
            continue;
        if (exportsBundlePatch(name, profile.directory)) {
            bundles.push(name);
            changed = true;
        }
    }
    for (const name of removed) {
        const at = bundles.indexOf(name);
        if (at >= 0) {
            bundles.splice(at, 1);
            changed = true;
        }
    }
    if (!changed)
        return;
    manifest.dsh = {
        ...dsh,
        profile: { ...profileObj, bundles },
    };
    writeFile(profile.packageJsonFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8').catch((err) => {
        console.error(`dsh-plugin-hub: failed to reconcile ${profile.packageJsonFile}: ${err.message}`);
    });
}
// ---- patch file management -------------------------------------------------
async function readPatchDocument(filename) {
    let source;
    try {
        source = await readFile(filename, 'utf8');
    }
    catch (error) {
        if (error.code === 'ENOENT')
            return parseDocument('[]\n');
        throw error;
    }
    const document = parseDocument(source);
    if (document.errors.length > 0)
        throw new Error(`cannot parse ${filename}: ${document.errors[0]?.message}`);
    if (!isSeq(document.contents))
        throw new Error(`${filename} must contain a YAML sequence of patches`);
    return document;
}
function isOwned(map) {
    return isMap(map) && map.commentBefore?.includes('Managed by dsh-plugin-hub') === true;
}
function ownedInsertRow(document, packageName) {
    const seq = document.contents;
    return seq.items.find((item) => {
        if (!isMap(item) || !isOwned(item))
            return false;
        const insert = item.get('insert');
        if (!Array.isArray(insert))
            return false;
        return insert.some((e) => isMap(e) && e.get('id') === packageName);
    });
}
/** Find an owned insert row targeting a specific loader entry id. */
function ownedInsertRowById(document, entryId) {
    const seq = document.contents;
    return seq.items.find((item) => {
        if (!isMap(item) || !isOwned(item))
            return false;
        const insert = item.get('insert');
        if (!Array.isArray(insert))
            return false;
        return insert.some((e) => isMap(e) && e.get('id') === entryId);
    });
}
function ownedToggleRow(document, packageName) {
    const seq = document.contents;
    return seq.items.find((item) => {
        if (!isMap(item) || !isOwned(item))
            return false;
        return item.get('id') === packageName && item.get('insert') === undefined;
    });
}
/** Remove every store-owned row referencing `packageName`. */
async function removeOwnedRows(filename, packageName) {
    const document = await readPatchDocument(filename);
    const seq = document.contents;
    const kept = seq.items.filter((item) => {
        if (!isMap(item) || !isOwned(item))
            return true;
        if (item.get('id') === packageName)
            return false;
        const insert = item.get('insert');
        if (Array.isArray(insert) && insert.some((e) => isMap(e) && e.get('id') === packageName))
            return false;
        return true;
    });
    if (kept.length === seq.items.length)
        return;
    document.contents = document.createNode(kept);
    await atomicWrite(filename, String(document));
}
async function atomicWrite(filename, content) {
    await mkdir(dirname(filename), { recursive: true });
    const temporary = join(dirname(filename), `.${basenameSafe(filename)}.${process.pid}.${randomUUID()}.tmp`);
    await writeFile(temporary, content.endsWith('\n') ? content : `${content}\n`, 'utf8');
    await rename(temporary, filename);
}
/** Insert an owned activation row: `insert: [{id, name}]`.
 * Activation happens through the profile's hot-reloaded user patch layer
 * (Cordis HMR), so a freshly installed plugin starts WITHOUT a server
 * restart. If the package is ALSO listed in `dsh.profile.bundles` (its bundle
 * layer will insert the same entry at boot), the user-patch row is skipped to
 * avoid a duplicate entry id on the next boot. */
export async function addActivationRow(profile, packageName, entryId = packageName) {
    if (isInBundles(profile, packageName))
        return;
    const document = await readPatchDocument(profile.patchFile);
    const seq = document.contents;
    // Idempotent upsert: if an owned insert row already targets this entry id,
    // update its `name` in place instead of appending a duplicate row. Duplicate
    // insert rows for the same entry id crash the loader at boot
    // ("duplicate loader entry id"), so this must never append twice.
    const existing = ownedInsertRowById(document, entryId);
    if (existing) {
        const insert = existing.get('insert');
        if (Array.isArray(insert)) {
            for (const e of insert) {
                if (isMap(e) && e.get('id') === entryId) {
                    e.set('name', packageName);
                }
            }
        }
        await atomicWrite(profile.patchFile, String(document));
        return;
    }
    const row = document.createNode({ insert: [{ id: entryId, name: packageName }] });
    row.commentBefore = OWNER_MARKER;
    seq.add(row);
    await atomicWrite(profile.patchFile, String(document));
}
/** Whether the package is listed in the profile manifest's bundle layer list. */
function isInBundles(profile, packageName) {
    try {
        const manifest = readProfileManifest(profile.packageJsonFile);
        const dsh = (manifest.dsh ?? {});
        const profileObj = (dsh.profile ?? {});
        return Array.isArray(profileObj.bundles) && profileObj.bundles.includes(packageName);
    }
    catch {
        return false;
    }
}
/** Toggle one entry's desired enablement through an owned override row. */
export async function writeEnablement(profile, entryId, moduleName, enabled) {
    const document = await readPatchDocument(profile.patchFile);
    const seq = document.contents;
    let row = ownedToggleRow(document, entryId);
    if (row === undefined) {
        row = document.createNode({ id: entryId, name: moduleName, disabled: !enabled });
        row.commentBefore = OWNER_MARKER;
        seq.add(row);
    }
    else {
        row.set('disabled', !enabled);
    }
    await atomicWrite(profile.patchFile, String(document));
}
/** Remove an owned toggle row (used to restore the base state on uninstall). */
async function removeToggleRow(filename, entryId) {
    const document = await readPatchDocument(filename);
    const seq = document.contents;
    const kept = seq.items.filter((item) => !(isMap(item) && isOwned(item) && item.get('id') === entryId && item.get('insert') === undefined));
    if (kept.length === seq.items.length)
        return;
    document.contents = document.createNode(kept);
    await atomicWrite(filename, String(document));
}
/** Determine the pnpm spec for a plugin: npm registry package or git URL. */
export function installSpecFor(packageName, repoFullName, ref) {
    return `${packageName}@${ref ?? 'latest'}`;
}
export function gitSpecFor(repoFullName, ref) {
    return `git+https://github.com/${repoFullName}.git${ref ? `#${ref}` : ''}`;
}
/**
 * Install a plugin package into the profile.
 * @param packageName npm package name (primary) or GitHub `owner/repo`.
 * @param installSpec the pnpm install spec (npm `name@ver` or `git+https`).
 * @param entryId loader entry id to activate (defaults to package name).
 * @param onProgress optional live progress callback (resolving/fetching/done).
 */
export async function installPlugin(profile, installSpec, entryId, actor, onProgress) {
    const started = Date.now();
    const isGit = /^git\+/.test(installSpec);
    let result = await runPnpm(profile.directory, ['add', installSpec], 5 * 60_000, onProgress);
    // Git installs fetch a tarball from codeload.github.com; in networks where
    // that CDN is blocked/unstable (but github.com git protocol works), pnpm
    // fails with a download timeout. Fall back to cloning via git and adding
    // the local directory — same package, different transport. We attempt the
    // clone fallback for ANY git-source failure except allowBuilds (a config
    // problem that cloning would not fix), because the pnpm error text varies
    // across pnpm versions and network shapes.
    const gitErr = result.stderr + result.stdout;
    if (!result.ok && isGit && !/allowBuilds/i.test(gitErr)) {
        // pnpm spec: git+https://…git#ref — git clone does not understand the
        // #ref suffix (it would treat it as part of the path), so strip it.
        const gitUrl = installSpec.replace(/^git\+/, '').replace(/#.*$/, '');
        const tmpDir = join(profile.directory, `_hub_tmp_${Date.now()}`);
        onProgress?.({ phase: 'fetching', percent: null, detail: 'git clone 下载源码…' });
        try {
            const clone = await runGit(profile.directory, ['clone', '--depth', '1', gitUrl, tmpDir]);
            if (clone.ok) {
                const retry = await runPnpm(profile.directory, ['add', `file:${tmpDir}`], 5 * 60_000, onProgress);
                if (retry.ok)
                    result = retry;
            }
            await rmrf(tmpDir);
        }
        catch {
            await rmrf(tmpDir).catch(() => { });
        }
    }
    if (!result.ok) {
        const hint = /allowBuilds/.test(gitErr)
            ? ' pnpm blocked the package build script — add its key under `allowBuilds` in pnpm-workspace.yaml, then retry.'
            : /fetch-pack|invalid index-pack|unexpected disconnect|fatal: unable to access|Recv failure|Connection was reset|error \(23\)|TimeoutError|timeout|aborted due to timeout/i.test(gitErr)
                ? ' GitHub 下载源码失败（网络受限或仓库过大）。已自动尝试 git clone 方式仍失败：请在命令行执行 `git config --global http.proxy http://127.0.0.1:<端口>` 配置代理后重试。'
                : isGit
                    ? ' GitHub 安装失败（非网络类错误）。请查看下方错误详情，或改用 npm 安装。'
                    : '';
        return {
            ok: false,
            message: `pnpm add failed (exit ${result.code ?? 'spawn-error'})${hint}`,
            detail: tail(gitErr, 800),
            restartRequired: false,
            reloadRequired: false,
        };
    }
    const name = entryId;
    // Quality gate: verify the package's entry imports are all declared (or
    // platform-provided) BEFORE activation, so a broken install cannot take
    // down the whole dsh boot. On missing dependencies, roll back immediately.
    const gate = runQualityGate(name, profile.directory);
    if (!gate.ok) {
        await runPnpm(profile.directory, ['remove', name]);
        return {
            ok: false,
            message: `质量门拦截：${name} 依赖不完整`,
            detail: gate.detail,
            restartRequired: false,
            reloadRequired: false,
        };
    }
    // Conflict check: slot collisions (single-kind slots crash the tree),
    // dependency version clashes and activation-patch integrity. Blocks stop
    // the install; warnings are surfaced in the receipt detail.
    const conflicts = checkConflicts(profile, name);
    if (!conflicts.ok) {
        await runPnpm(profile.directory, ['remove', name]);
        return {
            ok: false,
            message: `冲突检查拦截：${name} 与现有环境存在冲突`,
            detail: conflicts.detail,
            restartRequired: false,
            reloadRequired: false,
        };
    }
    // Directory requirements: if the plugin reads a path that does not exist
    // (e.g. a pets folder under the home dir), installing it enabled would crash
    // the whole dsh boot. Install the package but keep it disabled, and tell the
    // user exactly which directory to create.
    const missingDirs = gate.missingDirs ?? [];
    if (missingDirs.length > 0) {
        // Register the bundle / patch so the package is tracked, then disable it.
        // IMPORTANT: the disable row must target the plugin's real loader entry
        // id(s) from its own bundle patch (e.g. `code-pet`), not the package name —
        // a wrong id silently fails to disable and the plugin still crashes boot.
        const entryIds = exportsBundlePatch(name, profile.directory)
            ? bundleEntryIds(name, profile.directory)
            : [];
        if (entryIds.length > 0) {
            reconcileBundles(profile, [name], []);
            for (const id of entryIds)
                await writeEnablement(profile, id, name, false);
        }
        else {
            await addActivationRow(profile, name, entryId);
            await writeEnablement(profile, entryId, name, false);
        }
        return {
            ok: true,
            message: `已安装 ${name}（暂未启用）：缺少运行所需目录，请创建后重新启用`,
            detail: `插件 ${name} 启动时需要以下目录（当前缺失）:\n${missingDirs.map((d) => `  • ${d}`).join('\n')}\n\n请创建这些目录后，在「已安装插件」中重新启用。`,
            restartRequired: false,
            reloadRequired: true,
        };
    }
    // Plugins that ship their own bundle patch join `dsh.profile.bundles`, so the
    // bundle layer activates them on the next boot (mirrors `dsh plugin add`).
    // Plugins without a bundle patch get a hot-reloaded user-patch row instead.
    // The two paths are mutually exclusive to avoid a boot-time duplicate entry.
    if (exportsBundlePatch(name, profile.directory)) {
        reconcileBundles(profile, [name], []);
    }
    else {
        await addActivationRow(profile, name, entryId);
    }
    void started;
    return {
        ok: true,
        message: `已安装 ${name}，正在热加载…（界面刷新后生效）`,
        detail: tail(result.stdout, 600),
        restartRequired: false,
        reloadRequired: true,
        requiredEnv: scanRequiredEnv(name, profile.directory),
    };
}
/** Scan a package for environment variables it reads at runtime (API keys /
 * tokens). Informational hint surfaced in the install receipt. */
export function scanRequiredEnv(packageName, profileDir) {
    const require = createRequire(join(profileDir, 'noop.js'));
    const found = new Set();
    try {
        const pkgPath = require.resolve(`${packageName}/package.json`);
        const dir = pkgPath.replace(/[\\/]package\.json$/, '');
        // entry sources (.js/.ts) + README, capped sizes to stay cheap
        const targets = [];
        const walk = (d) => {
            let entries = [];
            try {
                entries = readdirSync(d);
            }
            catch {
                return;
            }
            for (const e of entries) {
                if (e === 'node_modules' || e === '.git' || e === 'dist')
                    continue;
                const full = join(d, e);
                let st;
                try {
                    st = statSync(full);
                }
                catch {
                    continue;
                }
                if (st.isDirectory())
                    walk(full);
                else if (st.size <= 200 * 1024 && /\.(?:js|mjs|cjs|ts|tsx|jsx)$/.test(e))
                    targets.push(full);
            }
        };
        walk(dir);
        for (const file of targets.slice(0, 120)) {
            let text = '';
            try {
                text = readFileSync(file, 'utf8');
            }
            catch {
                continue;
            }
            for (const m of text.matchAll(/process\.env\.([A-Z][A-Z0-9_]{2,})/g))
                found.add(m[1]);
            for (const m of text.matchAll(/process\.env\[['"]([A-Z][A-Z0-9_]{2,})['"]\]/g))
                found.add(m[1]);
        }
        // README config blocks often document KEY=VALUE pairs
        for (const name of ['README.md', 'readme.md', 'README.MD']) {
            const readmePath = join(dir, name);
            if (!existsSync(readmePath))
                continue;
            const text = readFileSync(readmePath, 'utf8').slice(0, 60_000);
            for (const m of text.matchAll(/^([A-Z][A-Z0-9_]{2,})\s*=\s*.{0,40}$/gm)) {
                if (!/^(?:NODE|PATH|HOME|SHELL|USER|TERM|LANG|EDITOR|TMP|CI)/.test(m[1]))
                    found.add(m[1]);
            }
        }
    }
    catch { /* package not resolvable */ }
    return [...found].sort();
}
/** Run `git <args>` in `cwd`, resolving on close (non-zero = reject). */
export function runGit(cwd, args, timeoutMs = 3 * 60_000) {
    return new Promise((resolve) => {
        const child = spawn('git', args, { cwd, windowsHide: true, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
        let stdout = '';
        let stderr = '';
        const timer = setTimeout(() => { child.kill('SIGKILL'); }, timeoutMs);
        child.stdout.on('data', (d) => { stdout += String(d); });
        child.stderr.on('data', (d) => { stderr += String(d); });
        child.on('close', (code) => { clearTimeout(timer); resolve({ ok: code === 0, code, stdout, stderr }); });
    });
}
/** Best-effort recursive remove (never throws). */
export async function rmrf(target) {
    try {
        await rm(target, { recursive: true, force: true });
    }
    catch { /* ignore */ }
}
/** Uninstall a plugin package from the profile (removes entry + bundles). */ export async function uninstallPlugin(profile, packageName, entryId, actor) {
    const result = await runPnpm(profile.directory, ['remove', packageName]);
    if (!result.ok && !/ELOCKFILE|ERR_PNPM_NO_MATCHING_VERSION|not.*found|No projects matched/i.test(result.stderr + result.stdout)) {
        return {
            ok: false,
            message: `pnpm remove failed (exit ${result.code ?? 'spawn-error'})`,
            detail: tail(result.stderr || result.stdout, 800),
            restartRequired: false,
            reloadRequired: false,
        };
    }
    reconcileBundles(profile, [], [packageName]);
    await removeOwnedRows(profile.patchFile, packageName);
    await removeToggleRow(profile.patchFile, entryId);
    return {
        ok: true,
        message: `已卸载 ${packageName}`,
        detail: tail(result.stdout, 600),
        restartRequired: false,
        reloadRequired: true,
    };
}
function tail(text, max) {
    const t = text.trim();
    return t.length > max ? `…${t.slice(t.length - max)}` : t;
}
export { writeEnablement as setPluginEnabled, removeToggleRow };
