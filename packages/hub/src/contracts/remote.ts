/**
 * dsh-plugin-hub shared wire contracts (zod v4).
 *
 * This module is compiled twice:
 *  - host build: emitted as `lib/remote.js` and exported through `./typert`
 *    (the typert-loader registers the host face into `ctx.typert`);
 *  - client build: inlined into the `lib/client.js` bundle (the client mounts
 *    the same descriptors through `ctx.remote.$mount(TYPERT_REMOTE)`).
 */
import { z } from 'zod';

export const category = z.enum(['tool', 'agent', 'ui', 'data', 'vision', 'docs', 'memory', 'usage', 'notify', 'dev', 'chat', 'hub', 'hub-ext', 'other']);

export const pluginSummary = z.object({
  packageName: z.string(),
  repoFullName: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  developer: z.string(),
  iconUrl: z.string().nullable(),
  categories: z.array(category).readonly(),
  version: z.string().nullable(),
  stars: z.number(),
  downloads: z.number(),
  rating: z.number(),
  ratingCount: z.number(),
  installed: z.boolean(),
  enabled: z.boolean().nullable(),
  updatedAt: z.string().nullable(),
  /** Download source: 'npm' (registry, direct) or 'github' (clone, may need proxy). */
  source: z.enum(['npm', 'github']),
  /** Whether the package is published on npm (can install via npm registry). */
  hasNpm: z.boolean(),
  /** Whether the package has a GitHub repository (can install via git clone). */
  hasGit: z.boolean(),
  /** Trust level from the ecosystem index (official/verified/community/unreviewed); null = unknown. */
  trustLevel: z.string().nullable().optional(),
  /**
   * 该条目来自包内**离线预置目录**（尚未被镜像同步覆盖）。
   * 同样是「契约漏一个字段 → UI 永远读不到」的高危项，改 host 时一起改。
   */
  seed: z.boolean().optional(),
  /** Estimated health snapshot (0-100, no live issue fetch) — for list sorting. */
  health: z.number(),
}).readonly();

export const pluginListResult = z.object({
  total: z.number(),
  plugins: z.array(pluginSummary).readonly(),
}).readonly();

export const versionRow = z.object({
  version: z.string(),
  publishedAt: z.string().nullable(),
  changelog: z.string().nullable(),
  tagName: z.string().nullable(),
}).readonly();

export const depEdge = z.object({
  name: z.string(),
  version: z.string().nullable(),
  kind: z.enum(['runtime', 'dev', 'peer']),
}).readonly();

export const reviewRow = z.object({
  id: z.number(),
  actor: z.string(),
  score: z.number(),
  comment: z.string(),
  createdAt: z.string(),
}).readonly();

export const dependentRow = z.object({
  packageName: z.string(),
  name: z.string(),
  version: z.string().nullable(),
  rating: z.number(),
  installed: z.boolean(),
}).readonly();

export const pluginDetail = z.object({
  packageName: z.string(),
  repoFullName: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  usage: z.string(),
  developer: z.string(),
  iconUrl: z.string().nullable(),
  categories: z.array(category).readonly(),
  version: z.string().nullable(),
  stars: z.number(),
  downloads: z.number(),
  rating: z.number(),
  ratingCount: z.number(),
  installed: z.boolean(),
  enabled: z.boolean().nullable(),
  topics: z.array(z.string()).readonly(),
  license: z.string().nullable(),
  homepage: z.string().nullable(),
  repoUrl: z.string(),
  defaultBranch: z.string(),
  screenshots: z.array(z.string()).readonly(),
  versions: z.array(versionRow).readonly(),
  dependencies: z.array(depEdge).readonly(),
  dependents: z.array(dependentRow).readonly(),
  reviews: z.array(reviewRow).readonly(),
  updatedAt: z.string().nullable(),
  /** Download source: 'npm' (registry, direct) or 'github' (clone, may need proxy). */
  source: z.enum(['npm', 'github']),
  /** Whether the package is published on npm (can install via npm registry). */
  hasNpm: z.boolean(),
  /** Whether the package has a GitHub repository (can install via git clone). */
  hasGit: z.boolean(),
  /** Locally installed version (null when not installed). */
  installedVersion: z.string().nullable().optional(),
  /** True when installed and an update is available. */
  hasUpdate: z.boolean().optional(),
  /** Trust level from the ecosystem index; null = unknown. */
  trustLevel: z.string().nullable().optional(),
}).readonly();

export const opResult = z.object({
  ok: z.boolean(),
  message: z.string(),
  detail: z.string().nullable(),
}).readonly();

/**
 * 一个「列表来源」：商店两区与整合包页的共同注册项。
 * kind: 0 = 插件列表（商店），1 = 整合包（整合包页）。
 * provenance: auto = 自动识别，certified = 认证（由我们签发）。
 */
export const listSourceRow = z.object({
  id: z.string(),
  label: z.string(),
  url: z.string(),
  kind: z.number(),
  format: z.string(),
  provenance: z.enum(['auto', 'certified']),
  publisher: z.string(),
  entries: z.number(),
  addedAt: z.string(),
  syncedAt: z.string().nullable(),
  error: z.string().nullable(),
}).readonly();

/** 列表里的一条可安装条目。 */
export const listEntry = z.object({
  name: z.string(),
  url: z.string(),
  description: z.string(),
  category: z.string(),
  deps: z.array(z.string()).readonly(),
  flags: z.number(),
  /** 归一化后的仓库键（同一仓库的不同插件共享它，用于分组而不是合并）。 */
  repoKey: z.string(),
  /** 可直接交给 pnpm 的安装规格；null = 该地址不可安装。 */
  installSpec: z.string().nullable(),
  /** 版本级认证状态：certified 当前版本已认证 / legacy 有过认证 / none 未认证。 */
  cert: z.enum(['certified', 'legacy', 'none']),
  /** 认证时的版本；未认证为 null。 */
  certVersion: z.string().nullable(),
  /** 本地已知的当前版本；未知为 null。 */
  currentVersion: z.string().nullable(),
}).readonly();

const listSourceMutation = z.object({
  ok: z.boolean(),
  message: z.string(),
  detail: z.string().nullable(),
  row: listSourceRow.nullable(),
  warnings: z.array(z.string()).readonly(),
}).readonly();

export const installReceipt = z.object({
  ok: z.boolean(),
  message: z.string(),
  packageName: z.string(),
  detail: z.string().nullable(),
  restartRequired: z.boolean(),
  reloadRequired: z.boolean(),
  /** Environment variables the plugin reads that the user may need to configure. */
  requiredEnv: z.array(z.string()).optional(),
}).readonly();

export const categoryToggleResult = z.object({
  ok: z.boolean(),
  message: z.string(),
  detail: z.string().nullable(),
  changed: z.number(),
  skipped: z.array(z.object({
    packageName: z.string(),
    message: z.string(),
  }).readonly()).readonly(),
}).readonly();

export const syncStatus = z.object({
  state: z.enum(['idle', 'syncing', 'error']),
  lastSyncAt: z.string().nullable(),
  lastSyncTotal: z.number(),
  lastError: z.string().nullable(),
  nextSyncAt: z.string().nullable(),
  scheduleHours: z.number(),
}).readonly();

export const storeSettings = z.object({
  tokenConfigured: z.boolean(),
  tokenMasked: z.string(),
  scheduleHours: z.number(),
  profileName: z.string(),
  rateLimitRemaining: z.number().nullable(),
  dbPath: z.string(),
  pluginCount: z.number(),
}).readonly();

export const auditRow = z.object({
  id: z.number(),
  actor: z.string(),
  action: z.string(),
  target: z.string(),
  result: z.string(),
  message: z.string(),
  createdAt: z.string(),
}).readonly();

export const auditPage = z.object({
  total: z.number(),
  rows: z.array(auditRow).readonly(),
}).readonly();

export const dependencyGraph = z.object({
  root: z.string(),
  rootName: z.string(),
  dependencies: z.array(depEdge).readonly(),
  dependents: z.array(dependentRow).readonly(),
}).readonly();

export const installedPlugin = z.object({
  packageName: z.string(),
  entryId: z.string(),
  name: z.string(),
  /** 'system' (Loader infra), 'download' (registry/git installs), or 'own' (local file:/link: — user-created plugins). */
  category: z.enum(['system', 'download', 'own']),
  /** Sub-group within the parent category (core/ui/tool/... or declared group). */
  group: z.string(),
  groupLabel: z.string(),
  enabled: z.boolean(),
  phase: z.string().nullable(),
  managed: z.boolean(),
  /** Infrastructure entries that must not be disabled from the UI. */
  protected: z.boolean(),
  /**
   * 是否可以从这里单独卸载。
   *
   * 系统条目与 hub 的包内子插件为 false：前者属于 DSH 基建，后者随商店包一起
   * 装卸（单独「卸载」一个 `dsh-plugin-hub/extensions/xxx` 没有意义），
   * 所以 UI 不给它们卸载入口。普通依赖包为 true。
   */
  uninstallable: z.boolean(),
  /** Alias of category for readability. */
  type: z.string(),
  /** Local install path for 自创作插件 (file:/link: installs); null otherwise. */
  localPath: z.string().nullable(),
  /** Whether the local plugin has been published (npm exists / repository declared). */
  published: z.boolean(),
  /** Public repository URL for published local plugins; null otherwise. */
  repoUrl: z.string().nullable(),
  /** Installed version read from the local package.json. */
  version: z.string().nullable().optional(),
  /** Latest known version from the store mirror (npm / GitHub release). */
  latestVersion: z.string().nullable().optional(),
  /** True when the installed version is older than the latest known one. */
  hasUpdate: z.boolean().optional(),
}).readonly();

export const scaffoldInfo = z.object({
  templateRepo: z.string(),
  templateUrl: z.string(),
  docsUrl: z.string(),
  guide: z.string(),
  commands: z.array(z.string()).readonly(),
  categories: z.array(z.string()).readonly(),
}).readonly();

/**
 * A `strict` wire codec.
 *
 * ⚠️ 0.2.x 的协议把「取 schema」从**直挂字段**改成了**惰性工厂**：
 * dsh-typert-loader 的 `requireStrictCodec` 现在要求
 * `typeof codec.create === 'function'`，缺了就抛
 * `... parameter codec has no create() factory` —— 而这一抛会让**整条
 * typert-loader 条目**激活失败（表现为启动时 `N entries did not activate`），
 * hub 的商店 Remote 接口随之全部不可用。
 * 官方生成物（`*.typert.host.js`）的形状是：
 *   { mode: 'strict', typeSymbol, create: <() => zodSchema> }
 *
 * 这里**两个字段都给**：`create` 喂 0.2.x，`schema` 留给 0.1.x，
 * 老 runtime 读不到未知字段、新 runtime 只认 create，互不干扰。
 */
type StrictCodec = { mode: 'strict'; typeSymbol: string; schema: z.ZodType; create: () => z.ZodType };
const strict = (typeSymbol: string, schema: z.ZodType): StrictCodec => ({ mode: 'strict', typeSymbol, schema, create: () => schema });
const parameter = (name: string, schema: z.ZodType): { name: string; wire: string; source: 'json'; codec: StrictCodec } => ({ name, wire: name, source: 'json', codec: strict(`dsh-plugin-hub/types#${name}`, schema) });

const filters = z.object({
  category: category.nullish(),
  query: z.string().nullish(),
  sort: z.enum(['random', 'health', 'stars', 'rating', 'downloads', 'updated', 'name']).nullish(),
  installedOnly: z.boolean().nullish(),
  limit: z.number().nullish(),
  offset: z.number().nullish(),
}).readonly();

const auditQuery = z.object({
  action: z.string().nullish(),
  actor: z.string().nullish(),
  target: z.string().nullish(),
  limit: z.number().nullish(),
  offset: z.number().nullish(),
}).readonly();

/** Result type symbol per remote method (informational wire anchor). */
const RESULT_SYMBOL: Record<string, string> = {
  list: 'PluginListResult',
  detail: 'PluginDetail',
  installed: 'InstalledPluginList',
  audit: 'AuditPage',
  dependencyGraph: 'DependencyGraph',
  syncStatus: 'SyncStatus',
  settings: 'StoreSettings',
  scaffold: 'ScaffoldInfo',
  listReviews: 'ReviewList',
};

const descriptor = (method: string, parameters: Array<{ name: string; wire: string; source: 'json'; codec: StrictCodec }>, result: z.ZodType): Record<string, unknown> => ({
  id: `dsh-plugin-hub#pluginStore/${method}`,
  service: 'pluginStore',
  namespace: 'pluginStore',
  method,
  invocation: { kind: 'direct' },
  parameters,
  result: strict(`dsh-plugin-hub/types#${RESULT_SYMBOL[method] ?? 'OpResult'}`, result),
});

const installedList = z.array(installedPlugin).readonly();

export const descriptors = [
  descriptor('list', [parameter('filters', filters)], pluginListResult),
  /** 全部列表来源（kind=0 商店两区 / kind=1 整合包）。 */
  descriptor('listSources', [], z.object({
    items: z.array(listSourceRow).readonly(),
  })),
  /** 添加来源：URL / 粘贴文本 / 上传文件（base64）三选一。 */
  descriptor('addListSource', [parameter('input', z.object({
    url: z.string().nullish(),
    text: z.string().nullish(),
    base64: z.string().nullish(),
    label: z.string().nullish(),
    expect: z.number(),
    certified: z.boolean().nullish(),
  }).readonly())], listSourceMutation),
  /** 自动爬取一个 GitHub 用户 / 组织 / 仓库 / topic。 */
  descriptor('addCrawlSource', [parameter('spec', z.string()), parameter('label', z.string().nullish())], listSourceMutation),
  descriptor('removeListSource', [parameter('id', z.string())], opResult),
  /** 认证一份列表（逐插件记录当前版本，认证即版本级事实）。 */
  descriptor('certifyList', [parameter('id', z.string())], z.object({
    ok: z.boolean(),
    message: z.string(),
    detail: z.string().nullable(),
    count: z.number(),
  })),
  /** 分页读取某个来源的条目。 */
  descriptor('listSourceEntries', [
    parameter('id', z.string()),
    parameter('query', z.string().nullish()),
    parameter('limit', z.number().nullish()),
    parameter('offset', z.number().nullish()),
  ], z.object({
    source: listSourceRow,
    total: z.number(),
    items: z.array(listEntry).readonly(),
  })),
  /** 从列表条目一键安装（tarball / npm / GitHub 地址）。 */
  descriptor('installFromSource', [
    parameter('sourceId', z.string()),
    parameter('name', z.string()),
    parameter('actor', z.string()),
  ], installReceipt),
  descriptor('detail', [parameter('packageName', z.string())], pluginDetail),
  descriptor('skillList', [parameter('filters', z.object({ query: z.string().nullish(), category: z.string().nullish(), platform: z.string().nullish(), limit: z.number().nullish() }).readonly().nullish())], z.object({
    total: z.number(),
    items: z.array(z.object({
      id: z.string(), name: z.string(), description: z.string(), descriptionZh: z.string(),
      version: z.string(), author: z.string(), repoFullName: z.string(),
      categories: z.array(z.string()).readonly(), platform: z.string(), installed: z.boolean(),
    }).readonly()).readonly(),
  })),
  descriptor('skillDetail', [parameter('id', z.string())], z.object({
    id: z.string(), name: z.string(), description: z.string(), descriptionZh: z.string(),
    version: z.string(), author: z.string(), repoFullName: z.string(), skillPath: z.string(),
    categories: z.array(z.string()).readonly(), platform: z.string(),
    content: z.string(), installed: z.boolean(), installedDir: z.string().nullable(),
  })),
  descriptor('skillInstall', [parameter('id', z.string()), parameter('actor', z.string())], opResult),
  descriptor('skillUninstall', [parameter('name', z.string()), parameter('actor', z.string())], opResult),
  descriptor('skillInstalled', [], z.array(z.object({
    name: z.string(), dir: z.string(), description: z.string(), version: z.string(),
  }).readonly()).readonly()),
  descriptor('bench', [parameter('packageName', z.string())], z.object({
    found: z.boolean(),
    updatedAt: z.string().nullable(),
    ecosystemAvg: z.number().nullable(),
    entry: z.record(z.string(), z.unknown()).nullable(),
  })),
  descriptor('benchRun', [parameter('packageName', z.string()), parameter('mode', z.enum(['mock', 'e2e']).default('mock'))], z.object({
    ok: z.boolean(),
    message: z.string(),
    detail: z.object({
      found: z.boolean(),
      updatedAt: z.string().nullable(),
      ecosystemAvg: z.number().nullable(),
      entry: z.record(z.string(), z.unknown()).nullable(),
    }).nullable(),
  })),
  descriptor('syncNow', [], opResult),
  descriptor('syncStatus', [], syncStatus),
  descriptor('settings', [], storeSettings),
  descriptor('setGithubToken', [parameter('token', z.string()), parameter('actor', z.string())], opResult),
  descriptor('clearGithubToken', [parameter('actor', z.string())], opResult),
  descriptor('setSchedule', [parameter('hours', z.number()), parameter('actor', z.string())], opResult),
  descriptor('installPlugin', [parameter('packageName', z.string()), parameter('actor', z.string()), parameter('source', z.enum(['auto', 'npm', 'git']).default('auto').optional())], installReceipt),
  descriptor('installProgress', [parameter('packageName', z.string())], z.object({
    phase: z.string(),
    percent: z.number().nullable(),
    detail: z.string(),
    updatedAt: z.number(),
  }).nullable()),
  descriptor('myPlugins', [], z.array(z.object({
    packageName: z.string(),
    name: z.string(),
    localPath: z.string().nullable(),
    published: z.boolean(),
    repoUrl: z.string().nullable(),
    version: z.string().nullable(),
    description: z.string().nullable(),
    pkgName: z.string(),
  }).readonly()).readonly()),
  descriptor('publish', [parameter('raw', z.object({
    packageName: z.string(),
    target: z.enum(['github', 'npm', 'both']).default('github'),
    githubToken: z.string().optional(),
    npmToken: z.string().optional(),
    visibility: z.enum(['public', 'private']).default('public'),
    description: z.string().optional(),
    topics: z.array(z.string()).optional(),
    writeReadme: z.boolean().optional(),
  })), parameter('actor', z.string())], z.object({
    ok: z.boolean(),
    message: z.string(),
    detail: z.string().nullable(),
    repoUrl: z.string().nullable(),
    npmUrl: z.string().nullable(),
    packageName: z.string(),
    security: z.object({
      level: z.enum(['clean', 'warning', 'malicious']),
      findings: z.array(z.object({
        severity: z.enum(['critical', 'warning']),
        rule: z.string(),
        target: z.string(),
        detail: z.string(),
      }).readonly()).readonly(),
    }).optional(),
  })),
  descriptor('publishProgress', [parameter('packageName', z.string())], z.object({
    phase: z.string(),
    percent: z.number().nullable(),
    detail: z.string(),
    updatedAt: z.number(),
  }).nullable()),
  descriptor('uninstall', [parameter('packageName', z.string()), parameter('actor', z.string())], installReceipt),
  descriptor('setEnabled', [parameter('packageName', z.string()), parameter('enabled', z.boolean()), parameter('actor', z.string())], installReceipt),
  descriptor('setCategoryEnabled', [parameter('category', z.string()), parameter('enabled', z.boolean()), parameter('actor', z.string())], categoryToggleResult),
  descriptor('installed', [], installedList),
  descriptor('rate', [parameter('packageName', z.string()), parameter('score', z.number()), parameter('comment', z.string()), parameter('actor', z.string())], opResult),
  descriptor('listReviews', [parameter('packageName', z.string())], z.array(reviewRow).readonly()),
  descriptor('issues', [parameter('packageName', z.string())], z.array(z.object({
    number: z.number(),
    title: z.string(),
    state: z.enum(['open', 'closed']),
    comments: z.number(),
    createdAt: z.string().nullable(),
    user: z.string().nullable(),
  }).readonly()).readonly()),
  descriptor('audit', [parameter('query', auditQuery)], auditPage),
  descriptor('dependencyGraph', [parameter('packageName', z.string())], dependencyGraph),
  descriptor('scaffold', [], scaffoldInfo),
  descriptor('wikiHub', [parameter('filters', z.object({
    query: z.string().optional(),
    category: z.string().optional(),
    source: z.string().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
  }))], z.object({
    total: z.number(),
    items: z.array(z.object({
      packageName: z.string(),
      repoFullName: z.string(),
      name: z.string(),
      developer: z.string(),
      shortDescription: z.string(),
      categories: z.array(z.string()).readonly(),
      trustLevel: z.string().nullable(),
      health: z.number().nullable(),
      source: z.enum(['mirror', 'catalog']),
    }).readonly()).readonly(),
  })),
  descriptor('wiki', [parameter('packageName', z.string())], z.object({
    packageName: z.string(),
    name: z.string(),
    developer: z.string(),
    repoFullName: z.string().nullable(),
    categories: z.array(z.string()).readonly(),
    description: z.string(),
    shortDescription: z.string(),
    trustLevel: z.string().nullable(),
    license: z.string().nullable(),
    homepage: z.string().nullable(),
    npmInstall: z.string(),
    gitInstall: z.string().nullable(),
    usage: z.string(),
    highlights: z.string(),
    bestPractices: z.string(),
    versionCount: z.number(),
    latestVersion: z.string().nullable(),
    dependencies: z.array(z.object({ name: z.string(), type: z.string() }).readonly()).readonly(),
    related: z.array(z.object({ packageName: z.string(), name: z.string(), developer: z.string(), shortDescription: z.string() }).readonly()).readonly(),
  })),
  descriptor('healthHub', [], z.object({
    updatedAt: z.string().nullable(),
    items: z.array(z.object({
      packageName: z.string(),
      name: z.string(),
      developer: z.string(),
      health: z.number(),
      level: z.enum(['healthy', 'attention', 'stale']),
      rank: z.number(),
      lastUpdate: z.string().nullable(),
      downloads: z.number(),
      stars: z.number(),
      versionCount: z.number(),
      categories: z.array(z.string()).readonly(),
    }).readonly()).readonly(),
  })),
  descriptor('healthDetail', [parameter('packageName', z.string())], z.object({
    packageName: z.string(),
    name: z.string(),
    developer: z.string(),
    repoFullName: z.string().nullable(),
    health: z.number(),
    level: z.enum(['healthy', 'attention', 'stale']),
    breakdown: z.object({
      activity: z.number(), distribution: z.number(), bugs: z.number(), community: z.number(), releases: z.number(),
    }),
    lastUpdate: z.string().nullable(),
    downloads: z.number(),
    stars: z.number(),
    openIssues: z.number().nullable(),
    timeline: z.array(z.object({ version: z.string(), publishedAt: z.string().nullable() }).readonly()).readonly(),
    downloadTrend: z.array(z.object({ date: z.string(), downloads: z.number() }).readonly()).readonly(),
    commitActivity: z.array(z.object({ date: z.string(), count: z.number() }).readonly()).readonly(),
    starGains: z.array(z.object({ date: z.string(), count: z.number() }).readonly()).readonly(),
    hasToken: z.boolean(),
  })),
  /**
   * hub 内建插件名册 + 它们的实时状态。
   *
   * 0.2 起 hub 是「一个包、21 个内部插件」（与 harness 本体同构）：核心商店加
   * 若干可单独开关、彼此声明依赖的插件。行由 hub 的 cordis.patch.yml 插入，
   * 因此在官方 Plugins 清单页里各占一行（共 22 行：本体 + 21）。
   *
   * ⚠️ 契约必须与 host 的返回**逐字段对齐**：zod 的 object 默认会剥离未声明字段，
   * 少写一个（如 `groups`）UI 侧就直接读到 undefined —— 表现为列表空白，
   * 而不是报错。改 host 的返回结构时，这里必须一起改。
   */
  descriptor('extensions', [], z.object({
    currentPriceVersion: z.string(),
    /** 内建插件总数。 */
    pluginCount: z.number(),
    /** 已装配（phase = active）的数量。 */
    activeCount: z.number(),
    /** 分组元数据（设置页按它分节，顺序即 order）。 */
    groups: z.array(z.object({
      id: z.string(),
      name: z.string(),
      nameEn: z.string(),
      description: z.string(),
      descriptionEn: z.string(),
      order: z.number(),
    }).readonly()).readonly(),
    rows: z.array(z.object({
      id: z.string(),
      /** profile patch 里的行 id（可在 Plugins 清单页按其停用）。 */
      rowId: z.string(),
      /** cordis 行 name（包内子路径模块）。 */
      entry: z.string(),
      name: z.string(),
      nameEn: z.string(),
      description: z.string(),
      descriptionEn: z.string(),
      /** 所属分组（foundation / safety / publish / insight / ops）。 */
      group: z.string(),
      /** 硬依赖的插件 id。 */
      requires: z.array(z.string()).readonly(),
      /** 依赖它的插件（关掉它时提示会牵连谁）。 */
      dependents: z.array(z.object({ id: z.string(), name: z.string() }).readonly()).readonly(),
      /** 用户开关的**生效值**（覆盖值优先，其次默认值）。 */
      enabled: z.boolean(),
      /** 开关 + 依赖都满足 → 真的在跑。 */
      runnable: z.boolean(),
      /** 因依赖没开而让位时缺的那几个。 */
      blockedBy: z.array(z.object({ id: z.string(), name: z.string() }).readonly()).readonly(),
      /** 插件上报的运行阶段：active / disabled / blocked / failed / idle。 */
      phase: z.string(),
      /** 上报的一句话说明。 */
      detail: z.string(),
      /** 上报时间（epoch ms）；0 = 从未上报。 */
      reportedAt: z.number(),
      /** host 端提供的服务名；null = 无服务。 */
      service: z.string().nullable(),
      /** UI 出现的位置；null = 无 UI。 */
      ui: z.string().nullable(),
      /** 组内排序。 */
      order: z.number(),
      /** loader 里该条目的真实阶段（active/pending/failed/disabled/null）。 */
      loaderPhase: z.string().nullable(),
    }).readonly()).readonly(),
  })),
  descriptor('extensionSet', [parameter('id', z.string()), parameter('enabled', z.boolean())], opResult),
  /**
   * 版本化价格表快照（旧 → 新）。UI 用它显示"当时价 vs 现价"的口径来源，
   * 其它插件也可以读来复用同一套价格表，避免各自硬编码单价。
   */
  descriptor('pricingTable', [], z.object({
    current: z.string(),
    versions: z.array(z.object({
      version: z.string(),
      label: z.string(),
      effectiveFrom: z.string(),
      effectiveTo: z.string().nullable(),
      note: z.string(),
      source: z.string(),
      peakMultiplier: z.number().nullable(),
      peakNote: z.string().nullable(),
      models: z.array(z.string()).readonly(),
    }).readonly()).readonly(),
  })),
];

export const TYPERT_REMOTE = { package: 'dsh-plugin-hub', descriptors };

/** Host Typert artifact loaded from the package's `./typert` export. */
export const TYPERT = {
  package: 'dsh-plugin-hub',
  face: 'host',
  schemas: [],
  invocations: descriptors,
  model: { services: [], events: [], objects: [] },
};

export default TYPERT_REMOTE;
