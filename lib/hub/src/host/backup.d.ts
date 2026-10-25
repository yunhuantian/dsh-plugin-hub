import { type StoreDB } from './store-db.js';
import type { ProfileInfo } from './installer.js';
export interface BackupEntry {
    /** 快照 id（目录名，含时间戳）。 */
    id: string;
    createdAt: string;
    label: string;
    /** 快照里保存的文件名清单（相对快照目录）。 */
    files: string[];
    /** 总字节数。 */
    bytes: number;
    /** 快照目录绝对路径。 */
    path: string;
}
export interface CreateBackupResult {
    ok: boolean;
    entry: BackupEntry | null;
    message: string;
}
/** 快照根目录。 */
export declare function backupRoot(home?: string): string;
/** 列快照（新 → 旧）。 */
export declare function listBackups(home?: string): BackupEntry[];
/**
 * 打一个快照。
 *
 * @param db       商店数据库（有则用 VACUUM INTO 导出一致性副本）
 * @param profile  当前 profile（备份 package.json / cordis.patch.yml）
 * @param label    备注（如「升级 0.2.1 前」）
 */
export declare function createBackup(db: StoreDB | null, profile: ProfileInfo | null, label: string, home?: string): Promise<CreateBackupResult>;
/**
 * 回滚到一个快照。当前状态会先另存为 `pre-restore-<快照id>/` 再覆盖。
 * 返回后**需要重启 dsh**：数据库文件在运行中被占用，覆盖只在下次启动生效。
 */
export declare function restoreBackup(id: string, home?: string): {
    ok: boolean;
    message: string;
    restored: string[];
};
