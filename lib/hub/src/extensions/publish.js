/**
 * hub 内建插件 · 一键发布（publish）—— publish 组。
 *
 * 服务 `pluginPublish`：GitHub 建仓/推送 + npm 发布双通道，带分段进度回调。
 * 依赖 `security`（发布前必须过安全扫描）—— 所以在 hub 设置页把 security 关掉时，
 * 本插件会显示"依赖阻塞"并自动让位，而不是带着风险硬发。
 */
import { publishPlugin, localPluginManifest } from '../host/publish.js';
import { activate } from './_runtime.js';
const ID = 'publish';
export const name = 'dsh-plugin-hub/extensions/publish';
export const provide = ['pluginPublish'];
export const inject = [];
export function apply(ctx) {
    activate(ctx, ID, () => {
        ctx.provide('pluginPublish', () => ({
            publish: (profile, req, onProgress) => publishPlugin(profile, req, onProgress),
            /** 本地插件的目录与 manifest（发布页表单初值）。 */
            manifest: (profile, packageName) => localPluginManifest(profile, packageName),
            ready: true,
        }));
    });
}
export default { name, provide, inject, apply };
