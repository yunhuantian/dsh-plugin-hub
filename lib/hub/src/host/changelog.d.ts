export type CommitType = 'feat' | 'fix' | 'perf' | 'refactor' | 'docs' | 'test' | 'build' | 'chore' | 'other';
export interface ChangelogCommit {
    hash: string;
    type: CommitType;
    scope: string | null;
    subject: string;
    breaking: boolean;
}
export interface ChangelogDraft {
    /** 从哪个 tag/ref 开始（null = 仓库起点）。 */
    since: string | null;
    to: string | null;
    commits: ChangelogCommit[];
    /** type → 条目列表（已按约定顺序排好）。 */
    groups: Array<{
        type: CommitType;
        label: string;
        items: string[];
    }>;
    /** 可直接粘进 README 的 Markdown。 */
    markdown: string;
    /** 统计摘要一句话。 */
    summary: string;
    error: string | null;
}
/** 解析一条 `type(scope)!: subject` 形式的提交标题。 */
export declare function parseCommitSubject(subject: string): Pick<ChangelogCommit, 'type' | 'scope' | 'subject' | 'breaking'>;
/**
 * 起草一份更新日志。
 *
 * @param dir      仓库目录（一般是插件在本机的开发目录）
 * @param since    起始 ref（tag / commit）；null = 取全部历史
 * @param version  目标版本号，仅用于 Markdown 标题
 * @param maxCount 最多取多少条提交（默认 60，防止把远古历史全抖出来）
 */
export declare function draftChangelog(dir: string, since: string | null, version: string | null, maxCount?: number): Promise<ChangelogDraft>;
/** 列出可作为 `since` 的最近 tag（新 → 旧）。 */
export declare function recentTags(dir: string, limit?: number): Promise<string[]>;
