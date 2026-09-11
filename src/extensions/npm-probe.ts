/**
 * hub 内建插件 · npm 可用性探测（npm-probe）—— foundation 组。
 *
 * 服务 `pluginNpmProbe`：判断某插件在 npm 上有没有发布过 —— 有就走 registry 装
 * （快、不需要代理），没有就回落 GitHub git clone（慢、常需代理）。
 * 结果缓存在数据库 meta 表，默认 24h 有效。
 */
import { npmAvailability, clearNpmCache } from '../host/npm-probe.js';
import type { StoreDB } from '../host/store-db.js';
import { activate } from './_runtime.js';

const ID = 'npm-probe';

export const name = 'dsh-plugin-hub/extensions/npm-probe';
export const provide = ['pluginNpmProbe'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginNpmProbe', () => ({
      /** packageName → 是否在 npm 上存在。 */
      availability: (db: StoreDB, force = false) => npmAvailability(db, force),
      /** 索引同步后清缓存，让新插件立刻能被正确判定。 */
      clear: (db: StoreDB) => clearNpmCache(db),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
