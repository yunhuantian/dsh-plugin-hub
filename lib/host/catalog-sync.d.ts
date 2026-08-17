/**
 * 0.1.5 Blue-Whale-Harness catalog sync.
 *
 * The community maintains a curated list of 1800+ DSH repos (repos.txt, one
 * `owner/repo` per line). We consume it as an *extension directory* for the
 * encyclopedia: plugins not yet mirrored by our GitHub search get browsable
 * catalog entries (with a GitHub link), while mirrored ones simply get a
 * "catalog member" flag. Fail-safe: a fetch failure keeps the previous table.
 */
import type { StoreDB } from './store-db.js';
export interface CatalogSyncResult {
    ok: boolean;
    repos: number;
    error?: string;
}
export declare function syncBlueWhaleCatalog(db: StoreDB): Promise<CatalogSyncResult>;
