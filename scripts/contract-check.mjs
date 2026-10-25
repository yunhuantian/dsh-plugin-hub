/**
 * 契约往返自检（contract round-trip check）—— `npm run check:contract`
 *
 * ── 为什么需要它 ────────────────────────────────────────────────────────────
 * Hub 的 host 端返回的每个对象都要过一遍 `contracts/remote.ts` 里的 zod schema，
 * 而 **zod 的 object 默认会剥离未声明字段，而不是报错**。于是最典型的翻车是：
 *
 *   host 新增了 `groups` / `row.blockedBy`，契约忘了同步
 *     → UI 侧读到 undefined
 *     → `(extensions?.groups ?? []).map(...)` 渲染出**空列表**
 *     → 用户看到的是"插件不见了/列表空白"，日志里一句报错都没有，极难定位。
 *
 * 本脚本用**真实的 host 数据结构**去跑契约，逐字段断言 UI 真正会读的那些键还在。
 * 最后还有一项"反向鉴别力"检查：故意塞一个未声明字段，确认它确实被剥掉 ——
 * 如果哪天 zod 行为变了、剥离不再发生，这条会立刻提醒我们"检查本身失效了"。
 *
 * 每次改 `src/host/index.ts` 的返回结构或 `src/contracts/remote.ts` 之后都该跑一遍。
 */
import { pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const lib = join(dirname(fileURLToPath(import.meta.url)), '..', 'lib');
/** lib/ 下是 ESM 产物，Windows 绝对路径必须转成 file:// URL 才能被 loader 接受。 */
const load = (rel) => import(pathToFileURL(join(lib, rel)).href);

const { descriptors } = await load('hub/src/contracts/remote.js');
const { HUB_PLUGINS, HUB_PLUGIN_GROUPS, resolveActivation, readStatuses, dependentsOf } = await load('hub/src/host/plugins-state.js');
const { latestTable } = await load('hub/src/contracts/pricing.js');
const { hubOwnedOf, hubSubIdOf, isLocalSpec, systemGroupOf } = await load('hub/src/host/index.js');

/** 契约描述符的定位：字段是 `method`，结果 schema 在 `result.schema`。 */
const descriptorOf = (method) => {
  const found = descriptors.find((d) => d.method === method);
  if (!found) throw new Error(`契约里找不到 Remote：${method}`);
  return found;
};

const statuses = readStatuses();

// ── 1. extensions：与 host/index.ts 的 extensions() 同构地重建返回体 ──────────
const rows = HUB_PLUGINS.map((plugin) => {
  const status = statuses[plugin.id];
  const decision = resolveActivation(plugin.id);
  return {
    id: plugin.id,
    rowId: plugin.rowId,
    entry: plugin.entry,
    name: plugin.name,
    nameEn: plugin.nameEn,
    description: plugin.description,
    descriptionEn: plugin.descriptionEn,
    group: plugin.group,
    requires: [...plugin.requires],
    dependents: dependentsOf(plugin.id).map((d) => ({ id: d.id, name: d.name })),
    enabled: decision.enabled,
    runnable: decision.runnable,
    blockedBy: decision.missing.map((d) => ({ id: d.id, name: d.name })),
    phase: status?.phase ?? 'idle',
    detail: status?.detail ?? '',
    reportedAt: status?.at ?? 0,
    service: plugin.service,
    ui: plugin.ui,
    order: plugin.order,
    loaderPhase: null,
  };
});

const extensionsPayload = {
  currentPriceVersion: latestTable().id,
  pluginCount: HUB_PLUGINS.length,
  activeCount: rows.filter((r) => r.phase === 'active').length,
  groups: HUB_PLUGIN_GROUPS.map((g) => ({ ...g })),
  rows,
};

const parsedExtensions = descriptorOf('extensions').result.schema.parse(extensionsPayload);

// ── 2. list：确认插件摘要上的可选标记活下来 ─────────────────────────────────
const parsedList = descriptorOf('list').result.schema.parse({
  total: 1,
  plugins: [{
    packageName: 'seed/probe', repoFullName: 'seed/probe', name: 'Probe', shortDescription: 'probe',
    developer: 'seed', iconUrl: null, categories: ['tool'], version: '0.0.1', stars: 0, downloads: 0,
    rating: 0, ratingCount: 0, installed: false, enabled: null, updatedAt: null, source: 'npm',
    hasNpm: true, hasGit: true, trustLevel: null, seed: true, health: 50,
  }],
});

// ── 3. installed：归属分组 + uninstallable 不被静默剥掉 ────────────────────
const parsedInstalled = descriptorOf('installed').result.schema.parse([{
  packageName: 'dsh-plugin-hub/extensions/usage',
  entryId: 'hub-ext-usage',
  name: 'dsh-plugin-hub/extensions/usage',
  category: 'own',
  group: 'hub',
  groupLabel: '插件商店',
  enabled: true,
  phase: 'active',
  managed: true,
  protected: false,
  uninstallable: false,
  type: 'own',
  localPath: null,
  published: false,
  repoUrl: null,
  version: null,
  latestVersion: null,
  hasUpdate: false,
}]);
const installedRow = parsedInstalled[0] ?? {};

// ── 4. 真实 profile：hub 的条目确实落进 hub 组 ─────────────────────────────
const { resolveProfile } = await load('hub/src/host/installer.js');
let patchRows = [];
try {
  const { readFileSync, existsSync } = await import('node:fs');
  const { join } = await import('node:path');
  const profile = resolveProfile(undefined);
  // hub 的行由 **hub 包自带**的 cordis.patch.yml 插入（profile 那份只留独立发布的
  // 插件），所以要读 profile 里已安装的那一份，才是本机真正生效的清单。
  const bundled = join(profile.directory, 'node_modules', 'dsh-plugin-hub', 'cordis.patch.yml');
  const patchFile = existsSync(bundled) ? bundled : profile.patchFile;
  patchRows = [...readFileSync(patchFile, 'utf8')
    .matchAll(/^[ \t]*- id:[ \t]*(\S+)[ \t]*\r?\n[ \t]*name:[ \t]*(\S+)/gm)]
    .map((m) => ({ id: m[1], name: m[2] }));
} catch { /* profile 不可读：下面这组断言自动跳过 */ }
const hasProfile = patchRows.length > 0;
const hubRows = patchRows.filter((r) => hubOwnedOf(r.name));
const hubSubIds = hubRows.map((r) => hubSubIdOf(r.name)).filter((id) => id !== null);
const wiredIds = hubSubIds.filter((id) => Object.hasOwn(statuses, id));
const falsePositive = patchRows.filter((r) => !hubOwnedOf(r.name) && /dsh-plugin-hub/i.test(r.name));
// 根因锁定：不走 hub 分支时这些条目会被系统兜底桶吸走（少数被 'tool' 关键词误留）。
// 这正是"商店插件显示成『其他系统组件』"的成因，也是 hub 分支存在的理由；
// 若哪天系统分组逻辑变了，这条会失败，提醒回头核对判断顺序与注释。
const legacyOther = HUB_PLUGINS.filter((p) => systemGroupOf(p.rowId, p.entry) === 'other').length;

const checks = [
  ['installed.group.hub', installedRow.group === 'hub', `hub 归属组存活（group=${installedRow.group}）`],
  ['installed.uninstallable', installedRow.uninstallable === false, '包内子插件不给卸载入口'],
  ['patch.hubRows', !hasProfile || hubRows.length === HUB_PLUGINS.length + 1, hasProfile ? `hub 条目 ${hubRows.length} = 本体 + ${HUB_PLUGINS.length} 子插件` : 'profile 不可读，跳过'],
  ['patch.hubSubIds', !hasProfile || hubSubIds.length === HUB_PLUGINS.length, hasProfile ? `子插件短 id 解出 ${hubSubIds.length}/${HUB_PLUGINS.length}` : 'profile 不可读，跳过'],
  ['patch.statusWired', !hasProfile || wiredIds.length === HUB_PLUGINS.length, hasProfile ? `子插件与运行状态一一对应 ${wiredIds.length}/${HUB_PLUGINS.length}` : 'profile 不可读，跳过'],
  ['patch.noFalsePositive', falsePositive.length === 0, '没有非 hub 包被误判成 hub'],
  ['grouping.rootCause', legacyOther >= HUB_PLUGINS.length - 1, `旧路径把 ${legacyOther}/${HUB_PLUGINS.length} 个 hub 子插件塞进 other`],
  ['extensions.groups', parsedExtensions.groups?.length === HUB_PLUGIN_GROUPS.length, `groups=${parsedExtensions.groups?.length}/${HUB_PLUGIN_GROUPS.length}`],
  ['extensions.pluginCount', parsedExtensions.pluginCount === HUB_PLUGINS.length, `pluginCount=${parsedExtensions.pluginCount}`],
  ['extensions.activeCount', typeof parsedExtensions.activeCount === 'number', `activeCount=${parsedExtensions.activeCount}`],
  ['extensions.rows', parsedExtensions.rows?.length === HUB_PLUGINS.length, `rows=${parsedExtensions.rows?.length}`],
  ['row.group', parsedExtensions.rows.every((r) => typeof r.group === 'string' && r.group !== ''), '每行都有分组（设置页才能分节）'],
  ['row.requires', parsedExtensions.rows.every((r) => Array.isArray(r.requires)), '依赖数组保留'],
  ['row.dependents', parsedExtensions.rows.every((r) => Array.isArray(r.dependents)), '反向依赖保留（关掉时提示牵连谁）'],
  ['row.blockedBy', parsedExtensions.rows.every((r) => Array.isArray(r.blockedBy)), '阻塞原因保留'],
  ['row.runnable', parsedExtensions.rows.every((r) => typeof r.runnable === 'boolean'), '可运行标记保留'],
  ['row.order', parsedExtensions.rows.every((r) => typeof r.order === 'number'), '组内排序保留'],
  ['list.seed', parsedList.plugins[0].seed === true, '列表「预置」徽章能显示'],
];

let failed = 0;
console.log('契约往返自检（host 返回体 ⨯ zod 契约）\n');
for (const [label, ok, detail] of checks) {
  if (!ok) failed += 1;
  console.log(`  ${ok ? '✓' : '✗'} ${label.padEnd(22)} ${detail}`);
}

// ── 2.5 方法面一致性：每个 @Remote 方法都必须有契约描述符，反之亦然 ──────────
// 漏一条描述符的后果是客户端调用直接抛「unknown invocation」，而构建不会报错。
{
  const { readFileSync } = await import('node:fs');
  const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'hub', 'src', 'host', 'index.ts'), 'utf8');
  const hostMethods = new Set([...source.matchAll(/@Remote\('([^']+)'\)/g)].map((m) => m[1]));
  const declared = new Set(descriptors.map((d) => d.method));
  const missing = [...hostMethods].filter((m) => !declared.has(m));
  const orphan = [...declared].filter((m) => !hostMethods.has(m));
  const ok = missing.length === 0 && orphan.length === 0;
  if (!ok) failed += 1;
  console.log(`  ${ok ? '✓' : '✗'} ${'方法面一致性'.padEnd(22)} host ${hostMethods.size} 个 Remote / 契约 ${declared.size} 条${missing.length ? ` · 缺描述符: ${missing.join(', ')}` : ''}${orphan.length ? ` · 多余描述符: ${orphan.join(', ')}` : ''}`);
}

// ── 3. 鉴别力：未声明字段必须被剥掉，否则本检查形同虚设 ────────────────────
const probed = descriptorOf('extensions').result.schema.parse({
  ...extensionsPayload,
  rows: extensionsPayload.rows.map((r) => ({ ...r, __undeclaredProbe: 1 })),
});
const stripped = !Object.hasOwn(probed.rows[0], '__undeclaredProbe');
if (!stripped) failed += 1;
console.log(`  ${stripped ? '✓' : '✗'} ${'契约吞噬行为'.padEnd(20)} 未声明字段被剥离 → 本检查有鉴别力`);

console.log(failed === 0 ? '\n全部通过。' : `\n${failed} 项失败 —— 契约与 host 返回结构不同步，UI 会读到 undefined。`);
process.exitCode = failed === 0 ? 0 : 1;
