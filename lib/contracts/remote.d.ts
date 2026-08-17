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
export declare const category: z.ZodEnum<{
    tool: "tool";
    agent: "agent";
    ui: "ui";
    data: "data";
    vision: "vision";
    docs: "docs";
    memory: "memory";
    usage: "usage";
    notify: "notify";
    dev: "dev";
    chat: "chat";
    hub: "hub";
    "hub-ext": "hub-ext";
    other: "other";
}>;
export declare const pluginSummary: z.ZodReadonly<z.ZodObject<{
    packageName: z.ZodString;
    repoFullName: z.ZodString;
    name: z.ZodString;
    shortDescription: z.ZodString;
    developer: z.ZodString;
    iconUrl: z.ZodNullable<z.ZodString>;
    categories: z.ZodReadonly<z.ZodArray<z.ZodEnum<{
        tool: "tool";
        agent: "agent";
        ui: "ui";
        data: "data";
        vision: "vision";
        docs: "docs";
        memory: "memory";
        usage: "usage";
        notify: "notify";
        dev: "dev";
        chat: "chat";
        hub: "hub";
        "hub-ext": "hub-ext";
        other: "other";
    }>>>;
    version: z.ZodNullable<z.ZodString>;
    stars: z.ZodNumber;
    downloads: z.ZodNumber;
    rating: z.ZodNumber;
    ratingCount: z.ZodNumber;
    installed: z.ZodBoolean;
    enabled: z.ZodNullable<z.ZodBoolean>;
    updatedAt: z.ZodNullable<z.ZodString>;
    source: z.ZodEnum<{
        npm: "npm";
        github: "github";
    }>;
    hasNpm: z.ZodBoolean;
    hasGit: z.ZodBoolean;
    trustLevel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    health: z.ZodNumber;
}, z.core.$strip>>;
export declare const pluginListResult: z.ZodReadonly<z.ZodObject<{
    total: z.ZodNumber;
    plugins: z.ZodReadonly<z.ZodArray<z.ZodReadonly<z.ZodObject<{
        packageName: z.ZodString;
        repoFullName: z.ZodString;
        name: z.ZodString;
        shortDescription: z.ZodString;
        developer: z.ZodString;
        iconUrl: z.ZodNullable<z.ZodString>;
        categories: z.ZodReadonly<z.ZodArray<z.ZodEnum<{
            tool: "tool";
            agent: "agent";
            ui: "ui";
            data: "data";
            vision: "vision";
            docs: "docs";
            memory: "memory";
            usage: "usage";
            notify: "notify";
            dev: "dev";
            chat: "chat";
            hub: "hub";
            "hub-ext": "hub-ext";
            other: "other";
        }>>>;
        version: z.ZodNullable<z.ZodString>;
        stars: z.ZodNumber;
        downloads: z.ZodNumber;
        rating: z.ZodNumber;
        ratingCount: z.ZodNumber;
        installed: z.ZodBoolean;
        enabled: z.ZodNullable<z.ZodBoolean>;
        updatedAt: z.ZodNullable<z.ZodString>;
        source: z.ZodEnum<{
            npm: "npm";
            github: "github";
        }>;
        hasNpm: z.ZodBoolean;
        hasGit: z.ZodBoolean;
        trustLevel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        health: z.ZodNumber;
    }, z.core.$strip>>>>;
}, z.core.$strip>>;
export declare const versionRow: z.ZodReadonly<z.ZodObject<{
    version: z.ZodString;
    publishedAt: z.ZodNullable<z.ZodString>;
    changelog: z.ZodNullable<z.ZodString>;
    tagName: z.ZodNullable<z.ZodString>;
}, z.core.$strip>>;
export declare const depEdge: z.ZodReadonly<z.ZodObject<{
    name: z.ZodString;
    version: z.ZodNullable<z.ZodString>;
    kind: z.ZodEnum<{
        dev: "dev";
        runtime: "runtime";
        peer: "peer";
    }>;
}, z.core.$strip>>;
export declare const reviewRow: z.ZodReadonly<z.ZodObject<{
    id: z.ZodNumber;
    actor: z.ZodString;
    score: z.ZodNumber;
    comment: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>>;
export declare const dependentRow: z.ZodReadonly<z.ZodObject<{
    packageName: z.ZodString;
    name: z.ZodString;
    version: z.ZodNullable<z.ZodString>;
    rating: z.ZodNumber;
    installed: z.ZodBoolean;
}, z.core.$strip>>;
export declare const pluginDetail: z.ZodReadonly<z.ZodObject<{
    packageName: z.ZodString;
    repoFullName: z.ZodString;
    name: z.ZodString;
    shortDescription: z.ZodString;
    fullDescription: z.ZodString;
    usage: z.ZodString;
    developer: z.ZodString;
    iconUrl: z.ZodNullable<z.ZodString>;
    categories: z.ZodReadonly<z.ZodArray<z.ZodEnum<{
        tool: "tool";
        agent: "agent";
        ui: "ui";
        data: "data";
        vision: "vision";
        docs: "docs";
        memory: "memory";
        usage: "usage";
        notify: "notify";
        dev: "dev";
        chat: "chat";
        hub: "hub";
        "hub-ext": "hub-ext";
        other: "other";
    }>>>;
    version: z.ZodNullable<z.ZodString>;
    stars: z.ZodNumber;
    downloads: z.ZodNumber;
    rating: z.ZodNumber;
    ratingCount: z.ZodNumber;
    installed: z.ZodBoolean;
    enabled: z.ZodNullable<z.ZodBoolean>;
    topics: z.ZodReadonly<z.ZodArray<z.ZodString>>;
    license: z.ZodNullable<z.ZodString>;
    homepage: z.ZodNullable<z.ZodString>;
    repoUrl: z.ZodString;
    defaultBranch: z.ZodString;
    screenshots: z.ZodReadonly<z.ZodArray<z.ZodString>>;
    versions: z.ZodReadonly<z.ZodArray<z.ZodReadonly<z.ZodObject<{
        version: z.ZodString;
        publishedAt: z.ZodNullable<z.ZodString>;
        changelog: z.ZodNullable<z.ZodString>;
        tagName: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>>;
    dependencies: z.ZodReadonly<z.ZodArray<z.ZodReadonly<z.ZodObject<{
        name: z.ZodString;
        version: z.ZodNullable<z.ZodString>;
        kind: z.ZodEnum<{
            dev: "dev";
            runtime: "runtime";
            peer: "peer";
        }>;
    }, z.core.$strip>>>>;
    dependents: z.ZodReadonly<z.ZodArray<z.ZodReadonly<z.ZodObject<{
        packageName: z.ZodString;
        name: z.ZodString;
        version: z.ZodNullable<z.ZodString>;
        rating: z.ZodNumber;
        installed: z.ZodBoolean;
    }, z.core.$strip>>>>;
    reviews: z.ZodReadonly<z.ZodArray<z.ZodReadonly<z.ZodObject<{
        id: z.ZodNumber;
        actor: z.ZodString;
        score: z.ZodNumber;
        comment: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$strip>>>>;
    updatedAt: z.ZodNullable<z.ZodString>;
    source: z.ZodEnum<{
        npm: "npm";
        github: "github";
    }>;
    hasNpm: z.ZodBoolean;
    hasGit: z.ZodBoolean;
    installedVersion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    hasUpdate: z.ZodOptional<z.ZodBoolean>;
    trustLevel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>>;
export declare const opResult: z.ZodReadonly<z.ZodObject<{
    ok: z.ZodBoolean;
    message: z.ZodString;
    detail: z.ZodNullable<z.ZodString>;
}, z.core.$strip>>;
export declare const installReceipt: z.ZodReadonly<z.ZodObject<{
    ok: z.ZodBoolean;
    message: z.ZodString;
    packageName: z.ZodString;
    detail: z.ZodNullable<z.ZodString>;
    restartRequired: z.ZodBoolean;
    reloadRequired: z.ZodBoolean;
    requiredEnv: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>>;
export declare const categoryToggleResult: z.ZodReadonly<z.ZodObject<{
    ok: z.ZodBoolean;
    message: z.ZodString;
    detail: z.ZodNullable<z.ZodString>;
    changed: z.ZodNumber;
    skipped: z.ZodReadonly<z.ZodArray<z.ZodReadonly<z.ZodObject<{
        packageName: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>>;
export declare const syncStatus: z.ZodReadonly<z.ZodObject<{
    state: z.ZodEnum<{
        idle: "idle";
        syncing: "syncing";
        error: "error";
    }>;
    lastSyncAt: z.ZodNullable<z.ZodString>;
    lastSyncTotal: z.ZodNumber;
    lastError: z.ZodNullable<z.ZodString>;
    nextSyncAt: z.ZodNullable<z.ZodString>;
    scheduleHours: z.ZodNumber;
}, z.core.$strip>>;
export declare const storeSettings: z.ZodReadonly<z.ZodObject<{
    tokenConfigured: z.ZodBoolean;
    tokenMasked: z.ZodString;
    scheduleHours: z.ZodNumber;
    profileName: z.ZodString;
    rateLimitRemaining: z.ZodNullable<z.ZodNumber>;
    dbPath: z.ZodString;
    pluginCount: z.ZodNumber;
}, z.core.$strip>>;
export declare const auditRow: z.ZodReadonly<z.ZodObject<{
    id: z.ZodNumber;
    actor: z.ZodString;
    action: z.ZodString;
    target: z.ZodString;
    result: z.ZodString;
    message: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>>;
export declare const auditPage: z.ZodReadonly<z.ZodObject<{
    total: z.ZodNumber;
    rows: z.ZodReadonly<z.ZodArray<z.ZodReadonly<z.ZodObject<{
        id: z.ZodNumber;
        actor: z.ZodString;
        action: z.ZodString;
        target: z.ZodString;
        result: z.ZodString;
        message: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>>;
export declare const dependencyGraph: z.ZodReadonly<z.ZodObject<{
    root: z.ZodString;
    rootName: z.ZodString;
    dependencies: z.ZodReadonly<z.ZodArray<z.ZodReadonly<z.ZodObject<{
        name: z.ZodString;
        version: z.ZodNullable<z.ZodString>;
        kind: z.ZodEnum<{
            dev: "dev";
            runtime: "runtime";
            peer: "peer";
        }>;
    }, z.core.$strip>>>>;
    dependents: z.ZodReadonly<z.ZodArray<z.ZodReadonly<z.ZodObject<{
        packageName: z.ZodString;
        name: z.ZodString;
        version: z.ZodNullable<z.ZodString>;
        rating: z.ZodNumber;
        installed: z.ZodBoolean;
    }, z.core.$strip>>>>;
}, z.core.$strip>>;
export declare const installedPlugin: z.ZodReadonly<z.ZodObject<{
    packageName: z.ZodString;
    entryId: z.ZodString;
    name: z.ZodString;
    category: z.ZodEnum<{
        system: "system";
        download: "download";
        own: "own";
    }>;
    group: z.ZodString;
    groupLabel: z.ZodString;
    enabled: z.ZodBoolean;
    phase: z.ZodNullable<z.ZodString>;
    managed: z.ZodBoolean;
    protected: z.ZodBoolean;
    type: z.ZodString;
    localPath: z.ZodNullable<z.ZodString>;
    published: z.ZodBoolean;
    repoUrl: z.ZodNullable<z.ZodString>;
    version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    latestVersion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    hasUpdate: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>>;
export declare const scaffoldInfo: z.ZodReadonly<z.ZodObject<{
    templateRepo: z.ZodString;
    templateUrl: z.ZodString;
    docsUrl: z.ZodString;
    guide: z.ZodString;
    commands: z.ZodReadonly<z.ZodArray<z.ZodString>>;
    categories: z.ZodReadonly<z.ZodArray<z.ZodString>>;
}, z.core.$strip>>;
export declare const descriptors: Record<string, unknown>[];
export declare const TYPERT_REMOTE: {
    package: string;
    descriptors: Record<string, unknown>[];
};
/** Host Typert artifact loaded from the package's `./typert` export. */
export declare const TYPERT: {
    package: string;
    face: string;
    schemas: never[];
    invocations: Record<string, unknown>[];
    model: {
        services: never[];
        events: never[];
        objects: never[];
    };
};
export default TYPERT_REMOTE;
