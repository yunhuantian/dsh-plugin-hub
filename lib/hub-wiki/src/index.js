/**
 * hub 内建插件 · 插件百科（baike）—— insight 组。
 *
 * 把商店索引、README 要点、依赖与相关插件汇总成可检索的百科条目，
 * 回答"这插件到底干嘛的、装了会不会影响别的"。
 *
 * 默认**关闭**：体量大、且依赖本地索引同步完成；需要时在设置页打开。
 * 依赖 `store-db`（百科条目落在同一个库里）。
 */
import { activate } from '../../hub/src/extensions/_runtime.js';
const ID = 'baike';
export const name = 'dsh-plugin-hub/extensions/baike';
export const provide = ['pluginWiki'];
export const inject = [];
export function apply(ctx) {
    activate(ctx, ID, () => {
        ctx.provide('pluginWiki', () => ({
            /** 条目正文由 hub 核心从索引库拼装，本插件只声明数据来源。 */
            sources: () => ['catalog', 'readme', 'dependencies'],
            ready: true,
        }));
    });
}
export default { name, provide, inject, apply };
