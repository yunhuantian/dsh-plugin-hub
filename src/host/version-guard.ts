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
import { dirname, join } from 'node:path';
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

/** 运行中的 harness 版本 —— 与 `dsh.cmd` 实际执行的那个包体同源：
 *  `<dshHome>/profiles/node_modules/@deepseek-ai/dsh`。 */
function runningDshVersion(profile: ProfileInfo): string | null {
  const candidates = [
    join(dirname(profile.directory), 'node_modules', '@deepseek-ai', 'dsh', 'package.json'),
    join(profile.directory, 'node_modules', '@deepseek-ai', 'dsh', 'package.json'),
  ];
  for (const file of candidates) {
    try {
      const pkg = JSON.parse(readFileSync(file, 'utf8')) as { version?: unknown };
      if (typeof pkg.version === 'string') return pkg.version;
    } catch { /* 试下一个候选路径 */ }
  }
  return null;
}

/** `0.2.0-rc.2` → `{ major: 0, minor: 2 }`；解析不出来时 null。 */
function majorMinor(version: string): { major: number; minor: number } | null {
  const m = version.replace(/^v/, '').match(/^(\d+)\.(\d+)\./);
  return m === null ? null : { major: Number(m[1]), minor: Number(m[2]) };
}

/**
 * 该 semver 范围是否**可能**覆盖 `0.<minor>.x`。
 *
 * dsh 全体系都是 `0.x`，所以这里只需要判断次版本。这是个**保守的启发式**：
 * 只在能明确认定「够不着」时返回 false；看不懂的写法一律放行（返回 true），
 * 因为这条检查是给发布者看的提示，宁可漏报也不要误报成必须改。
 *
 * 唯一的硬规则来自 semver 本身：`^0.M.x` / `~0.M.x` 在 0.x 上只覆盖 M 自己
 * （`^0.1.0-rc.6` ≡ `>=0.1.0-rc.6 <0.2.0`），这正是 issue #6 的成因。
 */
function rangeCoversMinor(range: string, minor: number): boolean {
  const r = range.trim();
  if (r === '' || r === '*' || r === 'latest') return true;
  if (/(^|[^a-z])x([^a-z]|$)/i.test(r)) return true; // 0.x / 0.M.x 之类的通配
  for (const raw of r.split('||')) {
    const c = raw.trim();
    if (c === '') return true;
    const minors = [...c.matchAll(/0\.(\d+)\./g)].map((m) => Number(m[1]));
    if (minors.length === 0) return true; // 无法解析 → 放行
    const lo = Math.min(...minors);
    const hi = Math.max(...minors);
    if (/<[=\s]*\d/.test(c)) {
      // 形如 >=0.1.0 <0.3.0 → 覆盖 [lo, hi)
      if (minor >= lo && minor < hi) return true;
    } else if (c.includes('^') || c.includes('~')) {
      if (minors.includes(minor)) return true;
    } else if (c.includes('>')) {
      if (minor >= lo) return true;
    } else if (minors.includes(minor)) {
      return true;
    }
  }
  return false;
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

  // ── dsh peer 范围是否覆盖正在运行的 harness ──────────────────────────
  //
  // issue #6：hub 曾长期把 8 个 dsh-* peer 钉在 `^0.1.0-rc.6`。这个范围在
  // semver 上**结构性排除**所有 0.2.x，于是 dsh 0.2.0-rc.2 上装不上，而且
  // 全部已发布版本共用同一组范围 → 没有可降级的目标。当时的根因不是打包
  // 漏了文件，而是「版本号跟着 dsh 走、peer 范围没跟着走」，没有任何一步会
  // 拦住它。这条检查就是补上那一步。
  const peers = (manifest.pkg.peerDependencies ?? {}) as Record<string, string>;
  const dshPeers = Object.entries(peers).filter(([name]) => name.startsWith('@deepseek-ai/dsh'));
  const running = runningDshVersion(profile);
  const parsed = running === null ? null : majorMinor(running);
  if (dshPeers.length === 0) {
    findings.push({
      level: 'warn',
      label: 'dsh peer',
      detail: 'package.json 没有声明任何 @deepseek-ai/dsh-* peer',
      hint: '至少声明实际用到的运行时包及其兼容范围（否则装到新 dsh 上无人校验）',
    });
  } else if (running === null || parsed === null) {
    findings.push({
      level: 'warn',
      label: 'dsh peer',
      detail: `声明了 ${dshPeers.length} 个 dsh-* peer，但读不到运行中的 harness 版本`,
      hint: '确认 profile 布局是 <dshHome>/profiles/<name>，然后重跑',
    });
  } else {
    const stale = dshPeers.filter(([, range]) => !rangeCoversMinor(range, parsed.minor));
    if (stale.length > 0) {
      findings.push({
        level: 'warn',
        label: 'dsh peer',
        detail: `运行的 harness 是 ${running}，但 ${stale.length}/${dshPeers.length} 个 peer 范围覆盖不到：${stale.slice(0, 3).map(([n, v]) => `${n} ${v}`).join('，')}${stale.length > 3 ? ' …' : ''}`,
        hint: `拓宽到覆盖 ${parsed.major}.${parsed.minor}.x（例如在范围里加一段 || ^${parsed.major}.${parsed.minor}.0-rc.1），否则该版本在 dsh ${running} 上会被兼容性检查拒绝安装`,
      });
    } else {
      findings.push({ level: 'ok', label: 'dsh peer', detail: `${dshPeers.length} 个 peer 范围都覆盖 ${running}`, hint: '' });
    }
  }

  const ok = !findings.some((f) => f.level !== 'ok');
  return { packageName, version, documentedVersion: documented, ok, findings };
}
