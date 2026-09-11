/**
 * hub 内建插件 · 技能商店（skill-store）—— insight 组。
 *
 * 跨生态收集 SKILL.md 技能包（DSH / WorkBuddy / Claude 风格），
 * 供商店的「技能」视图检索与一键安装到本地技能目录。
 *
 * 默认**关闭**：技能来源是外部仓库，属可选能力；开着会多占一次同步。
 */
import { activate } from './_runtime.js';

const ID = 'skill-store';

export const name = 'dsh-plugin-hub/extensions/skill-store';
export const provide = ['skillStore'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('skillStore', () => ({
      /** 技能安装落点（与 dsh 的技能目录一致）。 */
      installRoot: () => 'skills',
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
