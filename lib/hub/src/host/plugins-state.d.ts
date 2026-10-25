/** 插件运行的五个阶段。 */
export type PluginPhase = 
/** 已启用并完成装配。 */
'active'
/** 用户在设置里关掉了（条目仍在，模块主动让位）。 */
 | 'disabled'
/** 依赖的插件没开，本插件主动让位（依赖管理，非故障）。 */
 | 'blocked'
/** 装配过程中抛错。 */
 | 'failed'
/** 尚未上报（条目被 loader 停用，或用旧版本留下）。 */
 | 'idle';
/** 分组 id。 */
export type HubPluginGroupId = 'foundation' | 'safety' | 'publish' | 'insight' | 'ops';
/** 一个分组（设置页按它分节显示）。 */
export interface HubPluginGroup {
    readonly id: HubPluginGroupId;
    readonly name: string;
    readonly nameEn: string;
    /** 分组用途一句话。 */
    readonly description: string;
    readonly descriptionEn: string;
    readonly order: number;
}
/** 五个分组：基础 → 安全 → 发布 → 洞察 → 运维。 */
export declare const HUB_PLUGIN_GROUPS: readonly HubPluginGroup[];
/** 一个 hub 内建插件的静态描述符。 */
export interface HubPluginDescriptor {
    /** 插件 id（稳定，用于状态文件、Remote 与设置页）。 */
    readonly id: string;
    /** 中文名。 */
    readonly name: string;
    /** 英文名。 */
    readonly nameEn: string;
    readonly description: string;
    readonly descriptionEn: string;
    /** 所属分组。 */
    readonly group: HubPluginGroupId;
    /** 硬依赖的插件 id：没开就 blocked。 */
    readonly requires: readonly string[];
    /** profile patch 里的行 id。 */
    readonly rowId: string;
    /** cordis 行 name（= 包内子路径模块）。 */
    readonly entry: string;
    /** 默认是否开启。 */
    readonly defaultEnabled: boolean;
    /** 该插件 host 端提供的服务名（无则 null）。 */
    readonly service: string | null;
    /** 该插件在 UI 上出现的位置（人类可读；无 UI 则 null）。 */
    readonly ui: string | null;
    /** 排序（越小越靠前，仅在组内生效）。 */
    readonly order: number;
}
/**
 * hub 内建插件名册 —— 20 个，分 5 组。
 *
 * 顺序即依赖的自然顺序：基础在前、运维在后。每条的 `requires` 都指向更靠前的
 * 条目，因此不存在环。
 */
export declare const HUB_PLUGINS: readonly HubPluginDescriptor[];
/** 按 id 取描述符。 */
export declare function pluginById(id: string): HubPluginDescriptor | undefined;
/** 按分组取描述符（组内按 order）。 */
export declare function pluginsInGroup(group: HubPluginGroupId): HubPluginDescriptor[];
/** 谁依赖了我（反向边，供 UI 提示"关掉会影响谁"）。 */
export declare function dependentsOf(id: string): HubPluginDescriptor[];
/** hub 状态目录（与商店数据库同目录，按需创建）。 */
export declare function pluginStateDir(home?: string): string;
/** 用户开关文件。 */
export declare function pluginOverridesFile(home?: string): string;
/** 插件上报的状态文件。 */
export declare function pluginStatusFile(home?: string): string;
/**
 * 读用户的开关覆盖（缺省 = 跟随描述符默认值）。
 * 兼容读取 0.2 早期的 `extensions.json`：老用户不必重新配置一遍。
 */
export declare function readOverrides(home?: string): Record<string, boolean>;
/** 设置一个插件的开关（只写覆盖值，保持其它条目不变）。 */
export declare function writeOverride(id: string, enabled: boolean, home?: string): void;
/** 该插件自身的开关值（覆盖值优先，其次描述符默认值；不含依赖判定）。 */
export declare function isPluginEnabled(id: string, home?: string): boolean;
/** 依赖判定的结果。 */
export interface ActivationDecision {
    /** 自己开了、依赖也齐了 → true。 */
    readonly runnable: boolean;
    /** 自己的开关值。 */
    readonly enabled: boolean;
    /** 没开或者缺失的依赖（已翻译成描述符，便于直接展示名字）。 */
    readonly missing: readonly HubPluginDescriptor[];
    /** 人类可读的原因（写入状态文件）。 */
    readonly reason: string;
}
/**
 * 判定一个内建插件此刻能不能跑。
 *
 * 依赖判定是**递归的**：A 依赖 B、B 依赖 C，若 C 关了，B 与 A 都会 blocked
 * （B 先被判定为不可跑，A 随之被判定为缺 B）。这样"关一个底座"能连带停掉整条链，
 * UI 上看到的 blocked 原因也会指向最初被关的那个。
 */
export declare function resolveActivation(id: string, home?: string): ActivationDecision;
/** 插件上报的运行状态。 */
export interface PluginStatus {
    phase: PluginPhase;
    /** 一句话说明（失败原因 / 关键参数等）。 */
    detail: string;
    /** 上报时间（epoch ms）。 */
    at: number;
}
/** 读全部插件上报的状态（兼容 0.2 早期的 extensions-status.json）。 */
export declare function readStatuses(home?: string): Record<string, PluginStatus>;
/**
 * 上报一个插件的状态（浅合并，保留其它插件的条目）。
 * 插件不应当让状态写入失败影响自身装配，因此调用方可以忽略异常。
 */
export declare function writeStatus(id: string, phase: PluginPhase, detail?: string, home?: string): void;
