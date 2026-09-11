/**
 * hub 内建插件 · GitHub 通道（github）—— foundation 组。
 *
 * 服务 `pluginGithub` 暴露一个客户端工厂：限频退避、README 抓取、私有额度
 * 都在客户端里处理。其它插件（索引同步、信任徽章、更新检测）通过它访问 GitHub，
 * 不各自造轮子。
 */
import { GitHubClient } from '../host/github.js';
import { activate } from './_runtime.js';

const ID = 'github';

export const name = 'dsh-plugin-hub/extensions/github';
export const provide = ['pluginGithub'];
export const inject: string[] = [];

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginGithub', () => ({
      /** token 可为 null（匿名调用，限频更低）。 */
      create: (token: string | null = null) => new GitHubClient(token),
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
