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
  'noDetail': '这个会话没有逐请求明细',
  'noDetailHint': '合计、缓存命中率与费用来自 host 的累计投影，数字是完整的；图表需要每个请求的节点记录，而这条会话的节点已不可用（会话过长被裁剪，或是较早的日志）。',
  'partialDetail': '图表只覆盖有明细的部分，另有累计 token 未画入图表',
  'modelMixNone': '没有逐请求记录，无法拆分模型',
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
  'noDetail': 'No per-request detail for this session',
  'noDetailHint': 'Totals, cache hit rate and cost come from the host\u2019s cumulative projection and are complete. The chart needs a node per request, which this session no longer has (very long sessions get trimmed, and older logs never stored it).',
  'partialDetail': 'The chart only covers requests with detail; extra cumulative tokens are not plotted',
  'modelMixNone': 'No per-request records, so the model mix is unknown',
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
  /** 同 getSnapshot；只有服务端渲染（测试用）才需要，浏览器端可省。 */
  getServerSnapshot?: () => ChatSnapshotLike | undefined;
}

/** 空节点表的稳定引用，避免 useMemo 依赖反复变化。 */
const EMPTY_NODES: readonly UsageNode[] = [];

/**
 * conversation.view slot 的标准 kit 里，本扩展**唯一自己提供**的那一项。
 *
 * 其余标准 hook（`useProjection` / `sessionId` / `useSession` / `t` …）由框架
 * 直接作为组件 props 注入，**绝不能写进 `inject` 的返回值**。
 *
 * ⚠️ 0.2.8 第五次"用量页空白"的根因就是这个：`inject` 返回的
 * `{ sessionId, t, chatSource }` 会以**同一个同名 prop**覆盖框架注入值。
 *   - `sessionId` 被覆盖成同名同值，看不出来；
 *   - `t` 覆盖后仍是可用函数，也看不出来；
 *   - `useSession`（若照抄官方写法）覆盖后是 `undefined` → `useSession(...)` 直接抛
 *     `TypeError: useSession is not a function` → 整个页签渲染成空白，控制台之外无提示。
 *
 * 规矩：`inject` 只放**框架不提供**的东西。槽清单里 `standardProps` 列出的名字
 * （`useRemoteAccess` / `useResource` / `useWorkspaces` / `usePanelInfo` /
 * `useSessions` / `useSessionStatus` / `useSessionRetainInfo` / `useSessionAccess` /
 * `useWorkspaceAccess` / `useChat` / `useConversation` / `useInput` / `inputActions` /
 * `useSession` / `sessionId` / `useProjection` / `useAccess` / `useTrajectory`）
 * 一个都不要出现在 inject 的返回值里。
 */
export interface UsageViewOwnerProps {
  /** 框架注入：按 key 读 host 投影的 selector hook。 */
  useProjection?: (key: string, sel?: (v: unknown) => unknown) => unknown;  /** 框架注入：当前会话 id。 */
  sessionId?: string;
  /** 框架注入：绑到本扩展 locale 命名空间的翻译函数。 */
  t?: (k: string) => string;
  /** 本扩展注入：chat target 的节点源。 */
  chatSource: ChatNodeSource;
}

/**
 * 用量视图 tab。节点来自 chat target（useSyncExternalStore 订阅），
 * token 合计来自 Host 计算的 `tokenUsage` 投影。
 *
 * 对标准 props 做防御性兜底：万一某个 host 版本没注入 `useProjection`，
 * 视图仍能用节点求和把数字显示出来，而不是整个崩掉（空白页最难排查）。
 */
export function UsageView(props: UsageViewOwnerProps): ReactNode {
  const { useProjection, sessionId, chatSource } = props;
  const t = props.t ?? ((k: string) => k);
  const chat = useSyncExternalStore(
    chatSource.subscribe,
    chatSource.getSnapshot,
    chatSource.getServerSnapshot ?? chatSource.getSnapshot,
  );
  const nodes = chat?.legacy?.nodes ?? EMPTY_NODES;
  const running = chat?.legacy?.partial != null;
  /**
   * `useProjection` 可能是 undefined（宿主版本不注入 / 组件被单测直接调用）。
   * hook 不能在条件分支里调，所以先回落成一个"恒返回 null"的稳定函数，
   * 再统一调用 —— 合计会退到节点求和，界面照常可用。
   */
  const projection = useProjection ?? noProjection;
  /**
   * 不带 selector 直读：`useProjection(key)` 的返回值本身就是稳定引用
   * （同一个 key 只在帧到达时换引用）。反过来，selector 的默认比较是引用相等，
   * 而 `(v) => v ?? null` 在 v 为 undefined 时**每次都是新的 null 表达式结果以外的
   * 新建值引用**，会触发 useSyncExternalStore 的无限重渲染。
   */
  const tokenUsage = projection('tokenUsage') as unknown as
    | { uncachedInputTokens: number; outputTokens: number; cacheReadTokens: number; cacheWriteTokens: number }
    | null | undefined;

  const frame = useMemo(() => ({ nodes, running }), [nodes, running]);

  return (
    <div className="dsu-root" data-plugin={USAGE_VIEW_ID}>
      <InsightsUsageTab frame={frame} tokenUsage={tokenUsage} sessionId={sessionId ?? ''} t={t} />
    </div>
  );
}

/** `useProjection` 缺席时的兜底：不订阅、恒返回 null。 */
function noProjection(): null {
  return null;
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
      label: () => t('tab'), // 标签文案走 locale 命名空间（自动跟随语言）
      // ⚠️ 只注入框架不提供的东西。`sessionId` / `t` / `useProjection` 等
      //    标准 props 由框架直接给，写在这里会**同名覆盖**（覆盖成 undefined
      //    就等于把组件弄崩，且是静默的空白页）。详见 UsageViewOwnerProps 注释。
      inject: (sessionId: string) => {
        try {
          return { chatSource: chatSourceFor(sessionId) };
        } catch (error) {
          // binding 尚未就绪时不抛（抛出去同样等于页签空白）；给一个空源，
          // 视图降级为"无明细 + 合计来自投影"。
          console.warn('[dsh-plugin-hub] usage: chat target unavailable:', error);
          return { chatSource: EMPTY_SOURCE };
        }
      },
    }, UsageView));

    return () => {};
  });
}

/** chat target 取不到时的空源（稳定引用，getSnapshot 恒 undefined）。 */
const EMPTY_SOURCE: ChatNodeSource = {
  getSnapshot: () => undefined,
  subscribe: () => () => {},
};

export { usageCss };
