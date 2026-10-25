/**
 * 版本更新检测 —— 已安装插件的「本地版本 vs 上游最新版本」（内建插件 update-check 的实现）。
 *
 * 一条插件升级链上有两个上游，按可靠性依次尝试：
 *   1. npm registry（`registry.npmjs.org/<pkg>/latest`）—— 有就是权威；
 *   2. GitHub releases / tags —— npm 上没有的插件（`private` 或只走 git）走这条。
 * 结果缓存在 `meta` 表（避免每次开商店都请求一遍 registry）。
 */
import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { StoreDB } from './store-db.js';
import type { ProfileInfo } from './installer.js';

const CACHE_KEY = 'update_check_map';
const CACHE_AT = 'update_check_at';
const CACHE_TTL_MS = 6 * 60 * 60_000; // 6h：升级提示不需要实时

export interface InstalledPackage {
  packageName: string;
  version: string | null;
  /** profile 里的依赖声明（`^1.0.0` / `file:...` / `github:...`）。 */
  spec: string | null;
}

export interface UpdateInfo extends InstalledPackage {
  latest: string | null;
  /** 上游最新版本高于本地 → true。 */
  outdated: boolean;
  /** npm = 来自 registry；github = 只有 git 上游；none = 查不到。 */
  source: 'npm' | 'github' | 'none';
  error: string | null;
}

/** 读 profile 里声明的依赖及其本地真实版本。 */
export function installedPackages(profile: ProfileInfo): InstalledPackage[] {
  if (!existsSync(profile.packageJsonFile)) return [];
  let deps: Record<string, string> = {};
  try {
    const pkg = JSON.parse(readFileSync(profile.packageJsonFile, 'utf8')) as { dependencies?: Record<string, string> };
    deps = pkg.dependencies ?? {};
  } catch {
    return [];
  }
  const require = createRequire(join(profile.directory, 'noop.js'));
  return Object.entries(deps).map(([packageName, spec]) => {
    let version: string | null = null;
    try {
      const pkgPath = require.resolve(`${packageName}/package.json`);
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version?: unknown };
      version = typeof pkg.version === 'string' ? pkg.version : null;
    } catch {
      version = null;
    }
    return { packageName, version, spec };
  });
}

/** 语义化版本比较（忽略 prerelease 后缀差异，只比 x.y.z）。 */
export function isNewer(latest: string, local: string): boolean {
  const pick = (v: string): number[] => v.replace(/^v/, '').split(/[.\-+]/).slice(0, 3).map((n) => Number.parseInt(n, 10) || 0);
  const [a, b] = [pick(latest), pick(local)];
  for (let i = 0; i < 3; i += 1) {
    const d = (a[i] ?? 0) - (b[i] ?? 0);
    if (d !== 0) return d > 0;
  }
  // 同号时，带 prerelease 的更低（1.0.0-rc.1 < 1.0.0）。
  return !/-/.test(latest) && /-/.test(local);
}

/** 查 npm registry 上某个包的最新版本；不存在返回 null（不抛）。 */
async function npmLatest(packageName: string, signal: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`, { signal, redirect: 'follow' });
    if (!res.ok) return null;
    const body = (await res.json()) as { version?: unknown };
    return typeof body.version === 'string' ? body.version : null;
  } catch {
    return null;
  }
}

/** 查 GitHub 仓库最新 release/tag（用于 npm 查不到的插件）。 */
async function gitHubLatest(repoFullName: string, token: string | null, signal: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoFullName}/releases/latest`, {
      signal,
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token !== null && token !== '' ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { tag_name?: unknown };
    return typeof body.tag_name === 'string' ? body.tag_name.replace(/^v/, '') : null;
  } catch {
    return null;
  }
}

function readCache(db: StoreDB): { rows: UpdateInfo[]; at: number } {
  const at = Number(db.getMeta(CACHE_AT) ?? 0);
  const raw = db.getMeta(CACHE_KEY);
  if (raw === null) return { rows: [], at: 0 };
  try {
    return { rows: JSON.parse(raw) as UpdateInfo[], at };
  } catch {
    return { rows: [], at: 0 };
  }
}

/**
 * 跑一遍更新检测。
 *
 * @param db      商店数据库（读仓库映射 + 写缓存）
 * @param profile 当前 profile（读已安装清单）
 * @param token   GitHub token（查 GitHub 上游时用，可为 null）
 * @param force   忽略缓存
 */
export async function checkUpdates(db: StoreDB, profile: ProfileInfo, token: string | null, force = false): Promise<{ rows: UpdateInfo[]; checkedAt: number; outdated: number }> {
  const cached = readCache(db);
  const fresh = !force && cached.at > 0 && Date.now() - cached.at < CACHE_TTL_MS;
  if (fresh && cached.rows.length > 0) {
    return { rows: cached.rows, checkedAt: cached.at, outdated: cached.rows.filter((r) => r.outdated).length };
  }

  const packages = installedPackages(profile);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 60_000);
  const rows: UpdateInfo[] = [];
  try {
    const CHUNK = 6;
    for (let i = 0; i < packages.length; i += CHUNK) {
      const chunk = packages.slice(i, i + CHUNK);
      const settled = await Promise.all(chunk.map(async (entry): Promise<UpdateInfo> => {
        if (entry.version === null) {
          return { ...entry, latest: null, outdated: false, source: 'none', error: '本地读不到版本（未安装或被移出 node_modules）' };
        }
        const fromNpm = await npmLatest(entry.packageName, controller.signal);
        if (fromNpm !== null) {
          return { ...entry, latest: fromNpm, outdated: isNewer(fromNpm, entry.version), source: 'npm', error: null };
        }
        const row = db.getPlugin(entry.packageName);
        if (row !== undefined && row.repoFullName !== '') {
          const fromGit = await gitHubLatest(row.repoFullName, token, controller.signal);
          if (fromGit !== null) {
            return { ...entry, latest: fromGit, outdated: isNewer(fromGit, entry.version), source: 'github', error: null };
          }
        }
        return { ...entry, latest: null, outdated: false, source: 'none', error: 'npm 与 GitHub 都没查到上游版本' };
      }));
      rows.push(...settled);
    }
  } finally {
    clearTimeout(timer);
  }

  const at = Date.now();
  try {
    db.setMeta(CACHE_KEY, JSON.stringify(rows));
    db.setMeta(CACHE_AT, String(at));
  } catch { /* 缓存写失败不影响本次结果 */ }
  return { rows, checkedAt: at, outdated: rows.filter((r) => r.outdated).length };
}
