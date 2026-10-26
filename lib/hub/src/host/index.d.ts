/**
 * dsh-plugin-hub host service: the Typert Remote surface the web client
 * talks to. Owns the local database (mirror cache + ratings + audit log), the
 * GitHub data source with scheduled mirror sync, and the one-click
 * install/uninstall/enable/disable pipeline.
 */
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import { type StoreDB } from './store-db.js';
import { GitHubClient } from './github.js';
import { type ProfileInfo } from './installer.js';
/**
 * 判断一个 Loader 条目 / 依赖名是否归属 hub 包。
 *
 * 命中两种写法：
 *   - `dsh-plugin-hub`              —— 商店本体
 *   - `dsh-plugin-hub/extensions/*` —— 包内子插件（一个包、多个内部插件）
 */
export declare function hubOwnedOf(packageName: string): boolean;
/** 包内子插件的短 id：`dsh-plugin-hub/extensions/usage` → `usage`；本体返回 null。 */
export declare function hubSubIdOf(packageName: string): string | null;
/** `file:` / `link:` / `workspace:` 安装 = 本地自创作（与依赖循环口径一致）。 */
export declare function isLocalSpec(spec: unknown): boolean;
/** Map a Loader entry id to a system sub-group bucket. */
export declare function systemGroupOf(entryId: string, packageName: string): string;
export interface ListFilters {
    category?: 'tool' | 'agent' | 'ui' | 'data' | 'other' | null;
    query?: string | null;
    sort?: 'random' | 'health' | 'stars' | 'rating' | 'downloads' | 'updated' | 'name' | null;
    installedOnly?: boolean | null;
    limit?: number | null;
    offset?: number | null;
}
export interface AuditQueryInput {
    action?: string | null;
    actor?: string | null;
    target?: string | null;
    limit?: number | null;
    offset?: number | null;
}
/** The long-lived host service behind `ctx.pluginStore`. */
export declare class PluginStoreService extends TypertRemoteService {
    static inject: string[];
    db: StoreDB;
    github: GitHubClient;
    profile: ProfileInfo;
    /** 保存自己的 Context：基类 Service 已有一个公开 `ctx`，这里必须换名避免覆盖。 */
    private appCtx;
    private syncing;
    private timer;
    private lastSyncError;
    private npmAvailable;
    /** Live install progress per package (polled by the UI). */
    private installProgressMap;
    /** 一键安装整合包的进行中任务（按来源 id）。串行安装，UI 轮询 modpackStatus。 */
    private modpackJobs;
    /** 一键安装整合包的完成态（留 10 分钟给 UI 查询）。 */
    private modpackDone;
    /** Live publish progress per package (polled by the UI). */
    private publishProgressMap;
    /** Short-TTL cache of installed() — avoids full per-package disk I/O on
     * every UI refresh (require.resolve + readFileSync per dependency). */
    private installedCache;
    /** Per-repo GitHub issues cache (5 min TTL) for the detail view. */
    private issuesCache;
    /** Installed package → its package.json repository owner/name (null = unknown).
     * Built alongside the installed() cache; used to disambiguate same-name
     * plugins from different repositories. */
    private installedRepos;
    /** Write-op rate limiter (per action, 60s window) — application-layer guard
     * against request flooding; the Host allowlist lives in the dsh gateway. */
    private writeThrottle;
    /** npm daily download trend cache (6h TTL) per package. */
    private trendCache;
    /** Per-repo activity caches: commit days (`c:repo`) and star gains (`s:repo`). */
    private activityCache;
    /** Returns a message when the action is throttled, null when allowed. */
    private throttle;
    constructor(ctx: any, config?: Record<string, unknown>);
    private get loader();
    private scheduleTimer;
    /**
     * 是否同步外部社区仓库（信任徽章索引 + 百科目录）。
     *
     * 默认 **关**：这两条链路的数据来自别人维护的仓库，质量与可用性都不由我们控制，
     * 失败时只在 meta 里留个错误串、用户看不见原因。想用的人显式写 `external_sync=1`。
     * 关掉不影响商店本身 —— 镜像同步、安装、健康度都走自己的数据。
     */
    private externalSyncEnabled;
    /** Kick off a background mirror sync (fire-and-forget from the RPC side). */
    private runSync;
    private appendAudit;
    private installedPackageNames;
    private enabledOf;
    /** True when the plugin row is installed, with repository disambiguation:
     * same-name plugins from different repos must match by `repository` field. */
    private isInstalled;
    private project;
    private specFor;
    list(filters?: ListFilters): Promise<Record<string, unknown>>;
    detail(packageName: string): Promise<Record<string, unknown>>;
    /** Version of an installed package (null when not installed). */
    private installedVersionOf;
    private installedHasUpdate;
    /** Health overview for every mirrored plugin, sorted by score. */
    healthHub(): Promise<Record<string, unknown>>;
    /** Per-plugin health detail: score breakdown + release timeline + npm
     * download trend + open issue count (live). */
    healthDetail(packageName: string): Promise<Record<string, unknown>>;
    /** Per-day commit counts for the last 60 days (6h cache). */
    private commitActivityOf;
    /** Per-day star gains for a repo (6h cache). */
    private starGainsOf;
    /** Encyclopedia directory: mirrored plugins + external catalog entries. */
    wikiHub(raw?: Record<string, unknown>): Promise<Record<string, unknown>>;
    /** Encyclopedia entry for one plugin: structured knowledge page. */
    wiki(packageName: string): Promise<Record<string, unknown>>;
    /** Daily npm download counts for the last 90 days (6h cache). */
    private npmDownloadTrend;
    /** Skill discovery dirs in $DSH_HOME (user-level, available in every project's conversation). */
    private skillHomeDirs;
    private installedSkills;
    /** All collected skills with installed state. */
    skillList(filters?: {
        query?: string | null;
        category?: string | null;
        platform?: string | null;
        limit?: number | null;
    }): Promise<Record<string, unknown>>;
    /** Full SKILL.md content for the detail view. */
    skillDetail(id: string): Promise<Record<string, unknown>>;
    /** Install a skill: copy SKILL.md (+ small sibling files) into $DSH_HOME/skills/<name>/. */
    skillInstall(id: string, actorRaw: string): Promise<Record<string, unknown>>;
    /** Remove an installed skill directory. */
    skillUninstall(name: string, actorRaw: string): Promise<Record<string, unknown>>;
    /** Locally installed skills (from $DSH_HOME/skills + ~/.agents/skills). */
    skillInstalled(): Promise<Array<Record<string, unknown>>>;
    /** dsh-bench 跑分（独立项目产出，按插件名索引；报告缺失/失败优雅降级）。 */
    bench(packageName: string): Promise<Record<string, unknown>>;
    /** 在 dsh 内触发「立即跑分」：调用 dsh-bench CLI 现场跑 Mock（零 token）。 */
    benchRun(packageName: string, mode?: 'mock' | 'e2e'): Promise<Record<string, unknown>>;
    private skillSiblings;
    /**
     * 注册表里的全部来源。`kind` 由调用方过滤（0 列表 / 1 整合包）：
     * 商店两区只看 kind=0，整合包页只看 kind=1。
     */
    listSources(): Promise<Record<string, unknown>>;
    /**
     * 添加一份列表来源：URL / 上传文件 / 粘贴文本皆可。
     * 容器类型与 `expect` 不符会直接报错（两个页面各管各的，不互相污染）。
     */
    addListSource(input: Record<string, unknown>): Promise<Record<string, unknown>>;
    /** 添加一个自动爬取的来源（GitHub 用户 / 组织 / 仓库 / topic）。 */
    addCrawlSource(spec: string, label?: string): Promise<Record<string, unknown>>;
    removeListSource(id: string): Promise<Record<string, unknown>>;
    /**
     * 刷新一份远程来源：重新下载、原地覆盖，来源 id 不变。
     *
     * 数据与代码分离之后必须有这一步 —— 否则「导入」只是拍一张快照，
     * 作者更新了列表或整合包，用户手里还是导入那天的旧副本，
     * 只能靠 hub 发新版本才能让数据变，等于没分开。
     *
     * 本地上传 / 粘贴得来的来源没有地址，直接说明原因，不做猜测。
     */
    refreshListSource(id: string): Promise<Record<string, unknown>>;
    /**
     * 按资源清单（`sources.json`）一次注册多份来源。
     *
     * 数据单独放在一个仓库时，最省事的用法是给对方**一个**地址：
     * 清单里的 `file` 按清单自身位置解析成绝对地址，逐份走 addListSource。
     * 以后新增列表或整合包只改清单，hub 不用发版。
     *
     * 单份失败不影响其余 —— 返回里分开列，不吞错也不整体回滚。
     */
    importSourceBundle(url: string): Promise<Record<string, unknown>>;
    /**
     * 认证一份列表：逐个插件记录「当前版本」。
     *
     * 认证是版本级事实：插件升级后版本对不上，UI 显示「有过认证」而不是「已认证」。
     * 这样不需要每次发版都重签，也不会让旧认证冒充当前版本。
     */
    certifyList(id: string): Promise<Record<string, unknown>>;
    /** 读取一个来源的条目（分页 + 关键字过滤）。 */
    listSourceEntries(id: string, query?: string, limit?: number, offset?: number): Promise<Record<string, unknown>>;
    /**
     * 从列表条目一键安装：条目自带 tarball / npm / GitHub 地址时直接用该地址装，
     * 已经在镜像库里的包走原有安装链路（它会挑 npm 还是 git）。
     */
    installFromSource(sourceId: string, name: string, actorRaw: string): Promise<Record<string, unknown>>;
    /** 一键安装整合包：后台串行安装（并发写 profile 的 node_modules 会互相踩），UI 轮询 modpackStatus。 */
    installModpack(sourceId: string, actorRaw: string): Promise<Record<string, unknown>>;
    private runModpackInstall;
    modpackStatus(sourceId: string): Promise<Record<string, unknown>>;
    /** 读来源文件的署名元数据（展示用；信任判断不在这一层）。整合包页用它显示简介。 */
    sourceMeta(sourceId: string): Promise<Record<string, unknown>>;
    syncNow(): Promise<Record<string, unknown>>;
    syncStatus(): Promise<Record<string, unknown>>;
    settings(): Promise<Record<string, unknown>>;
    setGithubToken(token: string, actorRaw: string): Promise<Record<string, unknown>>;
    clearGithubToken(actorRaw: string): Promise<Record<string, unknown>>;
    setSchedule(hours: number, actorRaw: string): Promise<Record<string, unknown>>;
    installPlugin(packageName: string, actorRaw: string, sourceRaw?: string): Promise<Record<string, unknown>>;
    /** Polled by the UI to render the install progress bar. Returns null when no
     * install is in flight for this package. */
    installProgress(packageName: string): Promise<Record<string, unknown> | null>;
    /** Issues of a plugin's GitHub repo (read-only, 5-min cache). */
    issues(packageName: string): Promise<Array<Record<string, unknown>>>;
    /** Locally-developed plugins (自创作分类) with their package.json, ready to publish. */
    myPlugins(): Promise<Array<Record<string, unknown>>>;
    /** Polled by the UI during a publish. Returns null when no publish is in flight. */
    publishProgress(packageName: string): Promise<Record<string, unknown> | null>;
    /** One-click publish of a locally-developed plugin to GitHub and/or npm. */
    publish(raw: Record<string, unknown>, actorRaw: string): Promise<Record<string, unknown>>;
    uninstall(packageName: string, actorRaw: string): Promise<Record<string, unknown>>;
    setEnabled(packageName: string, enabled: boolean, actorRaw: string): Promise<Record<string, unknown>>;
    private waitForEntry;
    installed(): Promise<Array<Record<string, unknown>>>;
    setCategoryEnabled(category: string, enabled: boolean, actorRaw: string): Promise<Record<string, unknown>>;
    rate(packageName: string, score: number, comment: string, actorRaw: string): Promise<Record<string, unknown>>;
    listReviews(packageName: string): Promise<Array<Record<string, unknown>>>;
    audit(query?: AuditQueryInput): Promise<Record<string, unknown>>;
    dependencyGraph(packageName: string): Promise<Record<string, unknown>>;
    /**
     * hub 内建插件名册 + 实时状态（0.2 的「一个包、多个内部插件」）。
     *
     * 数据来源四处合一：
     *   - `HUB_PLUGINS`：静态名册（包内事实，编译期确定）
     *   - `plugins.json`：用户开关（本 Remote 与插件同时读同一份）
     *   - `plugins-status.json`：各插件自己上报的运行阶段
     *   - loader 里对应行的真实阶段
     * 于是 UI 能区分「关掉了」「依赖没开让位了」「开了但没起来」三种情况。
     */
    extensions(): Promise<Record<string, unknown>>;
    /**
     * 开关一个内建插件。写入 `plugins.json`（插件启动时读同一份），
     * 因此**重启 dsh 后生效** —— 与 harness 自身的插件开关语义一致。
     */
    extensionSet(id: string, enabled: boolean): Promise<Record<string, unknown>>;
    /**
     * 版本化价格表快照 —— 「当时价 vs 现价」的口径来源。
     * 单独开这个 Remote，是为了让其它插件复用同一份价格表而不必各自硬编码单价。
     */
    pricingTable(): Promise<Record<string, unknown>>;
    scaffold(): Promise<Record<string, unknown>>;
}
export default PluginStoreService;
