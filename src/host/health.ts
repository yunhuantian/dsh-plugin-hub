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

function daysAgo(iso: string | null): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / 86_400_000));
}

function scoreActivity(updatedAt: string | null): number {
  const days = daysAgo(updatedAt);
  if (days === null) return 0;
  if (days <= 30) return 30;
  if (days <= 90) return 22;
  if (days <= 180) return 14;
  if (days <= 365) return 8;
  return 3;
}

function scoreBugs(openIssues: number | null): number {
  if (openIssues === null) return 15; // unknown → neutral
  if (openIssues === 0) return 25;
  if (openIssues <= 5) return 20;
  if (openIssues <= 15) return 12;
  if (openIssues <= 40) return 6;
  return 2;
}

function scoreCommunity(stars: number, downloads: number): number {
  if (stars >= 100 || downloads >= 10_000) return 20;
  if (stars >= 20 || downloads >= 1_000) return 14;
  if (stars >= 5) return 8;
  return 4;
}

function scoreReleases(versionCount: number): number {
  if (versionCount >= 10) return 10;
  if (versionCount >= 5) return 7;
  if (versionCount >= 2) return 4;
  return 2;
}

export function computeHealth(input: HealthInput): HealthResult {
  const breakdown: HealthBreakdown = {
    activity: scoreActivity(input.updatedAt),
    distribution: input.onNpm ? 15 : 8,
    bugs: scoreBugs(input.openIssues),
    community: scoreCommunity(input.stars, input.downloads),
    releases: scoreReleases(input.versionCount),
  };
  const health = Math.round(
    breakdown.activity + breakdown.distribution + breakdown.bugs + breakdown.community + breakdown.releases,
  );
  const level: HealthLevel = health >= 70 ? 'healthy' : health >= 40 ? 'attention' : 'stale';
  return { health, level, breakdown };
}

export const LEVEL_LABEL: Record<HealthLevel, string> = {
  healthy: '健康',
  attention: '需关注',
  stale: '已停滞',
};
