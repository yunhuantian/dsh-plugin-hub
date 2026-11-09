/** SKILL.md is format-agnostic — collect from every relevant topic. */
const SKILL_TOPIC_QUERIES = [
    'topic:dsh-skill',
    'topic:claude-skills',
    'topic:agent-skills',
    'topic:skills',
    'topic:claude-skill',
];
const PER_TOPIC_LIMIT = 100;
const MAX_REPOS = 150;
const CANDIDATE_DIRS = ['.agents/skills', '.claude/skills', 'skills', ''];
/** Deep enough for monorepos, shallow enough to skip bundled examples. */
const MAX_SKILL_PATH_SEGMENTS = 8;
const MAX_SKILLS_PER_REPO = 30;
const MAX_TOTAL_SKILLS = 800;
const MAX_FALLBACK_DIRS = 40;
const IGNORED_SEGMENTS = new Set([
    'node_modules', 'vendor', 'dist', 'build', '.git', '.next', 'coverage', '.cache',
]);
/** Usage-category keywords (mirror of the store's 12 categories). */
const SKILL_CAT_KEYS = {
    tool: ['tool', 'utility', 'workflow', 'cli', 'command', '工具', '自动化'],
    agent: ['agent', 'persona', 'role', '角色', 'autonomous'],
    ui: ['ui', 'interface', 'theme', 'sidebar', '界面', '美化', '美化'],
    data: ['data', 'csv', 'excel', 'sql', 'database', 'pandas', '数据', '表格', '分析'],
    vision: ['image', 'vision', 'ocr', 'video', 'screenshot', 'photo', '图像', '图片', '视频', '视觉', 'multimodal', '摄影'],
    docs: ['document', 'office', 'word', 'pptx', 'pdf', 'markdown', 'report', '论文', '文章', '文档', '笔记', '写作'],
    memory: ['memory', 'remember', 'knowledge', 'rag', 'vector', '记忆', '知识'],
    usage: ['usage', 'token', 'cost', 'analytics', '用量', '费用', '统计', '监控'],
    notify: ['notify', 'notification', 'alert', 'mail', 'email', 'telegram', 'slack', 'webhook', '通知', '邮件'],
    dev: ['code', 'coding', 'debug', 'test', 'testing', 'review', 'git', 'refactor', 'commit', 'bug', '代码', '开发', '测试', '调试', '重构'],
    chat: ['chat', 'conversation', 'prompt', 'session', '对话', '提示词'],
    hub: ['hub', 'marketplace', 'registry', 'store', 'catalog', 'index', '商店', '索引'],
};
/** Derive usage categories from a skill's description. */
export function deriveSkillCategories(description) {
    const found = new Set();
    const s = String(description ?? '').toLowerCase();
    for (const [cat, keys] of Object.entries(SKILL_CAT_KEYS)) {
        for (const k of keys) {
            if (s.includes(k)) {
                found.add(cat);
                break;
            }
        }
    }
    if (found.size === 0)
        found.add('other');
    return ['tool', 'agent', 'ui', 'data', 'vision', 'docs', 'memory', 'usage', 'notify', 'dev', 'chat', 'hub', 'other']
        .filter((c) => found.has(c));
}
/** Platform tag: `dsh` when the repo/description mentions DeepSeek Harness. */
export function platformOf(repo, description) {
    return /dsh|deepseek/.test(`${repo} ${description}`.toLowerCase()) ? 'dsh' : 'general';
}
/** Extract YAML frontmatter fields we care about. */
export function parseSkillFrontmatter(md) {
    const out = { name: '', description: '', descriptionZh: '', version: '' };
    const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(md.trim());
    if (!m)
        return out;
    const body = m[1];
    const lines = body.split(/\r?\n/);
    const pick = (key) => {
        const lineRe = new RegExp(`^\\s*${key}\\s*:\\s*(.*)$`);
        const idx = lines.findIndex((line) => lineRe.test(line));
        if (idx < 0)
            return '';
        const inline = lineRe.exec(lines[idx])?.[1]?.trim() ?? '';
        // YAML block scalar (`description: |` / `>`): the value is on the following
        // indented lines. Without this, skills using a block scalar show "|".
        if (/^[|>][-+]?$/.test(inline.replace(/\s*#.*$/, ''))) {
            const folded = inline.startsWith('>');
            const collected = [];
            for (let i = idx + 1; i < lines.length; i++) {
                const line = lines[i];
                if (line.trim() === '') {
                    if (collected.length > 0)
                        collected.push('');
                    continue;
                }
                if (!/^\s/.test(line))
                    break;
                collected.push(line.trim());
            }
            return collected.join(folded ? ' ' : '\n').trim();
        }
        return inline.replace(/^["']|["']$/g, '').trim();
    };
    out.name = pick('name');
    out.description = pick('description') || pick('description_en');
    out.descriptionZh = pick('description_zh');
    out.version = pick('version');
    return out;
}
/** List a repo directory via the contents API; [] on 404/error. */
async function listDir(github, repo, dir) {
    const path = dir ? `/repos/${repo}/contents/${encodeURIComponent(dir)}` : `/repos/${repo}/contents`;
    try {
        const data = await github.apiGet(path);
        if (!Array.isArray(data))
            return [];
        return data
            .filter((f) => f && typeof f.name === 'string')
            .map((f) => ({ name: String(f.name), type: String(f.type ?? 'file') }));
    }
    catch {
        return [];
    }
}
/** A path that looks like a single skill bundle. */
function looksLikeSkillPath(path) {
    const segs = String(path ?? '').split('/').filter(Boolean);
    if (segs.length === 0 || segs.length > MAX_SKILL_PATH_SEGMENTS)
        return false;
    if (segs.some((s) => IGNORED_SEGMENTS.has(s)))
        return false;
    return /^skill\.md$/i.test(segs[segs.length - 1]);
}
/**
 * Find every SKILL.md path in a repo.
 * One git-tree call covers the whole repo; a bounded directory walk covers
 * repos whose tree is unavailable or truncated (huge monorepos).
 */
async function findSkillPaths(github, repo, branch) {
    try {
        const tree = await github.apiGet(`/repos/${repo}/git/trees/${branch}`, { recursive: '1' });
        if (Array.isArray(tree?.tree) && tree.truncated !== true) {
            return tree.tree
                .filter((e) => e && String(e.type ?? 'blob') !== 'tree' && looksLikeSkillPath(String(e.path)))
                .map((e) => String(e.path))
                .slice(0, MAX_SKILLS_PER_REPO);
        }
    }
    catch { /* tree unavailable — fall back to directory walk */ }
    const found = [];
    const visited = new Set();
    const queue = CANDIDATE_DIRS.map((dir) => ({ dir, depth: 0 }));
    while (queue.length > 0 && found.length < MAX_SKILLS_PER_REPO && visited.size < MAX_FALLBACK_DIRS) {
        const { dir, depth } = queue.shift();
        if (visited.has(dir))
            continue;
        visited.add(dir);
        const entries = await listDir(github, repo, dir);
        for (const entry of entries) {
            const path = dir ? `${dir}/${entry.name}` : entry.name;
            if (entry.type === 'file' && /^skill\.md$/i.test(entry.name) && looksLikeSkillPath(path)) {
                found.push(path);
            }
            else if (entry.type === 'dir' && depth < 3 && !IGNORED_SEGMENTS.has(entry.name)) {
                queue.push({ dir: path, depth: depth + 1 });
            }
        }
    }
    return found;
}
/**
 * Fetch a SKILL.md through the contents API (base64 payload).
 *
 * `raw.githubusercontent.com` is blocked on some networks (e.g. mainland
 * China); the old `rawFile`-based sync then collected 0 skills with no error.
 * The contents API lives on the same host as the rest of the sync.
 */
async function fetchSkillContent(github, repo, branch, filePath) {
    const apiPath = `/repos/${repo}/contents/${filePath.split('/').map(encodeURIComponent).join('/')}`;
    const data = await github.apiGet(apiPath, { ref: branch });
    if (!data || data.type === 'dir' || typeof data.content !== 'string')
        return null;
    const raw = String(data.content);
    if (data.encoding === 'base64')
        return Buffer.from(raw.replace(/\s+/g, ''), 'base64').toString('utf8');
    return raw;
}
/** Make a frontmatter name safe to use as a skill directory name. */
function safeSkillName(name, fallback) {
    const cleaned = String(name || '')
        .replace(/[\\/:*?"<>|]/g, '-')
        .replace(/[\u0000-\u001f]/g, '')
        .trim()
        .slice(0, 80);
    return cleaned || fallback;
}
export async function syncSkills(github, db) {
    let apiErrors = 0;
    let lastError = '';
    try {
        // Collect repos across every skill-related topic (dedup by full name).
        const byName = new Map();
        for (const topic of SKILL_TOPIC_QUERIES) {
            const hits = await github.searchRepos(topic, 1, PER_TOPIC_LIMIT);
            for (const h of hits)
                if (!byName.has(h.fullName))
                    byName.set(h.fullName, h);
            if (byName.size >= MAX_REPOS)
                break;
        }
        const targets = [...byName.values()].slice(0, MAX_REPOS);
        const rows = [];
        const seen = new Set();
        // Concurrently (bounded) scan each repo for SKILL.md files.
        const queue = [...targets];
        const workers = Array.from({ length: 4 }, async () => {
            while (queue.length > 0) {
                const repo = queue.shift();
                if (!repo)
                    return;
                const branch = repo.defaultBranch || 'HEAD';
                let paths = [];
                try {
                    paths = await findSkillPaths(github, repo.fullName, branch);
                }
                catch (error) {
                    apiErrors++;
                    lastError = error instanceof Error ? error.message : String(error);
                    continue;
                }
                for (const filePath of paths) {
                    if (rows.length >= MAX_TOTAL_SKILLS)
                        return;
                    let content = null;
                    try {
                        content = await fetchSkillContent(github, repo.fullName, branch, filePath);
                    }
                    catch (error) {
                        apiErrors++;
                        lastError = error instanceof Error ? error.message : String(error);
                    }
                    if (content === null)
                        content = await github.rawFile(repo.owner, repo.repo, branch, filePath);
                    if (!content || content.trim().length === 0)
                        continue;
                    const meta = parseSkillFrontmatter(content);
                    const fallback = repo.repo || repo.fullName.split('/')[1] || 'skill';
                    const name = safeSkillName(meta.name, fallback);
                    const id = `${repo.fullName}:${name}`;
                    if (seen.has(id))
                        continue;
                    seen.add(id);
                    const description = meta.description || meta.descriptionZh || '';
                    rows.push({
                        id,
                        name,
                        description: meta.description,
                        descriptionZh: meta.descriptionZh,
                        version: meta.version,
                        author: repo.owner || '',
                        repoFullName: repo.fullName,
                        skillPath: filePath,
                        categories: deriveSkillCategories(description),
                        platform: platformOf(repo.fullName, description),
                        content: content.slice(0, 60_000),
                    });
                }
            }
        });
        await Promise.all(workers);
        const n = db.replaceSkills(rows);
        db.setMeta('skill_synced_at', new Date().toISOString());
        db.setMeta('skill_total', String(n));
        db.setMeta('skill_error', '');
        if (n === 0 && apiErrors > 0) {
            return { ok: false, repos: targets.length, skills: 0, error: `scan failed for ${targets.length} repos: ${lastError}` };
        }
        return { ok: true, repos: targets.length, skills: n };
    }
    catch (error) {
        return { ok: false, repos: 0, skills: 0, error: error instanceof Error ? error.message : String(error) };
    }
}
