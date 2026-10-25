/**
 * hub 内建插件 · 商店数据库（store-db）—— foundation 组。
 *
 * 把 SQLite 索引能力做成一个独立服务 `pluginStoreDb`：插件/技能/依赖边/评分/
 * 审计/同步游标都从这一个入口走。关掉它 = 商店没有数据层，依赖它的插件会
 * 自动 blocked（见 hub 设置页的依赖提示）。
 */
import { storeDB, resolveDshHome } from '../host/store-db.js';
import { activate } from './_runtime.js';

const ID = 'store-db';

export const name = 'dsh-plugin-hub/extensions/store-db';
export const provide = ['pluginStoreDb'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginStoreDb', () => ({
      /** 打开（或复用）商店数据库。 */
      open: () => storeDB(),
      /** 数据库文件路径，供 UI / 诊断展示。 */
      path: () => `${resolveDshHome()}/storages/plugin-store/plugin-store.sqlite`,
      /** 镜像插件条数（健康检查用）。 */
      count: () => storeDB().countPlugins(),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
