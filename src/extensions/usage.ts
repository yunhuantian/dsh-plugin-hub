/**
 * hub 内建插件 · 用量与费用（usage）—— insight 组。
 *
 * 本模块是 hub 包内的**独立 cordis 条目**（`dsh-plugin-hub/extensions/usage`），
 * 在 harness 的「设置 → 插件」清单页里单独一行，可被单独停用。
 *
 * 职责：
 *   1. 读开关与依赖（`activate`）：没开就干净让位，不提供服务也不注册 UI；
 *   2. 提供 `usagePricing` 服务 —— 版本化价格表的 host 侧只读入口，
 *      让其它插件/脚本也能拿到"某次请求当时的价格表"，不必各自硬编码单价；
 *   3. 上报状态（含当前价格表版本）供 hub UI 显示。
 *
 * UI（对话视图的「用量」tab）在同一个包的 client 半边，按同一份开关决定是否注册。
 */
import { historySnapshot, latestTable } from '../contracts/pricing.js';
import { activate, note } from './_runtime.js';

const ID = 'usage';

export const name = 'dsh-plugin-hub/extensions/usage';
export const provide = ['usagePricing'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('usagePricing', () => ({
      /** 当前生效的价格表版本号（如 2026-09-14）。 */
      currentVersion: () => latestTable().id,
      /** 全部价格表版本（旧 → 新）的快照。 */
      history: () => historySnapshot(),
      ready: true,
    }));
    const table = latestTable();
    note(ID, `价格表 ${table.id}（${table.label}），生效于 ${table.effectiveFrom}`);
  });
}

export default { name, provide, inject, apply };
