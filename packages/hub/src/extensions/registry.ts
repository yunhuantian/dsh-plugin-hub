/**
 * hub 内建插件 · 索引同步（registry）—— foundation 组。
 *
 * 服务 `pluginRegistry`：两条索引来源
 *   1. GitHub 镜像 —— topic:dsh-plugin / #dsh-plugin 的仓库元数据；
 *   2. 第三方目录 —— Blue-Whale-Harness 这类社区索引（补上镜像搜不到的条目）。
 * 同步进本地库后，商店搜索不再受网络与 GitHub 限频影响。
 */
import { syncBlueWhaleCatalog } from '../host/catalog-sync.js';
import { runMirrorSync, type SyncOptions, type GitHubClient } from '../host/github.js';
import type { StoreDB } from '../host/store-db.js';
import { activate } from './_runtime.js';

const ID = 'registry';

export const name = 'dsh-plugin-hub/extensions/registry';
export const provide = ['pluginRegistry'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginRegistry', () => ({
      /** GitHub 镜像同步（含版本历史、README、依赖边）。 */
      syncMirror: (github: GitHubClient, db: StoreDB, options: SyncOptions = {}) => runMirrorSync(github, db, options),
      /** 第三方目录同步（Blue-Whale 等）。 */
      syncCatalog: (db: StoreDB) => syncBlueWhaleCatalog(db),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
