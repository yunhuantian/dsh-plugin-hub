/**
 * 会话用量与花费的 host 侧读取层 —— `usage_report` 工具与诊断报告共用。
 *
 * 只做三件事：**取会话 → 折账本 → 缓存**。口径（选表、归一 provider、峰谷）
 * 全在 `contracts/pricing.ts`，本文件不碰单价。
 *
 * 缓存键是 `(session, 事件数)`：会话日志只追加，事件数没变就不必重放。这样
 * 一步之内工具与系统提示拿到的是**同一次折叠**，不会一边 $0.12 一边 $0.13。
 */
import { type SessionLedger } from './usage-ledger.js';
export interface LedgerReader {
    /** 读某会话的账本；读不到（非会话对象）时返回 null。 */
    ledgerOf: (session: any) => SessionLedger | null;
}
export declare function makeLedgerReader(): LedgerReader;
/**
 * 进程级共享读取器。
 *
 * 为什么是共享的：诊断报告（ops）与 usage 工具（insight）是两个可独立开关的
 * 插件，但折同一份会话日志。共用缓存既省重放，也保证两份输出金额一致 ——
 * 与"两个读者，一份口径"的设计前提对齐。
 */
export declare const sharedLedgerReader: LedgerReader;
/**
 * 一次请求自身的历史费用（"单次请求"口径）。
 * 取最近若干笔命中价格的请求的**均值** —— 回答"大概多少钱"时均值比总额有用。
 */
export declare function averageRequestUsd(ledger: SessionLedger, sample?: number): {
    usd: number;
    sample: number;
};
