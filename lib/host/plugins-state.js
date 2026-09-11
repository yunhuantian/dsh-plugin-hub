/**
 * hub 内建插件名册（registry）—— 整个 hub 的「唯一事实来源」。
 *
 * ── 组织方式（与 DSH 本体同构）──────────────────────────────────────────────
 * DSH 本体是**一个仓库、一次发布**，但 `@deepseek-ai/dsh-base` 的 bundle patch
 * 里排了 60+ 个具名条目（`id` + `name: '@deepseek-ai/dsh-xxx'`），每个都是一行、
 * 一个独立 cordis 插件。hub 照这个来：
 *
 *   - hub 是**一个 npm 包、一次发布**（dsh-plugin-hub）；
 *   - 包内由 **20 个具名内建插件**组成，各自一行（`dsh-plugin-hub/extensions/<id>`）；
 *   - 它们随 hub 一起安装、一起升级，但**可以单独开关**，也**声明彼此依赖**。
 *
 * 因此 harness 的「设置 → 插件」清单页里，hub 会展开成 21 行（本体 + 20 内建），
 * 每行都能看到自己的加载状态；hub 自己的设置页则把它们按分组管起来。
 *
 * ── 解耦面：状态文件，而不是 cordis 服务互依 ────────────────────────────────
 * 内建插件之间**不**用 `inject` 硬依赖（那会造成"提供者被关了 → 消费者永久
 * pending"的死锁）。依赖关系是**声明式的**（见每条 `requires`），运行时由一个
 * 统一的 `activate()` 判定：
 *
 *   1. `plugins.json`         用户开关（hub 设置页写，插件启动时读）
 *   2. `plugins-status.json`  各插件上报的运行状态（插件写，hub UI 读）
 *
 * 任一依赖没开 → 消费者上报 `blocked` 并主动让位（不提供服务、不注册 UI）。
 * 于是"关掉一个基础插件"能干净地连带停掉依赖它的插件，且随时可以开回来。
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { resolveDshHome } from './store-db.js';
/** 五个分组：基础 → 安全 → 发布 → 洞察 → 运维。 */
export const HUB_PLUGIN_GROUPS = [
    {
        id: 'foundation',
        name: '基础内核',
        nameEn: 'Foundation',
        description: '商店跑起来的底座：本地库、GitHub 通道、索引同步、安装引擎、npm 探测。关掉会影响很多下游插件。',
        descriptionEn: 'The base the hub runs on: local database, GitHub channel, index sync, install engine, npm probing.',
        order: 10,
    },
    {
        id: 'safety',
        name: '安全与质量',
        nameEn: 'Safety & Quality',
        description: '装之前先体检：静态安全扫描、槽位冲突检测、发布质量门禁、信任徽章同步。',
        descriptionEn: 'Pre-flight checks: static security scan, slot conflict detection, quality gate, trust badge sync.',
        order: 20,
    },
    {
        id: 'publish',
        name: '发布流水线',
        nameEn: 'Publishing',
        description: '把本地插件推到 GitHub / npm：一键发布、版本一致性守卫、更新日志草稿。',
        descriptionEn: 'Ship local plugins to GitHub / npm: one-click publish, version consistency guard, changelog drafting.',
        order: 30,
    },
    {
        id: 'insight',
        name: '洞察与内容',
        nameEn: 'Insight & Content',
        description: '用量费用、健康度、更新检测、依赖图谱、插件百科、技能商店。',
        descriptionEn: 'Usage & cost, health scoring, update detection, dependency graph, plugin wiki, skill store.',
        order: 40,
    },
    {
        id: 'ops',
        name: '运维',
        nameEn: 'Operations',
        description: '出问题时的兜底：数据备份回滚、诊断报告导出。',
        descriptionEn: 'When things go wrong: data backup/rollback and diagnostic report export.',
        order: 50,
    },
];
/**
 * hub 内建插件名册 —— 20 个，分 5 组。
 *
 * 顺序即依赖的自然顺序：基础在前、运维在后。每条的 `requires` 都指向更靠前的
 * 条目，因此不存在环。
 */
export const HUB_PLUGINS = [
    // ── 基础内核 ────────────────────────────────────────────────────────────
    {
        id: 'store-db',
        name: '商店数据库',
        nameEn: 'Store Database',
        description: 'SQLite 索引：插件、技能、依赖边、评分、审计、同步游标。所有数据读写的唯一落点。',
        descriptionEn: 'SQLite index: plugins, skills, dependency edges, ratings, audit log, sync cursors.',
        group: 'foundation',
        requires: [],
        rowId: 'hub-ext-store-db',
        entry: 'dsh-plugin-hub/extensions/store-db',
        defaultEnabled: true,
        service: 'pluginStoreDb',
        ui: null,
        order: 10,
    },
    {
        id: 'github',
        name: 'GitHub 通道',
        nameEn: 'GitHub Channel',
        description: 'GitHub 客户端：仓库搜索、限频管理与退避重试、README 抓取、token 私有额度。',
        descriptionEn: 'GitHub client: repo search, rate-limit handling with backoff, README fetching, private quota.',
        group: 'foundation',
        requires: [],
        rowId: 'hub-ext-github',
        entry: 'dsh-plugin-hub/extensions/github',
        defaultEnabled: true,
        service: 'pluginGithub',
        ui: null,
        order: 20,
    },
    {
        id: 'npm-probe',
        name: 'npm 可用性探测',
        nameEn: 'npm Availability Probe',
        description: '探测每个插件在 npm 上是否可安装（缓存 + 强制刷新），决定「npm 安装 / GitHub 安装」两条路。',
        descriptionEn: 'Probes npm installability per plugin (cached), choosing between npm and GitHub install paths.',
        group: 'foundation',
        requires: ['store-db'],
        rowId: 'hub-ext-npm-probe',
        entry: 'dsh-plugin-hub/extensions/npm-probe',
        defaultEnabled: true,
        service: 'pluginNpmProbe',
        ui: null,
        order: 30,
    },
    {
        id: 'seed-catalog',
        name: '预置插件目录',
        nameEn: 'Seed Catalog',
        description: '随包发布一份离线插件清单（16 个实用插件），装好即有内容，不用等镜像同步跑完。只插不覆盖，真实同步数据优先。',
        descriptionEn: 'Ships an offline catalog of 16 useful plugins so the store has content before the first sync. Insert-only; synced data wins.',
        group: 'foundation',
        requires: ['store-db'],
        rowId: 'hub-ext-seed-catalog',
        entry: 'dsh-plugin-hub/extensions/seed-catalog',
        defaultEnabled: true,
        service: 'pluginSeedCatalog',
        ui: '商店列表的「预置」标记',
        order: 35,
    },
    {
        id: 'registry',
        name: '索引同步',
        nameEn: 'Registry Sync',
        description: '把 GitHub 上 topic:dsh-plugin 的仓库元数据与第三方目录（Blue-Whale 等）同步进本地库，搜索不再受网络与限频影响。',
        descriptionEn: 'Syncs topic:dsh-plugin repo metadata and third-party catalogs into the local DB.',
        group: 'foundation',
        requires: ['store-db', 'github'],
        rowId: 'hub-ext-registry',
        entry: 'dsh-plugin-hub/extensions/registry',
        defaultEnabled: true,
        service: 'pluginRegistry',
        ui: '设置页「镜像同步」',
        order: 40,
    },
    {
        id: 'installer',
        name: '安装引擎',
        nameEn: 'Install Engine',
        description: 'pnpm 安装、bundle 行写入、启用/禁用切换、卸载与残留清理、进度流式上报。',
        descriptionEn: 'pnpm install, bundle row writing, enable/disable toggles, uninstall and residue cleanup.',
        group: 'foundation',
        requires: ['store-db'],
        rowId: 'hub-ext-installer',
        entry: 'dsh-plugin-hub/extensions/installer',
        defaultEnabled: true,
        service: 'pluginInstaller',
        ui: '商店「已安装」视图',
        order: 50,
    },
    // ── 安全与质量 ──────────────────────────────────────────────────────────
    {
        id: 'security',
        name: '安全扫描',
        nameEn: 'Security Scan',
        description: '装前与发布前静态扫描：危险脚本、敏感文件读取、动态执行、外联地址；高风险直接拦截。',
        descriptionEn: 'Static pre-install / pre-publish scan: risky scripts, sensitive file access, dynamic eval, outbound hosts.',
        group: 'safety',
        requires: [],
        rowId: 'hub-ext-security',
        entry: 'dsh-plugin-hub/extensions/security',
        defaultEnabled: true,
        service: 'pluginSecurity',
        ui: '安装弹窗的安全结论',
        order: 10,
    },
    {
        id: 'conflict',
        name: '安装冲突检测',
        nameEn: 'Conflict Detection',
        description: '检查插件与已安装项的 UI 槽位占用、依赖版本、包名撞车，装之前就告诉你会不会打架。',
        descriptionEn: 'Detects UI slot occupancy, dependency version and package-name clashes before install.',
        group: 'safety',
        requires: [],
        rowId: 'hub-ext-conflict',
        entry: 'dsh-plugin-hub/extensions/conflict',
        defaultEnabled: true,
        service: 'pluginConflict',
        ui: '安装前的冲突提示',
        order: 20,
    },
    {
        id: 'quality',
        name: '质量门禁',
        nameEn: 'Quality Gate',
        description: '发布前跑 8 项检查（声明完整、构建产物、README、许可、版本规范等），不过不给发。',
        descriptionEn: 'Runs pre-publish checks (manifest, build output, README, license, versioning) and blocks failures.',
        group: 'safety',
        requires: [],
        rowId: 'hub-ext-quality',
        entry: 'dsh-plugin-hub/extensions/quality',
        defaultEnabled: true,
        service: 'pluginQuality',
        ui: '发布页的质量清单',
        order: 30,
    },
    {
        id: 'trust',
        name: '信任徽章同步',
        nameEn: 'Trust Badge Sync',
        description: '与 dsh-hub-index 信任体系对齐：按仓库活跃度与发布记录同步官方/社区信任等级徽章。',
        descriptionEn: 'Aligns with the dsh-hub-index trust system, syncing official/community trust badges.',
        group: 'safety',
        requires: ['store-db', 'github'],
        rowId: 'hub-ext-trust',
        entry: 'dsh-plugin-hub/extensions/trust',
        defaultEnabled: true,
        service: 'pluginTrust',
        ui: '插件卡片信任徽章',
        order: 40,
    },
    // ── 发布流水线 ──────────────────────────────────────────────────────────
    {
        id: 'publish',
        name: '一键发布',
        nameEn: 'One-click Publish',
        description: 'GitHub 建仓/推送 + npm 发布双通道，发布前自动过安全扫描与质量门禁，全程进度可见。',
        descriptionEn: 'Dual-channel GitHub + npm publishing with automatic security and quality gating.',
        group: 'publish',
        requires: ['security'],
        rowId: 'hub-ext-publish',
        entry: 'dsh-plugin-hub/extensions/publish',
        defaultEnabled: true,
        service: 'pluginPublish',
        ui: '商店「发布」视图',
        order: 10,
    },
    {
        id: 'version-guard',
        name: '版本一致性守卫',
        nameEn: 'Version Consistency Guard',
        description: '发布前对齐 package.json、README 更新日志、profile 安装来源与子插件入口的版本号，防止「包升了文档没升」。',
        descriptionEn: 'Aligns version numbers across package.json, README changelog, profile install spec and subpath entries.',
        group: 'publish',
        requires: [],
        rowId: 'hub-ext-version-guard',
        entry: 'dsh-plugin-hub/extensions/version-guard',
        defaultEnabled: true,
        service: 'pluginVersionGuard',
        ui: '发布页「版本」小节',
        order: 20,
    },
    {
        id: 'changelog',
        name: '更新日志生成',
        nameEn: 'Changelog Drafter',
        description: '从 git 提交历史（按 Conventional Commits 归并）生成 README 风格的更新日志草稿，一键写回。',
        descriptionEn: 'Drafts a README-style changelog from git history using Conventional Commits grouping.',
        group: 'publish',
        requires: [],
        rowId: 'hub-ext-changelog',
        entry: 'dsh-plugin-hub/extensions/changelog',
        defaultEnabled: false,
        service: 'pluginChangelog',
        ui: '发布页「更新日志」按钮',
        order: 30,
    },
    // ── 洞察与内容 ──────────────────────────────────────────────────────────
    {
        id: 'usage',
        name: '用量与费用',
        nameEn: 'Usage & Cost',
        description: '对话视图的「用量」tab：逐请求 token / 缓存命中率图表，按版本化价格表算费用并对比调价前后差额。',
        descriptionEn: 'Conversation "Usage" tab: per-request token and cache-hit charts with dated price-table costing.',
        group: 'insight',
        requires: [],
        rowId: 'hub-ext-usage',
        entry: 'dsh-plugin-hub/extensions/usage',
        defaultEnabled: true,
        service: 'usagePricing',
        ui: '对话视图 tab「用量」',
        order: 10,
    },
    {
        id: 'health',
        name: '插件健康度',
        nameEn: 'Plugin Health',
        description: '按活跃度、发布节奏、社区反馈给插件打分（0-100）与排行，并推导信任等级。',
        descriptionEn: 'Scores and ranks plugins (0-100) by activity, release cadence and community signal.',
        group: 'insight',
        requires: [],
        rowId: 'hub-ext-health',
        entry: 'dsh-plugin-hub/extensions/health',
        defaultEnabled: true,
        service: 'pluginHealth',
        ui: '商店「健康度」视图',
        order: 20,
    },
    {
        id: 'update-check',
        name: '版本更新检测',
        nameEn: 'Update Check',
        description: '对比已安装插件的本地版本与 npm/GitHub 最新版本，给出「可升级」清单与一键升级入口。',
        descriptionEn: 'Compares installed plugin versions against npm/GitHub latest and surfaces an upgrade list.',
        group: 'insight',
        requires: ['store-db'],
        rowId: 'hub-ext-update-check',
        entry: 'dsh-plugin-hub/extensions/update-check',
        defaultEnabled: true,
        service: 'pluginUpdateCheck',
        ui: '商店「可更新」筛选',
        order: 30,
    },
    {
        id: 'dependency-graph',
        name: '依赖影响图谱',
        nameEn: 'Dependency Graph',
        description: '把插件间的依赖与被依赖关系画成影响图：升级/卸载前先看清会牵连谁。',
        descriptionEn: 'Renders the dependency/dependent graph so upgrades and removals show their blast radius.',
        group: 'insight',
        requires: ['store-db'],
        rowId: 'hub-ext-dependency-graph',
        entry: 'dsh-plugin-hub/extensions/dependency-graph',
        defaultEnabled: true,
        service: 'pluginDepGraph',
        ui: '插件详情的「影响图」',
        order: 40,
    },
    {
        id: 'baike',
        name: '插件百科',
        nameEn: 'Plugin Wiki',
        description: '把插件元数据、README 要点、用法与相关插件汇总成可检索的百科条目，回答「这东西到底干嘛的」。',
        descriptionEn: 'Aggregates metadata, README highlights and related plugins into searchable wiki entries.',
        group: 'insight',
        requires: ['store-db'],
        rowId: 'hub-ext-baike',
        entry: 'dsh-plugin-hub/extensions/baike',
        defaultEnabled: false,
        service: 'pluginWiki',
        ui: '商店「百科」视图',
        order: 50,
    },
    {
        id: 'skill-store',
        name: '技能商店',
        nameEn: 'Skill Store',
        description: '跨生态收集 SKILL.md 技能包（含 WorkBuddy / Claude 风格），检索后一键装到本地技能目录。',
        descriptionEn: 'Collects SKILL.md packages across ecosystems with search and one-click local install.',
        group: 'insight',
        requires: [],
        rowId: 'hub-ext-skill-store',
        entry: 'dsh-plugin-hub/extensions/skill-store',
        defaultEnabled: false,
        service: 'skillStore',
        ui: '商店「技能」视图',
        order: 60,
    },
    // ── 运维 ────────────────────────────────────────────────────────────────
    {
        id: 'backup',
        name: '备份与回滚',
        nameEn: 'Backup & Rollback',
        description: '定期打快照（数据库 + 开关 + 配置），升级翻车时可一键回到上一个可用状态。',
        descriptionEn: 'Snapshots the database, toggles and config so a bad upgrade can roll back in one click.',
        group: 'ops',
        requires: [],
        rowId: 'hub-ext-backup',
        entry: 'dsh-plugin-hub/extensions/backup',
        defaultEnabled: true,
        service: 'pluginBackup',
        ui: '设置页「备份」小节',
        order: 10,
    },
    {
        id: 'diagnostics',
        name: '诊断报告导出',
        nameEn: 'Diagnostics Export',
        description: '一键打包环境信息、插件清单、加载状态与近期审计，出问题时把它丢给维护者。',
        descriptionEn: 'Bundles environment info, plugin inventory, loader states and recent audit into one report.',
        group: 'ops',
        requires: [],
        rowId: 'hub-ext-diagnostics',
        entry: 'dsh-plugin-hub/extensions/diagnostics',
        defaultEnabled: false,
        service: 'pluginDiagnostics',
        ui: '设置页「导出诊断」',
        order: 20,
    },
];
/** 按 id 取描述符。 */
export function pluginById(id) {
    return HUB_PLUGINS.find((p) => p.id === id);
}
/** 按分组取描述符（组内按 order）。 */
export function pluginsInGroup(group) {
    return HUB_PLUGINS.filter((p) => p.group === group).sort((a, b) => a.order - b.order);
}
/** 谁依赖了我（反向边，供 UI 提示"关掉会影响谁"）。 */
export function dependentsOf(id) {
    return HUB_PLUGINS.filter((p) => p.requires.includes(id));
}
/** hub 状态目录（与商店数据库同目录，按需创建）。 */
export function pluginStateDir(home = resolveDshHome()) {
    const dir = join(home, 'storages', 'plugin-store');
    if (!existsSync(dir))
        mkdirSync(dir, { recursive: true });
    return dir;
}
/** 用户开关文件。 */
export function pluginOverridesFile(home = resolveDshHome()) {
    return join(pluginStateDir(home), 'plugins.json');
}
/** 插件上报的状态文件。 */
export function pluginStatusFile(home = resolveDshHome()) {
    return join(pluginStateDir(home), 'plugins-status.json');
}
/** 读一个 JSON 文件，坏了就当作空（插件不该因为状态文件损坏而崩）。 */
function readJson(file) {
    try {
        if (!existsSync(file))
            return null;
        return JSON.parse(readFileSync(file, 'utf8'));
    }
    catch {
        return null;
    }
}
/**
 * 读用户的开关覆盖（缺省 = 跟随描述符默认值）。
 * 兼容读取 0.2 早期的 `extensions.json`：老用户不必重新配置一遍。
 */
export function readOverrides(home = resolveDshHome()) {
    const value = readJson(pluginOverridesFile(home));
    if (value !== null && typeof value === 'object')
        return value;
    const legacy = readJson(join(pluginStateDir(home), 'extensions.json'));
    return legacy !== null && typeof legacy === 'object' ? legacy : {};
}
/** 设置一个插件的开关（只写覆盖值，保持其它条目不变）。 */
export function writeOverride(id, enabled, home = resolveDshHome()) {
    const current = readOverrides(home);
    current[id] = enabled;
    writeFileSync(pluginOverridesFile(home), `${JSON.stringify(current, null, 2)}\n`, 'utf8');
}
/** 该插件自身的开关值（覆盖值优先，其次描述符默认值；不含依赖判定）。 */
export function isPluginEnabled(id, home = resolveDshHome()) {
    const override = readOverrides(home)[id];
    if (typeof override === 'boolean')
        return override;
    return pluginById(id)?.defaultEnabled ?? false;
}
/**
 * 判定一个内建插件此刻能不能跑。
 *
 * 依赖判定是**递归的**：A 依赖 B、B 依赖 C，若 C 关了，B 与 A 都会 blocked
 * （B 先被判定为不可跑，A 随之被判定为缺 B）。这样"关一个底座"能连带停掉整条链，
 * UI 上看到的 blocked 原因也会指向最初被关的那个。
 */
export function resolveActivation(id, home = resolveDshHome()) {
    const self = pluginById(id);
    if (self === undefined) {
        return { runnable: false, enabled: false, missing: [], reason: `名册中没有 ${id}` };
    }
    const enabled = isPluginEnabled(id, home);
    if (!enabled) {
        return { runnable: false, enabled: false, missing: [], reason: `用户在设置中关闭了「${self.name}」` };
    }
    const missing = [];
    for (const depId of self.requires) {
        const dep = pluginById(depId);
        if (dep === undefined)
            continue;
        const depDecision = resolveActivation(depId, home);
        if (!depDecision.runnable)
            missing.push(dep);
    }
    if (missing.length > 0) {
        return {
            runnable: false,
            enabled: true,
            missing,
            reason: `依赖未启用：${missing.map((d) => `${d.name}(${d.id})`).join('、')}`,
        };
    }
    return { runnable: true, enabled: true, missing: [], reason: '依赖齐备' };
}
/** 读全部插件上报的状态（兼容 0.2 早期的 extensions-status.json）。 */
export function readStatuses(home = resolveDshHome()) {
    const value = readJson(pluginStatusFile(home));
    if (value !== null && typeof value === 'object')
        return value;
    const legacy = readJson(join(pluginStateDir(home), 'extensions-status.json'));
    return legacy !== null && typeof legacy === 'object' ? legacy : {};
}
/**
 * 上报一个插件的状态（浅合并，保留其它插件的条目）。
 * 插件不应当让状态写入失败影响自身装配，因此调用方可以忽略异常。
 */
export function writeStatus(id, phase, detail = '', home = resolveDshHome()) {
    const current = readStatuses(home);
    current[id] = { phase, detail, at: Date.now() };
    writeFileSync(pluginStatusFile(home), `${JSON.stringify(current, null, 2)}\n`, 'utf8');
}
