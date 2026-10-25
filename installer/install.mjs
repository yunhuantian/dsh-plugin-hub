/**
 * dsh-plugin-hub 一键安装器（无需 git / npm / pnpm / 编译）。
 *
 * 做的事：找到 DSH 的 home 与 profile → 把内置的包体复制进 profile 的
 * node_modules → 写回 package.json 的 dependencies 与 dsh.profile.bundles。
 *
 * 设计约束：
 * - **不联网**：包体已经在压缩包里，装的是离线副本。
 * - **不调用包管理器**：避开 pnpm 在本机建符号链接无权限的问题（0.2 前踩过）。
 * - **幂等**：重复运行只会覆盖包体、把清单写成同一个值。
 * - **可回退**：改动前备份 package.json（*.bak-install）。
 */
import { cpSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync, copyFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const PKG_SRC = join(HERE, 'package')
const PKG_NAME = 'dsh-plugin-hub'

const log = (s = '') => process.stdout.write(`${s}\n`)
const ok = (s) => log(`  [OK]   ${s}`)
const warn = (s) => log(`  [注意] ${s}`)
const bad = (s) => log(`  [失败] ${s}`)

log('')
log('  dsh-plugin-hub 安装器')
log('  ====================')
log('')

// ---- 1) 定位 DSH home -------------------------------------------------------
const home = process.env.DSH_HOME ? resolve(process.env.DSH_HOME) : join(homedir(), '.dsh')
log(`DSH home: ${home}`)
if (!existsSync(home)) {
  bad(`没找到 DSH 目录。请先启动一次 DeepSeek Harness（桌面端或网页版），再运行本安装器。`)
  process.exit(1)
}

// ---- 2) 枚举 profile --------------------------------------------------------
const profilesDir = join(home, 'profiles')
const profiles = []
if (existsSync(profilesDir)) {
  for (const name of readdirSync(profilesDir)) {
    const dir = join(profilesDir, name)
    const manifest = join(dir, 'package.json')
    try {
      if (!statSync(dir).isDirectory() || !existsSync(manifest)) continue
      const json = JSON.parse(readFileSync(manifest, 'utf8'))
      if (!json?.dsh?.profile) continue
      profiles.push({ name, dir, manifest, json })
    } catch { /* 跳过不可读的 */ }
  }
}
if (profiles.length === 0) {
  bad('没有找到任何已初始化的 DSH profile。请先启动一次 DeepSeek Harness，再运行本安装器。')
  process.exit(1)
}
log('')
log('检测到以下 profile：')
profiles.forEach((p, i) => {
  const cur = p.json.dependencies?.[PKG_NAME]
  log(`  ${i + 1}) ${p.name.padEnd(10)} ${cur ? `已安装 ${cur}（将更新）` : '未安装'}`)
})

// ---- 3) 选定目标 ------------------------------------------------------------
let targets = profiles
if (profiles.length > 1) {
  const arg = process.argv.slice(2).find((a) => /^\d+$/.test(a))
  if (arg !== undefined) {
    const idx = Number(arg) - 1
    if (idx < 0 || idx >= profiles.length) {
      bad(`序号 ${arg} 超出范围`)
      process.exit(1)
    }
    targets = [profiles[idx]]
  } else if (!process.stdin.isTTY) {
    log('')
    log('（非交互运行：将安装到全部 profile）')
  } else {
    const answer = await new Promise((res) => {
      const rl = createInterface({ input: process.stdin, output: process.stdout })
      rl.question('\n装到哪个？输入序号，直接回车 = 全部: ', (v) => { rl.close(); res(v.trim()) })
    })
    if (answer !== '') {
      const idx = Number(answer) - 1
      if (!Number.isInteger(idx) || idx < 0 || idx >= profiles.length) {
        bad('序号无效')
        process.exit(1)
      }
      targets = [profiles[idx]]
    }
  }
}

// ---- 4) 包体自检 ------------------------------------------------------------
if (!existsSync(join(PKG_SRC, 'package.json'))) {
  bad(`压缩包不完整：缺少 package/ 目录（应与安装器同级）。当前查找：${PKG_SRC}`)
  process.exit(1)
}
const version = JSON.parse(readFileSync(join(PKG_SRC, 'package.json'), 'utf8')).version
log('')
log(`待安装版本: ${version}`)

// ---- 5) 安装 ----------------------------------------------------------------
let failed = 0
for (const p of targets) {
  log('')
  log(`→ ${p.name}`)
  const dest = join(p.dir, 'node_modules', PKG_NAME)
  try {
    cpSync(PKG_SRC, dest, { recursive: true, force: true })
    ok(`包体已写入 ${dest}`)
  } catch (e) {
    bad(`复制失败：${e.message}（若 Harness 正在运行，请完全退出后重试）`)
    failed++
    continue
  }

  const json = p.json
  copyFileSync(p.manifest, `${p.manifest}.bak-install`)
  json.dependencies = { ...(json.dependencies ?? {}), [PKG_NAME]: version }
  json.dsh = json.dsh ?? {}
  json.dsh.profile = json.dsh.profile ?? {}
  const bundles = Array.isArray(json.dsh.profile.bundles) ? json.dsh.profile.bundles : []
  if (!bundles.includes(PKG_NAME)) bundles.push(PKG_NAME)
  json.dsh.profile.bundles = bundles
  writeFileSync(p.manifest, `${JSON.stringify(json, null, 2)}\n`)
  ok(`清单已更新（dependencies + bundles），原文件备份为 package.json.bak-install`)
}

// ---- 6) 收尾 ----------------------------------------------------------------
log('')
if (failed > 0) {
  bad(`${failed} 个 profile 未完成。`)
  process.exit(1)
}
log('安装完成。')
log('')
log('接下来：')
log('  1. 完全退出 DeepSeek Harness（连托盘图标一起退出），再重新打开。')
log('  2. 侧栏「插件」页里会出现「插件商店」。')
log('')
