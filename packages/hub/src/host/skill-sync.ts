/**
 * 0.1.7 Skill registry sync — collects conversation-callable skills
 * (SKILL.md) from the whole ecosystem.
 *
 * SKILL.md is a universal format (Claude / agent-skills conventions), so every
 * skill works in dsh — we collect from multiple topics, not only dsh-tagged
 * repos: dsh-skill / claude-skills / agent-skills / skills / claude-skill.
 *
 * Each repo may be a single-skill bundle (root SKILL.md) or a collection
 * (`.agents/skills/`, `.claude/skills/`, `skills/`). We index every SKILL.md
 * found: frontmatter (name / description / version) + full content for the
 * store UI, derive usage categories from the description, tag the platform
 * (`dsh` vs general), and install copies the same bundle into
 * `$DSH_HOME/skills/<name>/` where dsh's skill-filesystem discovers it for
 * in-conversation use.
 *
 * Fail-safe: a fetch failure keeps the previous table; sync failure never
 * blocks the mirror or any other store function.
 */
import type { GitHubClient, GitHubRepoHit } from './github.js';
import type { SkillRow, StoreDB } from './store-db.js';

/** SKILL.md is format-agnostic — collect from every relevant topic. */
const SKILL_TOPIC_QUERIES = [
  'topic:dsh-skill',
  'topic:claude-skills',
  'topic:agent-skills',
  'topic:skills',
  'topic:claude-skill',
];
const PER_TOPIC_LIMIT = 30;
const MAX_REPOS = 150;
const CANDIDATE_DIRS = ['.agents/skills', '.claude/skills', 'skills', ''];

/** Usage-category keywords (mirror of the store's 12 categories). */
const SKILL_CAT_KEYS: Record<string, string[]> = {
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

export interface SkillSyncResult {
  ok: boolean;
  repos: number;
  skills: number;
  error?: string;
}

interface FetchedSkill {
  repo: string;
  dir: string;
  content: string;
}

/** Derive usage categories from a skill's description. */
export function deriveSkillCategories(description: string): string[] {
  const found = new Set<string>();
  const s = String(description ?? '').toLowerCase();
  for (const [cat, keys] of Object.entries(SKILL_CAT_KEYS)) {
    for (const k of keys) {
      if (s.includes(k)) { found.add(cat); break; }
    }
  }
  if (found.size === 0) found.add('other');
  return ['tool', 'agent', 'ui', 'data', 'vision', 'docs', 'memory', 'usage', 'notify', 'dev', 'chat', 'hub', 'other']
    .filter((c) => found.has(c));
}

/** Platform tag: `dsh` when the repo/description mentions DeepSeek Harness. */
export function platformOf(repo: string, description: string): 'dsh' | 'general' {
  return /dsh|deepseek/.test(`${repo} ${description}`.toLowerCase()) ? 'dsh' : 'general';
}

/** Extract YAML frontmatter fields we care about. */
export function parseSkillFrontmatter(md: string): { name: string; description: string; descriptionZh: string; version: string } {
  const out = { name: '', description: '', descriptionZh: '', version: '' };
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(md.trim());
  if (!m) return out;
  const body = m[1];
  const pick = (key: string): string => {
    const re = new RegExp(`^\\s*${key}\\s*:\\s*(.+?)\\s*$`, 'm');
    const hit = re.exec(body);
    if (!hit) return '';
    return hit[1].replace(/^["']|["']$/g, '').trim();
  };
  out.name = pick('name');
  out.description = pick('description') || pick('description_en');
  out.descriptionZh = pick('description_zh');
  out.version = pick('version');
  return out;
}

/** List a repo directory via the contents API; [] on 404/error. */
async function listDir(github: GitHubClient, repo: string, dir: string): Promise<Array<{ name: string; type: string }>> {
  const path = dir ? `/repos/${repo}/contents/${encodeURIComponent(dir)}` : `/repos/${repo}/contents`;
  try {
    const data = await github.apiGet<Array<{ name?: string; type?: string }> | { message?: string }>(path);
    if (!Array.isArray(data)) return [];
    return data
      .filter((f) => f && typeof f.name === 'string')
      .map((f) => ({ name: String(f.name), type: String(f.type ?? 'file') }));
  } catch {
    return [];
  }
}

export async function syncSkills(github: GitHubClient, db: StoreDB): Promise<SkillSyncResult> {
  try {
    // Collect repos across every skill-related topic (dedup by full name).
    const byName = new Map<string, GitHubRepoHit>();
    for (const topic of SKILL_TOPIC_QUERIES) {
      const hits = await github.searchRepos(topic, 1, 100);
      for (const h of hits) if (!byName.has(h.fullName)) byName.set(h.fullName, h);
      if (byName.size >= MAX_REPOS) break;
    }
    const targets = [...byName.values()].slice(0, MAX_REPOS);
    const fetched: FetchedSkill[] = [];

    // Concurrently (bounded) scan each repo for SKILL.md files.
    const queue = [...targets];
    const workers = Array.from({ length: 4 }, async () => {
      while (queue.length > 0) {
        const repo = queue.shift();
        if (!repo) return;
        const { fullName } = repo;
        for (const dir of CANDIDATE_DIRS) {
          const entries = await listDir(github, fullName, dir);
          const skills = entries.filter((e) => e.type === 'file' && e.name.toLowerCase() === 'skill.md');
          for (const s of skills) {
            const filePath = dir ? `${dir}/SKILL.md` : 'SKILL.md';
            const content = await github.rawFile(fullName.split('/')[0], fullName.split('/')[1], 'HEAD', filePath);
            if (content && content.trim().length > 0) fetched.push({ repo: fullName, dir, content });
          }
        }
      }
    });
    await Promise.all(workers);

    const rows: SkillRow[] = [];
    const seen = new Set<string>();
    for (const f of fetched) {
      const meta = parseSkillFrontmatter(f.content);
      const name = meta.name || f.repo.split('/')[1] || 'skill';
      const id = `${f.repo}:${name}`;
      if (seen.has(id)) continue;
      seen.add(id);
      const description = meta.description || meta.descriptionZh || '';
      rows.push({
        id,
        name,
        description: meta.description,
        descriptionZh: meta.descriptionZh,
        version: meta.version,
        author: f.repo.split('/')[0] ?? '',
        repoFullName: f.repo,
        skillPath: f.dir ? `${f.dir}/SKILL.md` : 'SKILL.md',
        categories: deriveSkillCategories(description),
        platform: platformOf(f.repo, description),
        content: f.content.slice(0, 60_000),
      });
    }

    const n = db.replaceSkills(rows);
    db.setMeta('skill_synced_at', new Date().toISOString());
    db.setMeta('skill_total', String(n));
    return { ok: true, repos: targets.length, skills: n };
  } catch (error) {
    return { ok: false, repos: 0, skills: 0, error: error instanceof Error ? error.message : String(error) };
  }
}
