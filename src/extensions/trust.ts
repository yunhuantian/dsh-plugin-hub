/**
 * hub 内建插件 · 信任徽章同步（trust）—— safety 组。
 *
 * 服务 `pluginTrust`：与 dsh-hub-index 的信任体系对齐，按仓库活跃度、发布记录、
 * 社区反馈同步官方 / 社区信任等级，落到本地库的 `trust_level` 字段，供卡片展示。
 */
import { syncTrustLevels } from '../host/trust-sync.js';
import type { GitHubClient } from '../host/github.js';
import type { StoreDB } from '../host/store-db.js';
import { activate } from './_runtime.js';

const ID = 'trust';

export const name = 'dsh-plugin-hub/extensions/trust';
export const provide = ['pluginTrust'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginTrust', () => ({
      sync: (github: GitHubClient, db: StoreDB) => syncTrustLevels(github, db),
      /** 单个插件的等级读取走数据库，避免重复请求。 */
      levelOf: (db: StoreDB, packageName: string): string | null => db.getPlugin(packageName)?.trustLevel ?? null,
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
