/**
 * StoreApp: the store's shell — left navigation + detail navigation.
 *
 * 0.2 起商店不再是一个自带遮罩的独立弹层：它作为**官方「插件」页里的一个 tab**
 * 内嵌渲染（`embedded`），外观沿用该页的 section / panel 语言，避免在一个设置页里
 * 弹出一个悬浮对话框那种突兀感。
 */
import { type ReactNode } from 'react';
import { type RemoteApi } from './api';
export declare function StoreApp({ api, t }: {
    api: RemoteApi;
    t: (k: string) => string;
}): ReactNode;
