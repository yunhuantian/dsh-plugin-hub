/**
 * Quality gate: before a freshly installed plugin is activated, scan its entry
 * code for module imports and verify every external module is declared (or is
 * a known platform/builtin module). Plugins with undeclared runtime imports are
 * blocked so a broken install cannot take down the whole dsh boot.
 *
 * The scan is best-effort: it reads the package's `main` entry (and a small
 * closure of sibling files referenced through relative imports, up to a depth
 * of 2) and collects bare specifiers. Node builtins (`node:*`), the
 * `@deepseek-ai/*` platform surface, and relative paths are always allowed.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';

/** Platform modules the dsh runtime always provides — never a missing dep. */
const PLATFORM_PREFIXES = [
  '@deepseek-ai/',
  '@cordisjs/',
  'cordis',
  'schemastery',
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
];

/** Node builtin specifiers that never need a dependency entry. */
function isBuiltin(spec: string): boolean {
  if (spec.startsWith('node:')) return true;
  return ['fs', 'fs/promises', 'path', 'os', 'url', 'util', 'events', 'stream', 'buffer', 'crypto', 'child_process', 'module', 'process', 'assert', 'net', 'http', 'https', 'zlib', 'querystring', 'readline', 'tty', 'worker_threads', 'timers', 'string_decoder', 'dns', 'perf_hooks', 'constants', 'console', 'cluster', 'domain', 'inspector', 'repl', 'tls', 'trace_events', 'v8', 'vm', 'wasi', 'test', 'sqlite'].includes(spec);
}

/** Extract bare (non-relative, non-builtin) module specifiers from source. */
function extractSpecifiers(source: string): Set<string> {
  const found = new Set<string>();
  const re = /\b(?:from|import|require)\s*\(?\s*['"]([^'"]+)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    const spec = m[1];
    if (!spec) continue;
    if (spec.startsWith('.') || spec.startsWith('node:') || spec.startsWith('#')) continue;
    if (spec.includes('?') || spec.includes('&')) continue;
    // Strip subpath (e.g. @deepseek-ai/dsh-client-runtime/dist/index.js -> package root)
    const bare = spec.startsWith('@')
      ? spec.split('/').slice(0, 2).join('/')
      : spec.split('/')[0];
    found.add(bare);
  }
  return found;
}

/** Read a JS file at most once (cache by resolved path). */
const readCache = new Map<string, string>();

function readFileCached(file: string): string | null {
  if (readCache.has(file)) return readCache.get(file) ?? null;
  try {
    const src = readFileSync(file, 'utf8');
    readCache.set(file, src);
    return src;
  } catch {
    readCache.set(file, '');
    return null;
  }
}

/** Resolve the entry file of a package installed in the profile. */
function resolveEntryFile(packageName: string, profileDir: string): string | null {
  try {
    const require = createRequire(join(profileDir, 'noop.js'));
    const manifestPath = require.resolve(`${packageName}/package.json`);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, unknown>;
    const main = typeof manifest.main === 'string' ? manifest.main : 'index.js';
    // Direct path join — require.resolve is blocked by the package `exports`
    // allowlist for subpaths, but the file physically exists on disk.
    const resolved = join(dirname(manifestPath), main.replace(/^\.\//, ''));
    return resolved.endsWith('.js') || resolved.endsWith('.mjs') || resolved.endsWith('.cjs') ? resolved : null;
  } catch {
    return null;
  }
}

/** Collect declared deps from the installed manifest (deps + peer + optional). */
function declaredDeps(packageName: string, profileDir: string): Set<string> {
  const set = new Set<string>();
  try {
    const require = createRequire(join(profileDir, 'noop.js'));
    const manifestPath = require.resolve(`${packageName}/package.json`);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, unknown>;
    for (const key of ['dependencies', 'peerDependencies', 'optionalDependencies'] as const) {
      const map = (manifest[key] ?? {}) as Record<string, string>;
      for (const name of Object.keys(map)) set.add(name);
    }
  } catch { /* manifest unavailable */ }
  return set;
}

export interface QualityGateReport {
  ok: boolean;
  /** Bare specifiers that are undeclared and not platform-provided. */
  missing: string[];
  /** Total bare specifiers scanned (excluding builtins / relative). */
  scanned: number;
  /** Directory paths the plugin reads at startup that do not exist. */
  missingDirs: string[];
  detail: string;
}

// ---- directory requirement detection ----------------------------------------
//
// Some plugins read fixed paths at load time (e.g. a pets/sprites folder under
// the home dir). If that directory is absent the plugin throws during boot and
// can take the whole dsh tree down. We scan the entry sources for common
// patterns that derive a path from `homedir()` / `~` / a joined variable, and
// report the ones that do not exist so the installer can keep the plugin
// disabled instead of crashing the profile.

/** Expand `~` and absolute patterns to a concrete path; null when unknown. */
function expandCandidatePath(raw: string, home: string): string | null {
  const value = raw.trim();
  if (value === '~') return home;
  if (value.startsWith('~/') || value.startsWith('~\\')) return join(home, value.slice(2));
  if (value.startsWith('~')) return join(home, value.slice(1));
  if (value.startsWith(home) || /^[A-Za-z]:[\\/]/.test(value)) return value;
  return null;
}

/**
 * Extract directory paths a source file reads at startup. Handles:
 *   join(homedir(), ".codex", "pets")         → <home>/.codex/pets
 *   "~/.codex/pets" literals                  → <home>/.codex/pets
 *   const x = join(homedir(), ".codex"); join(x, "pets") → variable tracking
 */
function extractDirectoryCandidates(source: string, home: string, variableBase: Map<string, string>): string[] {
  const found: string[] = [];
  const seen = new Set<string>();

  // join(homedir(), "...", ...) — 2..4 segments
  const homeJoin = /join\s*\(\s*homedir\s*\(\s*\)\s*,\s*(["'`])([^"'`]+)\1(?:\s*,\s*(["'`])([^"'`]+)\3)?(?:\s*,\s*(["'`])([^"'`]+)\5)?\s*\)/g;
  let m: RegExpExecArray | null;
  while ((m = homeJoin.exec(source)) !== null) {
    const parts = [m[2], m[4], m[6]].filter((p): p is string => typeof p === 'string');
    const candidate = join(home, ...parts);
    if (!seen.has(candidate)) { seen.add(candidate); found.push(candidate); }
  }

  // "~/.codex/pets" string literals (skip template literals with ${...})
  const tilde = /["'`](~[^"'`\n]+)["'`]/g;
  while ((m = tilde.exec(source)) !== null) {
    if (m[1].includes('${')) continue;
    const candidate = expandCandidatePath(m[1], home);
    if (candidate && !seen.has(candidate)) { seen.add(candidate); found.push(candidate); }
  }

  // Variable tracking: any assignment whose RHS contains join(homedir(), "x"),
  // including ternaries — e.g. `const x = cond ? join(homedir(), ".codex") : ...`
  const varDecl = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*[^;\n]*?join\s*\(\s*homedir\s*\(\s*\)\s*,\s*(["'`])([^"'`]+)\2\s*\)/g;
  while ((m = varDecl.exec(source)) !== null) {
    const base = join(home, m[3]);
    variableBase.set(m[1], base);
    if (!seen.has(base)) { seen.add(base); found.push(base); }
  }

  // Uses of a tracked variable: join(petsDir, "pets")
  for (const [varName, base] of variableBase) {
    const pattern = 'join\\s*\\(\\s*' + varName + '\\s*,\\s*(["\'])([^"\']+)\\1\\s*\\)';
    const useRe = new RegExp(pattern, 'g');
    while ((m = useRe.exec(source)) !== null) {
      const candidate = join(base, m[2]);
      if (!seen.has(candidate)) { seen.add(candidate); found.push(candidate); }
    }
  }

  return found;
}

/**
 * Run the quality gate against a freshly installed package: dependency
 * completeness + startup directory requirements.
 * @param packageName npm package name installed into the profile.
 * @param profileDir the profile directory (for node_modules resolution).
 */
export function runQualityGate(packageName: string, profileDir: string): QualityGateReport {
  readCache.clear();
  const declared = declaredDeps(packageName, profileDir);
  const entry = resolveEntryFile(packageName, profileDir);
  if (!entry) {
    return { ok: true, missing: [], scanned: 0, missingDirs: [], detail: '无法解析插件入口，跳过质量门检查' };
  }

  // Scan the entry plus one level of relative siblings (common for split files).
  const scannedSpecs = new Set<string>();
  const missing = new Set<string>();
  const queue: Array<{ file: string; depth: number }> = [{ file: entry, depth: 0 }];
  const visited = new Set<string>();
  const home = homedir();
  const variableBase = new Map<string, string>();
  const requiredDirs = new Set<string>();
  const missingDirs = new Set<string>();

  while (queue.length > 0) {
    const { file, depth } = queue.shift()!;
    if (visited.has(file) || depth > 2) continue;
    visited.add(file);
    const source = readFileCached(file);
    if (!source) continue;

    // Directory requirement scan (best-effort; only checks existence).
    for (const dir of extractDirectoryCandidates(source, home, variableBase)) {
      requiredDirs.add(dir);
      try {
        if (!existsSync(dir)) missingDirs.add(dir);
      } catch { missingDirs.add(dir); }
    }

        for (const spec of extractSpecifiers(source)) {
          if (isBuiltin(spec)) continue;
          if (PLATFORM_PREFIXES.some((p) => spec === p || spec.startsWith(p))) continue;
          // Count every external (non-builtin, non-platform) spec we inspected.
          if (!scannedSpecs.has(spec)) scannedSpecs.add(spec);
          if (declared.has(spec)) continue;
          // Follow relative imports to catch transitive missing deps (one level).
          if (spec.startsWith('.') && depth < 2) {
            const parentDir = dirname(file);
            const candidate = join(parentDir, spec);
            for (const tryPath of [candidate, `${candidate}.js`, join(candidate, 'index.js')]) {
              if (!visited.has(tryPath)) {
                const src = readFileCached(tryPath);
                if (src !== null) { queue.push({ file: tryPath, depth: depth + 1 }); break; }
              }
            }
            continue;
          }
          if (!missing.has(spec)) missing.add(spec);
        }
  }

  const missingList = [...missing].sort();
  const missingDirList = [...missingDirs].sort();
  const ok = missingList.length === 0;
  const detailParts: string[] = [];
  if (missingList.length > 0) {
    detailParts.push(`插件入口引用了未声明的模块: ${missingList.join(', ')}。安装已回滚，请等待插件作者补充依赖声明。`);
  } else {
    detailParts.push('依赖检查通过');
  }
  if (missingDirList.length > 0) {
    detailParts.push(`插件启动需要以下目录（当前缺失，插件将保持禁用状态，请创建目录后重新启用）: ${missingDirList.join(', ')}`);
  }
  return {
    ok,
    missing: missingList,
    scanned: scannedSpecs.size,
    missingDirs: missingDirList,
    detail: detailParts.join('；'),
  };
}
