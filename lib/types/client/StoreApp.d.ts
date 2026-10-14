/**
 * StoreApp: the full-store modal shell — overlay + panel + left navigation +
 * detail navigation — rendered via a portal so it floats above the Harness UI
 * exactly like the native settings dialog.
 */
import { type ReactNode } from 'react';
import { type RemoteApi } from './api';
export declare function StoreApp({ api, t }: {
    api: RemoteApi;
    t: (k: string) => string;
}): ReactNode;
