/**
 * hub 内建插件 · 安装冲突检测（conflict）—— safety 组。
 *
 * 服务 `pluginConflict`：装之前先算一遍会不会打架 ——
 *   - UI 槽位：`single` 槽（sidebar / conversation / details 三列）是独占的，
 *     两个插件抢同一个槽会导致后装的那个崩掉；
 *   - 包名撞车：同名不同来源；
 *   - 依赖版本范围冲突。
 * 结论在安装弹窗里先给用户看，而不是装完再修。
 */
import { checkConflicts, scanRegisteredSlots, type ConflictReport } from '../host/conflict-check.js';
import type { ProfileInfo } from '../host/installer.js';
import { activate } from './_runtime.js';

const ID = 'conflict';

export const name = 'dsh-plugin-hub/extensions/conflict';
export const provide = ['pluginConflict'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginConflict', () => ({
      /** 完整冲突报告（槽位 + 包名 + 依赖）。 */
      check: (profile: ProfileInfo, packageName: string): ConflictReport => checkConflicts(profile, packageName),
      /** 仅看已被占用的槽位（快速预览用）。 */
      slots: (profile: ProfileInfo, packageName: string) => scanRegisteredSlots(profile, packageName),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
