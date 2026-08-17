/**
 * 0.1.3 insights: 用量视图 tab — 与「对话」「轨迹」并排。
 *
 * 专注展示"每个长对话的消耗"：
 *   - 顶部汇总卡：总输入 / 总输出 / 缓存命中率 / 估算费用
 *   - SVG 图表：每请求堆叠柱（未缓存输入 / 缓存命中 / 缓存写入 / 输出 / 推理）
 *     + 缓存命中率折线
 *   - 模型分布
 *
 * 数据全部来自 conversation.view 的标准 kit：
 *   useSession     → ConversationSnapshot.nodes（每请求 usage + time + provenance）
 *   useProjection  → tokenUsage 累计投影
 */
import { useMemo, type ReactNode } from 'react';
import type { ConversationSnapshot, SessionId } from '@deepseek-ai/dsh-client-runtime/client';
import { InsightsUsageTab } from './usage-tab';

/** conversation.view slot 标准 kit（framework-injected）。 */
export interface UsageViewKit {
  useSession: <S>(sel: (s: ConversationSnapshot) => S, eq?: (a: S, b: S) => boolean) => S;
  useProjection: (key: string, sel?: (v: unknown) => unknown) => unknown;
  sessionId: SessionId;
  t: (k: string) => string;
}

/**
 * The 用量 view tab. `useSession` / `useProjection` are injected by the
 * framework at the render site; `sessionId` / `t` come from the
 * registration's `inject` share (matched by id).
 */
export function InsightsUsageView(props: UsageViewKit): ReactNode {
  const { useSession, useProjection, sessionId, t } = props;
  const nodes = useSession((s) => s.nodes);
  const running = useSession((s) => s.running);
  const tokenUsage = useProjection('tokenUsage', (v) => v ?? null) as unknown as
    | { uncachedInputTokens: number; outputTokens: number; cacheReadTokens: number; cacheWriteTokens: number }
    | null;

  const frame = useMemo(() => ({ nodes, running }), [nodes, running]);

  return (
    <div className="dps-usage" data-plugin="dsh-plugin-hub">
      <InsightsUsageTab frame={frame} tokenUsage={tokenUsage} sessionId={sessionId} t={t} />
    </div>
  );
}
