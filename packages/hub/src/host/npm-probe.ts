/**
 * npm availability probe: figure out, for every mirrored plugin, whether the
 * package is actually published on the npm registry. Plugins that exist on
 * npm install from the registry (fast, no proxy needed); the rest fall back
 * to a GitHub git clone (slow, proxy often required).
 *
 * The probe runs once and caches its result in the store's meta table so it
 * does not hammer the registry on every page load. Cache lives in `meta`
 * under `npm_available_map` (JSON object: packageName -> "1"|"0") plus a
 * `npm_probe_at` timestamp.
 */
import { StoreDB } from './store-db.js';

const NPM_REGISTRY = 'https://registry.npmjs.org/';
const CACHE_KEY = 'npm_available_map';
const CACHE_AT = 'npm_probe_at';
const CACHE_TTL_MS = 24 * 60 * 60_000; // 24h

export type DownloadSource = 'npm' | 'github';

/** Decode the cached map (no throws). */
function readCache(db: StoreDB): Map<string, boolean> {
  const raw = db.getMeta(CACHE_KEY);
  if (!raw) return new Map();
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const map = new Map<string, boolean>();
    for (const [name, v] of Object.entries(parsed)) map.set(name, v === '1' || v === true);
    return map;
  } catch {
    return new Map();
  }
}

function writeCache(db: StoreDB, map: Map<string, boolean>): void {
  const obj: Record<string, string> = {};
  for (const [name, ok] of map) obj[name] = ok ? '1' : '0';
  db.setMeta(CACHE_KEY, JSON.stringify(obj));
  db.setMeta(CACHE_AT, String(Date.now()));
}

/** HEAD the registry for one package; true when it exists (HTTP 200). */
async function existsOnNpm(packageName: string, signal: AbortSignal): Promise<boolean> {
  try {
    const url = NPM_REGISTRY + encodeURIComponent(packageName);
    const res = await fetch(url, { method: 'HEAD', signal, redirect: 'follow' });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Return the npm-availability map for every known plugin, refreshing it when
 * the cache is missing, stale, or `force` is set. Packages whose manifest is
 * marked `private` are treated as GitHub-only without a registry hit.
 */
export async function npmAvailability(db: StoreDB, force = false): Promise<Map<string, boolean>> {
  const cachedAt = Number(db.getMeta(CACHE_AT) ?? 0);
  const fresh = !force && cachedAt > 0 && Date.now() - cachedAt < CACHE_TTL_MS;
  const cache = readCache(db);
  if (fresh) return cache;

  const rows = db.allPlugins();
  const result = new Map(cache);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  const jobs: Promise<void>[] = [];
  const names = rows.map((r) => r.packageName);
  const CHUNK = 8;
  try {
    for (let i = 0; i < names.length; i += CHUNK) {
      const chunk = names.slice(i, i + CHUNK);
      jobs.push((async () => {
        await Promise.all(chunk.map(async (name) => {
          // private manifests never ship to npm — skip the registry hit.
          try {
            const manifest = JSON.parse(rows.find((r) => r.packageName === name)?.packageJson ?? '{}') as Record<string, unknown>;
            if (manifest.private === true) { result.set(name, false); return; }
          } catch { /* fall through */ }
          result.set(name, await existsOnNpm(name, controller.signal));
        }));
      })());
    }
    await Promise.all(jobs);
  } finally {
    clearTimeout(timer);
  }
  writeCache(db, result);
  return result;
}

/** Invalidate the cached probe (e.g. after a mirror sync adds new plugins). */
export function clearNpmCache(db: StoreDB): void {
  db.deleteMeta(CACHE_KEY);
  db.deleteMeta(CACHE_AT);
}
