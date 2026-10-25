/**
 * 诊断报告导出 —— 出问题时把"环境 + 清单 + 状态 + 近期审计"打包成一份 Markdown
 * （内建插件 diagnostics 的实现）。维护者拿到它基本就能定位，不用来回问。
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { resolveDshHome, type StoreDB } from './store-db.js';
import type { ProfileInfo } from './installer.js';
import { HUB_PLUGINS, HUB_PLUGIN_GROUPS, readStatuses, resolveActivation } from './plugins-state.js';

export interface DiagnosticReport {
  ok: boolean;
  /** 报告文件绝对路径（写盘成功时非空）。 */
  path: string | null;
  /** 报告正文（同一份内容，便于直接复制）。 */
  body: string;
  /** 一句话摘要。 */
  summary: string;
}

/** 读一个包在本机的版本（包名不一定是 profile 的依赖，如 hub 自己）。 */
function versionOf(packageName: string, fromDir: string): string | null {
  try {
    const require = createRequire(join(fromDir, 'noop.js'));
    const pkgPath = require.resolve(`${packageName}/package.json`);
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version?: unknown };
    return typeof pkg.version === 'string' ? pkg.version : null;
  } catch {
    return null;
  }
}

/** 读 profile 声明的依赖。 */
function profileDeps(profile: ProfileInfo | null): Array<[string, string]> {
  if (profile === null || !existsSync(profile.packageJsonFile)) return [];
  try {
    const pkg = JSON.parse(readFileSync(profile.packageJsonFile, 'utf8')) as { dependencies?: Record<string, string> };
    return Object.entries(pkg.dependencies ?? {});
  } catch {
    return [];
  }
}

/**
 * 生成诊断报告。
 *
 * @param profile  当前 profile（可为 null：早期启动阶段拿不到）
 * @param db       商店数据库（可为 null：报告仍然会生成，只是少了统计）
 * @param loaderPhases  loader 里各行的真实阶段（id → phase），由调用方（hub 核心）提供
 */
export function buildDiagnosticReport(
  profile: ProfileInfo | null,
  db: StoreDB | null,
  loaderPhases: Map<string, string | null>,
): DiagnosticReport {
  const home = resolveDshHome();
  const lines: string[] = [];
  const statuses = readStatuses(home);

  const hubVersion = versionOf('dsh-plugin-hub', profile?.directory ?? process.cwd());
  const dshVersion = profile === null ? null : versionOf('@deepseek-ai/dsh', profile.directory);

  lines.push('# DSH 插件商店 · 诊断报告', '');
  lines.push(`- 生成时间：${new Date().toISOString()}`);
  lines.push(`- dsh 版本：${dshVersion ?? '未知'}`);
  lines.push(`- 插件商店版本：${hubVersion ?? '未知'}`);
  lines.push(`- Node：${process.version}（${process.platform} ${process.arch}）`);
  lines.push(`- DSH_HOME：\`${home}\``);
  if (profile !== null) lines.push(`- profile：\`${profile.directory}\``);
  lines.push('');

  // ── 内建插件状态 ────────────────────────────────────────────────────────
  lines.push('## 内建插件状态', '');
  lines.push('| 分组 | 插件 | id | 开关 | 上报状态 | loader | 依赖 |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- |');
  const groupName = new Map(HUB_PLUGIN_GROUPS.map((g) => [g.id, g.name]));
  let blocked = 0;
  let failed = 0;
  for (const plugin of HUB_PLUGINS) {
    const decision = resolveActivation(plugin.id, home);
    const status = statuses[plugin.id];
    const phase = status?.phase ?? 'idle';
    if (phase === 'blocked') blocked += 1;
    if (phase === 'failed') failed += 1;
    lines.push(
      `| ${groupName.get(plugin.group) ?? plugin.group} | ${plugin.name} | \`${plugin.id}\` | ${decision.enabled ? '开' : '关'} | ${phase} | ${loaderPhases.get(plugin.rowId) ?? '-'} | ${plugin.requires.length === 0 ? '无' : plugin.requires.join(', ')} |`,
    );
  }
  lines.push('');
  lines.push(`内建插件合计 ${HUB_PLUGINS.length} 个：运行中 ${HUB_PLUGINS.filter((p) => (statuses[p.id]?.phase ?? 'idle') === 'active').length}，关闭 ${HUB_PLUGINS.filter((p) => !resolveActivation(p.id, home).enabled).length}，依赖阻塞 ${blocked}，失败 ${failed}。`);
  lines.push('');

  // ── profile 依赖 ───────────────────────────────────────────────────────
  const deps = profileDeps(profile);
  lines.push('## profile 依赖', '');
  if (deps.length === 0) lines.push('（读不到 profile 的 package.json）');
  else {
    lines.push('| 包名 | 声明 |');
    lines.push('| --- | --- |');
    for (const [name, spec] of deps) lines.push(`| ${name} | \`${spec}\` |`);
  }
  lines.push('');

  // ── 数据库统计 ──────────────────────────────────────────────────────────
  if (db !== null) {
    try {
      lines.push('## 本地索引', '');
      lines.push(`- 镜像插件：${db.countPlugins()} 个`);
      lines.push(`- 上次同步：${db.lastSyncedAt() ?? '从未'}`);
      const audit = db.queryAudit({ limit: 20 });
      lines.push(`- 审计记录：共 ${audit.total} 条（下面列最近 ${audit.rows.length} 条）`);
      lines.push('');
      lines.push('| 时间 | 操作者 | 动作 | 目标 | 结果 | 说明 |');
      lines.push('| --- | --- | --- | --- | --- | --- |');
      for (const row of audit.rows) {
        lines.push(`| ${row.createdAt} | ${row.actor} | ${row.action} | ${row.target} | ${row.result} | ${row.message.replace(/\|/g, '\\|')} |`);
      }
      lines.push('');
    } catch (error) {
      lines.push(`（数据库统计读取失败：${error instanceof Error ? error.message : String(error)}）`, '');
    }
  }

  lines.push('---', '', '> 本报告只含环境与状态信息，不含任何令牌明文。可直接附在 issue 里。');

  const body = lines.join('\n');
  let path: string | null = null;
  try {
    const dir = join(home, 'storages', 'plugin-store', 'diagnostics');
    mkdirSync(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    path = join(dir, `diagnostics-${stamp}.md`);
    writeFileSync(path, `${body}\n`, 'utf8');
  } catch {
    path = null;
  }

  return {
    ok: path !== null,
    path,
    body,
    summary: `内建插件 ${HUB_PLUGINS.length} 个（阻塞 ${blocked} / 失败 ${failed}）`,
  };
}
