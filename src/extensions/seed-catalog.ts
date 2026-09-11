/**
 * hub 内建插件 · 预置插件目录（seed-catalog）—— foundation 组。
 *
 * 随包发布一份**离线插件清单**（16 个实用插件），启动时写进本地库。
 * 效果：刚装好 hub、还没做镜像同步时，商店里就已经有内容可看、可装、
 * 可看详情 —— 不会出现"空白商店"的观感；同步完成后真实元数据自然接管。
 *
 * 写入是**幂等且只插不覆盖**的（见 host/seed-catalog.ts），因此重复启动无害，
 * 也不会用预置数据覆盖真实同步结果。依赖 `store-db`（没有本地库就无处可写）。
 */
import { storeDB, type StoreDB } from '../host/store-db.js';
import { SEED_PLUGINS, SEED_CATALOG_VERSION, seedCatalog, seedPackageNames, type SeedResult } from '../host/seed-catalog.js';
import { activate, note } from './_runtime.js';

const ID = 'seed-catalog';

export const name = 'dsh-plugin-hub/extensions/seed-catalog';
export const provide = ['pluginSeedCatalog'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  const ran = activate(ctx, ID, () => {
    // 启动即落库：这是本插件存在的意义（离线可用），不只是提供个服务。
    let result: SeedResult | null = null;
    let failure: string | null = null;
    try {
      result = seedCatalog(storeDB());
    } catch (error) {
      failure = error instanceof Error ? error.message : String(error);
    }

    ctx.provide('pluginSeedCatalog', () => ({
      /** 目录版本（日期）。 */
      version: () => SEED_CATALOG_VERSION,
      /** 完整清单（含"为什么预置"的说明）。 */
      entries: () => SEED_PLUGINS,
      /** 该包是否来自预置目录（UI 打标记用）。 */
      names: (db: StoreDB = storeDB()) => seedPackageNames(db),
      /** 手动重新灌一次（目录升级后不想重启时用）。 */
      refresh: (db: StoreDB = storeDB()) => seedCatalog(db, true),
      ready: true,
    }));

    if (failure !== null) {
      note(ID, `预置目录写入失败：${failure}`);
    } else if (result !== null) {
      note(
        ID,
        result.upToDate
          ? `预置目录 ${result.version} 已是当前版本（${SEED_PLUGINS.length} 个插件）`
          : `预置目录 ${result.version}：新增 ${result.inserted}、刷新 ${result.refreshed}、真实数据跳过 ${result.skipped}`,
      );
    }
  });
  void ran;
}

export default { name, provide, inject, apply };
