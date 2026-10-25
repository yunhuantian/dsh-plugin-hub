const NPM_REGISTRY = 'https://registry.npmjs.org/';
const CACHE_KEY = 'npm_available_map';
const CACHE_AT = 'npm_probe_at';
const CACHE_TTL_MS = 24 * 60 * 60_000; // 24h
/** Decode the cached map (no throws). */
function readCache(db) {
    const raw = db.getMeta(CACHE_KEY);
    if (!raw)
        return new Map();
    try {
        const parsed = JSON.parse(raw);
        const map = new Map();
        for (const [name, v] of Object.entries(parsed))
            map.set(name, v === '1' || v === true);
        return map;
    }
    catch {
        return new Map();
    }
}
function writeCache(db, map) {
    const obj = {};
    for (const [name, ok] of map)
        obj[name] = ok ? '1' : '0';
    db.setMeta(CACHE_KEY, JSON.stringify(obj));
    db.setMeta(CACHE_AT, String(Date.now()));
}
/** HEAD the registry for one package; true when it exists (HTTP 200). */
async function existsOnNpm(packageName, signal) {
    try {
        const url = NPM_REGISTRY + encodeURIComponent(packageName);
        const res = await fetch(url, { method: 'HEAD', signal, redirect: 'follow' });
        return res.ok;
    }
    catch {
        return false;
    }
}
/**
 * Return the npm-availability map for every known plugin, refreshing it when
 * the cache is missing, stale, or `force` is set. Packages whose manifest is
 * marked `private` are treated as GitHub-only without a registry hit.
 */
export async function npmAvailability(db, force = false) {
    const cachedAt = Number(db.getMeta(CACHE_AT) ?? 0);
    const fresh = !force && cachedAt > 0 && Date.now() - cachedAt < CACHE_TTL_MS;
    const cache = readCache(db);
    if (fresh)
        return cache;
    const rows = db.allPlugins();
    const result = new Map(cache);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45_000);
    const jobs = [];
    const names = rows.map((r) => r.packageName);
    const CHUNK = 8;
    try {
        for (let i = 0; i < names.length; i += CHUNK) {
            const chunk = names.slice(i, i + CHUNK);
            jobs.push((async () => {
                await Promise.all(chunk.map(async (name) => {
                    // private manifests never ship to npm — skip the registry hit.
                    try {
                        const manifest = JSON.parse(rows.find((r) => r.packageName === name)?.packageJson ?? '{}');
                        if (manifest.private === true) {
                            result.set(name, false);
                            return;
                        }
                    }
                    catch { /* fall through */ }
                    result.set(name, await existsOnNpm(name, controller.signal));
                }));
            })());
        }
        await Promise.all(jobs);
    }
    finally {
        clearTimeout(timer);
    }
    writeCache(db, result);
    return result;
}
/** Invalidate the cached probe (e.g. after a mirror sync adds new plugins). */
export function clearNpmCache(db) {
    db.deleteMeta(CACHE_KEY);
    db.deleteMeta(CACHE_AT);
}
