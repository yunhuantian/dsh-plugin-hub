/**
 * 跨版本图标适配层。
 *
 * 两条版本线的图标**导出名不一样**：
 *   0.1.x：尺寸写在后缀里 —— `IconCloseOutline16`
 *   0.2.x：去掉尺寸后缀、改出 Regular / Medium 变体，尺寸走 `size` prop ——
 *          `IconCloseOutlineRegular`
 *
 * 直接按某一个版本的名字 import，在另一个版本上就会拿到 `undefined`；
 * 拿 undefined 当元素类型渲染，React 抛 error #130（"Element type is invalid"），
 * 而它发生在 slot 里 —— **整条 slot 崩掉**，界面上什么也没有。
 * 这个坑真踩过（0.2.0-rc.2 上侧栏按钮整块消失）。
 *
 * 所以这里按「0.2.x 名 → 0.1.x 名」依次取，两条线都取不到就用内置 SVG 兜底，
 * 保证任何版本上渲染出的都是真组件，不会再把 undefined 交给 React。
 *
 * 顺带：图标只从 primitives 这一个口子进（原来 4 个文件各写一遍 import），
 * 换版本时只改这一处。
 */
import type { ComponentType } from 'react';
export interface HubIconProps {
    size?: number;
    className?: string;
}
export declare const IconClose: ComponentType<HubIconProps>;
export declare const IconCode: ComponentType<HubIconProps>;
export declare const IconCordisPlugin: ComponentType<HubIconProps>;
export declare const IconDownload: ComponentType<HubIconProps>;
export declare const IconRefresh: ComponentType<HubIconProps>;
export declare const IconSearch: ComponentType<HubIconProps>;
export declare const IconSettings: ComponentType<HubIconProps>;
export declare const IconTrash: ComponentType<HubIconProps>;
export declare const IconUser: ComponentType<HubIconProps>;
export declare const IconWarning: ComponentType<HubIconProps>;
