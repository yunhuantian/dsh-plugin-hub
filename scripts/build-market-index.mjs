/**
 * 生成 DPMIDX v2 市场索引（生产者工具）。
 *
 * 输入：JSON 数组或 NDJSON，每条形如
 *   { "name": "dsh-foo", "url": "https://…/foo.tar.gz", "category": "tool", "deps": ["dsh-bar"], "flags": 0 }
 * 只要求 name 与 url；category / deps / flags 可省。
 *
 * 用法：
 *   node scripts/build-market-index.mjs <输入> <输出.dpmidx>
 *   node scripts/build-market-index.mjs <输入>            # 输出 <输入>.dpmidx
 *   cat a.json b.ndjson.ndjson                        # 也可先合并成一个 NDJSON 再喂进来
 *
 * 设计意图：这个格式不绑定我们的商店 —— 任何市场/社区都能用本脚本产出自己的索引，
 * 客户端把多份索引合并后就是统一市场（见 mergeMarketIndexes）。
 */
import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { basename } from 'node:path'
import { encodeMarketIndex, FLAG_ARTIFACT, FLAG_SOURCE } from '../lib/hub-market-index/src/index.js'

/**
 * 从链接推断安装语义（调用方显式给了 flags 就不猜）。
 *
 * 这一步让「一键安装」有依据：成品包 = 下载解压即可；源码仓库 = 需要装依赖并构建。
 * 猜错不算致命 —— 消费者仍可按后缀复核 —— 但明确标注比让 UI 去嗅探更可靠。
 */
function inferFlags(url) {
  const clean = url.split('?')[0].split('#')[0].toLowerCase()
  if (/\.(tgz|tar\.gz|zip)$/.test(clean)) return FLAG_ARTIFACT
  // npm registry 的 tarball
  if (clean.includes('/-/') && clean.endsWith('.tgz')) return FLAG_ARTIFACT
  // GitHub /archive/ 也是成品源码包，但仍需构建 → 归为 source
  if (/^git\+|\.git$/.test(clean)) return FLAG_SOURCE
  if (/github\.com|gitlab\.com|gitee\.com/.test(clean)) return FLAG_SOURCE
  return 0
}

const [input, outputArg] = process.argv.slice(2)
if (!input) {
  console.error('用法: node scripts/build-market-index.mjs <输入 JSON/NDJSON> [输出 .dpmidx]')
  process.exit(2)
}

const text = readFileSync(input, 'utf8').trim()
let rows
if (text.startsWith('[')) rows = JSON.parse(text)
else rows = text.split(/\r?\n/).filter((l) => l.trim()).map((l) => JSON.parse(l))

if (!Array.isArray(rows)) throw new Error('输入必须是数组或 NDJSON')

const entries = []
const seen = new Set()
let skipped = 0
for (const r of rows) {
  const name = typeof r?.name === 'string' ? r.name.trim() : ''
  const url = typeof r?.url === 'string' ? r.url.trim() : ''
  if (!name || !url) { skipped++; continue }
  if (seen.has(name)) { skipped++; continue }        // 同名只保留第一条，保证确定性
  seen.add(name)
  const deps = Array.isArray(r.deps) ? r.deps.filter((d) => typeof d === 'string' && d) : []
  const description = typeof r.description === 'string' ? r.description.trim()
    : typeof r.desc === 'string' ? r.desc.trim()
    : typeof r.intro === 'string' ? r.intro.trim() : ''
  entries.push({
    name,
    url,
    description,
    category: typeof r.category === 'string' ? r.category : '',
    deps,
    flags: Number.isInteger(r.flags) ? r.flags : inferFlags(url),
  })
}

const buf = encodeMarketIndex(entries)
const out = outputArg ?? `${input.replace(/\.[^.]+$/, '')}.dpmidx`
writeFileSync(out, buf)

console.log(`输入 ${rows.length} 条 → 写入 ${entries.length} 条（跳过 ${skipped}）`)
console.log(`输出 ${out}  ${(buf.length / 1024).toFixed(1)} KB  (${basename(out)})`)
console.log(`平均每条 ${(buf.length / Math.max(entries.length, 1)).toFixed(1)} 字节`)
try { console.log(`输入体积 ${(statSync(input).size / 1024).toFixed(1)} KB → 压缩比 ${(statSync(input).size / buf.length).toFixed(2)}×`) } catch {}
