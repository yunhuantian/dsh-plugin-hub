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
import type { ComponentType, ReactNode } from 'react';
import * as primitives from '@deepseek-ai/dsh-client-ui-primitives';

export interface HubIconProps {
  size?: number;
  className?: string;
}

/** 基础名 → [0.2.x 的导出名, 0.1.x 的导出名]。 */
const RESOLVE: Record<string, [modern: string, legacy: string]> = {
  IconClose: ['IconCloseOutlineRegular', 'IconCloseOutline16'],
  IconCode: ['IconCodeOutlineRegular', 'IconCodeOutline16'],
  IconCordisPlugin: ['IconCordisPluginOutlineRegular', 'IconCordisPluginOutline14'],
  IconDownload: ['IconDownloadOutlineRegular', 'IconDownloadOutline16'],
  IconRefresh: ['IconRefreshOutlineRegular', 'IconRefreshOutline16'],
  IconSearch: ['IconSearchOutlineRegular', 'IconSearchOutline16'],
  IconSettings: ['IconSettingsOutlineRegular', 'IconSettingsOutline16'],
  IconTrash: ['IconTrashOutlineRegular', 'IconTrashOutline16'],
  IconUser: ['IconUserOutlineRegular', 'IconUserOutline16'],
  IconWarning: ['IconWarningOutlineRegular', 'IconWarningOutline16'],
};

/** 两个版本都没有的兜底：中性占位块，保证永远渲染得出东西。 */
function FallbackIcon({ size = 16, className }: HubIconProps): ReactNode {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.75" y="2.75" width="10.5" height="10.5" rx="2.5" />
    </svg>
  );
}

/** 在 primitives 里按两种命名各试一次。 */
function makeIcon(base: keyof typeof RESOLVE): ComponentType<HubIconProps> {
  const [modern, legacy] = RESOLVE[base];
  const ns = primitives as unknown as Record<string, unknown>;
  for (const name of [modern, legacy]) {
    const candidate = ns[name];
    if (typeof candidate === 'function') return candidate as ComponentType<HubIconProps>;
  }
  return FallbackIcon;
}

export const IconClose = makeIcon('IconClose');
export const IconCode = makeIcon('IconCode');
export const IconCordisPlugin = makeIcon('IconCordisPlugin');
export const IconDownload = makeIcon('IconDownload');
export const IconRefresh = makeIcon('IconRefresh');
export const IconSearch = makeIcon('IconSearch');
export const IconSettings = makeIcon('IconSettings');
export const IconTrash = makeIcon('IconTrash');
export const IconUser = makeIcon('IconUser');
export const IconWarning = makeIcon('IconWarning');
