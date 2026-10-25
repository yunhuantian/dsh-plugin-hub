export interface ProfileInfo {
    directory: string;
    patchFile: string;
    packageJsonFile: string;
    profileName: string;
}
/** Resolve the running profile directory from a file-backed Loader baseUrl. */
export declare function resolveProfile(baseUrl: string | undefined, fallbackProfile?: string): ProfileInfo;
export interface PnpmResult {
    ok: boolean;
    code: number | null;
    stdout: string;
    stderr: string;
}
/** Progress callback fired as pnpm reports resolution/fetch progress. */
export type PnpmProgressFn = (p: {
    phase: 'resolving' | 'fetching' | 'linking' | 'done';
    percent: number | null;
    detail: string;
}) => void;
/** Parse one pnpm progress line ("Progress: resolved 2, reused 0, downloaded 1, added 0").
 * Returns {phase, percent} or null when the line is not a progress report. */
export declare function parsePnpmProgress(line: string): {
    phase: 'fetching' | 'done';
    percent: number | null;
} | null;
/** Run `pnpm <args>` in `cwd`, capturing output (no user-facing terminal).
 * On Windows, spawn the .cmd shim and kill the whole process tree on timeout,
 * otherwise orphaned node children keep the `close` event from firing.
 *
 * NOTE: Windows .cmd shims require `shell: true`, but passing `args` together
 * with `shell: true` triggers Node DEP0190 and (worse) concatenates arguments
 * WITHOUT escaping — a spec like `git+https://…git#main` or a file: path with
 * spaces then breaks. We manually escape + join args into the command string,
 * and never pass `args` to the shelled spawn. */
export declare function runPnpm(cwd: string, args: string[], timeoutMs?: number, onProgress?: PnpmProgressFn): Promise<PnpmResult>;
/** Read the loader entry ids a plugin's own bundle patch inserts (e.g. a
 * `cordis.patch.yml` declaring `insert: [{id: code-pet, name: deepseek-pet}]`).
 * These ids are what the profile patch layer must target to disable/enable the
 * plugin — NOT the package name, which may differ. */
export declare function bundleEntryIds(packageName: string, profileDir: string): string[];
/** Insert an owned activation row: `insert: [{id, name}]`.
 * Activation happens through the profile's hot-reloaded user patch layer
 * (Cordis HMR), so a freshly installed plugin starts WITHOUT a server
 * restart. If the package is ALSO listed in `dsh.profile.bundles` (its bundle
 * layer will insert the same entry at boot), the user-patch row is skipped to
 * avoid a duplicate entry id on the next boot. */
export declare function addActivationRow(profile: ProfileInfo, packageName: string, entryId?: string): Promise<void>;
/** Toggle one entry's desired enablement through an owned override row. */
export declare function writeEnablement(profile: ProfileInfo, entryId: string, moduleName: string, enabled: boolean): Promise<void>;
/** Remove an owned toggle row (used to restore the base state on uninstall). */
declare function removeToggleRow(filename: string, entryId: string): Promise<void>;
export interface InstallReceipt {
    ok: boolean;
    message: string;
    detail: string | null;
    restartRequired: boolean;
    reloadRequired: boolean;
    /** Environment variables the plugin reads (API keys/tokens) that the user
     * may need to configure before the plugin works. Informational only. */
    requiredEnv?: string[];
}
/** Determine the pnpm spec for a plugin: npm registry package or git URL. */
export declare function installSpecFor(packageName: string, repoFullName: string, ref: string | null): string;
export declare function gitSpecFor(repoFullName: string, ref: string | null): string;
/**
 * Install a plugin package into the profile.
 * @param packageName npm package name (primary) or GitHub `owner/repo`.
 * @param installSpec the pnpm install spec (npm `name@ver` or `git+https`).
 * @param entryId loader entry id to activate (defaults to package name).
 * @param onProgress optional live progress callback (resolving/fetching/done).
 */
export declare function installPlugin(profile: ProfileInfo, installSpec: string, entryId: string, actor: string, onProgress?: PnpmProgressFn): Promise<InstallReceipt>;
/** Scan a package for environment variables it reads at runtime (API keys /
 * tokens). Informational hint surfaced in the install receipt. */
export declare function scanRequiredEnv(packageName: string, profileDir: string): string[];
/** Run `git <args>` in `cwd`, resolving on close (non-zero = reject). */
export declare function runGit(cwd: string, args: string[], timeoutMs?: number): Promise<PnpmResult>;
/** Best-effort recursive remove (never throws). */
export declare function rmrf(target: string): Promise<void>;
/** Uninstall a plugin package from the profile (removes entry + bundles). */ export declare function uninstallPlugin(profile: ProfileInfo, packageName: string, entryId: string, actor: string): Promise<InstallReceipt>;
export { writeEnablement as setPluginEnabled, removeToggleRow };
