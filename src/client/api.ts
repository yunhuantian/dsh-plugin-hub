/**
 * Client facade over the `pluginStore` Typert Remote + tiny UI state stores.
 * All calls return the unwrapped value and throw on an error envelope.
 */
import { TYPERT_REMOTE } from '../contracts/remote.js';

export type Category = 'tool' | 'agent' | 'ui' | 'data' | 'vision' | 'docs' | 'memory' | 'usage' | 'notify' | 'dev' | 'chat' | 'hub' | 'hub-ext' | 'other';

export interface PluginSummary {
  packageName: string;
  repoFullName: string;
  name: string;
  shortDescription: string;
  developer: string;
  iconUrl: string | null;
  categories: Category[];
  version: string | null;
  stars: number;
  downloads: number;
  rating: number;
  ratingCount: number;
  installed: boolean;
  enabled: boolean | null;
  updatedAt: string | null;
  /** Download source: 'npm' (registry, direct) or 'github' (clone, may need proxy). */
  source: 'npm' | 'github';
  /** Whether the package is published on npm (can install via npm registry). */
  hasNpm: boolean;
  /** Whether the package has a GitHub repository (can install via git clone). */
  hasGit: boolean;
  /** Trust level from the ecosystem index; null = unknown. */
  trustLevel?: string | null;
  /** Estimated health snapshot (0-100) — for list sorting. */
  health: number;
}

export interface VersionRow {
  version: string;
  publishedAt: string | null;
  changelog: string | null;
  tagName: string | null;
}

export interface DepEdge {
  name: string;
  version: string | null;
  kind: 'runtime' | 'dev' | 'peer';
}

export interface ReviewRow {
  id: number;
  actor: string;
  score: number;
  comment: string;
  createdAt: string;
}

export interface DependentRow {
  packageName: string;
  name: string;
  version: string | null;
  rating: number;
  installed: boolean;
}

export interface PluginDetail extends PluginSummary {
  fullDescription: string;
  usage: string;
  topics: string[];
  license: string | null;
  homepage: string | null;
  repoUrl: string;
  defaultBranch: string;
  screenshots: string[];
  versions: VersionRow[];
  dependencies: DepEdge[];
  dependents: DependentRow[];
  reviews: ReviewRow[];
  /** Locally installed version (null when not installed). */
  installedVersion?: string | null;
  /** True when installed and an update is available. */
  hasUpdate?: boolean;
}

export interface OpResult {
  ok: boolean;
  message: string;
  detail: string | null;
}

export interface InstallReceipt extends OpResult {
  packageName: string;
  restartRequired: boolean;
  reloadRequired: boolean;
  /** Environment variables the plugin reads that the user may need to configure. */
  requiredEnv?: string[];
}

export interface SyncStatus {
  state: 'idle' | 'syncing' | 'error';
  lastSyncAt: string | null;
  lastSyncTotal: number;
  lastError: string | null;
  nextSyncAt: string | null;
  scheduleHours: number;
}

export interface StoreSettings {
  tokenConfigured: boolean;
  tokenMasked: string;
  scheduleHours: number;
  profileName: string;
  rateLimitRemaining: number | null;
  dbPath: string;
  pluginCount: number;
}

export interface AuditRow {
  id: number;
  actor: string;
  action: string;
  target: string;
  result: string;
  message: string;
  createdAt: string;
}

export interface AuditPage {
  total: number;
  rows: AuditRow[];
}

export interface InstalledPlugin {
  packageName: string;
  entryId: string;
  name: string;
  /** 'system' (Loader infra), 'download' (registry/git installs), or 'own' (local file:/link: — user-created plugins). */
  category: 'system' | 'download' | 'own';
  /** Sub-group within the parent category. */
  group: string;
  groupLabel: string;
  enabled: boolean;
  phase: string | null;
  managed: boolean;
  /** Infrastructure entries that must not be disabled from the UI. */
  protected: boolean;
  /** Alias of category. */
  type: string;
  /** Local install path for 自创作插件; null otherwise. */
  localPath: string | null;
  /** Whether the local plugin has been published (npm exists / repository declared). */
  published: boolean;
  /** Public repository URL for published local plugins; null otherwise. */
  repoUrl: string | null;
  /** Installed version read from the local package.json. */
  version?: string | null;
  /** Latest known version from the store mirror (npm / GitHub release). */
  latestVersion?: string | null;
  /** True when the installed version is older than the latest known one. */
  hasUpdate?: boolean;
}

export interface CategoryToggleResult {
  ok: boolean;
  message: string;
  detail: string | null;
  changed: number;
  skipped: Array<{ packageName: string; message: string }>;
}

export interface ScaffoldInfo {
  templateRepo: string;
  templateUrl: string;
  docsUrl: string;
  guide: string;
  commands: string[];
  categories: string[];
}

export interface ListFilters {
  category?: Category | null;
  query?: string | null;
  sort?: 'random' | 'health' | 'stars' | 'rating' | 'downloads' | 'updated' | 'name' | null;
  installedOnly?: boolean | null;
  limit?: number | null;
  offset?: number | null;
}

export interface RemoteApi {
  list(filters: ListFilters): Promise<{ total: number; plugins: PluginSummary[] }>;
  detail(packageName: string): Promise<PluginDetail>;
  syncNow(): Promise<OpResult>;
  syncStatus(): Promise<SyncStatus>;
  settings(): Promise<StoreSettings>;
  setGithubToken(token: string, actor: string): Promise<OpResult>;
  clearGithubToken(actor: string): Promise<OpResult>;
  setSchedule(hours: number, actor: string): Promise<OpResult>;
  install(packageName: string, actor: string, source?: 'auto' | 'npm' | 'git'): Promise<InstallReceipt>;
  installProgress(packageName: string): Promise<{ phase: string; percent: number | null; detail: string; updatedAt: number } | null>;
  /** Locally-developed plugins available for one-click publishing. */
  myPlugins(): Promise<Array<{
    packageName: string; name: string; localPath: string | null; published: boolean;
    repoUrl: string | null; version: string | null; description: string | null; pkgName: string;
  }>>;
  /** One-click publish to GitHub / npm. */
  publish(payload: {
    packageName: string; target: 'github' | 'npm' | 'both';
    githubToken?: string; npmToken?: string;
    visibility: 'public' | 'private'; description?: string; topics?: string[];
    writeReadme?: boolean;
  }, actor: string): Promise<{
    ok: boolean; message: string; detail: string | null; repoUrl: string | null; npmUrl: string | null; packageName: string;
    security?: { level: 'clean' | 'warning' | 'malicious'; findings: Array<{ severity: 'critical' | 'warning'; rule: string; target: string; detail: string }> };
  }>;
  publishProgress(packageName: string): Promise<{ phase: string; percent: number | null; detail: string; updatedAt: number } | null>;
  uninstall(packageName: string, actor: string): Promise<InstallReceipt>;
  setEnabled(packageName: string, enabled: boolean, actor: string): Promise<InstallReceipt>;
  setCategoryEnabled(category: 'system' | 'download' | 'own', enabled: boolean, actor: string): Promise<CategoryToggleResult>;
  installed(): Promise<InstalledPlugin[]>;
  rate(packageName: string, score: number, comment: string, actor: string): Promise<OpResult>;
  listReviews(packageName: string): Promise<ReviewRow[]>;
  /** GitHub issues of a plugin's repo (read-only discussion board). */
  issues(packageName: string): Promise<Array<{ number: number; title: string; state: 'open' | 'closed'; comments: number; createdAt: string | null; user: string | null }>>;
  audit(query: { action?: string | null; actor?: string | null; target?: string | null; limit?: number | null; offset?: number | null }): Promise<AuditPage>;
  dependencyGraph(packageName: string): Promise<{ root: string; rootName: string; dependencies: DepEdge[]; dependents: DependentRow[] }>;
  scaffold(): Promise<ScaffoldInfo>;
  /** Encyclopedia directory: mirrored plugins + external catalog entries. */
  wikiHub(filters?: { query?: string; category?: string; source?: string; limit?: number; offset?: number }): Promise<{
    total: number;
    items: Array<{
      packageName: string; repoFullName: string; name: string; developer: string; shortDescription: string;
      categories: string[]; trustLevel: string | null; health: number | null; source: 'mirror' | 'catalog';
    }>;
  }>;
  /** Encyclopedia entry for one plugin (structured knowledge page). */
  wiki(packageName: string): Promise<{
    packageName: string; name: string; developer: string; repoFullName: string | null;
    categories: string[]; description: string; shortDescription: string; trustLevel: string | null;
    license: string | null; homepage: string | null; npmInstall: string; gitInstall: string | null;
    usage: string; highlights: string; bestPractices: string; versionCount: number; latestVersion: string | null;
    dependencies: Array<{ name: string; type: string }>;
    related: Array<{ packageName: string; name: string; developer: string; shortDescription: string }>;
  }>;
  /** Health leaderboard — top 20 by score, with last-sync time. */
  healthHub(): Promise<{
    updatedAt: string | null;
    items: Array<{
      packageName: string; name: string; developer: string;
      health: number; level: 'healthy' | 'attention' | 'stale'; rank: number;
      lastUpdate: string | null; downloads: number; stars: number; versionCount: number; categories: string[];
    }>;
  }>;
  /** Per-plugin health detail: score breakdown + release timeline + download trend. */
  healthDetail(packageName: string): Promise<{
    packageName: string; name: string; developer: string; repoFullName: string | null;
    health: number; level: 'healthy' | 'attention' | 'stale';
    breakdown: { activity: number; distribution: number; bugs: number; community: number; releases: number };
    lastUpdate: string | null; downloads: number; stars: number; openIssues: number | null;
    timeline: Array<{ version: string; publishedAt: string | null }>;
    downloadTrend: Array<{ date: string; downloads: number }>;
    commitActivity: Array<{ date: string; count: number }>;
    starGains: Array<{ date: string; count: number }>;
    /** Whether a GitHub token is configured (star timestamps need it). */
    hasToken: boolean;
  }>;
  /** Collected skills (conversation-callable SKILL.md) with installed state. */
  skillList(filters?: { query?: string | null; category?: string | null; platform?: string | null; limit?: number | null }): Promise<{
    total: number;
    items: Array<{ id: string; name: string; description: string; descriptionZh: string; version: string; author: string; repoFullName: string; categories: string[]; platform: string; installed: boolean }>;
  }>;
  /** Full SKILL.md content for the detail view. */
  skillDetail(id: string): Promise<{
    id: string; name: string; description: string; descriptionZh: string; version: string;
    author: string; repoFullName: string; skillPath: string; categories: string[]; platform: string;
    content: string; installed: boolean; installedDir: string | null;
  }>;
  skillInstall(id: string, actor: string): Promise<OpResult>;
  skillUninstall(name: string, actor: string): Promise<OpResult>;
  /** Locally installed skills (from $DSH_HOME/skills + ~/.agents/skills). */
  skillInstalled(): Promise<Array<{ name: string; dir: string; description: string; version: string }>>;
  /** dsh-bench 跑分（按插件名；报告缺失时 found=false）。 */
  bench(packageName: string): Promise<{
    found: boolean;
    updatedAt: string | null;
    ecosystemAvg: number | null;
    entry: Record<string, unknown> | null;
  }>;
  /** 在 dsh 内立即跑分（Mock 零 token，调用 dsh-bench CLI）。 */
  benchRun(packageName: string, mode?: 'mock' | 'e2e'): Promise<{
    ok: boolean;
    message: string;
    detail: { found: boolean; updatedAt: string | null; ecosystemAvg: number | null; entry: Record<string, unknown> | null } | null;
  }>;
  /** dsh-connector 状态（插件是否安装 + 平台配置/运行状态）。 */
  connectorStatus(): Promise<{ installed: boolean; config: Record<string, unknown>; status: Record<string, unknown> }>;
  /** dsh-connector 平台配置保存（重启 dsh 生效）。 */
  connectorConfigSet(platform: string, payload: Record<string, unknown>): Promise<OpResult>;
}

export function unwrap<T>(result: { ok: true; value: T } | { ok: false; error: { code: string; message: string } }): T {
  if (result.ok) return result.value;
  throw new Error(`${result.error.code}: ${result.error.message}`);
}

/** Wrap a raw remote namespace into the typed facade. */
export function makeApi(remote: Record<string, any>): RemoteApi {
  const r = remote.pluginStore;
  return {
    list: async (filters) => unwrap(await r.list(filters)),
    detail: async (packageName) => unwrap(await r.detail(packageName)),
    syncNow: async () => unwrap(await r.syncNow()),
    syncStatus: async () => unwrap(await r.syncStatus()),
    settings: async () => unwrap(await r.settings()),
    setGithubToken: async (token, actor) => unwrap(await r.setGithubToken(token, actor)),
    clearGithubToken: async (actor) => unwrap(await r.clearGithubToken(actor)),
    setSchedule: async (hours, actor) => unwrap(await r.setSchedule(hours, actor)),
    install: async (packageName, actor, source) => unwrap(await r.installPlugin(packageName, actor, source)),
    installProgress: async (packageName) => unwrap(await r.installProgress(packageName)),
    myPlugins: async () => unwrap(await r.myPlugins()),
    publish: async (payload, actor) => unwrap(await r.publish(payload, actor)),
    publishProgress: async (packageName) => unwrap(await r.publishProgress(packageName)),
    uninstall: async (packageName, actor) => unwrap(await r.uninstall(packageName, actor)),
    setEnabled: async (packageName, enabled, actor) => unwrap(await r.setEnabled(packageName, enabled, actor)),
    setCategoryEnabled: async (category, enabled, actor) => unwrap(await r.setCategoryEnabled(category, enabled, actor)),
    installed: async () => unwrap(await r.installed()),
    rate: async (packageName, score, comment, actor) => unwrap(await r.rate(packageName, score, comment, actor)),
    listReviews: async (packageName) => unwrap(await r.listReviews(packageName)),
    issues: async (packageName) => unwrap(await r.issues(packageName)),
    audit: async (query) => unwrap(await r.audit(query)),
    dependencyGraph: async (packageName) => unwrap(await r.dependencyGraph(packageName)),
    scaffold: async () => unwrap(await r.scaffold()),
    healthHub: async () => unwrap(await r.healthHub()),
    healthDetail: async (packageName) => unwrap(await r.healthDetail(packageName)),
    wikiHub: async (filters) => unwrap(await r.wikiHub(filters ?? {})),
    wiki: async (packageName) => unwrap(await r.wiki(packageName)),
    skillList: async (filters) => unwrap(await r.skillList(filters ?? {})),
    skillDetail: async (id) => unwrap(await r.skillDetail(id)),
    skillInstall: async (id, actor) => unwrap(await r.skillInstall(id, actor)),
    skillUninstall: async (name, actor) => unwrap(await r.skillUninstall(name, actor)),
    skillInstalled: async () => unwrap(await r.skillInstalled()),
    bench: async (packageName) => unwrap(await r.bench(packageName)),
    benchRun: async (packageName, mode) => unwrap(await r.benchRun(packageName, mode ?? 'mock')),
    connectorStatus: async () => unwrap(await r.connectorStatus()),
    connectorConfigSet: async (platform, payload) => unwrap(await r.connectorConfigSet(platform, payload)),
  };
}

export { TYPERT_REMOTE };

// ---- tiny shared UI state (modal open + actor) ------------------------------

type Listener = () => void;

function createStore<T>(initial: T) {
  let value = initial;
  const listeners = new Set<Listener>();
  return {
    getSnapshot: () => value,
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    set: (next: T) => {
      value = next;
      for (const l of listeners) l();
    },
  };
}

/** Whether the store modal is open (shared between the sidebar button and the settings section). */
export const openStoreStore = createStore(false);
export const openStore = () => openStoreStore.set(true);
export const closeStore = () => openStoreStore.set(false);

/** Selected view inside the modal; detail navigation is local to the app. */
export const viewStore = createStore<'discover' | 'wiki' | 'skill' | 'installed' | 'publish' | 'health' | 'scaffold' | 'audit' | 'settings'>('discover');
export const setView = (view: 'discover' | 'wiki' | 'skill' | 'installed' | 'publish' | 'health' | 'scaffold' | 'audit' | 'settings') => viewStore.set(view);

const ACTOR_KEY = 'dsh.pluginStore.actor';

/** Operator display name used for audit attribution (persisted locally). */
export function getActor(): string {
  return (typeof localStorage !== 'undefined' ? localStorage.getItem(ACTOR_KEY) : null) ?? '';
}

export function setActor(name: string): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem(ACTOR_KEY, name.trim().slice(0, 64));
}

/** Readable form used by the settings view. */
export function actorDisplay(): string {
  return getActor() || 'anonymous（未设置显示名，将以机器标识记录）';
}

// ---- formatting helpers -----------------------------------------------------

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${(n / 1000).toFixed(1)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(2)}k`;
  return String(n);
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}
