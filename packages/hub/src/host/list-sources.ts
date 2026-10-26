/**
 * 列表来源（list sources）：商店「自动识别 / 认证列表」两区与「整合包」页的数据层。
 *
 * 一个来源 = 一份列表文件 + 一条注册信息：
 *  - kind = 0 插件列表 → 进商店（自动识别或认证）
 *  - kind = 1 整合包   → 只进整合包页，商店必须拒绝
 *
 * 来源有三种产生方式：
 *  - `addListSource`：用户给的 URL / 上传的文件 / 粘贴的文本，自动嗅探容器类型；
 *  - `crawlSource`：用户给一个 GitHub 用户 / 组织 / 仓库 / topic，自动爬取
 *    （与内置镜像同步同一套 GitHub 搜索，只是查询范围被限定在这个来源内）；
 *  - 内置镜像同步（runMirrorSync）不经过这里 —— 它直接写 plugins 表。
 *
 * 落盘：`storages/plugin-store/lists/<id>.dpmidx`。JSON / NDJSON 在**导入那一刻**
 * 转成 DPMIDX，之后一律走快路径，不在运行时解析 JSON。
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import {
  FLAG_ARTIFACT,
  FLAG_SOURCE,
  KIND_LIST,
  KIND_MODPACK,
  encodeMarketIndex,
  kindLabel,
  openMarketIndex,
  type MarketEntry,
} from '../../../hub-market-index/src/index.js';
import { storeDataDir, type ListSourceRow, type StoreDB } from './store-db.js';
import type { GitHubClient } from './github.js';

/** 单份来源的最大字节数 —— 防止误点一个镜像 ISO 把内存吃光。 */
const MAX_BYTES = 32 * 1024 * 1024;

export function listsDir(home?: string): string {
  const dir = join(storeDataDir(home), 'lists');
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function listFile(id: string, home?: string): string {
  return join(listsDir(home), `${id}.dpmidx`);
}

/** 稳定的来源 id：同一份 URL / 同一段文本导入多次应覆盖而不是新增。 */
function sourceId(seed: string): string {
  return createHash('sha1').update(seed).digest('hex').slice(0, 12);
}

export interface NewSourceInput {
  /** 远程地址（http/https）或本地文件路径。 */
  url?: string;
  /** 直接粘贴的文本（JSON / NDJSON）。 */
  text?: string;
  /** 上传的二进制文件（base64）。 */
  base64?: string;
  label?: string;
  /** 期望的容器类型；与文件实际类型不符时报错（两个页面各管各的）。 */
  expect: number;
  provenance?: 'auto' | 'certified';
  publisher?: string;
}

export interface ImportOutcome {
  row: ListSourceRow;
  /** 逐条诊断：被跳过的条目、被合并的重名条目。 */
  warnings: string[];
}

interface Sniffed {
  container: 'dpmidx' | 'json' | 'ndjson' | 'unknown';
  /** 仅 dpmidx 有值。 */
  kind: number | null;
}

const MAGIC = Buffer.from('DPMIDX', 'latin1');

export function sniffBytes(buf: Buffer): Sniffed {
  if (buf.length >= 8 && buf.subarray(0, 6).equals(MAGIC)) {
    return { container: 'dpmidx', kind: buf.readUInt8(7) };
  }
  // 跳过 BOM 与前导空白，找一个 JSON 的起始字符。
  let i = 0;
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) i = 3;
  while (i < buf.length && /\s/.test(String.fromCharCode(buf[i]))) i++;
  const first = buf[i];
  if (first === 0x5b /* [ */) return { container: 'json', kind: null };
  if (first === 0x7b /* { */) {
    const head = buf.toString('utf8', i, Math.min(buf.length, i + 4096));
    // 一行一个对象的 NDJSON：首行能独立闭合、且后面还有对象。
    const lines = head.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length > 1) {
      try { JSON.parse(lines[0]); return { container: 'ndjson', kind: null }; } catch { /* 是普通 JSON */ }
    }
    return { container: 'json', kind: null };
  }
  return { container: 'unknown', kind: null };
}

/** 从各种 JSON 形状里取出条目数组。 */
function arrayFromJson(text: string, container: 'json' | 'ndjson'): unknown[] {
  const trimmed = text.trim();
  if (container === 'ndjson') {
    return trimmed.split(/\r?\n/).filter((l) => l.trim() !== '').map((l) => JSON.parse(l));
  }
  const doc: unknown = JSON.parse(trimmed);
  if (Array.isArray(doc)) return doc;
  if (doc && typeof doc === 'object') {
    const obj = doc as Record<string, unknown>;
    for (const key of ['plugins', 'items', 'entries', 'list', 'data', 'packages']) {
      if (Array.isArray(obj[key])) return obj[key] as unknown[];
    }
    // 单条目文档
    if ('name' in obj || 'packageName' in obj) return [obj];
  }
  throw new Error('无法识别的 JSON 结构：期望数组，或 { plugins: [...] } / { items: [...] }');
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function firstStr(...values: unknown[]): string {
  for (const v of values) {
    const s = str(v);
    if (s !== '') return s;
  }
  return '';
}

/** 按链接后缀推断安装语义（没有显式 flags 时使用）。 */
export function inferFlags(url: string): number {
  if (/(\.tgz|\.tar\.gz|\.tar\.zip|\.zip)(\?|#|$)/i.test(url) || /\/releases\/download\//i.test(url)) return FLAG_ARTIFACT;
  if (/^https?:\/\/(www\.)?(github|gitlab|gitee|bitbucket)\.(com|org)\/[^/]+\/[^/?#]+\/?$/i.test(url)) return FLAG_SOURCE;
  return 0;
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string' && x.trim() !== '').map((x) => x.trim());
  if (v && typeof v === 'object') return Object.keys(v as Record<string, unknown>);
  return [];
}

/** 把一条外来记录映射成市场条目。返回 null 表示缺必备字段。 */
export function toMarketEntry(raw: unknown): MarketEntry | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const name = firstStr(o.name, o.packageName, o.package_name, o.id, o.pkg);
  if (name === '') return null;
  const url = firstStr(o.url, o.repo, o.repoUrl, o.repo_url, o.homepage, o.link, o.tarball, o.npm);
  const description = firstStr(o.description, o.desc, o.intro, o.summary, o.shortDescription);
  const category = firstStr(o.category, Array.isArray(o.categories) ? o.categories[0] : '', o.group);
  const deps = asStringArray(o.deps ?? o.dependencies);
  const flags = typeof o.flags === 'number' ? o.flags : inferFlags(url);
  return { name, url, description, category, deps, flags };
}

/** 归一化：校验 + 同名去重（保留先出现的）。 */
export function normalizeEntries(raws: unknown[]): { entries: MarketEntry[]; warnings: string[] } {
  const entries: MarketEntry[] = [];
  const seen = new Set<string>();
  const warnings: string[] = [];
  let invalid = 0;
  let dupes = 0;
  for (const raw of raws) {
    const entry = toMarketEntry(raw);
    if (entry === null) { invalid++; continue; }
    if (seen.has(entry.name)) { dupes++; continue; }
    seen.add(entry.name);
    entries.push(entry);
  }
  if (invalid > 0) warnings.push(`${invalid} 条记录缺少名称，已跳过`);
  if (dupes > 0) warnings.push(`${dupes} 条记录名称重复，已合并`);
  return { entries, warnings };
}

/** 下载/读取一份来源的原始字节。 */
export async function readSourceBytes(input: NewSourceInput): Promise<{ bytes: Buffer; origin: string }> {
  if (input.base64) {
    const bytes = Buffer.from(input.base64, 'base64');
    if (bytes.length > MAX_BYTES) throw new Error('文件超过 32 MB 上限');
    return { bytes, origin: '' };
  }
  if (input.text !== undefined) {
    const bytes = Buffer.from(input.text, 'utf8');
    if (bytes.length > MAX_BYTES) throw new Error('内容超过 32 MB 上限');
    return { bytes, origin: '' };
  }
  const target = (input.url ?? '').trim();
  if (target === '') throw new Error('请提供列表地址或文件');

  if (!/^https?:\/\//i.test(target)) {
    const path = isAbsolute(target) ? target : target;
    if (!existsSync(path)) throw new Error(`文件不存在：${path}`);
    const bytes = readFileSync(path);
    if (bytes.length > MAX_BYTES) throw new Error('文件超过 32 MB 上限');
    return { bytes, origin: '' };
  }

  const res = await fetch(target, {
    redirect: 'follow',
    signal: AbortSignal.timeout(30_000),
    headers: { 'User-Agent': 'dsh-plugin-hub' },
  });
  if (!res.ok) throw new Error(`下载失败：HTTP ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_BYTES) throw new Error('文件超过 32 MB 上限');
  return { bytes: buf, origin: target };
}

/**
 * 添加一份来源。
 *
 * 这是「两区」的唯一入口：自动识别区传 `expect = KIND_LIST`，
 * 整合包页传 `expect = KIND_MODPACK`。类型不符直接拒绝 —— 两边不会互相污染。
 */
export async function addListSource(db: StoreDB, home: string, input: NewSourceInput): Promise<ImportOutcome> {
  const { bytes, origin } = await readSourceBytes(input);
  const sniffed = sniffBytes(bytes);
  if (sniffed.container === 'unknown') {
    throw new Error('无法识别这份文件：既不是 DPMIDX，也不是 JSON / NDJSON');
  }

  let kind: number;
  let stored: Buffer;
  let warnings: string[] = [];
  let format: string;

  if (sniffed.container === 'dpmidx') {
    // 先完整打开一次：畸形文件在导入时就要报错，而不是等用户点开列表才发现。
    const index = openMarketIndex(bytes);
    kind = index.kind;
    stored = bytes;
    format = 'dpmidx';
  } else {
    const text = bytes.toString('utf8');
    const raws = arrayFromJson(text, sniffed.container);
    const normalized = normalizeEntries(raws);
    warnings = normalized.warnings;
    kind = input.expect;
    stored = encodeMarketIndex(normalized.entries, { kind });
    format = sniffed.container;
  }

  if (kind !== input.expect) {
    throw new Error(
      `这是${kindLabel(kind)}（kind=${kind}），不能导入到这里。` +
      (input.expect === KIND_LIST ? '请到左侧「整合包」页导入。' : '请到商店的「自动识别」区导入。'),
    );
  }

  // 身份优先级：URL > 显式名称 > 内容。
  // 用内容做键会导致「同一个列表更新后再导入」变成第二条来源，所以有名字时优先用名字。
  const label0 = (input.label ?? '').trim();
  const seed = origin !== ''
    ? origin
    : label0 !== ''
      ? `local:${label0}`
      : `content:${createHash('sha1').update(stored).digest('hex')}`;
  const id = sourceId(seed);
  const file = listFile(id, home);
  writeFileSync(file, stored);

  const index = openMarketIndex(stored);
  const now = new Date().toISOString();
  // 展名优先级：调用方显式给的 > 文件自带的署名元数据 > 从 URL/内容推。
  // 注意 meta 里的 publisher 只是**署名**（作者名字），不是认证凭据。
  const label = (input.label ?? '').trim() !== ''
    ? (input.label as string).trim()
    : (index.meta.name ?? '').trim() !== ''
      ? index.meta.name as string
      : origin !== '' ? labelFromUrl(origin) : `${kindLabel(kind)} ${id}`;

  const row: ListSourceRow = {
    id,
    label,
    url: origin,
    kind,
    format,
    provenance: input.provenance === 'certified' ? 'certified' : 'auto',
    publisher: (input.publisher ?? '').trim() !== '' ? input.publisher as string : (index.meta.publisher ?? ''),
    entries: index.count,
    addedAt: db.getListSource(id)?.addedAt ?? now,
    syncedAt: now,
    error: null,
  };
  db.upsertListSource(row);
  return { row, warnings };
}

function labelFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const base = u.pathname.split('/').filter(Boolean).pop() ?? u.hostname;
    return decodeURIComponent(base).replace(/\.(dpmidx|json|ndjson)$/i, '') || u.hostname;
  } catch {
    return url.slice(0, 60);
  }
}

/** 读取一个来源的索引（从落盘文件，不解 JSON）。 */
export function readSourceIndex(source: ListSourceRow, home: string) {
  const file = listFile(source.id, home);
  if (!existsSync(file)) throw new Error('来源文件已丢失，请重新添加');
  return openMarketIndex(readFileSync(file));
}

export function removeSource(db: StoreDB, home: string, id: string): boolean {
  const ok = db.removeListSource(id);
  try { rmSync(listFile(id, home), { force: true }); } catch { /* 文件可能不存在 */ }
  return ok;
}

// ---- 自动爬取 ---------------------------------------------------------------

export interface CrawlSpec {
  /** 原始输入：URL / owner/repo / @owner / topic:xxx。 */
  raw: string;
  /** GitHub 搜索查询串。 */
  query: string;
  /** 展示用名称。 */
  label: string;
}

/** 把用户输入解析成一条 GitHub 搜索查询。 */
export function parseCrawlSpec(raw: string): CrawlSpec {
  const value = raw.trim();
  if (value === '') throw new Error('请填写要爬取的来源');

  // topic:xxx / user:xxx / org:xxx / repo:o/r 直接透传
  const qualifier = value.match(/^(topic|user|org|repo):(.+)$/i);
  if (qualifier) {
    const key = qualifier[1].toLowerCase();
    const arg = qualifier[2].trim();
    return { raw: value, query: `${key}:${arg}`, label: `${key}:${arg}` };
  }

  // 带或不带协议、带不带 www 都要认（用户通常直接粘 github.com/owner）。
  const ghUrl = value.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/?#]+)(?:\/([^/?#]+))?/i);
  if (ghUrl) {
    const owner = ghUrl[1];
    const repo = (ghUrl[2] ?? '').replace(/\.git$/i, '');
    if (repo !== '' && repo !== 'topics') {
      return { raw: value, query: `repo:${owner}/${repo}`, label: `${owner}/${repo}` };
    }
    return { raw: value, query: `user:${owner}`, label: `@${owner}` };
  }

  if (value.startsWith('@')) {
    return { raw: value, query: `user:${value.slice(1)}`, label: value };
  }
  if (/^[^/\s]+\/[^/\s]+$/.test(value)) {
    return { raw: value, query: `repo:${value}`, label: value };
  }
  if (/^[^/\s]+$/.test(value)) {
    return { raw: value, query: `user:${value}`, label: `@${value}` };
  }
  throw new Error('无法识别这个来源：支持 GitHub 用户 / 组织 / 仓库 / topic');
}

/**
 * 自动爬取一个来源：限定范围的 GitHub 搜索 → 归一化成列表。
 *
 * 与内置镜像同步用的是同一套搜索接口，区别只是查询被限定在这个来源内
 * （`user:` / `org:` / `repo:` / `topic:`），所以不会把整站都抓回来。
 */
export async function crawlSource(
  db: StoreDB,
  home: string,
  github: GitHubClient,
  raw: string,
): Promise<ImportOutcome> {
  const spec = parseCrawlSpec(raw);
  const hits = await github.searchRepos(spec.query, 1, 100);
  const entries: MarketEntry[] = [];
  const seen = new Set<string>();
  const CATEGORIES = ['tool', 'agent', 'ui', 'data', 'vision', 'docs', 'memory', 'usage', 'notify', 'dev', 'chat', 'hub'];
  for (const hit of hits) {
    if (seen.has(hit.repo)) continue;
    seen.add(hit.repo);
    entries.push({
      name: hit.repo,
      url: `https://github.com/${hit.fullName}`,
      description: hit.description ?? '',
      // topic 里常带分类词（如 dsh-plugin-ui），取第一个能识别的。
      category: hit.topics.map((t) => CATEGORIES.find((c) => t === c || t.endsWith(`-${c}`))).find(Boolean) ?? '',
      deps: [],
      flags: FLAG_SOURCE,
    });
  }
  if (entries.length === 0) throw new Error(`「${spec.label}」下没有找到插件仓库`);

  const stored = encodeMarketIndex(entries, { kind: KIND_LIST });
  const id = sourceId(`crawl:${spec.query}`);
  writeFileSync(listFile(id, home), stored);
  const now = new Date().toISOString();
  const row: ListSourceRow = {
    id,
    label: spec.label,
    url: spec.raw,
    kind: KIND_LIST,
    format: 'crawl',
    provenance: 'auto',
    publisher: '',
    entries: entries.length,
    addedAt: db.getListSource(id)?.addedAt ?? now,
    syncedAt: now,
    error: null,
  };
  db.upsertListSource(row);
  return { row, warnings: [] };
}

// ---- 从列表条目安装 ---------------------------------------------------------

/** 一条列表条目能否一键安装；能则返回 pnpm 规格。 */
export function installSpecFor(entry: MarketEntry): string | null {
  const url = entry.url.trim();
  if (url === '') return null;
  if (/^https?:\/\/registry\.npmjs\.org\//i.test(url)) return url;
  if (/(\.tgz|\.tar\.gz|\.zip)(\?|#|$)/i.test(url)) return url;
  const gh = url.match(/^https?:\/\/(?:www\.)?github\.com\/([^/?#]+)\/([^/?#]+?)(?:\.git)?\/?$/i);
  if (gh) return `git+https://github.com/${gh[1]}/${gh[2]}.git`;
  if (/^git\+/.test(url)) return url;
  return null;
}
