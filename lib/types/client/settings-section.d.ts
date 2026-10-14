/**
 * Native Settings page for the plugin store: operator identity (audit
 * attribution), GitHub private token, mirror-sync schedule + manual sync, and
 * a shortcut back into the store. Registered into the `settings.section` slot
 * so it renders inside the Harness Settings panel like any native section.
 */
import { type ReactNode } from 'react';
import { type RemoteApi } from './api';
interface SectionProps {
    api: RemoteApi;
    openStore: () => void;
    close?: () => void;
    /** Bound to the `pluginStore` namespace by `apply()`, exactly as the
     *  sidebar entry receives it. */
    t: (k: string) => string;
}
export declare function StoreSettingsSection({ api, openStore, t }: SectionProps): ReactNode;
export {};
