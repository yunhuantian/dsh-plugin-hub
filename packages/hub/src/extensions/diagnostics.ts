/**
 * hub 内建插件 · 诊断报告导出（diagnostics）—— ops 组。
 *
 * 服务 `pluginDiagnostics`：把环境信息、内建插件清单与加载状态、profile 依赖、
 * 本地索引统计、最近审计记录打包成一份 Markdown，出问题时直接附到 issue 里。
 *
 * 默认**关闭**：平时不需要，排查时才开（或由 UI 临时调用 —— 但按本系统约定，
 * 关掉的插件不提供服务，所以要用就先在设置页打开）。
 *
 * 报告**不含任何令牌明文**：只写"某个包在本机的版本"这类信息。
 */
import { buildDiagnosticReport, type DiagnosticReport } from '../host/diagnostics.js';
import { storeDB } from '../host/store-db.js';
import { resolveProfile } from '../host/installer.js';
import { activate } from './_runtime.js';

const ID = 'diagnostics';

export const name = 'dsh-plugin-hub/extensions/diagnostics';
export const provide = ['pluginDiagnostics'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginDiagnostics', () => ({
      /**
       * 生成报告并写盘到 `storages/plugin-store/diagnostics/`。
       * @param loaderPhases 可选：loader 里各行的真实阶段（id → phase），由 hub 核心传入
       */
      build: (loaderPhases?: Map<string, string | null>): DiagnosticReport =>
        buildDiagnosticReport(resolveProfile(undefined), storeDB(), loaderPhases ?? new Map()),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
