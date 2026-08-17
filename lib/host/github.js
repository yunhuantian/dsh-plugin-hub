const GITHUB_API = 'https://api.github.com';
const GITHUB_RAW = 'https://raw.githubusercontent.com';
const NPM_API = 'https://api.npmjs.org';
export class GitHubRateLimitError extends Error {
    limit;
    resetAt;
    constructor(message, limit, resetAt) {
        super(message);
        this.name = 'GitHubRateLimitError';
        this.limit = limit;
        this.resetAt = resetAt;
    }
}
export class GitHubClient {
    token = null;
    rate = { remaining: null, limit: null, resetAt: null };
    constructor(token = null) {
        this.token = token;
    }
    setToken(token) {
        this.token = token;
        this.rate = { remaining: null, limit: null, resetAt: null };
    }
    headers() {
        const h = {
            'User-Agent': 'dsh-plugin-hub',
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        };
        if (this.token)
            h.Authorization = `Bearer ${this.token}`;
        return h;
    }
    readRate(res) {
        const remaining = res.headers.get('x-ratelimit-remaining');
        const limit = res.headers.get('x-ratelimit-limit');
        const reset = res.headers.get('x-ratelimit-reset');
        if (remaining !== null)
            this.rate.remaining = Number(remaining);
        if (limit !== null)
            this.rate.limit = Number(limit);
        if (reset !== null)
            this.rate.resetAt = Number(reset) * 1000;
    }
    /** GET a GitHub API endpoint, throwing a typed error on rate-limit exhaustion. */
    async apiGet(path, params = {}, extraHeaders = {}) {
        const url = new URL(path, GITHUB_API);
        for (const [k, v] of Object.entries(params))
            if (v !== '')
                url.searchParams.set(k, v);
        const res = await fetch(url, { headers: { ...this.headers(), ...extraHeaders }, signal: AbortSignal.timeout(20000) });
        this.readRate(res);
        if (res.status === 403 || res.status === 429) {
            const remaining = res.headers.get('x-ratelimit-remaining');
            const reset = res.headers.get('x-ratelimit-reset');
            if (remaining === '0' || res.status === 429) {
                const resetAt = reset ? Number(reset) * 1000 : Date.now() + 60000;
                throw new GitHubRateLimitError(`GitHub API rate limit reached (${this.token ? 'authenticated' : 'anonymous'})`, res.status === 429 ? 0 : Number(remaining ?? 0), resetAt);
            }
        }
        if (!res.ok) {
            const body = await res.text().catch(() => '');
            throw new Error(`GitHub API ${path}: HTTP ${res.status} ${body.slice(0, 200)}`);
        }
        return await res.json();
    }
    /** Fetch a raw file from the default branch (raw host — not rate limited). */
    async rawFile(owner, repo, branch, path) {
        const url = `${GITHUB_RAW}/${owner}/${repo}/${branch}/${path}`;
        try {
            const res = await fetch(url, { headers: { 'User-Agent': 'dsh-plugin-hub' }, signal: AbortSignal.timeout(20000) });
            if (!res.ok)
                return null;
            return await res.text();
        }
        catch {
            return null;
        }
    }
    /** Current rate-limit state (nulls when never queried). */
    rateLimit() {
        return { ...this.rate };
    }
    /**
     * Search repositories by a GitHub search query, iterating up to `pages`.
     * Returns deduplicated hits ordered by stars.
     */
    async searchRepos(query, pages = 3, perPage = 100) {
        const hits = new Map();
        for (let page = 1; page <= pages; page++) {
            const data = await this.apiGet('/search/repositories', {
                q: query,
                per_page: String(perPage),
                page: String(page),
            });
            for (const item of data.items ?? []) {
                const fullName = String(item.full_name ?? '');
                if (!fullName)
                    continue;
                const topics = Array.isArray(item.topics) ? item.topics : [];
                const owner = (item.owner ?? {});
                hits.set(fullName, {
                    fullName,
                    owner: String(owner.login ?? fullName.split('/')[0] ?? ''),
                    repo: String(item.name ?? fullName.split('/')[1] ?? ''),
                    description: typeof item.description === 'string' ? item.description : null,
                    stars: Number(item.stargazers_count ?? 0),
                    forks: Number(item.forks_count ?? 0),
                    topics,
                    license: item.license?.spdx_id ?? null,
                    homepage: typeof item.homepage === 'string' && item.homepage ? item.homepage : null,
                    defaultBranch: String(item.default_branch ?? 'main'),
                    pushedAt: String(item.pushed_at ?? ''),
                    updatedAt: String(item.updated_at ?? ''),
                    avatarUrl: typeof owner.avatar_url === 'string' ? owner.avatar_url : null,
                });
            }
            if ((data.items ?? []).length < perPage)
                break;
        }
        return [...hits.values()].sort((a, b) => b.stars - a.stars);
    }
    /** npm monthly downloads for a published package (0 when unpublished). */
    async npmDownloads(packageName) {
        try {
            const res = await fetch(`${NPM_API}/downloads/point/last-month/${encodeURIComponent(packageName)}`, { signal: AbortSignal.timeout(10000) });
            if (!res.ok)
                return 0;
            const data = await res.json();
            return Number(data.downloads ?? 0);
        }
        catch {
            return 0;
        }
    }
    /** GitHub releases for a repo (version history). */
    async releases(owner, repo) {
        try {
            const data = await this.apiGet(`/repos/${owner}/${repo}/releases`, { per_page: '30' });
            return (data ?? []).map((rel) => ({
                version: String(rel.tag_name ?? ''),
                publishedAt: typeof rel.published_at === 'string' ? rel.published_at : null,
                changelog: typeof rel.body === 'string' && rel.body ? rel.body.slice(0, 4000) : null,
                tagName: String(rel.tag_name ?? ''),
            })).filter((v) => v.version !== '');
        }
        catch {
            return [];
        }
    }
    /** GitHub issues for a repo (discussion board, read-only). */
    async issues(owner, repo) {
        try {
            const data = await this.apiGet(`/repos/${owner}/${repo}/issues`, {
                state: 'all', per_page: '20', sort: 'updated', direction: 'desc',
            });
            return (data ?? [])
                .filter((row) => typeof row.number === 'number') // PRs are excluded: they carry a `pull_request` key
                .map((row) => ({
                number: Number(row.number ?? 0),
                title: String(row.title ?? ''),
                state: row.state === 'closed' ? 'closed' : 'open',
                comments: Number(row.comments ?? 0),
                createdAt: typeof row.created_at === 'string' ? row.created_at : null,
                user: (row.user?.login ?? null),
            }));
        }
        catch {
            return [];
        }
    }
    /** Recent commits (since ISO date) → per-day commit counts (update cadence).
     * Capped at 100 results (a busy repo's earliest commits may be cut). */
    async commitDays(owner, repo, since) {
        try {
            const data = await this.apiGet(`/repos/${owner}/${repo}/commits`, {
                since, per_page: '100',
            });
            const byDay = new Map();
            for (const c of data ?? []) {
                const when = c.commit?.author?.date;
                if (typeof when === 'string') {
                    const day = when.slice(0, 10);
                    byDay.set(day, (byDay.get(day) ?? 0) + 1);
                }
            }
            return [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([date, count]) => ({ date, count }));
        }
        catch {
            return [];
        }
    }
    /** Recent stargazers with timestamps → per-day star gains (max 100). */
    async starGainDays(owner, repo) {
        try {
            const data = await this.apiGet(`/repos/${owner}/${repo}/stargazers`, {
                per_page: '100', sort: 'created', direction: 'desc',
            }, { Accept: 'application/vnd.github.v3.star+json' });
            const byDay = new Map();
            for (const s of data ?? []) {
                if (typeof s.starred_at === 'string') {
                    const day = s.starred_at.slice(0, 10);
                    byDay.set(day, (byDay.get(day) ?? 0) + 1);
                }
            }
            return [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([date, count]) => ({ date, count }));
        }
        catch {
            return [];
        }
    }
    /** Latest release tag for a repo (used as the git install ref). */
    async latestReleaseTag(owner, repo) {
        try {
            const data = await this.apiGet(`/repos/${owner}/${repo}/releases/latest`);
            return typeof data.tag_name === 'string' ? data.tag_name : null;
        }
        catch {
            return null;
        }
    }
}
// ---- metadata extraction helpers ------------------------------------------
export const CATEGORY_GROUPS = {
    agent: ['agent', 'ai-agent', 'agent-skill', 'persona'],
    tool: ['tool', 'command', 'tools', 'cli', 'utility'],
    ui: ['ui', 'web', 'interface', 'frontend', 'client', 'theme', 'visual', 'sidebar', 'panel'],
    data: ['data', 'database', 'sql', 'excel', 'csv', 'pandas', 'dataset', 'analysis', 'export', 'spreadsheet'],
    vision: ['vision', 'image', 'screenshot', 'ocr', 'multimodal', 'media', 'video', 'camera', 'image-gen'],
    docs: ['document', 'doc', 'office', 'word', 'pptx', 'pdf', 'markdown', 'report', 'note', 'typeset', 'docx'],
    memory: ['memory', 'remember', 'recall', 'knowledge', 'knowledge-base', 'vector', 'rag', 'embedding', 'memorize'],
    usage: ['usage', 'token', 'cost', 'pricing', 'analytics', 'quota', 'billing', 'statistics', 'metering'],
    notify: ['notify', 'notification', 'alert', 'message', 'telegram', 'wechat', 'slack', 'dingtalk', 'webhook', 'toast', 'mail'],
    dev: ['dev', 'coding', 'code', 'debug', 'debugger', 'terminal', 'git', 'build', 'lint', 'test', 'compiler', 'ide'],
    chat: ['chat', 'conversation', 'session', 'prompt', 'dialogue', 'history', 'summary'],
    hub: ['hub', 'registry', 'marketplace', 'store', 'catalog', 'index', 'collection', 'aggregator', 'repo'],
};
export const CATEGORY_ORDER = ['tool', 'agent', 'ui', 'data', 'vision', 'docs', 'memory', 'usage', 'notify', 'dev', 'chat', 'hub', 'other'];
/** Derive store categories from package keywords, topics, and the dsh group. */
export function deriveCategories(pkg, topics, group) {
    const found = new Set();
    const words = [
        ...(Array.isArray(pkg.keywords) ? pkg.keywords.map(String) : []),
        ...topics,
        ...(group ? [group] : []),
    ].map((w) => w.toLowerCase());
    const joined = words.join(' ');
    for (const [cat, keys] of Object.entries(CATEGORY_GROUPS)) {
        for (const key of keys) {
            if (words.includes(key) || joined.includes(key)) {
                found.add(cat);
                break;
            }
        }
    }
    // group-name heuristics
    if (group) {
        if (/^plugin-management|manage|inventory|install/.test(group))
            found.add('tool');
        if (/^agent|persona|model|llm/.test(group))
            found.add('agent');
        if (/^vision|image|media/.test(group))
            found.add('vision');
        if (/^memory|knowledge/.test(group))
            found.add('memory');
        if (/^usage|token|cost/.test(group))
            found.add('usage');
        if (/^notification/.test(group))
            found.add('notify');
        if (/^developer|dev|build/.test(group))
            found.add('dev');
    }
    if (found.size === 0)
        found.add('other');
    return CATEGORY_ORDER.filter((c) => found.has(c));
}
/** Parse runtime/dev/peer dependency edges from a package.json manifest. */
export function dependencyEdges(pkg) {
    const edges = [];
    const push = (obj, kind) => {
        if (!obj || typeof obj !== 'object')
            return;
        for (const [name, ver] of Object.entries(obj)) {
            edges.push({ name, version: typeof ver === 'string' ? ver : null, kind });
        }
    };
    push(pkg.dependencies, 'runtime');
    push(pkg.peerDependencies, 'peer');
    push(pkg.devDependencies, 'dev');
    return edges;
}
/** Validate that a package manifest is actually a dsh/cordis plugin. */
export function isDshPlugin(pkg) {
    if (!pkg || typeof pkg !== 'object')
        return false;
    const dsh = pkg.dsh;
    if (dsh && typeof dsh === 'object') {
        if (dsh.bundle && typeof dsh.bundle === 'object' && typeof dsh.bundle.patch === 'string')
            return true;
        if (dsh.client && typeof dsh.client === 'object' && dsh.client.platform)
            return true;
        if (dsh.pluginManager || dsh.pluginStore || dsh.skill)
            return true;
    }
    // cordis plugin heuristics
    const keywords = Array.isArray(pkg.keywords) ? pkg.keywords.map(String) : [];
    if (keywords.some((k) => /dsh|deepseek-harness|cordis/i.test(k)) && typeof pkg.main === 'string')
        return true;
    return false;
}
/** Extract `## Usage`-style section(s) from a README for the usage tab.
 * Intentionally does NOT capture install-only sections — the store itself
 * installs plugins; the wiki answers "how do I use it", not "how do I get it". */
export function extractUsage(readme) {
    if (!readme)
        return '';
    const lines = readme.split(/\r?\n/);
    const out = [];
    let capturing = false;
    for (const line of lines) {
        const heading = /^#{1,4}\s+(.+)$/.exec(line.trim());
        if (heading) {
            const title = heading[1].toLowerCase();
            if (/usage|使用|quick start|快速开始|getting started|example|示例|demo|演示|workflow|工作流/.test(title)) {
                capturing = true;
                out.push(line);
                continue;
            }
            if (capturing && /^#{1,2}\s/.test(line.trim()))
                break;
            if (capturing && !/^#{3,4}\s/.test(line.trim()))
                capturing = false;
            if (capturing)
                continue;
        }
        if (capturing)
            out.push(line);
    }
    return out.join('\n').trim();
}
/** Extract "what it does / features / value" sections from a README — the
 * core of the wiki: what this plugin is FOR and the value it brings in
 * practice, not how to install it. */
export function extractHighlights(readme) {
    if (!readme)
        return '';
    const lines = readme.split(/\r?\n/);
    const out = [];
    let capturing = false;
    for (const line of lines) {
        const heading = /^#{1,4}\s+(.+)$/.exec(line.trim());
        if (heading) {
            const title = heading[1].toLowerCase();
            if (/feature|功能|特性|亮点|what it does|what is|为什么|why|价值|value|use case|应用场景|适用场景|场景|capabilit|能力|highlights|介绍|简介|overview|概览|简介/.test(title)) {
                capturing = true;
                out.push(line);
                continue;
            }
            if (capturing && /^#{1,2}\s/.test(line.trim()))
                break;
            if (capturing && !/^#{3,4}\s/.test(line.trim()))
                capturing = false;
            if (capturing)
                continue;
        }
        if (capturing)
            out.push(line);
    }
    return out.join('\n').trim();
}
/** Extract a "best practices / tips / notes" section from a README. */
export function extractBestPractices(readme) {
    if (!readme)
        return '';
    const lines = readme.split(/\r?\n/);
    const out = [];
    let capturing = false;
    for (const line of lines) {
        const heading = /^#{1,4}\s+(.+)$/.exec(line.trim());
        if (heading) {
            const title = heading[1].toLowerCase();
            if (/best practice|最佳实践|tips?|技巧|注意|note|faq|常见问题|troubleshoot|配置|config/i.test(title)) {
                capturing = true;
                out.push(line);
                continue;
            }
            if (capturing && /^#{1,2}\s/.test(line.trim()))
                break;
            if (capturing && !/^#{3,4}\s/.test(line.trim()))
                capturing = false;
            if (capturing)
                continue;
        }
        if (capturing)
            out.push(line);
    }
    return out.join('\n').trim();
}
const IMG_RE = /!\[[^\]]*\]\(<?([^)>]+)>?\)|<img[^>]+src=["']([^"']+)["']/g;
/** Collect image URLs from a README (screenshots), resolving relative paths. */
export function extractScreenshots(readme, repoFullName, branch) {
    if (!readme)
        return [];
    const urls = new Set();
    for (const m of readme.matchAll(IMG_RE)) {
        const raw = m[1] ?? m[2];
        if (!raw)
            continue;
        if (/^(https?:)?\/\//.test(raw)) {
            urls.add(raw.startsWith('//') ? `https:${raw}` : raw);
        }
        else if (/^\.{0,2}\//.test(raw) || /^[^/]+\.(png|jpg|jpeg|gif|webp|svg)$/i.test(raw)) {
            urls.add(`${GITHUB_RAW}/${repoFullName}/${branch}/${raw.replace(/^\.\//, '')}`);
        }
        if (urls.size >= 8)
            break;
    }
    return [...urls];
}
/** Clean a GitHub description into a short one-line summary. */
export function shortDescription(repoDescription, pkgDescription) {
    const source = repoDescription || pkgDescription || '';
    const cleaned = source.replace(/[#*`_]/g, '').replace(/\s+/g, ' ').trim();
    return cleaned.length > 120 ? `${cleaned.slice(0, 117)}…` : cleaned;
}
/** Queries used for discovery. `topic:dsh-plugin` is authoritative; the text
 * query catches repos that only mention `#dsh-plugin` in name/description. */
export const DISCOVERY_QUERIES = [
    'topic:dsh-plugin',
    '"dsh-plugin" in:name,description',
];
/** Run one full mirror sync: discover -> fetch -> cache into the DB. */
export async function runMirrorSync(github, db, options = {}) {
    const { force = false, maxPages = 3, onProgress } = options;
    const seen = new Map();
    try {
        for (const query of DISCOVERY_QUERIES) {
            const hits = await github.searchRepos(query, maxPages);
            for (const hit of hits)
                seen.set(hit.fullName, hit);
        }
    }
    catch (error) {
        if (error instanceof GitHubRateLimitError) {
            return { total: 0, added: 0, updated: 0, skipped: 0, error: error.message };
        }
        throw error;
    }
    const candidates = [...seen.values()];
    let added = 0;
    let updated = 0;
    let skipped = 0;
    let firstError = null;
    // Core-rate-limit frugality: raw file fetches are NOT rate limited, but the
    // releases / latest-tag endpoints count against the core limit (60/h anonymous).
    // Anonymous syncs therefore fetch full release history only for the top repos
    // by stars; authenticated syncs (token configured) fetch everything.
    const authenticated = github.token !== null;
    const detailTop = authenticated ? Number.POSITIVE_INFINITY : 30;
    for (let i = 0; i < candidates.length; i++) {
        const hit = candidates[i];
        onProgress?.(`正在同步 ${hit.fullName}`, i + 1, candidates.length);
        try {
            const existing = db.getPluginByRepo(hit.fullName);
            const unchanged = existing !== undefined && !force && existing.updatedAt === (hit.pushedAt || hit.updatedAt);
            if (unchanged && existing.packageJson !== '{}') {
                skipped++;
                continue;
            }
            const pkgRaw = await github.rawFile(hit.owner, hit.repo, hit.defaultBranch, 'package.json');
            let pkg = null;
            if (pkgRaw) {
                try {
                    pkg = JSON.parse(pkgRaw);
                }
                catch {
                    pkg = null;
                }
            }
            if (!pkg || !isDshPlugin(pkg)) {
                // Not (or no longer) a dsh plugin: keep a previously cached row, skip new ones.
                if (existing)
                    skipped++;
                continue;
            }
            const packageName = String(pkg.name ?? hit.repo).trim();
            if (!packageName)
                continue;
            const existingByName = db.getPlugin(packageName);
            const wantsDetails = i < detailTop;
            const [releases, readme, downloads, latestTag] = await Promise.all([
                wantsDetails ? github.releases(hit.owner, hit.repo) : Promise.resolve([]),
                github.rawFile(hit.owner, hit.repo, hit.defaultBranch, 'README.md')
                    ?? await github.rawFile(hit.owner, hit.repo, hit.defaultBranch, 'readme.md'),
                // npm monthly downloads come from the public npm API — no GitHub token
                // needed. 0 means the package is unpublished or the query failed; we
                // never fabricate a number (no stars×N estimation).
                github.npmDownloads(packageName),
                wantsDetails ? github.latestReleaseTag(hit.owner, hit.repo) : Promise.resolve(null),
            ]);
            const version = String(pkg.version ?? latestTag ?? '') || null;
            const usage = extractUsage(readme ?? '');
            const screenshots = extractScreenshots(readme ?? '', hit.fullName, hit.defaultBranch);
            const dsh = (pkg.dsh ?? {});
            const group = dsh.pluginManager?.group;
            const categories = deriveCategories(pkg, hit.topics, group);
            const fullDescription = pkg.description || hit.description || '';
            const now = new Date().toISOString();
            const fallbackVersion = { version: version ?? '', publishedAt: null, changelog: null, tagName: latestTag };
            db.upsertPlugin({
                packageName,
                repoFullName: hit.fullName,
                repoUrl: `https://github.com/${hit.fullName}`,
                name: String(pkg.displayName ?? pkg.name ?? hit.repo),
                description: fullDescription,
                shortDescription: shortDescription(hit.description, fullDescription),
                developer: hit.owner,
                iconUrl: hit.avatarUrl,
                categories: JSON.stringify(categories),
                version,
                stars: hit.stars,
                downloads,
                forks: hit.forks,
                topics: JSON.stringify(hit.topics),
                license: hit.license,
                homepage: String(pkg.homepage ?? hit.homepage ?? '') || null,
                defaultBranch: hit.defaultBranch,
                readme: readme ?? '',
                usage,
                screenshots: JSON.stringify(screenshots),
                packageJson: JSON.stringify(pkg),
                updatedAt: hit.pushedAt || hit.updatedAt,
                syncedAt: now,
            });
            db.replaceVersions(packageName, releases.length > 0 ? releases : [fallbackVersion]);
            db.replaceDependencies(packageName, dependencyEdges(pkg));
            if (existingByName)
                updated++;
            else
                added++;
        }
        catch (error) {
            if (error instanceof GitHubRateLimitError) {
                firstError ??= error.message;
                break;
            }
            firstError ??= error instanceof Error ? error.message : String(error);
        }
    }
    const now = new Date().toISOString();
    db.setMeta('last_sync_at', now);
    db.setMeta('last_sync_total', String(candidates.length));
    db.setMeta('last_sync_error', firstError ?? '');
    return { total: candidates.length, added, updated, skipped, error: firstError };
}
