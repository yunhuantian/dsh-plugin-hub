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
const strict = (typeSymbol, schema) => ({ mode: 'strict', typeSymbol, schema });
const parameter = (name, schema) => ({ name, wire: name, source: 'json', codec: strict(`dsh-plugin-hub/types#${name}`, schema) });
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
const RESULT_SYMBOL = {
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
const descriptor = (method, parameters, result) => ({
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
    descriptor('connectorStatus', [], z.object({
        installed: z.boolean(),
        config: z.record(z.string(), z.unknown()),
        status: z.record(z.string(), z.unknown()),
    })),
    descriptor('connectorConfigSet', [parameter('platform', z.string()), parameter('payload', z.record(z.string(), z.unknown()))], opResult),
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
