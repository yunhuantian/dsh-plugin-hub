# dsh-plugin-hub — DSH 插件商店

> DeepSeek Harness（DSH）Web 界面里的图形化插件商店：发现、搜索、一键安装 GitHub 上的
> `dsh-plugin`，并自带 **21 个随包发布的内部插件**（基础内核 / 安全与质量 / 发布流水线 /
> 洞察与内容 / 运维）。一个包、一次安装，全部到手；每个内部插件都能单独开关、声明依赖。
> 另附**离线预置目录**：装好即有 16 个实用插件可浏览、可安装，不必等镜像同步跑完。

适配 **DSH `0.1.5-rc.1`**（cordis 4.0.2）· MIT

---

## 预览

**商店主界面**：12 类分类筛选、卡片式列表、信任徽章、下载来源标注、一键安装
![商店主界面](./docs/screenshots/01-discover.jpg)

**健康度排行榜**：Top 20 健康指数随镜像同步更新，前三名金/银/铜
![健康度排行榜](./docs/screenshots/02-health-leaderboard.jpg)

**详情页健康度 + 动态趋势图**：评分构成条 + 版本发布线 + npm 每日真实下载量折线
![详情页健康度与趋势图](./docs/screenshots/03-detail-health-trend.jpg)

**GitHub 讨论区**：只读展示该插件仓库的 issue 讨论，一键跳转参与
![GitHub 讨论区](./docs/screenshots/04-github-discussions.jpg)

---

## 一个包，21 个内部插件

0.2 起 hub 的组织方式与 DSH 本体一致 —— `@deepseek-ai/dsh` 是一个包，内部装着 60+ 个
`dsh-*` 条目；hub 同样**一次发布、一次安装**，内部由 **21 个可单独开关**的插件组成，
每个都在 DSH 的「设置 → 插件」清单页里各占一行（共 22 行：本体 + 21）。

### 基础内核 Foundation

| 条目 | 名称 | 提供 | 默认 |
|---|---|---|---|
| `dsh-plugin-hub` | 插件商店（核心） | Remote `pluginStore` | 开 |
| `hub-ext-store-db` | 商店数据库 / Store Database | `pluginStoreDb` | 开 |
| `hub-ext-github` | GitHub 通道 / GitHub Channel | `pluginGithub` | 开 |
| `hub-ext-npm-probe` | npm 可用性探测 / npm Probe | `pluginNpmProbe` | 开 |
| `hub-ext-seed-catalog` | 预置插件目录 / Seed Catalog | `pluginSeedCatalog` | 开 |
| `hub-ext-registry` | 索引同步 / Registry Sync | `pluginRegistry` | 开 |
| `hub-ext-installer` | 安装引擎 / Install Engine | `pluginInstaller` | 开 |

### 安全与质量 Safety & Quality

| 条目 | 名称 | 提供 | 默认 |
|---|---|---|---|
| `hub-ext-security` | 安全扫描 / Security Scan | `pluginSecurity` | 开 |
| `hub-ext-conflict` | 安装冲突检测 / Conflict Detection | `pluginConflict` | 开 |
| `hub-ext-quality` | 质量门禁 / Quality Gate | `pluginQuality` | 开 |
| `hub-ext-trust` | 信任徽章同步 / Trust Badge Sync | `pluginTrust` | 开 |

### 发布流水线 Publishing

| 条目 | 名称 | 提供 | 默认 |
|---|---|---|---|
| `hub-ext-publish` | 一键发布 / One-click Publish | `pluginPublish` | 开 |
| `hub-ext-version-guard` | 版本一致性守卫 / Version Guard | `pluginVersionGuard` | 开 |
| `hub-ext-changelog` | 更新日志生成 / Changelog Drafter | `pluginChangelog` | 关 |

### 洞察与内容 Insight & Content

| 条目 | 名称 | 提供 | 默认 |
|---|---|---|---|
| `hub-ext-usage` | 用量与费用 / Usage & Cost | `usagePricing` | 开 |
| `hub-ext-health` | 插件健康度 / Plugin Health | `pluginHealth` | 开 |
| `hub-ext-update-check` | 版本更新检测 / Update Check | `pluginUpdateCheck` | 开 |
| `hub-ext-dependency-graph` | 依赖影响图谱 / Dependency Graph | `pluginDepGraph` | 开 |
| `hub-ext-baike` | 插件百科 / Plugin Wiki | `pluginWiki` | 关 |
| `hub-ext-skill-store` | 技能商店 / Skill Store | `skillStore` | 关 |

### 运维 Operations

| 条目 | 名称 | 提供 | 默认 |
|---|---|---|---|
| `hub-ext-backup` | 备份与回滚 / Backup & Rollback | `pluginBackup` | 开 |
| `hub-ext-diagnostics` | 诊断报告导出 / Diagnostics Export | `pluginDiagnostics` | 关 |

### 依赖是声明式的，不是硬注入

内部插件之间**声明**依赖（如 `registry → store-db + github`、`publish → security`），
运行时由统一的 `activate()` 判定：

```
用户关掉「商店数据库」
  └─→ registry / installer / npm-probe / seed-catalog / trust / update-check / dependency-graph / baike
       全部上报「依赖阻塞」并**主动让位**（不提供服务、不注册 UI、不报错）
  └─→ 把「商店数据库」再打开，整条链自动恢复
```

这样做而不是用 cordis 的 `inject` 硬依赖，是因为硬依赖会造成
**"提供者被用户停用 → 消费者永久 pending"** 的死锁。声明式依赖下，任何一方被关掉都是
干净的「阻塞」状态，随时可逆。

**为什么把实用插件直接装进包里**：插件越多，逐个下载、逐个安装的链路越长（网络、限频、
版本错配、装到一半失败）。内置之后，装一次 hub 就有 21 个能力可用，
仓库里也不必再维护 21 个独立包与 21 套发布流程。

### 离线预置目录（避免"空白商店"）

商店内容正常来自 GitHub 镜像同步（几百个仓库、几百次请求、几分钟）。新装用户在同步
跑完之前看到的是空白。`hub-ext-seed-catalog` 把 **16 个公认实用的插件**写进包里，
装好立刻可见、可看详情、可安装：

| 方向 | 预置插件 |
|---|---|
| 视觉 | `@liustack/modlens`、`@anionex/dsh-vision-toolkit` |
| 界面 | `dsh-better-sidebar`、`@deepseek-harness-tui/dsh-tui`、`@deepseek-ai/dsh-client-ui-aqua`、`dsh-reasoning-effort` |
| 记忆 | `@mnemon-dev/dsh-mnemon` |
| 输入与开发 | `dsh-at-file`、`dsh-open-in-vscode`、`@omdsh-dev/dsh-genui` |
| 成本与上下文 | `dsh-cost-meter`、`dsh-context` |
| 效率 | `dsh-notification`、`dsh-skill-viewer` |
| 商店同类 | `dshmarket`、`dsh-web-plugin-manager` |

写入规则是**只插不覆盖**：某个包一旦被真实同步写入过，预置就绝不覆盖它
（真数据有 README、版本历史、issues）。目录版本用日期，升级后下次启动自动刷新自己的行。
列表里这类条目标「预置」徽章。

### 两级开关

1. **安装级**：hub 的 `cordis.patch.yml` 每行可写 `disabled: true`（部署策略）；
2. **日常级**：设置页 →「插件商店」→「内建插件」，按分组管理，写本机
   `storages/plugin-store/plugins.json`，**重启 dsh 后生效**。

> ⚠️ 默认关闭的四个插件（changelog / baike / skill-store / diagnostics）在 patch 里
> **不写** `disabled: true`：写了 loader 就不会加载它们，模块也就没机会读设置页的开关，
> 表现为"打开了没反应"。默认关闭一律由模块自己让位实现，开关才可逆。

关掉一个插件＝它启动时让位（不提供服务、不注册界面），商店核心功能完全不受影响。

---

## 内建插件做什么

### 用量与费用 —— 价格表**带日期**，可回溯历史价

会话里每个请求的 token、缓存命中率时间图表（滚轮缩放 / 拖动平移 / 双击复位），并按
**版本化价格表**同时算两个数：

- **当时价**：请求发生时刻生效的价格表 → 等于当时实际计费
- **现价**：最新价格表 → 同样的用量放在今天要多少钱
- 两者不同就显示差额（`+$0.0123 比当时贵` / `−… 比当时便宜`）

价格表按生效日期分版本，调价只**追加**新版本，历史不可变：

| 版本 | 生效（UTC） | 关键变化 |
|---|---|---|
| `2026-08-15` | 2026-08-15 00:00 | 基线：DeepSeek V4 Flash（0731）$0.22 / 缓存命中 $0.007 / 输出 $0.66 |
| `2026-09-10` | 2026-09-10 04:00 | **V4.1 Flash 上线**：$0.15 / 缓存命中 $0.003 / 输出 $0.60，高峰单价 ×2 |
| `2026-09-14` | 2026-09-14 04:00 | **V4 Pro 并入 Flash 计费**（请求自动路由，按 Flash 单价计） |

高峰规则：工作日 **UTC 01:00–04:00 与 06:00–10:00** 单价翻倍，其余为空闲价。
OpenAI / Anthropic / Google / Qwen / 智谱 / Moonshot 的价格一并内置。

> 计费口径与 DSH 的 token-meter 对齐：`usage.inputTokens` 就是**未缓存输入桶**，
> 计费输入 = 未缓存 + 缓存读取 + 缓存写入。未收录的模型不估算，显式提示而不是假装。

### 插件健康度 / 版本更新检测 / 依赖影响图谱
- **健康度**：按活跃度、发布节奏、社区反馈（stars / downloads / open issues）打分
  （0–100）与等级（healthy / attention / stale），给出信任等级与排行。
- **更新检测**：本机已装版本 vs 上游最新（npm registry 优先，回落 GitHub releases，
  缓存 6h），列出可升级清单。
- **依赖影响图谱**：升级 / 卸载前先看清会牵连谁（直接依赖 + 反向依赖）。

### 安全与质量：装之前先体检
- **安全扫描**：危险脚本、敏感文件读取、动态执行、可疑外联；`critical` 直接拦截安装/发布。
- **冲突检测**：UI 槽位占用（`single` 槽独占）、包名撞车、依赖版本冲突。
- **质量门禁**：发布前 8 项检查（声明完整、构建产物、README、许可、版本规范…）。
- **信任徽章同步**：与 `dsh-hub-index` 信任体系对齐并落库。

### 发布流水线：一个动作从本地到线上
- **一键发布**：GitHub 建仓/推送 + npm 发布双通道，带分段进度；发布前自动过安全扫描。
- **版本一致性守卫**：对齐 `package.json` / README 更新日志 / profile 安装来源 /
  包内子插件 `exports`。专治"包升了文档没升""加了子插件行忘了加 exports"。
- **更新日志生成**（默认关）：从 git 历史按 Conventional Commits 归并成 README 风格草稿。

### 运维：翻车了能回来
- **备份与回滚**：`VACUUM INTO` 导出一致性数据库副本 + 插件开关 + profile 清单，
  只留最近 10 个；回滚前先把当前状态另存，因此回滚本身也可回滚。
- **诊断报告导出**（默认关）：环境 + 21 个内建插件状态 + profile 依赖 + 索引统计 +
  最近审计，打包成 Markdown，不含任何令牌明文。

### 插件百科 / 技能商店（默认关）
- **百科**：把插件元数据、README 要点、依赖与相关插件汇总成可检索条目。
- **技能商店**：跨生态收集 `SKILL.md` 技能包，检索并一键安装到本地技能目录。

---

## 商店核心功能

- **发现**：12 分类、7 种排序（随机 / 健康度 / stars / 评分 / 下载 / 更新 / 名称）、搜索、已安装过滤
- **安装**：npm registry 直装或 GitHub 克隆；写 profile 的 `cordis.patch.yml`，由 cordis 实时生效
- **已安装**：`系统 / 下载 / 自创作` 三类之下再按**归属分组**展示 —— 商店自己的插件单列
  「插件商店」组，与系统组件彻底分开；逐条启停（受保护的系统条目会被拦截）、按分类批量开关、卸载
- **质量门**：依赖完整性 + 启动目录需求检查，装前拦截
- **安全扫描**：发布前扫描高风险模式（自动驳回）
- **发布**：填 Markdown 图文介绍 → GitHub + npm 双通道一键发布（自备 token）
- **审计**：安装 / 卸载 / 启停 / 评分 / 发布全量落库，带操作者身份，可追溯*
- **镜像同步**：把 GitHub 上 `topic:dsh-plugin` 仓库元数据缓存进本地 SQLite（并发池 + 会话缓存），
  列表与搜索不再受网络与限频影响
- **依赖拓扑**：插件的依赖与被依赖关系图
- **生态接入**：跑分机（dsh-bench）与 IM 连接器（dsh-connector）的本地状态读写

---

## 安装

```bash
# npm 安装（推荐）
dsh plugin --profile web add dsh-plugin-hub

# 本地构建后安装（开发调试）
npm install
npm run build          # tsc 编译 host + esbuild 打包 client
dsh plugin --profile web add <本包目录>
```

装好后：侧边栏底部出现「插件商店」；设置页多出「插件商店」一节
（GitHub Token、镜像同步计划、内置扩展开关）。首次使用建议先在设置页点「立即同步」。

---

## 架构

```
dsh-plugin-hub（一个 npm 包）
├─ cordis.patch.yml          一次插入 22 行：本体 + 21 个内建插件
├─ lib/host/                 核心 host 端（PluginStoreService，Typert Remote）
├─ lib/extensions/*.js       21 个内建插件的 host 半边（各为一个独立 cordis 条目）
├─ lib/contracts/*.js        共享契约（Remote wire schema + 版本化价格表）
└─ lib/client.js             唯一一份 client bundle（核心 UI + 内建插件 UI）
```

- **Host**：`PluginStoreService` 以 Typert Remote（`pluginStore`）暴露 20+ 个远程方法；
  `node:sqlite` 持久化；`installer.ts` 走 pnpm 安装并改写 profile 补丁。
- **依赖与开关的耦合面**：只有两个状态文件 ——
  `storages/plugin-store/plugins.json`（开关）与 `plugins-status.json`（运行状态）。
  插件之间不通过 cordis 服务互依，依赖是名册里的声明 + 运行时判定，
  任一方停用都不会把对方拖死（详见上文「依赖是声明式的」）。
- **Client**：一个包只能有一份 client 产物（DSH 的 `dsh.client` 契约），
  所以各内建插件的 UI 都在这份 bundle 里，按开关决定是否注册。
- **契约单一来源**：`contracts/pricing.ts` 同时被 host 编译与 client 内联，
  价格表因此不可能两边不一致。

---

## 开发

```bash
npm run build:host    # tsc -p tsconfig.host.json → lib/host/**, lib/extensions/**, lib/contracts/**
npm run build:client  # node scripts/build-client.mjs → lib/client.js
npm run build         # 两者
npm run typecheck     # host + client 双侧类型检查
npm run check:contract # 契约往返自检：host 返回体 ⨯ zod 契约（防「字段被剥离 → UI 空白」）
```

### 加一个内建插件

1. `src/host/plugins-state.ts` 的 `HUB_PLUGINS` 里加一条描述符
   （id / 分组 / `requires` / 行 id / 服务名 / 默认开关）；
2. 该插件要用到的新逻辑放 `src/host/<name>.ts`（纯函数/类，可被 host 与插件共用）；
3. `src/extensions/<id>.ts` 写 host 半边，形状固定：

   ```ts
   export const name = 'dsh-plugin-hub/extensions/<id>';
   export const provide = ['<service>'];
   export const inject: string[] = [];
   export function apply(ctx: any): void {
     activate(ctx, '<id>', () => {
       ctx.provide('<service>', () => ({ /* ... */ }));
     });
   }
   ```

   `activate` 负责读开关、递归判定依赖、上报 `disabled`/`blocked`/`active`；
4. hub 的 `cordis.patch.yml` 加一行 `- id: hub-ext-<id>` / `name: dsh-plugin-hub/extensions/<id>`；
5. `package.json` 的 `exports` 加 `./extensions/<id>`（漏了会装上去 import 失败；
   `version-guard` 内建插件专门查这个）。

---

## 目录

```
src/
  contracts/
    remote.ts             # zod v4 wire 契约（TYPERT_REMOTE / TYPERT），20+ 个 Remote
    pricing.ts            # 版本化价格表（带生效日期）+ 费用计算（host/client 共用）
  host/
    index.ts              # PluginStoreService（Remote + 定时同步 + 内建插件开关）
    plugins-state.ts      # 21 个内建插件的名册 + 依赖判定 + 开关/状态文件
    store-db.ts           # SQLite（镜像缓存 / 评分 / 审计 / 依赖边）
    seed-catalog.ts       # 离线预置插件目录（16 个，只插不覆盖）
    github.ts             # GitHub 搜索 + 镜像同步（并发池）
    installer.ts          # 安装 / 卸载 + profile 补丁
    quality-gate.ts       # 质量门
    conflict-check.ts     # 安装冲突检查
    security-scan.ts      # 安全扫描
    publish.ts            # GitHub + npm 双通道发布
    version-guard.ts      # 版本一致性检查（新）
    changelog.ts          # 从 git 历史起草更新日志（新）
    update-check.ts       # 已装版本 vs 上游最新（新）
    backup.ts             # 快照 / 回滚（新，VACUUM INTO）
    diagnostics.ts        # 诊断报告生成（新）
    health.ts  trust-sync.ts  catalog-sync.ts  skill-sync.ts  npm-probe.ts
  extensions/             # 21 个内建插件的 host 半边（各为一个独立 cordis 条目）
    _runtime.ts           # activate()：开关 + 依赖判定 + 状态上报的唯一实现
    store-db.ts  github.ts  npm-probe.ts  seed-catalog.ts  registry.ts  installer.ts
    security.ts  conflict.ts  quality.ts  trust.ts
    publish.ts  version-guard.ts  changelog.ts
    usage.ts  health.ts  update-check.ts  dependency-graph.ts  baike.ts  skill-store.ts
    backup.ts  diagnostics.ts
  client/
    index.tsx             # 核心 UI 注册（入口按钮 / 设置页 / 插件开关 / 内建插件 UI 挂载）
    views.tsx             # 发现 / 详情 / 已安装 / 发布 / 审计 / 健康度 / 百科 / 技能 / 脚手架
    settings-section.tsx  # 原生设置页（Token / 同步 / 按分组的内建插件管理）
    extensions/usage/     # 用量 tab 的 client 半边（图表 + 价格表对照）
    store.css             # 样式（--dsw-* 主题变量）
```

---

## 更新日志

### 0.2.0（2026-09-11）

**架构：一个包、21 个可开关的内部插件（与 DSH 本体同构）**

- 4 个曾独立发包的扩展（`dsh-usage` / `dsh-health` / `dsh-baike` / `dsh-skill-store`）
  并入 hub，改为包内独立 cordis 条目（`dsh-plugin-hub/extensions/*`）；
- 名册从 4 条扩到 **21 条**，分 5 组（基础内核 / 安全与质量 / 发布流水线 / 洞察与内容 /
  运维）。新增：`store-db`、`github`、`npm-probe`、`seed-catalog`、`registry`、`installer`、
  `security`、`conflict`、`quality`、`trust`、`publish`、`version-guard`、`changelog`、
  `update-check`、`dependency-graph`、`backup`、`diagnostics`；
- 内建插件**声明依赖**（`registry → store-db + github`、`publish → security` 等），
  运行时由 `activate()` 递归判定；依赖没开就上报 `blocked` 并主动让位，随时可逆
  —— 不用 cordis 硬 inject，避免"提供者停用 → 消费者永久 pending"死锁；
- patch 一次插入 22 行（本体 + 21），在「设置 → 插件」清单页每行可见、可单独停用；
- 设置页新增按分组的插件管理区：状态（运行中 / 已关闭 / 依赖阻塞 / 加载失败）、
  依赖与被依赖、开关计数；
- ⚠️ 默认关闭的四个插件在 patch 里**不写** `disabled: true`（写了设置页开关就失效）。

**离线预置目录（新增能力）**

- `seed-catalog` 内建插件随包发布 16 个实用插件清单，装好即可浏览/安装，
  不必等镜像同步（492 个仓库、几分钟）跑完；
- 写入**只插不覆盖**：真实同步数据永远优先；目录版本按日期，升级后自动刷新自己的行；
  列表里标「预置」徽章。

**新增能力（对应上面的新内建插件）**

- `version-guard`：对齐 `package.json` / README 更新日志 / profile 来源 / 子插件 `exports`；
- `changelog`：从 git 历史按 Conventional Commits 起草 README 风格更新日志；
- `update-check`：已装版本 vs 上游最新（npm 优先、回落 GitHub releases，缓存 6h）；
- `backup`：`VACUUM INTO` 一致性快照 + 回滚（回滚前先备份当前状态）；
- `diagnostics`：一键导出环境/清单/状态/审计为 Markdown（不含令牌明文）。

**用量与费用：价格表带日期**

- 价格表版本化（`effectiveFrom` / `effectiveTo`），新增 `2026-09-10`（V4.1 Flash）与
  `2026-09-14`（V4 Pro 并入 Flash 计费）两版；
- 每个请求同时给出「当时价」与「现价」及差额，回答"调价前后差多少"；
- 支持高峰/空闲时段倍率（工作日 UTC 01:00–04:00 / 06:00–10:00 ×2）；
- 新增 `pricingTable` Remote：其它插件可复用同一份价格表，不必各自硬编码单价。

**适配 DSH 0.1.5-rc.1**

- client 注入清单去掉新版已移除的 `dsh-client-runtime`，补上 `dsh-client-ui-conversation` /
  `dsh-api-remotes`；
- client 外部化清单以新版种子表为准（react / cordis / slots / primitives / dockkit）；
- 用量视图数据改从 chat target 的 `legacy.nodes` 取（新版把 `ConversationSnapshot`
  拆成了 `{views, activeTargets}`）。

**已安装视图：hub 的东西归 hub，不再冒充系统组件**

- 新增「插件商店」分组：商店本体 + 包内 21 个子插件（`dsh-plugin-hub/extensions/*`）
  统一归到这里，并跟随商店本体的安装方式归类（本地 `file:` ⇒ 自创作，npm ⇒ 下载）；
- 归因：这些子插件在 Loader 里是独立条目、又不在 profile 的依赖表里，旧逻辑把它们
  当成了 DSH 基建 —— 实测 **20/21 个被扫进「其他系统组件」**，商店自己的插件混在系统堆里；
- 「其他」从此只属于系统轨（标签改为「其他系统组件」）；非系统插件的兜底分组改为
  「第三方插件」——**用户装的东西不会再被标成系统组件**；
- 包内子插件不提供单独的「卸载」入口（它们随商店包一起装卸），但**可以单独开关**，
  关闭等同于设置页里关掉该内建插件；
- 子插件行直接显示真实运行状态（运行中 / 已关闭），不再是一列空状态。

**修复**

- host 服务重复声明 `ctx` 与基类冲突的编译错误（改名 `appCtx`）；
- 节点费用公式把已计入的缓存桶再减一次的问题（与 token-meter 语义对齐）；
- 状态文件从 `extensions.json` / `extensions-status.json` 改名为
  `plugins.json` / `plugins-status.json`（旧文件仍兼容读取，不必重配）。

### 0.1.8（2026-08-19）
client bundle 构建产物修复（构建脚本在沙箱下删除被拦截，导致产物未更新）。

### 0.1.7（2026-08-17）
镜像同步并发池（认证 8 / 匿名 4）+ npm 下载量会话缓存，同步从 20 分钟降到分钟级。

### 0.1.6 / 0.1.5 / 0.1.3 / 0.1.1 / 0.1.0
分类体系、健康度、信任徽章、百科、技能商店、发布流程等逐版引入（详见 git 历史）。

---

## 许可

MIT
