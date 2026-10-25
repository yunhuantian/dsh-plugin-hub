/**
 * 内建插件的统一装配器 —— 20 个模块共用的一段"要不要跑 / 跑完怎么报告"的逻辑。
 *
 * 每个内建插件模块的形状因此都一样：
 *
 *   export const name = 'dsh-plugin-hub/extensions/security';
 *   export const provide = ['pluginSecurity'];
 *   export const inject: string[] = [];
 *   export function apply(ctx: any): void {
 *     activate(ctx, 'security', () => {
 *       ctx.provide('pluginSecurity', () => ({ ... }));
 *     });
 *   }
 *
 * `activate` 负责三件事，模块自己不用重复写：
 *   1. 读开关（plugins.json）+ 递归判定依赖 → 没开就上报 disabled、依赖缺就上报 blocked，
 *      并**直接让位**（不执行 setup）—— 这就是"关掉 = 不提供服务、不注册 UI"；
 *   2. 执行 setup 注册服务；
 *   3. 上报 active，并挂一个卸载钩子把状态改回 idle。
 *
 * 注意：这里**不用 cordis 的 `inject` 硬依赖**。硬依赖会造成"提供者被停用 →
 * 消费者永久 pending"的死锁，而用户开关随时可能关掉任何一个底座。依赖改为声明式
 * （名册里的 `requires`）+ 运行时判定，关掉底座时消费者是"干净的 blocked"，
 * 随时能开回来。
 */
import { resolveActivation, writeStatus, pluginById } from '../host/plugins-state.js';
/**
 * setup 期间用 `note()` 写下的自定义详情。
 *
 * 时序问题：`activate` 是在 setup **之后**才上报 active 的，所以 setup 里直接
 * 写状态会被通用文案覆盖。这里先把文案暂存，等 activate 上报时取用。
 */
const pendingDetail = new Map();
/**
 * 按开关与依赖决定是否装配一个内建插件。
 *
 * @param ctx   cordis 上下文
 * @param id    插件 id（必须出现在 HUB_PLUGINS 名册里）
 * @param setup 真正提供服务的回调；只有"该跑"时才会被调用
 * @returns     是否真的装配了（少数插件需要据此决定后续行为）
 */
export function activate(ctx, id, setup) {
    const descriptor = pluginById(id);
    const label = descriptor?.name ?? id;
    let decision;
    try {
        decision = resolveActivation(id);
    }
    catch (error) {
        // 状态文件损坏等意外：宁可让位也不要炸掉整个 loader。
        const message = error instanceof Error ? error.message : String(error);
        safeStatus(id, 'failed', `开关判定失败：${message}`);
        return false;
    }
    if (!decision.enabled) {
        safeStatus(id, 'disabled', `已关闭：${label}（设置页可开启）`);
        return false;
    }
    if (!decision.runnable) {
        safeStatus(id, 'blocked', decision.reason);
        return false;
    }
    try {
        setup(ctx);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        safeStatus(id, 'failed', `装配失败：${message}`);
        // 装配失败是真故障，抛出去让 harness 的插件清单看到 failed。
        throw error;
    }
    safeStatus(id, 'active', pendingDetail.get(id) ?? (decision.reason === '依赖齐备' ? `${label} 已就绪` : decision.reason));
    pendingDetail.delete(id);
    try {
        ctx.effect(() => () => safeStatus(id, 'idle', '已卸载'), `hub-plugin-${id}: status lifetime`);
    }
    catch {
        // 没有 effect API 时（老上下文）不影响装配。
    }
    return true;
}
/**
 * 附带信息的版本：允许插件在 setup 里补一句关键参数（如"价格表 2026-09-14"）。
 * 文案会被 `activate` 采纳为准（见 pendingDetail 的时序说明）。
 */
export function note(id, detail) {
    pendingDetail.set(id, detail);
    safeStatus(id, 'active', detail);
}
/** 写状态但永不抛异常 —— 状态上报失败不该影响插件本身。 */
function safeStatus(id, phase, detail) {
    try {
        writeStatus(id, phase, detail);
    }
    catch {
        /* 忽略：状态文件不可写时插件照常工作 */
    }
}
