/**
 * 备份与回滚 —— 商店数据与配置的快照（内建插件 backup 的实现）。
 *
 * 快照内容：
 *   - `plugin-store.sqlite`  —— 用 `VACUUM INTO` 导出的**一致性副本**（不是裸拷文件，
 *     裸拷 WAL 模式下的库可能拿到半截事务）；
 *   - `plugins.json` / `plugins-status.json` —— 内建插件开关与状态；
 *   - profile 的 `package.json` + `cordis.patch.yml` —— 插件清单与激活行。
 *
 * 回滚策略：先把"当前状态"另存为 `pre-restore-<ts>/` 再覆盖，因此回滚本身也可回滚。
 * 数据库文件在 dsh 运行中被占用，所以恢复写盘后**需要重启 dsh 才生效** —— UI 会明说。
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { resolveDshHome, type StoreDB } from './store-db.js';
import type { ProfileInfo } from './installer.js';

/** 保留的快照数量上限（超出的按时间淘汰最旧的）。 */
const KEEP = 10;

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
export function backupRoot(home = resolveDshHome()): string {
  return join(home, 'storages', 'plugin-store', 'backups');
}

function timestamp(): string {
  const d = new Date();
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function dirSize(dir: string): number {
  let total = 0;
  try {
    for (const name of readdirSync(dir)) {
      const target = join(dir, name);
      const st = statSync(target);
      total += st.isDirectory() ? dirSize(target) : st.size;
    }
  } catch { /* 忽略读不到的项 */ }
  return total;
}

/** 列快照（新 → 旧）。 */
export function listBackups(home = resolveDshHome()): BackupEntry[] {
  const root = backupRoot(home);
  if (!existsSync(root)) return [];
  const entries: BackupEntry[] = [];
  for (const name of readdirSync(root)) {
    const dir = join(root, name);
    try {
      if (!statSync(dir).isDirectory()) continue;
      const manifestPath = join(dir, 'manifest.json');
      if (existsSync(manifestPath)) {
        const parsed = JSON.parse(readFileSync(manifestPath, 'utf8')) as BackupEntry;
        entries.push({ ...parsed, path: dir, bytes: dirSize(dir) });
        continue;
      }
      entries.push({ id: name, createdAt: name, label: '（无清单）', files: [], bytes: dirSize(dir), path: dir });
    } catch { /* 跳过坏目录 */ }
  }
  return entries.sort((a, b) => (a.id < b.id ? 1 : -1));
}

/**
 * 打一个快照。
 *
 * @param db       商店数据库（有则用 VACUUM INTO 导出一致性副本）
 * @param profile  当前 profile（备份 package.json / cordis.patch.yml）
 * @param label    备注（如「升级 0.2.1 前」）
 */
export async function createBackup(db: StoreDB | null, profile: ProfileInfo | null, label: string, home = resolveDshHome()): Promise<CreateBackupResult> {
  const id = timestamp();
  const dir = join(backupRoot(home), id);
  try {
    mkdirSync(dir, { recursive: true });
    const files: string[] = [];

    if (db !== null) {
      const target = join(dir, 'plugin-store.sqlite');
      // VACUUM INTO 会失败于已存在的目标，先确保不存在。
      if (existsSync(target)) rmSync(target, { force: true });
      try {
        db.db.exec(`VACUUM INTO '${target.replace(/'/g, "''")}'`);
        files.push('plugin-store.sqlite');
      } catch (error) {
        // 老 SQLite 不支持 VACUUM INTO 时退化成文件拷贝（尽力而为）。
        try {
          copyFileSync(db.path, target);
          files.push('plugin-store.sqlite');
        } catch { /* 两个都失败就不带数据库 */ }
        void error;
      }
    }

    const stateDir = join(home, 'storages', 'plugin-store');
    for (const name of ['plugins.json', 'plugins-status.json']) {
      const src = join(stateDir, name);
      if (!existsSync(src)) continue;
      copyFileSync(src, join(dir, name));
      files.push(name);
    }

    if (profile !== null) {
      const profileDir = join(dir, 'profile');
      mkdirSync(profileDir, { recursive: true });
      for (const name of ['package.json', 'cordis.patch.yml']) {
        const src = join(profile.directory, name);
        if (!existsSync(src)) continue;
        copyFileSync(src, join(profileDir, name));
        files.push(`profile/${name}`);
      }
    }

    const entry: BackupEntry = {
      id,
      createdAt: new Date().toISOString(),
      label: label.trim() === '' ? '手动快照' : label.trim(),
      files,
      bytes: dirSize(dir),
      path: dir,
    };
    writeFileSync(join(dir, 'manifest.json'), `${JSON.stringify(entry, null, 2)}\n`, 'utf8');
    prune(home);
    return { ok: true, entry, message: `已创建快照 ${id}（${(entry.bytes / 1024).toFixed(1)} KB，${files.length} 个文件）` };
  } catch (error) {
    return { ok: false, entry: null, message: `创建快照失败：${error instanceof Error ? error.message : String(error)}` };
  }
}

/** 只保留最近 KEEP 个快照。 */
function prune(home: string): void {
  const all = listBackups(home);
  for (const entry of all.slice(KEEP)) {
    try { rmSync(entry.path, { recursive: true, force: true }); } catch { /* 尽力 */ }
  }
}

/**
 * 回滚到一个快照。当前状态会先另存为 `pre-restore-<快照id>/` 再覆盖。
 * 返回后**需要重启 dsh**：数据库文件在运行中被占用，覆盖只在下次启动生效。
 */
export function restoreBackup(id: string, home = resolveDshHome()): { ok: boolean; message: string; restored: string[] } {
  const root = backupRoot(home);
  const dir = join(root, id);
  if (!existsSync(dir)) return { ok: false, message: `快照不存在：${id}`, restored: [] };

  const safeDir = join(root, `pre-restore-${id}`);
  const restored: string[] = [];
  try {
    mkdirSync(safeDir, { recursive: true });
    const stateDir = join(home, 'storages', 'plugin-store');

    for (const name of ['plugin-store.sqlite', 'plugins.json', 'plugins-status.json']) {
      const src = join(dir, name);
      if (!existsSync(src)) continue;
      const dst = join(stateDir, name);
      if (existsSync(dst)) copyFileSync(dst, join(safeDir, name));
      copyFileSync(src, dst);
      restored.push(name);
    }

    const profileSnap = join(dir, 'profile');
    if (existsSync(profileSnap)) {
      // profile 位置不在快照清单里（不同机器不同），从快照同级的 package.json
      // 备注中找不到目标时，就只恢复到 storages（安全优先）。
      const profileDst = join(safeDir, 'profile');
      mkdirSync(profileDst, { recursive: true });
      for (const name of readdirSync(profileSnap)) {
        copyFileSync(join(profileSnap, name), join(profileDst, basename(name)));
        restored.push(`profile/${basename(name)}（待手动覆盖到 profile 目录）`);
      }
    }

    return {
      ok: true,
      message: `已从快照 ${id} 恢复 ${restored.length} 项，当前状态已另存到 pre-restore-${id}/。**重启 dsh 后生效。**`,
      restored,
    };
  } catch (error) {
    return { ok: false, message: `恢复失败：${error instanceof Error ? error.message : String(error)}（当前状态已备份在 pre-restore-${id}/）`, restored };
  }
}
