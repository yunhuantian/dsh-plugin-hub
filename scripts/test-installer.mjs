/**
 * 一键安装包的回归测试：临时 DSH home + 两个 profile，验证落盘、清单、幂等与错误路径。
 *
 * 用法：node scripts/test-installer.mjs      （需先 node scripts/build-installer.mjs）
 */
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version
const distDir = join(ROOT, 'dist', `dsh-plugin-hub-${version}-win`)
if (!existsSync(join(distDir, 'install.mjs'))) {
  console.error(`未找到发行目录，请先运行: node scripts/build-installer.mjs`)
  process.exit(2)
}

const work = mkdtempSync(join(tmpdir(), 'inst-test-'))
const home = join(work, '.dsh')
let fails = 0
const ok = (label, cond, extra = '') => {
  console.log(`${cond ? '✅' : '❌'} ${label}${extra ? ' — ' + extra : ''}`)
  if (!cond) fails++
}

function mkProfile(name) {
  const dir = join(home, 'profiles', name)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'package.json'), JSON.stringify({
    name: `dsh-profile-${name}`, private: true, dependencies: {},
    dsh: { profile: { bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app'] } },
  }, null, 2))
  return dir
}
const dirs = { web: mkProfile('web'), desktop: mkProfile('desktop') }

execFileSync(process.execPath, [join(distDir, 'install.mjs')], { env: { ...process.env, DSH_HOME: home }, stdio: 'pipe' })

for (const [label, dir] of Object.entries(dirs)) {
  const manifest = join(dir, 'package.json')
  const j = JSON.parse(readFileSync(manifest, 'utf8'))
  const pkgDir = join(dir, 'node_modules', 'dsh-plugin-hub')
  ok(`${label}: dependencies 记为当前版本`, j.dependencies?.['dsh-plugin-hub'] === version, String(j.dependencies?.['dsh-plugin-hub']))
  ok(`${label}: bundles 含 dsh-plugin-hub`, (j.dsh.profile.bundles ?? []).includes('dsh-plugin-hub'))
  ok(`${label}: 包体已就位`, existsSync(join(pkgDir, 'package.json')) && existsSync(join(pkgDir, 'lib', 'client.js')))
  ok(`${label}: 生成备份`, existsSync(`${manifest}.bak-install`))
  ok(`${label}: 既有 bundles 未被破坏`, (j.dsh.profile.bundles ?? []).includes('@deepseek-ai/dsh-base'))
}

// 幂等
execFileSync(process.execPath, [join(distDir, 'install.mjs')], { env: { ...process.env, DSH_HOME: home }, stdio: 'pipe' })
const bundles = JSON.parse(readFileSync(join(dirs.web, 'package.json'), 'utf8')).dsh.profile.bundles
ok('重复运行不产生重复 bundle 条目', bundles.filter((b) => b === 'dsh-plugin-hub').length === 1)

// 空 home 必须显式失败
const empty = join(work, 'empty')
mkdirSync(empty, { recursive: true })
try {
  execFileSync(process.execPath, [join(distDir, 'install.mjs')], { env: { ...process.env, DSH_HOME: empty }, stdio: 'pipe' })
  ok('空 home 应失败', false)
} catch (e) {
  ok('空 home 给出明确失败', e.status === 1)
}

rmSync(work, { recursive: true, force: true })
console.log(`\n${fails === 0 ? '全部通过' : `${fails} 条失败`}`)
process.exit(fails === 0 ? 0 : 1)
