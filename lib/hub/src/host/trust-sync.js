const INDEX_OWNER = 'jiangxingfan1-coder';
const INDEX_REPO = 'dsh-hub-index';
const INDEX_DIR = 'entries/plugins';
/** Extract owner/repo from a GitHub URL or bare `owner/repo` string. */
function extractRepo(raw) {
    const m = raw.match(/(?:github\.com\/|github:)?([^/\s]+\/[^/\s.#]+)/i);
    return m ? m[1].toLowerCase() : '';
}
/** Minimal YAML field extraction (no YAML lib — fields we need only). */
function parseEntry(text) {
    const e = { name: '', trust: '', install: '', repo: '', publisher: '' };
    let inSource = false;
    let inPublisher = false;
    for (const line of text.split('\n')) {
        const t = line.trim();
        if (t.startsWith('source:')) {
            inSource = true;
            inPublisher = false;
            continue;
        }
        if (t.startsWith('publisher:')) {
            inPublisher = true;
            inSource = false;
            continue;
        }
        if (line && !line.startsWith(' ') && !line.startsWith('#')) {
            inSource = false;
            inPublisher = false;
        }
        if (inSource) {
            if (t.startsWith('repo:')) {
                const v = t.slice(5).trim();
                if (v && v !== 'null')
                    e.repo = extractRepo(v);
            }
            continue;
        }
        if (inPublisher) {
            if (t.startsWith('github:')) {
                const v = t.slice(7).trim();
                if (v && v !== 'null')
                    e.publisher = v;
            }
            continue;
        }
        if (t.startsWith('name:'))
            e.name = t.slice(5).trim();
        if (t.startsWith('trust:'))
            e.trust = t.slice(6).trim();
        if (t.startsWith('install:'))
            e.install = t.slice(8).trim();
    }
    return e.name || e.repo || e.install ? e : null;
}
export async function syncTrustLevels(github, db) {
    try {
        // 1) list the index directory.
        const files = await github.apiGet(`/repos/${INDEX_OWNER}/${INDEX_REPO}/contents/${INDEX_DIR}`);
        const ymls = (files ?? [])
            .filter((f) => f.type === 'file' && (f.name?.endsWith('.yml') || f.name?.endsWith('.yaml')))
            .map((f) => f.name);
        if (ymls.length === 0)
            return { ok: false, updated: 0, matched: 0, error: 'index dir empty/unreachable' };
        // 2) fetch and parse each entry (bounded; individual failures skipped).
        const byKey = new Map(); // package_name / repo_full_name → trust
        for (const file of ymls.slice(0, 300)) {
            try {
                const text = await github.rawFile(INDEX_OWNER, INDEX_REPO, 'main', `${INDEX_DIR}/${file}`);
                if (!text)
                    continue;
                const entry = parseEntry(text);
                if (!entry || !entry.trust)
                    continue;
                const item = { trust: entry.trust, publisher: entry.publisher || undefined };
                const install = entry.install ?? '';
                if (install.startsWith('github:')) {
                    const repo = install.slice(7).toLowerCase();
                    byKey.set(repo, item);
                    byKey.set(`gh:${repo}`, item);
                }
                else if (install && !install.includes(' ')) {
                    byKey.set(install.toLowerCase(), item);
                }
                if (entry.repo)
                    byKey.set(entry.repo.toLowerCase(), item);
            }
            catch { /* skip one entry */ }
        }
        // 3) apply to our plugin rows (match by package name OR repo).
        let updated = 0;
        let matched = 0;
        const rows = db.allPlugins();
        for (const row of rows) {
            const hit = byKey.get(row.packageName.toLowerCase())
                ?? byKey.get(row.repoFullName.toLowerCase())
                ?? byKey.get(`gh:${row.repoFullName.toLowerCase()}`);
            if (!hit)
                continue;
            matched++;
            if (hit.trust !== row.trustLevel) {
                db.setTrustLevel(row.packageName, hit.trust);
                updated++;
            }
        }
        db.setMeta('trust_synced_at', new Date().toISOString());
        db.setMeta('trust_source', `${INDEX_OWNER}/${INDEX_REPO}`);
        return { ok: true, updated, matched };
    }
    catch (error) {
        return { ok: false, updated: 0, matched: 0, error: error instanceof Error ? error.message : String(error) };
    }
}
