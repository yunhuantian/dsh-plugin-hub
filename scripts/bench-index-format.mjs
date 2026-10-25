/**
 * DPMIDX v2 基准：与「整份 JSON 读进内存再 parse」对比。
 *
 * 用法：node --expose-gc scripts/bench-index-format.mjs [条数...]
 *
 * 测量口径：**从磁盘读入 → 得到可查询结构**，两侧都把输入缓冲计入堆。
 * 这正是「下载一份索引后导入」的真实成本；不含生产（编码/JSON 生成）的时间。
 *
 * 对照组参考：官方 README 自述 2 万插件约 130 MiB 堆、10 万插件 38 MiB 索引
 * 反序列化约 190 ms。
 */
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { encodeMarketIndex, openMarketIndex } from '../lib/hub-market-index/src/index.js'

const CATEGORIES = ['tool', 'agent', 'ui', 'data', 'vision', 'office', 'memory', 'usage', 'notify', 'dev', 'chat', 'aggregate']

function makeEntries(n) {
  const out = []
  for (let i = 0; i < n; i++) {
    const name = `dsh-plugin-${i.toString(36)}`
    const deps = []
    for (let d = 0; d < i % 4; d++) deps.push(`dsh-plugin-${Math.max(0, i - 1 - d).toString(36)}`)
    out.push({
      name,
      url: `https://github.com/community/dsh-plugin-${i.toString(36)}/archive/refs/tags/v1.${i % 9}.0.tar.gz`,
      description: `第 ${i} 个社区插件：提供一组与主题相关的工具与视图，支持配置与开关。`,
      category: CATEGORIES[i % CATEGORIES.length],
      deps,
      flags: i % 3,
    })
  }
  return out
}

const gc = globalThis.gc ?? (() => {})
const mb = (n) => (n / 1024 / 1024).toFixed(1)
const ms = (n) => n.toFixed(1)

/** 测「读盘 + 建结构」，heap 计入输入缓冲。 */
function measure(fn) {
  gc()
  const before = process.memoryUsage().heapUsed
  const t0 = performance.now()
  const result = fn()
  const elapsed = performance.now() - t0
  gc()
  const after = process.memoryUsage().heapUsed
  return { ms: elapsed, heapMB: (after - before) / 1024 / 1024, result }
}

const work = mkdtempSync(join(tmpdir(), 'bench-idx-'))
const sizes = process.argv.slice(2).map(Number).filter((n) => n > 0)
const targets = sizes.length ? sizes : [20000, 100000]

console.log('DPMIDX v2 vs JSON —— 同一份数据（名称 / 链接 / 介绍 / 分类 / 依赖 / flags）')
console.log('口径：从磁盘读入 → 可查询结构；堆包含输入缓冲\n')

for (const n of targets) {
  const entries = makeEntries(n)

  const jsonFile = join(work, `m-${n}.json`)
  const binFile = join(work, `m-${n}.dpmidx`)
  writeFileSync(jsonFile, JSON.stringify({ version: 1, entries }))
  writeFileSync(binFile, encodeMarketIndex(entries))

  const jsonLoad = measure(() => {
    const text = readFileSync(jsonFile, 'utf8')
    return JSON.parse(text).entries
  })
  const binLoad = measure(() => {
    const buf = readFileSync(binFile)
    return openMarketIndex(buf)
  })

  // 「建好市场后要展示」的等价工作量：取到全部名称
  const t0 = performance.now()
  let s1 = 0
  for (const e of jsonLoad.result) s1 += e.name.length
  const jsonTouch = performance.now() - t0

  const t1 = performance.now()
  let s2 = 0
  for (let i = 0; i < binLoad.result.count; i++) s2 += binLoad.result.name(i).length
  const binTouch = performance.now() - t1

  if (s1 !== s2) throw new Error('两侧读取结果不一致，基准不可比')

  const jsonBytes = readFileSync(jsonFile).length
  const binBytes = readFileSync(binFile).length

  console.log(`条数 ${n.toLocaleString('en-US')}`)
  console.log(`  JSON      ${mb(jsonBytes)} MB | 读+parse ${ms(jsonLoad.ms)} ms | 触达名称 ${ms(jsonTouch)} ms | 堆 +${jsonLoad.heapMB.toFixed(1)} MiB`)
  console.log(`  DPMIDX v2 ${mb(binBytes)} MB | 读+open  ${ms(binLoad.ms)} ms | 触达名称 ${ms(binTouch)} ms | 堆 +${binLoad.heapMB.toFixed(1)} MiB`)
  console.log(`  提升      体积 ${(jsonBytes / binBytes).toFixed(2)}× | 加载 ${(jsonLoad.ms / binLoad.ms).toFixed(1)}× | 堆 ${(jsonLoad.heapMB / Math.max(binLoad.heapMB, 0.1)).toFixed(1)}×`)
  console.log()
}

rmSync(work, { recursive: true, force: true })
