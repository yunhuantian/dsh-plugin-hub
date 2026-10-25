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
}
export declare function Detail({ api, packageName, onBack, onChanged, t }: DetailProps): ReactNode;
export type StoreView = 'discover' | 'wiki' | 'skill' | 'installed' | 'publish' | 'health' | 'scaffold' | 'audit' | 'extensions' | 'settings';
export declare function StoreViewBody({ view, api, onOpen, onChanged, t }: {
    view: StoreView;
    api: RemoteApi;
    onOpen: (name: string) => void;
    onChanged: () => void;
    t: (key: string) => string;
}): ReactNode;
export {};
