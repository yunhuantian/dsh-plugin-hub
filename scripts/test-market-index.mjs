/**
 * DPMIDX v2 的回归测试：编码/解码、介绍字段、安装语义推断、多源合并。
 *
 * 用法：node scripts/test-market-index.mjs      （需先 npm run build:host）
 */
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { encodeMarketIndex, isArtifactUrl, KIND_LIST, KIND_MODPACK, kindLabel, mergeMarketIndexes, normalizeRepoUrl, openMarketIndex, repoKeyOf } from '../lib/hub-market-index/src/index.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const work = mkdtempSync(join(tmpdir(), 'fmt-'))
let fails = 0
const ok = (label, cond, extra = '') => {
  console.log(`${cond ? '✅' : '❌'} ${label}${extra ? ' — ' + extra : ''}`)
  if (!cond) fails++
}

// 市场 A：dsh-a（带介绍、依赖 b）、dsh-shared（.tgz → 成品）
writeFileSync(join(work, 'a.json'), JSON.stringify([
  { name: 'dsh-a', url: 'https://a.example/dsh-a.tgz', description: 'A 市场的条目介绍', category: 'tool', deps: ['dsh-b'] },
  { name: 'dsh-shared', url: 'https://a.example/shared.tgz', category: 'ui' },
]))
// 市场 B：同名条目不同链接 + 自有条目 + 一条源码仓库 + **同一仓库的不同写法**
writeFileSync(join(work, 'b.ndjson'), [
  JSON.stringify({ name: 'dsh-shared', url: 'https://b.example/shared.tgz', category: 'data' }),
  JSON.stringify({ name: 'dsh-b', url: 'https://b.example/dsh-b.tgz', category: 'agent' }),
  JSON.stringify({ name: 'dsh-a', url: 'https://b.example/dsh-a.tgz', category: 'data', deps: ['dsh-c'] }),
  JSON.stringify({ name: 'dsh-src', url: 'https://github.com/someone/dsh-src', category: 'dev' }),
  // 与上一行同一仓库：换了名字、加了 .git、末尾斜杠、git+ 前缀、大写主机名
  JSON.stringify({ name: 'dsh-src-fork-name', url: 'git+https://GitHub.com/someone/dsh-src.git/', category: 'dev' }),
].join('\n'))

// 生产者工具（同时验证 CLI 可用）
for (const [src, out] of [['a.json', 'a.dpmidx'], ['b.ndjson', 'b.dpmidx']]) {
  execFileSync(process.execPath, [join(ROOT, 'scripts', 'build-market-index.mjs'), join(work, src), join(work, out)], { stdio: 'pipe' })
}

const A = openMarketIndex(readFileSync(join(work, 'a.dpmidx')))
const B = openMarketIndex(readFileSync(join(work, 'b.dpmidx')))
ok('单索引可读（A 2 条 / B 5 条）', A.count === 2 && B.count === 5, `${A.count}/${B.count}`)
ok('介绍可读回', A.description(0) === 'A 市场的条目介绍', JSON.stringify(A.description(0)))
ok('成品包链接 → FLAG_ARTIFACT', (A.flags(0) & 1) === 1, String(A.flags(0)))
ok('源码仓库链接 → FLAG_SOURCE', (B.flags(B.find('dsh-src')[0]) & 2) === 2)

const cat = mergeMarketIndexes([{ source: 'market-a', index: A }, { source: 'market-b', index: B }])
ok('合并后去重（名称命中即合并）', cat.count === 5, `得到 ${cat.count}`)

const shared = cat.find('dsh-shared')[0]
ok('同名条目：先传入者决定链接', shared.url === 'https://a.example/shared.tgz', shared.url)
ok('同名条目：来源累积', shared.sources.length === 2 && shared.sources.includes('market-b'), JSON.stringify(shared.sources))

const a = cat.find('dsh-a')[0]
ok('介绍随条目一并合并', a.description === 'A 市场的条目介绍')
ok('重复条目的依赖取并集', a.deps.sort().join(',') === 'dsh-b,dsh-c', JSON.stringify(a.deps))
// 仓库根地址 → 不静默合并（monorepo / 多插件同仓库是合法的），只进 repoGroups
const exact = (n) => cat.find(n).filter((e) => e.name === n)
const srcA = exact('dsh-src')
const srcB = exact('dsh-src-fork-name')
ok('同仓库根地址的两条不合并', srcA.length === 1 && srcB.length === 1, `${srcA.length}/${srcB.length}`)
const srcGroups = cat.repoGroups().filter((g) => g.repoKey === 'repo:github.com/someone/dsh-src')
ok('它们被报告为同一仓库分组', srcGroups.length === 1 && srcGroups[0].names.length === 2, JSON.stringify(srcGroups))
ok('归一化：git+ / .git / 尾斜杠 / 主机名大小写 / www 都被抹平',
  ['git+https://GitHub.com/a/b.git/', 'https://www.github.com/a/b', 'https://github.com/a/b///'].map((u) => normalizeRepoUrl(u)) 
    .every((u) => u === 'https://github.com/a/b'))
ok('查询串保留（不误合并不同版本）', normalizeRepoUrl('https://e.com/x.tgz?v=1') !== normalizeRepoUrl('https://e.com/x.tgz?v=2'))
ok('按来源统计条目数', JSON.stringify(cat.stats()) === JSON.stringify([{ source: 'market-a', entries: 2 }, { source: 'market-b', entries: 5 }]))

try { openMarketIndex(Buffer.from('not an index')); ok('非索引文件应被拒绝', false) } catch { ok('非索引文件被拒绝', true) }
try { openMarketIndex(readFileSync(join(work, 'a.dpmidx')).subarray(0, 20)); ok('截断文件应被拒绝', false) } catch { ok('截断文件被拒绝', true) }

console.log('\n--- 仓库身份（地址只用于识别，不用于静默合并）---')
ok('GitHub archive 地址 → repo 键', repoKeyOf('https://github.com/o/r/archive/refs/tags/v1.tar.gz') === 'repo:github.com/o/r', repoKeyOf('https://github.com/o/r/archive/refs/tags/v1.tar.gz'))
ok('npm tarball → 剥掉版本', repoKeyOf('https://registry.npmjs.org/@s/p/-/p-1.2.3.tgz') === 'npm:@s/p', repoKeyOf('https://registry.npmjs.org/@s/p/-/p-1.2.3.tgz'))
ok('小写归一', repoKeyOf('https://GitHub.com/O/R') === 'repo:github.com/o/r')
ok('非主流主机推不出键（回退到 URL 判重）', repoKeyOf('https://mirror.example/x.tgz') === '')
ok('仓库根地址不算产物地址', isArtifactUrl('https://github.com/o/r') === false)
ok('archive 地址算产物地址', isArtifactUrl('https://github.com/o/r/archive/refs/tags/v1.tar.gz') === true)

const monoA = openMarketIndex(encodeMarketIndex([{ name: 'mono-a', url: 'https://github.com/mono/repo' }]))
const monoB = openMarketIndex(encodeMarketIndex([{ name: 'mono-b', url: 'https://github.com/mono/repo' }]))
const mono = mergeMarketIndexes([{ source: 'x', index: monoA }, { source: 'y', index: monoB }])
ok('同仓库不同名的插件不被合并（monorepo 场景）', mono.count === 2, `得到 ${mono.count}`)
ok('但会被报告为同一仓库分组', mono.repoGroups().length === 1 && mono.repoGroups()[0].names.length === 2, JSON.stringify(mono.repoGroups()))

const sameArtifact = mergeMarketIndexes([
  { source: 'x', index: openMarketIndex(encodeMarketIndex([{ name: 'same-a', url: 'https://e.com/p-1.0.0.tgz' }])) },
  { source: 'y', index: openMarketIndex(encodeMarketIndex([{ name: 'same-b', url: 'https://e.com/p-1.0.0.tgz' }])) },
])
ok('同一产物地址被两份列表收录 → 合并为一条', sameArtifact.count === 1, `得到 ${sameArtifact.count}`)
ok('被合并的名字记入 aliases', sameArtifact.entry(0).aliases.includes('same-b'), JSON.stringify(sameArtifact.entry(0).aliases))

console.log('\n--- 容器类型：列表 vs 整合包（同格式，靠魔数第 8 字节区分）---')
const sample = [{ name: 'dsh-x', url: 'https://e.com/x.tgz' }]
ok('默认是列表', openMarketIndex(encodeMarketIndex(sample)).kind === KIND_LIST)
ok('可以写成整合包', openMarketIndex(encodeMarketIndex(sample, { kind: KIND_MODPACK })).kind === KIND_MODPACK)
ok('类型名可读', kindLabel(KIND_LIST) === '插件列表' && kindLabel(KIND_MODPACK) === '整合包')
{
  const bad = Buffer.from(encodeMarketIndex(sample))
  bad.writeUInt8(9, 7)                                  // 伪造一个未知类型
  let threw = false
  try { openMarketIndex(bad) } catch { threw = true }
  ok('未知容器类型被拒绝', threw)
}
{
  const bad = Buffer.from(encodeMarketIndex(sample))
  bad.writeUInt8(99, 6)                                 // 伪造魔数版本
  let threw = false
  try { openMarketIndex(bad) } catch { threw = true }
  ok('未知魔数版本被拒绝', threw)
}

// ---- v3 元数据（署名）与 v2 向后兼容 ----
{
  const withMeta = encodeMarketIndex(sample, {
    kind: KIND_LIST,
    meta: { name: '插件表', publisher: '云幻天', description: '精选插件', createdAt: '2026-10-25T00:00:00.000Z' },
  })
  const mi = openMarketIndex(withMeta)
  ok('署名往返正确', mi.meta.publisher === '云幻天' && mi.meta.name === '插件表', JSON.stringify(mi.meta))
  ok('条目不受元数据影响', mi.count === 1 && mi.name(0) === 'dsh-x')

  // 把同一份（无 meta）的文件伪装成 v2：头 8 字节零保留位在 v2 里天然为 0。
  const legacy = Buffer.from(encodeMarketIndex(sample))
  legacy.writeUInt8(2, 6)
  legacy.writeUInt32LE(2, 8)
  const li = openMarketIndex(legacy)
  ok('v2 旧文件仍可读', li.count === 1 && li.name(0) === 'dsh-x' && Object.keys(li.meta).length === 0)
}

rmSync(work, { recursive: true, force: true })
console.log(`\n${fails === 0 ? '全部通过' : `${fails} 条失败`}`)
process.exit(fails === 0 ? 0 : 1)
