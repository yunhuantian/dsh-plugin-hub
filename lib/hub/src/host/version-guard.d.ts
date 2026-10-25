import type { ProfileInfo } from './installer.js';
export type VersionFindingLevel = 'ok' | 'warn' | 'error';
export interface VersionFinding {
    level: VersionFindingLevel;
    /** 检查项名称（中文，直接进 UI）。 */
    label: string;
    /** 具体结论，含实际读到的值。 */
    detail: string;
    /** 建议动作（可执行的一句话）。 */
    hint: string;
}
export interface VersionReport {
    packageName: string;
    /** package.json 里的版本。 */
    version: string | null;
    /** README 更新日志里出现的最高版本。 */
    documentedVersion: string | null;
    /** 是否全部通过（无 error、无 warn）。 */
    ok: boolean;
    findings: VersionFinding[];
}
/** 从 README 文本里提取所有版本号（用于找"更新日志里最高到哪一版"）。 */
export declare function documentedVersions(readme: string): string[];
/**
 * 跑一遍版本一致性检查。
 *
 * @param profile     当前 profile（用来定位本地安装目录）
 * @param packageName 被检查的包名（如 dsh-plugin-hub）
 */
export declare function checkVersionConsistency(profile: ProfileInfo, packageName: string): VersionReport;
