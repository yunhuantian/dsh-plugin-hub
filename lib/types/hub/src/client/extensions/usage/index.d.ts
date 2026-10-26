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
import { type ReactNode } from 'react';
import { type UsageNode } from './usage-tab';
import { usageCss } from './usage-css';
/** 本扩展的视图 id（slot 内唯一）。 */
export declare const USAGE_VIEW_ID = "hub-ext-usage";
/** 本扩展的字典命名空间（与 hub 核心的 pluginStore 分开，便于各自维护）。 */
export declare const USAGE_NS = "hubUsage";
/** 本扩展的字典（由 hub client 入口统一注册）。 */
export declare const usageDictionaries: {
    zh: {
        tab: string;
        input: string;
        output: string;
        hitRate: string;
        totalInput: string;
        totalOutput: string;
        costCharged: string;
        costChargedHint: string;
        costNow: string;
        deltaFlat: string;
        deltaMore: string;
        deltaLess: string;
        modelMix: string;
        chartHint: string;
        chartAria: string;
        modelUnknown: string;
        modelUnknownHint: string;
        unknownPriceWarn: string;
        sessionLabel: string;
        priceTable: string;
        priceVersionsUsed: string;
        effective: string;
        peakRule: string;
        times: string;
        running: string;
        empty: string;
        emptyHint: string;
    };
    en: Record<"input" | "output" | "running" | "tab" | "hitRate" | "empty" | "emptyHint" | "chartAria" | "modelMix" | "modelUnknownHint" | "unknownPriceWarn" | "priceTable" | "effective" | "peakRule" | "priceVersionsUsed" | "sessionLabel" | "totalInput" | "totalOutput" | "costCharged" | "costChargedHint" | "costNow" | "deltaFlat" | "deltaMore" | "deltaLess" | "chartHint" | "modelUnknown" | "times", string>;
};
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
export declare function UsageView(props: UsageViewKit): ReactNode;
/**
 * 注册用量视图（由 hub client 入口在扩展开启时调用）。
 *
 * 返回一个 cordis feature（有 `dispose`），与核心入口的注册方式一致 ——
 * 这样扩展 UI 的生命周期跟着 hub client 一起收放。
 */
export declare function mountUsageView(ctx: any): {
    dispose: () => Promise<void>;
};
export { usageCss };
