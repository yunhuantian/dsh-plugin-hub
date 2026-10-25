/** setup 里可以拿到的上下文（目前就是 cordis 的 ctx，原样透传）。 */
export type SetupFn = (ctx: any) => void;
/**
 * 按开关与依赖决定是否装配一个内建插件。
 *
 * @param ctx   cordis 上下文
 * @param id    插件 id（必须出现在 HUB_PLUGINS 名册里）
 * @param setup 真正提供服务的回调；只有"该跑"时才会被调用
 * @returns     是否真的装配了（少数插件需要据此决定后续行为）
 */
export declare function activate(ctx: any, id: string, setup: SetupFn): boolean;
/**
 * 附带信息的版本：允许插件在 setup 里补一句关键参数（如"价格表 2026-09-14"）。
 * 文案会被 `activate` 采纳为准（见 pendingDetail 的时序说明）。
 */
export declare function note(id: string, detail: string): void;
