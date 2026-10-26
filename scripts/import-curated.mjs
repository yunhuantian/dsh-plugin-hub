#!/usr/bin/env node
/**
 * 把策展产物导入本地商店：插件表（认证）+ 3 个整合包。
 *
 *   node --experimental-sqlite scripts/import-curated.mjs [--dir dist/tables]
 *
 * 认证不是「给文件盖个章」，而是**在本地注册表里逐插件记录版本**：
 * 以后插件升级、版本对不上时，界面显示「有过认证」，既不撤销也不冒充当前版本。
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { KIND_LIST, KIND_MODPACK } from '../lib/hub-market-index/src/index.js';
import { StoreDB } from '../lib/hub/src/host/store-db.js';
import { addListSource } from '../lib/hub/src/host/list-sources.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const DIR = join(ROOT, arg('dir', 'dist/tables'));
const HOME = process.env.DSH_HOME || join(homedir(), '.dsh');
const PUBLISHER = '云幻天';

const db = new StoreDB(HOME);
const now = new Date().toISOString();

// 插件表固定；整合包按目录里实际存在的文件收集（改名不用改脚本）。
const files = [
  { file: 'plugin-table.dpmidx', expect: KIND_LIST, certified: true },
  ...(existsSync(DIR) ? readdirSync(DIR) : [])
    .filter((f) => /^modpack-.+\.dpmidx$/.test(f))
    .sort()
    .map((f) => ({ file: f, expect: KIND_MODPACK, certified: false })),
];

const rows = [];
for (const f of files) {
  const path = join(DIR, f.file);
  if (!existsSync(path)) { console.log(`跳过（不存在）: ${f.file}`); continue; }
  const { row, warnings } = await addListSource(db, HOME, {
    base64: readFileSync(path).toString('base64'),
    expect: f.expect,
    label: undefined,
    publisher: PUBLISHER,
    provenance: f.certified ? 'certified' : 'auto',
  });
  rows.push({ row, warnings, certified: f.certified });
  console.log(`✅ ${row.label}（${row.kind === KIND_LIST ? '列表' : '整合包'}）· ${row.entries} 条 · 署名 ${row.publisher || '—'}`);
  for (const w of warnings) console.log(`   ⚠️ ${w}`);
}

// 逐插件写认证记录（版本来自策展时的 manifest）
const tableJson = join(DIR, 'plugin-table.json');
if (existsSync(tableJson)) {
  const doc = JSON.parse(readFileSync(tableJson, 'utf8'));
  let n = 0;
  for (const item of doc.items ?? []) {
    db.upsertCert({
      packageName: item.name,
      version: item.version ?? '',
      publisher: doc.publisher ?? PUBLISHER,
      certifiedAt: doc.createdAt ?? now,
    });
    n++;
  }
  console.log(`\n认证记录：${n} 个插件（版本级，认证于 ${(doc.createdAt ?? now).slice(0, 10)}）`);
}

console.log('\n当前来源：');
for (const r of db.listListSources()) {
  console.log(`  [${r.kind === 1 ? '整合包' : r.provenance === 'certified' ? '认证' : '自动'}] ${r.label} · ${r.entries} 条 · ${r.publisher || '无署名'}`);
}
console.log('认证记录总数：', db.countCerts());
db.close();
