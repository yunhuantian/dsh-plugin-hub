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
export declare const FLAG_ARTIFACT = 1;
export declare const FLAG_SOURCE = 2;
export declare const FLAG_OFFICIAL = 4;
export declare const FLAG_VERIFIED = 8;
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
    stats(): Array<{
        source: string;
        entries: number;
    }>;
}
export declare function mergeMarketIndexes(sources: Array<{
    source: string;
    index: MarketIndex;
}>): MarketCatalog;
/** 编码：字符串驻留（同名只存一次），定长记录按顺序写出。 */
export declare function encodeMarketIndex(entries: MarketEntry[]): Buffer;
/** 打开索引：只校验头并计算各段起点，不解码任何字符串。 */
export declare function openMarketIndex(buf: Buffer): MarketIndex;
