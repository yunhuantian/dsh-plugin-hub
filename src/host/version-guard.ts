/**
 * 版本一致性守卫 —— 发布前的"版本号对齐"检查（hub 内建插件 version-guard 的实现）。
 *
 * 发布翻车最常见的原因不是代码，而是**版本号不同步**：
 *   - `package.json` 升了 0.2.1，README 更新日志还停在 0.2.0；
 *   - README 里写了新的子插件入口，`exports` 却没加，装上去 import 直接失败；
 *   - profile 里还钉着旧的 `file:` 路径 / 旧版本 spec。
 * 这个模块把这三类都查一遍，给出可以照着改的清单。
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { localPluginManifest } from './publish.js';
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

/** 语义化版本比较：a > b 返回正数。无法解析时返回 0（不当作更高）。 */
function compareVersion(a: string, b: string): number {
  const pick = (v: string): number[] => v.replace(/^v/, '').split(/[.\-+]/).slice(0, 3).map((n) => Number.parseInt(n, 10) || 0);
  const [x, y] = [pick(a), pick(b)];
  for (let i = 0; i < 3; i += 1) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

/** 从 README 文本里提取所有版本号（用于找"更新日志里最高到哪一版"）。 */
export function documentedVersions(readme: string): string[] {
  const found = new Set<string>();
  // 只看标题行与列表项，避免把依赖版本、示例里的版本混进来。
  for (const line of readme.split(/\r?\n/)) {
    const t = line.trim();
    if (!/^(#{1,4}\s|[-*]\s|\[)/.test(t)) continue;
    const m = t.match(/(?:^|[^\d])(\d+\.\d+\.\d+(?:-[0-9A-Za-z.\-]+)?)/);
    if (m !== null) found.add(m[1]);
  }
  return [...found];
}

/**
 * 跑一遍版本一致性检查。
 *
 * @param profile     当前 profile（用来定位本地安装目录）
 * @param packageName 被检查的包名（如 dsh-plugin-hub）
 */
export function checkVersionConsistency(profile: ProfileInfo, packageName: string): VersionReport {
  const findings: VersionFinding[] = [];
  const manifest = localPluginManifest(profile, packageName);
  if (manifest === null) {
    return {
      packageName,
      version: null,
      documentedVersion: null,
      ok: false,
      findings: [
        {
          level: 'error',
          label: '本地安装',
          detail: `在 profile 中找不到 ${packageName} 的 package.json`,
          hint: '先安装到 profile（dsh plugin add 或 pnpm add）再做发布检查',
        },
      ],
    };
  }

  const version = typeof manifest.pkg.version === 'string' ? manifest.pkg.version : null;
  if (version === null) {
    findings.push({ level: 'error', label: '包版本', detail: 'package.json 缺少 version 字段', hint: '补上语义化版本号' });
  } else if (!/^\d+\.\d+\.\d+/.test(version)) {
    findings.push({ level: 'warn', label: '包版本', detail: `version 不是语义化版本：${version}`, hint: '改成 x.y.z 形式' });
  } else {
    findings.push({ level: 'ok', label: '包版本', detail: `package.json 版本 ${version}`, hint: '' });
  }

  // ── 与 README 更新日志对齐 ──────────────────────────────────────────────
  const readmePath = join(manifest.dir, 'README.md');
  let documented: string | null = null;
  if (!existsSync(readmePath)) {
    findings.push({ level: 'warn', label: 'README', detail: '仓库里没有 README.md', hint: '至少写清用途、安装、子插件清单' });
  } else {
    const versions = documentedVersions(readFileSync(readmePath, 'utf8'));
    documented = versions.length === 0 ? null : versions.sort(compareVersion)[versions.length - 1];
    if (documented === null) {
      findings.push({ level: 'warn', label: '更新日志', detail: 'README 里找不到任何版本号', hint: '加一节「更新日志」并按版本列条目' });
    } else if (version !== null && compareVersion(version, documented) > 0) {
      findings.push({
        level: 'error',
        label: '更新日志',
        detail: `包版本 ${version} 比 README 记录的最新版本 ${documented} 新`,
        hint: `在 README 更新日志顶部补 ${version} 一节`,
      });
    } else {
      findings.push({ level: 'ok', label: '更新日志', detail: `README 记录到 ${documented}`, hint: '' });
    }
  }

  // ── 子插件入口是否真的存在 ─────────────────────────────────────────────
  const dsh = manifest.pkg.dsh as Record<string, unknown> | undefined;
  const client = dsh?.client as Record<string, unknown> | undefined;
  if (dsh?.bundle === undefined) {
    findings.push({ level: 'warn', label: 'bundle 声明', detail: 'package.json 没有 dsh.bundle.patch', hint: '宿主插件需要声明 bundle patch' });
  }
  if (client?.platform === undefined) {
    findings.push({ level: 'warn', label: 'client 声明', detail: 'package.json 没有 dsh.client.platform', hint: '带 UI 的插件需要声明平台（web）' });
  }

  const patchRel = (dsh?.bundle as Record<string, unknown> | undefined)?.patch;
  if (typeof patchRel === 'string') {
    const patchPath = join(manifest.dir, patchRel.replace(/^\.\//, ''));
    if (!existsSync(patchPath)) {
      findings.push({ level: 'error', label: 'bundle 文件', detail: `声明了 ${patchRel}，但文件不存在`, hint: '检查构建产物是否漏了 cordis.patch.yml（package.json 的 files）' });
    } else {
      const patch = readFileSync(patchPath, 'utf8');
      const rows = [...patch.matchAll(/^\s*name:\s*(\S+)\s*$/gm)].map((m) => m[1].replace(/['"]/g, ''));
      const entryRows = rows.filter((r) => r.startsWith(`${packageName}/`));
      // 每个子路径行都必须在 exports 里能解析，否则装上去 import 会失败。
      const exportsMap = (manifest.pkg.exports ?? {}) as Record<string, unknown>;
      const missing = entryRows.filter((row) => {
        const sub = `.${row.slice(packageName.length)}`;
        return exportsMap[sub] === undefined;
      });
      if (entryRows.length === 0) {
        findings.push({ level: 'warn', label: '子插件行', detail: 'bundle patch 里没有包内子插件行', hint: '内建插件应各占一行（name: <包名>/extensions/<id>）' });
      } else if (missing.length > 0) {
        findings.push({
          level: 'error',
          label: '子插件入口',
          detail: `${missing.length} 个子插件行在 exports 里没有对应入口：${missing.slice(0, 3).join(', ')}${missing.length > 3 ? ' …' : ''}`,
          hint: '为每个 name 补一条 exports 子路径',
        });
      } else {
        findings.push({ level: 'ok', label: '子插件入口', detail: `${entryRows.length} 个子插件行，exports 全部齐备`, hint: '' });
      }
    }
  }

  // ── profile 安装来源 ───────────────────────────────────────────────────
  if (existsSync(profile.packageJsonFile)) {
    try {
      const profilePkg = JSON.parse(readFileSync(profile.packageJsonFile, 'utf8')) as { dependencies?: Record<string, string> };
      const spec = profilePkg.dependencies?.[packageName];
      if (spec === undefined) {
        findings.push({ level: 'warn', label: 'profile 依赖', detail: `profile 里没有 ${packageName}`, hint: '先在 profile 里安装它' });
      } else {
        findings.push({ level: 'ok', label: 'profile 依赖', detail: `${packageName} → ${spec}`, hint: '' });
      }
    } catch {
      findings.push({ level: 'warn', label: 'profile 依赖', detail: 'profile 的 package.json 无法解析', hint: '检查文件是否损坏' });
    }
  }

  const ok = !findings.some((f) => f.level !== 'ok');
  return { packageName, version, documentedVersion: documented, ok, findings };
}
