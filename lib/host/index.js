var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
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
import { storeDB, resolveDshHome } from './store-db.js';
import { GitHubClient, runMirrorSync, extractUsage, extractBestPractices, extractHighlights } from './github.js';
import { resolveProfile, installPlugin as runInstall, uninstallPlugin as runUninstall, setPluginEnabled, gitSpecFor, } from './installer.js';
import { npmAvailability, clearNpmCache } from './npm-probe.js';
import { publishPlugin as runPublish } from './publish.js';
import { computeHealth } from './health.js';
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
const SYSTEM_GROUP_META = {
    core: '核心服务', ui: '界面增强', tool: '开发工具', other: '其他系统组件',
};
/** Map a Loader entry id to a system sub-group bucket. */
function systemGroupOf(entryId, packageName) {
    const id = String(entryId ?? '').toLowerCase();
    const pkg = String(packageName ?? '').toLowerCase();
    if (id === 'include' || id === 'timer' || id === 'hmr' || id === 'modules' || id === 'runtime' || id === 'connection' || id === 'api-gateway' || id === 'api-remotes')
        return 'core';
    if (id.startsWith('client-') || id.startsWith('ui-') || id === 'locale' || pkg.includes('client-ui'))
        return 'ui';
    if (id.includes('tool') || pkg.includes('tool') || pkg.includes('agent') || pkg.includes('cmdline') || pkg.includes('skill'))
        return 'tool';
    return 'other';
}
/** True when `a` (installed) is older than `b` (latest). Lenient parse. */
function semverLt(a, b) {
    if (!a || !b)
        return false;
    const pa = a.replace(/^v/i, '').split(/[.-]/).map((n) => Number.parseInt(n, 10) || 0);
    const pb = b.replace(/^v/i, '').split(/[.-]/).map((n) => Number.parseInt(n, 10) || 0);
    for (let i = 0; i < 3; i++) {
        const x = pa[i] ?? 0;
        const y = pb[i] ?? 0;
        if (x !== y)
            return x < y;
    }
    return false;
}
function sanitizeActor(raw) {
    const trimmed = String(raw ?? '').trim().slice(0, 64);
    if (trimmed)
        return trimmed;
    try {
        const home = resolveDshHome();
        const file = join(home, '.anonymous-user-id');
        if (existsSync(file)) {
            const id = readFileSync(file, 'utf8').trim().slice(0, 64);
            if (id)
                return `anonymous-${id}`;
        }
    }
    catch { /* ignore */ }
    return 'anonymous';
}
/** Stable string hash (FNV-1a-ish) — used for the daily-seeded random sort. */
function hashStr(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
function readdirSyncSafe(dir) {
    try {
        return readdirSync(dir);
    }
    catch {
        return [];
    }
}
function mkdirSyncSafe(dir, opts) {
    try {
        mkdirSync(dir, opts);
    }
    catch { /* ignore */ }
}
function rmSyncSafe(path, opts) {
    try {
        rmSync(path, opts);
    }
    catch { /* ignore */ }
}
function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/** List a repo directory via the GitHub contents API ([] on 404/error). */
async function listRepoDir(github, owner, repo, dir) {
    try {
        const data = await github.apiGet(`/repos/${owner}/${repo}/contents/${encodeURIComponent(dir)}`);
        if (!Array.isArray(data))
            return [];
        return data
            .filter((f) => f && typeof f.name === 'string' && (f.type === 'file' || f.type === 'dir'))
            .map((f) => ({ name: String(f.name), type: f.type === 'dir' ? 'dir' : 'file', size: Number(f.size ?? 0) }));
    }
    catch {
        return [];
    }
}
/** Per-day seed so the "random" order is stable within a day, fresh every day. */
function dailySeed() {
    const now = new Date();
    const day = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    return hashStr(day);
}
function resolveTokenMask(token) {
    if (!token)
        return '';
    return token.length <= 4 ? '••••' : `••••${token.slice(-4)}`;
}
/** The long-lived host service behind `ctx.pluginStore`. */
let PluginStoreService = (() => {
    let _classSuper = TypertRemoteService;
    let _instanceExtraInitializers = [];
    let _list_decorators;
    let _detail_decorators;
    let _healthHub_decorators;
    let _healthDetail_decorators;
    let _wikiHub_decorators;
    let _wiki_decorators;
    let _skillList_decorators;
    let _skillDetail_decorators;
    let _skillInstall_decorators;
    let _skillUninstall_decorators;
    let _skillInstalled_decorators;
    let _bench_decorators;
    let _connectorStatus_decorators;
    let _connectorConfigSet_decorators;
    let _benchRun_decorators;
    let _syncNow_decorators;
    let _syncStatus_decorators;
    let _settings_decorators;
    let _setGithubToken_decorators;
    let _clearGithubToken_decorators;
    let _setSchedule_decorators;
    let _installPlugin_decorators;
    let _installProgress_decorators;
    let _issues_decorators;
    let _myPlugins_decorators;
    let _publishProgress_decorators;
    let _publish_decorators;
    let _uninstall_decorators;
    let _setEnabled_decorators;
    let _installed_decorators;
    let _setCategoryEnabled_decorators;
    let _rate_decorators;
    let _listReviews_decorators;
    let _audit_decorators;
    let _dependencyGraph_decorators;
    let _scaffold_decorators;
    return class PluginStoreService extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _list_decorators = [Remote('list')];
            _detail_decorators = [Remote('detail')];
            _healthHub_decorators = [Remote('healthHub')];
            _healthDetail_decorators = [Remote('healthDetail')];
            _wikiHub_decorators = [Remote('wikiHub')];
            _wiki_decorators = [Remote('wiki')];
            _skillList_decorators = [Remote('skillList')];
            _skillDetail_decorators = [Remote('skillDetail')];
            _skillInstall_decorators = [Remote('skillInstall')];
            _skillUninstall_decorators = [Remote('skillUninstall')];
            _skillInstalled_decorators = [Remote('skillInstalled')];
            _bench_decorators = [Remote('bench')];
            _connectorStatus_decorators = [Remote('connectorStatus')];
            _connectorConfigSet_decorators = [Remote('connectorConfigSet')];
            _benchRun_decorators = [Remote('benchRun')];
            _syncNow_decorators = [Remote('syncNow')];
            _syncStatus_decorators = [Remote('syncStatus')];
            _settings_decorators = [Remote('settings')];
            _setGithubToken_decorators = [Remote('setGithubToken')];
            _clearGithubToken_decorators = [Remote('clearGithubToken')];
            _setSchedule_decorators = [Remote('setSchedule')];
            _installPlugin_decorators = [Remote('installPlugin')];
            _installProgress_decorators = [Remote('installProgress')];
            _issues_decorators = [Remote('issues')];
            _myPlugins_decorators = [Remote('myPlugins')];
            _publishProgress_decorators = [Remote('publishProgress')];
            _publish_decorators = [Remote('publish')];
            _uninstall_decorators = [Remote('uninstall')];
            _setEnabled_decorators = [Remote('setEnabled')];
            _installed_decorators = [Remote('installed')];
            _setCategoryEnabled_decorators = [Remote('setCategoryEnabled')];
            _rate_decorators = [Remote('rate')];
            _listReviews_decorators = [Remote('listReviews')];
            _audit_decorators = [Remote('audit')];
            _dependencyGraph_decorators = [Remote('dependencyGraph')];
            _scaffold_decorators = [Remote('scaffold')];
            __esDecorate(this, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: obj => "list" in obj, get: obj => obj.list }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _detail_decorators, { kind: "method", name: "detail", static: false, private: false, access: { has: obj => "detail" in obj, get: obj => obj.detail }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _healthHub_decorators, { kind: "method", name: "healthHub", static: false, private: false, access: { has: obj => "healthHub" in obj, get: obj => obj.healthHub }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _healthDetail_decorators, { kind: "method", name: "healthDetail", static: false, private: false, access: { has: obj => "healthDetail" in obj, get: obj => obj.healthDetail }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _wikiHub_decorators, { kind: "method", name: "wikiHub", static: false, private: false, access: { has: obj => "wikiHub" in obj, get: obj => obj.wikiHub }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _wiki_decorators, { kind: "method", name: "wiki", static: false, private: false, access: { has: obj => "wiki" in obj, get: obj => obj.wiki }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _skillList_decorators, { kind: "method", name: "skillList", static: false, private: false, access: { has: obj => "skillList" in obj, get: obj => obj.skillList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _skillDetail_decorators, { kind: "method", name: "skillDetail", static: false, private: false, access: { has: obj => "skillDetail" in obj, get: obj => obj.skillDetail }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _skillInstall_decorators, { kind: "method", name: "skillInstall", static: false, private: false, access: { has: obj => "skillInstall" in obj, get: obj => obj.skillInstall }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _skillUninstall_decorators, { kind: "method", name: "skillUninstall", static: false, private: false, access: { has: obj => "skillUninstall" in obj, get: obj => obj.skillUninstall }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _skillInstalled_decorators, { kind: "method", name: "skillInstalled", static: false, private: false, access: { has: obj => "skillInstalled" in obj, get: obj => obj.skillInstalled }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _bench_decorators, { kind: "method", name: "bench", static: false, private: false, access: { has: obj => "bench" in obj, get: obj => obj.bench }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _connectorStatus_decorators, { kind: "method", name: "connectorStatus", static: false, private: false, access: { has: obj => "connectorStatus" in obj, get: obj => obj.connectorStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _connectorConfigSet_decorators, { kind: "method", name: "connectorConfigSet", static: false, private: false, access: { has: obj => "connectorConfigSet" in obj, get: obj => obj.connectorConfigSet }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _benchRun_decorators, { kind: "method", name: "benchRun", static: false, private: false, access: { has: obj => "benchRun" in obj, get: obj => obj.benchRun }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _syncNow_decorators, { kind: "method", name: "syncNow", static: false, private: false, access: { has: obj => "syncNow" in obj, get: obj => obj.syncNow }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _syncStatus_decorators, { kind: "method", name: "syncStatus", static: false, private: false, access: { has: obj => "syncStatus" in obj, get: obj => obj.syncStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _settings_decorators, { kind: "method", name: "settings", static: false, private: false, access: { has: obj => "settings" in obj, get: obj => obj.settings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _setGithubToken_decorators, { kind: "method", name: "setGithubToken", static: false, private: false, access: { has: obj => "setGithubToken" in obj, get: obj => obj.setGithubToken }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _clearGithubToken_decorators, { kind: "method", name: "clearGithubToken", static: false, private: false, access: { has: obj => "clearGithubToken" in obj, get: obj => obj.clearGithubToken }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _setSchedule_decorators, { kind: "method", name: "setSchedule", static: false, private: false, access: { has: obj => "setSchedule" in obj, get: obj => obj.setSchedule }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _installPlugin_decorators, { kind: "method", name: "installPlugin", static: false, private: false, access: { has: obj => "installPlugin" in obj, get: obj => obj.installPlugin }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _installProgress_decorators, { kind: "method", name: "installProgress", static: false, private: false, access: { has: obj => "installProgress" in obj, get: obj => obj.installProgress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _issues_decorators, { kind: "method", name: "issues", static: false, private: false, access: { has: obj => "issues" in obj, get: obj => obj.issues }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _myPlugins_decorators, { kind: "method", name: "myPlugins", static: false, private: false, access: { has: obj => "myPlugins" in obj, get: obj => obj.myPlugins }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _publishProgress_decorators, { kind: "method", name: "publishProgress", static: false, private: false, access: { has: obj => "publishProgress" in obj, get: obj => obj.publishProgress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _publish_decorators, { kind: "method", name: "publish", static: false, private: false, access: { has: obj => "publish" in obj, get: obj => obj.publish }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _uninstall_decorators, { kind: "method", name: "uninstall", static: false, private: false, access: { has: obj => "uninstall" in obj, get: obj => obj.uninstall }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _setEnabled_decorators, { kind: "method", name: "setEnabled", static: false, private: false, access: { has: obj => "setEnabled" in obj, get: obj => obj.setEnabled }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _installed_decorators, { kind: "method", name: "installed", static: false, private: false, access: { has: obj => "installed" in obj, get: obj => obj.installed }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _setCategoryEnabled_decorators, { kind: "method", name: "setCategoryEnabled", static: false, private: false, access: { has: obj => "setCategoryEnabled" in obj, get: obj => obj.setCategoryEnabled }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _rate_decorators, { kind: "method", name: "rate", static: false, private: false, access: { has: obj => "rate" in obj, get: obj => obj.rate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listReviews_decorators, { kind: "method", name: "listReviews", static: false, private: false, access: { has: obj => "listReviews" in obj, get: obj => obj.listReviews }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _audit_decorators, { kind: "method", name: "audit", static: false, private: false, access: { has: obj => "audit" in obj, get: obj => obj.audit }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _dependencyGraph_decorators, { kind: "method", name: "dependencyGraph", static: false, private: false, access: { has: obj => "dependencyGraph" in obj, get: obj => obj.dependencyGraph }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _scaffold_decorators, { kind: "method", name: "scaffold", static: false, private: false, access: { has: obj => "scaffold" in obj, get: obj => obj.scaffold }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static inject = ['loader'];
        db = __runInitializers(this, _instanceExtraInitializers);
        github;
        profile;
        ctx;
        syncing = false;
        timer = null;
        lastSyncError = null;
        npmAvailable = null;
        /** Live install progress per package (polled by the UI). */
        installProgressMap = new Map();
        /** Live publish progress per package (polled by the UI). */
        publishProgressMap = new Map();
        /** Short-TTL cache of installed() — avoids full per-package disk I/O on
         * every UI refresh (require.resolve + readFileSync per dependency). */
        installedCache = null;
        /** Per-repo GitHub issues cache (5 min TTL) for the detail view. */
        issuesCache = new Map();
        /** Installed package → its package.json repository owner/name (null = unknown).
         * Built alongside the installed() cache; used to disambiguate same-name
         * plugins from different repositories. */
        installedRepos = new Map();
        /** Write-op rate limiter (per action, 60s window) — application-layer guard
         * against request flooding; the Host allowlist lives in the dsh gateway. */
        writeThrottle = new Map();
        /** npm daily download trend cache (6h TTL) per package. */
        trendCache = new Map();
        /** Per-repo activity caches: commit days (`c:repo`) and star gains (`s:repo`). */
        activityCache = new Map();
        /** Returns a message when the action is throttled, null when allowed. */
        throttle(action, limitPerMinute = 30) {
            const now = Date.now();
            const entry = this.writeThrottle.get(action);
            if (!entry || now - entry.start > 60_000) {
                this.writeThrottle.set(action, { start: now, count: 1 });
                return null;
            }
            if (entry.count >= limitPerMinute)
                return '操作过于频繁，请稍后再试';
            entry.count++;
            return null;
        }
        constructor(ctx, config = {}) {
            super(ctx, 'pluginStore');
            this.ctx = ctx;
            this.db = storeDB();
            this.github = new GitHubClient(this.db.getMeta('github_token'));
            this.profile = resolveProfile(ctx.loader.ctx.baseUrl);
            void config;
            this.scheduleTimer();
            // Warm the npm-availability probe in the background (registry HEAD checks).
            void npmAvailability(this.db).then((map) => { this.npmAvailable = map; }).catch(() => { });
            ctx.effect(() => () => {
                if (this.timer !== null)
                    clearInterval(this.timer);
                this.db.close();
            }, 'dsh-plugin-hub: scheduler + db lifetime');
        }
        get loader() {
            return this.ctx.loader;
        }
        scheduleTimer() {
            if (this.timer !== null)
                clearInterval(this.timer);
            const hours = Number(this.db.getMeta('mirror_schedule_hours') ?? 24);
            if (!Number.isFinite(hours) || hours <= 0)
                return;
            this.timer = setInterval(() => {
                void this.runSync('scheduled');
            }, hours * 3600_000);
            this.timer.unref?.();
        }
        /** Kick off a background mirror sync (fire-and-forget from the RPC side). */
        async runSync(reason) {
            if (this.syncing)
                return;
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
                    }
                    else {
                        this.db.setMeta('trust_error', trust.error ?? '');
                    }
                }
                catch (e) {
                    this.db.setMeta('trust_error', e instanceof Error ? e.message : String(e));
                }
                // Blue-Whale catalog sync (extension directory for the encyclopedia) —
                // also fail-safe, never blocks the mirror.
                try {
                    const cat = await syncBlueWhaleCatalog(this.db);
                    if (!cat.ok)
                        this.db.setMeta('catalog_error', cat.error ?? '');
                }
                catch (e) {
                    this.db.setMeta('catalog_error', e instanceof Error ? e.message : String(e));
                }
                // Skill registry sync (conversation-callable SKILL.md) — fail-safe too.
                try {
                    const sk = await syncSkills(this.github, this.db);
                    if (!sk.ok)
                        this.db.setMeta('skill_error', sk.error ?? '');
                }
                catch (e) {
                    this.db.setMeta('skill_error', e instanceof Error ? e.message : String(e));
                }
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                this.lastSyncError = message;
                this.db.setMeta('sync_state', 'error');
                this.db.setMeta('last_sync_error', message);
                this.appendAudit('sync', 'github-mirror', 'failed', `${reason}: ${message}`);
            }
            finally {
                this.syncing = false;
            }
        }
        appendAudit(action, target, result, message, actor = 'system') {
            try {
                this.db.appendAudit({ actor, action, target, result, message });
            }
            catch { /* audit must never break the operation */ }
        }
        // ---- helpers ---------------------------------------------------------------
        installedPackageNames() {
            const set = new Set();
            try {
                const manifest = JSON.parse(readFileSync(this.profile.packageJsonFile, 'utf8'));
                const deps = (manifest.dependencies ?? {});
                for (const name of Object.keys(deps))
                    set.add(name);
            }
            catch { /* unreadable profile */ }
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
                        if (m)
                            set.add(m[1]);
                    }
                }
            }
            catch { /* no patch file */ }
            return set;
        }
        enabledOf(packageName) {
            try {
                const entries = [...this.loader.entries()];
                const entry = entries.find((e) => e.options.id === packageName || e.options.name === packageName);
                return entry === undefined ? null : !entry.disabled;
            }
            catch {
                return null;
            }
        }
        /** True when the plugin row is installed, with repository disambiguation:
         * same-name plugins from different repos must match by `repository` field. */
        isInstalled(packageName, repoFullName, installed) {
            if (!installed.has(packageName))
                return false;
            if (!repoFullName)
                return true; // store row without a repo — name check suffices
            const repo = this.installedRepos.get(packageName);
            if (repo === null || repo === undefined)
                return true; // installed pkg has no repo → name check
            return repo === repoFullName.toLowerCase();
        }
        project(row, installed, ratingMap) {
            const rating = ratingMap?.get(row.packageName) ?? this.db.ratingStats(row.packageName);
            const onNpm = this.npmAvailable?.get(row.packageName) ?? false;
            return {
                packageName: row.packageName,
                repoFullName: row.repoFullName,
                name: row.name,
                shortDescription: row.shortDescription,
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
                updatedAt: row.updatedAt,
                source: onNpm ? 'npm' : 'github',
                hasNpm: onNpm,
                hasGit: Boolean(row.repoFullName),
                trustLevel: row.trustLevel ?? null,
            };
        }
        async specFor(packageName, source = 'auto') {
            const row = this.db.getPlugin(packageName);
            const repo = row?.repoFullName;
            const onNpm = this.npmAvailable?.get(packageName) ?? false;
            // GitHub git ref: use the default branch (e.g. main), NOT row.version —
            // that is a GitHub *Release* version number (0.1.0), which is usually not
            // a git tag/branch, so pnpm cannot resolve `…#0.1.0` to a commit.
            const gitRef = row?.defaultBranch ?? 'main';
            if (source === 'git') {
                if (repo)
                    return { spec: gitSpecFor(repo, gitRef), source: 'git' };
                return { spec: packageName, source: 'git' };
            }
            if (source === 'npm' || onNpm) {
                // npm registry package.
                try {
                    const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`, { signal: AbortSignal.timeout(10000) });
                    if (res.ok) {
                        const data = await res.json();
                        const version = data['dist-tags']?.latest ?? data.version;
                        return { spec: version ? `${packageName}@${version}` : packageName, source: 'npm' };
                    }
                }
                catch { /* fall through to git */ }
            }
            if (repo)
                return { spec: gitSpecFor(repo, gitRef), source: 'git' };
            return { spec: packageName, source: 'npm' };
        }
        // ---- remote surface ---------------------------------------------------------
        async list(filters = {}) {
            const { category = null, query = null, sort = null, installedOnly = false } = filters ?? {};
            const limit = Math.min(Math.max(filters?.limit ?? 200, 1), 500);
            const offset = Math.max(filters?.offset ?? 0, 0);
            const installed = this.installedPackageNames();
            const q = (query ?? '').trim().toLowerCase();
            const ratingMap = this.db.ratingStatsAll(); // one query, not N
            const versionCounts = this.db.versionCounts(); // one query, for health snapshot
            let rows = this.db.allPlugins().map((row) => {
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
            if (category)
                rows = rows.filter((p) => p.categories.includes(category));
            if (q) {
                rows = rows.filter((p) => p.packageName.toLowerCase().includes(q) ||
                    p.name.toLowerCase().includes(q) ||
                    p.shortDescription.toLowerCase().includes(q) ||
                    p.developer.toLowerCase().includes(q) ||
                    p.repoFullName.toLowerCase().includes(q));
            }
            if (installedOnly)
                rows = rows.filter((p) => p.installed);
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
        async detail(packageName) {
            const row = this.db.getPlugin(packageName);
            if (row === undefined)
                throw new Error(`插件不存在: ${packageName}（可能尚未同步，请先在设置中同步镜像）`);
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
                }
                catch { /* keep cached value */ }
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
        installedVersionOf(packageName) {
            if (!this.installedPackageNames().has(packageName))
                return null;
            const require = createRequire(join(this.profile.directory, 'noop.js'));
            try {
                const pkgPath = require.resolve(`${packageName}/package.json`);
                const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
                return typeof pkg.version === 'string' && pkg.version ? pkg.version : null;
            }
            catch {
                return null;
            }
        }
        installedHasUpdate(packageName, latest) {
            if (!latest)
                return false;
            return semverLt(this.installedVersionOf(packageName), latest);
        }
        /** Health overview for every mirrored plugin, sorted by score. */
        async healthHub() {
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
                let openIssues = null;
                try {
                    const issues = await this.issues(p.packageName);
                    openIssues = issues.filter((i) => i.state === 'open').length;
                }
                catch { /* keep neutral */ }
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
            return { updatedAt, items: top };
        }
        /** Per-plugin health detail: score breakdown + release timeline + npm
         * download trend + open issue count (live). */
        async healthDetail(packageName) {
            const name = String(packageName).trim();
            const row = this.db.getPlugin(name);
            if (row === undefined)
                throw new Error(`插件不存在: ${name}`);
            const versions = this.db.listVersions(name);
            let openIssues = null;
            try {
                const issues = await this.issues(name);
                openIssues = issues.filter((i) => i.state === 'open').length;
            }
            catch { /* keep null */ }
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
        async commitActivityOf(row) {
            const repo = row.repoFullName;
            if (!repo || !repo.includes('/'))
                return [];
            const cached = this.activityCache.get(`c:${repo}`);
            if (cached && Date.now() - cached.at < 6 * 60 * 60_000)
                return cached.value;
            const [owner, repoName] = repo.split('/');
            const since = new Date(Date.now() - 60 * 86_400_000).toISOString();
            const value = await this.github.commitDays(owner, repoName, since);
            this.activityCache.set(`c:${repo}`, { at: Date.now(), value });
            return value;
        }
        /** Per-day star gains for a repo (6h cache). */
        async starGainsOf(row) {
            const repo = row.repoFullName;
            if (!repo || !repo.includes('/'))
                return [];
            const cached = this.activityCache.get(`s:${repo}`);
            if (cached && Date.now() - cached.at < 6 * 60 * 60_000)
                return cached.value;
            const [owner, repoName] = repo.split('/');
            const value = await this.github.starGainDays(owner, repoName);
            this.activityCache.set(`s:${repo}`, { at: Date.now(), value });
            return value;
        }
        /** Encyclopedia directory: mirrored plugins + external catalog entries. */
        async wikiHub(raw = {}) {
            const query = String(raw?.query ?? '').trim().toLowerCase();
            const category = String(raw?.category ?? '').trim();
            const source = String(raw?.source ?? '').trim(); // 'mirror' | 'catalog' | ''
            const limit = Math.min(Math.max(Number(raw?.limit ?? 200), 1), 500);
            const offset = Math.max(Number(raw?.offset ?? 0), 0);
            const catalog = this.db.catalogRepos();
            const known = new Set();
            const items = [];
            for (const row of this.db.allPlugins()) {
                known.add(row.repoFullName.toLowerCase());
                if (source === 'catalog')
                    continue;
                const categories = JSON.parse(row.categories || '[]');
                if (category && !categories.includes(category))
                    continue;
                if (query && !(row.packageName.toLowerCase().includes(query) || row.name.toLowerCase().includes(query) || row.shortDescription.toLowerCase().includes(query) || row.repoFullName.toLowerCase().includes(query)))
                    continue;
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
                    if (known.has(repo.toLowerCase()))
                        continue;
                    const [owner, name] = repo.split('/');
                    if (category)
                        continue; // catalog entries have no category info
                    if (query && !(repo.toLowerCase().includes(query) || name?.toLowerCase().includes(query)))
                        continue;
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
        async wiki(packageName) {
            const name = String(packageName).trim();
            const row = this.db.getPlugin(name);
            if (row === undefined)
                throw new Error(`插件不存在: ${name}`);
            const versions = this.db.listVersions(name);
            const deps = this.db.dependenciesOf(name);
            const categories = JSON.parse(row.categories || '[]');
            // related plugins: same category, top by stars.
            const related = this.db.allPlugins()
                .filter((r) => r.packageName !== name && JSON.parse(r.categories || '[]').some((c) => categories.includes(c)))
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
        async npmDownloadTrend(packageName) {
            const cached = this.trendCache.get(packageName);
            if (cached && Date.now() - cached.at < 6 * 60 * 60_000)
                return cached.value;
            const start = new Date(Date.now() - 90 * 86_400_000).toISOString().slice(0, 10);
            const end = new Date().toISOString().slice(0, 10);
            try {
                const res = await fetch(`https://api.npmjs.org/downloads/range/${start}:${end}/${encodeURIComponent(packageName)}`, { signal: AbortSignal.timeout(10_000) });
                if (!res.ok)
                    return [];
                const data = await res.json();
                const value = (data.downloads ?? []).map((d) => ({ date: d.day, downloads: Number(d.downloads) || 0 }));
                this.trendCache.set(packageName, { at: Date.now(), value });
                return value;
            }
            catch {
                return [];
            }
        }
        // ---- skills (conversation-callable SKILL.md) --------------------------------
        /** Skill discovery dirs in $DSH_HOME (user-level, available in every project's conversation). */
        skillHomeDirs() {
            const home = resolveDshHome();
            return [join(home, 'skills'), join(homedir(), '.agents', 'skills')];
        }
        installedSkills() {
            const out = [];
            for (const root of this.skillHomeDirs()) {
                let entries = [];
                try {
                    entries = readdirSyncSafe(root);
                }
                catch {
                    continue;
                }
                for (const name of entries) {
                    const dir = join(root, name);
                    try {
                        const md = readFileSync(join(dir, 'SKILL.md'), 'utf8');
                        const meta = parseSkillFrontmatter(md);
                        out.push({ name: meta.name || name, dir, description: meta.description, version: meta.version });
                    }
                    catch { /* not a skill directory */ }
                }
            }
            return out;
        }
        /** All collected skills with installed state. */
        async skillList(filters = {}) {
            const q = String(filters?.query ?? '').trim().toLowerCase();
            const cat = String(filters?.category ?? '').trim();
            const plat = String(filters?.platform ?? '').trim();
            const installed = new Set(this.installedSkills().map((s) => s.name));
            let rows = this.db.allSkills();
            if (q) {
                rows = rows.filter((s) => s.name.toLowerCase().includes(q) ||
                    s.description.toLowerCase().includes(q) ||
                    String(s.author).toLowerCase().includes(q) ||
                    String(s.repoFullName).toLowerCase().includes(q));
            }
            if (cat && cat !== 'all')
                rows = rows.filter((s) => (s.categories ?? []).includes(cat));
            if (plat && plat !== 'all')
                rows = rows.filter((s) => (s.platform ?? 'general') === plat);
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
        async skillDetail(id) {
            const skill = this.db.getSkill(String(id).trim());
            if (!skill)
                throw new Error('Skill 不存在（可能尚未同步，试试先「立即同步」）');
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
        async skillInstall(id, actorRaw) {
            const actor = sanitizeActor(actorRaw);
            const skill = this.db.getSkill(String(id).trim());
            if (!skill)
                return { ok: false, message: 'Skill 不存在', detail: null };
            const target = join(resolveDshHome(), 'skills', skill.name);
            try {
                mkdirSyncSafe(join(target, 'assets'), { recursive: true });
                writeFileSync(join(target, 'SKILL.md'), skill.content ?? '', 'utf8');
                // best-effort: pull small sibling files (scripts/references/assets) so the
                // skill works offline — limited count & size, never fails the install.
                if (skill.repoFullName && skill.skillPath) {
                    const [owner, repo] = skill.repoFullName.split('/');
                    const dir = skill.skillPath.replace(/SKILL\.md$/i, '').replace(/\/$/, '');
                    const siblings = await this.skillSiblings(owner, repo, dir);
                    for (const s of siblings) {
                        try {
                            const buf = await this.github.rawFile(owner, repo, 'HEAD', s);
                            if (buf === null)
                                continue;
                            const rel = s.replace(new RegExp(`^${escapeRegExp(dir)}/`), '');
                            writeFileSync(join(target, rel), buf, 'utf8');
                        }
                        catch { /* best-effort */ }
                    }
                }
                this.appendAudit('skill_install', skill.name, 'ok', `installed from ${skill.repoFullName}`, actor);
                return { ok: true, message: `Skill「${skill.name}」已安装，重启后可在对话中调用`, detail: join(target, 'SKILL.md') };
            }
            catch (error) {
                return { ok: false, message: `安装失败: ${error instanceof Error ? error.message : String(error)}`, detail: null };
            }
        }
        /** Remove an installed skill directory. */
        async skillUninstall(name, actorRaw) {
            const actor = sanitizeActor(actorRaw);
            const target = join(resolveDshHome(), 'skills', String(name).trim());
            try {
                if (!existsSync(join(target, 'SKILL.md')))
                    return { ok: false, message: `Skill「${name}」未安装`, detail: null };
                rmSyncSafe(target, { recursive: true, force: true });
                this.appendAudit('skill_uninstall', String(name), 'ok', 'removed', actor);
                return { ok: true, message: `Skill「${name}」已卸载`, detail: null };
            }
            catch (error) {
                return { ok: false, message: `卸载失败: ${error instanceof Error ? error.message : String(error)}`, detail: null };
            }
        }
        /** Locally installed skills (from $DSH_HOME/skills + ~/.agents/skills). */
        async skillInstalled() {
            return this.installedSkills().map((s) => ({
                name: s.name,
                dir: s.dir,
                description: s.description,
                version: s.version,
            }));
        }
        /** dsh-bench 跑分（独立项目产出，按插件名索引；报告缺失/失败优雅降级）。 */
        async bench(packageName) {
            const path = process.env.DSH_BENCH_JSON || join(resolveDshHome(), 'storages', 'dsh-bench', 'benchmark.json');
            try {
                const data = JSON.parse(readFileSync(path, 'utf8'));
                const entries = Array.isArray(data.entries) ? data.entries : [];
                const entry = entries.find((e) => String(e.target ?? '') === String(packageName)) ?? null;
                const ok = entries.filter((e) => e.ok);
                const avgScore = ok.length > 0
                    ? Math.round(ok.reduce((s, e) => s + Number(e.score ?? 0), 0) / ok.length)
                    : null;
                return { found: entry !== null, updatedAt: data.generatedAt ?? null, entry, ecosystemAvg: avgScore };
            }
            catch {
                return { found: false, updatedAt: null, entry: null, ecosystemAvg: null };
            }
        }
        /** dsh-connector 状态：插件是否安装 + 各平台配置/运行状态（读状态文件，插件写入）。 */
        async connectorStatus() {
            const connectorPkg = join(resolveDshHome(), 'profiles', this.profile.profileName, 'node_modules', 'dsh-connector');
            const installed = existsSync(connectorPkg);
            const storeDir = join(resolveDshHome(), 'storages', 'dsh-connector');
            let config = {};
            let status = {};
            try {
                const cfgPath = join(storeDir, 'config.json');
                if (existsSync(cfgPath))
                    config = JSON.parse(readFileSync(cfgPath, 'utf8'));
            }
            catch { /* keep empty */ }
            try {
                const stPath = join(storeDir, 'status.json');
                if (existsSync(stPath)) {
                    const data = JSON.parse(readFileSync(stPath, 'utf8'));
                    status = data.platforms ?? {};
                }
            }
            catch { /* keep empty */ }
            return { installed, config, status };
        }
        /** dsh-connector 配置保存（hub 设置页 → 配置文件，重启 dsh 生效）。 */
        async connectorConfigSet(platform, payload) {
            const outDir = join(resolveDshHome(), 'storages', 'dsh-connector');
            mkdirSyncSafe(outDir, { recursive: true });
            const cfgPath = join(outDir, 'config.json');
            let config = {};
            try {
                if (existsSync(cfgPath))
                    config = JSON.parse(readFileSync(cfgPath, 'utf8'));
            }
            catch { /* fresh */ }
            config[platform] = { ...(config[platform] ?? {}), ...payload };
            writeFileSync(cfgPath, JSON.stringify(config, null, 2), 'utf8');
            return { ok: true, message: `「${platform}」配置已保存，重启 dsh 后生效。`, detail: JSON.stringify(config[platform]) };
        }
        /** 在 dsh 内触发「立即跑分」：调用 dsh-bench CLI 现场跑 Mock（零 token）。 */
        async benchRun(packageName, mode = 'mock') {
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
                const child = spawn(process.execPath, [bin, ...args], { cwd: benchPkg, env: { ...process.env, DSH_HOME: resolveDshHome() }, stdio: 'ignore', windowsHide: true });
                // E2E 内部有 120s 超时，这里再兜底 150s
                const timer = setTimeout(() => { try {
                    child.kill();
                }
                catch { /* gone */ } }, mode === 'e2e' ? 150_000 : 180_000);
                child.on('exit', async (code) => {
                    clearTimeout(timer);
                    let bench = { found: false, updatedAt: null, entry: null, ecosystemAvg: null };
                    try {
                        const data = JSON.parse(readFileSync(outPath, 'utf8'));
                        const entries = Array.isArray(data.entries) ? data.entries : [];
                        const entry = entries.find((e) => String(e.target ?? '') === String(packageName)) ?? null;
                        const ok = entries.filter((e) => e.ok);
                        bench = {
                            found: entry !== null,
                            updatedAt: data.generatedAt ?? null,
                            entry,
                            ecosystemAvg: ok.length > 0 ? Math.round(ok.reduce((s, e) => s + Number(e.score ?? 0), 0) / ok.length) : null,
                        };
                    }
                    catch { /* keep not-found */ }
                    resolve({ ok: code === 0, message: code === 0 ? (mode === 'e2e' ? '端到端跑分完成（消耗 token，见成本报告）' : '跑分完成（Mock 模式，零 token）') : `dsh-bench 退出码 ${code}`, detail: bench });
                });
                child.on('error', (err) => {
                    clearTimeout(timer);
                    resolve({ ok: false, message: `无法启动 dsh-bench: ${err.message}`, detail: null });
                });
            });
        }
        async skillSiblings(owner, repo, dir) {
            const out = [];
            if (!dir)
                return out;
            const entries = await listRepoDir(this.github, owner, repo, dir);
            for (const e of entries) {
                if (e.type === 'dir') {
                    const sub = await this.skillSiblings(owner, repo, `${dir}/${e.name}`);
                    out.push(...sub);
                }
                else if (e.type === 'file' && e.name.toLowerCase() !== 'skill.md' && e.size <= 300_000) {
                    out.push(`${dir}/${e.name}`);
                }
                if (out.length >= 15)
                    break;
            }
            return out;
        }
        async syncNow() {
            if (this.syncing)
                return { ok: false, message: '镜像同步正在进行中，请稍候', detail: null };
            void this.runSync('manual');
            // The mirror may have discovered new plugins — drop the stale npm probe.
            this.npmAvailable = null;
            clearNpmCache(this.db);
            void npmAvailability(this.db).then((map) => { this.npmAvailable = map; }).catch(() => { });
            return { ok: true, message: '镜像同步已启动，可在设置页查看进度', detail: null };
        }
        async syncStatus() {
            const state = this.db.getMeta('sync_state') ?? 'idle';
            const lastSyncAt = this.db.getMeta('last_sync_at');
            const lastSyncTotal = Number(this.db.getMeta('last_sync_total') ?? 0);
            const lastError = this.db.getMeta('last_sync_error') || this.lastSyncError;
            const scheduleHours = Number(this.db.getMeta('mirror_schedule_hours') ?? 24);
            let nextSyncAt = null;
            if (scheduleHours > 0 && lastSyncAt) {
                nextSyncAt = new Date(new Date(lastSyncAt).getTime() + scheduleHours * 3600_000).toISOString();
            }
            return { state, lastSyncAt, lastSyncTotal, lastError, nextSyncAt, scheduleHours };
        }
        async settings() {
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
        async setGithubToken(token, actorRaw) {
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
        async clearGithubToken(actorRaw) {
            const actor = sanitizeActor(actorRaw);
            this.db.deleteMeta('github_token');
            this.github.setToken(null);
            this.appendAudit('token_clear', 'github-token', 'ok', 'private token removed', actor);
            return { ok: true, message: 'Token 已清除', detail: null };
        }
        async setSchedule(hours, actorRaw) {
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
        async installPlugin(packageName, actorRaw, sourceRaw) {
            const actor = sanitizeActor(actorRaw);
            const throttled = this.throttle('install', 30);
            if (throttled)
                return { ok: false, message: throttled, detail: null, restartRequired: false, reloadRequired: false, packageName: String(packageName).trim() };
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
                const receipt = await runInstall(this.profile, spec, name, actor, (p) => this.installProgressMap.set(name, { ...p, updatedAt: Date.now() }));
                this.appendAudit('install', name, receipt.ok ? 'ok' : 'failed', `pnpm ${usedSource}: ${receipt.message}`, actor);
                this.installProgressMap.delete(name);
                if (receipt.ok)
                    this.installedCache = null;
                return { ...receipt, packageName: name };
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                this.appendAudit('install', name, 'failed', message, actor);
                this.installProgressMap.delete(name);
                return { ok: false, message, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
            }
        }
        /** Polled by the UI to render the install progress bar. Returns null when no
         * install is in flight for this package. */
        async installProgress(packageName) {
            const name = String(packageName).trim();
            const entry = this.installProgressMap.get(name);
            if (!entry)
                return null;
            // stale guard: entries older than 10 min are treated as gone.
            if (Date.now() - entry.updatedAt > 10 * 60_000) {
                this.installProgressMap.delete(name);
                return null;
            }
            return entry;
        }
        /** Issues of a plugin's GitHub repo (read-only, 5-min cache). */
        async issues(packageName) {
            const name = String(packageName).trim();
            const row = this.db.getPlugin(name);
            const repo = row?.repoFullName;
            if (!repo || !repo.includes('/'))
                return [];
            const cached = this.issuesCache.get(repo);
            if (cached && Date.now() - cached.at < 5 * 60_000)
                return cached.value;
            const [owner, repoName] = repo.split('/');
            const list = await this.github.issues(owner, repoName);
            this.issuesCache.set(repo, { at: Date.now(), value: list });
            return list;
        }
        /** Locally-developed plugins (自创作分类) with their package.json, ready to publish. */
        async myPlugins() {
            const list = await this.installed();
            const result = [];
            for (const p of list) {
                if (p.category !== 'own' || typeof p.packageName !== 'string')
                    continue;
                const manifest = (() => {
                    try {
                        const require = createRequire(join(this.profile.directory, 'noop.js'));
                        const pkgPath = require.resolve(`${p.packageName}/package.json`);
                        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
                        return pkg;
                    }
                    catch {
                        return null;
                    }
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
        async publishProgress(packageName) {
            const name = String(packageName).trim();
            const entry = this.publishProgressMap.get(name);
            if (!entry)
                return null;
            if (Date.now() - entry.updatedAt > 30 * 60_000) {
                this.publishProgressMap.delete(name);
                return null;
            }
            return entry;
        }
        /** One-click publish of a locally-developed plugin to GitHub and/or npm. */
        async publish(raw, actorRaw) {
            const actor = sanitizeActor(actorRaw);
            const throttled = this.throttle('publish', 10);
            if (throttled)
                return { ok: false, message: throttled, detail: null, repoUrl: null, npmUrl: null };
            const name = String(raw?.packageName ?? '').trim();
            if (!name)
                return { ok: false, message: '请选择要发布的插件', detail: null, repoUrl: null, npmUrl: null };
            // Tokens are session-only: the UI passes them for this publish and they
            // are never persisted (security — a token must be re-entered every time).
            const githubToken = String(raw?.githubToken ?? '').trim();
            const npmToken = String(raw?.npmToken ?? '').trim();
            const request = {
                packageName: name,
                target: raw?.target === 'npm' || raw?.target === 'both' ? raw.target : 'github',
                githubToken,
                npmToken,
                visibility: raw?.visibility === 'private' ? 'private' : 'public',
                description: String(raw?.description ?? ''),
                topics: Array.isArray(raw?.topics) ? raw.topics.map(String) : [],
            };
            const key = name;
            this.publishProgressMap.set(key, { phase: '启动发布…', percent: 0, detail: '', updatedAt: Date.now() });
            const report = (phase, percent, detail) => {
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
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                this.appendAudit('publish', name, 'failed', message, actor);
                report('失败', 100, message);
                return { ok: false, message, detail: null, repoUrl: null, npmUrl: null, packageName: name };
            }
        }
        async uninstall(packageName, actorRaw) {
            const actor = sanitizeActor(actorRaw);
            const throttled = this.throttle('uninstall');
            if (throttled)
                return { ok: false, message: throttled, detail: null, restartRequired: false, reloadRequired: false, packageName: String(packageName).trim() };
            const name = String(packageName).trim();
            // Uninstalling the store itself is allowed (the user may want to remove
            // it; dsh itself stays healthy — only the store UI disappears). The
            // front-end shows a strong confirmation for this case.
            try {
                const receipt = await runUninstall(this.profile, name, name, actor);
                this.appendAudit('uninstall', name, receipt.ok ? 'ok' : 'failed', receipt.message, actor);
                if (receipt.ok)
                    this.installedCache = null;
                return { ...receipt, packageName: name };
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                this.appendAudit('uninstall', name, 'failed', message, actor);
                return { ok: false, message, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
            }
        }
        async setEnabled(packageName, enabled, actorRaw) {
            const actor = sanitizeActor(actorRaw);
            const throttled = this.throttle('setEnabled', 60);
            if (throttled)
                return { ok: false, message: throttled, detail: null, restartRequired: false, reloadRequired: false, packageName: String(packageName).trim() };
            const name = String(packageName).trim();
            if (name === SELF && !enabled) {
                this.appendAudit('disable', name, 'failed', 'self-disable blocked', actor);
                return { ok: false, message: '不能禁用插件商店自身', detail: null, restartRequired: false, reloadRequired: false, packageName: name };
            }
            try {
                const entries = [...this.loader.entries()];
                const entry = entries.find((e) => e.options.id === name || e.options.name === name);
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
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                this.appendAudit(enabled ? 'enable' : 'disable', name, 'failed', message, actor);
                return { ok: false, message, detail: null, restartRequired: false, reloadRequired: false, packageName: name };
            }
        }
        async waitForEntry(entryId, enabled, timeoutMs = 8000) {
            const deadline = Date.now() + timeoutMs;
            while (Date.now() < deadline) {
                try {
                    const entry = [...this.loader.entries()].find((e) => e.options.id === entryId);
                    if (entry !== undefined && !entry.disabled === enabled && entry._initTask === void 0 && entry._disposing === 0)
                        return;
                }
                catch { /* loader unavailable */ }
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
            throw new Error(`等待插件条目 ${entryId} ${enabled ? '启用' : '禁用'}超时，请刷新页面后重试`);
        }
        async installed() {
            const now = Date.now();
            if (this.installedCache && now - this.installedCache.at < 10_000)
                return this.installedCache.value;
            this.installedRepos.clear();
            // Merge real Loader entries (system infra) with profile dependencies so the
            // UI can group everything into 系统插件 / 下载插件 / 自创作插件.
            // Loader entries that correspond to installed package dependencies are
            // classified by the dependency loop below (download/own), NOT as system —
            // otherwise user-installed plugins (including this store itself) would be
            // locked into the protected system bucket and become unmanageable.
            const result = [];
            const seen = new Set();
            let loaderEntries = [];
            try {
                loaderEntries = [...this.loader.entries()];
            }
            catch { /* loader unavailable */ }
            let manifest = {};
            try {
                manifest = JSON.parse(readFileSync(this.profile.packageJsonFile, 'utf8'));
            }
            catch { /* manifest unavailable */ }
            const deps = (manifest.dependencies ?? {});
            const depNames = new Set(Object.keys(deps));
            // 1) System-side entries from the Loader itself — only true infrastructure
            //    (entries NOT backed by an installed dependency package).
            for (const entry of loaderEntries) {
                const id = entry.options.id;
                const pkgName = entry.options.name ?? id;
                if (seen.has(id))
                    continue;
                // Backed by an installed dependency → let the dependency loop classify
                // it (download/own). Do NOT add to `seen` here, or the loop below will
                // skip it entirely and the plugin disappears from the list.
                if (depNames.has(pkgName))
                    continue;
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
                if (seen.has(name))
                    continue;
                seen.add(name);
                const specValue = String(spec ?? '');
                const isLocal = /^(?:file:|link:|workspace:)/.test(specValue);
                let group = 'other';
                let groupLabel = '其他插件';
                let isDsh = false;
                let localPath = null;
                let published = false;
                let repoUrl = null;
                let pkg = {};
                try {
                    const pkgPath = require.resolve(`${name}/package.json`);
                    pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
                    const dsh = (pkg.dsh ?? {});
                    const declared = dsh.pluginManager?.group;
                    const keywords = Array.isArray(pkg.keywords) ? pkg.keywords.map(String) : [];
                    isDsh = Boolean(dsh?.bundle || dsh?.client || keywords.includes('dsh-plugin') || /dsh|harness|cordis/i.test(String(pkg.description ?? '')));
                    // 可扩展类：扩展 hub 能力的插件（dsh-bench 等，keyword: hub-ext）
                    const isHubExt = keywords.includes('hub-ext');
                    const labelMap = {
                        core: '核心服务', ui: '界面增强', tool: '开发工具', llm: '模型与 LLM', agent: 'Agent', workflow: '工作流', data: '数据处理', notification: '通知', hubExt: '可扩展类', other: '其他插件',
                    };
                    group = typeof declared === 'string' && declared ? declared : isHubExt ? 'hubExt' : isDsh ? 'tool' : 'other';
                    groupLabel = labelMap[group] ?? group;
                    if (isLocal)
                        localPath = pkgPath.replace(/[\\/]package\.json$/, '');
                    // Remember the package's declared repository (owner/name) for
                    // same-name disambiguation across different GitHub repos.
                    const repoRaw = typeof pkg.repository?.url === 'string'
                        ? pkg.repository.url
                        : typeof pkg.repository === 'string' ? pkg.repository : '';
                    const repoMatch = String(repoRaw).match(/(?:github\.com\/|github:)([^/]+\/[^/.#]+)/i);
                    this.installedRepos.set(name, repoMatch ? repoMatch[1].toLowerCase() : null);
                    if (isLocal) {
                        // Published = exists on the npm registry (we probe the mirror) or
                        // the package declares a public repository. Only informational.
                        const onNpm = this.npmAvailable?.get(name);
                        const repo = pkg.repository?.url;
                        repoUrl = typeof repo === 'string' && repo ? repo : null;
                        published = onNpm === true || repoUrl !== null;
                    }
                }
                catch {
                    group = 'other';
                    groupLabel = '其他插件';
                }
                if (!isDsh && group === 'tool') {
                    group = 'other';
                    groupLabel = '其他插件';
                }
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
        async setCategoryEnabled(category, enabled, actorRaw) {
            const actor = sanitizeActor(actorRaw);
            const throttled = this.throttle('setCategoryEnabled', 20);
            if (throttled)
                return { ok: false, message: throttled, detail: null, skipped: 0, changed: 0 };
            const cat = String(category ?? '').trim();
            if (cat !== 'system' && cat !== 'download' && cat !== 'own') {
                return { ok: false, message: `未知分类: ${cat}`, detail: null, skipped: 0, changed: 0 };
            }
            const list = (await this.installed());
            const targets = list.filter((p) => p.category === cat && p.protected !== true);
            let changed = 0;
            const skipped = [];
            for (const p of targets) {
                const name = String(p.packageName);
                const entryId = String(p.entryId ?? name);
                const current = this.enabledOf(name);
                if (current === enabled)
                    continue;
                try {
                    await setPluginEnabled(this.profile, entryId, String(p.name ?? name), enabled);
                    changed++;
                }
                catch (error) {
                    skipped.push({ packageName: name, message: error instanceof Error ? error.message : String(error) });
                }
            }
            this.appendAudit(cat === 'system' ? 'system_toggle' : 'download_toggle', cat, changed > 0 || skipped.length === 0 ? 'ok' : 'failed', `${enabled ? '启用' : '禁用'} ${changed} 项${skipped.length ? `，跳过 ${skipped.length} 项` : ''}`, actor);
            if (changed > 0)
                this.installedCache = null;
            return { ok: skipped.length === 0, message: `${enabled ? '已启用' : '已禁用'} ${changed} 项${skipped.length ? `，${skipped.length} 项失败（受保护或加载中）` : ''}`, detail: null, changed, skipped };
        }
        async rate(packageName, score, comment, actorRaw) {
            const actor = sanitizeActor(actorRaw);
            const throttled = this.throttle('rate', 60);
            if (throttled)
                return { ok: false, message: throttled, detail: null };
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
        async listReviews(packageName) {
            return this.db.listReviews(String(packageName).trim()).map((row) => ({ ...row }));
        }
        async audit(query = {}) {
            const { total, rows } = this.db.queryAudit({
                action: query.action ?? null,
                actor: query.actor ?? null,
                target: query.target ?? null,
                limit: query.limit ?? 100,
                offset: query.offset ?? 0,
            });
            return { total, rows };
        }
        async dependencyGraph(packageName) {
            const name = String(packageName).trim();
            const row = this.db.getPlugin(name);
            if (row === undefined)
                throw new Error(`插件不存在: ${name}`);
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
        async scaffold() {
            return {
                templateRepo: 'deepseek-ai/deepseek-harness',
                templateUrl: 'https://github.com/deepseek-ai/deepseek-harness',
                docsUrl: 'https://github.com/deepseek-ai/deepseek-harness#readme',
                guide: 'DSH 插件是一个 npm 包：package.json 中声明 dsh.bundle.patch（host 端 cordis.patch.yml 层）与 dsh.client.platform: "web"（浏览器端 UI 包）。' +
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
    };
})();
export { PluginStoreService };
export default PluginStoreService;
