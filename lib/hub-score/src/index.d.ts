/**
 * 0.1.5 Health Hub — plugin health scoring (0–100).
 *
 * Answers "is this plugin trustworthy? recently maintained? buggy?"
 * Pure functions so the scoring model can be unit-tested in isolation.
 */
export type HealthLevel = 'healthy' | 'attention' | 'stale';
export interface HealthBreakdown {
    /** Maintenance recency (0–30). */
    activity: number;
    /** Distribution reach — published on npm vs GitHub-only (0–15). */
    distribution: number;
    /** Bug signal — open issues (0–25). */
    bugs: number;
    /** Community traction — stars/downloads (0–20). */
    community: number;
    /** Release cadence — number of published versions (0–10). */
    releases: number;
}
export interface HealthInput {
    updatedAt: string | null;
    onNpm: boolean;
    downloads: number;
    stars: number;
    versionCount: number;
    /** open issue count; null = unknown (skips the bug signal penalty). */
    openIssues: number | null;
}
export interface HealthResult {
    health: number;
    level: HealthLevel;
    breakdown: HealthBreakdown;
}
export declare function computeHealth(input: HealthInput): HealthResult;
export declare const LEVEL_LABEL: Record<HealthLevel, string>;
