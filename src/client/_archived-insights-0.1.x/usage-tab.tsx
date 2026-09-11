/**
 * 用量图表 tab：把会话内每个模型请求的 usage 变成时间图表。
 *
 * - 堆叠柱：未缓存输入(灰) / 缓存命中读取(绿) / 缓存写入(琥珀) / 输出(蓝) / 推理(橙)
 * - 叠加折线：缓存命中率 cacheRead / (uncached + cacheRead + cacheWrite)
 * - 汇总卡：会话累计 token 各桶 + 缓存命中率 + 估算费用
 * - 费用：按 provenance.provider:model 查内置定价表；未知模型不估算，
 *   显示"未收录模型"提示。定价表带版本号，调价只改表不动历史。
 */

import { useCallback, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { ConversationNode, SessionId } from '@deepseek-ai/dsh-client-runtime/client';

/** One request's provider usage as recorded on an AssistantMessageNode. */
export interface NodeUsage {
  inputTokens?: number;
  outputTokens?: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
  reasoningTokens?: number;
}
export interface NodePoint {
  time: number;          // epoch ms
  turn: number;
  model: string | null;  // from provenance
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

/** 定价表版本。调价时新增一条记录（version+effectiveFrom），不改历史数据。 */
export interface PriceTableVersion {
  version: string;
  effectiveFrom: string; // ISO date of the price change
  /** price per 1M tokens, in USD. Keys: provider:model or provider:* */
  input: Record<string, number>;
  cacheRead: Record<string, number>;
  cacheWrite: Record<string, number>;
  output: Record<string, number>;
}

const CURRENT_PRICES: PriceTableVersion = {
  version: '2026-08-15',
  effectiveFrom: '2026-08-15',
  input: {
    'deepseek:deepseek-chat': 0.27, 'deepseek:deepseek-reasoner': 0.55,
    'openai:gpt-4o': 2.5, 'openai:gpt-4o-mini': 0.15, 'openai:gpt-4.1': 2, 'openai:gpt-4.1-mini': 0.4, 'openai:o3': 2, 'openai:o4-mini': 1.1,
    'anthropic:claude-sonnet-4-20250514': 3, 'anthropic:claude-3-5-haiku-20241022': 0.8, 'anthropic:claude-3-5-sonnet-20241022': 3,
    'google:gemini-2.5-pro': 1.25, 'google:gemini-2.5-flash': 0.3,
    'qwen:qwen-plus': 0.4, 'qwen:qwen-max': 2.4, 'qwen:qwen-turbo': 0.3,
    'zhipu:glm-4': 0.2, 'zhipu:glm-4-air': 0.06,
    'moonshot:moonshot-v1-8k': 0.6, 'moonshot:moonshot-v1-32k': 1.2, 'moonshot:moonshot-v1-128k': 6,
  },
  cacheRead: {
    'deepseek:*': 0.07, 'deepseek:deepseek-reasoner': 0.14,
    'openai:*': 1.25, 'anthropic:*': 0.3, 'google:*': 0.1,
    'qwen:*': 0.1, 'zhipu:*': 0.05, 'moonshot:*': 0.1,
  },
  cacheWrite: {
    'deepseek:*': 0.27, 'deepseek:deepseek-reasoner': 0.55,
    'openai:*': 2.5, 'anthropic:*': 3.75, 'google:*': 1.25,
    'qwen:*': 0.4, 'zhipu:*': 0.2, 'moonshot:*': 0.6,
  },
  output: {
    'deepseek:deepseek-chat': 1.1, 'deepseek:deepseek-reasoner': 2.19,
    'openai:gpt-4o': 10, 'openai:gpt-4o-mini': 0.6, 'openai:gpt-4.1': 8, 'openai:gpt-4.1-mini': 1.6, 'openai:o3': 8, 'openai:o4-mini': 4.4,
    'anthropic:claude-sonnet-4-20250514': 15, 'anthropic:claude-3-5-haiku-20241022': 4, 'anthropic:claude-3-5-sonnet-20241022': 15,
    'google:gemini-2.5-pro': 10, 'google:gemini-2.5-flash': 2.5,
    'qwen:qwen-plus': 1.2, 'qwen:qwen-max': 9.6, 'qwen:qwen-turbo': 0.6,
    'zhipu:glm-4': 0.2, 'zhipu:glm-4-air': 0.06,
    'moonshot:moonshot-v1-8k': 0.6, 'moonshot:moonshot-v1-32k': 1.2, 'moonshot:moonshot-v1-128k': 6,
  },
};

function lookupPrice(table: Record<string, number>, provider: string | null, model: string | null): number | undefined {
  if (!provider || !model) return undefined;
  return table[`${provider}:${model}`] ?? table[`${provider}:*`];
}

/** Estimate USD cost for one request using the current price table. */
export function estimateCost(point: NodePoint): { usd: number; known: boolean } {
  const { provider, model, usage } = point;
  const pIn = lookupPrice(CURRENT_PRICES.input, provider, model);
  const pOut = lookupPrice(CURRENT_PRICES.output, provider, model);
  const pCr = lookupPrice(CURRENT_PRICES.cacheRead, provider, model);
  const pCw = lookupPrice(CURRENT_PRICES.cacheWrite, provider, model);
  if (pIn === undefined || pOut === undefined) return { usd: 0, known: false };
  const usd =
    ((usage.inputTokens ?? 0) - (usage.cacheReadTokens ?? 0) - (usage.cacheWriteTokens ?? 0)) / 1e6 * pIn
    + (usage.cacheReadTokens ?? 0) / 1e6 * (pCr ?? pIn)
    + (usage.cacheWriteTokens ?? 0) / 1e6 * (pCw ?? pIn)
    + (usage.outputTokens ?? 0) / 1e6 * pOut;
  return { usd, known: true };
}

/** Extract per-request usage points from the conversation snapshot nodes. */
export function collectUsagePoints(nodes: readonly ConversationNode[]): NodePoint[] {
  const points: NodePoint[] = [];
  for (const n of nodes) {
    if (n.kind !== 'assistant') continue;
    const usage = n.usage as NodeUsage | undefined;
    if (!usage || !usage.inputTokens) continue;
    // Model identity: requestConfig is the authoritative record (provider/
    // model required); provenance is the settled-request fallback. Older
    // sessions may have neither — show "未记录" rather than pretending.
    const cfg = n.requestConfig as { provider?: string; model?: string } | undefined;
    const prov = n.provenance as { provider?: string; model?: string } | undefined;
    points.push({
      time: n.time,
      turn: n.turn,
      model: cfg?.model ?? prov?.model ?? null,
      provider: cfg?.provider ?? prov?.provider ?? null,
      usage: {
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        cacheReadTokens: usage.cacheReadTokens,
        cacheWriteTokens: usage.cacheWriteTokens,
        reasoningTokens: usage.reasoningTokens,
      },
    });
  }
  return points;
}

export function aggregateTokens(points: NodePoint[]): TokenAggregate {
  const agg: TokenAggregate = { uncached: 0, cacheRead: 0, cacheWrite: 0, output: 0, reasoning: 0 };
  for (const p of points) {
    // dsh token-meter: usage.inputTokens IS the uncached input bucket
    // (bucketsFrom maps inputTokens -> uncachedInputTokens directly).
    // Do NOT subtract cache buckets here — that produced negative billed
    // input and absurd hit rates (126465%).
    agg.uncached += p.usage.inputTokens ?? 0;
    agg.cacheRead += p.usage.cacheReadTokens ?? 0;
    agg.cacheWrite += p.usage.cacheWriteTokens ?? 0;
    agg.output += p.usage.outputTokens ?? 0;
    agg.reasoning += p.usage.reasoningTokens ?? 0;
  }
  return agg;
}

export function hitRate(agg: TokenAggregate): number {
  // 计费输入 = 未缓存输入 + 缓存读取 + 缓存写入（token-meter 语义）
  const billed = agg.uncached + agg.cacheRead + agg.cacheWrite;
  return billed <= 0 ? 0 : agg.cacheRead / billed;
}

function fmt(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

interface UsageTabProps {
  frame: { nodes: readonly ConversationNode[]; running: boolean };
  tokenUsage: { uncachedInputTokens: number; outputTokens: number; cacheReadTokens: number; cacheWriteTokens: number } | null;
  sessionId: SessionId;
  t?: (k: string) => string;
}

/** SVG chart dims — width adapts to container via viewBox stretch; height fixed. */
const CHART_H = 240;
const PAD = 12;
const LEGEND = [
  { key: 'input', label: '输入', color: '#378ADD' },
  { key: 'output', label: '输出', color: '#1D9E75' },
  { key: 'hit', label: '缓存命中率', color: '#534AB7' },
] as const;

/** Nice tick intervals for the time axis (ms). */
const TICK_INTERVALS = [1_000, 2_000, 5_000, 10_000, 30_000, 60_000, 120_000, 300_000, 600_000, 1_800_000, 3_600_000, 7_200_000, 21_600_000, 43_200_000];

function pickTickInterval(spanMs: number): number {
  // target ~5-8 ticks across the visible span
  for (const iv of TICK_INTERVALS) {
    if (spanMs / iv <= 8) return iv;
  }
  return TICK_INTERVALS[TICK_INTERVALS.length - 1];
}

function fmtClock(t: number): string {
  const d = new Date(t);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export function InsightsUsageTab({ frame, tokenUsage, sessionId, t }: UsageTabProps): ReactNode {
  const tf = t ?? ((k: string) => k);
  const points = useMemo(() => collectUsagePoints(frame.nodes), [frame.nodes]);
  const agg = useMemo(() => aggregateTokens(points), [points]);
  const rate = hitRate(agg);

  // Per-request cost + model mix.
  const costInfo = useMemo(() => {
    let usd = 0; let known = 0;
    const models = new Map<string, number>();
    for (const p of points) {
      const c = estimateCost(p);
      if (c.known) { usd += c.usd; known++; }
      const key = p.model ?? '模型未记录(历史数据)';
      models.set(key, (models.get(key) ?? 0) + 1);
    }
    return { usd, known, total: points.length, models };
  }, [points]);

  // ---- interactive time-axis chart ------------------------------------------
  // Viewport = visible [start, end] window over the full request timeline.
  // Wheel zooms around the cursor; drag pans; double-click resets.
  const [viewport, setViewport] = useState<{ start: number; end: number } | null>(null);
  const drag = useRef<{ x: number; start: number; end: number; moved: boolean } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const full = useMemo(() => {
    if (points.length === 0) return null;
    const t0 = points[0].time;
    const t1 = Math.max(t0 + 1, points[points.length - 1].time);
    return { t0, t1, span: t1 - t0 };
  }, [points]);

  // Reset the viewport when new points arrive (e.g. session switched).
  const prevFullKey = useRef<string>('');
  const fullKey = full ? `${full.t0}:${full.t1}:${points.length}` : '';
  if (fullKey !== prevFullKey.current) {
    prevFullKey.current = fullKey;
    setViewport(full ? { start: full.t0, end: full.t1 } : null);
  }

  // Container width for coordinate math.
  const [width, setWidth] = useState(720);
  useLayoutEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const update = () => setWidth(Math.max(200, el.clientWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const chart = useMemo(() => {
    if (!full || !viewport || points.length === 0) return null;
    const { t0, t1 } = full;
    const vStart = viewport.start;
    const vEnd = viewport.end;
    const vSpan = Math.max(1, vEnd - vStart);
    const plotW = Math.max(50, width - PAD * 2);
    const x = (time: number) => PAD + ((time - vStart) / vSpan) * plotW;
    const maxVal = Math.max(1, ...points.map((p) =>
      Math.max(p.usage.inputTokens ?? 0, p.usage.outputTokens ?? 0, p.usage.reasoningTokens ?? 0)));
    const y = (v: number) => PAD + CHART_H - (v / maxVal) * CHART_H;
    const yHit = (r: number) => PAD + CHART_H - r * CHART_H;
    // Clip lines to the visible window (draw full path; SVG overflow hidden).
    const lineFor = (pick: (p: NodePoint) => number) =>
      points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.time).toFixed(1)},${y(pick(p)).toFixed(1)}`).join('');
    const hitLine = points.map((p, i) => {
      const billed = (p.usage.inputTokens ?? 0) + (p.usage.cacheReadTokens ?? 0) + (p.usage.cacheWriteTokens ?? 0);
      const r = billed <= 0 ? 0 : (p.usage.cacheReadTokens ?? 0) / billed;
      return `${i === 0 ? 'M' : 'L'}${x(p.time).toFixed(1)},${yHit(r).toFixed(1)}`;
    }).join('');
    // Ticks at a nice interval over the visible span.
    const interval = pickTickInterval(vSpan);
    const firstTick = Math.ceil(vStart / interval) * interval;
    const ticks: Array<{ x: number; time: number }> = [];
    for (let t = firstTick; t <= vEnd; t += interval) {
      ticks.push({ x: x(t), time: t });
    }
    // Axis baseline + window labels.
    const fmtRange = () => `${fmtClock(vStart)} – ${fmtClock(vEnd)}`;
    return {
      inputLine: lineFor((p) => p.usage.inputTokens ?? 0),
      outputLine: lineFor((p) => p.usage.outputTokens ?? 0),
      hitLine,
      ticks,
      fmtTick: fmtClock,
      range: fmtRange(),
      viewport: { start: vStart, end: vEnd },
      full: { start: t0, end: t1 },
    };
  }, [points, full, viewport, width]);

  // Wheel: zoom around the cursor-anchored time.
  const onWheel = useCallback((e: React.WheelEvent<SVGSVGElement>) => {
    if (!full || !chart) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const { start, end } = chart.viewport;
    const { start: fStart, end: fEnd } = chart.full;
    const anchorTime = start + (end - start) * rel;
    const factor = e.deltaY > 0 ? 1.25 : 0.8;
    let newSpan = (end - start) * factor;
    newSpan = Math.min(fEnd - fStart, Math.max(2_000, newSpan));
    let newStart = anchorTime - (anchorTime - start) * factor;
    newStart = Math.max(fStart, Math.min(fEnd - newSpan, newStart));
    const newEnd = newStart + newSpan;
    setViewport({ start: newStart, end: newEnd });
  }, [full, chart]);

  // Drag: pan the window.
  const onMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    drag.current = { x: e.clientX, start: chart?.viewport.start ?? 0, end: chart?.viewport.end ?? 1, moved: false };
  }, [chart]);

  const onMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d || !chart || !width) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 2) d.moved = true;
    if (!d.moved) return;
    const { start: fStart, end: fEnd } = chart.full;
    const span = d.end - d.start;
    const dt = (dx / rect.width) * span;
    let ns = d.start - dt;
    let ne = d.end - dt;
    if (ns < fStart) { ne += fStart - ns; ns = fStart; }
    if (ne > fEnd) { ns -= ne - fEnd; ne = fEnd; }
    setViewport({ start: ns, end: ne });
  }, [chart, width]);

  const onMouseUp = useCallback(() => { drag.current = null; }, []);

  const onDoubleClick = useCallback(() => {
    if (chart) setViewport({ start: chart.full.start, end: chart.full.end });
  }, [chart]);

  const zoomed = chart ? chart.viewport.end - chart.viewport.start < (chart.full.end - chart.full.start) * 0.99 : false;

  if (points.length === 0) {
    return (
      <div className="dps-ins-empty">
        <p>{tf('empty.usage')}</p>
        <p className="dps-muted-sm">{tf('empty.usageHint')}</p>
      </div>
    );
  }

  const pct = (rate * 100).toFixed(1);

  return (
    <div className="dps-ins-tab-body">
      {/* Summary cards */}
      <div className="dps-ins-cards">
        <div className="dps-ins-card"><span className="dps-ins-card-label">{tf('usage.totalInput')}</span><span className="dps-ins-card-value">{fmt(agg.uncached + agg.cacheRead + agg.cacheWrite)}</span></div>
        <div className="dps-ins-card"><span className="dps-ins-card-label">{tf('usage.totalOutput')}</span><span className="dps-ins-card-value">{fmt(agg.output + agg.reasoning)}</span></div>
        <div className="dps-ins-card"><span className="dps-ins-card-label">{tf('usage.hitRate')}</span><span className="dps-ins-card-value" style={{ color: '#1D9E75' }}>{pct}%</span></div>
        <div className="dps-ins-card"><span className="dps-ins-card-label">{tf('usage.estimatedCost')}</span><span className="dps-ins-card-value" style={{ color: '#D85A30' }}>
          {costInfo.known === 0 ? '—' : `$${costInfo.usd.toFixed(4)}`}
        </span></div>
      </div>

      {/* Chart: interactive time-axis line chart (input / output / hit-rate).
          Wheel = zoom at cursor, drag = pan, double-click = reset. */}
      <div className="dps-ins-chart-wrap">
        <svg
          ref={svgRef}
          className="dps-ins-chart"
          viewBox={`0 0 ${Math.max(200, width)} ${CHART_H + PAD * 2 + 22}`}
          role="img"
          aria-label="token 用量与缓存命中率时间图表（滚轮缩放，拖动平移，双击复位）"
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onDoubleClick={onDoubleClick}
          style={{ touchAction: 'none', cursor: 'grab', userSelect: 'none' }}
        >
          {chart && <>
            {/* grid + axis baseline */}
            <line x1={PAD} y1={PAD + CHART_H} x2={Math.max(50, width - PAD)} y2={PAD + CHART_H} stroke="#888780" strokeWidth={0.5} />
            {chart.inputLine && <path d={chart.inputLine} fill="none" stroke="#378ADD" strokeWidth={2} strokeLinejoin="round" />}
            {chart.outputLine && <path d={chart.outputLine} fill="none" stroke="#1D9E75" strokeWidth={2} strokeLinejoin="round" />}
            {chart.hitLine && <path d={chart.hitLine} fill="none" stroke="#534AB7" strokeWidth={1.4} strokeDasharray="4 3" strokeLinejoin="round" />}
            {chart.ticks.map((tk, i) => (
              <g key={i}>
                <line x1={tk.x} y1={PAD + CHART_H} x2={tk.x} y2={PAD + CHART_H + 4} stroke="#888780" strokeWidth={0.5} />
                <text x={tk.x} y={PAD + CHART_H + 16} textAnchor="middle" fontSize={10} fill="#888780">{chart.fmtTick(tk.time)}</text>
              </g>
            ))}
            {/* window range hint */}
            <text x={Math.max(50, width - PAD)} y={PAD - 4} textAnchor="end" fontSize={10} fill="#888780">{chart.range}</text>
          </>}
        </svg>
        {zoomed && (
          <div className="dps-ins-chart-hint">
            <span>滚轮缩放 · 拖动平移 · 双击复位</span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="dps-ins-legend">
        {LEGEND.map((l) => (
          <span key={l.key} className="dps-ins-legend-item"><i style={{ background: l.color }} />{l.label}</span>
        ))}
      </div>

      {/* Model mix + price version */}
      <div className="dps-ins-meta">
        <div className="dps-ins-meta-title">{tf('usage.modelMix')}{frame.running ? ' · ' + tf('state.installing') : ''}</div>
        {[...costInfo.models.entries()].map(([m, c]) => (
          <div key={m} className="dps-ins-meta-row"><span className="dps-ins-meta-name" title={m}>{m}</span><span className="dps-muted-sm">{c} 次</span></div>
        ))}
        {costInfo.models.has('模型未记录(历史数据)') && (
          <div className="dps-muted-sm">「模型未记录」= 较早的会话日志没有保存模型信息，属正常。</div>
        )}
        {costInfo.total > 0 && costInfo.known < costInfo.total && (
          <div className="dps-ins-warn">未收录模型的费用未计入（价格表 v{CURRENT_PRICES.version}）</div>
        )}
        <div className="dps-muted-sm">会话 {sessionId.slice(0, 8)} · 价格表 v{CURRENT_PRICES.version}（{CURRENT_PRICES.effectiveFrom} 生效）</div>
      </div>
    </div>
  );
}
