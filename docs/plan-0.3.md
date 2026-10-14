# dsh-plugin-hub 下一轮规划

> 2026-09-23。记录本轮清理成果 + 基于生态调研的下一轮功能范围。

## 一、本轮已完成（0.2.x 收尾）

### 1.1 修掉 `exports["./client"].types` 悬空引用

**根因**：`package.json` 声明了 `exports["./client"].types = ./lib/types/client/index.d.ts`，
但构建只有 `tsc -p tsconfig.host.json`（产出 `lib/host`、`lib/contracts`、`lib/extensions`）
和 esbuild 打包 client —— **从来没有生成 `lib/types`**。
官方包（如 `@deepseek-ai/dsh-client-ui-settings`）的 `exports` 是同一形状，
但它们的 `lib/types/**` 是 tsc 生成的。hub 抄了形状，漏了那一步。

**修法**（对齐官方约定）：
- 新增 `tsconfig.client-types.json`：`emitDeclarationOnly` + `outDir: lib/types` + `rootDir: src`
- 新增 `build:types` 脚本，挂进 `build`：`build:host && build:types && build:client`
- 排除 `src/client/_archived-*`（死代码不进发布产物）
- `files` 里的 `lib/**/*.d.ts` 天然覆盖 `lib/types`

**验证**：exports 目标 54 项 → 缺失 0；消费者 tsc 实测解析到
`lib/types/client/index.d.ts`；配置树 45 行 hub 条目不变。

> 教训：**声明了 types 就必须真的产出它**。后续给任何包加 `exports` 条目时，
> 都要跑一遍「逐条目标存在性」校验（本轮已实现该检查，可固化为 `check:exports`）。

### 1.2 移除 dsh-connector 集成

hub 原本硬编码了另一个插件的领域知识：存储路径 `storages/dsh-connector/config.json`、
安装路径探测、飞书字段结构、enabled/port 语义。**插件商店不该托管别的插件的设置界面。**

改动（全部已构建 + 已静态验证）：

| 位置 | 删除内容 |
|---|---|
| `src/contracts/remote.ts` | `connectorStatus` / `connectorConfigSet` 两个 descriptor |
| `src/client/api.ts` | 对应两个接口方法与实现 |
| `src/host/index.ts` | 对应两个 `@Remote` 实现 |
| `src/client/views.tsx` | `ConnectorSettings` 组件 + 挂载点 |
| `src/client/index.tsx` | zh/en 两组 connector 字典（共 14 键） |
| `README.md` / `README.en.md` | 生态接入描述 |

保留 `dsh-bench`（跑分是 hub 自己的功能，读报告 + 触发跑分，不是代管别家设置）。

**验证**：`@Remote` 清单从 39 → 37，`connectorStatus`/`connectorConfigSet` 归零，
`bench`/`benchRun` 保留；契约自检 19/19 通过；client bundle 939,646 → 931,423 B。

## 二、生态调研结论（指导下一轮）

调研 AI agent 插件市场/技能市场的通行做法，三个反复被强调、而 hub 尚未做的点：

### 2.1 信任要「按版本绑定证据」，不是徽章

> 「评分反映的是人气，不是安全。安全需要包体检查、权限审查、密钥与隐私扫描、脚本检查、
> 受控执行、以及**版本特定的证据**。」
> 「上一版的结论不应自动流向新版。」
> 「**目录大小是虚荣指标** —— 一半目录从没通过干净安装时。」

hub 已有：安全扫描、质量门、健康度、审计、依赖拓扑。
**缺的是**：把证据**钉到具体版本/摘要**上，并且区分「已测」与「自称」。
落地建议：详情页加「证据面板」，字段：

```
Release    版本 + 发布时间 + 不可变摘要（tarball shasum）
Contents   文件清单 + 主要能力
Requires   框架/运行时/命令/服务/账号
Permissions 文件/网络/工具/外部服务访问
Safety     密钥/隐私/可疑指令/许可证/脚本检查结果
Tests      任务集、模型、runner、次数、结果（未测就写「未评估」）
Compat     通过安装与执行的运行环境
Failure    缺依赖/超时/畸形输入时的预期行为
Maintain   最近审查日、更新策略、支持版本
Recovery   卸载、回滚、求助路径
```

### 2.2 权限要「按能力授权」，不是环境权限

> 「npm 是『发布即通过浅扫描，买者自负』。对无人逐步复核的 Agent，
> 你希望清单本身携带可验证的来源 —— 这个能力被允许触碰什么，由发布者签名。」
> 「插件默认空权限，需要哪项由用户在安装时明确授予，并尽量限定到具体路径或域名。」

hub 现在的「质量门」查依赖完整性与启动目录需求。
**缺的是**：把插件声明的能力（网络域名、文件路径、命令执行、凭据访问）解析出来，
在安装前展示，并允许限定范围。

### 2.3 供应链与隔离

通行做法：签名（Sigstore/cosign）、SBOM（SPDX/CycloneDX）、SLSA 等级、
安装前静态+动态分析、运行时沙箱（Wasm/microVM/OS sandbox）。

对 hub 这样面向个人开发者的商店，**全套照搬不现实**。务实取舍：
- 先做**摘要锁定 + 证据按版本**（低成本、高价值）
- 再做**能力声明解析**（中成本、高价值）
- 签名/SBOM 属于长期项，可作为「发布者可选的加强项」

## 三、下一轮功能范围（建议）

按「价值/成本」排序，建议 0.3.0 收敛为前四项：

| # | 功能 | 说明 | 优先级 |
|---|---|---|---|
| 1 | **一键启动器**（本轮新提需求，见第四节） | 桌面快捷方式 + 版本检查 + 启动 + 逛店装插件 | P0 |
| 2 | **版本证据面板** | 把已有扫描/健康/质量结果**钉到版本摘要**，区分「已测/未测」 | P0 |
| 3 | **能力声明解析** | 从入口代码/清单解析网络、文件、命令、凭据访问，装前展示 | P1 |
| 4 | **`check:exports` 固化** | 把本轮写的「exports 逐条存在性」检查变成常驻脚本，防再次悬空 | P1 |
| 5 | 安装回滚 | 装失败/装坏了能一键回滚到上一版本 | P2 |
| 6 | 发布者可选签名 | 支持 cosign 签名，展示「已签名/未签名」 | P3 |

**明确不做**：目录数量竞赛；把评分当安全结论。

## 四、一键启动器（新需求，P0）

### 4.1 先澄清一个结构问题 ⚠️

「启动器」和「hub 内置插件」有一个**先有鸡还是先有蛋**的矛盾：

- 如果启动器是 **hub 的插件**，那它只能在你**已经启动了 dsh** 之后才可用
- 但启动器的用途恰恰是「帮你启动 dsh」

**不矛盾的用法**：安装 hub 这件事本身要跑一次 dsh；此后启动器的三个能力都成立 ——
① 创建桌面快捷方式（一次性设置）② 检查 DSH 更新（dsh 已在跑）③ 逛店装插件（dsh 已在跑）。
快捷方式生成后，**日常启动不经过 dsh**（直接跑目标命令），闭环成立。

### 4.2 建议形态

启动器作为 hub 的**内置扩展**（`extensions/launcher.*`，与 usage/health 同级，可开关），
另**生成一份独立的小启动脚本**落到桌面/仓库目录：

```
launcher/
  dsh-launch.cmd        ← 生成物：纯英文、%~dp0 相对路径、交互式菜单
  桌面\DeepSeek Harness.lnk  ← 指向上面的 cmd
```

**为什么生成 .cmd 而不是纯 .lnk 直指 dsh**：cmd 里可以插入版本检查与错误提示，
`.lnk` 只能指一个固定目标；两者组合既有图标又可控逻辑。

> 遵循既有约定：bat/cmd **纯英文**（避免 cmd GBK 乱码）、`%~dp0` 相对路径、
> 交互式提示（启动方式 / 端口 / 是否先更新）。

### 4.3 四个能力

| 能力 | 实现要点 |
|---|---|
| 创建桌面快捷方式 | host 侧写 `.cmd` → 用 `WScript.Shell` COM 建 `.lnk`（`powershell -Command "$s=(New-Object -ComObject WScript.Shell).CreateShortcut(...)"`）。需处理目标路径含空格、图标取自 dsh 或 hub |
| 检查 DSH 更新 | `npm view @deepseek-ai/dsh version` 对比当前 `dsh --version`（或 profile 里解析到的版本）。注意 npm 有 CDN 缓存延迟，展示「已发布版本 vs 本机版本」即可，不做强判断 |
| 一键启动 | `spawn` dsh web（沿用 hub 已有的 spawn 模式，参考 `benchRun`）；可选 `--port`；启动后把 URL 回显到界面 |
| 浏览并安装插件 | **不用重写** —— 复用商店已有的发现/安装视图，启动器面板里放一个「打开插件商店」入口即可，避免出现第二套安装逻辑 |

### 4.4 待确认的实现选择

1. **快捷方式指哪**：`dsh web`（每次走 npx，能自动拿最新版）还是固定到本机 dsh.cmd（启动快、不联网）
2. **更新检查时机**：只在打开面板时手动点，还是随 hub 的镜像同步计划一起跑
3. **要不要独立托盘程序**：能真正做到「dsh 没跑也能启动」，但引入新进程与打包成本

## 五、本轮遗留

- ⚠️ 沙箱环境的 safe-delete 批量守卫会拦住 dsh 启动时的锁文件清理，
  导致**活体验证（浏览器里看卡片渲染）未完成**。静态验证已全部通过：
  类型检查、构建、exports 校验、bundle 形态与 require 目标、配置树组合。
- dsh-connector 的客户端卡片**尚未在真实浏览器里渲染验证过**，这是首要待测项。
