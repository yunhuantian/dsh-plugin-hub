import type { ProfileInfo } from './installer.js';
import { type SecurityReport } from './security-scan.js';
export type PublishTarget = 'github' | 'npm' | 'both';
export type Visibility = 'public' | 'private';
export interface PublishRequest {
    packageName: string;
    target: PublishTarget;
    /** GitHub personal access token (passed once from the UI or read from meta). */
    githubToken: string;
    /** npm access token (registry auth). */
    npmToken: string;
    /** GitHub repository visibility. npm publishing is always public. */
    visibility: Visibility;
    /** Repository / release description. */
    description: string;
    /** GitHub topics (dsh-plugin is always appended). */
    topics: string[];
    /** Write the description into README.md when the plugin has none. */
    writeReadme?: boolean;
}
export interface PublishResult {
    ok: boolean;
    message: string;
    detail: string | null;
    repoUrl: string | null;
    npmUrl: string | null;
    /** Publish-time security report (blocked publish carries it; warnings too). */
    security?: SecurityReport;
}
export type PublishProgressFn = (phase: string, percent: number | null, detail: string | null) => void;
/** Resolve the plugin directory + package.json of a locally-installed plugin. */
export declare function localPluginManifest(profile: ProfileInfo, packageName: string): {
    dir: string;
    pkg: Record<string, unknown>;
} | null;
/** Publish a local plugin. Returns a structured result for the UI + audit. */
export declare function publishPlugin(profile: ProfileInfo, req: PublishRequest, onProgress: PublishProgressFn): Promise<PublishResult>;
