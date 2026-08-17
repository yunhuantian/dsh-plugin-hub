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
export type DownloadSource = 'npm' | 'github';
/**
 * Return the npm-availability map for every known plugin, refreshing it when
 * the cache is missing, stale, or `force` is set. Packages whose manifest is
 * marked `private` are treated as GitHub-only without a registry hit.
 */
export declare function npmAvailability(db: StoreDB, force?: boolean): Promise<Map<string, boolean>>;
/** Invalidate the cached probe (e.g. after a mirror sync adds new plugins). */
export declare function clearNpmCache(db: StoreDB): void;
