/**
 * hub 内建插件 · 安装引擎（installer）—— foundation 组。
 *
 * 服务 `pluginInstaller`：pnpm 安装/卸载、bundle 行写入、启用禁用切换、
 * 进度流式上报、残留清理。所有会改动 profile 的操作都集中在这一处，
 * 关掉它商店就变成"只看不装"。
 */
import {
  resolveProfile,
  installPlugin,
  uninstallPlugin,
  bundleEntryIds,
  writeEnablement,
  scanRequiredEnv,
  rmrf,
  type ProfileInfo,
  type PnpmProgressFn,
} from '../host/installer.js';
import { activate } from './_runtime.js';

const ID = 'installer';

export const name = 'dsh-plugin-hub/extensions/installer';
export const provide = ['pluginInstaller'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginInstaller', () => ({
      profile: (baseUrl: string | undefined, fallback = 'web') => resolveProfile(baseUrl, fallback),
      install: (profile: ProfileInfo, spec: string, entryId: string, actor: string, onProgress?: PnpmProgressFn) =>
        installPlugin(profile, spec, entryId, actor, onProgress),
      uninstall: (profile: ProfileInfo, packageName: string, entryId: string, actor: string) =>
        uninstallPlugin(profile, packageName, entryId, actor),
      /** 该包在 bundle patch 里占的行 id。 */
      entryIds: (packageName: string, profileDir: string) => bundleEntryIds(packageName, profileDir),
      enablement: (profile: ProfileInfo, entryId: string, moduleName: string, enabled: boolean) =>
        writeEnablement(profile, entryId, moduleName, enabled),
      /** 安装后需要用户自己填的环境变量。 */
      requiredEnv: (packageName: string, profileDir: string) => scanRequiredEnv(packageName, profileDir),
      rmrf,
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
