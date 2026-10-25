/**
 * 模型价格表 —— 版本化 + 生效日期（host / client 共用的单一来源）。
 *
 * 为什么要有版本：模型会调价（如 DeepSeek V4.1 Flash 于 2026-09-10 04:00 UTC
 * 生效的新计价），而会话日志是历史的。只保留"最新价"会让过去的花费被新价重算，
 * 既算不出当时的真实成本，也看不出调价前后的差。
 *
 * 因此这里按**生效日期**分版本，每条记录带 `effectiveFrom` / `effectiveTo`：
 *   - 「当时价」= 用请求发生时刻生效的表 → 等于当时实际计费
 *   - 「现价」  = 用最新表                  → 用于对比"同样的用量今天要多少钱"
 * 调价只**追加**新版本，永不修改历史版本（历史数据不可变）。
 *
 * 计费口径（与 dsh token-meter 一致）：usage.inputTokens **就是未缓存输入桶**
 * （token-meter 的 bucketsFrom 把 inputTokens → uncachedInputTokens），
 * 因此不要再减 cacheRead/cacheWrite，否则未缓存输入会变成负数。
 * 计费输入 = inputTokens + cacheReadTokens + cacheWriteTokens。
 *
 * 本模块同时被两处编译：host build 产出 `lib/contracts/pricing.js`，
 * client build 内联进 `lib/client.js`（与 remote.ts 相同的单一来源约定）。
 */
/** 计费的四个价格维度（单价均为「每 100 万 token 的美元」）。 */
export type PriceKind = 'input' | 'cacheRead' | 'cacheWrite' | 'output';
/**
 * 高峰/空闲时段规则（DeepSeek 现行策略：高峰单价 = 空闲 × 2）。
 * 时段按 **UTC 小时区间** 描述，`[start, end)` 半开区间。
 */
export interface PeakRule {
    /** 高峰倍率（DeepSeek = 2）。 */
    readonly multiplier: number;
    /** 高峰时段（UTC 小时，半开区间）。 */
    readonly windowsUtc: readonly (readonly [number, number])[];
    /** 是否仅工作日（UTC 周一~周五）生效。 */
    readonly weekdaysOnly: boolean;
    /** 人类可读说明。 */
    readonly note: string;
}
/** 一个价格表版本：一段生效期内所有模型的单价。 */
export interface PriceTableVersion {
    /** 版本号，用生效日期表示（如 `2026-09-10`）。 */
    readonly id: string;
    /** 人类可读名称（如 `V4.1 Flash 计价`）。 */
    readonly label: string;
    /** 生效时刻（ISO 8601，UTC）。 */
    readonly effectiveFrom: string;
    /** 失效时刻（ISO 8601，UTC）；`null` 表示仍然生效。 */
    readonly effectiveTo: string | null;
    /** 本版变化的摘要。 */
    readonly note: string;
    /** 数据来源。 */
    readonly source: string;
    /** 高峰规则；`null` 表示本版无峰谷之分。 */
    readonly peak: PeakRule | null;
    /** provider:model（或 provider:*）→ 单价 USD / 1M。 */
    readonly input: Readonly<Record<string, number>>;
    readonly cacheRead: Readonly<Record<string, number>>;
    readonly cacheWrite: Readonly<Record<string, number>>;
    readonly output: Readonly<Record<string, number>>;
}
/**
 * 历史价格表（旧 → 新）。**只追加，不修改。**
 *
 * 数据来源：DeepSeek 开放平台定价公告与厂商定价页（见各版本 `source`）。
 */
export declare const PRICE_HISTORY: readonly PriceTableVersion[];
/** 请求侧需要知道的用量桶（与 token-meter 的语义一致）。 */
export interface UsageBuckets {
    inputTokens?: number;
    outputTokens?: number;
    cacheReadTokens?: number;
    cacheWriteTokens?: number;
    reasoningTokens?: number;
}
/** 一次请求的费用结果。 */
export interface CostResult {
    /** 美元费用。 */
    usd: number;
    /** 是否命中价格表（false 表示模型未收录，费用未计入）。 */
    known: boolean;
    /** 本次是否落在高峰时段。 */
    peak: boolean;
}
/** 返回 `timeMs` 时刻生效的价格表版本；早于最早版本时回退到最早版本。 */
export declare function tableAt(timeMs: number, history?: readonly PriceTableVersion[]): PriceTableVersion;
/** 最新（当前生效）的价格表版本。 */
export declare function latestTable(history?: readonly PriceTableVersion[]): PriceTableVersion;
/** `timeMs` 是否落在该版本的高峰时段内。 */
export declare function isPeak(table: PriceTableVersion, timeMs: number): boolean;
/**
 * 查单价：精确 `provider:model` → 通配 `provider:*`。
 * 未收录返回 undefined（调用方决定是否给"未收录"提示）。
 */
export declare function rateFor(table: PriceTableVersion, kind: PriceKind, provider: string | null, model: string | null): number | undefined;
/**
 * 算一次请求在**指定价格表版本**下的费用。
 * `timeMs` 只用于判断峰谷，不影响选表（选表由调用方用 `tableAt` 决定）。
 */
export declare function costUnder(table: PriceTableVersion, usage: UsageBuckets, provider: string | null, model: string | null, timeMs: number): CostResult;
/** 「当时价 vs 现价」对比结果。 */
export interface CostComparison extends CostResult {
    /** 用请求当时生效的表算出的费用（= 当时实际计费口径）。 */
    chargedUsd: number;
    /** 用最新表算出的费用（同样的用量放在今天要多少钱）。 */
    nowUsd: number;
    /** 请求当时生效的表版本。 */
    chargedTable: PriceTableVersion;
    /** 最新表版本。 */
    nowTable: PriceTableVersion;
    /** 现价 - 当时价（负值 = 现价更便宜，省了钱）。 */
    deltaUsd: number;
    /** 当时的模型名是否出现在当时的表里（用于区分"当时压根没收录"）。 */
    chargedKnown: boolean;
}
/** 算一次请求的「当时价 / 现价」。 */
export declare function compareCost(usage: UsageBuckets, provider: string | null, model: string | null, timeMs: number, history?: readonly PriceTableVersion[]): CostComparison;
/** 需要对比"现价 vs 当时价"时，两版是否同一个（相同则无需展示差额）。 */
export declare function sameTableNumber(a: PriceTableVersion, b: PriceTableVersion): boolean;
/** 价格表的对外快照形状（Remote 返回用；避免把函数/长注释带出去）。 */
export interface PriceTableSnapshot {
    version: string;
    label: string;
    effectiveFrom: string;
    effectiveTo: string | null;
    note: string;
    source: string;
    peakMultiplier: number | null;
    peakNote: string | null;
    models: string[];
}
/** 把版本压成快照（供 UI/其他插件读取）。 */
export declare function snapshot(table: PriceTableVersion): PriceTableSnapshot;
/** 全部版本（旧 → 新）的快照。 */
export declare function historySnapshot(history?: readonly PriceTableVersion[]): PriceTableSnapshot[];
/** 当前版本号（UI 展示用）。 */
export declare function currentVersion(history?: readonly PriceTableVersion[]): string;
