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

import { useCallback, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { UNKNOWN_MODEL, latestTable, settleRequest, type UsageBuckets } from '../../../contracts/pricing.js';

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
  time: number;          // epoch ms（0 = 日志未记录时间）
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

/** Extract per-request usage points from the conversation snapshot nodes. */
export function collectUsagePoints(nodes: readonly UsageNode[]): NodePoint[] {
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
      time: n.time ?? 0,
      turn: n.turn ?? 0,
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

/** 美元金额：小额多给几位，避免全是 0.0000。 */
function fmtUsd(v: number): string {
  if (v === 0) return '$0';
  if (v < 0.01) return `$${v.toFixed(5)}`;
  if (v < 1) return `$${v.toFixed(4)}`;
  return `$${v.toFixed(2)}`;
}

interface UsageTabProps {
  frame: { nodes: readonly UsageNode[]; running: boolean };
  tokenUsage: { uncachedInputTokens: number; outputTokens: number; cacheReadTokens: number; cacheWriteTokens: number } | null;
  sessionId: SessionId;
  t?: (k: string) => string;
}

/** SVG chart dims — width adapts to container via viewBox stretch; height fixed. */
const CHART_H = 240;
const PAD = 12;
const LEGEND = [
  { key: 'input', labelKey: 'input', color: '#378ADD' },
  { key: 'output', labelKey: 'output', color: '#1D9E75' },
  { key: 'hit', labelKey: 'hitRate', color: '#534AB7' },
] as const;

/** Internal bucket key for requests whose model name was never recorded. */
const UNKNOWN_MODEL_LABEL = UNKNOWN_MODEL;

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

/** ISO 时间 → 本地日期（价格表生效日展示）。 */
function fmtDay(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function InsightsUsageTab({ frame, tokenUsage, sessionId, t }: UsageTabProps): ReactNode {
  const tf = t ?? ((k: string) => k);
  const points = useMemo(() => collectUsagePoints(frame.nodes), [frame.nodes]);
  const pointAgg = useMemo(() => aggregateTokens(points), [points]);

  /**
   * 权威合计优先用 host 的 `tokenUsage` 投影，而不是把节点 usage 加起来。
   *
   * 为什么（0.2.8 实测）：节点上的 usage **不保证逐请求完整** —— 长会话里
   * 节点表可能被裁剪/压缩，而 `tokenUsage` 是 token-meter 在 host 侧逐请求累计
   * 出来的，天然是全量。用节点求和会出现"图表有折线、合计却偏小甚至为 0"。
   *
   * 只有在投影缺失时才回落到节点求和（老会话 / 投影未就绪的瞬间）。
   * 两者口径相同（inputTokens 就是未缓存桶），所以切换不会跳数。
   */
  const agg = useMemo<TokenAggregate>(() => {
    if (tokenUsage === null || tokenUsage === undefined) return pointAgg;
    const t = tokenUsage;
    const fromProjection: TokenAggregate = {
      uncached: t.uncachedInputTokens ?? 0,
      cacheRead: t.cacheReadTokens ?? 0,
      cacheWrite: t.cacheWriteTokens ?? 0,
      output: t.outputTokens ?? 0,
      reasoning: pointAgg.reasoning, // 投影没有推理桶，节点上有就照加
    };
    const empty = fromProjection.uncached + fromProjection.cacheRead
      + fromProjection.cacheWrite + fromProjection.output === 0;
    return empty ? pointAgg : fromProjection;
  }, [tokenUsage, pointAgg]);

  /**
   * 逐请求点数与合计的差距 → 提示"部分请求无明细"。
   *
   * 图表只画得了有节点的那部分，所以合计可能明显大于图表之和。不解释的话，
   * 用户会以为是算错了（正是 0.2.8 之前被当成"空白"的那类误判）。
   */
  const missingDetail = useMemo(() => {
    const pointTotal = pointAgg.uncached + pointAgg.cacheRead + pointAgg.cacheWrite + pointAgg.output;
    const aggTotal = agg.uncached + agg.cacheRead + agg.cacheWrite + agg.output;
    return aggTotal > pointTotal * 1.02 && pointTotal >= 0 ? aggTotal - pointTotal : 0;
  }, [agg, pointAgg]);

  const rate = hitRate(agg);
  const nowTable = latestTable();

  // Per-request cost: 「当时价」与「现价」两套，外加模型分布与用到的价表版本。
  const costInfo = useMemo(() => {
    let charged = 0; let now = 0; let known = 0;
    const models = new Map<string, number>();
    const tables = new Map<string, number>();
    for (const p of points) {
      // time 缺失（老日志）时无法定位价表，退回"现在"：此时 charged == now，
      // 差额为 0 —— 比编造一个历史价诚实。
      const s = settleRequest(p.usage, p.provider, p.model, p.time);
      // known 同时要求"当时收录过"：模型是后来才加进价表的，不能说当时收了钱。
      if (s.chargedKnown) { charged += s.chargedUsd; now += s.nowUsd; known++; }
      // 模型桶按**归一后**的名字分（否则 deepseek-flash / deepseek 会裂成两行）。
      const key = s.model ?? UNKNOWN_MODEL;
      models.set(key, (models.get(key) ?? 0) + 1);
      tables.set(s.chargedTable.id, (tables.get(s.chargedTable.id) ?? 0) + 1);
    }
    return { charged, now, delta: now - charged, known, total: points.length, models, tables };
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

  /**
   * 空态判定看的是**合计**，不是点数。
   *
   * 0.2.8 实测：这个会话有 6742 个事件、累计 1.7M 未缓存输入 + 100 万输出 +
   * 5.9 亿缓存命中，但 chat target 的 `legacy.nodes` 里一个带 usage 的 assistant
   * 节点都没有 —— 于是旧的 `points.length === 0` 直接判空，页面只剩一句
   * "还没有用量数据"，看起来就是"空的"。
   *
   * 现在只要 token 投影有数，就渲染汇总卡；图表单独判断有没有明细点。
   */
  const aggTotal = agg.uncached + agg.cacheRead + agg.cacheWrite + agg.output;
  if (aggTotal <= 0) {
    return (
      <div className="dsu-empty">
        <p>{tf('empty')}</p>
        <p className="dsu-muted">{tf('emptyHint')}</p>
      </div>
    );
  }

  const pct = (rate * 100).toFixed(1);
  const deltaUp = costInfo.delta > 0;
  const deltaFlat = Math.abs(costInfo.delta) < 1e-9;
  const hasPoints = points.length > 0;

  return (
    <div className="dsu-tab-body">
      {/* Summary cards */}
      <div className="dsu-cards">
        <div className="dsu-card"><span className="dsu-card-label">{tf('totalInput')}</span><span className="dsu-card-value">{fmt(agg.uncached + agg.cacheRead + agg.cacheWrite)}</span></div>
        <div className="dsu-card"><span className="dsu-card-label">{tf('totalOutput')}</span><span className="dsu-card-value">{fmt(agg.output + agg.reasoning)}</span></div>
        <div className="dsu-card"><span className="dsu-card-label">{tf('hitRate')}</span><span className="dsu-card-value" style={{ color: '#1D9E75' }}>{pct}%</span></div>
        <div className="dsu-card">
          <span className="dsu-card-label">{tf('costCharged')}</span>
          <span className="dsu-card-value" style={{ color: '#D85A30' }}>{costInfo.known === 0 ? '—' : fmtUsd(costInfo.charged)}</span>
          <span className="dsu-card-sub">{tf('costChargedHint')}</span>
        </div>
        <div className="dsu-card">
          <span className="dsu-card-label">{tf('costNow')}</span>
          <span className="dsu-card-value" style={{ color: '#D85A30' }}>{costInfo.known === 0 ? '—' : fmtUsd(costInfo.now)}</span>
          <span className="dsu-card-sub" style={{ color: deltaFlat ? undefined : deltaUp ? '#D85A30' : '#1D9E75' }}>
            {costInfo.known === 0 || deltaFlat
              ? tf('deltaFlat')
              : `${deltaUp ? '+' : '−'}${fmtUsd(Math.abs(costInfo.delta)).slice(1)} ${deltaUp ? tf('deltaMore') : tf('deltaLess')}`}
          </span>
        </div>
      </div>

      {/* Chart: interactive time-axis line chart (input / output / hit-rate).
          Wheel = zoom at cursor, drag = pan, double-click = reset.

          没有明细点（节点表被裁剪 / 老会话没存 usage）时不再画一条空轴，
          直接说明"图表没有逐请求明细、合计来自 host 累计"，指向下面的汇总卡。 */}
      {hasPoints ? (
      <div className="dsu-chart-wrap">
        <svg
          ref={svgRef}
          className="dsu-chart"
          viewBox={`0 0 ${Math.max(200, width)} ${CHART_H + PAD * 2 + 22}`}
          role="img"
          aria-label={tf('chartAria')}
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
          <div className="dsu-chart-hint">
            <span>{tf('chartHint')}</span>
          </div>
        )}
      </div>
      ) : (
        <div className="dsu-nodetail">
          <p>{tf('noDetail')}</p>
          <p className="dsu-muted">{tf('noDetailHint')}</p>
        </div>
      )}

      {hasPoints && (
        <>
          {/* Legend */}
          <div className="dsu-legend">
            {LEGEND.map((l) => (
              <span key={l.key} className="dsu-legend-item"><i style={{ background: l.color }} />{tf(l.labelKey)}</span>
            ))}
          </div>

          {/* 合计 > 明细之和时说明差额去哪了，否则用户会以为算错 */}
          {missingDetail > 0 && (
            <div className="dsu-muted">
              {tf('partialDetail')} · {fmt(missingDetail)}
            </div>
          )}
        </>
      )}

      {/* Model mix + price-table provenance */}
      <div className="dsu-meta">
        <div className="dsu-meta-title">{tf('modelMix')}{frame.running ? ' · ' + tf('running') : ''}</div>
        {costInfo.models.size === 0 && <div className="dsu-muted">{tf('modelMixNone')}</div>}
        {[...costInfo.models.entries()].map(([m, c]) => (
          <div key={m} className="dsu-meta-row"><span className="dsu-meta-name" title={m === UNKNOWN_MODEL ? tf('modelUnknown') : m}>{m === UNKNOWN_MODEL ? tf('modelUnknown') : m}</span><span className="dsu-muted">{c} {tf('times')}</span></div>
        ))}
        {costInfo.models.has(UNKNOWN_MODEL) && (
          <div className="dsu-muted">{tf('modelUnknownHint')}</div>
        )}
        {costInfo.total > 0 && costInfo.known < costInfo.total && (
          <div className="dsu-warn">{tf('unknownPriceWarn')} · v{nowTable.id} · {costInfo.total - costInfo.known}/{costInfo.total}</div>
        )}

        {/* 价格表来源：版本 + 生效日期（0.2 起价格表带日期，可回溯历史价） */}
        <div className="dsu-muted">
          {tf('priceTable')} v{nowTable.id}（{fmtDay(nowTable.effectiveFrom)} {tf('effective')}）· {nowTable.label}
          {nowTable.peak !== null ? ` · ${tf('peakRule')} ${nowTable.peak.multiplier}×` : ''}
        </div>
        {[...costInfo.tables.entries()].length > 1 && (
          <div className="dsu-muted">
            {tf('priceVersionsUsed')}：
            {[...costInfo.tables.entries()].map(([v, n]) => `v${v}(${n})`).join(' · ')}
          </div>
        )}
        <div className="dsu-muted">{tf('sessionLabel')} {sessionId.slice(0, 8)}</div>
      </div>
    </div>
  );
}
