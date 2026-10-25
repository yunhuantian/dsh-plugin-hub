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
import { openMarketIndex, mergeMarketIndexes } from '../lib/hub-market-index/src/index.js'

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
// 市场 B：同名条目不同链接 + 自有条目 + 一条源码仓库
writeFileSync(join(work, 'b.ndjson'), [
  JSON.stringify({ name: 'dsh-shared', url: 'https://b.example/shared.tgz', category: 'data' }),
  JSON.stringify({ name: 'dsh-b', url: 'https://b.example/dsh-b.tgz', category: 'agent' }),
  JSON.stringify({ name: 'dsh-a', url: 'https://b.example/dsh-a.tgz', category: 'data', deps: ['dsh-c'] }),
  JSON.stringify({ name: 'dsh-src', url: 'https://github.com/someone/dsh-src', category: 'dev' }),
].join('\n'))

// 生产者工具（同时验证 CLI 可用）
for (const [src, out] of [['a.json', 'a.dpmidx'], ['b.ndjson', 'b.dpmidx']]) {
  execFileSync(process.execPath, [join(ROOT, 'scripts', 'build-market-index.mjs'), join(work, src), join(work, out)], { stdio: 'pipe' })
}

const A = openMarketIndex(readFileSync(join(work, 'a.dpmidx')))
const B = openMarketIndex(readFileSync(join(work, 'b.dpmidx')))
ok('单索引可读（A 2 条 / B 4 条）', A.count === 2 && B.count === 4, `${A.count}/${B.count}`)
ok('介绍可读回', A.description(0) === 'A 市场的条目介绍', JSON.stringify(A.description(0)))
ok('成品包链接 → FLAG_ARTIFACT', (A.flags(0) & 1) === 1, String(A.flags(0)))
ok('源码仓库链接 → FLAG_SOURCE', (B.flags(B.find('dsh-src')[0]) & 2) === 2)

const cat = mergeMarketIndexes([{ source: 'market-a', index: A }, { source: 'market-b', index: B }])
ok('合并后按名称去重', cat.count === 4, `得到 ${cat.count}`)

const shared = cat.find('dsh-shared')[0]
ok('同名条目：先传入者决定链接', shared.url === 'https://a.example/shared.tgz', shared.url)
ok('同名条目：来源累积', shared.sources.length === 2 && shared.sources.includes('market-b'), JSON.stringify(shared.sources))

const a = cat.find('dsh-a')[0]
ok('介绍随条目一并合并', a.description === 'A 市场的条目介绍')
ok('重复条目的依赖取并集', a.deps.sort().join(',') === 'dsh-b,dsh-c', JSON.stringify(a.deps))
ok('按来源统计条目数', JSON.stringify(cat.stats()) === JSON.stringify([{ source: 'market-a', entries: 2 }, { source: 'market-b', entries: 4 }]))

try { openMarketIndex(Buffer.from('not an index')); ok('非索引文件应被拒绝', false) } catch { ok('非索引文件被拒绝', true) }
try { openMarketIndex(readFileSync(join(work, 'a.dpmidx')).subarray(0, 20)); ok('截断文件应被拒绝', false) } catch { ok('截断文件被拒绝', true) }

rmSync(work, { recursive: true, force: true })
console.log(`\n${fails === 0 ? '全部通过' : `${fails} 条失败`}`)
process.exit(fails === 0 ? 0 : 1)
