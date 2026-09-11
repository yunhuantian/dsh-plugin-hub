/**
 * hub 内建插件 · 版本更新检测（update-check）—— insight 组。
 *
 * 服务 `pluginUpdateCheck`：对比本机已安装插件的版本与上游最新版本
 * （先 npm registry，再回落 GitHub releases），给出「可升级」清单。
 * 依赖 `store-db`（仓库映射与缓存都放在库里，避免重复打 registry）。
 */
import { checkUpdates, installedPackages, isNewer, type UpdateInfo } from '../host/update-check.js';
import type { StoreDB } from '../host/store-db.js';
import type { ProfileInfo } from '../host/installer.js';
import { activate, note } from './_runtime.js';

const ID = 'update-check';

export const name = 'dsh-plugin-hub/extensions/update-check';
export const provide = ['pluginUpdateCheck'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginUpdateCheck', () => ({
      /** 跑一遍检测（有 6h 缓存，force=true 强制刷新）。 */
      check: (db: StoreDB, profile: ProfileInfo, token: string | null, force = false) => checkUpdates(db, profile, token, force),
      /** 只列本机已安装的包与版本，不打网络。 */
      installed: (profile: ProfileInfo) => installedPackages(profile),
      /** 版本比较口径（预发布版本视为更旧）。 */
      newer: (latest: string, local: string) => isNewer(latest, local),
      ready: true,
    }));
    note(ID, '检测口径：npm registry 优先，回落 GitHub releases（缓存 6 小时）');
  });
}

export default { name, provide, inject, apply };
