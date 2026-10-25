/**
 * hub 内建插件 · 更新日志生成（changelog）—— publish 组。
 *
 * 服务 `pluginChangelog`：从 git 提交历史（按 Conventional Commits 的
 * type 归并成新功能/修复/性能/重构…）生成一段可直接粘进 README 的 Markdown 草稿。
 *
 * 默认**关闭**：写更新日志是发布时的动作，不是常驻能力；发布页点「生成草稿」时
 * 才需要它。在设置页打开即可。
 */
import { draftChangelog, recentTags, parseCommitSubject, type ChangelogDraft } from '../host/changelog.js';
import { activate } from './_runtime.js';

const ID = 'changelog';

export const name = 'dsh-plugin-hub/extensions/changelog';
export const provide = ['pluginChangelog'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginChangelog', () => ({
      /** 起草一份草稿：since 为空表示取全部历史。 */
      draft: (dir: string, since: string | null, version: string | null, maxCount = 60): Promise<ChangelogDraft> =>
        draftChangelog(dir, since, version, maxCount),
      /** 可选的起始 tag（新 → 旧）。 */
      tags: (dir: string, limit = 10) => recentTags(dir, limit),
      /** 提交标题解析口径，UI 预览用。 */
      parse: (subject: string) => parseCommitSubject(subject),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
