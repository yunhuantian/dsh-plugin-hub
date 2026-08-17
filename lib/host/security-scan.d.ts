export type Severity = 'critical' | 'warning';
export interface SecurityFinding {
    severity: Severity;
    rule: string;
    target: string;
    detail: string;
}
export interface SecurityReport {
    level: 'clean' | 'warning' | 'malicious';
    findings: SecurityFinding[];
}
/** Scan a plugin directory + manifest for malicious / suspicious content. */
export declare function scanPlugin(dir: string, pkg: Record<string, unknown>): SecurityReport;
/** Quick helper for tests / callers: true when the report is blocked. */
export declare function isBlocked(report: SecurityReport): boolean;
