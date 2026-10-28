/**
 * Store views: Discover (cards + search + filters), Detail (tabs incl.
 * dependency graph, version history, reviews), Installed, Settings (token +
 * mirror), Audit log, and the developer Scaffold page.
 */
import { type ReactNode } from 'react';
import type { RemoteApi } from './api';
interface DetailProps {
    api: RemoteApi;
    packageName: string;
    onBack: () => void;
    onChanged: () => void;
    t: (key: string) => string;
    /** 内建插件启用情况（键 = 插件 id，值 = 真的在跑）。缺省时不隐藏任何 tab。 */
    gates?: Record<string, boolean>;
}
export declare function Detail({ api, packageName, onBack, onChanged, t, gates }: DetailProps): ReactNode;
export type StoreView = 'discover' | 'certified' | 'modpack' | 'wiki' | 'skill' | 'installed' | 'publish' | 'health' | 'scaffold' | 'audit' | 'extensions' | 'settings';
export declare function StoreViewBody({ view, api, onOpen, onChanged, t }: {
    view: StoreView;
    api: RemoteApi;
    onOpen: (name: string) => void;
    onChanged: () => void;
    t: (key: string) => string;
}): ReactNode;
export {};
