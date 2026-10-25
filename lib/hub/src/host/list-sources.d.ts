import { type MarketEntry } from '../../../hub-market-index/src/index.js';
import { type ListSourceRow, type StoreDB } from './store-db.js';
import type { GitHubClient } from './github.js';
export declare function listsDir(home?: string): string;
export declare function listFile(id: string, home?: string): string;
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
export declare function sniffBytes(buf: Buffer): Sniffed;
/** 按链接后缀推断安装语义（没有显式 flags 时使用）。 */
export declare function inferFlags(url: string): number;
/** 把一条外来记录映射成市场条目。返回 null 表示缺必备字段。 */
export declare function toMarketEntry(raw: unknown): MarketEntry | null;
/** 归一化：校验 + 同名去重（保留先出现的）。 */
export declare function normalizeEntries(raws: unknown[]): {
    entries: MarketEntry[];
    warnings: string[];
};
/** 下载/读取一份来源的原始字节。 */
export declare function readSourceBytes(input: NewSourceInput): Promise<{
    bytes: Buffer;
    origin: string;
}>;
/**
 * 添加一份来源。
 *
 * 这是「两区」的唯一入口：自动识别区传 `expect = KIND_LIST`，
 * 整合包页传 `expect = KIND_MODPACK`。类型不符直接拒绝 —— 两边不会互相污染。
 */
export declare function addListSource(db: StoreDB, home: string, input: NewSourceInput): Promise<ImportOutcome>;
/** 读取一个来源的索引（从落盘文件，不解 JSON）。 */
export declare function readSourceIndex(source: ListSourceRow, home: string): import("../../../hub-market-index/src/index.js").MarketIndex;
export declare function removeSource(db: StoreDB, home: string, id: string): boolean;
export interface CrawlSpec {
    /** 原始输入：URL / owner/repo / @owner / topic:xxx。 */
    raw: string;
    /** GitHub 搜索查询串。 */
    query: string;
    /** 展示用名称。 */
    label: string;
}
/** 把用户输入解析成一条 GitHub 搜索查询。 */
export declare function parseCrawlSpec(raw: string): CrawlSpec;
/**
 * 自动爬取一个来源：限定范围的 GitHub 搜索 → 归一化成列表。
 *
 * 与内置镜像同步用的是同一套搜索接口，区别只是查询被限定在这个来源内
 * （`user:` / `org:` / `repo:` / `topic:`），所以不会把整站都抓回来。
 */
export declare function crawlSource(db: StoreDB, home: string, github: GitHubClient, raw: string): Promise<ImportOutcome>;
/** 一条列表条目能否一键安装；能则返回 pnpm 规格。 */
export declare function installSpecFor(entry: MarketEntry): string | null;
export {};
