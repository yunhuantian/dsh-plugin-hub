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
import { canonicalRoute, latestTable, settleRequest } from '../contracts/pricing.js';
/** 取一条 assistant 节点的用量；没有就返回 null（不是 0 —— 0 会污染平均值）。 */
function usageOf(node) {
    const u = node.usage;
    if (u === null || typeof u !== 'object')
        return null;
    const total = (u.inputTokens ?? 0) + (u.outputTokens ?? 0) + (u.cacheReadTokens ?? 0) + (u.cacheWriteTokens ?? 0);
    if (total <= 0)
        return null;
    return {
        inputTokens: u.inputTokens ?? 0,
        outputTokens: u.outputTokens ?? 0,
        cacheReadTokens: u.cacheReadTokens ?? 0,
        cacheWriteTokens: u.cacheWriteTokens ?? 0,
        reasoningTokens: u.reasoningTokens ?? 0,
    };
}
/**
 * 从会话节点折出账本。
 *
 * @param sessionId 会话 id（只用于报告头）
 * @param nodes     会话消息节点（`legacy.nodes` 或从事件日志推出的等价结构）
 */
export function foldLedger(sessionId, nodes) {
    const entries = [];
    for (const node of nodes) {
        if (node.kind !== 'assistant')
            continue;
        const usage = usageOf(node);
        if (usage === null)
            continue;
        const route = canonicalRoute(node.provider ?? null, node.model ?? null);
        const s = settleRequest(usage, route.provider, route.model, node.time ?? 0);
        entries.push({
            time: node.time ?? 0,
            turn: node.turn ?? 0,
            step: node.step ?? 0,
            provider: route.provider,
            model: route.model,
            usage,
            chargedUsd: s.chargedUsd,
            nowUsd: s.nowUsd,
            // 只有"当时就收录"才算知道价格：模型后加进价表不等于当时收了钱。
            known: s.chargedKnown,
            peak: s.peak,
            table: s.chargedTable.id,
        });
    }
    const totals = {
        requests: entries.length, priced: 0,
        uncachedInput: 0, cacheRead: 0, cacheWrite: 0, output: 0,
        chargedUsd: 0, nowUsd: 0,
    };
    const byModel = new Map();
    const byTable = new Map();
    for (const e of entries) {
        totals.uncachedInput += e.usage.inputTokens ?? 0;
        totals.cacheRead += e.usage.cacheReadTokens ?? 0;
        totals.cacheWrite += e.usage.cacheWriteTokens ?? 0;
        totals.output += e.usage.outputTokens ?? 0;
        if (e.known) {
            totals.priced += 1;
            totals.chargedUsd += e.chargedUsd;
            totals.nowUsd += e.nowUsd;
        }
        byTable.set(e.table, (byTable.get(e.table) ?? 0) + 1);
        const key = `${e.provider ?? '?'}:${e.model ?? '?'}`;
        let row = byModel.get(key);
        if (row === undefined) {
            row = { provider: e.provider, model: e.model, requests: 0, inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, chargedUsd: 0, known: false };
            byModel.set(key, row);
        }
        row.requests += 1;
        row.inputTokens += (e.usage.inputTokens ?? 0) + (e.usage.cacheReadTokens ?? 0) + (e.usage.cacheWriteTokens ?? 0);
        row.outputTokens += e.usage.outputTokens ?? 0;
        row.cacheReadTokens += e.usage.cacheReadTokens ?? 0;
        if (e.known) {
            row.chargedUsd += e.chargedUsd;
            row.known = true;
        }
    }
    const models = [...byModel.values()].sort((a, b) => (a.known === b.known ? b.chargedUsd - a.chargedUsd : a.known ? -1 : 1) || b.requests - a.requests);
    const times = entries.map((e) => e.time).filter((t) => t > 0);
    return {
        sessionId,
        entries,
        totals,
        models,
        tables: [...byTable.entries()].map(([version, requests]) => ({ version, requests })).sort((a, b) => (a.version < b.version ? -1 : 1)),
        firstTime: times.length === 0 ? 0 : Math.min(...times),
        lastTime: times.length === 0 ? 0 : Math.max(...times),
    };
}
/**
 * 从原始 session 事件推出 {@link LedgerNode} 列表。
 *
 * 为什么不直接读投影：`tokenUsage` 投影只保留**累计桶**，没有模型身份，
 * 也没有逐请求的时间 —— 而"花了多少钱"必须逐请求按当时价算。所以这里重放
 * `assistant/message` 事件（与 UI 侧读 `legacy.nodes` 等价）。
 */
export function nodesFromEvents(events) {
    const nodes = [];
    for (const event of events) {
        if (event?.type !== 'assistant/message')
            continue;
        const data = event.data ?? {};
        const source = data.message?.source ?? {};
        nodes.push({
            kind: 'assistant',
            time: typeof event.time === 'number' ? event.time : 0,
            turn: typeof data.turn === 'number' ? data.turn : 0,
            step: typeof data.step === 'number' ? data.step : 0,
            usage: data.usage,
            provider: typeof source.provider === 'string' ? source.provider : null,
            model: typeof source.model === 'string' ? source.model : null,
        });
    }
    return nodes;
}
/** 把账本压成一行摘要（工具返回、审计、报告头都用它）。 */
export function summarizeLedger(ledger) {
    const t = ledger.totals;
    const price = `$${t.chargedUsd.toFixed(4)}`;
    const unpriced = t.requests - t.priced;
    return unpriced === 0
        ? `会话 ${ledger.sessionId.slice(0, 8)}：${t.requests} 次请求，累计 ${price}`
        : `会话 ${ledger.sessionId.slice(0, 8)}：${t.requests} 次请求，累计 ${price}（${unpriced} 次未收录未计入）`;
}
/** 当前价格表版本（报告与工具都要标注口径）。 */
export function currentTableId() {
    return latestTable().id;
}
