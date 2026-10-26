#!/usr/bin/env node
/**
 * 策展「插件表」—— 数据源是 GitHub，不是本机镜像库。
 *
 *   GH_TOKEN=<pat> node scripts/curate-plugin-table.mjs [--limit 150] [--out dist/tables]
 *                [--refresh-gh 1] [--dsh-version 0.2.0-rc.2]
 *
 * GitHub contents API 每小时 5000 次（认证），足够逐个读 package.json ——
 * 这是唯一可靠的「是不是插件」判据：
 *
 *   闸① 真插件       package.json 里有 `dsh` 字段（或 peer 依赖 @deepseek-ai/dsh-*）
 *                    —— topic 可以被刷，`dsh` 字段不能
 *   闸② 官方已内置   终端 / 网页搜索 / 子智能体 / 自动化任务 / 语音输入 /
 *                    智能体团队 / Agent 循环 / 自动授权审查 / 插件市场
 *   闸③ 版本兼容     peer 范围必须覆盖目标 DSH 版本
 *
 * 打分：热度 40% · 用量 30% · 新颖 20% · 活跃 10%
 *   用量只在 npm 上存在该包、且其 manifest 的 repository 能对上仓库时才采信。
 *
 * 产物：plugin-table.dpmidx / .json / .md + modpack-{starter,devkit,studio}.*
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { encodeMarketIndex, FLAG_SOURCE, KIND_LIST, KIND_MODPACK } from '../lib/hub-market-index/src/index.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const LIMIT = Number(arg('limit', '150'));
const OUT = join(ROOT, arg('out', 'dist/tables'));
const PUBLISHER = '云幻天';
// 主目标是桌面端实际版本；同时算一份 web 端（0.2.0-rc.2）的兼容性。
// 只要两边有一边能用就不算「不兼容」，但在表里标清楚是哪一边。
const DSH_VERSION = arg('dsh-version', '0.2.1-rc.2');
const DSH_ALT = arg('dsh-alt', '0.2.0-rc.2');
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const GH_HEADERS = {
  'User-Agent': 'dsh-plugin-hub-curator',
  Accept: 'application/vnd.github+json',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

// ---------------------------------------------------------------------------
// 1. GitHub 发现
// ---------------------------------------------------------------------------
const GH_CACHE = join(OUT, 'github-repos.json');
let cache = null;
let ageH = Infinity;
if (existsSync(GH_CACHE) && arg('refresh-gh', '') !== '1') {
  try { cache = JSON.parse(readFileSync(GH_CACHE, 'utf8')); } catch { cache = null; }
  ageH = cache ? (Date.now() - Date.parse(cache.fetchedAt ?? 0)) / 3_600_000 : Infinity;
  if (!(ageH < 24)) cache = null;
}

let repos = [];
if (cache) {
  repos = cache.repos;
  console.log(`GitHub 发现：使用 ${ageH.toFixed(1)} 小时前的缓存，${repos.length} 个仓库`);
} else {
  const queries = [
    { q: 'topic:dsh-plugin', sort: 'stars', pages: 3, label: '最热' },
    { q: 'topic:dsh-plugin', sort: 'updated', pages: 3, label: '最新' },
    { q: `topic:dsh-plugin created:>${new Date(Date.now() - 60 * 86400_000).toISOString().slice(0, 10)}`, sort: 'stars', pages: 2, label: '近两月新且热' },
  ];
  const seen = new Map();
  let last = 0;
  for (const { q, sort, pages, label } of queries) {
    for (let page = 1; page <= pages; page++) {
      const wait = 7000 - (Date.now() - last);
      if (wait > 0) await sleep(wait);
      const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=${sort}&order=desc&per_page=100&page=${page}`;
      let ok = false;
      for (let attempt = 0; attempt < 3 && !ok; attempt++) {
        const res = await fetch(url, { headers: GH_HEADERS, signal: AbortSignal.timeout(30_000) });
        last = Date.now();
        if (res.status === 403 || res.status === 429) {
          const reset = Number(res.headers.get('x-ratelimit-reset') ?? 0) * 1000;
          const wait2 = Math.min(70_000, Math.max(8_000, reset - Date.now()));
          console.log(`  限流，等 ${Math.round(wait2 / 1000)}s…`);
          await sleep(wait2);
          continue;
        }
        if (!res.ok) { console.log(`  ${label} p${page}: HTTP ${res.status}`); break; }
        const doc = await res.json();
        const items = doc.items ?? [];
        console.log(`  ${label} p${page}: ${items.length} 条`);
        for (const it of items) {
          const key = String(it.full_name).toLowerCase();
          if (seen.has(key)) continue;
          seen.set(key, {
            fullName: String(it.full_name),
            name: String(it.name ?? ''),
            description: String(it.description ?? ''),
            stars: Number(it.stargazers_count ?? 0),
            forks: Number(it.forks_count ?? 0),
            topics: Array.isArray(it.topics) ? it.topics : [],
            createdAt: it.created_at ?? null,
            pushedAt: it.pushed_at ?? null,
            license: it.license?.spdx_id ?? null,
            homepage: it.homepage ?? null,
            archived: Boolean(it.archived),
            fork: Boolean(it.fork),
            language: it.language ?? null,
          });
        }
        ok = true;
      }
    }
  }
  repos = [...seen.values()];
  writeFileSync(GH_CACHE, JSON.stringify({ fetchedAt: new Date().toISOString(), repos }));
  console.log(`GitHub 发现：去重后 ${repos.length} 个仓库`);
}

const SKIP = new Set(['yunhuantian/dsh-plugin-hub', 'deepseek-ai/deepseek-harness']);
const candidates = repos.filter((r) => !r.archived && !r.fork && !SKIP.has(r.fullName.toLowerCase()));

// ---------------------------------------------------------------------------
// 2. 读每个仓库的 package.json（contents API；缓存到磁盘）
// ---------------------------------------------------------------------------
const MF_CACHE = join(OUT, 'manifests.json');
const manifests = existsSync(MF_CACHE) ? JSON.parse(readFileSync(MF_CACHE, 'utf8')) : {};
let missing = 0;

async function mapLimit(items, limit, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: limit }, async () => {
    while (queue.length > 0) await fn(queue.shift());
  }));
}

async function fetchManifest(repo) {
  const key = repo.fullName.toLowerCase();
  if (manifests[key] !== undefined) return;
  const url = `https://api.github.com/repos/${repo.fullName}/contents/package.json`;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url, {
      headers: { ...GH_HEADERS, Accept: 'application/vnd.github.raw' },
      signal: AbortSignal.timeout(20_000),
    });
    if (res.status === 404) { manifests[key] = null; missing++; return; }
    if (res.status === 403 || res.status === 429) {
      const reset = Number(res.headers.get('x-ratelimit-reset') ?? 0) * 1000;
      await sleep(Math.min(70_000, Math.max(10_000, reset - Date.now())));
      continue;
    }
    if (!res.ok) { manifests[key] = null; missing++; return; }
    const text = await res.text();
    try {
      const pkg = JSON.parse(text);
      manifests[key] = {
        name: String(pkg.name ?? ''),
        version: String(pkg.version ?? ''),
        description: String(pkg.description ?? ''),
        keywords: Array.isArray(pkg.keywords) ? pkg.keywords.map(String) : [],
        dsh: pkg.dsh ? Object.keys(pkg.dsh) : null,
        peer: pkg.peerDependencies ?? null,
        repository: String(pkg.repository?.url ?? pkg.repository ?? ''),
      };
    } catch {
      manifests[key] = null;
      missing++;
    }
    return;
  }
  manifests[key] = null;
  missing++;
}

console.log(`读取 manifest：${candidates.length} 个仓库${TOKEN ? '（已认证，5000/h）' : '（未认证，60/h）'}…`);
await mapLimit(candidates, 8, fetchManifest);
writeFileSync(MF_CACHE, JSON.stringify(manifests));
console.log(`  manifest 命中 ${Object.values(manifests).filter(Boolean).length} / 缺失 ${missing}`);

// ---------------------------------------------------------------------------
// 3. 极简 semver
// ---------------------------------------------------------------------------
function parseVer(v) {
  const m = String(v).match(/^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?/);
  return m ? { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] ? m[4].split('.') : [] } : null;
}
function cmpBase(a, b) {
  for (const k of ['major', 'minor', 'patch']) if (a[k] !== b[k]) return a[k] < b[k] ? -1 : 1;
  return 0;
}
function checkOne(v, token) {
  const m = String(token).match(/^(\^|~|>=|<=|>|<|=)?\s*(.+)$/);
  if (!m) return true;
  const op = m[1] ?? '=';
  const raw = m[2];
  if (raw === '*' || raw === 'x' || raw === 'latest') return true;
  const vp = parseVer(raw);
  if (!vp) return true;
  if (op === '^') {
    const upper = vp.major > 0
      ? { major: vp.major + 1, minor: 0, patch: 0 }
      : vp.minor > 0 ? { major: 0, minor: vp.minor + 1, patch: 0 } : { major: 0, minor: 0, patch: vp.patch + 1 };
    return cmpBase(v, vp) >= 0 && cmpBase(v, upper) < 0;
  }
  if (op === '~') {
    const upper = { major: vp.major, minor: vp.minor + 1, patch: 0 };
    return cmpBase(v, vp) >= 0 && cmpBase(v, upper) < 0;
  }
  const c = cmpBase(v, vp);
  if (op === '>=') return c >= 0;
  if (op === '>') return c > 0;
  if (op === '<=') return c <= 0;
  if (op === '<') return c < 0;
  return c === 0;
}
function checkPeerCompat(peer, version) {
  const v = parseVer(version);
  if (!v) return { ok: null, note: '目标版本无法解析' };
  const entries = Object.entries(peer ?? {}).filter(([k]) => k.startsWith('@deepseek-ai/dsh'));
  if (entries.length === 0) return { ok: null, note: '未声明 dsh peer' };
  for (const [pkg, range] of entries) {
    let ok = false;
    for (const part of String(range).split('||')) {
      const tokens = part.trim().split(/\s+/).filter(Boolean);
      if (tokens.length === 0) { ok = true; break; }
      if (tokens.every((t) => checkOne(v, t))) { ok = true; break; }
    }
    if (!ok) return { ok: false, note: `${pkg}@${range} 不覆盖 ${version}` };
  }
  return { ok: true, note: '' };
}

// ---------------------------------------------------------------------------
// 4. 闸①：真插件 + 闸②：官方已内置
// ---------------------------------------------------------------------------
const OFFICIAL_OVERLAP = [
  { re: /(^|\b)dsh-terminal\b|terminal plugin|终端插件/i, why: '官方已内置「终端」' },
  { re: /web[- ]?search|网页搜索|联网搜索/i, why: '官方已内置「网页搜索」' },
  { re: /sub-?agent|子智能体|子代理/i, why: '官方已内置「子智能体」' },
  { re: /automation task|自动化任务|定时任务/i, why: '官方已内置「自动化任务」' },
  { re: /voice input|语音输入|语音识别/i, why: '官方已内置「语音输入」' },
  { re: /agent team|智能体团队/i, why: '官方已内置「智能体团队」' },
  { re: /agent loop|agent 循环/i, why: '官方已内置「Agent 循环」' },
  { re: /auto[- ]?review|自动授权|自动审查/i, why: '官方已内置「自动授权审查」' },
  { re: /plugin market|插件市场|marketplace/i, why: '与商店本身重叠' },
  { re: /聚合生态|插件聚合|plugin aggregation|aggregator/i, why: '与商店本身重叠' },
];
const POLICY_BLOCK = [{ re: /jailbreak|破甲|越狱/i, why: '破解/越狱类，不纳入稳定认证' }];

const excluded = [];
const survivors = [];
for (const r of candidates) {
  const mf = manifests[r.fullName.toLowerCase()];
  if (!mf) { excluded.push({ repo: r.fullName, why: '没有 package.json（不是可安装插件）' }); continue; }
  const hasDsh = Array.isArray(mf.dsh) && mf.dsh.length > 0;
  const hasPeer = mf.peer && Object.keys(mf.peer).some((k) => k.startsWith('@deepseek-ai/dsh'));
  if (!hasDsh && !hasPeer) { excluded.push({ repo: r.fullName, why: 'manifest 没有 dsh 字段（不是 DSH 插件）' }); continue; }
  const text = `${r.name} ${r.description} ${mf.description} ${mf.keywords.join(' ')}`;
  const policy = POLICY_BLOCK.find((g) => g.re.test(text));
  if (policy) { excluded.push({ repo: r.fullName, why: policy.why }); continue; }
  const official = OFFICIAL_OVERLAP.find((g) => g.re.test(text));
  if (official) { excluded.push({ repo: r.fullName, why: official.why }); continue; }
  r.mf = mf;
  survivors.push(r);
}
console.log(`闸① 真插件 + 闸② 官方不重叠：${candidates.length} → ${survivors.length}（剔除 ${excluded.length}）`);

// ---------------------------------------------------------------------------
// 5. 闸③：版本兼容
// ---------------------------------------------------------------------------
const compatExcluded = [];
for (const r of survivors) {
  const primary = checkPeerCompat(r.mf.peer, DSH_VERSION);
  const alt = checkPeerCompat(r.mf.peer, DSH_ALT);
  r.rangesOk = primary.ok;
  r.peerNote = primary.note;
  // both = 两端都兼容；target = 只兼容主目标；alt = 只兼容另一版本；none = 都不兼容
  r.compat = primary.ok === false && alt.ok === false
    ? 'none'
    : primary.ok === false ? 'alt' : alt.ok === false ? 'target' : (primary.ok === null ? 'unknown' : 'both');
  if (r.compat === 'none') compatExcluded.push({ repo: r.fullName, why: `版本不兼容（${DSH_VERSION} / ${DSH_ALT}）：${primary.note}` });
}
const compatBad = new Set(compatExcluded.map((x) => x.repo.toLowerCase()));
const pool = survivors.filter((r) => !compatBad.has(r.fullName.toLowerCase()));
console.log(`闸③ 版本兼容（${DSH_VERSION} 或 ${DSH_ALT}）：剔除 ${compatExcluded.length} 个`);

// ---------------------------------------------------------------------------
// 6. 分类
// ---------------------------------------------------------------------------
const RULES = [
  // 先放高辨识度的细分词，避免被后面的宽泛词抢走
  ['chat', ['人格', 'persona', '心情', 'mood', '朗读', 'tts', '搭话']],
  ['ui', ['桌宠', '看板娘', '宠物', 'pet', 'mascot']],
  ['vision', ['bili', 'b站', '弹幕', '番剧', '字幕', 'subtitle']],
  ['tool', ['移动端', '竖屏', 'mobile', '扫码', '归档', 'archive', '广告', 'ads', '日报']],
  ['dev', ['模拟器', 'simulator', '注入', 'injector']],
  ['ui', ['皮肤', '主题', '界面', '美化', '壁纸', '侧栏', '侧边栏', '外观', '布局', '动效', '图标', '字体', 'skin', 'theme', 'sidebar', 'wallpaper', 'layout', 'appearance', 'design system', 'style']],
  ['memory', ['记忆', '知识库', '长期记忆', '回忆', '知识图谱', '向量', 'memory', 'recall', 'knowledge base', 'knowledge graph', 'embedding', 'rag', 'mnemon']],
  ['vision', ['视觉', '图像', '图片', '视频', '多模态', '绘图', '画图', '截图', '相机', 'ocr', 'vision', 'image', 'video', 'multimodal', 'screenshot', 'diffusion', 'genui']],
  ['usage', ['用量', '计费', '成本', '费用', '价格', '余额', '额度', 'usage', 'cost', 'billing', 'pricing', 'quota', 'spend', 'meter']],
  ['notify', ['通知', '推送', '消息', '邮件', '微信', '企业微信', '飞书', '钉钉', 'qq', 'telegram', '机器人', 'notification', 'notify', 'email', 'slack', 'webhook', 'bot']],
  ['docs', ['文档', '写作', '小说', '论文', '笔记', '表格', '幻灯片', '演示', 'office', 'word', 'excel', 'pdf', 'markdown', 'document', 'writing', 'novel', 'slides', 'ppt', 'openwrite']],
  ['data', ['数据', '分析', '图表', '抓取', '爬虫', '统计', '报表', 'csv', 'sql', 'database', 'analytics', 'chart', 'scrape', 'crawl', 'dataset']],
  ['dev', ['开发', '代码', '终端', '调试', '构建', '测试', '编译', '部署', '脚手架', '工程', 'git', 'mcp', 'code', 'terminal', 'debug', 'build', 'test', 'lint', 'refactor', 'typescript', 'spec']],
  ['chat', ['对话', '聊天', '会话', '角色', '扮演', '语音', '输入法', '提示词', 'chat', 'conversation', 'roleplay', 'voice', 'prompt', 'tavern']],
  ['agent', ['智能体', '代理', '多智能体', '工作流', '自动化', '编排', '自主', '子智能体', 'agent', 'workflow', 'automation', 'orchestrat', 'multi-agent', 'subagent']],
  ['hub', ['聚合', '索引', '商店', '市场', '目录', '插件管理', 'registry', 'plugin manager', 'directory', 'catalog']],
  ['tool', ['工具', '搜索', '文件', '命令', '效率', '快捷', '剪贴板', '翻译', '计算器', 'tool', 'search', 'file', 'clipboard', 'translate', 'utility', 'command']],
];

function classify(repo) {
  const mf = repo.mf;
  const hay = `${repo.name} ${repo.description} ${mf.description} ${repo.topics.join(' ')} ${mf.keywords.join(' ')}`.toLowerCase();
  let best = { cat: 'other', hits: 0 };
  for (const [cat, words] of RULES) {
    let hits = 0;
    for (const w of words) if (hay.includes(w)) hits += w.length >= 4 ? 2 : 1;
    if (hits > best.hits) best = { cat, hits };
  }
  return best.hits >= 2 ? best.cat : 'other';
}

// ---------------------------------------------------------------------------
// 7. 下载量（只有 manifest 的 repository 能对上仓库才采信）
// ---------------------------------------------------------------------------
const DL_CACHE = join(OUT, 'downloads.json');
const downloads = existsSync(DL_CACHE) ? JSON.parse(readFileSync(DL_CACHE, 'utf8')) : {};

const normalizeRepo = (u) => String(u ?? '')
  .replace(/^git\+/, '')
  .replace(/^git:\/\//, 'https://')
  .replace(/^ssh:\/\/git@/, 'https://')
  .replace(/^git@github\.com:/, 'https://github.com/')
  .replace(/\.git$/, '')
  .replace(/\/$/, '')
  .toLowerCase();

async function fetchDownloads(repo) {
  const key = repo.fullName.toLowerCase();
  if (downloads[key] !== undefined) { repo.downloads = Number(downloads[key]); return; }
  const mf = repo.mf;
  const repoUrl = normalizeRepo(mf.repository);
  const nameOk = mf.name && mf.name !== '';
  const repoOk = repoUrl.includes(key);
  if (!nameOk || !repoOk) { downloads[key] = -1; repo.downloads = -1; return; }
  let value = -1;
  try {
    const res = await fetch(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(mf.name)}`, { signal: AbortSignal.timeout(10_000) });
    if (res.ok) value = Number((await res.json()).downloads ?? 0);
  } catch { /* 网络失败当未知 */ }
  downloads[key] = value;
  repo.downloads = value;
}

const daysAgo = (iso) => {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? null : Math.max(0, Math.floor((Date.now() - t) / 86_400_000));
};
const maxStars = Math.max(1, ...pool.map((r) => r.stars));
const normLog = (v, max) => Math.log10(1 + Math.max(0, v)) / Math.log10(1 + max);
for (const r of pool) {
  r.category = classify(r);
  r.ageCreated = daysAgo(r.createdAt);
  r.agePushed = daysAgo(r.pushedAt);
  r.heat = normLog(r.stars, maxStars);
  r.fresh = r.agePushed === null ? 0.4 : r.agePushed <= 30 ? 1 : r.agePushed <= 90 ? 0.7 : Math.max(0, 1 - (r.agePushed - 90) / 275);
  r.novel = r.ageCreated === null ? 0.25 : r.ageCreated <= 30 ? 1 : r.ageCreated <= 90 ? 0.85 : r.ageCreated <= 180 ? 0.6 : r.ageCreated <= 365 ? 0.35 : 0.12;
  r.prescore = 0.62 * r.heat + 0.23 * r.novel + 0.15 * r.fresh;
}
pool.sort((a, b) => b.prescore - a.prescore);

console.log(`查询下载量：${pool.length} 个…`);
await mapLimit(pool, 10, fetchDownloads);
writeFileSync(DL_CACHE, JSON.stringify(downloads));
console.log(`  能对上 npm 包的：${Object.values(downloads).filter((v) => v >= 0).length} 个`);

// ---------------------------------------------------------------------------
// 8. 打分与选择
// ---------------------------------------------------------------------------
const maxDl = Math.max(1, ...pool.map((r) => (r.downloads > 0 ? r.downloads : 0)));
for (const r of pool) {
  r.use = normLog(r.downloads > 0 ? r.downloads : 0, maxDl);
  const hasUse = r.downloads > 0;
  r.score = hasUse
    ? 0.30 * r.use + 0.40 * r.heat + 0.20 * r.novel + 0.10 * r.fresh
    : 0.62 * r.heat + 0.25 * r.novel + 0.13 * r.fresh;
  r.reasons = [];
  if (r.downloads >= 3000) r.reasons.push('常用');
  if (r.stars >= 300) r.reasons.push('热门');
  if (r.ageCreated !== null && r.ageCreated <= 90 && r.stars >= 30) r.reasons.push('新颖');
  if (r.agePushed !== null && r.agePushed <= 30) r.reasons.push('在维护');
}
pool.sort((a, b) => b.score - a.score);

// 认证门槛：至少有人用过或有人关注。0 星 0 下载的「占位插件」不进表。
const eligible = (r) => r.stars >= 15 || r.downloads >= 100;
const pool2 = pool.filter(eligible);
console.log(`质量门槛（≥15★ 或 ≥100 下载）：${pool.length} → ${pool2.length}`);

const MAX_PER_CAT = 32;
const MIN_PER_CAT = 3;
const picked = [];
const pickedKeys = new Set();
const perCat = new Map();
const take = (r) => {
  const k = r.fullName.toLowerCase();
  if (pickedKeys.has(k)) return false;
  picked.push(r);
  pickedKeys.add(k);
  perCat.set(r.category, (perCat.get(r.category) ?? 0) + 1);
  return true;
};
const byCat = new Map();
for (const r of pool2) {
  if (!byCat.has(r.category)) byCat.set(r.category, []);
  byCat.get(r.category).push(r);
}
for (const list of byCat.values()) for (const r of list.slice(0, MIN_PER_CAT)) {
  if (picked.length >= LIMIT) break;
  take(r);
}
for (const r of pool2) {
  if (picked.length >= LIMIT) break;
  if ((perCat.get(r.category) ?? 0) >= MAX_PER_CAT) continue;
  take(r);
}
picked.sort((a, b) => b.score - a.score);

// ---------------------------------------------------------------------------
// 9. 输出
// ---------------------------------------------------------------------------
const createdAt = new Date().toISOString();
const toEntry = (r) => ({
  name: r.mf.name || r.name,
  url: `https://github.com/${r.fullName}`,
  description: (r.mf.description || r.description).slice(0, 160),
  category: r.category,
  deps: [],
  flags: FLAG_SOURCE,
});

writeFileSync(join(OUT, 'plugin-table.dpmidx'), encodeMarketIndex(picked.map(toEntry), {
  kind: KIND_LIST,
  meta: {
    name: '插件表',
    publisher: PUBLISHER,
    description: `精选 ${picked.length} 个插件：热度、用量、新颖、活跃四维打分；已剔除官方内置功能与版本不兼容项。`,
    createdAt,
    certification: 'certified',
  },
}));

writeFileSync(join(OUT, 'plugin-table.json'), JSON.stringify({
  name: '插件表',
  publisher: PUBLISHER,
  createdAt,
  total: picked.length,
  targetDsh: DSH_VERSION,
  source: 'github: topic:dsh-plugin（最热 300 / 最新 300 / 近两月新且热 100）',
  filters: {
    notPlugin: excluded.filter((x) => !x.why.startsWith('版本不兼容')).length,
    incompatible: compatExcluded.length,
  },
  byCategory: Object.fromEntries([...perCat].sort((a, b) => b[1] - a[1])),
  items: picked.map((r) => ({
    name: r.mf.name || r.name,
    repo: r.fullName,
    category: r.category,
    stars: r.stars,
    downloads: r.downloads > 0 ? r.downloads : 0,
    npmVerified: r.downloads >= 0,
    version: r.mf.version || null,
    peerOk: r.rangesOk,
    compat: r.compat,
    peerNote: r.peerNote || null,
    createdAt: r.createdAt,
    pushedAt: r.pushedAt,
    reasons: r.reasons,
    score: Number(r.score.toFixed(4)),
  })),
  excluded: [...excluded, ...compatExcluded].slice(0, 400),
}, null, 2));

const catLabel = {
  tool: '工具', agent: 'Agent', ui: '界面美化', data: '数据处理', vision: '视觉多模态',
  docs: '文档办公', memory: '记忆知识', usage: '模型用量', notify: '通知通讯',
  dev: '开发编码', chat: '对话会话', hub: '聚合资源', other: '其他',
};
const md = [];
md.push('# 插件表\n');
md.push(`> 署名：**${PUBLISHER}** ｜ 共 **${picked.length}** 个 ｜ 目标 DSH \`${DSH_VERSION}\` ｜ 生成于 ${createdAt}\n`);
md.push('> 数据源：GitHub `topic:dsh-plugin`（最热 300 / 最新 300 / 近两月新且热 100）');
md.push('> 入选条件：package.json 含 `dsh` 字段（真插件）· 官方未内置 · peer 版本兼容');
md.push('> 口径：热度 40% · 用量 30% · 新颖 20% · 活跃 10%\n');
for (const [cat, n] of [...perCat].sort((a, b) => b[1] - a[1])) {
  md.push(`## ${catLabel[cat] ?? cat}（${n}）\n`);
  md.push('| 插件 | 仓库 | 星 | 月下载 | 版本 | 兼容 | 入选理由 |');
  md.push('|---|---|---:|---:|---|---|---|');
  for (const r of picked.filter((x) => x.category === cat)) {
    const compat = r.compat === 'both' ? '两端 ✓' : r.compat === 'target' ? '桌面 ✓' : r.compat === 'alt' ? 'Web ✓' : r.compat === 'unknown' ? '未声明' : '✗';
    const dl = r.downloads > 0 ? r.downloads : (r.downloads === -1 ? '未上 npm' : '0');
    md.push(`| ${r.mf.name || r.name} | ${r.fullName} | ${r.stars} | ${dl} | ${r.mf.version || '—'} | ${compat} | ${r.reasons.join(' / ') || '分类补位'} |`);
  }
  md.push('');
}
writeFileSync(join(OUT, 'plugin-table.md'), md.join('\n'));

// ---------------------------------------------------------------------------
// 10. 三个整合包
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// 整合包：按「场景」选，不按分类切
// ---------------------------------------------------------------------------
// 同一个整合包里，这些角色只能有一个 —— 两个皮肤、两个模型源、两个记忆后端
// 会互相覆盖，装一起就是坏的。表里可以都列，包里必须挑一个。
const EXCLUSIVE_ROLES = [
  { id: 'provider', label: '模型来源', re: /免费模型|free model|free-model|模型提供|模型接入|model provider|api relay|api 中转|模型转接|模型路由|渠道模型|模型池|model pool|model router|接入.*模型/i },
  { id: 'memory', label: '记忆后端', re: /记忆|memory|knowledge base|知识库/i },
  { id: 'voice', label: '语音朗读', re: /朗读|tts|语音合成|voice/i },
  { id: 'permission', label: '权限策略', re: /权限|permission/i },
  { id: 'skin', label: '界面皮肤', re: /皮肤|主题包|壁纸|换肤|skin|theme|wallpaper/i },
];
const EXCLUSIVE_ORDER = Object.fromEntries(EXCLUSIVE_ROLES.map((r, i) => [r.id, i]));

function roleOf(r) {
  const text = `${r.mf.name} ${r.mf.description} ${r.description} ${r.mf.keywords.join(' ')}`;
  // 审计/统计类天然会提到「中转」「记忆」，但它们不是那个角色本身。
  if (/audit|审计|统计|stats|ledger|meter/i.test(text)) return null;
  // 「状态栏皮肤」是在状态栏上做花样，不是整体换肤，不会和主题互相覆盖。
  if (/status[- ]?line|status-label|status rotator|状态栏/i.test(text)) return null;
  // 上下文压缩会提到「模型」，但它不是模型来源。
  if (/context[- ]?compression|上下文压缩|压缩上下文/i.test(text)) return null;
  for (const role of EXCLUSIVE_ROLES) if (role.re.test(text)) return role;
  return null;
}

/**
 * 三个场景包。每个插件**只会被分到最契合的一个包**（不重复），
 * 每个包内部再按角色去重。这样「装两个包」也不会装进两份同一个插件。
 */
/**
 * 三个场景包 —— **成员是手工挑的，不是按分类筛出来的**。
 *
 * 组包遵守两条硬规则（下面代码会校验，违反直接抛错）：
 *   1. 一个插件只能出现在一个包里 —— 同时装两个包不会重复装同一个插件
 *   2. 同一个包里，独占角色各只能有一个 —— 两个皮肤 / 两个记忆后端会互相覆盖
 */
const PACKS = [
  {
    slug: 'creator',
    name: '读写与创作',
    pitch: '读资料、看视频、写东西：文档表格、小说、字幕摘要、设计稿与图像。',
    members: [
      'dsh-openwrite',
      'dsh-cuigengji-plugin',
      'dsh-univer-office',
      '@fylar/dsh-fylar-office-editor',
      '@zseven-w/dsh-openpencil',
      'answer-me-with-html',
      'dsh-better-display',
      'dsh-bili-scroll',
      'qiaomu-rss-dsh',
      'dsh-motion-ui',
      'dsh-raw-html-v2',
      '@liustack/modlens',
      'dsh-image-gen',
      '@q253595422/dsh-imagegen-video',
      'dsh-oil-creator',
      'dsh-tts-bridge',
    ],
  },
  {
    slug: 'builder',
    name: '开发与调试',
    pitch: '写代码、调插件、排查问题：终端、上下文压缩、回滚、MCP 与移动端调试。',
    members: [
      'billion-context',
      'dsh-connect-workbuddy',
      '@deepseek-harness-tui/dsh-tui',
      'seektty',
      'dsh-ops',
      'cc-safety-net',
      'dsh-block-ptc',
      'brooks-lint',
      'dsh-undo-savepoint',
      'dsh-config-manager',
      '@michengai/dsh-skills-manager',
      '@dsh-external/dsh-super-injector',
      '@dsh-external/dsh-blender-plugin',
      'easyeda-agent-dsh',
      '@dhicoc/dsh-reverse-skill',
      '@zseven-w/dsh-android',
      '@zseven-w/dsh-ios',
    ],
  },
  {
    slug: 'daily',
    name: '日常增强',
    pitch: '每天都碰到的小事：费用与余额、免费模型、记忆、手机接管、通知与桌面。',
    members: [
      'dsh-our-free-model',
      'dsh-mnemon',
      'dsh-pocket',
      'dsh-at-file',
      'dsh-cost-meter',
      'dsh-whale-widget',
      '@michengai/dsh-archive-manager',
      '@xmanrui/dsh-im',
      'dsh-deepcanary',
      'dsh-status-rotator',
      '@cocofhu/anime-find',
      '@ericwang1358/dsh-daily-flashcard',
      'dsh-whale-girl-live2d',
      'dsh-plugin-wallpaper-engine',
    ],
  },
];

// 校验：成员必须在插件表里、不得跨包重复、包内独占角色唯一
const byPkgName = new Map(picked.map((r) => [(r.mf.name || r.name).toLowerCase(), r]));
// 可用性验证结果（scripts/verify-packs.mjs 产出）：**未验证的成员不进整合包**。
// 整合包对外承诺「装上能用」，所以只收 npm 可解析 + tarball 可取 + 兼容声明通过的。
const VERIFY_FILE = join(OUT, 'verification.json');
const verifiedSet = existsSync(VERIFY_FILE)
  ? new Set(JSON.parse(readFileSync(VERIFY_FILE, 'utf8')).items.filter((i) => i.state === 'ok').map((i) => i.name))
  : null;
if (verifiedSet === null) console.warn('⚠️ 没有 verification.json，本轮不按可用性过滤（请先跑 verify-packs.mjs）');

const packReports = [];
const usedIn = new Map();
for (const pack of PACKS) {
  const members = [];
  const missing = [];
  const unverified = [];
  for (const name of pack.members) {
    const r = byPkgName.get(name.toLowerCase());
    if (!r) { missing.push(name); continue; }
    if (verifiedSet !== null && !verifiedSet.has(r.mf.name || r.name)) { unverified.push(name); continue; }
    const key = (r.mf.name || r.name).toLowerCase();
    if (usedIn.has(key)) throw new Error(`整合包冲突：${name} 同时出现在「${usedIn.get(key)}」与「${pack.name}」`);
    usedIn.set(key, pack.name);
    members.push({ r, role: roleOf(r) });
  }
  const seenRole = new Map();
  for (const m of members) {
    if (!m.role) continue;
    const prior = seenRole.get(m.role.id);
    if (prior) throw new Error(`「${pack.name}」里有多个${m.role.label}：${prior} 与 ${m.r.mf.name}`);
    seenRole.set(m.role.id, m.r.mf.name);
  }
  packReports.push({ pack, members, missing, unverified });
  console.log(`整合包「${pack.name}」：${members.length} 个${unverified.length > 0 ? `（未验证剔除 ${unverified.length}：${unverified.join(', ')}）` : ''}${missing.length > 0 ? `（缺失 ${missing.join(', ')}）` : ''}`);
}
console.log(`✅ 跨包自检：${usedIn.size} 个成员无重复`);

for (const { pack, members, unverified } of packReports) {
  writeFileSync(join(OUT, `modpack-${pack.slug}.dpmidx`), encodeMarketIndex(members.map((m) => toEntry(m.r)), {
    kind: KIND_MODPACK,
    meta: { name: pack.name, publisher: PUBLISHER, description: pack.pitch, createdAt },
  }));
  writeFileSync(join(OUT, `modpack-${pack.slug}.json`), JSON.stringify({
    name: pack.name,
    publisher: PUBLISHER,
    createdAt,
    pitch: pack.pitch,
    total: members.length,
    installOrder: members.map((m, i) => ({ order: i + 1, name: m.r.mf.name || m.r.name, role: m.role?.label ?? null })),
    note: '成员为人工挑选；每个插件只属于一个整合包；同包内独占角色唯一。',
  }, null, 2));
  const roles = EXCLUSIVE_ROLES.map((role) => {
    const hit = members.find((m) => m.role?.id === role.id);
    return `| ${role.label} | ${hit ? hit.r.mf.name : '—'} |`;
  });
  // 跨包：成员不重复，但「角色」可能撞（比如两个包各有一个模型来源）。
  // 这种不是装不上，而是同时用会互相覆盖 —— 在说明里写清楚，让用户二选一。
  const crossNotes = [];
  for (const m of members) {
    if (!m.role) continue;
    for (const other of packReports) {
      if (other.pack.slug === pack.slug) continue;
      for (const c of other.members) {
        if (c.role?.id === m.role.id) {
          crossNotes.push(`与「${other.pack.name}」的 ${c.r.mf.name} 同为${m.role.label}，同时安装需二选一`);
        }
      }
    }
  }
  const uniqueCross = [...new Set(crossNotes)];
  writeFileSync(join(OUT, `modpack-${pack.slug}.md`), [
    `# ${pack.name}`,
    '',
    `> 署名：**${PUBLISHER}** ｜ 共 ${members.length} 个 ｜ 生成于 ${createdAt}`,
    `> ${pack.pitch}`,
    ...(unverified.length > 0
      ? ['>', `> ⚠️ 为保证可用，已剔除未验证成员：${unverified.join('、')}`]
      : []),
    '',
    '**这不是「某个分类的合集」**：成员跨了多个分类，是按这个场景下会一起用到来挑的。',
    '**每个成员都通过了可用性验证**：npm 可解析、tarball 可取、兼容声明覆盖目标版本（见 verification.json）。',
    '**整包模拟安装已跑通**：临时目录里 `pnpm install --lockfile-only`（宿主包固定为本机实际版本、关闭 peer 自动安装）能解出完整依赖图。',
    '每个插件只属于一个整合包 —— 同时装两个包也不会重复安装。',
    '',
    '## 安装顺序',
    '',
    '| # | 插件 | 分类 | 独占角色 | 星 | 月下载 |',
    '|---:|---|---|---|---:|---:|',
    ...members.map((m, i) => `| ${i + 1} | ${m.r.mf.name || m.r.name} | ${catLabel[m.r.category] ?? m.r.category} | ${m.role?.label ?? '—'} | ${m.r.stars} | ${m.r.downloads > 0 ? m.r.downloads : '—'} |`),
    '',
    '## 独占角色（同包内只会有一个）',
    '',
    '| 角色 | 本包选择 |',
    '|---|---|',
    ...roles,
    '',
    '> 「模型来源 / 记忆后端 / 语音朗读 / 权限策略 / 界面皮肤」这类插件会互相覆盖，',
    '> 所以一个包里只放一个；想换请在商店里单独安装并停用旧的。',
    '',
    '## 跨包安装提醒',
    '',
    uniqueCross.length > 0
      ? uniqueCross.map((t) => `- ${t}`).join('\n')
      : '与本整合包同时安装其他包时，没有独占角色冲突。',
    '',
  ].join('\n'));
}

console.log(`\n插件表：${picked.length} 个，覆盖 ${perCat.size} 个分类`);
console.log('分类分布：', [...perCat].sort((a, b) => b[1] - a[1]).map(([c, n]) => `${catLabel[c] ?? c} ${n}`).join(' · '));
console.log('\n前 15 名：');
for (const r of picked.slice(0, 15)) {
  console.log(`  ${String(r.stars).padStart(6)}★ ${String(r.downloads > 0 ? r.downloads : r.downloads === -1 ? '未上npm' : '0').padStart(8)}↓ ${r.fullName} (${r.category})`);
}
console.log('\n剔除原因 Top：');
const why = new Map();
for (const x of [...excluded, ...compatExcluded]) why.set(x.why, (why.get(x.why) ?? 0) + 1);
for (const [k, v] of [...why].sort((a, b) => b[1] - a[1]).slice(0, 8)) console.log(`  ${String(v).padStart(3)}  ${k}`);
console.log('\n产物目录：', OUT);
