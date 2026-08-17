/**
 * GitHub data source: discovery (topic:dsh-plugin / #dsh-plugin), metadata
 * fetching (package.json, README, releases), npm download stats, and the
 * scheduled mirror-sync pipeline that caches everything into the local DB.
 *
 * Rate-limit handling: an optional private token (configured in the store
 * settings UI) raises the limits (search 10 -> 30 / min, core 60 -> 5000 / h).
 * The mirror keeps search fast and offline-friendly by serving from the DB.
 */
import { StoreDB, type DepEdge } from './store-db.js';
export declare class GitHubRateLimitError extends Error {
    limit: number;
    resetAt: number;
    constructor(message: string, limit: number, resetAt: number);
}
export interface GitHubRepoHit {
    fullName: string;
    owner: string;
    repo: string;
    description: string | null;
    stars: number;
    forks: number;
    topics: string[];
    license: string | null;
    homepage: string | null;
    defaultBranch: string;
    pushedAt: string;
    updatedAt: string;
    avatarUrl: string | null;
}
interface RateInfo {
    remaining: number | null;
    limit: number | null;
    resetAt: number | null;
}
export declare class GitHubClient {
    token: string | null;
    rate: RateInfo;
    constructor(token?: string | null);
    setToken(token: string | null): void;
    private headers;
    private readRate;
    /** GET a GitHub API endpoint, throwing a typed error on rate-limit exhaustion. */
    apiGet<T>(path: string, params?: Record<string, string>, extraHeaders?: Record<string, string>): Promise<T>;
    /** Fetch a raw file from the default branch (raw host — not rate limited). */
    rawFile(owner: string, repo: string, branch: string, path: string): Promise<string | null>;
    /** Current rate-limit state (nulls when never queried). */
    rateLimit(): {
        remaining: number | null;
        limit: number | null;
        resetAt: number | null;
    };
    /**
     * Search repositories by a GitHub search query, iterating up to `pages`.
     * Returns deduplicated hits ordered by stars.
     */
    searchRepos(query: string, pages?: number, perPage?: number): Promise<GitHubRepoHit[]>;
    /** npm monthly downloads for a published package (0 when unpublished). */
    npmDownloads(packageName: string): Promise<number>;
    /** GitHub releases for a repo (version history). */
    releases(owner: string, repo: string): Promise<Array<{
        version: string;
        publishedAt: string | null;
        changelog: string | null;
        tagName: string | null;
    }>>;
    /** GitHub issues for a repo (discussion board, read-only). */
    issues(owner: string, repo: string): Promise<Array<{
        number: number;
        title: string;
        state: 'open' | 'closed';
        comments: number;
        createdAt: string | null;
        user: string | null;
    }>>;
    /** Recent commits (since ISO date) → per-day commit counts (update cadence).
     * Capped at 100 results (a busy repo's earliest commits may be cut). */
    commitDays(owner: string, repo: string, since: string): Promise<Array<{
        date: string;
        count: number;
    }>>;
    /** Recent stargazers with timestamps → per-day star gains (max 100). */
    starGainDays(owner: string, repo: string): Promise<Array<{
        date: string;
        count: number;
    }>>;
    /** Latest release tag for a repo (used as the git install ref). */
    latestReleaseTag(owner: string, repo: string): Promise<string | null>;
}
export declare const CATEGORY_GROUPS: Record<string, string[]>;
export declare const CATEGORY_ORDER: readonly ["tool", "agent", "ui", "data", "vision", "docs", "memory", "usage", "notify", "dev", "chat", "hub", "other"];
/** Derive store categories from package keywords, topics, and the dsh group. */
export declare function deriveCategories(pkg: Record<string, unknown>, topics: string[], group?: string): string[];
/** Parse runtime/dev/peer dependency edges from a package.json manifest. */
export declare function dependencyEdges(pkg: Record<string, unknown>): DepEdge[];
/** Validate that a package manifest is actually a dsh/cordis plugin. */
export declare function isDshPlugin(pkg: Record<string, unknown>): boolean;
/** Extract `## Usage`-style section(s) from a README for the usage tab.
 * Intentionally does NOT capture install-only sections — the store itself
 * installs plugins; the wiki answers "how do I use it", not "how do I get it". */
export declare function extractUsage(readme: string): string;
/** Extract "what it does / features / value" sections from a README — the
 * core of the wiki: what this plugin is FOR and the value it brings in
 * practice, not how to install it. */
export declare function extractHighlights(readme: string): string;
/** Extract a "best practices / tips / notes" section from a README. */
export declare function extractBestPractices(readme: string): string;
/** Collect image URLs from a README (screenshots), resolving relative paths. */
export declare function extractScreenshots(readme: string, repoFullName: string, branch: string): string[];
/** Clean a GitHub description into a short one-line summary. */
export declare function shortDescription(repoDescription: string | null, pkgDescription: string | null): string;
export interface SyncOptions {
    /** Force full re-fetch of every candidate repo even when unchanged. */
    force?: boolean;
    /** Max search pages per query (100 results each). */
    maxPages?: number;
    /** Called with progress messages (0..1). */
    onProgress?: (message: string, done: number, total: number) => void;
}
/** Queries used for discovery. `topic:dsh-plugin` is authoritative; the text
 * query catches repos that only mention `#dsh-plugin` in name/description. */
export declare const DISCOVERY_QUERIES: string[];
/** Run one full mirror sync: discover -> fetch -> cache into the DB. */
export declare function runMirrorSync(github: GitHubClient, db: StoreDB, options?: SyncOptions): Promise<{
    total: number;
    added: number;
    updated: number;
    skipped: number;
    error: string | null;
}>;
export {};
