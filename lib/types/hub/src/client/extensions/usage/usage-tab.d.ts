/**
 * 用量图表 tab：把会话内每个模型请求的 usage 变成时间图表。
 *
 * - 折线：未缓存输入(蓝) / 输出(绿) / 缓存命中率(紫虚线)
 * - 汇总卡：会话累计 token 各桶 + 缓存命中率 + 费用
 * - 费用（0.2 起）：按**版本化价格表**同时算两个数 ——
 *     「当时价」= 请求发生时生效的价格表（= 当时实际计费）
 *     「现价」  = 最新价格表（同样的用量放在今天要多少钱）
 *   两者不同则显示差额，于是"调价前后差多少"直接可读。
 *   未收录模型不估算，显示"未收录"提示并给出当前价格表版本号。
 *
 * 价格数据全部来自 `contracts/pricing.ts`（host / client 单一来源），
 * 本视图不硬编码任何单价。
 */
import { type ReactNode } from 'react';
import { type UsageBuckets } from '../../../contracts/pricing.js';
/**
 * 会话 id。新版由 `@deepseek-ai/dsh-session/types` 导出；这里只做结构占位。
 */
export type SessionId = string;
/**
 * 本视图需要的节点最小结构 —— 对应新版
 * `@deepseek-ai/dsh-client-ui-conversation` 的 `AssistantMessageNode`。
 *
 * 0.2 适配说明：节点字段本身没变（time / turn / step / usage / provenance /
 * requestConfig 全在），变的是**它们的来源**（旧版 ConversationSnapshot.nodes
 * → 新版 chat target 的 `legacy.nodes`）。
 *
 * 故意不 import 平台类型：插件独立构建，而平台包路径随版本变动
 * （旧版 `dsh-client-runtime` 已在新版被拆散到多个包）。
 */
export interface UsageNode {
    kind?: string;
    time?: number;
    turn?: number;
    step?: number;
    usage?: unknown;
    provenance?: unknown;
    requestConfig?: unknown;
}
/** One request's provider usage as recorded on an AssistantMessageNode. */
export type NodeUsage = UsageBuckets;
export interface NodePoint {
    time: number;
    turn: number;
    model: string | null;
    provider: string | null;
    usage: NodeUsage;
}
export interface TokenAggregate {
    uncached: number;
    cacheRead: number;
    cacheWrite: number;
    output: number;
    reasoning: number;
}
/** Extract per-request usage points from the conversation snapshot nodes. */
export declare function collectUsagePoints(nodes: readonly UsageNode[]): NodePoint[];
export declare function aggregateTokens(points: NodePoint[]): TokenAggregate;
export declare function hitRate(agg: TokenAggregate): number;
interface UsageTabProps {
    frame: {
        nodes: readonly UsageNode[];
        running: boolean;
    };
    tokenUsage: {
        uncachedInputTokens: number;
        outputTokens: number;
        cacheReadTokens: number;
        cacheWriteTokens: number;
    } | null;
    sessionId: SessionId;
    t?: (k: string) => string;
}
export declare function InsightsUsageTab({ frame, tokenUsage, sessionId, t }: UsageTabProps): ReactNode;
export {};
