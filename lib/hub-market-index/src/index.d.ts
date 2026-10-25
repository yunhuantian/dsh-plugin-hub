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
/**
 * 容器类型（写在魔数的第 8 个字节）。
 *
 * 列表与整合包**共用同一个容器与编解码器**，只在魔数里带一个类型位：
 * 这样读取器可以用 8 个字节就判断"这是什么"，不必先解析整份文件；
 * 而两者又能共享字符串驻留、定长记录等全部实现。
 *
 * 为什么必须分开：列表会被商店**当成可选插件**展示，整合包则是一组插件的
 * 组合声明 —— 混进商店会让用户看到一堆"装不了的条目"。
 */
export declare const KIND_LIST = 0;
export declare const KIND_MODPACK = 1;
/** 容器类型的中文名，用于报错与界面提示。 */
export declare function kindLabel(kind: number): string;
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
    /** 容器类型：KIND_LIST 或 KIND_MODPACK。 */
    readonly kind: number;
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
/**
 * 从下载/安装链接推导**仓库身份键**。
 *
 * 为什么不用 npm 包名当主键：实测 279 个插件里只有 98 个（35%）在 npm 上有活动，
 * 而**全部 279 个都有仓库地址**。仓库地址才是覆盖率 100% 的那个标识。
 *
 * 产出三类键：
 * - `npm:<包名>` —— npm tarball（注意 URL 里带版本，必须剥掉版本才算身份）
 * - `repo:<host>/<owner>/<repo>` —— GitHub / GitLab / Gitee
 * - `''` —— 推导不出来（镜像、对象存储、私有地址），调用方应回退到归一化 URL
 *
 * ⚠️ 这个键**只用于"识别同一仓库"**，不用于静默合并：一个 monorepo 可以合法地
 * 发布多个插件（同 repo、不同名），按仓库合并会把它们错并成一个。
 */
export declare function repoKeyOf(url: string): string;
/**
 * 这个地址是指向**具体产物**，还是只指向**仓库本身**？
 *
 * 只有指向产物的地址才能拿来做「同一条目」的判据：同一个 tarball 被两份列表收录，
 * 就是同一条。而仓库根地址（`github.com/o/r`）标识的是**仓库**，一个 monorepo 可以
 * 用它发布多个插件 —— 拿它判重会把不同插件错并成一个。
 */
export declare function isArtifactUrl(url: string): boolean;
/** 一条统一市场记录：合并了所有来源之后的视图。 */
export interface CatalogEntry extends MarketEntry {
    /** 出现过的来源标识（按传入顺序）。 */
    sources: string[];
    /** 被合并掉的重复名字（同一仓库的不同写法）。 */
    aliases: string[];
    /** 推导出的仓库身份键（可为空串）。仅用于识别，不参与合并。 */
    repoKey: string;
}
/**
 * 归一化仓库地址，仅用于**判重**，不改变实际用于安装的原始链接。
 *
 * 同一个仓库在不同市场里常常写法不同：`git+https://`、`.git` 后缀、末尾斜杠、
 * `www.` 前缀、大小写主机名。以地址为准去重就必须先把这些噪音抹掉。
 * 查询串与锚点保留（tarball 链接可能靠它们区分版本），但会让同一 tarball 的
 * 不同 query 被视为不同条目 —— 这是有意的：宁可少合并，也不要错合并。
 */
export declare function normalizeRepoUrl(url: string): string;
/**
 * 统一市场：把**任意多份**索引合并成一个视图。
 *
 * 这样格式就能承载「多方生产」——每个市场/社区各自发布一份 .dpmidx，
 * 客户端把它们合并后当成一个市场浏览，不需要任何中心服务。
 *
 * 合并规则（确定性，便于复现）：
 * - **判重以地址为准**：归一化后的仓库地址相同即视为同一份内容（不同名字也算重复）；
 *   地址不同但包名相同，同样视为重复（同名不可能指两个包）。
 * - 先传入者决定 url / category / flags / description；
 * - 依赖取并集（去重，保持先出现的顺序）；
 * - `sources` 累积记录所有提供方；被合并掉的名字记进 `aliases`，便于界面上说明
 *   「这几个名字是同一个仓库」。
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
    /**
     * 同一仓库下有多条记录的分组（按仓库键归并）。
     *
     * **这不是"重复"**：一个 monorepo 可以合法发布多个插件。所以这里只**报告**
     * 分组，交给界面提示"这些条目来自同一个仓库"，而不是自动合并掉。
     */
    repoGroups(): Array<{
        repoKey: string;
        names: string[];
    }>;
}
export declare function mergeMarketIndexes(sources: Array<{
    source: string;
    index: MarketIndex;
}>): MarketCatalog;
/** 编码：字符串驻留（同名只存一次），定长记录按顺序写出。 */
export declare function encodeMarketIndex(entries: MarketEntry[], options?: {
    kind?: number;
}): Buffer;
/** 打开索引：只校验头并计算各段起点，不解码任何字符串。 */
export declare function openMarketIndex(buf: Buffer): MarketIndex;
