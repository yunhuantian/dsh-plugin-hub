/**
 * hub 内建插件 · 安全扫描（security）—— safety 组。
 *
 * 服务 `pluginSecurity`：装前与发布前的静态扫描。查危险脚本（postinstall 里
 * 的下载执行）、敏感文件读取（~/.ssh、浏览器凭据）、动态执行（eval / new Function）、
 * 可疑外联地址；`critical` 级别直接拦截安装/发布。
 *
 * 关掉它 = 安装流程不再有安全结论（UI 会显示"未扫描"），发布页也不再拦截。
 */
import { scanPlugin, isBlocked } from '../host/security-scan.js';
import { activate } from './_runtime.js';
const ID = 'security';
export const name = 'dsh-plugin-hub/extensions/security';
export const provide = ['pluginSecurity'];
export const inject = [];
export function apply(ctx) {
    activate(ctx, ID, () => {
        ctx.provide('pluginSecurity', () => ({
            /** 扫描一个已解包的插件目录。 */
            scan: (dir, pkg) => scanPlugin(dir, pkg),
            /** 报告是否达到拦截级别（critical）。 */
            blocked: (report) => isBlocked(report),
            ready: true,
        }));
    });
}
export default { name, provide, inject, apply };
