/**
 * hub 内建插件 · 备份与回滚（backup）—— ops 组。
 *
 * 服务 `pluginBackup`：给商店数据与配置打快照（数据库用 VACUUM INTO 导出一致性
 * 副本，另含内建插件开关与 profile 清单），升级翻车时能一键回到上一个可用状态。
 *
 * 快照只留最近 10 个；回滚前会先把"当前状态"另存一份，所以回滚本身也可回滚。
 */
import { createBackup, listBackups, restoreBackup } from '../host/backup.js';
import { storeDB } from '../host/store-db.js';
import { resolveProfile } from '../host/installer.js';
import { activate } from './_runtime.js';

const ID = 'backup';

export const name = 'dsh-plugin-hub/extensions/backup';
export const provide = ['pluginBackup'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginBackup', () => ({
      /** 打一个快照（label 是给未来的自己看的备注）。 */
      create: (label: string) => createBackup(storeDB(), resolveProfile(undefined), label),
      /** 列出快照（新 → 旧）。 */
      list: () => listBackups(),
      /** 回滚（需重启 dsh 生效）。 */
      restore: (id: string) => restoreBackup(id),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
