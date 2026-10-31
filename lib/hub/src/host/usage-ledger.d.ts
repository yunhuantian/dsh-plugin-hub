/**
 * 会话花费账本 —— 把会话日志里的每笔请求结算成「当时收了多少 / 按今天价多少」。
 *
 * 三个读者，一份口径：
 *   1. 「用量」tab（client）：人看图表与卡片；
 *   2. `usage_report` 工具（host）：模型自己看花了多少钱；
 *   3. 诊断报告：排查时带上花费概况。
 *
 * 价格与归一化都在 `contracts/pricing.ts`，这里**只做折叠**，不碰单价。
 *
 * 为什么按 `usage.inputTokens` 直接累计而未缓存输入：
 * dsh token-meter 的 `bucketsFrom` 把 `inputTokens` 直接映射成
 * `uncachedInputTokens`，所以它就是未缓存桶，再去减 cache 桶会把输入算成负数
 * （历史上出现过 126465% 的命中率）。
 */
import { type UsageBuckets } from '../contracts/pricing.js';
/** 会话日志里本模块关心的字段（其余一律不看）。 */
export interface LedgerNode {
    kind?: string;
    time?: number;
    turn?: number;
    step?: number;
    usage?: unknown;
    provider?: string | null;
    model?: string | null;
}
/** 一个请求在账本里的结算记录。 */
export interface LedgerEntry {
    time: number;
    turn: number;
    step: number;
    provider: string | null;
    model: string | null;
    usage: UsageBuckets;
    /** 当时价（请求发生时刻生效的价格表）。 */
    chargedUsd: number;
    /** 现价（最新价格表，峰谷沿用当时判定以隔离"价单变化"这一变量）。 */
    nowUsd: number;
    /** 是否命中价格表（false = 未收录，两个金额均为 0，不是"免费"）。 */
    known: boolean;
    /** 当时是否落在高峰时段。 */
    peak: boolean;
    /** 当时生效的价格表版本。 */
    table: string;
}
export interface LedgerTotals {
    requests: number;
    /** 命中价格表的请求数。 */
    priced: number;
    uncachedInput: number;
    cacheRead: number;
    cacheWrite: number;
    output: number;
    chargedUsd: number;
    nowUsd: number;
}
export interface ModelTotal {
    provider: string | null;
    model: string | null;
    requests: number;
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    chargedUsd: number;
    known: boolean;
}
export interface SessionLedger {
    sessionId: string;
    entries: LedgerEntry[];
    totals: LedgerTotals;
    /** 按花费降序的模型分布（未收录的排在最后）。 */
    models: ModelTotal[];
    /** 价格表版本 → 用量（用于报告"这笔账跨了几版价"）。 */
    tables: Array<{
        version: string;
        requests: number;
    }>;
    firstTime: number;
    lastTime: number;
}
/**
 * 从会话节点折出账本。
 *
 * @param sessionId 会话 id（只用于报告头）
 * @param nodes     会话消息节点（`legacy.nodes` 或从事件日志推出的等价结构）
 */
export declare function foldLedger(sessionId: string, nodes: readonly LedgerNode[]): SessionLedger;
/**
 * 从原始 session 事件推出 {@link LedgerNode} 列表。
 *
 * 为什么不直接读投影：`tokenUsage` 投影只保留**累计桶**，没有模型身份，
 * 也没有逐请求的时间 —— 而"花了多少钱"必须逐请求按当时价算。所以这里重放
 * `assistant/message` 事件（与 UI 侧读 `legacy.nodes` 等价）。
 */
export declare function nodesFromEvents(events: readonly any[]): LedgerNode[];
/** 把账本压成一行摘要（工具返回、审计、报告头都用它）。 */
export declare function summarizeLedger(ledger: SessionLedger): string;
/** 当前价格表版本（报告与工具都要标注口径）。 */
export declare function currentTableId(): string;
/** 会话级累计金额的读取口 —— 给系统提示与工具共用。 */
export interface LedgerSource {
    ledger(session: any): SessionLedger | null;
}
