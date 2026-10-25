/**
 * DPMIDX v2 —— 插件市场索引的紧凑二进制格式。
 *
 * ## 为什么不用 JSON
 *
 * 官方的索引是一份 JSON 文档，Host 必须**整份读进内存并 JSON.parse**。他们自己的
 * README 给了实测：2 万插件约 130 MiB 堆、10 万插件的 38 MiB 索引反序列化要 190 ms
 * 并阻塞事件循环。
 *
 * 我们之前那套（预置目录 + sqlite）导入也偏慢。这里换成**定长记录 + 字符串驻留**：
 * 解析只做「读头 + 指针切片」，不解码任何字符串；名称/链接按需解码并记忆化。
 *
 * ## 布局（全部小端）
 *
 * ```
 * 0   8   magic  "DPMIDX\x02\x00"
 * 8   4   u32    version (=2)
 * 12  4   u32    count        记录数
 * 16  4   u32    strCount     字符串数
 * 20  4   u32    depsCount    依赖索引总数
 * 24  4   u32    strBytes     字符串表字节数
 * 28  4   u32    depsBytes    依赖数组字节数（= depsCount * 4）
 * 32  8   ——     保留（置 0）
 * 40      [string table]  (u32 len + utf8) * strCount
 * 40+s    [deps array]    u32 字符串下标 * depsCount
 * 40+s+d  [records]       (u32 ×6) * count
 * ```
 *
 * 记录（28 字节）：nameId / urlId / categoryId / descId / depsStart / depsLen / flags
 *
 * 一个 10 万条的市场：记录 2.4 MB + 字符串表（名称+链接）约 10 MB，总计十余 MB，
 * 读入即用；20 万条也只是线性增长。相比「整份 JSON 进堆」低一个数量级以上。
 */
import { Buffer } from 'node:buffer';

const MAGIC = Buffer.from('DPMIDX\x02\x00', 'latin1');
const VERSION = 2;
const HEADER_BYTES = 40;
const RECORD_BYTES = 28;
const DEPS_ENTRY_BYTES = 4;

/** 一条市场记录。依赖用包名表示（编码时驻留成字符串下标）。 */
export interface MarketEntry {
  name: string;
  /** 下载/安装链接（GitHub tarball、npm 包页、离线包等）。 */
  url: string;
  /** 一句话介绍，用于列表卡片与详情页；空串表示未提供。 */
  description?: string;
  /** 分类键；空串表示未分类。 */
  category?: string;
  /** 依赖的包名。 */
  deps?: string[];
  /** 安装语义位图，见 FLAG_* 常量。 */
  flags?: number;
}

/**
 * `flags` 的位语义 —— 让「一键安装」有判断依据，而不是靠猜链接长什么样。
 *
 * 只有索引本身知道这个链接是**成品包**还是**源码仓库**：
 * - `ARTIFACT`：链接直指可解压的成品（tarball / zip）→ 下载 + 解压即可，**无需构建**；
 * - `SOURCE`：链接是源码仓库 → 需要安装依赖并构建；
 * - `OFFICIAL`：来自平台官方（展示用）；
 * - `VERIFIED`：条目经过校验（展示用信任标记）。
 *
 * 两者都未置位时，消费者可按链接后缀推断，但应视为「未知」而不是假设成品。
 */
export const FLAG_ARTIFACT = 0x01;
export const FLAG_SOURCE = 0x02;
export const FLAG_OFFICIAL = 0x04;
export const FLAG_VERIFIED = 0x08;

/** 打开后的索引句柄。字符串按需解码，映射一次后 O(1)。 */
export interface MarketIndex {
  readonly count: number;
  /** 第 i 条记录的名称。 */
  name(i: number): string;
  url(i: number): string;
  category(i: number): string;
  /** 一句话介绍；未提供时为空串。 */
  description(i: number): string;
  deps(i: number): string[];
  flags(i: number): number;
  /** 按名称前缀查找（大小写无关），返回下标。首次调用建立一次名称缓存。 */
  find(prefix: string, limit?: number): number[];
  /** 整表转成普通对象数组（调试/导出用，会分配全部对象）。 */
  toArray(): MarketEntry[];
}

/** 一条统一市场记录：合并了所有来源之后的视图。 */
export interface CatalogEntry extends MarketEntry {
  /** 出现过的来源标识（按传入顺序）。 */
  sources: string[];
}

/**
 * 统一市场：把**任意多份**索引合并成一个视图。
 *
 * 这样格式就能承载「多方生产」——每个市场/社区各自发布一份 .dpmidx，
 * 客户端把它们合并后当成一个市场浏览，不需要任何中心服务。
 *
 * 合并规则（确定性，便于复现）：
 * - 按包名去重；
 * - 同一包名出现在多份索引里时，**先传入的来源**决定 url / category / flags；
 * - 依赖取并集（去重，保持先出现的顺序）；
 * - `sources` 累积记录所有提供方，便于展示"来自哪些市场"。
 */
export interface MarketCatalog {
  readonly count: number;
  entry(i: number): CatalogEntry;
  find(prefix: string, limit?: number): CatalogEntry[];
  /** 每份来源的条目数，便于诊断。 */
  stats(): Array<{ source: string; entries: number }>;
}

export function mergeMarketIndexes(sources: Array<{ source: string; index: MarketIndex }>): MarketCatalog {
  const order: string[] = [];
  const seen = new Map<string, CatalogEntry>();

  for (const { source, index } of sources) {
    for (let i = 0; i < index.count; i++) {
      const name = index.name(i);
      const url = index.url(i);
      const category = index.category(i);
      const description = index.description(i);
      const deps = index.deps(i);
      const flags = index.flags(i);
      const hit = seen.get(name);
      if (hit === undefined) {
        order.push(name);
        seen.set(name, { name, url, description, category, deps, flags, sources: [source] });
        continue;
      }
      if (!hit.sources.includes(source)) hit.sources.push(source);
      // 先传入者没给介绍时，允许后面的来源补齐（介绍是展示信息，不是身份）。
      if (!hit.description && description) hit.description = description;
      for (const d of deps) if (!hit.deps!.includes(d)) hit.deps!.push(d);
    }
  }

  return {
    count: order.length,
    entry: (i) => seen.get(order[i])!,
    find(prefix, limit = 50) {
      const needle = prefix.toLowerCase();
      const hits: CatalogEntry[] = [];
      for (const name of order) {
        if (!name.toLowerCase().includes(needle)) continue;
        hits.push(seen.get(name)!);
        if (hits.length >= limit) break;
      }
      return hits;
    },
    stats: () => sources.map(({ source, index }) => ({ source, entries: index.count })),
  };
}

/** 编码：字符串驻留（同名只存一次），定长记录按顺序写出。 */
export function encodeMarketIndex(entries: MarketEntry[]): Buffer {
  const strings: string[] = [];
  const ids = new Map<string, number>();
  const intern = (s: string): number => {
    const hit = ids.get(s);
    if (hit !== undefined) return hit;
    const id = strings.length;
    strings.push(s);
    ids.set(s, id);
    return id;
  };

  const deps: number[] = [];
  const records: Array<[number, number, number, number, number, number, number]> = [];

  for (const e of entries) {
    const nameId = intern(e.name);
    const urlId = intern(e.url);
    const categoryId = intern(e.category ?? '');
    const descId = intern(e.description ?? '');
    const depsStart = deps.length;
    for (const d of e.deps ?? []) deps.push(intern(d));
    records.push([nameId, urlId, categoryId, descId, depsStart, deps.length - depsStart, e.flags ?? 0]);
  }

  const enc = strings.map((s) => Buffer.from(s, 'utf8'));
  const strBytes = enc.reduce((n, b) => n + 4 + b.length, 0);
  const depsBytes = deps.length * DEPS_ENTRY_BYTES;
  const total = HEADER_BYTES + strBytes + depsBytes + records.length * RECORD_BYTES;
  const out = Buffer.allocUnsafe(total);

  MAGIC.copy(out, 0);
  out.writeUInt32LE(VERSION, 8);
  out.writeUInt32LE(records.length, 12);
  out.writeUInt32LE(strings.length, 16);
  out.writeUInt32LE(deps.length, 20);
  out.writeUInt32LE(strBytes, 24);
  out.writeUInt32LE(depsBytes, 28);
  out.writeBigUInt64LE(0n, 32);

  let at = HEADER_BYTES;
  for (const b of enc) {
    out.writeUInt32LE(b.length, at);
    b.copy(out, at + 4);
    at += 4 + b.length;
  }
  for (const d of deps) {
    out.writeUInt32LE(d, at);
    at += DEPS_ENTRY_BYTES;
  }
  for (const r of records) {
    for (const v of r) {
      out.writeUInt32LE(v, at);
      at += 4;
    }
  }
  return out;
}

/** 打开索引：只校验头并计算各段起点，不解码任何字符串。 */
export function openMarketIndex(buf: Buffer): MarketIndex {
  if (buf.length < HEADER_BYTES) throw new Error('索引文件过短');
  if (!buf.subarray(0, 8).equals(MAGIC)) throw new Error('不是 DPMIDX 索引（magic 不匹配）');
  const version = buf.readUInt32LE(8);
  if (version !== VERSION) throw new Error(`索引版本不支持: ${version}`);
  const count = buf.readUInt32LE(12);
  const strCount = buf.readUInt32LE(16);
  const depsCount = buf.readUInt32LE(20);
  const strBytes = buf.readUInt32LE(24);
  const depsBytes = buf.readUInt32LE(28);

  const strStart = HEADER_BYTES;
  const depsStart = strStart + strBytes;
  const recStart = depsStart + depsBytes;
  if (recStart + count * RECORD_BYTES > buf.length) throw new Error('索引被截断');

  // 字符串表只记录「每条的起始偏移」，不复制、不解码。
  const strOffsets = new Int32Array(strCount);
  for (let i = 0, p = strStart; i < strCount; i++) {
    strOffsets[i] = p;
    p += 4 + buf.readUInt32LE(p);
  }

  // 解码缓存（惰性，仅对本会话真正访问过的字符串分配内存）。
  const cache = new Array<string | undefined>(strCount);
  const str = (id: number): string => {
    const memo = cache[id];
    if (memo !== undefined) return memo;
    const p = strOffsets[id];
    const len = buf.readUInt32LE(p);
    const value = buf.toString('utf8', p + 4, p + 4 + len);
    cache[id] = value;
    return value;
  };

  const rec = (i: number): number => recStart + i * RECORD_BYTES;
  const field = (i: number, k: number): number => buf.readUInt32LE(rec(i) + k * 4);

  let nameIndex: Map<string, number[]> | null = null;

  return {
    count,
    name: (i) => str(field(i, 0)),
    url: (i) => str(field(i, 1)),
    category: (i) => str(field(i, 2)),
    description: (i) => str(field(i, 3)),
    deps(i) {
      const start = field(i, 4);
      const len = field(i, 5);
      const out: string[] = [];
      for (let k = 0; k < len; k++) out.push(str(buf.readUInt32LE(depsStart + (start + k) * 4)));
      return out;
    },
    flags: (i) => field(i, 6),
    find(prefix, limit = 50) {
      if (nameIndex === null) {
        nameIndex = new Map();
        for (let i = 0; i < count; i++) {
          const key = str(field(i, 0)).toLowerCase();
          const bucket = nameIndex.get(key);
          if (bucket === undefined) nameIndex.set(key, [i]);
          else bucket.push(i);
        }
      }
      const needle = prefix.toLowerCase();
      const hits: number[] = [];
      for (const [key, list] of nameIndex) {
        if (!key.includes(needle)) continue;
        for (const i of list) {
          hits.push(i);
          if (hits.length >= limit) return hits;
        }
      }
      return hits;
    },
    toArray() {
      const out: MarketEntry[] = [];
      for (let i = 0; i < count; i++) {
        out.push({
          name: this.name(i),
          url: this.url(i),
          description: this.description(i),
          category: this.category(i),
          deps: this.deps(i),
          flags: this.flags(i),
        });
      }
      return out;
    },
  };
}
