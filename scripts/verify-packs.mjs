#!/usr/bin/env node
/**
 * 插件可用性验证（可复跑）：
 *
 *   node scripts/verify-packs.mjs [--dir dist/tables] [--dsh-version 0.2.1-rc.2] [--concurrency 6]
 *
 * 验证对象是**插件表里的每一个条目**，然后按整合包汇总。四道检查：
 *   ① 包能解析    npm registry 有该包，manifest 带 `dsh` 字段
 *   ② 版本兼容    `dsh.compatibility.dshReleases[目标版本]` 或 `compatibility.dsh` 范围
 *   ③ 产物可下载  tarball 真实存在（HEAD 200 / Range 206）
 *   ④ 模拟安装    临时目录里 `pnpm add --lockfile-only` 能解出完整依赖图
 *
 * 判定：
 *   ok        npm 包四关全过 —— **只有这类才会进整合包**
 *   git-only  npm 没有，但 GitHub 仓库存在（源码安装，未验证，不进包）
 *   failed    解析不到 / 不兼容 / tarball 取不到
 *
 * 产物：dist/tables/verification.json
 */
import { execFile } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { KIND_MODPACK, openMarketIndex } from '../lib/hub-market-index/src/index.js';

const run = promisify(execFile);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const DIR = join(ROOT, arg('dir', 'dist/tables'));
const TARGET = arg('dsh-version', '0.2.1-rc.2');
const ALT = arg('dsh-alt', '0.2.0-rc.2');
const CONCURRENCY = Number(arg('concurrency', '6'));
const PNPM = 'C:/Users/yunhuantian/AppData/Roaming/npm/pnpm.cmd';
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';

// ---- 宿主包 overrides ----
// `@deepseek-ai/*` 里有一批是宿主私有包（如 dsh-compact，公网 npm 404），
// 还有一批只发布 prerelease（semver 范围默认不含 rc，判无解）。
// 真实环境里它们由 DSH 本体提供 —— 模拟安装时固定成**本机实际安装的版本**，
// 这样解析结果和真实环境一致。优先用缓存的 host-versions.json，没有就读 profile。
const HOST_DIR = arg('host-dir', 'C:/Users/yunhuantian/.dsh/profiles/desktop/node_modules/@deepseek-ai');
function loadHostOverrides() {
  const cache = join(DIR, 'host-versions.json');
  if (existsSync(cache)) {
    try { return JSON.parse(readFileSync(cache, 'utf8')); } catch { /* fallthrough */ }
  }
  if (!existsSync(HOST_DIR)) return {};
  const out = {};
  for (const name of readdirSync(HOST_DIR)) {
    try {
      const p = JSON.parse(readFileSync(join(HOST_DIR, name, 'package.json'), 'utf8'));
      if (typeof p.version === 'string') out[`@deepseek-ai/${name}`] = p.version;
    } catch { /* skip broken */ }
  }
  try { writeFileSync(cache, JSON.stringify(out, null, 2)); } catch { /* best effort */ }
  return out;
}
const HOST_OVERRIDES = loadHostOverrides();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- 极简 semver ----
const parseVer = (v) => {
  const m = String(v).match(/^(\d+)\.(\d+)\.(\d+)/);
  return m ? { major: +m[1], minor: +m[2], patch: +m[3] } : null;
};
const cmp = (a, b) => {
  for (const k of ['major', 'minor', 'patch']) if (a[k] !== b[k]) return a[k] < b[k] ? -1 : 1;
  return 0;
};
function one(v, token) {
  const m = String(token).match(/^(\^|~|>=|<=|>|<|=)?\s*(.+)$/);
  if (!m) return true;
  const op = m[1] ?? '=';
  const raw = m[2];
  if (raw === '*' || raw === 'x') return true;
  const p = parseVer(raw);
  if (!p) return true;
  if (op === '^' || op === '~') {
    const upper = op === '~'
      ? { major: p.major, minor: p.minor + 1, patch: 0 }
      : p.major > 0 ? { major: p.major + 1, minor: 0, patch: 0 }
        : p.minor > 0 ? { major: 0, minor: p.minor + 1, patch: 0 } : { major: 0, minor: 0, patch: p.patch + 1 };
    return cmp(v, p) >= 0 && cmp(v, upper) < 0;
  }
  const c = cmp(v, p);
  return op === '>=' ? c >= 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : op === '<' ? c < 0 : c === 0;
}
const satisfies = (version, range) => {
  const v = parseVer(version);
  if (!v) return false;
  return String(range).split('||').some((part) => {
    const tokens = part.trim().split(/\s+/).filter(Boolean);
    return tokens.length === 0 || tokens.every((t) => one(v, t));
  });
};

function compatOf(manifest, version) {
  const c = manifest?.dsh?.compatibility;
  if (!c) return { state: 'unknown', note: '未声明 compatibility' };
  const rel = c.dshReleases?.[version];
  if (rel) return { state: rel === 'compatible' ? 'ok' : rel === 'incompatible' ? 'bad' : 'unknown', note: `dshReleases[${version}]=${rel}` };
  if (typeof c.dsh === 'string' && c.dsh.trim() !== '') {
    return { state: satisfies(version, c.dsh) ? 'ok' : 'bad', note: `compatibility.dsh=${c.dsh}` };
  }
  return { state: 'unknown', note: '' };
}

async function fetchPackument(name) {
  for (let i = 0; i < 2; i++) {
    try {
      const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, {
        signal: AbortSignal.timeout(15_000),
        headers: { 'User-Agent': 'dsh-plugin-hub-verify' },
      });
      if (res.status === 404) return null;
      if (res.ok) return await res.json();
    } catch { /* retry */ }
    await sleep(400);
  }
  return null;
}

async function tarballOk(url) {
  if (!url) return false;
  try {
    const head = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(12_000) });
    if (head.ok) return true;
    const get = await fetch(url, { headers: { Range: 'bytes=0-1023' }, signal: AbortSignal.timeout(15_000) });
    return get.ok || get.status === 206;
  } catch { return false; }
}

async function repoExists(repoUrl) {
  // 插件表里的 repo 是 `owner/name`，也可能传完整 URL；两种都要认。
  const raw = String(repoUrl ?? '').trim();
  const m = raw.match(/github\.com\/([^/]+)\/([^/?#]+)/i) ?? raw.match(/^([^/\s]+)\/([^/\s]+)$/);
  if (!m) return false;
  const api = `https://api.github.com/repos/${m[1]}/${m[2].replace(/\.git$/, '')}`;
  try {
    const res = await fetch(api, {
      headers: { 'User-Agent': 'dsh-plugin-hub-verify', ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}) },
      signal: AbortSignal.timeout(12_000),
    });
    return res.ok;
  } catch { return false; }
}

async function mapLimit(items, limit, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: limit }, async () => {
    while (queue.length > 0) await fn(queue.shift());
  }));
}

// ---- 读插件表 ----
const tableFile = join(DIR, 'plugin-table.json');
if (!existsSync(tableFile)) { console.error('缺少 plugin-table.json'); process.exit(1); }
const table = JSON.parse(readFileSync(tableFile, 'utf8'));
const items = table.items ?? [];
console.log(`验证插件表 ${items.length} 个条目，目标 DSH ${TARGET}（另一版本 ${ALT}），并发 ${CONCURRENCY}\n`);

// 结果缓存：registry 慢且会超时，重跑时不该把同一批包再打一遍。
const CACHE = join(DIR, 'verify-cache.json');
const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : { target: TARGET, at: 0, entries: {} };
const useCache = cache.target === TARGET && (Date.now() - Date.parse(cache.at ?? 0)) < 12 * 3600_000;

const results = new Map();
let done = 0;
await mapLimit(items, CONCURRENCY, async (it) => {
  const name = it.name;
  if (useCache && cache.entries[name]) { results.set(name, cache.entries[name]); return; }
  const packument = await fetchPackument(name);
  if (!packument) {
    // npm 上没有：看仓库是否存在（GitHub API，走 token 不受 git 代理影响）
    const exists = await repoExists(it.repo);
    results.set(name, {
      name,
      state: exists ? 'git-only' : 'failed',
      reason: exists ? 'npm 未发布（源码安装，未验证）' : 'npm 与仓库都取不到',
      version: null, compat: 'unknown', tarball: false,
    });
    console.log(`  ${exists ? '⚪' : '❌'} ${name.padEnd(42)} ${exists ? 'git-only' : 'missing'}`);
    return;
  }
  const version = packument['dist-tags']?.latest ?? null;
  const manifest = version ? packument.versions?.[version] : null;
  const hasDsh = Boolean(manifest?.dsh && Object.keys(manifest.dsh).length > 0);
  const primary = manifest ? compatOf(manifest, TARGET) : { state: 'bad', note: '无 latest manifest' };
  const alt = manifest ? compatOf(manifest, ALT) : { state: 'bad', note: '' };
  const compatible = primary.state !== 'bad' || alt.state !== 'bad';
  const tarball = await tarballOk(manifest?.dist?.tarball);
  const state = !hasDsh || !compatible || !tarball ? 'failed' : 'ok';
  const reason = !hasDsh ? 'manifest 没有 dsh 字段' : !compatible ? `版本不兼容：${primary.note || alt.note}` : !tarball ? 'tarball 取不到' : '';
  results.set(name, {
    name, state, reason, version,
    compat: compatible ? (primary.state === 'ok' ? 'target' : 'alt') : 'bad',
    compatNote: primary.note, tarball,
  });
  done++;
  console.log(`  ${state === 'ok' ? '✅' : '❌'} ${name.padEnd(42)} ${version ?? '—'} ${compatible ? primary.state : 'INCOMPATIBLE'}`);
  if (done % 20 === 0) console.log(`  … ${done} 个已处理`);
});

const okNames = items.filter((i) => results.get(i.name)?.state === 'ok').map((i) => i.name);
const gitOnly = items.filter((i) => results.get(i.name)?.state === 'git-only').map((i) => i.name);
writeFileSync(CACHE, JSON.stringify({ target: TARGET, at: new Date().toISOString(), entries: Object.fromEntries(results) }));

// ---- 模拟安装（按整合包分别跑）----
// 用户真实的安装单元是「一个整合包」，不是「整张表」。
// 把 113 个一起装会因为不同插件的 peer 范围互斥而失败 —— 那属于跨包冲突，
// 不该算到某个包头上。所以每个包单独在临时目录里解析一次。
const packIndexes = [];
for (const f of readdirSync(DIR)) {
  if (!/^modpack-.+\.dpmidx$/.test(f)) continue;
  const index = openMarketIndex(readFileSync(join(DIR, f)));
  if (index.kind !== KIND_MODPACK) continue;
  const names = [];
  for (let i = 0; i < index.count; i++) names.push(index.name(i));
  packIndexes.push({ file: f, name: index.meta.name ?? f, names });
}

async function simulateDeps(specs) {
  const dir = mkdtempSync(join(tmpdir(), 'hub-sim-'));
  try {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({
      name: 'hub-sim', private: true, version: '0.0.0',
      dependencies: Object.fromEntries(specs.map((n) => [n, '*'])),
      // 宿主包固定为本机实际版本：公网 prerelease/私有包都不影响解析。
      pnpm: Object.keys(HOST_OVERRIDES).length > 0 ? { overrides: HOST_OVERRIDES } : undefined,
    }, null, 2));
    // pnpm v11 不读临时目录的 .npmrc，必须走命令行 --config。
    const { stdout, stderr } = await run(PNPM, [
      'install', '--lockfile-only', '--ignore-scripts', '--prefer-offline',
      '--config.auto-install-peers=false', '--config.strict-peer-dependencies=false',
      '--network-concurrency=4',
    ], {
      cwd: dir, shell: true, timeout: 8 * 60_000, windowsHide: true, maxBuffer: 16 * 1024 * 1024,
      env: { ...process.env, NO_COLOR: '1' },
    });
    return { ok: true, log: `${stdout}\n${stderr}`.trim().split('\n').slice(-6).join('\n') };
  } catch (e) {
    const text = String(e.stdout ?? '') + String(e.stderr ?? '') + String(e.message ?? e);
    return { ok: false, log: text.slice(0, 1600) };
  } finally {
    try { rmSync(dir, { recursive: true, force: true }); } catch { /* ignore */ }
  }
}

console.log('\n模拟安装（按整合包，lockfile-only）：');
for (const p of packIndexes) {
  const verifiedSpecs = p.names.filter((n) => results.get(n)?.state === 'ok');
  p.simulation = await simulateDeps(verifiedSpecs);
  p.specs = verifiedSpecs.length;
  console.log(`  ${p.simulation.ok ? '✅' : '❌'} ${p.name}（${verifiedSpecs.length} 个）`);
  if (!p.simulation.ok) console.log(p.simulation.log.split('\n').filter((l) => /ERR_|No matching|not found/i.test(l)).slice(-2).join('\n'));
}

// ---- 按整合包汇总 ----
const packs = packIndexes.map((p) => ({
  name: p.name,
  total: p.names.length,
  verified: p.names.filter((n) => results.get(n)?.state === 'ok').length,
  simulation: { ok: p.simulation.ok, specs: p.specs },
  unverified: p.names
    .filter((n) => results.get(n)?.state !== 'ok')
    .map((n) => ({ name: n, state: results.get(n)?.state, reason: results.get(n)?.reason })),
}));

const report = {
  verifiedAt: new Date().toISOString(),
  targetDsh: TARGET,
  altDsh: ALT,
  totals: {
    items: items.length,
    ok: okNames.length,
    gitOnly: gitOnly.length,
    failed: items.length - okNames.length - gitOnly.length,
  },
  packs,
  items: items.map((i) => results.get(i.name)),
};
writeFileSync(join(DIR, 'verification.json'), JSON.stringify(report, null, 2));

console.log('\n=== 汇总 ===');
console.log(`  插件表：${report.totals.ok} 可安装 / ${report.totals.gitOnly} 仅源码 / ${report.totals.failed} 失败`);
for (const p of packs) {
  console.log(`  ${p.name}: 验证 ${p.verified}/${p.total} · 模拟安装 ${p.simulation.ok ? '✅' : '❌'}${p.unverified.length ? `（未验证：${p.unverified.map((u) => u.name).join(', ')}）` : ''}`);
}
console.log('\n报告：', join(DIR, 'verification.json'));
process.exitCode = packs.every((p) => p.simulation.ok && p.verified === p.total) ? 0 : 2;
