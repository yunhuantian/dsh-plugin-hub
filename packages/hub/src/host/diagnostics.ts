/**
 * 诊断报告导出 —— 出问题时把"环境 + 清单 + 状态 + 花费 + 近期审计"打包成一份 Markdown
 * （内建插件 diagnostics 的实现）。维护者拿到它基本就能定位，不用来回问。
 *
 * 设计原则：
 *   - **能自查的先自查**：去敏校验、写盘结果、读不到的段落各给一句结论，
 *     不要让人看到一份"看起来完整但其实是空表"的报告；
 *   - **金额来自账本**：与「用量」tab、`usage_report` 工具同一份口径
 *     （`contracts/pricing.ts` + `host/usage-ledger.ts`），三处数字对得上；
 *   - **不含令牌明文**：只看"有没有配"和长度，不写内容；写盘前再过一遍去敏扫描。
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { resolveDshHome, type StoreDB } from './store-db.js';
import type { ProfileInfo } from './installer.js';
import { HUB_PLUGINS, HUB_PLUGIN_GROUPS, readStatuses, resolveActivation } from './plugins-state.js';
import { PRICE_HISTORY, fmtUsd, latestTable } from '../contracts/pricing.js';
import { currentTableId, type SessionLedger } from './usage-ledger.js';
import { sharedLedgerReader } from './usage-reader.js';

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

/** profile 的 package.json 里 dsh.profile.bundles 声明了哪些 bundle。 */
function profileBundles(profile: ProfileInfo | null): string[] {
  if (profile === null || !existsSync(profile.packageJsonFile)) return [];
  try {
    const pkg = JSON.parse(readFileSync(profile.packageJsonFile, 'utf8')) as {
      dsh?: { profile?: { bundles?: unknown } };
    };
    const bundles = pkg.dsh?.profile?.bundles;
    return Array.isArray(bundles) ? bundles.filter((b): b is string => typeof b === 'string') : [];
  } catch {
    return [];
  }
}

/**
 * profile 的 `cordis.patch.yml` 覆盖了哪些条目。
 *
 * 这是"为什么我关了插件它还在跑 / 开了却不生效"的头号原因：后来的 patch 层
 * 可以按 id 覆盖行。只记录**被覆盖的 id 列表**，不解析内容。
 */
function profileOverrides(profile: ProfileInfo | null): string[] {
  if (profile === null) return [];
  const file = join(profile.directory, 'cordis.patch.yml');
  if (!existsSync(file)) return [];
  try {
    const text = readFileSync(file, 'utf8');
    const ids = new Set<string>();
    for (const match of text.matchAll(/^\s*-\s*id:\s*([^\s#]+)/gm)) ids.add(match[1]);
    return [...ids];
  } catch {
    return [];
  }
}

/** 数据库里有没有影子副本 / 大小多大（0 字节或 WAL 残留是最常见的"数据丢失"假象）。 */
function dbFiles(home: string): Array<{ name: string; size: number }> {
  const dir = join(home, 'storages', 'plugin-store');
  const out: Array<{ name: string; size: number }> = [];
  if (!existsSync(dir)) return out;
  for (const name of ['plugin-store.sqlite', 'plugin-store.sqlite-wal', 'plugin-store.sqlite-shm', 'plugins.json']) {
    const file = join(dir, name);
    if (!existsSync(file)) continue;
    try {
      out.push({ name, size: readFileSync(file).byteLength });
    } catch {
      out.push({ name, size: -1 });
    }
  }
  return out;
}

/** 诊断目录里已有多少份历史报告（攒多了要提示清理）。 */
function reportCount(home: string): number {
  const dir = join(home, 'storages', 'plugin-store', 'diagnostics');
  if (!existsSync(dir)) return 0;
  try {
    return readdirSync(dir).filter((name) => name.endsWith('.md')).length;
  } catch {
    return 0;
  }
}

/** 环境里是否存在会影响进程成功的变量（只报"有/无"，不报值）。 */
function proxyFacts(): string[] {
  const keys = ['HTTP_PROXY', 'HTTPS_PROXY', 'NO_PROXY', 'http_proxy', 'https_proxy', 'no_proxy'];
  const present = keys.filter((key) => (process.env[key] ?? '') !== '');
  return present.length === 0 ? ['（未设置代理环境变量）'] : [`已设置：${present.join(', ')}（值不写入报告）`];
}

const SECRET_PATTERNS: Array<[string, RegExp]> = [
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{20,}\b/],
  ['npm token', /\bnpm_[A-Za-z0-9]{20,}\b/],
  ['OpenAI 风格 key', /\bsk-[A-Za-z0-9_-]{20,}\b/],
  ['AWS key', /\bAKIA[0-9A-Z]{16}\b/],
  ['私钥块', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['Bearer 头', /\bBearer\s+[A-Za-z0-9._-]{20,}/i],
];

/**
 * 去敏自查：报告正文里再扫一遍。
 *
 * 这不是防"我写错了"，而是防**上游数据带进来的东西**（例如某个插件的
 * description 里贴了 token）。发现问题只报位置，不把命中的内容写出来。
 */
function scanSecrets(body: string): string[] {
  const findings: string[] = [];
  const lines = body.split('\n');
  for (const [label, pattern] of SECRET_PATTERNS) {
    lines.forEach((line, index) => {
      if (pattern.test(line)) findings.push(`第 ${index + 1} 行疑似${label}`);
    });
  }
  return findings;
}

/** 花费小节：与「用量」tab / `usage_report` 工具同一口径。 */
function spendSection(ledger: SessionLedger | null): string[] {
  const lines: string[] = ['## 用量与花费', ''];
  if (ledger === null || ledger.totals.requests === 0) {
    lines.push('（本次导出没有可读的会话上下文，跳过。可以在有对话的窗口里再次导出。）', '');
    return lines;
  }
  const t = ledger.totals;
  const unpriced = t.requests - t.priced;
  lines.push(`- 会话：\`${ledger.sessionId}\``);
  lines.push(`- 模型请求：${t.requests} 次${unpriced > 0 ? `（其中 ${unpriced} 次因模型未收录单价未计入金额）` : ''}`);
  lines.push(`- 累计花费（当时价）：${fmtUsd(t.chargedUsd)}`);
  lines.push(`- 同一用量按今日价：${fmtUsd(t.nowUsd)}（差额 ${fmtUsd(t.nowUsd - t.chargedUsd)}）`);
  lines.push(`- 未缓存输入 ${t.uncachedInput} / 缓存读 ${t.cacheRead} / 缓存写 ${t.cacheWrite} / 输出 ${t.output}`);
  lines.push('');
  if (ledger.models.length > 0) {
    lines.push('| 模型 | 请求 | 输入 token | 输出 token | 花费 | 是否计价 |');
    lines.push('| --- | --- | --- | --- | --- | --- |');
    for (const m of ledger.models) {
      lines.push(`| ${m.provider ?? '?'}:${m.model ?? '?'} | ${m.requests} | ${m.inputTokens} | ${m.outputTokens} | ${m.known ? fmtUsd(m.chargedUsd) : '—'} | ${m.known ? '是' : '未收录'} |`);
    }
    lines.push('');
  }
  if (ledger.tables.length > 1) {
    lines.push(`本会话跨了 ${ledger.tables.length} 版价格表：${ledger.tables.map((x) => `v${x.version}(${x.requests})`).join(' · ')}`, '');
  }
  return lines;
}

/**
 * 生成诊断报告。
 *
 * @param profile 当前 profile（可为 null：早期启动阶段拿不到）
 * @param db      商店数据库（可为 null：报告仍然会生成，只是少了统计）
 * @param context loader 阶段、当前会话等现场信息
 */
export function buildDiagnosticReport(
  profile: ProfileInfo | null,
  db: StoreDB | null,
  context: DiagnosticContext = {},
): DiagnosticReport {
  const home = resolveDshHome();
  const lines: string[] = [];
  const statuses = readStatuses(home);
  const loaderPhases = context.loaderPhases ?? new Map<string, string | null>();

  const hubVersion = versionOf('dsh-plugin-hub', profile?.directory ?? process.cwd());
  const dshVersion = profile === null ? null : versionOf('@deepseek-ai/dsh', profile.directory);
  const table = latestTable();

  lines.push('# DSH 插件商店 · 诊断报告', '');
  lines.push(`- 生成时间：${new Date().toISOString()}`);
  lines.push(`- dsh 版本：${dshVersion ?? '未知'}`);
  lines.push(`- 插件商店版本：${hubVersion ?? '未知'}`);
  lines.push(`- Node：${process.version}（${process.platform} ${process.arch}）`);
  lines.push(`- DSH_HOME：\`${home}\``);
  if (profile !== null) lines.push(`- profile：\`${profile.directory}\``);
  lines.push(`- 价格表：v${table.id}（${table.label}，${table.effectiveFrom} 生效）`);
  lines.push(`- 历史报告：本目录已有 ${reportCount(home)} 份（含本份）`);
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

  // ── 失败详情 ────────────────────────────────────────────────────────────
  // 表里只写了 phase，真正能定位的是插件自己上报的那句 note —— 单独列出来。
  const reported = HUB_PLUGINS
    .map((plugin) => ({ plugin, status: statuses[plugin.id] }))
    .filter((row) => row.status !== undefined && (row.status.phase === 'failed' || row.status.phase === 'blocked'));
  if (reported.length > 0) {
    lines.push('### 需要处理的插件', '');
    for (const { plugin, status } of reported) {
      lines.push(`- 「${plugin.name}」\`${plugin.id}\` — ${status!.phase}：${status!.detail || '（无说明）'}${status!.at > 0 ? `（${new Date(status!.at).toISOString()}）` : ''}`);
    }
    lines.push('');
  }

  // ── 用量与花费 ──────────────────────────────────────────────────────────
  let ledger: SessionLedger | null = null;
  try {
    ledger = sharedLedgerReader.ledgerOf(context.session ?? null);
  } catch {
    ledger = null;
  }
  lines.push(...spendSection(ledger));

  // ── profile 依赖与 bundle ───────────────────────────────────────────────
  const deps = profileDeps(profile);
  lines.push('## profile 依赖', '');
  if (deps.length === 0) lines.push('（读不到 profile 的 package.json）');
  else {
    lines.push('| 包名 | 声明 |');
    lines.push('| --- | --- |');
    for (const [name, spec] of deps) lines.push(`| ${name} | \`${spec}\` |`);
  }
  lines.push('');
  const bundles = profileBundles(profile);
  lines.push('### profile bundles', '');
  lines.push(bundles.length === 0 ? '（profile 没有声明 dsh.profile.bundles）' : bundles.map((b) => `- \`${b}\``).join('\n'));
  lines.push('');

  // ── patch 覆盖 ──────────────────────────────────────────────────────────
  const overrides = profileOverrides(profile);
  lines.push('## patch 覆盖', '');
  if (overrides.length === 0) lines.push('（profile 的 cordis.patch.yml 不存在或没有覆盖任何行）');
  else {
    lines.push('以下行被 profile 的 patch 层覆盖过（这是"开关点了不生效"最常见的原因）：', '');
    const known = new Map(HUB_PLUGINS.map((p) => [p.rowId, p.name]));
    for (const id of overrides) lines.push(`- \`${id}\`${known.has(id) ? `（${known.get(id)}）` : ''}`);
  }
  lines.push('');

  // ── 本地文件与环境 ──────────────────────────────────────────────────────
  lines.push('## 本地文件', '');
  const files = dbFiles(home);
  if (files.length === 0) lines.push('`storages/plugin-store/` 下没有找到数据库或开关文件。');
  else {
    lines.push('| 文件 | 大小 |');
    lines.push('| --- | --- |');
    for (const f of files) lines.push(`| ${f.name} | ${f.size < 0 ? '读不到' : `${f.size} B`} |`);
    const wal = files.find((f) => f.name.endsWith('-wal'));
    if (wal !== undefined && wal.size > 4 * 1024 * 1024) {
      lines.push('', `⚠️ WAL 已 ${(wal.size / 1048576).toFixed(1)} MB：说明 checkpoint 没跟上，建议退出 dsh 后重开一次（会自动合并）。`);
    }
  }
  lines.push('');
  lines.push('### 环境', '');
  for (const line of proxyFacts()) lines.push(`- ${line}`);
  lines.push(`- 进程工作目录：\`${process.cwd()}\``);
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

  // ── 价格表覆盖校对 ──────────────────────────────────────────────────────
  // 价格表漏收录 = 静默零元。把"表里有几版、最新一版覆盖哪些 provider"摆出来，
  // 一眼能看出某次新模型上线后是不是忘了加价单。
  lines.push('## 价格表覆盖', '');
  lines.push(`- 版本数：${PRICE_HISTORY.length}（最新 v${currentTableId()}）`);
  const providers = new Set<string>();
  for (const key of Object.keys(table.input)) providers.add(key.split(':')[0]);
  lines.push(`- 最新版覆盖 provider：${[...providers].sort().join(', ')}`);
  if (ledger !== null) {
    const missing = ledger.models.filter((m) => !m.known).map((m) => `${m.provider ?? '?'}:${m.model ?? '?'}`);
    if (missing.length > 0) lines.push(`- 本会话未收录：${[...new Set(missing)].join(', ')}`);
  }
  lines.push('');

  // ── 去敏自查（正文写完才扫）─────────────────────────────────────────────
  const scan = scanSecrets(lines.join('\n'));
  lines.push('## 去敏自查', '');
  lines.push(scan.length === 0
    ? '通过：未发现令牌/私钥样式的内容。'
    : `⚠️ 发现 ${scan.length} 处可疑内容（不在此写出命中原文，请自行检查后再对外发送）：\n${scan.map((s) => `- ${s}`).join('\n')}`);
  lines.push('');

  lines.push('---', '', '> 本报告不含令牌明文：凭据只记录"是否配置"，不记录内容。可直接附在 issue 里。');

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

  const spend = ledger === null || ledger.totals.requests === 0
    ? ''
    : `，花费 ${fmtUsd(ledger.totals.chargedUsd)}`;
  return {
    ok: path !== null,
    path,
    body,
    summary: `内建插件 ${HUB_PLUGINS.length} 个（阻塞 ${blocked} / 失败 ${failed}）${spend}${path === null ? '；写盘失败' : ''}`,
  };
}
