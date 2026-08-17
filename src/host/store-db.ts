/**
 * Local store database: plugin metadata mirror (GitHub), versions, dependency
 * edges, enterprise ratings/reviews, audit log, and key/value settings.
 *
 * Backed by `node:sqlite` (DatabaseSync, Node >= 22.19 / 24). Everything is
 * kept under `$DSH_HOME/storages/plugin-store/` so the mirror cache is durable
 * across restarts and search stays fast without touching the GitHub API.
 */
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

export type PluginCategory = 'tool' | 'agent' | 'ui' | 'data' | 'other';

/** A conversation-callable skill (SKILL.md) collected from the ecosystem. */
export interface SkillRow {
  id: string;
  name: string;
  description: string;
  descriptionZh?: string;
  version?: string;
  author?: string;
  repoFullName?: string;
  skillPath?: string;
  categories?: string[];
  platform?: 'dsh' | 'general';
  content?: string;
  syncedAt?: string;
}

export interface PluginRow {
  packageName: string;
  repoFullName: string;
  repoUrl: string;
  name: string;
  description: string;
  shortDescription: string;
  developer: string;
  iconUrl: string | null;
  categories: string;
  version: string | null;
  stars: number;
  downloads: number;
  forks: number;
  topics: string;
  license: string | null;
  homepage: string | null;
  defaultBranch: string;
  readme: string;
  usage: string;
  screenshots: string;
  packageJson: string;
  updatedAt: string | null;
  syncedAt: string;
  /** Trust level from the ecosystem index (official/verified/community/unreviewed); null = unknown. */
  trustLevel?: string | null;
}

export interface DepEdge {
  name: string;
  version: string | null;
  kind: 'runtime' | 'dev' | 'peer';
}

export interface RatingRow {
  id: number;
  packageName: string;
  actor: string;
  score: number;
  comment: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface AuditRow {
  id: number;
  actor: string;
  action: string;
  target: string;
  result: string;
  message: string;
  createdAt: string;
}

export interface AuditQuery {
  action?: string | null;
  actor?: string | null;
  target?: string | null;
  limit?: number | null;
  offset?: number | null;
}

/** Map a raw SQLite row (snake_case columns) to the camelCase PluginRow. */
function mapPluginRow(row: Record<string, unknown>): PluginRow {
  return {
    packageName: String(row.package_name ?? ''),
    repoFullName: String(row.repo_full_name ?? ''),
    repoUrl: String(row.repo_url ?? ''),
    name: String(row.name ?? ''),
    description: String(row.description ?? ''),
    shortDescription: String(row.short_description ?? ''),
    developer: String(row.developer ?? ''),
    iconUrl: row.icon_url === null || row.icon_url === undefined ? null : String(row.icon_url),
    categories: String(row.categories ?? '[]'),
    version: row.version === null || row.version === undefined ? null : String(row.version),
    stars: Number(row.stars ?? 0),
    downloads: Number(row.downloads ?? 0),
    forks: Number(row.forks ?? 0),
    topics: String(row.topics ?? '[]'),
    license: row.license === null || row.license === undefined ? null : String(row.license),
    homepage: row.homepage === null || row.homepage === undefined ? null : String(row.homepage),
    defaultBranch: String(row.default_branch ?? 'main'),
    readme: String(row.readme ?? ''),
    usage: String(row.usage ?? ''),
    screenshots: String(row.screenshots ?? '[]'),
    packageJson: String(row.package_json ?? '{}'),
    updatedAt: row.updated_at === null || row.updated_at === undefined ? null : String(row.updated_at),
    syncedAt: String(row.synced_at ?? ''),
    trustLevel: row.trust_level === null || row.trust_level === undefined ? null : String(row.trust_level),
  };
}

export function resolveDshHome(): string {
  return process.env.DSH_HOME || join(homedir(), '.dsh');
}

/** Resolve the store database directory (created on demand). */
export function storeDataDir(home = resolveDshHome()): string {
  return join(home, 'storages', 'plugin-store');
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS plugins (
  package_name TEXT PRIMARY KEY,
  repo_full_name TEXT NOT NULL,
  repo_url TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  developer TEXT NOT NULL DEFAULT '',
  icon_url TEXT,
  categories TEXT NOT NULL DEFAULT '[]',
  version TEXT,
  stars INTEGER NOT NULL DEFAULT 0,
  downloads INTEGER NOT NULL DEFAULT 0,
  forks INTEGER NOT NULL DEFAULT 0,
  topics TEXT NOT NULL DEFAULT '[]',
  license TEXT,
  homepage TEXT,
  default_branch TEXT NOT NULL DEFAULT 'main',
  readme TEXT NOT NULL DEFAULT '',
  usage TEXT NOT NULL DEFAULT '',
  screenshots TEXT NOT NULL DEFAULT '[]',
  package_json TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT,
  synced_at TEXT NOT NULL,
  trust_level TEXT
);
CREATE INDEX IF NOT EXISTS idx_plugins_name ON plugins(name);
CREATE INDEX IF NOT EXISTS idx_plugins_developer ON plugins(developer);
CREATE INDEX IF NOT EXISTS idx_plugins_synced_at ON plugins(synced_at);

CREATE TABLE IF NOT EXISTS versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  package_name TEXT NOT NULL,
  version TEXT NOT NULL,
  published_at TEXT,
  changelog TEXT,
  tag_name TEXT,
  UNIQUE(package_name, version)
);
CREATE INDEX IF NOT EXISTS idx_versions_package ON versions(package_name);

CREATE TABLE IF NOT EXISTS dependencies (
  package_name TEXT NOT NULL,
  dep_name TEXT NOT NULL,
  dep_type TEXT NOT NULL DEFAULT 'runtime',
  dep_version TEXT,
  PRIMARY KEY (package_name, dep_name, dep_type)
);
CREATE INDEX IF NOT EXISTS idx_dependencies_dep ON dependencies(dep_name);

CREATE TABLE IF NOT EXISTS catalog_plugins (
  repo_full_name TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'blue-whale',
  synced_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_catalog_source ON catalog_plugins(source);

CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  description_zh TEXT NOT NULL DEFAULT '',
  version TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  repo_full_name TEXT NOT NULL DEFAULT '',
  skill_path TEXT NOT NULL DEFAULT '',
  categories TEXT NOT NULL DEFAULT '[]',
  platform TEXT NOT NULL DEFAULT 'general',
  content TEXT NOT NULL DEFAULT '',
  synced_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_skills_name ON skills(name);

CREATE TABLE IF NOT EXISTS ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  package_name TEXT NOT NULL,
  actor TEXT NOT NULL,
  score INTEGER NOT NULL,
  comment TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT,
  UNIQUE(package_name, actor)
);
CREATE INDEX IF NOT EXISTS idx_ratings_package ON ratings(package_name);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  result TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_log(actor);

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

export class StoreDB {
  db: DatabaseSync;
  readonly path: string;
  constructor(home = resolveDshHome()) {
    const dir = storeDataDir(home);
    mkdirSync(dir, { recursive: true });
    this.path = join(dir, 'plugin-store.sqlite');
    this.db = new DatabaseSync(this.path);
    this.db.exec('PRAGMA journal_mode = WAL;');
    this.db.exec(SCHEMA);
    // migration for databases created before the trust_level column existed.
    try { this.db.exec('ALTER TABLE plugins ADD COLUMN trust_level TEXT'); } catch { /* column already exists */ }
    // migration for databases created before the skills platform column existed.
    try { this.db.exec("ALTER TABLE skills ADD COLUMN platform TEXT NOT NULL DEFAULT 'general'"); } catch { /* column already exists */ }
  }

  close(): void {
    try { this.db.close(); } catch { /* already closed */ }
  }

  // ---- meta key/value -----------------------------------------------------

  getMeta(key: string): string | null {
    const row = this.db.prepare('SELECT value FROM meta WHERE key = ?').get(key) as { value: string } | undefined;
    return row?.value ?? null;
  }

  setMeta(key: string, value: string): void {
    this.db.prepare('INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(key, value);
  }

  deleteMeta(key: string): void {
    this.db.prepare('DELETE FROM meta WHERE key = ?').run(key);
  }

  // ---- plugins ------------------------------------------------------------

  upsertPlugin(row: PluginRow): void {
    this.db.prepare(`
      INSERT INTO plugins (package_name, repo_full_name, repo_url, name, description, short_description, developer,
        icon_url, categories, version, stars, downloads, forks, topics, license, homepage, default_branch,
        readme, usage, screenshots, package_json, updated_at, synced_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(package_name) DO UPDATE SET
        repo_full_name = excluded.repo_full_name,
        repo_url = excluded.repo_url,
        name = excluded.name,
        description = excluded.description,
        short_description = excluded.short_description,
        developer = excluded.developer,
        icon_url = excluded.icon_url,
        categories = excluded.categories,
        version = excluded.version,
        stars = excluded.stars,
        downloads = excluded.downloads,
        forks = excluded.forks,
        topics = excluded.topics,
        license = excluded.license,
        homepage = excluded.homepage,
        default_branch = excluded.default_branch,
        readme = excluded.readme,
        usage = excluded.usage,
        screenshots = excluded.screenshots,
        package_json = excluded.package_json,
        updated_at = excluded.updated_at,
        synced_at = excluded.synced_at
    `).run(
      row.packageName, row.repoFullName, row.repoUrl, row.name, row.description, row.shortDescription, row.developer,
      row.iconUrl, row.categories, row.version, row.stars, row.downloads, row.forks, row.topics, row.license,
      row.homepage, row.defaultBranch, row.readme, row.usage, row.screenshots, row.packageJson, row.updatedAt,
      row.syncedAt,
    );
  }

  getPlugin(packageName: string): PluginRow | undefined {
    const row = this.db.prepare('SELECT * FROM plugins WHERE package_name = ?').get(packageName) as Record<string, unknown> | undefined;
    return row === undefined ? undefined : mapPluginRow(row);
  }

  getPluginByRepo(repoFullName: string): PluginRow | undefined {
    const row = this.db.prepare('SELECT * FROM plugins WHERE repo_full_name = ?').get(repoFullName) as Record<string, unknown> | undefined;
    return row === undefined ? undefined : mapPluginRow(row);
  }

  countPlugins(): number {
    const row = this.db.prepare('SELECT COUNT(*) AS n FROM plugins').get() as { n: number };
    return Number(row.n);
  }

  /** List every mirrored plugin row (used by the dependency-graph scan). */
  allPlugins(): PluginRow[] {
    const rows = this.db.prepare('SELECT * FROM plugins ORDER BY name').all() as Record<string, unknown>[];
    return rows.map(mapPluginRow);
  }

  // ---- versions -----------------------------------------------------------

  replaceVersions(packageName: string, versions: Array<{ version: string; publishedAt: string | null; changelog: string | null; tagName: string | null }>): void {
    this.db.prepare('DELETE FROM versions WHERE package_name = ?').run(packageName);
    const stmt = this.db.prepare('INSERT OR REPLACE INTO versions (package_name, version, published_at, changelog, tag_name) VALUES (?, ?, ?, ?, ?)');
    for (const v of versions) stmt.run(packageName, v.version, v.publishedAt, v.changelog, v.tagName);
  }

  listVersions(packageName: string): Array<{ version: string; publishedAt: string | null; changelog: string | null; tagName: string | null }> {
    const rows = this.db.prepare('SELECT version, published_at AS publishedAt, changelog, tag_name AS tagName FROM versions WHERE package_name = ? ORDER BY published_at DESC').all(packageName) as Array<{ version: string; publishedAt: string | null; changelog: string | null; tagName: string | null }>;
    return rows;
  }

  // ---- dependencies --------------------------------------------------------

  replaceDependencies(packageName: string, edges: DepEdge[]): void {
    this.db.prepare('DELETE FROM dependencies WHERE package_name = ?').run(packageName);
    const stmt = this.db.prepare('INSERT OR REPLACE INTO dependencies (package_name, dep_name, dep_type, dep_version) VALUES (?, ?, ?, ?)');
    for (const edge of edges) stmt.run(packageName, edge.name, edge.kind, edge.version);
  }

  dependenciesOf(packageName: string): DepEdge[] {
    const rows = this.db.prepare('SELECT dep_name AS name, dep_version AS version, dep_type AS kind FROM dependencies WHERE package_name = ? ORDER BY dep_type, dep_name').all(packageName) as Array<{ name: string; version: string | null; kind: 'runtime' | 'dev' | 'peer' }>;
    return rows;
  }

  /** Every plugin that depends on `depName` (reverse edges for impact analysis). */
  dependentsOf(depName: string): Array<{ packageName: string; version: string | null }> {
    const rows = this.db.prepare(`
      SELECT d.package_name AS packageName, p.version AS version
      FROM dependencies d
      JOIN plugins p ON p.package_name = d.package_name
      WHERE d.dep_name = ? AND d.dep_type IN ('runtime', 'peer')
      ORDER BY p.name
    `).all(depName) as Array<{ packageName: string; version: string | null }>;
    return rows;
  }

  // ---- ratings / reviews ---------------------------------------------------

  upsertRating(packageName: string, actor: string, score: number, comment: string): void {
    const now = new Date().toISOString();
    const existing = this.db.prepare('SELECT id FROM ratings WHERE package_name = ? AND actor = ?').get(packageName, actor);
    if (existing) {
      this.db.prepare('UPDATE ratings SET score = ?, comment = ?, updated_at = ? WHERE package_name = ? AND actor = ?').run(score, comment, now, packageName, actor);
    } else {
      this.db.prepare('INSERT INTO ratings (package_name, actor, score, comment, created_at) VALUES (?, ?, ?, ?, ?)').run(packageName, actor, score, comment, now);
    }
  }

  listReviews(packageName: string): RatingRow[] {
    const rows = this.db.prepare('SELECT * FROM ratings WHERE package_name = ? ORDER BY updated_at DESC, created_at DESC').all(packageName) as Record<string, unknown>[];
    return rows.map((row) => ({
      id: Number(row.id ?? 0),
      packageName: String(row.package_name ?? ''),
      actor: String(row.actor ?? ''),
      score: Number(row.score ?? 0),
      comment: String(row.comment ?? ''),
      createdAt: String(row.created_at ?? ''),
      updatedAt: row.updated_at === null || row.updated_at === undefined ? null : String(row.updated_at),
    }));
  }

  ratingStats(packageName: string): { avg: number; count: number } {
    const row = this.db.prepare('SELECT AVG(score) AS avg, COUNT(*) AS count FROM ratings WHERE package_name = ?').get(packageName) as { avg: number | null; count: number };
    return { avg: row.avg === null ? 0 : Math.round(Number(row.avg) * 10) / 10, count: Number(row.count) };
  }

  /** Version counts for every package — one query for the health hub. */
  versionCounts(): Map<string, number> {
    const map = new Map<string, number>();
    const rows = this.db.prepare('SELECT package_name, COUNT(*) AS c FROM versions GROUP BY package_name').all() as Array<{ package_name: string; c: number }>;
    for (const r of rows) map.set(r.package_name, Number(r.c));
    return map;
  }

  /** Most recent mirror sync time (any plugin row), or null. */
  lastSyncedAt(): string | null {
    const row = this.db.prepare('SELECT MAX(synced_at) AS at FROM plugins').get() as { at: string | null };
    return row?.at ?? null;
  }

  /** Update the trust level for a package (from the ecosystem index). */
  setTrustLevel(packageName: string, level: string | null): void {
    this.db.prepare('UPDATE plugins SET trust_level = ? WHERE package_name = ?').run(level, packageName);
  }

  // ---- catalog (external directory listings, e.g. Blue-Whale-Harness) -------

  /** Replace the catalog for a source with the given repo list. */
  replaceCatalog(source: string, repos: string[]): number {
    this.db.prepare('DELETE FROM catalog_plugins WHERE source = ?').run(source);
    const stmt = this.db.prepare('INSERT OR REPLACE INTO catalog_plugins (repo_full_name, name, source, synced_at) VALUES (?, ?, ?, ?)');
    const now = new Date().toISOString();
    const seen = new Set<string>();
    let n = 0;
    for (const repo of repos) {
      const r = repo.trim().toLowerCase();
      if (!r.includes('/') || seen.has(r)) continue;
      seen.add(r);
      stmt.run(r, r.split('/')[1] ?? r, source, now);
      n++;
    }
    return n;
  }

  /** All repo full-names in the external catalogs. */
  catalogRepos(): Set<string> {
    const set = new Set<string>();
    const rows = this.db.prepare('SELECT repo_full_name FROM catalog_plugins').all() as Array<{ repo_full_name: string }>;
    for (const r of rows) set.add(r.repo_full_name);
    return set;
  }

  // ---- skills (conversation-callable SKILL.md registry) ----------------------

  /** Upsert skills collected from the ecosystem (keyed by their stable id). */
  replaceSkills(skills: SkillRow[]): number {
    const stmt = this.db.prepare(
      'INSERT OR REPLACE INTO skills (id, name, description, description_zh, version, author, repo_full_name, skill_path, categories, platform, content, synced_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    );
    const now = new Date().toISOString();
    let n = 0;
    for (const s of skills) {
      stmt.run(
        s.id, s.name, s.description, s.descriptionZh ?? '', s.version ?? '',
        s.author ?? '', s.repoFullName ?? '', s.skillPath ?? '', JSON.stringify(s.categories ?? []),
        s.platform ?? 'general', s.content ?? '', now,
      );
      n++;
    }
    return n;
  }

  /** Every collected skill, newest sync first. */
  allSkills(): SkillRow[] {
    const rows = this.db.prepare('SELECT * FROM skills ORDER BY synced_at DESC').all() as Array<Record<string, unknown>>;
    return rows.map((r) => ({
      id: String(r.id),
      name: String(r.name ?? ''),
      description: String(r.description ?? ''),
      descriptionZh: String(r.description_zh ?? ''),
      version: String(r.version ?? ''),
      author: String(r.author ?? ''),
      repoFullName: String(r.repo_full_name ?? ''),
      skillPath: String(r.skill_path ?? ''),
      categories: JSON.parse(String(r.categories ?? '[]')) as string[],
      platform: (String(r.platform ?? 'general') === 'dsh' ? 'dsh' : 'general') as 'dsh' | 'general',
      content: String(r.content ?? ''),
      syncedAt: String(r.synced_at ?? ''),
    }));
  }

  /** One collected skill by id. */
  getSkill(id: string): SkillRow | undefined {
    const r = this.db.prepare('SELECT * FROM skills WHERE id = ?').get(id) as Record<string, unknown> | undefined;
    if (!r) return undefined;
    return {
      id: String(r.id),
      name: String(r.name ?? ''),
      description: String(r.description ?? ''),
      descriptionZh: String(r.description_zh ?? ''),
      version: String(r.version ?? ''),
      author: String(r.author ?? ''),
      repoFullName: String(r.repo_full_name ?? ''),
      skillPath: String(r.skill_path ?? ''),
      categories: JSON.parse(String(r.categories ?? '[]')) as string[],
      platform: (String(r.platform ?? 'general') === 'dsh' ? 'dsh' : 'general') as 'dsh' | 'general',
      content: String(r.content ?? ''),
      syncedAt: String(r.synced_at ?? ''),
    };
  }

  /** One query returns ratings for every package — avoids N per-row queries
   * when projecting the full plugin list (list()). */
  ratingStatsAll(): Map<string, { avg: number; count: number }> {
    const map = new Map<string, { avg: number; count: number }>();
    const rows = this.db
      .prepare('SELECT package_name, AVG(score) AS avg, COUNT(*) AS count FROM ratings GROUP BY package_name')
      .all() as Array<{ package_name: string; avg: number | null; count: number }>;
    for (const r of rows) {
      map.set(r.package_name, { avg: r.avg === null ? 0 : Math.round(Number(r.avg) * 10) / 10, count: Number(r.count) });
    }
    return map;
  }

  // ---- audit log -----------------------------------------------------------

  appendAudit(entry: Omit<AuditRow, 'id' | 'createdAt'>): void {
    this.db.prepare('INSERT INTO audit_log (actor, action, target, result, message, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run(entry.actor, entry.action, entry.target, entry.result, entry.message, new Date().toISOString());
  }

  queryAudit(query: AuditQuery = {}): { total: number; rows: AuditRow[] } {
    const where: string[] = [];
    const params: Array<string | number> = [];
    if (query.action) { where.push('action = ?'); params.push(query.action); }
    if (query.actor) { where.push('actor LIKE ?'); params.push(`%${query.actor}%`); }
    if (query.target) { where.push('target LIKE ?'); params.push(`%${query.target}%`); }
    const clause = where.length ? ` WHERE ${where.join(' AND ')}` : '';
    const total = Number((this.db.prepare(`SELECT COUNT(*) AS n FROM audit_log${clause}`).get(...params) as unknown as { n: number }).n);
    const limit = Math.min(Math.max(query.limit ?? 100, 1), 500);
    const offset = Math.max(query.offset ?? 0, 0);
    const rows = this.db.prepare(`SELECT id, actor, action, target, result, message, created_at AS createdAt FROM audit_log${clause} ORDER BY id DESC LIMIT ? OFFSET ?`).all(...params, limit, offset) as unknown as AuditRow[];
    return { total, rows };
  }
}

/** Convenience: instantiate once per host plugin and reuse. */
let shared: StoreDB | undefined;
export function storeDB(home = resolveDshHome()): StoreDB {
  shared ??= new StoreDB(home);
  return shared;
}
