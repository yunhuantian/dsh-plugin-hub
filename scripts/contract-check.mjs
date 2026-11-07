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

// ── 2.5b 客户端实参不得是「可能为 undefined 的裸变量」 ────────────────────
// 宿主的 `assertExactArguments` 按 descriptor 逐字段比对，**只有**
// `acceptsUndefined === true` 或 `codec.mode === 'src-json'` 的参数才允许缺席。
// 实测本项目 50 个 Remote 的全部参数都是 `mode: strict` / `acceptsUndefined`
// 为空 —— 也就是说 zod 的 `.optional()` / `.nullish()` **完全不传递到 wire 层**，
// 声明为可选的参数在网关眼里依旧是必填。
//
// 后果（issue #12 / #15，从 0.2.4 一直带到 0.2.8）：
//   客户端 `api.install(pkg, actor)` 少传一个 → wrapper 直传 undefined →
//   `JSON.stringify` 把键整个丢掉 → 网关报
//     gateway/arguments-invalid: ... missing "source"
//   「列表页一键安装」必现失败，而浏览/搜索/详情全都正常，所以极难发现。
//
// 这条检查同时覆盖两种漏法：
//   ① 实参**个数**不足（少写一个参数）
//   ② 实参个数够，但值可能是 undefined（`source` 而不是 `source ?? 'auto'`）
{
  const { readFileSync } = await import('node:fs');
  const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'hub', 'src', 'client', 'api.ts'), 'utf8');

  /** 从 `r.<method>(` 的左括号开始做深度配对，返回括号内的实参文本；没有该调用返回 null。 */
  const callArgs = (method) => {
    const marker = `r.${method}(`;
    const at = source.indexOf(marker);
    if (at < 0) return null;
    let depth = 0;
    let quote = null;
    for (let i = at + marker.length - 1; i < source.length; i += 1) {
      const ch = source[i];
      if (quote !== null) {
        if (ch === '\\') { i += 1; continue; }
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === '\'' || ch === '"' || ch === '`') { quote = ch; continue; }
      if (ch === '(' || ch === '[' || ch === '{') depth += 1;
      else if (ch === ')' || ch === ']' || ch === '}') {
        depth -= 1;
        if (depth === 0) return source.slice(at + marker.length, i);
      }
    }
    return null;
  };

  /** 按**顶层**逗号切分实参（忽略嵌套括号与字符串里的逗号）。 */
  const splitArgs = (text) => {
    const out = [];
    let depth = 0;
    let quote = null;
    let start = 0;
    for (let i = 0; i < text.length; i += 1) {
      const ch = text[i];
      if (quote !== null) {
        if (ch === '\\') { i += 1; continue; }
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === '\'' || ch === '"' || ch === '`') { quote = ch; continue; }
      if (ch === '(' || ch === '[' || ch === '{') depth += 1;
      else if (ch === ')' || ch === ']' || ch === '}') depth -= 1;
      else if (ch === ',' && depth === 0) { out.push(text.slice(start, i).trim()); start = i + 1; }
    }
    const tail = text.slice(start).trim();
    if (tail !== '') out.push(tail);
    return out;
  };

  /**
   * 该表达式是否**保证**不是 undefined。
   * 字面量 / 函数调用 / 有 `??` `||` 兜底的都算安全；裸变量不算。
   */
  const definitelyDefined = (expr) => {
    if (expr === '') return false;
    if (/\?\?|\|\|/.test(expr)) return true;                    // x ?? 'auto' / x || null
    if (/^['"`]/.test(expr)) return true;                        // 'auto' / `x`
    if (/^-?\d/.test(expr)) return true;                         // 120
    if (/^(true|false|null)$/.test(expr)) return true;           // null 是合法值，键会存在
    if (/^\{[\s\S]*\}$/.test(expr) || /^\[[\s\S]*\]$/.test(expr)) return true; // 字面量对象/数组
    if (/\)\s*$/.test(expr)) return true;                        // 函数调用 getActor()
    if (/^new\s/.test(expr)) return true;
    if (/^!/ .test(expr)) return true;
    return false;                                                // 裸标识符 / 成员访问 → 可疑
  };

  /**
   * 接口签名里标了 `?` 的参数位置 —— 只有这些可能为 undefined。
   * 必填参数即使直传裸变量也是安全的（TS 类型保证非空），不能误报。
   * 注意只看**该参数自己**的 `name?:`，不看类型体内部的 `field?:`。
   */
  const optionalOf = new Map();
  for (const m of source.matchAll(/^\s{2}(\w+)\(([^)]*)\)\s*:/gm)) {
    const parts = splitArgs(m[2]);
    const indexes = [];
    parts.forEach((part, index) => { if (/^\s*\w+\s*\?\s*:/.test(part)) indexes.push(index); });
    if (indexes.length > 0) optionalOf.set(m[1], { indexes, parts });
  }

  const problems = [];
  let covered = 0;
  for (const [name, info] of optionalOf) {
    // 找到实现体：`  name: async (...) => ...`，取同一行里 `r.<method>(` 的实参。
    const implRe = new RegExp(`^\\s{4}${name}:\\s*async\\s*\\([^)]*\\)\\s*=>`, 'm');
    const impl = implRe.exec(source);
    if (!impl) continue;
    const lineEnd = source.indexOf('\n', impl.index);
    const line = source.slice(impl.index, lineEnd < 0 ? source.length : lineEnd);
    const call = /r\.(\w+)\(/.exec(line);
    if (!call) continue;
    const args = callArgs(call[1]);
    if (args === null) continue;
    covered += 1;
    const actual = splitArgs(args);
    const declaredName = (index) => (info.parts[index]?.match(/^\s*(\w+)/) ?? [, `#${index}`])[1];
    for (const index of info.indexes) {
      if (index >= actual.length) {
        problems.push(`${name}.${declaredName(index)}: 实参缺失（声明了 ${info.parts.length} 个，只传了 ${actual.length} 个）`);
        continue;
      }
      const expr = actual[index];
      if (definitelyDefined(expr)) continue;
      problems.push(`${name}.${declaredName(index)}: 实参 "${expr}" 可能为 undefined → wire 上会缺这个键（改成 "${expr} ?? 默认值"）`);
    }
  }

  const ok = problems.length === 0;
  if (!ok) failed += 1;
  console.log(`  ${ok ? '✓' : '✗'} ${'实参数覆盖'.padEnd(22)} ${covered} 个含可选参数的 wrapper 都做了兜底${ok ? '' : ` · ${problems.length} 处可疑:`}`);
  for (const p of problems) console.log(`      ${p}`);
}

/**
 * 发往模型 API 的 function schema 必须过的那条线（服务端规则，不是本地子集）。
 *
 * DeepSeek 的报错原文：
 *   Invalid schema for function 'usage_report': schema must be a JSON Schema of
 *   'type: "object"', got 'type: null'.
 *
 * 规则：根节点必须是 `type: 'object'`；**任何**节点都不能 `type: null` 或缺
 * `type`（annotations-only 节点在这里也不安全）。返回问题列表，空 = 通过。
 */
const SCALAR_TYPES = new Set(['string', 'number', 'integer', 'boolean', 'null']);
function wireSchemaProblems(schema, path) {
  const problems = [];
  const walk = (node, at) => {
    if (node === null || typeof node !== 'object' || Array.isArray(node)) {
      problems.push(`${at} 不是 schema 对象`);
      return;
    }
    const type = node.type;
    if (type === undefined) problems.push(`${at}.type 缺失`);
    else if (type === null) problems.push(`${at}.type 为 null`);
    else if (typeof type !== 'string') problems.push(`${at}.type 不是字符串`);
    else if (type === 'object') {
      for (const [key, child] of Object.entries(node.properties ?? {})) walk(child, `${at}.properties.${key}`);
    } else if (type === 'array') {
      if (node.items !== undefined) walk(node.items, `${at}.items`);
    } else if (!SCALAR_TYPES.has(type)) {
      problems.push(`${at}.type 未知：${type}`);
    }
    for (const [index, branch] of (node.oneOf ?? []).entries()) walk(branch, `${at}.oneOf[${index}]`);
  };
  if (schema === undefined || schema === null) {
    problems.push(`${path} 整个缺失`);
    return problems;
  }
  if (schema.type !== 'object') problems.push(`${path} 根节点必须是 type: "object"，实际 ${JSON.stringify(schema.type)}`);
  walk(schema, path);
  return problems;
}

// ── 2.6 工具 schema 能否被 dsh-tools 编译（真实 SDK，不是正则）────────────
// 0.2.8 首版把 `required: true` 写到了 object / array 节点上，dsh-tools 的
// schema DSL 直接抛 UNSUPPORTED_SCHEMA → 整个 `usage` 扩展装配失败 →
// 用量页**黑屏且无任何提示**。当时的 smoke 只跑了 host 的 Remote，没有跑到
// defineTool 这一层，所以完全没有拦住。
//
// 现在把每个内建工具都真装配一遍：真实 `defineTool`（真编译）＋ 假 ctx。
//
// ⚠️ 必须用**宿主（harness）实际的** dsh-tools，而不是仓库 node_modules 里那份：
// 两者版本差得很远（仓库 0.1.0-rc.6 / 桌面端 0.2.1-rc.5），schema 规则不同。
// 0.2.8 首版正是用旧版验的 —— 旧版把 object 上的 `required: true` 原样转成
// 父层 required 数组所以不报，新版直接抛 → 只有真机才炸。
// 宿主路径按优先级探测，取值写进输出，避免"用了哪个 SDK"含糊。
{
  const { readdirSync, statSync, readFileSync, existsSync, writeFileSync, mkdirSync, symlinkSync } = await import('node:fs');
  const { pathToFileURL } = await import('node:url');
  const { tmpdir } = await import('node:os');

  /**
   * 校验只在**宿主真正会跑的那份** dsh-tools 上做，否则等于没做。
   *
   * dsh-tools 的 schema 规则在两个版本之间变过：
   *   - 仓库里的 0.1.0-rc.6：object 上的 `required: true` 会被原样转成父层的
   *     required 数组，**不报错**；
   *   - 宿主里的 0.2.1-rc.5：同样写法先编译成 `required: true`，再被裸 schema
   *     校验判为 "must be an array of strings"，**直接抛**。
   * 0.2.8 首版就是拿旧版验的，于是本地全绿、真机黑屏。
   *
   * 桌面端把包压在 app.asar 里，Node 的 ESM loader 不认 asar 协议，所以这里
   * 把 `@deepseek-ai/*` 依赖图平铺解到临时目录，再按普通路径 import。
   */
  const SDK_PACKAGES = ['dsh-tools', 'dsh-llm', 'dsh-scope', 'dsh-session', 'schemastery', 'cordis', 'cosmokit', 'dsh-util-values'];

  const candidates = [
    process.env.DSH_TOOLS_MODULE ?? '',
    'C:/Users/yunhuantian/deeepseekharness/resources/app.asar',
  ].filter((p) => p !== '' && existsSync(p));

  /**
   * 从 asar 里逐个取 `@deepseek-ai/*` 包，解成宿主 SDK 的 monorepo 镜像。
   *
   * dsh-tools 的入口依赖 cordis / schemastery / dsh-scope / dsh-llm / dsh-session
   * （每行都只是其中一小部分），所以单取一个文件 import 不成。这里把它们一起
   * 解到 `node_modules/@deepseek-ai/` 下，让 Node 的普通 ESM 解析正常工作 ——
   * 这样跑的就是**宿主真正会跑的那份代码**，而不是仓库里落后两个版本的副本。
   *
   * @param asarPath app.asar 绝对路径
   * @param outDir   镜像根目录
   * @returns 是否成功
   */
  const mirrorAsarPackages = (asarPath, outDir) => {
    try {
      const buf = readFileSync(asarPath);
      const headerLength = buf.readUInt32LE(12);
      const fileBase = 16 + headerLength;
      const header = JSON.parse(buf.subarray(16, 16 + headerLength).toString('utf8'));
      const scope = header?.files?.dsh?.files?.node_modules?.files?.['@deepseek-ai'];
      if (scope === undefined) return false;
      const writeTree = (node, dir) => {
        for (const [name, child] of Object.entries(node.files ?? {})) {
          const target = join(dir, name);
          if (child.files !== undefined) {
            writeTree(child, target);
          } else if (child.link === undefined) {
            mkdirSync(dirname(target), { recursive: true });
            const start = fileBase + Number(child.offset ?? 0);
            writeFileSync(target, buf.subarray(start, start + child.size));
          }
        }
      };
      for (const pkg of SDK_PACKAGES) {
        const node = scope.files?.[pkg];
        if (node !== undefined) writeTree(node, join(outDir, '@deepseek-ai', pkg));
      }

      // 依赖是传递的（cordis → cosmokit → …），按需把作用域里**其余**包也解出来：
      // 缺一个就会 ERR_MODULE_NOT_FOUND，而错误信息只会指向那一层，不指向根因。
      // 只解 `@deepseek-ai/*`（同名作用域），其它 npm 包用仓库副本即可。
      for (const [pkg, node] of Object.entries(scope.files ?? {})) {
        const out = join(outDir, '@deepseek-ai', pkg);
        if (node.files === undefined || existsSync(join(out, 'package.json'))) continue;
        writeTree(node, out);
      }

      // ⚠️ 解析层：包内 import '@deepseek-ai/x' 只会往**上层**找 node_modules。
      // 镜像根目录若没有 node_modules/，依赖一律解析失败（报的却是"找不到 cordis"，
      // 看起来像没解出来，实际是解出来了但不在查找路径上）。
      const resolveRoot = join(outDir, 'node_modules', '@deepseek-ai');
      for (const pkg of Object.keys(scope.files ?? {})) {
        const link = join(resolveRoot, pkg);
        if (existsSync(link)) continue;
        mkdirSync(resolveRoot, { recursive: true });
        try {
          // junction 在 Windows 上不需要管理员权限；失败就当链接不存在，
          // 后面 import 会给出明确错误。
          symlinkSync(join(outDir, '@deepseek-ai', pkg), link, 'junction');
        } catch { /* 忽略 */ }
      }

      return existsSync(join(outDir, '@deepseek-ai', 'dsh-tools', 'lib', 'index.js'));
    } catch {
      return false;
    }
  };

  const extDir = join(lib, 'hub', 'src', 'extensions');

  // 先决定用哪份 SDK：宿主 asar 镜像优先，取不到才退回仓库副本（并在输出里标注）。
  const mirrorDir = join(tmpdir(), 'dsh-hub-sdk-mirror');
  let tools = null;
  let toolsVersion = '';
  const asar = candidates.find((p) => p.endsWith('.asar'));
  if (asar !== undefined && mirrorAsarPackages(asar, mirrorDir)) {
    tools = await import(pathToFileURL(join(mirrorDir, '@deepseek-ai', 'dsh-tools', 'lib', 'index.js')).href);
    toolsVersion = '宿主';
  } else {
    const direct = candidates.find((p) => !p.endsWith('.asar'));
    tools = await import(direct === undefined ? '@deepseek-ai/dsh-tools' : pathToFileURL(direct).href);
    toolsVersion = '仓库副本（可能与宿主规则不同）';
  }

  const failures = [];
  let compiled = 0;
  for (const file of readdirSync(extDir)) {
    if (!file.endsWith('.js') || file.startsWith('_')) continue;
    if (statSync(join(extDir, file)).isDirectory()) continue;
    const mod = await import(pathToFileURL(join(extDir, file)).href).catch(() => null);
    if (mod === null || typeof mod.apply !== 'function') continue;
    const seen = [];
    const ctx = {
      tools: {
        register(def) {
          // 两道都要走，缺一不可：
          //   ① defineTool —— 编译（会**保留**属性节点上的 required:true 原文）
          //   ② 把编译结果再交给 assertSupportedJsonSchema —— **宿主真正执行的
          //      那一步**。0.2.8 的两次黑屏都卡在这里：DSL 的 `required: true`
          //      编译后仍留在属性节点上，裸校验判它 "is not supported on type"。
          //
          // ⚠️ 不能用 defineTool 的**返回值**去喂 ②：返回值被 rewrite 过（属性上
          // 的 required 已提升为父层数组），于是检查永远通过 —— 上一轮的检查就是
          // 这么写的，所以改完仍然黑屏。必须拿**原始定义**（注册表实际收到的
          // 那个对象）去过裸校验。
          //
          // ⚠️ 现在内建工具一律走 `ctx.tools.register()`，而 register **不做任何
          // 编译**（宿主原样存、原样发）。所以 `defineTool(def)` 在这里不适用：
          // 它只收属性映射，喂完整 schema 会抛
          // `parameters.type must be a value schema object`。本地只做两件事：
          //   ① 参数必须是完整 JSON Schema（下面 wireSchemaProblems 验）
          //   ② output.schema 过宿主的裸校验
          // 想验 defineTool 那条路，得另外构造属性映射来试（本项目不用）。
          const raw = { ...def.output, schema: def.output.schema };
          tools.assertSupportedJsonSchema(raw.schema);
          //   ③「发出去能被服务端接受」—— 前两道只查**本地子集**，管不住
          //      wire 上的样子。2026-11-01 实测：schema 本地全绿，但发到
          //      DeepSeek 后整轮请求被拒：
          //        Invalid schema for function 'usage_report':
          //        schema must be a JSON Schema of 'type: "object"', got 'type: null'
          //
          //      ⚠️ 关键：必须验**注册表实际收到的原始定义**（`def`），
          //      不能验 `defineTool(def)` 的返回值。宿主里两条路完全不同：
          //        · defineTool() → 内部补 `{type:'object', properties}`，
          //          裸属性映射也能过 —— 拿它验等于给裸映射开后门；
          //        · tools.register() → 原样存，宿主按 `spec.properties`
          //          取值，裸映射取到 undefined → wire 上是 `type: null`。
          //      上一版就是验 defineTool 的产物，于是漏掉了真正的注册路径。
          const problems = wireSchemaProblems(def.parameters, 'parameters');
          problems.push(...wireSchemaProblems(raw.schema, 'output.schema'));
          const serialized = JSON.stringify({ parameters: def.parameters, output: def.output.schema });
          if (/"type":\s*null/.test(serialized)) problems.push('序列化后出现 "type": null');
          if (problems.length > 0) throw new Error(problems.join('; '));
          seen.push(def.name);
        },
      },
      systemPrompt: { context() {}, section() {} },
      sessionProjections: { stateOf: () => undefined },
      effect: () => () => {}, provide: () => ({}), on: () => () => {},
      logger: () => ({ info() {}, warn() {}, error() {}, debug() {} }),
      console: { warn() {}, error() {}, log() {} },
    };
    try {
      mod.apply(ctx);
      compiled += seen.length;
    } catch (error) {
      failures.push(`${file}${seen.length > 0 ? ` @${seen[seen.length - 1]}` : ''}: ${error?.message ?? error}`);
    }
  }
  const ok = failures.length === 0;
  if (!ok) failed += 1;
  console.log(`  ${ok ? '✓' : '✗'} ${'工具 schema 出线'.padEnd(20)} ${compiled} 个工具通过「完整 schema 根 + 裸校验 + API 根约束」（dsh-tools ${toolsVersion}）${ok ? '' : ` · ${failures.length} 个失败:`}`);
  for (const f of failures) console.log(`      ${f.slice(0, 300)}`);
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
