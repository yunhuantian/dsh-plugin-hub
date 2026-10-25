#!/usr/bin/env node
/**
 * 列表来源的回归测试（host 层，无需启动 dsh）：
 *
 *   node --experimental-sqlite scripts/test-list-sources.mjs
 *
 * 覆盖：JSON / NDJSON / 已转换格式导入、容器类型错配必须拒绝、
 * 同名去重、自动爬取入参解析、安装规格推断、移除来源清文件。
 */
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { encodeMarketIndex, KIND_LIST, KIND_MODPACK, openMarketIndex } from '../lib/hub-market-index/src/index.js';
import { StoreDB } from '../lib/hub/src/host/store-db.js';
import {
  addListSource,
  installSpecFor,
  listFile,
  parseCrawlSpec,
  readSourceIndex,
  removeSource,
  sniffBytes,
} from '../lib/hub/src/host/list-sources.js';

let pass = 0;
let fail = 0;
function ok(name, cond, extra = '') {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name} ${extra}`); }
}

const home = mkdtempSync(join(tmpdir(), 'hub-lists-'));
const db = new StoreDB(home);

try {
  console.log('--- 容器嗅探 ---');
  const jsonBytes = Buffer.from(JSON.stringify([{ name: 'a', url: 'https://e/a.tgz' }]));
  ok('JSON 数组被识别为 json', sniffBytes(jsonBytes).container === 'json');
  ok('空文件是 unknown', sniffBytes(Buffer.from('')).container === 'unknown');
  const nd = Buffer.from('{"name":"a","url":"https://e/a.tgz"}\n{"name":"b","url":"https://e/b.tgz"}\n');
  ok('一行一个对象被识别为 ndjson', sniffBytes(nd).container === 'ndjson');

  console.log('\n--- 导入插件列表（JSON 数组）---');
  const r1 = await addListSource(db, home, {
    text: JSON.stringify([
      { name: 'dsh-a', url: 'https://e/dsh-a.tgz', description: 'A 插件', category: 'tool', deps: ['dsh-b'] },
      { name: 'dsh-b', url: 'https://github.com/o/dsh-b', description: 'B 插件' },
      { name: 'dsh-a', url: 'https://e/dup.tgz' },
      { url: 'https://e/no-name.tgz' },
    ]),
    expect: KIND_LIST,
    label: '社区列表',
  });
  ok('导入成功', r1.row.kind === KIND_LIST && r1.row.entries === 2, `${r1.row.kind}/${r1.row.entries}`);
  ok('格式记为 json（需要转换）', r1.row.format === 'json', r1.row.format);
  ok('重名被合并并给出提示', r1.warnings.some((w) => w.includes('重复')), JSON.stringify(r1.warnings));
  ok('缺名称的记录被跳过并提示', r1.warnings.some((w) => w.includes('缺少名称')), JSON.stringify(r1.warnings));
  const idx1 = readSourceIndex(r1.row, home);
  ok('落盘文件可被重新打开', idx1.count === 2 && idx1.name(0) === 'dsh-a');
  ok('介绍被写入索引', idx1.description(0) === 'A 插件', idx1.description(0));
  ok('依赖被写入索引', idx1.deps(0)[0] === 'dsh-b', JSON.stringify(idx1.deps(0)));
  ok('tarball 链接被标为可安装', (idx1.flags(0) & 1) === 1, String(idx1.flags(0)));
  ok('仓库链接被标为源码', (idx1.flags(1) & 2) === 2, String(idx1.flags(1)));

  console.log('\n--- 再次导入同一来源 → 覆盖而不是新增 ---');
  const r1b = await addListSource(db, home, {
    text: JSON.stringify([{ name: 'dsh-a', url: 'https://e/dsh-a.tgz' }]),
    expect: KIND_LIST,
    label: '社区列表',
  });
  ok('id 稳定（同一 label + 内容）', r1b.row.id === r1.row.id, `${r1b.row.id} vs ${r1.row.id}`);
  ok('注册表里仍只有一条', db.listListSources().length === 1, String(db.listListSources().length));

  console.log('\n--- 容器类型必须区分 ---');
  const modpack = encodeMarketIndex([{ name: 'combo-a', url: 'https://e/a.tgz' }], { kind: KIND_MODPACK });
  let rejected = false;
  try {
    await addListSource(db, home, { base64: modpack.toString('base64'), expect: KIND_LIST, label: '错的' });
  } catch (e) {
    rejected = true;
    ok('商店拒绝导入整合包', /整合包/.test(String(e)), String(e));
  }
  if (!rejected) ok('商店拒绝导入整合包', false);

  const r2 = await addListSource(db, home, {
    base64: modpack.toString('base64'),
    expect: KIND_MODPACK,
    label: '整合包示例',
  });
  ok('整合包页接受 kind=1', r2.row.kind === KIND_MODPACK && r2.row.entries === 1);
  ok('整合包能单独列出', db.listListSources(KIND_MODPACK).length === 1);
  ok('商店区（kind=0）不含整合包', db.listListSources(KIND_LIST).length === 1);

  let rejected2 = false;
  try {
    await addListSource(db, home, {
      base64: readFileSync(listFile(r1.row.id, home)).toString('base64'),
      expect: KIND_MODPACK,
      label: '反着来',
    });
  } catch (e) {
    rejected2 = true;
    ok('整合包页拒绝导入插件列表', /插件列表/.test(String(e)), String(e));
  }
  if (!rejected2) ok('整合包页拒绝导入插件列表', false);

  console.log('\n--- 自动爬取的入参解析 ---');
  const cases = [
    ['github.com/owner', 'user:owner'],
    ['https://github.com/owner', 'user:owner'],
    ['https://github.com/owner/repo', 'repo:owner/repo'],
    ['owner/repo', 'repo:owner/repo'],
    ['@owner', 'user:owner'],
    ['topic:dsh-plugin', 'topic:dsh-plugin'],
  ];
  for (const [input, query] of cases) {
    ok(`${input} → ${query}`, parseCrawlSpec(input).query === query, parseCrawlSpec(input).query);
  }

  console.log('\n--- 安装规格推断 ---');
  ok('tarball 地址直接用', installSpecFor({ name: 'x', url: 'https://e/x-1.0.0.tgz' }) === 'https://e/x-1.0.0.tgz');
  ok('npm registry 地址直接用', installSpecFor({ name: 'x', url: 'https://registry.npmjs.org/x/-/x-1.0.0.tgz' }).startsWith('https://registry.npmjs.org/'));
  ok('GitHub 仓库转成 git+ 规格', installSpecFor({ name: 'x', url: 'https://github.com/o/r' }) === 'git+https://github.com/o/r.git');
  ok('普通网页不可安装', installSpecFor({ name: 'x', url: 'https://example.com/about' }) === null);

  console.log('\n--- 移除来源 ---');
  const file = listFile(r1.row.id, home);
  ok('移除前文件存在', existsSync(file));
  ok('removeSource 返回 true', removeSource(db, home, r1.row.id));
  ok('移除后落盘文件被删除', !existsSync(file));
  ok('注册表不再包含它', db.getListSource(r1.row.id) === undefined);
} finally {
  db.close();
  rmSync(home, { recursive: true, force: true });
}

console.log(`\n${pass} 通过 / ${fail} 失败`);
process.exit(fail === 0 ? 0 : 1);
