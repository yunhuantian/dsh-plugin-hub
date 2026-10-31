import { type StoreDB } from './store-db.js';
import type { ProfileInfo } from './installer.js';
export interface DiagnosticReport {
    ok: boolean;
    /** 报告文件绝对路径（写盘成功时非空）。 */
    path: string | null;
    /** 报告正文（同一份内容，便于直接复制）。 */
    body: string;
    /** 一句话摘要。 */
    summary: string;
}
/** 生成报告时可以由调用方补充的现场信息。 */
export interface DiagnosticContext {
    /** loader 里各行的真实阶段（id → phase）。 */
    loaderPhases?: Map<string, string | null>;
    /** 当前会话（有就带上花费概况；没有就跳过该节）。 */
    session?: any;
}
/**
 * 生成诊断报告。
 *
 * @param profile 当前 profile（可为 null：早期启动阶段拿不到）
 * @param db      商店数据库（可为 null：报告仍然会生成，只是少了统计）
 * @param context loader 阶段、当前会话等现场信息
 */
export declare function buildDiagnosticReport(profile: ProfileInfo | null, db: StoreDB | null, context?: DiagnosticContext): DiagnosticReport;
