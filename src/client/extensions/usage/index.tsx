/**
 * hub 内置扩展 · 用量与费用（Usage & Cost）—— client 端。
 *
 * 0.2 起这个视图**不再独立发包**：它是 hub 包 client 半边里的一个扩展模块，
 * 由 `src/client/index.tsx` 按扩展开关决定是否注册（与 host 端
 * `dsh-plugin-hub/extensions/usage` 同属一个包，一次安装、一次发布）。
 *
 * 挂 `conversation.view` slot（list 类），与「对话」「轨迹」并排。
 * 数据来源（新版 harness，0.2 适配的关键）：
 *   - 节点：`ctx.uiConversation.binding(sessionId).target('chat')` 的快照
 *     `legacy.nodes`（旧版的 `useSession(s => s.nodes)` 在新版恒为 undefined）
 *   - token 合计：slot 标准 kit 的 `useProjection('tokenUsage')`
 *   - 费用：`contracts/pricing.ts` 的版本化价格表（当时价 / 现价）
 */
import { useMemo, useSyncExternalStore, type ReactNode } from 'react';
import { InsightsUsageTab, type UsageNode } from './usage-tab';
import { usageCss } from './usage-css';

/** 本扩展的视图 id（slot 内唯一）。 */
export const USAGE_VIEW_ID = 'hub-ext-usage';

/** 本扩展的字典命名空间（与 hub 核心的 pluginStore 分开，便于各自维护）。 */
export const USAGE_NS = 'hubUsage';

const zh = {
  'tab': '用量',
  'input': '输入',
  'output': '输出',
  'hitRate': '缓存命中率',
  'totalInput': '总输入',
  'totalOutput': '总输出',
  'costCharged': '当时价',
  'costChargedHint': '按请求发生时的价格表',
  'costNow': '现价',
  'deltaFlat': '与当时同价',
  'deltaMore': '比当时贵',
  'deltaLess': '比当时便宜',
  'modelMix': '模型分布',
  'chartHint': '滚轮缩放 · 拖动平移 · 双击复位',
  'chartAria': 'token 用量与缓存命中率时间图表（滚轮缩放，拖动平移，双击复位）',
  'modelUnknown': '模型未记录(历史数据)',
  'modelUnknownHint': '「模型未记录」= 较早的会话日志没有保存模型信息，属正常。',
  'unknownPriceWarn': '未收录模型的费用未计入',
  'sessionLabel': '会话',
  'priceTable': '价格表',
  'priceVersionsUsed': '本会话用到的价格表版本',
  'effective': '生效',
  'peakRule': '高峰时段',
  'times': '次',
  'running': '进行中',
  'empty': '还没有用量数据',
  'emptyHint': '发送第一条消息后，这里会展示每个请求的 token 与缓存命中率。',
};

const en: Record<keyof typeof zh, string> = {
  'tab': 'Usage',
  'input': 'Input',
  'output': 'Output',
  'hitRate': 'Cache hit rate',
  'totalInput': 'Total input',
  'totalOutput': 'Total output',
  'costCharged': 'As charged',
  'costChargedHint': 'Price table in effect at request time',
  'costNow': 'At today\u2019s price',
  'deltaFlat': 'Same as charged',
  'deltaMore': 'costs more today',
  'deltaLess': 'costs less today',
  'modelMix': 'Model mix',
  'chartHint': 'Wheel to zoom · drag to pan · double-click to reset',
  'chartAria': 'Token usage and cache hit-rate timeline (wheel to zoom, drag to pan, double-click to reset)',
  'modelUnknown': 'Model not recorded (legacy)',
  'modelUnknownHint': '"Model not recorded" = older session logs did not store the model name; this is expected.',
  'unknownPriceWarn': 'Costs for unpriced models are excluded',
  'sessionLabel': 'Session',
  'priceTable': 'Price table',
  'priceVersionsUsed': 'Price tables used in this session',
  'effective': 'effective',
  'peakRule': 'peak hours',
  'times': 'calls',
  'running': 'running',
  'empty': 'No usage data yet',
  'emptyHint': 'Send a message to see per-request tokens and cache hit rate here.',
};

/** 本扩展的字典（由 hub client 入口统一注册）。 */
export const usageDictionaries = { zh, en };

/**
 * 新版 harness 的 chat target 快照 —— 只声明本插件用到的字段。
 *
 * 旧版从 `useSession(s => s.nodes)` 取节点；新版把 `ConversationSnapshot`
 * 拆成 `{ views, activeTargets }`，**节点数据搬到了各 view target 的 snapshot 里**，
 * 所以旧写法恒得 undefined、组件渲染即崩（白屏的直接原因）。
 *
 * 官方 chat target 的 `legacy.nodes` 正是 `ConversationNode[]`（源码注释：
 * "Compatibility projection backing StatsPills and the legacy top-level
 * snapshot fields"），字段与新版的 AssistantMessageNode 一致，本视图可直接用；
 * `legacy.partial` 用来判断是否仍在出流（对应旧的 `running`）。
 */
interface ChatLegacySlice {
  readonly nodes?: readonly UsageNode[];
  readonly partial?: unknown;
}
interface ChatSnapshotLike {
  readonly legacy?: ChatLegacySlice;
}
/** ObservableSnapshot 的最小形状（与官方 trajectory 用法一致）。 */
export interface ChatNodeSource {
  getSnapshot: () => ChatSnapshotLike | undefined;
  subscribe: (listener: () => void) => () => void;
}

/** 空节点表的稳定引用，避免 useMemo 依赖反复变化。 */
const EMPTY_NODES: readonly UsageNode[] = [];

/**
 * conversation.view slot 的标准 kit（framework-injected）＋本扩展自注入的 chatSource。
 */
export interface UsageViewKit {
  useProjection: (key: string, sel?: (v: unknown) => unknown) => unknown;
  sessionId: string;
  t: (k: string) => string;
  chatSource: ChatNodeSource;
}

/**
 * 用量视图 tab。节点来自 chat target（useSyncExternalStore 订阅），
 * token 合计来自 Host 计算的 `tokenUsage` 投影。
 */
export function UsageView(props: UsageViewKit): ReactNode {
  const { useProjection, sessionId, t, chatSource } = props;
  const chat = useSyncExternalStore(chatSource.subscribe, chatSource.getSnapshot);
  const nodes = chat?.legacy?.nodes ?? EMPTY_NODES;
  const running = chat?.legacy?.partial != null;
  const tokenUsage = useProjection('tokenUsage', (v) => v ?? null) as unknown as
    | { uncachedInputTokens: number; outputTokens: number; cacheReadTokens: number; cacheWriteTokens: number }
    | null;

  const frame = useMemo(() => ({ nodes, running }), [nodes, running]);

  return (
    <div className="dsu-root" data-plugin={USAGE_VIEW_ID}>
      <InsightsUsageTab frame={frame} tokenUsage={tokenUsage} sessionId={sessionId} t={t} />
    </div>
  );
}

/**
 * 注册用量视图（由 hub client 入口在扩展开启时调用）。
 *
 * 返回一个 cordis feature（有 `dispose`），与核心入口的注册方式一致 ——
 * 这样扩展 UI 的生命周期跟着 hub client 一起收放。
 */
export function mountUsageView(ctx: any): { dispose: () => Promise<void> } {
  /**
   * 每会话的 chat target 源按 binding 缓存 —— 与官方 trajectory 相同的
   * WeakMap 模式：getSnapshot 必须返回稳定引用，否则 useSyncExternalStore
   * 会陷入重渲染循环。
   */
  const chatSources = new WeakMap<object, ChatNodeSource>();
  const chatSourceFor = (sessionId: string): ChatNodeSource => {
    const binding = ctx.uiConversation.binding(sessionId);
    let source = chatSources.get(binding);
    if (source === undefined) {
      const target = binding.target('chat');
      source = {
        getSnapshot: () => target.getSnapshot(),
        subscribe: (listener: () => void) => target.subscribe(listener),
      };
      chatSources.set(binding, source);
    }
    return source;
  };

  return ctx.inject(['slots', 'uiConversation'], (scope: any) => {
    const t = ctx.locale.bind(USAGE_NS);

    scope.slots.inject('conversation.view', () => scope.slots.register({
      name: 'conversation.view',
      id: USAGE_VIEW_ID,
      order: 30,
      locale: USAGE_NS,
      label: () => t('tab'),
      inject: (sessionId: string) => ({ sessionId, t, chatSource: chatSourceFor(sessionId) }),
    }, UsageView));

    return () => {};
  });
}

export { usageCss };
