/**
 * 更新日志生成 —— 从 git 提交历史起草 README 风格的 changelog（内建插件 changelog 的实现）。
 *
 * 手法与 DSH 本体一致：按 Conventional Commits 的 type 归并（feat / fix / perf /
 * refactor / docs / chore …），中文标题原样保留，最后拼成一段可以直接粘进
 * README「更新日志」小节的 Markdown。
 */
import { runGit } from './installer.js';
/** type → 中文小节名（顺序即输出顺序）。 */
const GROUPS = [
    { type: 'feat', label: '新功能' },
    { type: 'fix', label: '修复' },
    { type: 'perf', label: '性能' },
    { type: 'refactor', label: '重构' },
    { type: 'docs', label: '文档' },
    { type: 'test', label: '测试' },
    { type: 'build', label: '构建' },
    { type: 'chore', label: '杂项' },
    { type: 'other', label: '其它' },
];
const KNOWN = ['feat', 'fix', 'perf', 'refactor', 'docs', 'test', 'build', 'chore'];
/** 解析一条 `type(scope)!: subject` 形式的提交标题。 */
export function parseCommitSubject(subject) {
    const m = subject.match(/^(\w+)(?:\(([^)]*)\))?(!)?:\s*(.+)$/);
    if (m === null)
        return { type: 'other', scope: null, subject, breaking: /BREAKING CHANGE/.test(subject) };
    const type = KNOWN.includes(m[1]) ? m[1] : 'other';
    return { type, scope: m[2] ?? null, subject: m[4], breaking: m[3] === '!' };
}
/**
 * 起草一份更新日志。
 *
 * @param dir      仓库目录（一般是插件在本机的开发目录）
 * @param since    起始 ref（tag / commit）；null = 取全部历史
 * @param version  目标版本号，仅用于 Markdown 标题
 * @param maxCount 最多取多少条提交（默认 60，防止把远古历史全抖出来）
 */
export async function draftChangelog(dir, since, version, maxCount = 60) {
    const range = since === null ? ['HEAD'] : [`${since}..HEAD`];
    const log = await runGit(dir, ['log', '--pretty=format:%H%x1f%s%x1f%b%x1e', ...range, `-n`, String(maxCount)], 20_000);
    if (!log.ok) {
        return emptyDraft(since, log.stderr.trim() || 'git log 执行失败（目录不是 git 仓库？）');
    }
    const commits = [];
    for (const chunk of log.stdout.split('\x1e')) {
        const raw = chunk.trim();
        if (raw === '')
            continue;
        const [hash, subject, body] = raw.split('\x1f');
        if (hash === undefined || subject === undefined)
            continue;
        const parsed = parseCommitSubject(subject.trim());
        commits.push({
            hash: hash.slice(0, 8),
            type: parsed.type,
            scope: parsed.scope,
            subject: parsed.subject,
            breaking: parsed.breaking || /BREAKING CHANGE/.test(body ?? ''),
        });
    }
    const groups = GROUPS.map(({ type, label }) => ({
        type,
        label,
        items: commits
            .filter((c) => c.type === type)
            .map((c) => (c.scope === null ? c.subject : `**${c.scope}**：${c.subject}`)),
    })).filter((g) => g.items.length > 0);
    const head = version === null ? '## 未发布' : `## ${version}`;
    const lines = [head, ''];
    if (commits.length === 0)
        lines.push('（该范围内没有提交）');
    for (const g of groups) {
        lines.push(`### ${g.label}`, '');
        for (const item of g.items)
            lines.push(`- ${item}`);
        lines.push('');
    }
    const breaking = commits.filter((c) => c.breaking);
    if (breaking.length > 0) {
        lines.push('### ⚠️ 破坏性变更', '');
        for (const c of breaking)
            lines.push(`- ${c.subject}`);
        lines.push('');
    }
    const counts = groups.map((g) => `${g.label} ${g.items.length}`).join(' · ');
    return {
        since,
        to: commits[0]?.hash ?? null,
        commits,
        groups: groups.map((g) => ({ type: g.type, label: g.label, items: g.items })),
        markdown: lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd(),
        summary: commits.length === 0 ? '范围内没有提交' : `${commits.length} 条提交：${counts}`,
        error: null,
    };
}
function emptyDraft(since, error) {
    return { since, to: null, commits: [], groups: [], markdown: '', summary: '起草失败', error };
}
/** 列出可作为 `since` 的最近 tag（新 → 旧）。 */
export async function recentTags(dir, limit = 10) {
    const res = await runGit(dir, ['tag', '--sort=-creatordate'], 10_000);
    if (!res.ok)
        return [];
    return res.stdout.split(/\r?\n/).map((s) => s.trim()).filter((s) => s !== '').slice(0, limit);
}
