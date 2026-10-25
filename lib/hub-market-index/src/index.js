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
/**
 * 归一化仓库地址，仅用于**判重**，不改变实际用于安装的原始链接。
 *
 * 同一个仓库在不同市场里常常写法不同：`git+https://`、`.git` 后缀、末尾斜杠、
 * `www.` 前缀、大小写主机名。以地址为准去重就必须先把这些噪音抹掉。
 * 查询串与锚点保留（tarball 链接可能靠它们区分版本），但会让同一 tarball 的
 * 不同 query 被视为不同条目 —— 这是有意的：宁可少合并，也不要错合并。
 */
export function normalizeRepoUrl(url) {
    let u = url.trim();
    if (u === '')
        return '';
    u = u.replace(/^git\+/i, '');
    u = u.replace(/^ssh:\/\/git@/i, 'https://');
    u = u.replace(/^git@([^:]+):/i, 'https://$1/');
    const hash = u.indexOf('#');
    if (hash >= 0)
        u = u.slice(0, hash);
    const q = u.indexOf('?');
    const query = q >= 0 ? u.slice(q) : '';
    if (q >= 0)
        u = u.slice(0, q);
    u = u.replace(/\/+$/, '');
    u = u.replace(/\.git$/i, '');
    const m = u.match(/^([a-z][a-z0-9+.-]*:\/\/)([^/]+)(.*)$/i);
    if (m) {
        const host = m[2].toLowerCase().replace(/^www\./, '');
        u = m[1].toLowerCase() + host + m[3];
    }
    return u + query;
}
export function mergeMarketIndexes(sources) {
    const order = [];
    const byName = new Map();
    const byUrl = new Map();
    for (const { source, index } of sources) {
        for (let i = 0; i < index.count; i++) {
            const name = index.name(i);
            const url = index.url(i);
            const category = index.category(i);
            const description = index.description(i);
            const deps = index.deps(i);
            const flags = index.flags(i);
            const urlKey = normalizeRepoUrl(url);
            const existing = (urlKey !== '' ? byUrl.get(urlKey) : undefined) ?? byName.get(name);
            if (existing === undefined) {
                const entry = { name, url, description, category, deps, flags, sources: [source], aliases: [] };
                order.push(name);
                byName.set(name, entry);
                if (urlKey !== '')
                    byUrl.set(urlKey, entry);
                continue;
            }
            if (!existing.sources.includes(source))
                existing.sources.push(source);
            // 同一仓库的另一个名字：记进别名（不进列表，避免出现两个看起来一样的条目）。
            if (existing.name !== name && !existing.aliases.includes(name))
                existing.aliases.push(name);
            // 先传入者没给介绍时，允许后面的来源补齐（介绍是展示信息，不是身份）。
            if (!existing.description && description)
                existing.description = description;
            for (const d of deps)
                if (!existing.deps.includes(d))
                    existing.deps.push(d);
            // 让后来的名字/地址也指向同一条，后续重复项继续合并到这里。
            if (!byName.has(name))
                byName.set(name, existing);
            if (urlKey !== '' && !byUrl.has(urlKey))
                byUrl.set(urlKey, existing);
        }
    }
    return {
        count: order.length,
        entry: (i) => byName.get(order[i]),
        find(prefix, limit = 50) {
            const needle = prefix.toLowerCase();
            const hits = [];
            for (const name of order) {
                if (!name.toLowerCase().includes(needle))
                    continue;
                hits.push(byName.get(name));
                if (hits.length >= limit)
                    break;
            }
            return hits;
        },
        stats: () => sources.map(({ source, index }) => ({ source, entries: index.count })),
    };
}
/** 编码：字符串驻留（同名只存一次），定长记录按顺序写出。 */
export function encodeMarketIndex(entries) {
    const strings = [];
    const ids = new Map();
    const intern = (s) => {
        const hit = ids.get(s);
        if (hit !== undefined)
            return hit;
        const id = strings.length;
        strings.push(s);
        ids.set(s, id);
        return id;
    };
    const deps = [];
    const records = [];
    for (const e of entries) {
        const nameId = intern(e.name);
        const urlId = intern(e.url);
        const categoryId = intern(e.category ?? '');
        const descId = intern(e.description ?? '');
        const depsStart = deps.length;
        for (const d of e.deps ?? [])
            deps.push(intern(d));
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
export function openMarketIndex(buf) {
    if (buf.length < HEADER_BYTES)
        throw new Error('索引文件过短');
    if (!buf.subarray(0, 8).equals(MAGIC))
        throw new Error('不是 DPMIDX 索引（magic 不匹配）');
    const version = buf.readUInt32LE(8);
    if (version !== VERSION)
        throw new Error(`索引版本不支持: ${version}`);
    const count = buf.readUInt32LE(12);
    const strCount = buf.readUInt32LE(16);
    const depsCount = buf.readUInt32LE(20);
    const strBytes = buf.readUInt32LE(24);
    const depsBytes = buf.readUInt32LE(28);
    const strStart = HEADER_BYTES;
    const depsStart = strStart + strBytes;
    const recStart = depsStart + depsBytes;
    if (recStart + count * RECORD_BYTES > buf.length)
        throw new Error('索引被截断');
    // 字符串表只记录「每条的起始偏移」，不复制、不解码。
    const strOffsets = new Int32Array(strCount);
    for (let i = 0, p = strStart; i < strCount; i++) {
        strOffsets[i] = p;
        p += 4 + buf.readUInt32LE(p);
    }
    // 解码缓存（惰性，仅对本会话真正访问过的字符串分配内存）。
    const cache = new Array(strCount);
    const str = (id) => {
        const memo = cache[id];
        if (memo !== undefined)
            return memo;
        const p = strOffsets[id];
        const len = buf.readUInt32LE(p);
        const value = buf.toString('utf8', p + 4, p + 4 + len);
        cache[id] = value;
        return value;
    };
    const rec = (i) => recStart + i * RECORD_BYTES;
    const field = (i, k) => buf.readUInt32LE(rec(i) + k * 4);
    let nameIndex = null;
    return {
        count,
        name: (i) => str(field(i, 0)),
        url: (i) => str(field(i, 1)),
        category: (i) => str(field(i, 2)),
        description: (i) => str(field(i, 3)),
        deps(i) {
            const start = field(i, 4);
            const len = field(i, 5);
            const out = [];
            for (let k = 0; k < len; k++)
                out.push(str(buf.readUInt32LE(depsStart + (start + k) * 4)));
            return out;
        },
        flags: (i) => field(i, 6),
        find(prefix, limit = 50) {
            if (nameIndex === null) {
                nameIndex = new Map();
                for (let i = 0; i < count; i++) {
                    const key = str(field(i, 0)).toLowerCase();
                    const bucket = nameIndex.get(key);
                    if (bucket === undefined)
                        nameIndex.set(key, [i]);
                    else
                        bucket.push(i);
                }
            }
            const needle = prefix.toLowerCase();
            const hits = [];
            for (const [key, list] of nameIndex) {
                if (!key.includes(needle))
                    continue;
                for (const i of list) {
                    hits.push(i);
                    if (hits.length >= limit)
                        return hits;
                }
            }
            return hits;
        },
        toArray() {
            const out = [];
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
