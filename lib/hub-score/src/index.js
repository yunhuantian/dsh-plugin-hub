/**
 * 0.1.5 Health Hub — plugin health scoring (0–100).
 *
 * Answers "is this plugin trustworthy? recently maintained? buggy?"
 * Pure functions so the scoring model can be unit-tested in isolation.
 */
function daysAgo(iso) {
    if (!iso)
        return null;
    const t = Date.parse(iso);
    if (Number.isNaN(t))
        return null;
    return Math.max(0, Math.floor((Date.now() - t) / 86_400_000));
}
function scoreActivity(updatedAt) {
    const days = daysAgo(updatedAt);
    if (days === null)
        return 0;
    if (days <= 30)
        return 30;
    if (days <= 90)
        return 22;
    if (days <= 180)
        return 14;
    if (days <= 365)
        return 8;
    return 3;
}
function scoreBugs(openIssues) {
    if (openIssues === null)
        return 15; // unknown → neutral
    if (openIssues === 0)
        return 25;
    if (openIssues <= 5)
        return 20;
    if (openIssues <= 15)
        return 12;
    if (openIssues <= 40)
        return 6;
    return 2;
}
function scoreCommunity(stars, downloads) {
    if (stars >= 100 || downloads >= 10_000)
        return 20;
    if (stars >= 20 || downloads >= 1_000)
        return 14;
    if (stars >= 5)
        return 8;
    return 4;
}
function scoreReleases(versionCount) {
    if (versionCount >= 10)
        return 10;
    if (versionCount >= 5)
        return 7;
    if (versionCount >= 2)
        return 4;
    return 2;
}
export function computeHealth(input) {
    const breakdown = {
        activity: scoreActivity(input.updatedAt),
        distribution: input.onNpm ? 15 : 8,
        bugs: scoreBugs(input.openIssues),
        community: scoreCommunity(input.stars, input.downloads),
        releases: scoreReleases(input.versionCount),
    };
    const health = Math.round(breakdown.activity + breakdown.distribution + breakdown.bugs + breakdown.community + breakdown.releases);
    const level = health >= 70 ? 'healthy' : health >= 40 ? 'attention' : 'stale';
    return { health, level, breakdown };
}
export const LEVEL_LABEL = {
    healthy: '健康',
    attention: '需关注',
    stale: '已停滞',
};
