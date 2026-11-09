/**
 * 0.1.7 Skill registry sync — collects conversation-callable skills
 * (SKILL.md) from the whole ecosystem.
 *
 * SKILL.md is a universal format (Claude / agent-skills conventions), so every
 * skill works in dsh — we collect from multiple topics, not only dsh-tagged
 * repos: dsh-skill / claude-skills / agent-skills / skills / claude-skill.
 *
 * A repo is usually a *collection*: skills live one or more levels below the
 * repo root (`skills/<name>/SKILL.md`, `.agents/skills/<name>/SKILL.md`,
 * `packages/<pkg>/skills/<name>/SKILL.md`, …). Indexing only a `SKILL.md` file
 * directly inside a fixed directory therefore matches almost nothing; this
 * implementation reads the git tree once per repo and indexes every
 * `SKILL.md` found at any reasonable depth, falling back to a bounded
 * directory walk when the tree is unavailable or truncated.
 *
 * Content is fetched through the contents API (base64) instead of
 * `raw.githubusercontent.com`: the raw host is unreachable on some networks
 * (e.g. mainland China), which used to yield 0 skills with no visible error.
 *
 * Fail-safe: a fetch failure keeps the previous table; sync failure never
 * blocks the mirror or any other store function.
 */
import type { GitHubClient } from './github.js';
import type { StoreDB } from './store-db.js';
export interface SkillSyncResult {
    ok: boolean;
    repos: number;
    skills: number;
    error?: string;
}
/** Derive usage categories from a skill's description. */
export declare function deriveSkillCategories(description: string): string[];
/** Platform tag: `dsh` when the repo/description mentions DeepSeek Harness. */
export declare function platformOf(repo: string, description: string): 'dsh' | 'general';
/** Extract YAML frontmatter fields we care about. */
export declare function parseSkillFrontmatter(md: string): {
    name: string;
    description: string;
    descriptionZh: string;
    version: string;
};
export declare function syncSkills(github: GitHubClient, db: StoreDB): Promise<SkillSyncResult>;
