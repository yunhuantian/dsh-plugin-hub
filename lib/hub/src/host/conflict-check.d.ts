import type { ProfileInfo } from './installer.js';
export interface ConflictFinding {
    kind: 'slot' | 'dep-version' | 'patch-integrity';
    severity: 'block' | 'warning';
    message: string;
}
export interface ConflictReport {
    ok: boolean;
    findings: ConflictFinding[];
    detail: string;
}
/** Extract slot names a plugin registers into (scan its client sources). */
export declare function scanRegisteredSlots(profile: ProfileInfo, packageName: string): Set<string>;
/** Full conflict check for a package about to be installed. */
export declare function checkConflicts(profile: ProfileInfo, packageName: string): ConflictReport;
