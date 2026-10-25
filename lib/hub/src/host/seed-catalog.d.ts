/**
 * 预置实用插件目录（seed catalog）—— 随包发布的一份**离线插件清单**。
 *
 * ── 为什么需要它 ────────────────────────────────────────────────────────────
 * 商店的内容正常情况下来自 GitHub 镜像同步（492 个仓库、几百次请求、几分钟）。
 * 新装 hub 的用户在"同步完成之前"看到的是一片空白 —— 体验上像是商店坏了。
 * 这份目录把一批**公认实用、覆盖各个场景**的插件直接写进包里，安装后立刻
 * 出现在商店里（无需联网、无需等待），同步完成后真实元数据会覆盖它。
 *
 * ── 写入规则（重要）─────────────────────────────────────────────────────────
 * 预置行是"真的插件行"（走的是和镜像同步同一张表、同一个 upsert），因此
 * 详情、安装、健康度、依赖图、更新检测对它全都照常工作。但：
 *   - **只插不覆盖**：若某个包已经由真实同步写入过，预置不会动它；
 *   - 预置行自己带版本号（`seed:<catalog 版本>`），目录升级时会刷新自己的行；
 *   - 名字集合存在 `meta.seed_catalog_names`，供 UI 打「预置」标记。
 *
 * 目录版本用日期，改内容时同步改它，旧安装会在下次启动自动刷新。
 */
import type { StoreDB } from './store-db.js';
/** 目录版本（改内容必须改它）。 */
export declare const SEED_CATALOG_VERSION = "2026-09-11.1";
/** 一条预置条目：全部字段都来自真实仓库（packageName / repoFullName 必须准确）。 */
export interface SeedPlugin {
    packageName: string;
    repoFullName: string;
    name: string;
    shortDescription: string;
    categories: string[];
    version: string;
    stars: number;
    license: string;
    /** 为什么值得预置（一句话，给中文 UI 用）。 */
    reason: string;
}
/**
 * 预置清单：16 个，覆盖「视觉 / 界面 / 记忆 / 通知 / 成本 / 开发」六类常见需求。
 * 都是生态里星标高、维护活跃的插件，不是随便凑数。
 */
export declare const SEED_PLUGINS: readonly SeedPlugin[];
/** 预置包名集合（UI 打标记用）。 */
export declare function seedPackageNames(db: StoreDB): Set<string>;
export interface SeedResult {
    /** 目录版本。 */
    version: string;
    /** 本次新插入的行数。 */
    inserted: number;
    /** 本次刷新（原本就是预置行）的行数。 */
    refreshed: number;
    /** 已由真实同步覆盖、因此跳过的行数。 */
    skipped: number;
    /** 是否因为目录版本未变而整体跳过。 */
    upToDate: boolean;
}
/**
 * 把预置目录写进数据库（幂等）。
 *
 * 只插不覆盖：已经有真实同步数据的包一律跳过；预置行自己（syncedAt 以
 * `seed:` 开头）在目录升级时刷新。
 */
export declare function seedCatalog(db: StoreDB, force?: boolean): SeedResult;
