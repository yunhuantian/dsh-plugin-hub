/**
 * hub 内建插件 · 插件健康度（health）—— insight 组。
 *
 * hub 包内的独立 cordis 条目（`dsh-plugin-hub/extensions/health`）。
 * 计算逻辑复用 hub 核心的 `computeHealth`（纯函数），但把它作为**独立插件**
 * 暴露成服务 `pluginHealth`，这样：
 *   - 关掉它 = 商店不再有健康度评分与排行（核心功能不受影响）；
 *   - 别的插件/脚本可以直接 `ctx.pluginHealth.score(metrics)`，不必装着商店 UI。
 *
 * 注意：本模块与 hub 核心是**两个独立的 cordis 条目**，所以这里不假设
 * `ctx.pluginStoreDb` 一定可用（用户可能只装了扩展）；对外只暴露纯计算。
 */
import { computeHealth, LEVEL_LABEL, type HealthInput, type HealthResult } from '../../hub-score/src/index.js';
import { activate } from '../../hub/src/extensions/_runtime.js';

const ID = 'health';

export const name = 'dsh-plugin-hub/extensions/health';
export const provide = ['pluginHealth'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginHealth', () => ({
      /** 给一组插件指标算健康度（0-100）与等级。 */
      score: (metrics: HealthInput): HealthResult => computeHealth(metrics),
      /** 等级 → 中文标签。 */
      labels: () => LEVEL_LABEL,
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
