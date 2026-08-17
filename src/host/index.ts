/**
 * dsh-plugin-hub host service: the Typert Remote surface the web client
 * talks to. Owns the local database (mirror cache + ratings + audit log), the
 * GitHub data source with scheduled mirror sync, and the one-click
 * install/uninstall/enable/disable pipeline.
 */
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { storeDB, type StoreDB, type PluginRow, resolveDshHome } from './store-db.js';
import { GitHubClient, GitHubRateLimitError, runMirrorSync, extractUsage, extractBestPractices, extractHighlights } from './github.js';
import {
  resolveProfile,
  installPlugin as runInstall,
  uninstallPlugin as runUninstall,
  setPluginEnabled,
  gitSpecFor,
  type ProfileInfo,
} from './installer.js';
import { npmAvailability, clearNpmCache } from './npm-probe.js';
import { publishPlugin as runPublish, type PublishRequest } from './publish.js';
import { computeHealth, type HealthLevel } from './health.js';
import { syncTrustLevels } from './trust-sync.js';
import { syncBlueWhaleCatalog } from './catalog-sync.js';
import { syncSkills, parseSkillFrontmatter } from './skill-sync.js';

const SELF = 'dsh-plugin-hub';

/** Infrastructure entry ids that must never be disabled from the store UI. */
const PROTECTED_ENTRY_IDS = new Set([
  'api-gateway', 'api-remotes', 'connection', 'client-hmr', 'client-locale',
  'client-modules', 'client-runtime', 'cordis-host-runner', 'hmr', 'include',
  'locale', 'modules', 'runtime', 'timer', 'ui-settings', 'ui-settings-general',
  'ui-settings-plugins', 'webserver',
]);

/** System-side sub-group labels (display buckets for Loader infra entries). */
const SYSTEM_GROUP_META: Record<string, string> = {
  core: '核心服务', ui: '界面增强', tool: '开发工具', other: '其他系统组件',
};

/** Map a Loader entry id to a system sub-group bucket. */
function systemGroupOf(entryId: string, packageName: string): string {
  const id = String(entryId ?? '').toLowerCase();
  const pkg = String(packageName ?? '').toLowerCase();
  if (id === 'include' || id === 'timer' || id === 'hmr' || id === 'modules' || id === 'runtime' || id === 'connection' || id === 'api-gateway' || id === 'api-remotes') return 'core';
  if (id.startsWith('client-') || id.startsWith('ui-') || id === 'locale' || pkg.includes('client-ui')) return 'ui';
  if (id.includes('tool') || pkg.includes('tool') || pkg.includes('agent') || pkg.includes('cmdline') || pkg.includes('skill')) return 'tool';
  return 'other';
}

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

interface ProjectedPlugin {
  packageName: string;
  repoFullName: string;
  name: string;
  shortDescription: string;
  developer: string;
  iconUrl: string | null;
  categories: string[];
  version: string | null;
  stars: number;
  downloads: number;
  rating: number;
  ratingCount: number;
  installed: boolean;
  enabled: boolean | null;
  updatedAt: string | null;
  /** Download source: npm registry (direct) or GitHub clone (may need proxy). */
  source: 'npm' | 'github';
  /** Whether the package is published on npm (can install via npm registry). */
  hasNpm: boolean;
  /** Whether the package has a GitHub repository (can install via git clone). */
  hasGit: boolean;
  /** Trust level from the ecosystem index; null = unknown. */
  trustLevel: string | null;
  /** Health snapshot (estimated, no live issue fetch) — set by list() for sorting only. */
  health?: number;
}

/** True when `a` (installed) is older than `b` (latest). Lenient parse. */
function semverLt(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  const pa = a.replace(/^v/i, '').split(/[.-]/).map((n) => Number.parseInt(n, 10) || 0);
  const pb = b.replace(/^v/i, '').split(/[.-]/).map((n) => Number.parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) {
    const x = pa[i] ?? 0;
    const y = pb[i] ?? 0;
    if (x !== y) return x < y;
  }
  return false;
}

function sanitizeActor(raw: string): string {
  const trimmed = String(raw ?? '').trim().slice(0, 64);
  if (trimmed) return trimmed;
  try {
    const home = resolveDshHome();
    const file = join(home, '.anonymous-user-id');
    if (existsSync(file)) {
      const id = readFileSync(file, 'utf8').trim().slice(0, 64);
      if (id) return `anonymous-${id}`;
    }
  } catch { /* ignore */ }
  return 'anonymous';
}

/** Stable string hash (FNV-1a-ish) — used for the daily-seeded random sort. */
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function readdirSyncSafe(dir: string): string[] {
  try { return readdirSync(dir); } catch { return []; }
}
function mkdirSyncSafe(dir: string, opts?: { recursive?: boolean }): void {
  try { mkdirSync(dir, opts); } catch { /* ignore */ }
}
function rmSyncSafe(path: string, opts?: { recursive?: boolean; force?: boolean }): void {
  try { rmSync(path, opts); } catch { /* ignore */ }
}
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** List a repo directory via the GitHub contents API ([] on 404/error). */
async function listRepoDir(github: GitHubClient, owner: string, repo: string, dir: string): Promise<Array<{ name: string; type: 'file' | 'dir'; size: number }>> {
  try {
    const data = await github.apiGet<Array<{ name?: string; type?: string; size?: number }> | { message?: string }>(`/repos/${owner}/${repo}/contents/${encodeURIComponent(dir)}`);
    if (!Array.isArray(data)) return [];
    return data
      .filter((f) => f && typeof f.name === 'string' && (f.type === 'file' || f.type === 'dir'))
      .map((f) => ({ name: String(f.name), type: f.type === 'dir' ? ('dir' as const) : ('file' as const), size: Number(f.size ?? 0) }));
  } catch {
    return [];
  }
}

/** Per-day seed so the "random" order is stable within a day, fresh every day. */
function dailySeed(): number {
  const now = new Date();
  const day = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  return hashStr(day);
}

function resolveTokenMask(token: string | null): string {
  if (!token) return '';
  return token.length <= 4 ? '••••' : `••••${token.slice(-4)}`;
}

/** The long-lived host service behind `ctx.pluginStore`. */
export class PluginStoreService extends TypertRemoteService {
  static inject = ['loader'];
  db: StoreDB;
  github: GitHubClient;
  profile: ProfileInfo;
  private ctx: any;
  private syncing = false;
  private timer: NodeJS.Timeout | null = null;
  private lastSyncError: string | null = null;
  private npmAvailable: Map<string, boolean> | null = null;
  /** Live install progress per package (polled by the UI). */
  private installProgressMap = new Map<string, { phase: string; percent: number | null; detail: string; updatedAt: number }>();
  /** Live publish progress per package (polled by the UI). */
  private publishProgressMap = new Map<string, { phase: string; percent: number | null; detail: string; updatedAt: number }>();
  /** Short-TTL cache of installed() — avoids full per-package disk I/O on
   * every UI refresh (require.resolve + readFileSync per dependency). */
  private installedCache: { at: number; value: Array<Record<string, unknown>> } | null = null;
  /** Per-repo GitHub issues cache (5 min TTL) for the detail view. */
  private issuesCache = new Map<string, { at: number; value: Array<Record<string, unknown>> }>();
  /** Installed package → its package.json repository owner/name (null = unknown).
   * Built alongside the installed() cache; used to disambiguate same-name
   * plugins from different repositories. */
  private installedRepos = new Map<string, string | null>();
  /** Write-op rate limiter (per action, 60s window) — application-layer guard
   * against request flooding; the Host allowlist lives in the dsh gateway. */
  private writeThrottle = new Map<string, { start: number; count: number }>();
  /** npm daily download trend cache (6h TTL) per package. */
  private trendCache = new Map<string, { at: number; value: Array<{ date: string; downloads: number }> }>();
  /** Per-repo activity caches: commit days (`c:repo`) and star gains (`s:repo`). */
  private activityCache = new Map<string, { at: number; value: Array<{ date: string; count: number }> }>();

  /** Returns a message when the action is throttled, null when allowed. */
  private throttle(action: string, limitPerMinute = 30): string | null {
    const now = Date.now();
    const entry = this.writeThrottle.get(action);
    if (!entry || now - entry.start > 60_000) {
      this.writeThrottle.set(action, { start: now, count: 1 });
      return null;
    }
    if (entry.count >= limitPerMinute) return '操作过于频繁，请稍后再试';
    entry.count++;
    return null;
  }

  constructor(ctx: any, config: Record<string, unknown> = {}) {
    super(ctx, 'pluginStore');
    this.ctx = ctx;
    this.db = storeDB();
    this.github = new GitHubClient(this.db.getMeta('github_token'));
    this.profile = resolveProfile((ctx as { loader: { ctx: { baseUrl?: string } } }).loader.ctx.baseUrl);
    void config;
    this.scheduleTimer();
    // Warm the npm-availability probe in the background (registry HEAD checks).
    void npmAvailability(this.db).then((map) => { this.npmAvailable = map; }).catch(() => { /* probe is best-effort */ });
    ctx.effect(() => () => {
      if (this.timer !== null) clearInterval(this.timer);
      this.db.close();
    }, 'dsh-plugin-hub: scheduler + db lifetime');
  }

  private get loader(): any {
    return (this.ctx as any).loader;
  }

  private scheduleTimer(): void {
    if (this.timer !== null) clearInterval(this.timer);
    const hours = Number(this.db.getMeta('mirror_schedule_hours') ?? 24);
    if (!Number.isFinite(hours) || hours <= 0) return;
    this.timer = setInterval(() => {
      void this.runSync('scheduled');
    }, hours * 3600_000);
    this.timer.unref?.();
  }

  /** Kick off a background mirror sync (fire-and-forget from the RPC side). */
  private async runSync(reason: 'manual' | 'scheduled' | 'boot'): Promise<void> {
    if (this.syncing) return;
    this.syncing = true;
    this.db.setMeta('sync_state', 'syncing');
    try {
      const result = await runMirrorSync(this.github, this.db, {
        maxPages: Number(this.db.getMeta('mirror_max_pages') ?? 3),
        onProgress: (message, done, total) => {
          this.db.setMeta('sync_progress', `${message}|${done}|${total}`);
        },
      });
      this.lastSyncError = result.error;
      this.db.setMeta('last_sync_error', result.error ?? '');
      this.db.setMeta('sync_state', result.error ? 'error' : 'idle');
      this.db.setMeta('last_sync_at', new Date().toISOString());
      this.db.setMeta('last_sync_total', String(result.total));
      this.appendAudit('sync', 'github-mirror', result.error ? 'failed' : 'ok', `${reason}: ${result.total} repos (new ${result.added}, updated ${result.updated}, skipped ${result.skipped})${result.error ? ` — ${result.error}` : ''}`);
      // Trust-level sync from the community index — never blocks the mirror,
      // keeps the previous cache on failure (depend-on but work-without).
      try {
        const trust = await syncTrustLevels(this.github, this.db);
        if (trust.ok) {
          this.db.setMeta('trust_synced_total', String(trust.matched));
          this.appendAudit('sync', 'trust-index', 'ok', `${trust.matched} entries, ${trust.updated} trust levels updated`);
        } else {
          this.db.setMeta('trust_error', trust.error ?? '');
        }
      } catch (e) {
        this.db.setMeta('trust_error', e instanceof Error ? e.message : String(e));
      }
      // Blue-Whale catalog sync (extension directory for the encyclopedia) —
      // also fail-safe, never blocks the mirror.
      try {
        const cat = await syncBlueWhaleCatalog(this.db);
        if (!cat.ok) this.db.setMeta('catalog_error', cat.error ?? '');
      } catch (e) {
        this.db.setMeta('catalog_error', e instanceof Error ? e.message : String(e));
      }
      // Skill registry sync (conversation-callable SKILL.md) — fail-safe too.
      try {
        const sk = await syncSkills(this.github, this.db);
        if (!sk.ok) this.db.setMeta('skill_error', sk.error ?? '');
      } catch (e) {
        this.db.setMeta('skill_error', e instanceof Error ? e.message : String(e));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.lastSyncError = message;
      this.db.setMeta('sync_state', 'error');
      this.db.setMeta('last_sync_error', message);
      this.appendAudit('sync', 'github-mirror', 'failed', `${reason}: ${message}`);
    } finally {
      this.syncing = false;
    }
  }

  private appendAudit(action: string, target: string, result: string, message: string, actor = 'system'): void {
    try {
      this.db.appendAudit({ actor, action, target, result, message });
    } catch { /* audit must never break the operation */ }
  }

  // ---- helpers ---------------------------------------------------------------

  private installedPackageNames(): Set<string> {
    const set = new Set<string>();
    try {
      const manifest = JSON.parse(readFileSync(this.profile.packageJsonFile, 'utf8')) as Record<string, unknown>;
      const deps = (manifest.dependencies ?? {}) as Record<string, string>;
      for (const name of Object.keys(deps)) set.add(name);
    } catch { /* unreadable profile */ }
    // Also treat owned *insert* rows in the patch file as installed: a package
    // whose activation row exists was installed through the store even if its
    // dependency key differs (e.g. git installs use the repo's real package
    // name while the store row may carry the pre-rename id). Only insert rows
    // count — override/disable rows are config, not installation evidence.
    try {
      const patch = readFileSync(this.profile.patchFile, 'utf8');
      const blocks = patch.split(/\n\s*id:/).slice(1);
      for (const block of blocks) {
        const head = block.slice(0, 80);
        // an insert row's head looks like: `      insert: [ { id: ...`
        if (/insert\s*:/.test(head)) {
          const m = head.match(/id:\s*([^\s,}]+)/);
          if (m) set.add(m[1]);
        }
      }
    } catch { /* no patch file */ }
    return set;
  }

  private enabledOf(packageName: string): boolean | null {
    try {
      const entries = [...this.loader.entries()];
      const entry = entries.find((e: { options: { id: string; name: string } }) => e.options.id === packageName || e.options.name === packageName);
      return entry === undefined ? null : !entry.disabled;
    } catch {
      return null;
    }
  }

  /** True when the plugin row is installed, with repository disambiguation:
   * same-name plugins from different repos must match by `repository` field. */
  private isInstalled(packageName: string, repoFullName: string | null, installed: Set<string>): boolean {
    if (!installed.has(packageName)) return false;
    if (!repoFullName) return true; // store row without a repo — name check suffices
    const repo = this.installedRepos.get(packageName);
    if (repo === null || repo === undefined) return true; // installed pkg has no repo → name check
    return repo === repoFullName.toLowerCase();
  }

  private project(row: PluginRow, installed: Set<string>, ratingMap?: Map<string, { avg: number; count: number }>): ProjectedPlugin {
    const rating = ratingMap?.get(row.packageName) ?? this.db.ratingStats(row.packageName);
    const onNpm = this.npmAvailable?.get(row.packageName) ?? false;
    return {
      packageName: row.packageName,
      repoFullName: row.repoFullName,
      name: row.name,
      shortDescription: row.shortDescription,
      developer: row.developer,
      iconUrl: row.iconUrl,
      categories: JSON.parse(row.categories || '[]') as string[],
      version: row.version,
      stars: row.stars,
      downloads: row.downloads,
      rating: rating.avg,
      ratingCount: rating.count,
      installed: this.isInstalled(row.packageName, row.repoFullName, installed),
      enabled: this.enabledOf(row.packageName),
      updatedAt: row.updatedAt,
      source: onNpm ? 'npm' : 'github',
      hasNpm: onNpm,
      hasGit: Boolean(row.repoFullName),
      trustLevel: row.trustLevel ?? null,
    };
  }

  private async specFor(packageName: string, source: 'auto' | 'npm' | 'git' = 'auto'): Promise<{ spec: string; source: 'npm' | 'git' }> {
    const row = this.db.getPlugin(packageName);
    const repo = row?.repoFullName;
    const onNpm = this.npmAvailable?.get(packageName) ?? false;
    // GitHub git ref: use the default branch (e.g. main), NOT row.version —
    // that is a GitHub *Release* version number (0.1.0), which is usually not
    // a git tag/branch, so pnpm cannot resolve `…#0.1.0` to a commit.
    const gitRef = row?.defaultBranch ?? 'main';
    if (source === 'git') {
      if (repo) return { spec: gitSpecFor(repo, gitRef), source: 'git' };
      return { spec: packageName, source: 'git' };
    }
    if (source === 'npm' || onNpm) {
      // npm registry package.
      try {
        const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`, { signal: AbortSignal.timeout(10000) });
        if (res.ok) {
          const data = await res.json() as { 'dist-tags'?: Record<string, string>; version?: string };
          const version = data['dist-tags']?.latest ?? data.version;
          return { spec: version ? `${packageName}@${version}` : packageName, source: 'npm' };
        }
      } catch { /* fall through to git */ }
    }
    if (repo) return { spec: gitSpecFor(repo, gitRef), source: 'git' };
    return { spec: packageName, source: 'npm' };
  }

  // ---- remote surface ---------------------------------------------------------

  @Remote('list')
  async list(filters: ListFilters = {}): Promise<Record<string, unknown>> {
    const { category = null, query = null, sort = null, installedOnly = false } = filters ?? {};
    const limit = Math.min(Math.max(filters?.limit ?? 200, 1), 500);
    const offset = Math.max(filters?.offset ?? 0, 0);
    const installed = this.installedPackageNames();
    const q = (query ?? '').trim().toLowerCase();
    const ratingMap = this.db.ratingStatsAll(); // one query, not N
    const versionCounts = this.db.versionCounts(); // one query, for health snapshot
    let rows: ProjectedPlugin[] = this.db.allPlugins().map((row) => {
      const p = this.project(row, installed, ratingMap);
      // Estimated health snapshot (no live issue fetch — keeps pagination stable;
      // the leaderboard / detail view compute the authoritative score).
      p.health = computeHealth({
        updatedAt: row.updatedAt,
        onNpm: this.npmAvailable?.get(row.packageName) ?? false,
        downloads: row.downloads,
        stars: row.stars,
        versionCount: versionCounts.get(row.packageName) ?? 0,
        openIssues: null,
      }).health;
      return p;
    });
    if (category) rows = rows.filter((p) => p.categories.includes(category));
    if (q) {
      rows = rows.filter((p) =>
        p.packageName.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.repoFullName.toLowerCase().includes(q),
      );
    }
    if (installedOnly) rows = rows.filter((p) => p.installed);
    const sortBy = sort ?? 'random';
    rows.sort((a, b) => {
      switch (sortBy) {
        case 'downloads': return b.downloads - a.downloads;
        case 'updated': return String(b.updatedAt ?? '').localeCompare(String(a.updatedAt ?? ''));
        case 'name': return a.name.localeCompare(b.name);
        case 'stars': return b.stars - a.stars;
        case 'health': return (b.health ?? 0) - (a.health ?? 0);
        case 'random': {
          // Daily-seeded stable shuffle: every plugin gets a fixed "today weight"
          // from a hash of (name + date). Deterministic within the day (pagination
          // stays stable), rotates every day (fair exposure), and cannot be gamed
          // by inflating stars / downloads / ratings.
          const seed = dailySeed();
          return (hashStr(`${a.packageName}#${seed}`) % 100000) - (hashStr(`${b.packageName}#${seed}`) % 100000);
        }
        default: return b.rating - a.rating || b.stars - a.stars;
      }
    });
    const total = rows.length;
    const page = rows.slice(offset, offset + limit);
    return { total, plugins: page };
  }

  @Remote('detail')
  async detail(packageName: string): Promise<Record<string, unknown>> {
    const row = this.db.getPlugin(packageName);
    if (row === undefined) throw new Error(`插件不存在: ${packageName}（可能尚未同步，请先在设置中同步镜像）`);
    const installed = this.installedPackageNames();
    const rating = this.db.ratingStats(packageName);
    const dependents = this.db.dependentsOf(packageName).map((dep) => {
      const depRow = this.db.getPlugin(dep.packageName);
      const depRating = this.db.ratingStats(dep.packageName);
      return {
        packageName: dep.packageName,
        name: depRow?.name ?? dep.packageName,
        version: depRow?.version ?? dep.version,
        rating: depRating.avg,
        installed: installed.has(dep.packageName),
      };
    });
    // Real-time npm check for the detail view: the batch probe cache can be
    // stale (24h TTL), and a freshly published plugin should still show both
    // install buttons. Single-package HEAD is fast (~100ms).
    let onNpm = this.npmAvailable?.get(packageName) ?? false;
    if (onNpm === false) {
      try {
        const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`, { method: 'HEAD', signal: AbortSignal.timeout(8000) });
        onNpm = res.ok;
      } catch { /* keep cached value */ }
    }
    return {
      packageName: row.packageName,
      repoFullName: row.repoFullName,
      name: row.name,
      shortDescription: row.shortDescription,
      fullDescription: row.readme || row.description || '',
      usage: row.usage,
      developer: row.developer,
      iconUrl: row.iconUrl,
      categories: JSON.parse(row.categories || '[]'),
      version: row.version,
      stars: row.stars,
      downloads: row.downloads,
      rating: rating.avg,
      ratingCount: rating.count,
      installed: this.isInstalled(row.packageName, row.repoFullName, installed),
      enabled: this.enabledOf(row.packageName),
      topics: JSON.parse(row.topics || '[]'),
      license: row.license,
      homepage: row.homepage,
      repoUrl: row.repoUrl,
      defaultBranch: row.defaultBranch,
      screenshots: JSON.parse(row.screenshots || '[]'),
      versions: this.db.listVersions(packageName),
      dependencies: this.db.dependenciesOf(packageName),
      dependents,
      reviews: this.db.listReviews(packageName),
      updatedAt: row.updatedAt,
      source: onNpm ? 'npm' : 'github',
      hasNpm: onNpm,
      hasGit: Boolean(row.repoFullName),
      installedVersion: this.installedVersionOf(packageName),
      hasUpdate: this.installedHasUpdate(packageName, row.version),
      trustLevel: row.trustLevel ?? null,
    };
  }

  /** Version of an installed package (null when not installed). */
  private installedVersionOf(packageName: string): string | null {
    if (!this.installedPackageNames().has(packageName)) return null;
    const require = createRequire(join(this.profile.directory, 'noop.js'));
    try {
      const pkgPath = require.resolve(`${packageName}/package.json`);
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version?: unknown };
      return typeof pkg.version === 'string' && pkg.version ? pkg.version : null;
    } catch { return null; }
  }

  private installedHasUpdate(packageName: string, latest: string | null): boolean {
    if (!latest) return false;
    return semverLt(this.installedVersionOf(packageName), latest);
  }

  /** Health overview for every mirrored plugin, sorted by score. */
  @Remote('healthHub')
  async healthHub(): Promise<Record<string, unknown>> {
    const rows = this.db.allPlugins();
    const versions = this.db.versionCounts();
    // 1) fast estimate for everyone (bug signal = neutral).
    const out = rows.map((row) => {
      const result = computeHealth({
        updatedAt: row.updatedAt,
        onNpm: this.npmAvailable?.get(row.packageName) ?? false,
        downloads: row.downloads,
        stars: row.stars,
        versionCount: versions.get(row.packageName) ?? 0,
        openIssues: null,
      });
      return { packageName: row.packageName, name: row.name, developer: row.developer, health: result.health, level: result.level, lastUpdate: row.updatedAt, downloads: row.downloads, stars: row.stars, versionCount: versions.get(row.packageName) ?? 0, categories: JSON.parse(row.categories || '[]') };
    });
    out.sort((a, b) => Number(b.health) - Number(a.health));
    // 2) refine the top candidates with REAL open-issue counts (cached 5 min)
    //    so the leaderboard score matches the detail page score.
    const candidates = out.slice(0, 30);
    const refined = await Promise.all(candidates.map(async (p) => {
      let openIssues: number | null = null;
      try {
        const issues = await this.issues(p.packageName);
        openIssues = issues.filter((i) => i.state === 'open').length;
      } catch { /* keep neutral */ }
      const r = computeHealth({
        updatedAt: p.lastUpdate,
        onNpm: this.npmAvailable?.get(p.packageName) ?? false,
        downloads: p.downloads,
        stars: p.stars,
        versionCount: p.versionCount,
        openIssues,
      });
      return { ...p, health: r.health, level: r.level };
    }));
    refined.sort((a, b) => Number(b.health) - Number(a.health));
    const updatedAt = this.db.lastSyncedAt();
    const top = refined.slice(0, 20).map((row, idx) => ({ ...row, rank: idx + 1 }));
    return { updatedAt, items: top } as unknown as Record<string, unknown>;
  }

  /** Per-plugin health detail: score breakdown + release timeline + npm
   * download trend + open issue count (live). */
  @Remote('healthDetail')
  async healthDetail(packageName: string): Promise<Record<string, unknown>> {
    const name = String(packageName).trim();
    const row = this.db.getPlugin(name);
    if (row === undefined) throw new Error(`插件不存在: ${name}`);
    const versions = this.db.listVersions(name);
    let openIssues: number | null = null;
    try {
      const issues = await this.issues(name);
      openIssues = issues.filter((i) => i.state === 'open').length;
    } catch { /* keep null */ }
    const result = computeHealth({
      updatedAt: row.updatedAt,
      onNpm: this.npmAvailable?.get(name) ?? false,
      downloads: row.downloads,
      stars: row.stars,
      versionCount: versions.length,
      openIssues,
    });
    const trend = await this.npmDownloadTrend(name);
    const [commitActivity, starGains] = await Promise.all([
      this.commitActivityOf(row),
      this.starGainsOf(row),
    ]);
    return {
      packageName: name,
      name: row.name,
      developer: row.developer,
      repoFullName: row.repoFullName,
      health: result.health,
      level: result.level,
      breakdown: result.breakdown,
      lastUpdate: row.updatedAt,
      downloads: row.downloads,
      stars: row.stars,
      openIssues,
      timeline: versions.map((v) => ({ version: v.version, publishedAt: v.publishedAt })),
      downloadTrend: trend,
      commitActivity,
      starGains,
      /** Star timestamps require a configured GitHub token (anonymous API
       * does not expose them) — the UI shows a hint instead of a blank chart. */
      hasToken: Boolean(this.github.token),
    };
  }

  /** Per-day commit counts for the last 60 days (6h cache). */
  private async commitActivityOf(row: PluginRow): Promise<Array<{ date: string; count: number }>> {
    const repo = row.repoFullName;
    if (!repo || !repo.includes('/')) return [];
    const cached = this.activityCache.get(`c:${repo}`);
    if (cached && Date.now() - cached.at < 6 * 60 * 60_000) return cached.value;
    const [owner, repoName] = repo.split('/');
    const since = new Date(Date.now() - 60 * 86_400_000).toISOString();
    const value = await this.github.commitDays(owner!, repoName!, since);
    this.activityCache.set(`c:${repo}`, { at: Date.now(), value });
    return value;
  }

  /** Per-day star gains for a repo (6h cache). */
  private async starGainsOf(row: PluginRow): Promise<Array<{ date: string; count: number }>> {
    const repo = row.repoFullName;
    if (!repo || !repo.includes('/')) return [];
    const cached = this.activityCache.get(`s:${repo}`);
    if (cached && Date.now() - cached.at < 6 * 60 * 60_000) return cached.value;
    const [owner, repoName] = repo.split('/');
    const value = await this.github.starGainDays(owner!, repoName!);
    this.activityCache.set(`s:${repo}`, { at: Date.now(), value });
    return value;
  }

  /** Encyclopedia directory: mirrored plugins + external catalog entries. */
  @Remote('wikiHub')
  async wikiHub(raw: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const query = String(raw?.query ?? '').trim().toLowerCase();
    const category = String(raw?.category ?? '').trim();
    const source = String(raw?.source ?? '').trim(); // 'mirror' | 'catalog' | ''
    const limit = Math.min(Math.max(Number(raw?.limit ?? 200), 1), 500);
    const offset = Math.max(Number(raw?.offset ?? 0), 0);
    const catalog = this.db.catalogRepos();
    const known = new Set<string>();
    const items: Array<Record<string, unknown>> = [];

    for (const row of this.db.allPlugins()) {
      known.add(row.repoFullName.toLowerCase());
      if (source === 'catalog') continue;
      const categories = JSON.parse(row.categories || '[]') as string[];
      if (category && !categories.includes(category)) continue;
      if (query && !(row.packageName.toLowerCase().includes(query) || row.name.toLowerCase().includes(query) || row.shortDescription.toLowerCase().includes(query) || row.repoFullName.toLowerCase().includes(query))) continue;
      items.push({
        packageName: row.packageName,
        repoFullName: row.repoFullName,
        name: row.name,
        developer: row.developer,
        shortDescription: row.shortDescription,
        categories,
        trustLevel: row.trustLevel ?? null,
        health: computeHealth({ updatedAt: row.updatedAt, onNpm: this.npmAvailable?.get(row.packageName) ?? false, downloads: row.downloads, stars: row.stars, versionCount: this.db.listVersions(row.packageName).length, openIssues: null }).health,
        source: 'mirror',
      });
    }
    if (source !== 'mirror') {
      for (const repo of catalog) {
        if (known.has(repo.toLowerCase())) continue;
        const [owner, name] = repo.split('/');
        if (category) continue; // catalog entries have no category info
        if (query && !(repo.toLowerCase().includes(query) || name?.toLowerCase().includes(query))) continue;
        items.push({
          packageName: repo,
          repoFullName: repo,
          name: name ?? repo,
          developer: owner ?? '',
          shortDescription: '',
          categories: [],
          trustLevel: null,
          health: null,
          source: 'catalog',
        });
      }
    }
    items.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    return { total: items.length, items: items.slice(offset, offset + limit) };
  }

  /** Encyclopedia entry for one plugin: structured knowledge page. */
  @Remote('wiki')
  async wiki(packageName: string): Promise<Record<string, unknown>> {
    const name = String(packageName).trim();
    const row = this.db.getPlugin(name);
    if (row === undefined) throw new Error(`插件不存在: ${name}`);
    const versions = this.db.listVersions(name);
    const deps = this.db.dependenciesOf(name);
    const categories = JSON.parse(row.categories || '[]') as string[];
    // related plugins: same category, top by stars.
    const related = this.db.allPlugins()
      .filter((r) => r.packageName !== name && (JSON.parse(r.categories || '[]') as string[]).some((c) => categories.includes(c)))
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 6)
      .map((r) => ({ packageName: r.packageName, name: r.name, developer: r.developer, shortDescription: r.shortDescription }));
    return {
      packageName: name,
      name: row.name,
      developer: row.developer,
      repoFullName: row.repoFullName,
      categories,
      description: row.description,
      shortDescription: row.shortDescription,
      trustLevel: row.trustLevel ?? null,
      license: row.license,
      homepage: row.homepage,
      npmInstall: name,
      gitInstall: row.repoFullName ? `github:${row.repoFullName}` : null,
      usage: row.usage || extractUsage(row.readme),
      highlights: extractHighlights(row.readme),
      bestPractices: extractBestPractices(row.readme),
      versionCount: versions.length,
      latestVersion: versions[0]?.version ?? null,
      dependencies: deps.slice(0, 20).map((d) => ({ name: d.name, type: d.kind })),
      related,
    };
  }

  /** Daily npm download counts for the last 90 days (6h cache). */
  private async npmDownloadTrend(packageName: string): Promise<Array<{ date: string; downloads: number }>> {
    const cached = this.trendCache.get(packageName);
    if (cached && Date.now() - cached.at < 6 * 60 * 60_000) return cached.value;
    const start = new Date(Date.now() - 90 * 86_400_000).toISOString().slice(0, 10);
    const end = new Date().toISOString().slice(0, 10);
    try {
      const res = await fetch(`https://api.npmjs.org/downloads/range/${start}:${end}/${encodeURIComponent(packageName)}`, { signal: AbortSignal.timeout(10_000) });
      if (!res.ok) return [];
      const data = await res.json() as { downloads?: Array<{ day: string; downloads: number }> };
      const value = (data.downloads ?? []).map((d) => ({ date: d.day, downloads: Number(d.downloads) || 0 }));
      this.trendCache.set(packageName, { at: Date.now(), value });
      return value;
    } catch { return []; }
  }

  // ---- skills (conversation-callable SKILL.md) --------------------------------

  /** Skill discovery dirs in $DSH_HOME (user-level, available in every project's conversation). */
  private skillHomeDirs(): string[] {
    const home = resolveDshHome();
    return [join(home, 'skills'), join(homedir(), '.agents', 'skills')];
  }

  private installedSkills(): Array<{ name: string; dir: string; description: string; version: string }> {
    const out: Array<{ name: string; dir: string; description: string; version: string }> = [];
    for (const root of this.skillHomeDirs()) {
      let entries: string[] = [];
      try { entries = readdirSyncSafe(root); } catch { continue; }
      for (const name of entries) {
        const dir = join(root, name);
        try {
          const md = readFileSync(join(dir, 'SKILL.md'), 'utf8');
          const meta = parseSkillFrontmatter(md);
          out.push({ name: meta.name || name, dir, description: meta.description, version: meta.version });
        } catch { /* not a skill directory */ }
      }
    }
    return out;
  }

  /** All collected skills with installed state. */
  @Remote('skillList')
  async skillList(filters: { query?: string | null; category?: string | null; platform?: string | null; limit?: number | null } = {}): Promise<Record<string, unknown>> {
    const q = String(filters?.query ?? '').trim().toLowerCase();
    const cat = String(filters?.category ?? '').trim();
    const plat = String(filters?.platform ?? '').trim();
    const installed = new Set(this.installedSkills().map((s) => s.name));
    let rows = this.db.allSkills();
    if (q) {
      rows = rows.filter((s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        String(s.author).toLowerCase().includes(q) ||
        String(s.repoFullName).toLowerCase().includes(q),
      );
    }
    if (cat && cat !== 'all') rows = rows.filter((s) => (s.categories ?? []).includes(cat));
    if (plat && plat !== 'all') rows = rows.filter((s) => (s.platform ?? 'general') === plat);
    const limit = Math.min(Math.max(filters?.limit ?? 200, 1), 500);
    return {
      total: rows.length,
      items: rows.slice(0, limit).map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        descriptionZh: s.descriptionZh,
        version: s.version,
        author: s.author,
        repoFullName: s.repoFullName,
        categories: s.categories ?? [],
        platform: s.platform ?? 'general',
        installed: installed.has(s.name),
      })),
    };
  }

  /** Full SKILL.md content for the detail view. */
  @Remote('skillDetail')
  async skillDetail(id: string): Promise<Record<string, unknown>> {
    const skill = this.db.getSkill(String(id).trim());
    if (!skill) throw new Error('Skill 不存在（可能尚未同步，试试先「立即同步」）');
    const installed = this.installedSkills().find((s) => s.name === skill.name);
    return {
      id: skill.id,
      name: skill.name,
      description: skill.description,
      descriptionZh: skill.descriptionZh,
      version: skill.version,
      author: skill.author,
      repoFullName: skill.repoFullName,
      skillPath: skill.skillPath,
      categories: skill.categories ?? [],
      platform: skill.platform ?? 'general',
      content: skill.content,
      installed: Boolean(installed),
      installedDir: installed?.dir ?? null,
    };
  }

  /** Install a skill: copy SKILL.md (+ small sibling files) into $DSH_HOME/skills/<name>/. */
  @Remote('skillInstall')
  async skillInstall(id: string, actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const skill = this.db.getSkill(String(id).trim());
    if (!skill) return { ok: false, message: 'Skill 不存在', detail: null };
    const target = join(resolveDshHome(), 'skills', skill.name);
    try {
      mkdirSyncSafe(join(target, 'assets'), { recursive: true });
      writeFileSync(join(target, 'SKILL.md'), skill.content ?? '', 'utf8');
      // best-effort: pull small sibling files (scripts/references/assets) so the
      // skill works offline — limited count & size, never fails the install.
      if (skill.repoFullName && skill.skillPath) {
        const [owner, repo] = skill.repoFullName.split('/');
        const dir = skill.skillPath.replace(/SKILL\.md$/i, '').replace(/\/$/, '');
        const siblings = await this.skillSiblings(owner!, repo!, dir);
        for (const s of siblings) {
          try {
            const buf = await this.github.rawFile(owner!, repo!, 'HEAD', s);
            if (buf === null) continue;
            const rel = s.replace(new RegExp(`^${escapeRegExp(dir)}/`), '');
            writeFileSync(join(target, rel), buf, 'utf8');
          } catch { /* best-effort */ }
        }
      }
      this.appendAudit('skill_install', skill.name, 'ok', `installed from ${skill.repoFullName}`, actor);
      return { ok: true, message: `Skill「${skill.name}」已安装，重启后可在对话中调用`, detail: join(target, 'SKILL.md') };
    } catch (error) {
      return { ok: false, message: `安装失败: ${error instanceof Error ? error.message : String(error)}`, detail: null };
    }
  }

  /** Remove an installed skill directory. */
  @Remote('skillUninstall')
  async skillUninstall(name: string, actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const target = join(resolveDshHome(), 'skills', String(name).trim());
    try {
      if (!existsSync(join(target, 'SKILL.md'))) return { ok: false, message: `Skill「${name}」未安装`, detail: null };
      rmSyncSafe(target, { recursive: true, force: true });
      this.appendAudit('skill_uninstall', String(name), 'ok', 'removed', actor);
      return { ok: true, message: `Skill「${name}」已卸载`, detail: null };
    } catch (error) {
      return { ok: false, message: `卸载失败: ${error instanceof Error ? error.message : String(error)}`, detail: null };
    }
  }

  /** Locally installed skills (from $DSH_HOME/skills + ~/.agents/skills). */
  @Remote('skillInstalled')
  async skillInstalled(): Promise<Array<Record<string, unknown>>> {
    return this.installedSkills().map((s) => ({
      name: s.name,
      dir: s.dir,
      description: s.description,
      version: s.version,
    }));
  }

  /** dsh-bench 跑分（独立项目产出，按插件名索引；报告缺失/失败优雅降级）。 */
  @Remote('bench')
  async bench(packageName: string): Promise<Record<string, unknown>> {
    const path = process.env.DSH_BENCH_JSON || join(resolveDshHome(), 'storages', 'dsh-bench', 'benchmark.json');
    try {
      const data = JSON.parse(readFileSync(path, 'utf8')) as { generatedAt?: string; entries?: Array<Record<string, unknown>> };
      const entries = Array.isArray(data.entries) ? data.entries : [];
      const entry = entries.find((e) => String(e.target ?? '') === String(packageName)) ?? null;
      const ok = entries.filter((e) => e.ok);
      const avgScore = ok.length > 0
        ? Math.round(ok.reduce((s, e) => s + Number(e.score ?? 0), 0) / ok.length)
        : null;
      return { found: entry !== null, updatedAt: data.generatedAt ?? null, entry, ecosystemAvg: avgScore };
    } catch {
      return { found: false, updatedAt: null, entry: null, ecosystemAvg: null };
    }
  }

  /** dsh-connector 状态：插件是否安装 + 各平台配置/运行状态。 */
  @Remote('connectorStatus')
  async connectorStatus(): Promise<Record<string, unknown>> {
    const connectorPkg = join(resolveDshHome(), 'profiles', this.profile.profileName, 'node_modules', 'dsh-connector');
    const installed = existsSync(connectorPkg);
    let config: Record<string, unknown> = {};
    let status: Record<string, unknown> = {};
    try {
      const cfgPath = join(resolveDshHome(), 'storages', 'dsh-connector', 'config.json');
      if (existsSync(cfgPath)) config = JSON.parse(readFileSync(cfgPath, 'utf8')) as Record<string, unknown>;
    } catch { /* keep empty */ }
    try {
      const im = (this.ctx as { imConnector?: { status?: () => Record<string, unknown> } } | undefined)?.imConnector;
      status = im?.status?.() ?? {};
    } catch { /* plugin may not be loaded */ }
    return { installed, config, status };
  }

  /** dsh-connector 配置保存（hub 设置页 → 配置文件，重启 dsh 生效）。 */
  @Remote('connectorConfigSet')
  async connectorConfigSet(platform: string, payload: Record<string, unknown>): Promise<Record<string, unknown>> {
    const outDir = join(resolveDshHome(), 'storages', 'dsh-connector');
    mkdirSyncSafe(outDir, { recursive: true });
    const cfgPath = join(outDir, 'config.json');
    let config: Record<string, unknown> = {};
    try {
      if (existsSync(cfgPath)) config = JSON.parse(readFileSync(cfgPath, 'utf8')) as Record<string, unknown>;
    } catch { /* fresh */ }
    config[platform] = { ...(config[platform] as Record<string, unknown> ?? {}), ...payload };
    writeFileSync(cfgPath, JSON.stringify(config, null, 2), 'utf8');
    return { ok: true, message: `「${platform}」配置已保存，重启 dsh 后生效。`, detail: config[platform] };
  }

  /** 在 dsh 内触发「立即跑分」：调用 dsh-bench CLI 现场跑 Mock（零 token）。 */
  @Remote('benchRun')
  async benchRun(packageName: string, mode: 'mock' | 'e2e' = 'mock'): Promise<Record<string, unknown>> {
    const benchPkg = join(resolveDshHome(), 'profiles', this.profile.profileName, 'node_modules', 'dsh-bench');
    const bin = join(benchPkg, 'src', 'index.js');
    if (!existsSync(bin)) {
      return { ok: false, message: 'dsh-bench 未安装。请先安装 dsh-bench 插件（本地安装会自动归入「自创作插件」/ 可扩展类）。', detail: null };
    }
    // E2E 需要 API key（消耗用户 token）
    if (mode === 'e2e' && !process.env.DEEPSEEK_API_KEY) {
      return { ok: false, message: '端到端跑分需要 DEEPSEEK_API_KEY（消耗你的 token）。请先在启动 dsh 的环境中 export DEEPSEEK_API_KEY=... 再试。', detail: null };
    }
    const outDir = join(resolveDshHome(), 'storages', 'dsh-bench');
    mkdirSyncSafe(outDir, { recursive: true });
    const outPath = join(outDir, mode === 'e2e' ? 'e2e-report.json' : 'benchmark.json');
    const args = mode === 'e2e' ? ['--e2e', packageName, '--out', outPath] : [packageName, '--out', outPath];
    return new Promise((resolve) => {
      const child = spawn(
        process.execPath,
        [bin, ...args],
        { cwd: benchPkg, env: { ...process.env, DSH_HOME: resolveDshHome() }, stdio: 'ignore', windowsHide: true },
      );
      // E2E 内部有 120s 超时，这里再兜底 150s
      const timer = setTimeout(() => { try { child.kill() } catch { /* gone */ } }, mode === 'e2e' ? 150_000 : 180_000);
      child.on('exit', async (code) => {
        clearTimeout(timer);
        let bench: Record<string, unknown> = { found: false, updatedAt: null, entry: null, ecosystemAvg: null };
        try {
          const data = JSON.parse(readFileSync(outPath, 'utf8')) as { generatedAt?: string; entries?: Array<Record<string, unknown>> };
          const entries = Array.isArray(data.entries) ? data.entries : [];
          const entry = entries.find((e) => String(e.target ?? '') === String(packageName)) ?? null;
          const ok = entries.filter((e) => e.ok);
          bench = {
            found: entry !== null,
            updatedAt: data.generatedAt ?? null,
            entry,
            ecosystemAvg: ok.length > 0 ? Math.round(ok.reduce((s, e) => s + Number(e.score ?? 0), 0) / ok.length) : null,
          };
        } catch { /* keep not-found */ }
        resolve({ ok: code === 0, message: code === 0 ? (mode === 'e2e' ? '端到端跑分完成（消耗 token，见成本报告）' : '跑分完成（Mock 模式，零 token）') : `dsh-bench 退出码 ${code}`, detail: bench });
      });
      child.on('error', (err) => {
        clearTimeout(timer);
        resolve({ ok: false, message: `无法启动 dsh-bench: ${err.message}`, detail: null });
      });
    });
  }

  private async skillSiblings(owner: string, repo: string, dir: string): Promise<string[]> {
    const out: string[] = [];
    if (!dir) return out;
    const entries = await listRepoDir(this.github, owner, repo, dir);
    for (const e of entries) {
      if (e.type === 'dir') {
        const sub = await this.skillSiblings(owner, repo, `${dir}/${e.name}`);
        out.push(...sub);
      } else if (e.type === 'file' && e.name.toLowerCase() !== 'skill.md' && e.size <= 300_000) {
        out.push(`${dir}/${e.name}`);
      }
      if (out.length >= 15) break;
    }
    return out;
  }

  @Remote('syncNow')
  async syncNow(): Promise<Record<string, unknown>> {
    if (this.syncing) return { ok: false, message: '镜像同步正在进行中，请稍候', detail: null };
    void this.runSync('manual');
    // The mirror may have discovered new plugins — drop the stale npm probe.
    this.npmAvailable = null;    clearNpmCache(this.db);
    void npmAvailability(this.db).then((map) => { this.npmAvailable = map; }).catch(() => { /* best-effort */ });
    return { ok: true, message: '镜像同步已启动，可在设置页查看进度', detail: null };
  }

  @Remote('syncStatus')
  async syncStatus(): Promise<Record<string, unknown>> {
    const state = this.db.getMeta('sync_state') ?? 'idle';
    const lastSyncAt = this.db.getMeta('last_sync_at');
    const lastSyncTotal = Number(this.db.getMeta('last_sync_total') ?? 0);
    const lastError = this.db.getMeta('last_sync_error') || this.lastSyncError;
    const scheduleHours = Number(this.db.getMeta('mirror_schedule_hours') ?? 24);
    let nextSyncAt: string | null = null;
    if (scheduleHours > 0 && lastSyncAt) {
      nextSyncAt = new Date(new Date(lastSyncAt).getTime() + scheduleHours * 3600_000).toISOString();
    }
    return { state, lastSyncAt, lastSyncTotal, lastError, nextSyncAt, scheduleHours };
  }

  @Remote('settings')
  async settings(): Promise<Record<string, unknown>> {
    const token = this.db.getMeta('github_token');
    return {
      tokenConfigured: token !== null,
      tokenMasked: resolveTokenMask(token),
      scheduleHours: Number(this.db.getMeta('mirror_schedule_hours') ?? 24),
      profileName: this.profile.profileName,
      rateLimitRemaining: this.github.rateLimit().remaining,
      dbPath: this.db.path,
      pluginCount: this.db.countPlugins(),
    };
  }

  @Remote('setGithubToken')
  async setGithubToken(token: string, actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const trimmed = String(token ?? '').trim();
    if (!trimmed) {
      this.db.deleteMeta('github_token');
      this.github.setToken(null);
      this.appendAudit('token_set', 'github-token', 'failed', 'empty token rejected', actor);
      return { ok: false, message: 'Token 不能为空', detail: null };
    }
    if (!/^gh[pousr]_[A-Za-z0-9]{20,}$/.test(trimmed) && trimmed.length < 20) {
      this.appendAudit('token_set', 'github-token', 'failed', 'token format suspicious', actor);
      return { ok: false, message: 'Token 格式可疑：GitHub 私人 Token 通常以 gh_ 开头且较长，请确认', detail: null };
    }
    this.db.setMeta('github_token', trimmed);
    this.github.setToken(trimmed);
    this.appendAudit('token_set', 'github-token', 'ok', 'private token configured', actor);
    return { ok: true, message: 'Token 已保存，搜索与镜像同步将获得更高限频额度', detail: null };
  }

  @Remote('clearGithubToken')
  async clearGithubToken(actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    this.db.deleteMeta('github_token');
    this.github.setToken(null);
    this.appendAudit('token_clear', 'github-token', 'ok', 'private token removed', actor);
    return { ok: true, message: 'Token 已清除', detail: null };
  }

  @Remote('setSchedule')
  async setSchedule(hours: number, actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const h = Number(hours);
    if (!Number.isFinite(h) || h < 0 || h > 24 * 7) {
      this.appendAudit('schedule_set', 'mirror-schedule', 'failed', `invalid interval ${hours}`, actor);
      return { ok: false, message: '同步间隔需在 0（关闭）到 168（7 天）小时之间', detail: null };
    }
    this.db.setMeta('mirror_schedule_hours', String(h));
    this.scheduleTimer();
    this.appendAudit('schedule_set', 'mirror-schedule', 'ok', `interval ${h}h`, actor);
    return { ok: true, message: h > 0 ? `镜像将每 ${h} 小时自动同步一次` : '自动同步已关闭', detail: null };
  }

  @Remote('installPlugin')
  async installPlugin(packageName: string, actorRaw: string, sourceRaw?: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const throttled = this.throttle('install', 30);
    if (throttled) return { ok: false, message: throttled, detail: null, restartRequired: false, reloadRequired: false, packageName: String(packageName).trim() };
    const name = String(packageName).trim();
    const source = (sourceRaw ?? 'auto') === 'npm' ? 'npm' : (sourceRaw ?? 'auto') === 'git' ? 'git' : 'auto';
    if (name === SELF) {
      this.appendAudit('install', name, 'failed', 'self-install blocked', actor);
      return { ok: false, message: '不能通过商店安装插件商店自身', detail: null, restartRequired: false, reloadRequired: false, packageName: name };
    }
    if (this.installedPackageNames().has(name)) {
      return { ok: true, message: `${name} 已安装`, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
    }
    try {
      this.installProgressMap.set(name, { phase: 'resolving', percent: 0, detail: '准备安装…', updatedAt: Date.now() });
      const { spec, source: usedSource } = await this.specFor(name, source);
      const receipt = await runInstall(
        this.profile,
        spec,
        name,
        actor,
        (p) => this.installProgressMap.set(name, { ...p, updatedAt: Date.now() }),
      );
      this.appendAudit('install', name, receipt.ok ? 'ok' : 'failed', `pnpm ${usedSource}: ${receipt.message}`, actor);
      this.installProgressMap.delete(name);
      if (receipt.ok) this.installedCache = null;
      return { ...receipt, packageName: name };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.appendAudit('install', name, 'failed', message, actor);
      this.installProgressMap.delete(name);
      return { ok: false, message, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
    }
  }

  /** Polled by the UI to render the install progress bar. Returns null when no
   * install is in flight for this package. */
  @Remote('installProgress')
  async installProgress(packageName: string): Promise<Record<string, unknown> | null> {
    const name = String(packageName).trim();
    const entry = this.installProgressMap.get(name);
    if (!entry) return null;
    // stale guard: entries older than 10 min are treated as gone.
    if (Date.now() - entry.updatedAt > 10 * 60_000) { this.installProgressMap.delete(name); return null; }
    return entry;
  }

  /** Issues of a plugin's GitHub repo (read-only, 5-min cache). */
  @Remote('issues')
  async issues(packageName: string): Promise<Array<Record<string, unknown>>> {
    const name = String(packageName).trim();
    const row = this.db.getPlugin(name);
    const repo = row?.repoFullName;
    if (!repo || !repo.includes('/')) return [];
    const cached = this.issuesCache.get(repo);
    if (cached && Date.now() - cached.at < 5 * 60_000) return cached.value;
    const [owner, repoName] = repo.split('/');
    const list = await this.github.issues(owner!, repoName!);
    this.issuesCache.set(repo, { at: Date.now(), value: list as unknown as Array<Record<string, unknown>> });
    return list as unknown as Array<Record<string, unknown>>;
  }

  /** Locally-developed plugins (自创作分类) with their package.json, ready to publish. */
  @Remote('myPlugins')
  async myPlugins(): Promise<Array<Record<string, unknown>>> {
    const list = await this.installed();
    const result: Array<Record<string, unknown>> = [];
    for (const p of list) {
      if (p.category !== 'own' || typeof p.packageName !== 'string') continue;
      const manifest = (() => {
        try {
          const require = createRequire(join(this.profile.directory, 'noop.js'));
          const pkgPath = require.resolve(`${p.packageName}/package.json`);
          const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as Record<string, unknown>;
          return pkg;
        } catch { return null; }
      })();
      result.push({
        packageName: p.packageName,
        name: p.name,
        localPath: p.localPath ?? null,
        published: p.published ?? false,
        repoUrl: p.repoUrl ?? null,
        version: manifest?.version ?? null,
        description: manifest?.description ?? null,
        pkgName: manifest?.name ?? p.packageName,
      });
    }
    return result;
  }

  /** Polled by the UI during a publish. Returns null when no publish is in flight. */
  @Remote('publishProgress')
  async publishProgress(packageName: string): Promise<Record<string, unknown> | null> {
    const name = String(packageName).trim();
    const entry = this.publishProgressMap.get(name);
    if (!entry) return null;
    if (Date.now() - entry.updatedAt > 30 * 60_000) { this.publishProgressMap.delete(name); return null; }
    return entry;
  }

  /** One-click publish of a locally-developed plugin to GitHub and/or npm. */
  @Remote('publish')
  async publish(raw: Record<string, unknown>, actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const throttled = this.throttle('publish', 10);
    if (throttled) return { ok: false, message: throttled, detail: null, repoUrl: null, npmUrl: null };
    const name = String(raw?.packageName ?? '').trim();
    if (!name) return { ok: false, message: '请选择要发布的插件', detail: null, repoUrl: null, npmUrl: null };

    // Tokens are session-only: the UI passes them for this publish and they
    // are never persisted (security — a token must be re-entered every time).
    const githubToken = String(raw?.githubToken ?? '').trim();
    const npmToken = String(raw?.npmToken ?? '').trim();

    const request: PublishRequest = {
      packageName: name,
      target: raw?.target === 'npm' || raw?.target === 'both' ? raw.target : 'github',
      githubToken,
      npmToken,
      visibility: raw?.visibility === 'private' ? 'private' : 'public',
      description: String(raw?.description ?? ''),
      topics: Array.isArray(raw?.topics) ? (raw.topics as string[]).map(String) : [],
    };

    const key = name;
    this.publishProgressMap.set(key, { phase: '启动发布…', percent: 0, detail: '', updatedAt: Date.now() });
    const report = (phase: string, percent: number | null, detail: string | null) => {
      const cur = this.publishProgressMap.get(key);
      this.publishProgressMap.set(key, {
        phase, percent, detail: detail ?? cur?.detail ?? '',
        updatedAt: Date.now(),
      });
    };

    try {
      const receipt = await runPublish(this.profile, request, (phase, percent, detail) => report(phase, percent, detail));
      this.appendAudit('publish', name, receipt.ok ? 'ok' : 'failed', `${request.target}: ${receipt.message}`, actor);
      report(receipt.ok ? '完成' : '失败', 100, receipt.message);
      return { ...receipt, packageName: name };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.appendAudit('publish', name, 'failed', message, actor);
      report('失败', 100, message);
      return { ok: false, message, detail: null, repoUrl: null, npmUrl: null, packageName: name };
    }
  }

  @Remote('uninstall')
  async uninstall(packageName: string, actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const throttled = this.throttle('uninstall');
    if (throttled) return { ok: false, message: throttled, detail: null, restartRequired: false, reloadRequired: false, packageName: String(packageName).trim() };
    const name = String(packageName).trim();
    // Uninstalling the store itself is allowed (the user may want to remove
    // it; dsh itself stays healthy — only the store UI disappears). The
    // front-end shows a strong confirmation for this case.
    try {
      const receipt = await runUninstall(this.profile, name, name, actor);
      this.appendAudit('uninstall', name, receipt.ok ? 'ok' : 'failed', receipt.message, actor);
      if (receipt.ok) this.installedCache = null;
      return { ...receipt, packageName: name };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.appendAudit('uninstall', name, 'failed', message, actor);
      return { ok: false, message, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
    }
  }

  @Remote('setEnabled')
  async setEnabled(packageName: string, enabled: boolean, actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const throttled = this.throttle('setEnabled', 60);
    if (throttled) return { ok: false, message: throttled, detail: null, restartRequired: false, reloadRequired: false, packageName: String(packageName).trim() };
    const name = String(packageName).trim();
    if (name === SELF && !enabled) {
      this.appendAudit('disable', name, 'failed', 'self-disable blocked', actor);
      return { ok: false, message: '不能禁用插件商店自身', detail: null, restartRequired: false, reloadRequired: false, packageName: name };
    }
    try {
      const entries = [...this.loader.entries()];
      const entry = entries.find((e: { options: { id: string; name: string } }) => e.options.id === name || e.options.name === name);
      if (entry !== undefined && !enabled && PROTECTED_ENTRY_IDS.has(entry.options.id)) {
        this.appendAudit('disable', name, 'failed', 'protected entry', actor);
        return { ok: false, message: `${name} 属于系统核心组件，不能禁用（避免破坏 DSH 正常运行）`, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
      }
      if (entry === undefined) {
        const message = `未找到已加载的插件条目 ${name}`;
        this.appendAudit(enabled ? 'enable' : 'disable', name, 'failed', message, actor);
        return { ok: false, message, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
      }
      if (!entry.disabled === enabled) {
        return { ok: true, message: `${name} 已经是${enabled ? '启用' : '禁用'}状态`, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
      }
      await setPluginEnabled(this.profile, entry.options.id, entry.options.name, enabled);
      await this.waitForEntry(entry.options.id, enabled);
      this.appendAudit(enabled ? 'enable' : 'disable', name, 'ok', enabled ? 'enabled' : 'disabled', actor);
      this.installedCache = null;
      return { ok: true, message: `${name} 已${enabled ? '启用' : '禁用'}`, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.appendAudit(enabled ? 'enable' : 'disable', name, 'failed', message, actor);
      return { ok: false, message, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
    }
  }

  private async waitForEntry(entryId: string, enabled: boolean, timeoutMs = 8000): Promise<void> {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      try {
        const entry = [...this.loader.entries()].find((e: { options: { id: string } }) => e.options.id === entryId);
        if (entry !== undefined && !entry.disabled === enabled && entry._initTask === void 0 && entry._disposing === 0) return;
      } catch { /* loader unavailable */ }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw new Error(`等待插件条目 ${entryId} ${enabled ? '启用' : '禁用'}超时，请刷新页面后重试`);
  }

  @Remote('installed')
  async installed(): Promise<Array<Record<string, unknown>>> {
    const now = Date.now();
    if (this.installedCache && now - this.installedCache.at < 10_000) return this.installedCache.value;
    this.installedRepos.clear();
    // Merge real Loader entries (system infra) with profile dependencies so the
    // UI can group everything into 系统插件 / 下载插件 / 自创作插件.
    // Loader entries that correspond to installed package dependencies are
    // classified by the dependency loop below (download/own), NOT as system —
    // otherwise user-installed plugins (including this store itself) would be
    // locked into the protected system bucket and become unmanageable.
    const result: Array<Record<string, unknown>> = [];
    const seen = new Set<string>();
    let loaderEntries: Array<{ options: { id: string; name: string }; disabled: boolean }> = [];
    try { loaderEntries = [...this.loader.entries()] as Array<{ options: { id: string; name: string }; disabled: boolean }>; } catch { /* loader unavailable */ }
    let manifest: Record<string, unknown> = {};
    try {
      manifest = JSON.parse(readFileSync(this.profile.packageJsonFile, 'utf8')) as Record<string, unknown>;
    } catch { /* manifest unavailable */ }
    const deps = (manifest.dependencies ?? {}) as Record<string, string>;
    const depNames = new Set(Object.keys(deps));

    // 1) System-side entries from the Loader itself — only true infrastructure
    //    (entries NOT backed by an installed dependency package).
    for (const entry of loaderEntries) {
      const id = entry.options.id;
      const pkgName = entry.options.name ?? id;
      if (seen.has(id)) continue;
      // Backed by an installed dependency → let the dependency loop classify
      // it (download/own). Do NOT add to `seen` here, or the loop below will
      // skip it entirely and the plugin disappears from the list.
      if (depNames.has(pkgName)) continue;
      seen.add(id);
      const protectedEntry = PROTECTED_ENTRY_IDS.has(id);
      result.push({
        packageName: pkgName,
        entryId: id,
        name: id,
        category: 'system',
        group: systemGroupOf(id, pkgName),
        groupLabel: SYSTEM_GROUP_META[systemGroupOf(id, pkgName)] ?? '其他系统组件',
        enabled: !entry.disabled,
        phase: null,
        managed: false,
        protected: protectedEntry,
        type: 'system',
        localPath: null,
        published: false,
        repoUrl: null,
      });
    }

    // 2) Installed package dependencies not already listed above. Split into
    //    下载插件 (registry/git installs) and 自创作插件 (local file:/link:
    //    installs — the way plugins created with the DSH scaffold or forked
    //    locally are installed). Classification is by *who owns the source*,
    //    NOT by publish state: a local install means the code lives on this
    //    machine and is editable, so it is the user's own plugin regardless of
    //    whether it was published. Publish state is surfaced as a badge
    //    (`published`) instead of changing the category — this keeps published
    //    self-made plugins visible under 自创作 and does not punish creators
    //    who publish (they don't "lose" their plugin to the download tab).
    const require = createRequire(join(this.profile.directory, 'noop.js'));
    const patchSource = existsSync(this.profile.patchFile) ? readFileSync(this.profile.patchFile, 'utf8') : '';
    for (const [name, spec] of Object.entries(deps)) {
      if (seen.has(name)) continue;
      seen.add(name);
      const specValue = String(spec ?? '');
      const isLocal = /^(?:file:|link:|workspace:)/.test(specValue);
      let group = 'other';
      let groupLabel = '其他插件';
      let isDsh = false;
      let localPath: string | null = null;
      let published = false;
      let repoUrl: string | null = null;
      let pkg: Record<string, unknown> = {};
      try {
        const pkgPath = require.resolve(`${name}/package.json`);
        pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as Record<string, unknown>;
        const dsh = (pkg.dsh ?? {}) as Record<string, unknown>;
        const declared = (dsh.pluginManager as Record<string, unknown> | undefined)?.group;
        const keywords = Array.isArray(pkg.keywords) ? (pkg.keywords as string[]).map(String) : [];
        isDsh = Boolean(dsh?.bundle || dsh?.client || keywords.includes('dsh-plugin') || /dsh|harness|cordis/i.test(String(pkg.description ?? '')));
        // 可扩展类：扩展 hub 能力的插件（dsh-bench 等，keyword: hub-ext）
        const isHubExt = keywords.includes('hub-ext');
        const labelMap: Record<string, string> = {
          core: '核心服务', ui: '界面增强', tool: '开发工具', llm: '模型与 LLM', agent: 'Agent', workflow: '工作流', data: '数据处理', notification: '通知', hubExt: '可扩展类', other: '其他插件',
        };
        group = typeof declared === 'string' && declared ? declared : isHubExt ? 'hubExt' : isDsh ? 'tool' : 'other';
        groupLabel = labelMap[group] ?? group;
        if (isLocal) localPath = pkgPath.replace(/[\\/]package\.json$/, '');
        // Remember the package's declared repository (owner/name) for
        // same-name disambiguation across different GitHub repos.
        const repoRaw = typeof (pkg.repository as { url?: unknown } | undefined)?.url === 'string'
          ? (pkg.repository as { url: string }).url
          : typeof pkg.repository === 'string' ? pkg.repository : '';
        const repoMatch = String(repoRaw).match(/(?:github\.com\/|github:)([^/]+\/[^/.#]+)/i);
        this.installedRepos.set(name, repoMatch ? repoMatch[1].toLowerCase() : null);
        if (isLocal) {
          // Published = exists on the npm registry (we probe the mirror) or
          // the package declares a public repository. Only informational.
          const onNpm = this.npmAvailable?.get(name);
          const repo = (pkg.repository as { url?: unknown } | undefined)?.url;
          repoUrl = typeof repo === 'string' && repo ? repo : null;
          published = onNpm === true || repoUrl !== null;
        }
      } catch { group = 'other'; groupLabel = '其他插件'; }
      if (!isDsh && group === 'tool') { group = 'other'; groupLabel = '其他插件'; }
      const managed = patchSource.includes(`id: ${name}`);
      // Category by source ownership: local install ⇒ user's own plugin.
      const category = isLocal ? 'own' : 'download';
      const localVersion = String(pkg?.version ?? '');
      const storeRow = this.db.getPlugin(name);
      const latestVersion = storeRow?.version ?? null;
      result.push({
        packageName: name,
        entryId: name,
        name,
        category,
        group,
        groupLabel,
        enabled: this.enabledOf(name) ?? true,
        phase: null,
        managed,
        protected: false,
        type: category,
        localPath: category === 'own' ? localPath : null,
        published,
        repoUrl: category === 'own' ? repoUrl : null,
        version: localVersion || null,
        latestVersion,
        hasUpdate: semverLt(localVersion, latestVersion),
      });
    }
    this.installedCache = { at: Date.now(), value: result };
    return result;
  }

  @Remote('setCategoryEnabled')
  async setCategoryEnabled(category: string, enabled: boolean, actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const throttled = this.throttle('setCategoryEnabled', 20);
    if (throttled) return { ok: false, message: throttled, detail: null, skipped: 0, changed: 0 };
    const cat = String(category ?? '').trim();
    if (cat !== 'system' && cat !== 'download' && cat !== 'own') {
      return { ok: false, message: `未知分类: ${cat}`, detail: null, skipped: 0, changed: 0 };
    }
    const list = (await this.installed()) as Array<Record<string, unknown>>;
    const targets = list.filter((p) => p.category === cat && p.protected !== true);
    let changed = 0;
    const skipped: Array<Record<string, unknown>> = [];
    for (const p of targets) {
      const name = String(p.packageName);
      const entryId = String(p.entryId ?? name);
      const current = this.enabledOf(name);
      if (current === enabled) continue;
      try {
        await setPluginEnabled(this.profile, entryId, String(p.name ?? name), enabled);
        changed++;
      } catch (error) {
        skipped.push({ packageName: name, message: error instanceof Error ? error.message : String(error) });
      }
    }
    this.appendAudit(cat === 'system' ? 'system_toggle' : 'download_toggle', cat, changed > 0 || skipped.length === 0 ? 'ok' : 'failed', `${enabled ? '启用' : '禁用'} ${changed} 项${skipped.length ? `，跳过 ${skipped.length} 项` : ''}`, actor);
    if (changed > 0) this.installedCache = null;
    return { ok: skipped.length === 0, message: `${enabled ? '已启用' : '已禁用'} ${changed} 项${skipped.length ? `，${skipped.length} 项失败（受保护或加载中）` : ''}`, detail: null, changed, skipped };
  }

  @Remote('rate')
  async rate(packageName: string, score: number, comment: string, actorRaw: string): Promise<Record<string, unknown>> {
    const actor = sanitizeActor(actorRaw);
    const throttled = this.throttle('rate', 60);
    if (throttled) return { ok: false, message: throttled, detail: null };
    const name = String(packageName).trim();
    const s = Math.min(5, Math.max(1, Math.round(Number(score) || 0)));
    const c = String(comment ?? '').trim().slice(0, 2000);
    if (!this.db.getPlugin(name)) {
      this.appendAudit('rate', name, 'failed', 'unknown plugin', actor);
      return { ok: false, message: `插件不存在: ${name}`, detail: null };
    }
    this.db.upsertRating(name, actor, s, c);
    this.appendAudit('rate', name, 'ok', `score ${s}${c ? ` — ${c.slice(0, 80)}` : ''}`, actor);
    return { ok: true, message: '评分已提交，感谢反馈', detail: null };
  }

  @Remote('listReviews')
  async listReviews(packageName: string): Promise<Array<Record<string, unknown>>> {
    return this.db.listReviews(String(packageName).trim()).map((row) => ({ ...row }));
  }

  @Remote('audit')
  async audit(query: AuditQueryInput = {}): Promise<Record<string, unknown>> {
    const { total, rows } = this.db.queryAudit({
      action: query.action ?? null,
      actor: query.actor ?? null,
      target: query.target ?? null,
      limit: query.limit ?? 100,
      offset: query.offset ?? 0,
    });
    return { total, rows };
  }

  @Remote('dependencyGraph')
  async dependencyGraph(packageName: string): Promise<Record<string, unknown>> {
    const name = String(packageName).trim();
    const row = this.db.getPlugin(name);
    if (row === undefined) throw new Error(`插件不存在: ${name}`);
    const installed = this.installedPackageNames();
    const dependents = this.db.dependentsOf(name).map((dep) => {
      const depRow = this.db.getPlugin(dep.packageName);
      const depRating = this.db.ratingStats(dep.packageName);
      return {
        packageName: dep.packageName,
        name: depRow?.name ?? dep.packageName,
        version: depRow?.version ?? dep.version,
        rating: depRating.avg,
        installed: installed.has(dep.packageName),
      };
    });
    return {
      root: name,
      rootName: row.name,
      dependencies: this.db.dependenciesOf(name),
      dependents,
    };
  }

  @Remote('scaffold')
  async scaffold(): Promise<Record<string, unknown>> {
    return {
      templateRepo: 'deepseek-ai/deepseek-harness',
      templateUrl: 'https://github.com/deepseek-ai/deepseek-harness',
      docsUrl: 'https://github.com/deepseek-ai/deepseek-harness#readme',
      guide:
        'DSH 插件是一个 npm 包：package.json 中声明 dsh.bundle.patch（host 端 cordis.patch.yml 层）与 dsh.client.platform: "web"（浏览器端 UI 包）。' +
        '开发完成后用 dsh plugin add 本地安装（自动归入「自创作插件」），然后打开商店「发布」页：输入 GitHub / npm 令牌 → 选择插件 → 填 Markdown 图文介绍 → ' +
        '选公开/私人 + 标签 → 一键发布。发布前会经过安全扫描（高风险自动驳回），公开即上线，下次镜像同步后即可在本商店中被检索与一键安装。',
      commands: [
        'git clone https://github.com/your-name/my-dsh-plugin && cd my-dsh-plugin   # 或从零 npm init',
        'npm init -y   # 添加 dsh.bundle / dsh.client 声明',
        'dsh plugin --profile web add .   # 本地安装调试（自动进入「自创作插件」）',
        '# 打开商店「发布」页 → 填令牌 → 一键发布（安全扫描自动拦截高风险）',
        'npm view dsh-plugin-hub # 或直接在本商店「发布」页完成 GitHub + npm 双通道发布',
      ],
      categories: ['tool', 'agent', 'ui', 'data'],
    };
  }
}

export default PluginStoreService;
