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

const CATALOG_SOURCE = 'blue-whale';
const CATALOG_URL = 'https://raw.githubusercontent.com/leenkcool/Blue-Whale-Harness/main/repos.txt';

export interface CatalogSyncResult {
  ok: boolean;
  repos: number;
  error?: string;
}

export async function syncBlueWhaleCatalog(db: StoreDB): Promise<CatalogSyncResult> {
  try {
    const res = await fetch(CATALOG_URL, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) return { ok: false, repos: 0, error: `catalog fetch HTTP ${res.status}` };
    const text = await res.text();
    const repos = text.split(/\r?\n/).filter((l) => l.trim().length > 0 && l.includes('/'));
    if (repos.length === 0) return { ok: false, repos: 0, error: 'catalog empty' };
    const n = db.replaceCatalog(CATALOG_SOURCE, repos);
    db.setMeta('catalog_synced_at', new Date().toISOString());
    db.setMeta('catalog_total', String(n));
    return { ok: true, repos: n };
  } catch (error) {
    return { ok: false, repos: 0, error: error instanceof Error ? error.message : String(error) };
  }
}
