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
/**
 * 生成诊断报告。
 *
 * @param profile  当前 profile（可为 null：早期启动阶段拿不到）
 * @param db       商店数据库（可为 null：报告仍然会生成，只是少了统计）
 * @param loaderPhases  loader 里各行的真实阶段（id → phase），由调用方（hub 核心）提供
 */
export declare function buildDiagnosticReport(profile: ProfileInfo | null, db: StoreDB | null, loaderPhases: Map<string, string | null>): DiagnosticReport;
