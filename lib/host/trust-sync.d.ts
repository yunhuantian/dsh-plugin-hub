/**
 * 0.1.5 Trust-level sync from the community index (jiangxingfan1-coder/dsh-hub-index).
 *
 * Design goals (per user requirement): the store may *depend* on this index as
 * a data source, but must work *without* it:
 *  - parsed trust levels are persisted into the plugins table (cached);
 *  - a failed fetch keeps the previous cache (never wipes it);
 *  - never fetched → trust stays null → the UI simply shows no badge;
 *  - sync failure never blocks the mirror sync or any other store feature.
 */
import type { GitHubClient } from './github.js';
import type { StoreDB } from './store-db.js';
export interface TrustEntry {
    trust: string;
    publisher?: string;
}
interface TrustSyncResult {
    ok: boolean;
    updated: number;
    matched: number;
    error?: string;
}
export declare function syncTrustLevels(github: GitHubClient, db: StoreDB): Promise<TrustSyncResult>;
export {};
