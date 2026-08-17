/**
 * 0.1.4 publish-time security scan.
 *
 * Statically inspects a locally-developed plugin before publishing:
 *  - critical findings (remote download-and-exec, exfiltrating env vars,
 *    destructive file ops, known-malicious dependencies) → the publish is
 *    REJECTED outright;
 *  - warning findings (eval / obfuscation / child_process with network) →
 *    the publish may proceed but the result carries a security warning.
 *
 * The scanner is deliberately conservative (low false positives): only clear
 * malicious patterns trigger critical; benign-but-suspicious code is a warning.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

export type Severity = 'critical' | 'warning';

export interface SecurityFinding {
  severity: Severity;
  rule: string;
  target: string;   // file / script name
  detail: string;
}

export interface SecurityReport {
  level: 'clean' | 'warning' | 'malicious';
  findings: SecurityFinding[];
}

/** Known-malicious npm package names (historical supply-chain incidents).
 * Only packages whose published "malicious versions" were the whole point
 * (account takeover + backdoored release, or the package itself was malware)
 * are listed — NOT common packages that were briefly poisoned (lodash, tar,
 * node-fetch …), to keep false positives near zero. */
const MALICIOUS_DEPENDENCIES = new Set([
  'event-stream', 'flatmap-stream', 'node-ipc', 'is-promise-postinstall',
  'package-with-secret', 'material-tailwind', 'eslint-config-airbnb-base',
  'ua-parser-js', 'coa', 'jshint', 'discord-logs', 'awesome-static-analysis',
]);

/** Rejectable patterns — clear malicious intent. */
const CRITICAL_RULES: Array<{ rule: string; re: RegExp; detail: string }> = [
  { rule: 'remote-download-exec', re: /(?:curl|wget|aria2c|powershell|cmd)\s+[^\n|]{4,}\s*[|>]\s*(?:sh|bash|zsh|powershell|cmd|node|python)/i, detail: '下载远程脚本并执行（远程代码执行）' },
  { rule: 'ps-iex', re: /(?:Invoke-Expression|iex\s*\(|powershell\s+-(?:c|command)\b)/i, detail: 'PowerShell 动态执行' },
  { rule: 'base64-exec', re: /(?:eval|exec|spawn)[^;\n]{0,60}(?:Buffer\.from\s*\([^)]*base64|atob\s*\()|(?:Buffer\.from\s*\([^)]*base64|atob\s*\()[^;\n]{0,60}(?:eval|exec|spawn)/i, detail: 'base64 混淆后执行代码' },
  { rule: 'env-exfil', re: /(?:process\.env[^;\n]{0,60}(?:fetch|axios|https?\.request|net\.connect|sendgrid|slack))|(?:(?:fetch|axios|https?\.request|net\.connect)[^;\n]{0,80}process\.env)/i, detail: '读取环境变量并发往网络（凭据外传）' },
  { rule: 'env-exfil-shell', re: /\$env:[A-Z_]+[^;\n]{0,80}(?:curl|wget|Invoke-WebRequest)/i, detail: 'PowerShell 环境变量外传' },
  { rule: 'childproc-network', re: /child_process\.(?:exec|execSync|spawn|spawnSync|fork)\s*\([^)]{0,160}(?:https?:\/\/|curl|wget|nc\s)/i, detail: '子进程执行远程命令' },
  { rule: 'destructive', re: /\brm\s+-rf\s+\/|format\s+[a-z]:|del\s+\/[fq]\s+[a-z]:\\|mkfs\.|:\(\)\s*\{\s*:\|:\s*&\s*\}/i, detail: '破坏性操作（删除/格式化系统数据）' },
  { rule: 'suspicious-hosts', re: /(?:pastebin\.com|transfer\.sh|ngrok\.io|t\.me\/|telegram\.(?:org|me)\/bot)/i, detail: '出现可疑数据中转/外传域名' },
];

/** Warning patterns — suspicious but not necessarily malicious. */
const WARNING_RULES: Array<{ rule: string; re: RegExp; detail: string }> = [
  { rule: 'eval', re: /\beval\s*\(|new Function\s*\(/i, detail: '动态执行代码（eval/Function）' },
  { rule: 'child-process', re: /(?:child_process|\bcp)[^;\n]{0,12}\.(?:exec|execSync|spawn|spawnSync|fork)\s*\(|\.(?:execSync|spawnSync|exec|spawn)\s*\(|\b(?:execSync|spawnSync|execFile)\s*\(/i, detail: '使用子进程执行外部命令' },
  { rule: 'network-send', re: /(?:fetch|axios|https?\.request|net\.connect)\s*\([^)]{0,80}(?:post|send|upload)/i, detail: '向网络发送数据' },
  { rule: 'obfuscation', re: /(?:atob|btoa|base64)[^;\n]{0,80}(?:charCodeAt|fromCharCode|replace)/i, detail: '代码混淆特征' },
  { rule: 'secret-file', re: /\.env\b|api[_-]?key\s*[:=]|secret\s*[:=]|token\s*[:=][^;\n]{8,}/i, detail: '疑似硬编码密钥/敏感文件' },
];

/** File extensions scanned inside the plugin directory. */
const SCAN_EXTS = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx']);
/** Skip these directories entirely (deps / build output / vcs). */
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.next', '.nuxt', 'lib', 'out']);
/** Individual file size cap — larger files are skipped (assumed bundled deps). */
const MAX_FILE_BYTES = 300 * 1024;

function walk(dir: string, base: string, out: string[]): void {
  let entries: string[];
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    let st: ReturnType<typeof statSync>;
    try { st = statSync(full); } catch { continue; }
    if (st.isDirectory()) {
      walk(full, base, out);
    } else if (st.isFile() && st.size <= MAX_FILE_BYTES && SCAN_EXTS.has(extname(name))) {
      out.push(relative(base, full));
    }
  }
}

function scanText(text: string, target: string, findings: SecurityFinding[]): void {
  for (const r of CRITICAL_RULES) {
    if (r.re.test(text)) {
      findings.push({ severity: 'critical', rule: r.rule, target, detail: r.detail });
    }
  }
  for (const r of WARNING_RULES) {
    if (r.re.test(text)) {
      findings.push({ severity: 'warning', rule: r.rule, target, detail: r.detail });
    }
  }
}

/** Scan a plugin directory + manifest for malicious / suspicious content. */
export function scanPlugin(dir: string, pkg: Record<string, unknown>): SecurityReport {
  const findings: SecurityFinding[] = [];

  // 1) dependencies blacklist.
  const depNames = [
    ...Object.keys((pkg.dependencies ?? {}) as Record<string, string>),
    ...Object.keys((pkg.devDependencies ?? {}) as Record<string, string>),
    ...Object.keys((pkg.optionalDependencies ?? {}) as Record<string, string>),
  ];
  for (const name of depNames) {
    if (MALICIOUS_DEPENDENCIES.has(name)) {
      findings.push({ severity: 'critical', rule: 'malicious-dependency', target: 'package.json', detail: `依赖了已知恶意/历史事故包 ${name}` });
    }
  }

  // 2) npm lifecycle scripts (the classic supply-chain attack vector).
  const scripts = (pkg.scripts ?? {}) as Record<string, string>;
  const lifecycleKeys = ['preinstall', 'install', 'postinstall', 'prepare', 'prepublish', 'prepublishOnly', 'postpublish'];
  for (const key of Object.keys(scripts)) {
    if (!lifecycleKeys.includes(key)) continue;
    scanText(String(scripts[key]), `package.json#scripts.${key}`, findings);
  }

  // 3) source files.
  const files: string[] = [];
  walk(dir, dir, files);
  const scanned = Math.min(files.length, 200);
  for (const f of files.slice(0, scanned)) {
    let text = '';
    try { text = readFileSync(join(dir, f), 'utf8'); } catch { continue; }
    if (text.length === 0) continue;
    scanText(text, f, findings);
  }

  const criticalCount = findings.filter((f) => f.severity === 'critical').length;
  return {
    level: criticalCount > 0 ? 'malicious' : findings.length > 0 ? 'warning' : 'clean',
    findings: findings.slice(0, 30),
  };
}

/** Quick helper for tests / callers: true when the report is blocked. */
export function isBlocked(report: SecurityReport): boolean {
  return report.level === 'malicious';
}
