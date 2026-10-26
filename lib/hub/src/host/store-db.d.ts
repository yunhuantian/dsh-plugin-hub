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
/**
 * 一个「列表来源」：用户或开发者添加的一份市场列表（kind=0），
 * 或一份整合包（kind=1）。原始文件落在 `storages/plugin-store/lists/<id>.dpmidx`。
 */
export interface ListSourceRow {
    id: string;
    label: string;
    /** 来源地址；本地上传时为空串。 */
    url: string;
    /** 容器类型：0 = 插件列表，1 = 整合包。 */
    kind: number;
    /** 归一化后的格式：dpmidx | json | ndjson | crawl。 */
    format: string;
    /** auto = 自动识别；certified = 认证（由我们签发）。 */
    provenance: 'auto' | 'certified';
    /** 发布者标识（认证时记录签发主体）。 */
    publisher: string;
    entries: number;
    addedAt: string;
    syncedAt: string | null;
    error: string | null;
}
/**
 * 一条逐插件认证记录。
 *
 * `version` 是**认证时的版本**：插件升级后版本对不上，展示为 `legacy`（有过认证），
 * 而不是丢掉认证或假装仍是最新认证。
 */
export interface PluginCertRow {
    packageName: string;
    version: string;
    publisher: string;
    certifiedAt: string;
}
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
    upsertListSource(row: ListSourceRow): void;
    /** kind 省略时返回全部；否则只返回该容器类型（0 列表 / 1 整合包）。 */
    listListSources(kind?: number): ListSourceRow[];
    getListSource(id: string): ListSourceRow | undefined;
    removeListSource(id: string): boolean;
    /** 认证列表数量（认证区为空时 UI 要给出明确解释）。 */
    countCertified(): number;
    upsertCert(row: PluginCertRow): void;
    getCert(packageName: string): PluginCertRow | undefined;
    allCerts(): Map<string, PluginCertRow>;
    countCerts(): number;
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
