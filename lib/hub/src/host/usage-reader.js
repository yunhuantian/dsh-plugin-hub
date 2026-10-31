/**
 * 会话用量与花费的 host 侧读取层 —— `usage_report` 工具与诊断报告共用。
 *
 * 只做三件事：**取会话 → 折账本 → 缓存**。口径（选表、归一 provider、峰谷）
 * 全在 `contracts/pricing.ts`，本文件不碰单价。
 *
 * 缓存键是 `(session, 事件数)`：会话日志只追加，事件数没变就不必重放。这样
 * 一步之内工具与系统提示拿到的是**同一次折叠**，不会一边 $0.12 一边 $0.13。
 */
import { foldLedger, nodesFromEvents } from './usage-ledger.js';
export function makeLedgerReader() {
    const cache = new WeakMap();
    const ledgerOf = (session) => {
        if (session === null || typeof session !== 'object')
            return null;
        const events = typeof session.snapshotEvents === 'function' ? session.snapshotEvents() : [];
        const hit = cache.get(session);
        if (hit !== undefined && hit.count === events.length)
            return hit.ledger;
        const ledger = foldLedger(String(session.id ?? 'unknown'), nodesFromEvents(events));
        cache.set(session, { count: events.length, ledger });
        return ledger;
    };
    return { ledgerOf };
}
/**
 * 进程级共享读取器。
 *
 * 为什么是共享的：诊断报告（ops）与 usage 工具（insight）是两个可独立开关的
 * 插件，但折同一份会话日志。共用缓存既省重放，也保证两份输出金额一致 ——
 * 与"两个读者，一份口径"的设计前提对齐。
 */
export const sharedLedgerReader = makeLedgerReader();
/**
 * 一次请求自身的历史费用（"单次请求"口径）。
 * 取最近若干笔命中价格的请求的**均值** —— 回答"大概多少钱"时均值比总额有用。
 */
export function averageRequestUsd(ledger, sample = 10) {
    const priced = ledger.entries.filter((e) => e.known).slice(-sample);
    if (priced.length === 0)
        return { usd: 0, sample: 0 };
    const sum = priced.reduce((acc, e) => acc + e.chargedUsd, 0);
    return { usd: sum / priced.length, sample: priced.length };
}
