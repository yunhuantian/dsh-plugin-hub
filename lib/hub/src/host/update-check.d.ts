import { StoreDB } from './store-db.js';
import type { ProfileInfo } from './installer.js';
export interface InstalledPackage {
    packageName: string;
    version: string | null;
    /** profile 里的依赖声明（`^1.0.0` / `file:...` / `github:...`）。 */
    spec: string | null;
}
export interface UpdateInfo extends InstalledPackage {
    latest: string | null;
    /** 上游最新版本高于本地 → true。 */
    outdated: boolean;
    /** npm = 来自 registry；github = 只有 git 上游；none = 查不到。 */
    source: 'npm' | 'github' | 'none';
    error: string | null;
}
/** 读 profile 里声明的依赖及其本地真实版本。 */
export declare function installedPackages(profile: ProfileInfo): InstalledPackage[];
/** 语义化版本比较（忽略 prerelease 后缀差异，只比 x.y.z）。 */
export declare function isNewer(latest: string, local: string): boolean;
/**
 * 跑一遍更新检测。
 *
 * @param db      商店数据库（读仓库映射 + 写缓存）
 * @param profile 当前 profile（读已安装清单）
 * @param token   GitHub token（查 GitHub 上游时用，可为 null）
 * @param force   忽略缓存
 */
export declare function checkUpdates(db: StoreDB, profile: ProfileInfo, token: string | null, force?: boolean): Promise<{
    rows: UpdateInfo[];
    checkedAt: number;
    outdated: number;
}>;
