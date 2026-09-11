/**
 * hub 内建插件 · 质量门禁（quality）—— safety 组。
 *
 * 服务 `pluginQuality`：发布前跑检查清单（包声明完整、构建产物存在、README 到位、
 * 许可、版本规范、bundle 行可解析等），有 error 就不给发。
 * 这是"发出去的东西别人能装上"的最低保障。
 */
import { runQualityGate, type QualityGateReport } from '../host/quality-gate.js';
import { activate } from './_runtime.js';

const ID = 'quality';

export const name = 'dsh-plugin-hub/extensions/quality';
export const provide = ['pluginQuality'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginQuality', () => ({
      /** 对本地已安装的插件跑门禁。 */
      run: (packageName: string, profileDir: string): QualityGateReport => runQualityGate(packageName, profileDir),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
