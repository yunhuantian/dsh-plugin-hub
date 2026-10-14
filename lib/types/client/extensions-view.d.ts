/**
 * 内置扩展开关视图（hub 的一个内部导航项）。
 *
 * 原来是独立的 `settings.section` 设置页，四段：操作者 / GitHub Token /
 * 镜像同步 / 扩展开关。0.2 起商店整体融进官方「插件」页，那个独立设置页不再注册
 * —— 免得界面上出现「一个额外插件」的痕迹；其中 Token 与镜像同步在商店自己的
 * 「设置」视图里本来就有，只有**扩展开关**是这里独有的，所以单独拆出来。
 */
import { type ReactNode } from 'react';
import type { RemoteApi } from './api';
export declare function ExtensionsView({ api, t }: {
    api: RemoteApi;
    t: (k: string) => string;
}): ReactNode;
