/**
 * hub 内建插件 · 版本一致性守卫（version-guard）—— publish 组。
 *
 * 服务 `pluginVersionGuard`：发布前对齐四处版本口径 ——
 *   package.json / README 更新日志 / profile 安装来源 / 包内子插件入口（exports）。
 * 典型翻车：包升到 0.2.1、README 还写 0.2.0；或 bundle patch 里新加了一行子插件
 * 但 exports 忘了加，装上去 import 直接失败。这个插件专门防这两类。
 */
import { checkVersionConsistency, documentedVersions, type VersionReport } from '../host/version-guard.js';
import type { ProfileInfo } from '../host/installer.js';
import { activate } from './_runtime.js';

const ID = 'version-guard';

export const name = 'dsh-plugin-hub/extensions/version-guard';
export const provide = ['pluginVersionGuard'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginVersionGuard', () => ({
      check: (profile: ProfileInfo, packageName: string): VersionReport => checkVersionConsistency(profile, packageName),
      /** 从 README 里抽出所有版本号（UI 的"编辑记录"提示用）。 */
      documented: (readme: string) => documentedVersions(readme),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
