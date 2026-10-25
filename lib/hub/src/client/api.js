/**
 * Client facade over the `pluginStore` Typert Remote + tiny UI state stores.
 * All calls return the unwrapped value and throw on an error envelope.
 */
import { TYPERT_REMOTE } from '../contracts/remote.js';
export function unwrap(result) {
    if (result.ok)
        return result.value;
    throw new Error(`${result.error.code}: ${result.error.message}`);
}
/** Wrap a raw remote namespace into the typed facade. */
export function makeApi(remote) {
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
        extensions: async () => unwrap(await r.extensions()),
        extensionSet: async (id, enabled) => unwrap(await r.extensionSet(id, enabled)),
        pricingTable: async () => unwrap(await r.pricingTable()),
    };
}
export { TYPERT_REMOTE };
function createStore(initial) {
    let value = initial;
    const listeners = new Set();
    return {
        getSnapshot: () => value,
        subscribe: (listener) => {
            listeners.add(listener);
            return () => { listeners.delete(listener); };
        },
        set: (next) => {
            value = next;
            for (const l of listeners)
                l();
        },
    };
}
/** Selected view inside the store; detail navigation is local to the app. */
export const viewStore = createStore('discover');
export const setView = (view) => viewStore.set(view);
const ACTOR_KEY = 'dsh.pluginStore.actor';
/** Operator display name used for audit attribution (persisted locally). */
export function getActor() {
    return (typeof localStorage !== 'undefined' ? localStorage.getItem(ACTOR_KEY) : null) ?? '';
}
export function setActor(name) {
    if (typeof localStorage !== 'undefined')
        localStorage.setItem(ACTOR_KEY, name.trim().slice(0, 64));
}
/** Readable form used by the settings view. */
export function actorDisplay() {
    return getActor() || 'anonymous（未设置显示名，将以机器标识记录）';
}
// ---- formatting helpers -----------------------------------------------------
export function formatCount(n) {
    if (n >= 1_000_000)
        return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 10_000)
        return `${(n / 1000).toFixed(1)}k`;
    if (n >= 1000)
        return `${(n / 1000).toFixed(2)}k`;
    return String(n);
}
export function formatDate(iso) {
    if (!iso)
        return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return iso;
    return d.toLocaleString();
}
