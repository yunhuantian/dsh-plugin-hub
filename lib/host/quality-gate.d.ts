export interface QualityGateReport {
    ok: boolean;
    /** Bare specifiers that are undeclared and not platform-provided. */
    missing: string[];
    /** Total bare specifiers scanned (excluding builtins / relative). */
    scanned: number;
    /** Directory paths the plugin reads at startup that do not exist. */
    missingDirs: string[];
    detail: string;
}
/**
 * Run the quality gate against a freshly installed package: dependency
 * completeness + startup directory requirements.
 * @param packageName npm package name installed into the profile.
 * @param profileDir the profile directory (for node_modules resolution).
 */
export declare function runQualityGate(packageName: string, profileDir: string): QualityGateReport;
