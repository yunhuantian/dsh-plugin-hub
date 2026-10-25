const CATALOG_SOURCE = 'blue-whale';
const CATALOG_URL = 'https://raw.githubusercontent.com/leenkcool/Blue-Whale-Harness/main/repos.txt';
export async function syncBlueWhaleCatalog(db) {
    try {
        const res = await fetch(CATALOG_URL, { signal: AbortSignal.timeout(15_000) });
        if (!res.ok)
            return { ok: false, repos: 0, error: `catalog fetch HTTP ${res.status}` };
        const text = await res.text();
        const repos = text.split(/\r?\n/).filter((l) => l.trim().length > 0 && l.includes('/'));
        if (repos.length === 0)
            return { ok: false, repos: 0, error: 'catalog empty' };
        const n = db.replaceCatalog(CATALOG_SOURCE, repos);
        db.setMeta('catalog_synced_at', new Date().toISOString());
        db.setMeta('catalog_total', String(n));
        return { ok: true, repos: n };
    }
    catch (error) {
        return { ok: false, repos: 0, error: error instanceof Error ? error.message : String(error) };
    }
}
