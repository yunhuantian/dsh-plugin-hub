/**
 * 0.1.4 install-time conflict checks — run right after the quality gate.
 *
 * 1) slot conflicts: a plugin registering into a *single*-kind slot that is
 *    already owned by an installed plugin (or the platform) would crash the
 *    whole tree — we blocked on exactly this with `details`. List-kind slots
 *    (conversation.view, settings.section, …) are multi-registrant and safe.
 * 2) dependency version conflicts: the new plugin depends on the same package
 *    as an installed plugin but with a different spec → pnpm installs two
 *    copies, which can cause subtle behavioural bugs (warning, not blocked).
 * 3) activation patch integrity: a dsh.bundle.patch `insert` row must resolve
 *    to an installed dependency or a platform/loader entry — otherwise the
 *    loader crashes on next boot (the @dsh-external/turn-rewind incident).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
/** Slots that accept a single registrant — a second registration breaks dsh. */
const SINGLE_SLOTS = new Set(['details']);
/** Skip scanning these dirs inside a plugin package. */
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', 'lib', 'out']);
const MAX_FILE = 200 * 1024;
const SLOT_RE = /slots\.inject\(\s*['"]([^'"]+)['"]/g;
function walkFiles(dir, base, out) {
    let entries;
    try {
        entries = readdirSync(dir);
    }
    catch {
        return;
    }
    for (const name of entries) {
        if (SKIP_DIRS.has(name))
            continue;
        const full = join(dir, name);
        let st;
        try {
            st = statSync(full);
        }
        catch {
            continue;
        }
        if (st.isDirectory())
            walkFiles(full, base, out);
        else if (st.isFile() && st.size <= MAX_FILE && /\.(?:js|mjs|cjs|ts|tsx|jsx)$/.test(name))
            out.push(full);
    }
}
/** Extract slot names a plugin registers into (scan its client sources). */
export function scanRegisteredSlots(profile, packageName) {
    const slots = new Set();
    const require = createRequire(join(profile.directory, 'noop.js'));
    let pkgPath = null;
    try {
        pkgPath = require.resolve(`${packageName}/package.json`);
    }
    catch {
        return slots;
    }
    const dir = pkgPath.replace(/[\\/]package\.json$/, '');
    const files = [];
    walkFiles(dir, dir, files);
    // Also read the package.json `dsh.client` main if present.
    let pkg = {};
    try {
        pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    }
    catch { /* noop */ }
    const client = pkg.dsh?.client;
    if (client && typeof client.main === 'string') {
        try {
            files.push(join(dir, client.main));
        }
        catch { /* noop */ }
    }
    for (const file of files.slice(0, 300)) {
        let text = '';
        try {
            text = readFileSync(file, 'utf8');
        }
        catch {
            continue;
        }
        SLOT_RE.lastIndex = 0;
        for (let m = SLOT_RE.exec(text); m; m = SLOT_RE.exec(text))
            slots.add(m[1]);
    }
    return slots;
}
/** Read a plugin's dependencies (own manifest). */
function pluginDeps(profile, packageName) {
    const require = createRequire(join(profile.directory, 'noop.js'));
    try {
        const pkgPath = require.resolve(`${packageName}/package.json`);
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
        return (pkg.dependencies ?? {});
    }
    catch {
        return {};
    }
}
/** Installed dependency keys of the profile (other than the package itself). */
function installedDepNames(profile, except) {
    const set = new Set();
    try {
        const manifest = JSON.parse(readFileSync(profile.packageJsonFile, 'utf8'));
        const deps = (manifest.dependencies ?? {});
        for (const name of Object.keys(deps))
            if (name !== except)
                set.add(name);
    }
    catch { /* unreadable */ }
    return set;
}
/** Check the new plugin's activation patch references resolvable packages. */
function checkPatchIntegrity(profile, packageName) {
    const problems = [];
    const require = createRequire(join(profile.directory, 'noop.js'));
    let pkgPath = null;
    try {
        pkgPath = require.resolve(`${packageName}/package.json`);
    }
    catch {
        return problems;
    }
    let pkg = {};
    try {
        pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    }
    catch {
        return problems;
    }
    const bundle = pkg.dsh?.bundle;
    const patchRef = bundle?.patch;
    if (typeof patchRef !== 'string' || !patchRef)
        return problems;
    const dir = pkgPath.replace(/[\\/]package\.json$/, '');
    const patchFile = join(dir, patchRef);
    let patchText = '';
    try {
        patchText = readFileSync(patchFile, 'utf8');
    }
    catch {
        return problems;
    }
    const installed = installedDepNames(profile, packageName);
    const insertNames = new Set();
    for (const m of patchText.matchAll(/insert:\s*\[?[^\n]*|name:\s*([^\s,}]+)/g)) {
        if (m[1])
            insertNames.add(m[1]);
    }
    for (const name of insertNames) {
        if (installed.has(name))
            continue;
        // platform / loader entry ids (base bundles) are provided by the app.
        if (/^@deepseek-ai\//.test(name) || /^(api-gateway|api-remotes|connection|client-hmr|client-locale|client-modules|client-runtime|hmr|include|locale|modules|runtime|timer|webserver|cordis-host-runner|ui-settings)$/.test(name))
            continue;
        problems.push(`激活补丁引用了未安装的包 ${name}（启动时 loader 将找不到它）`);
    }
    return problems;
}
/** Full conflict check for a package about to be installed. */
export function checkConflicts(profile, packageName) {
    const findings = [];
    const others = installedDepNames(profile, packageName);
    // 1) slot conflicts against installed plugins + platform singles.
    const mySlots = scanRegisteredSlots(profile, packageName);
    const ownSingle = [...mySlots].filter((s) => SINGLE_SLOTS.has(s));
    if (ownSingle.length > 0) {
        findings.push({
            kind: 'slot',
            severity: 'block',
            message: `注册了独占槽位 ${ownSingle.join('、')}（该槽位已被 dsh 平台占用，二次注入会导致插件树崩溃）`,
        });
    }
    for (const other of others) {
        const otherSlots = scanRegisteredSlots(profile, other);
        const shared = [...mySlots].filter((s) => SINGLE_SLOTS.has(s) && otherSlots.has(s));
        if (shared.length > 0) {
            findings.push({
                kind: 'slot',
                severity: 'block',
                message: `与已安装插件 ${other} 冲突：两者都注册了独占槽位 ${shared.join('、')}`,
            });
        }
    }
    // 2) dependency version conflicts (warning only).
    const myDeps = pluginDeps(profile, packageName);
    for (const other of others) {
        const otherDeps = pluginDeps(profile, other);
        for (const [dep, spec] of Object.entries(myDeps)) {
            const otherSpec = otherDeps[dep];
            if (otherSpec !== undefined && otherSpec !== spec) {
                findings.push({
                    kind: 'dep-version',
                    severity: 'warning',
                    message: `依赖 ${dep} 版本不一致：新插件 ${spec} vs 已装插件 ${other} 使用 ${otherSpec}（将安装两份，可能行为异常）`,
                });
            }
        }
    }
    // 3) activation patch integrity (block).
    for (const problem of checkPatchIntegrity(profile, packageName)) {
        findings.push({ kind: 'patch-integrity', severity: 'block', message: problem });
    }
    const blocked = findings.filter((f) => f.severity === 'block');
    return {
        ok: blocked.length === 0,
        findings,
        detail: findings.map((f) => `${f.severity === 'block' ? '⛔' : '⚠️'} ${f.message}`).join('\n'),
    };
}
