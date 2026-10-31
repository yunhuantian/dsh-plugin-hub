/**
 * hub 内建插件 · 诊断报告导出（diagnostics）—— ops 组。
 *
 * 服务 `pluginDiagnostics`：把环境信息、内建插件清单与加载状态、用量与花费、
 * profile 依赖与 patch 覆盖、本地文件状态、最近审计打平成一份 Markdown，
 * 出问题时直接附到 issue 里。
 *
 * 默认**关闭**：平时不需要，排查时才开（或由 UI 临时调用 —— 但按本系统约定，
 * 关掉的插件不提供服务，所以要用就先在设置页打开）。
 *
 * 报告**不含任何令牌明文**：只写"有没有配"这类信息，并在写盘前自查一遍。
 */
import { buildDiagnosticReport, type DiagnosticReport } from '../host/diagnostics.js';
import { storeDB } from '../host/store-db.js';
import { resolveProfile } from '../host/installer.js';
import { activate } from './_runtime.js';

const ID = 'diagnostics';

export const name = 'dsh-plugin-hub/extensions/diagnostics';
export const provide = ['pluginDiagnostics'];
/**
 * 不硬依赖任何服务：诊断读的都是 host 侧文件/数据库，会话只是**可选的**补充
 * （有就带上花费，没有就少一节）。硬 inject 一个服务会让"该服务不可用"变成
 * "诊断不可用" —— 而恰恰是那种时候最需要诊断。
 */
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginDiagnostics', () => ({
      /**
       * 生成报告并写盘到 `storages/plugin-store/diagnostics/`。
       * @param loaderPhases 可选：loader 里各行的真实阶段（id → phase）
       * @param session      可选：当前会话；带上才会有「用量与花费」小节
       */
      build: (loaderPhases?: Map<string, string | null>, session?: any): DiagnosticReport =>
        buildDiagnosticReport(resolveProfile(undefined), storeDB(), { loaderPhases, session }),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
