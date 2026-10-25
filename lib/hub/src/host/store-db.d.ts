/**
 * Local store database: plugin metadata mirror (GitHub), versions, dependency
 * edges, enterprise ratings/reviews, audit log, and key/value settings.
 *
 * Backed by `node:sqlite` (DatabaseSync, Node >= 22.19 / 24). Everything is
 * kept under `$DSH_HOME/storages/plugin-store/` so the mirror cache is durable
 * across restarts and search stays fast without touching the GitHub API.
 */
import { DatabaseSync } from 'node:sqlite';
export type PluginCategory = 'tool' | 'agent' | 'ui' | 'data' | 'other';
/** A conversation-callable skill (SKILL.md) collected from the ecosystem. */
export interface SkillRow {
    id: string;
    name: string;
    description: string;
    descriptionZh?: string;
    version?: string;
    author?: string;
    repoFullName?: string;
    skillPath?: string;
    categories?: string[];
    platform?: 'dsh' | 'general';
    content?: string;
    syncedAt?: string;
}
export interface PluginRow {
    packageName: string;
    repoFullName: string;
    repoUrl: string;
    name: string;
    description: string;
    shortDescription: string;
    developer: string;
    iconUrl: string | null;
    categories: string;
    version: string | null;
    stars: number;
    downloads: number;
    forks: number;
    topics: string;
    license: string | null;
    homepage: string | null;
    defaultBranch: string;
    readme: string;
    usage: string;
    screenshots: string;
    packageJson: string;
    updatedAt: string | null;
    syncedAt: string;
    /** Trust level from the ecosystem index (official/verified/community/unreviewed); null = unknown. */
    trustLevel?: string | null;
}
export interface DepEdge {
    name: string;
    version: string | null;
    kind: 'runtime' | 'dev' | 'peer';
}
export interface RatingRow {
    id: number;
    packageName: string;
    actor: string;
    score: number;
    comment: string;
    createdAt: string;
    updatedAt: string | null;
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
export interface AuditQuery {
    action?: string | null;
    actor?: string | null;
    target?: string | null;
    limit?: number | null;
    offset?: number | null;
}
export declare function resolveDshHome(): string;
/** Resolve the store database directory (created on demand). */
export declare function storeDataDir(home?: string): string;
export declare class StoreDB {
    db: DatabaseSync;
    readonly path: string;
    constructor(home?: string);
    close(): void;
    getMeta(key: string): string | null;
    setMeta(key: string, value: string): void;
    deleteMeta(key: string): void;
    upsertPlugin(row: PluginRow): void;
    getPlugin(packageName: string): PluginRow | undefined;
    getPluginByRepo(repoFullName: string): PluginRow | undefined;
    countPlugins(): number;
    /** List every mirrored plugin row (used by the dependency-graph scan). */
    allPlugins(): PluginRow[];
    replaceVersions(packageName: string, versions: Array<{
        version: string;
        publishedAt: string | null;
        changelog: string | null;
        tagName: string | null;
    }>): void;
    listVersions(packageName: string): Array<{
        version: string;
        publishedAt: string | null;
        changelog: string | null;
        tagName: string | null;
    }>;
    replaceDependencies(packageName: string, edges: DepEdge[]): void;
    dependenciesOf(packageName: string): DepEdge[];
    /** Every plugin that depends on `depName` (reverse edges for impact analysis). */
    dependentsOf(depName: string): Array<{
        packageName: string;
        version: string | null;
    }>;
    upsertRating(packageName: string, actor: string, score: number, comment: string): void;
    listReviews(packageName: string): RatingRow[];
    ratingStats(packageName: string): {
        avg: number;
        count: number;
    };
    /** Version counts for every package — one query for the health hub. */
    versionCounts(): Map<string, number>;
    /** Most recent mirror sync time (any plugin row), or null. */
    lastSyncedAt(): string | null;
    /** Update the trust level for a package (from the ecosystem index). */
    setTrustLevel(packageName: string, level: string | null): void;
    /** Replace the catalog for a source with the given repo list. */
    replaceCatalog(source: string, repos: string[]): number;
    /** All repo full-names in the external catalogs. */
    catalogRepos(): Set<string>;
    /** Upsert skills collected from the ecosystem (keyed by their stable id). */
    replaceSkills(skills: SkillRow[]): number;
    /** Every collected skill, newest sync first. */
    allSkills(): SkillRow[];
    /** One collected skill by id. */
    getSkill(id: string): SkillRow | undefined;
    /** One query returns ratings for every package — avoids N per-row queries
     * when projecting the full plugin list (list()). */
    ratingStatsAll(): Map<string, {
        avg: number;
        count: number;
    }>;
    appendAudit(entry: Omit<AuditRow, 'id' | 'createdAt'>): void;
    queryAudit(query?: AuditQuery): {
        total: number;
        rows: AuditRow[];
    };
}
export declare function storeDB(home?: string): StoreDB;
