/**
 * 0.1.7 Skill registry sync — collects conversation-callable skills
 * (SKILL.md) from the whole ecosystem.
 *
 * SKILL.md is a universal format (Claude / agent-skills conventions), so every
 * skill works in dsh — we collect from multiple topics, not only dsh-tagged
 * repos: dsh-skill / claude-skills / agent-skills / skills / claude-skill.
 *
 * Each repo may be a single-skill bundle (root SKILL.md) or a collection
 * (`.agents/skills/`, `.claude/skills/`, `skills/`). We index every SKILL.md
 * found: frontmatter (name / description / version) + full content for the
 * store UI, derive usage categories from the description, tag the platform
 * (`dsh` vs general), and install copies the same bundle into
 * `$DSH_HOME/skills/<name>/` where dsh's skill-filesystem discovers it for
 * in-conversation use.
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
