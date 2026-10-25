/**
 * 组装免安装版的发行目录与压缩包：
 *   dist/dsh-plugin-hub-<ver>-win/
 *     安装.cmd        ← 双击这个
 *     install.mjs     ← 逻辑（Node 或桌面端自带运行时执行）
 *     package/        ← 包体（与 npm files 一致）
 *     README.txt      ← 一页说明
 *   dist/dsh-plugin-hub-<ver>-win.zip
 *
 * 用法：node scripts/build-installer.mjs
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const OUT = join(ROOT, 'dist', `dsh-plugin-hub-${pkg.version}-win`)
const PKG = join(OUT, 'package')

rmSync(OUT, { recursive: true, force: true })
mkdirSync(PKG, { recursive: true })

// 1) 包体：与 package.json 的 files 保持一致（lib 已在构建时生成）
for (const entry of ['package.json', 'README.md', 'README.en.md', 'LICENSE', 'cordis.patch.yml', '.dsh-plugin', 'lib']) {
  const from = join(ROOT, entry)
  if (!existsSync(from)) { console.warn(`跳过（不存在）: ${entry}`); continue }
  cpSync(from, join(PKG, entry), { recursive: true })
}

// 2) 安装器
copyFileSync(join(ROOT, 'installer', 'install.mjs'), join(OUT, 'install.mjs'))
copyFileSync(join(ROOT, 'installer', 'install.cmd'), join(OUT, 'install.cmd'))

// 3) 一页说明
writeFileSync(join(OUT, 'README.txt'), `dsh-plugin-hub ${pkg.version} —— 免安装版（Windows）

怎么装
------
1. 双击「install.cmd」。
2. 它会自动找到 DSH 的安装位置（%USERPROFILE%\\.dsh）与其中的 profile，
   把插件放进去、并登记到 profile 清单。
   - 只有一个 profile 时直接装；有多个时会列出序号让你选，直接回车=全部。
3. 完全退出 DeepSeek Harness（连托盘图标一起退），再重新打开。
4. 侧栏「插件」页里会出现「插件商店」。

这个包不需要
------------
  - 不需要 git
  - 不需要 npm / pnpm
  - 不需要编译或下载源码
  因为插件本体已经在 package\\ 目录里，安装器只做「复制 + 登记」。

需要 Node.js 吗？
-----------------
优先用系统里的 node；没有的话，安装器会自动改用 DeepSeek Harness 自带的
Electron 运行时（ELECTRON_RUN_AS_NODE=1），所以通常不需要单独装 Node。

出问题怎么办
------------
  - 安装器会先把 profile 的 package.json 备份成 package.json.bak-install，
    想还原就把备份改名回去。
  - 提示「复制失败」通常是 Harness 还在运行，完全退出后重试。
  - 也可以改用命令行安装：
      npx dsh plugin --profile web add dsh-plugin-hub@latest

版本 ${pkg.version}
`)

// 4) 压缩
const zip = `${OUT}.zip`
rmSync(zip, { force: true })
const tar = 'C:/Windows/System32/tar.exe'
try {
  execFileSync(tar, ['-a', '-c', '-f', zip, '-C', join(ROOT, 'dist'), `dsh-plugin-hub-${pkg.version}-win`], { stdio: 'pipe' })
  console.log(`✅ ${zip}`)
} catch (e) {
  console.warn(`压缩失败（目录已就绪，可手动压缩）: ${e.message}`)
}

console.log(`目录: ${OUT}`)
console.log(`包体: ${pkg.version}`)
