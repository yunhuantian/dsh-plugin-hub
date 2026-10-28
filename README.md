# dsh-plugin-hub — DSH 插件商店

> DeepSeek Harness 里的图形化插件商店，嵌在**官方「插件」页**里：自动识别、认证列表、
> 整合包、一键安装、健康度、发布与审计。一个 npm 包带 **20 个可单独开关的内部插件**，
> 另随包预置 16 个离线条目，装好即有内容。
>
> 商店自己的认证索引同时以**官方 format 1** 发布（当前 121 条），可以直接配进
> 官方「插件 → 发现」页。

支持 **DSH `0.1.x` 与 `0.2.x`** 两条版本线 · MIT · 当前 **0.2.7**（2026-10-28）

---

## 当前状态

### 一、已停用 / 默认关闭

| 功能 | 开关 | 现在的状态 | 想用时怎么恢复 |
|---|---|---|---|
| 插件百科 | `baike` | **默认关**，并且入口、详情 tab、数据接口三处一起关 | 「内置扩展」里打开百科；外部目录还需 `meta external_sync=1` |
| 外部目录同步 | 元数据 `external_sync` | **默认关**（Blue-Whale 等外部仓库） | 写 `external_sync=1` 后再同步 |
| 信任徽章同步 | — | **已移除**（0.2.6 起 `trust` 子插件并入质量门禁） | 无需恢复 |
| 更新日志生成 | `changelog` | 默认关 | 「内置扩展」里打开 |
| 技能商店 | `skill-store` | 默认关 | 「内置扩展」里打开 |
| 诊断报告导出 | `diagnostics` | 默认关 | 「内置扩展」里打开 |

两件事值得单独说明：

- **百科是「真关」了，不是只关了个壳。** 0.2.6 只把 `defaultEnabled` 设成 `false`，
  但顶部导航是硬编码数组、host 的 `wikiHub` / `wiki` 直接读库 —— 结果插件看着关了，
  百科条目照样出得来。0.2.7 把门控补到三处：顶部标签不显示、详情页不显示百科 tab、
  接口直接返回空 / 明确报错。数据仍在库里，重新打开开关即可恢复，不删库。
- **外部目录为什么关。** 百科原本依赖 Blue-Whale-Harness 的外部目录，数据质量不可控；
  目录内容随时会被上游改掉，而这又直接影响商店里看到的东西。现在整条链路由
  `external_sync` 元数据门控，默认不碰外部文件。

### 二、这轮改进了什么

| 改进 | 之前 | 现在 |
|---|---|---|
| 商店外壳 | 左侧 176px 竖排导航，内容区只剩 856px | 顶部横向标签，12 个视图，内容区回到 1020px |
| 功能门控 | 插件开关只管「服务起不起」，入口照旧在 | 导航 / 详情 tab / 接口三处跟开关走 |
| 数据存放 | 插件表与整合包写在 hub 包里，改数据要发版本 | 数据搬进独立仓库，改数据只推数据 |
| 认证 | 只认「这个包」 | **按版本认证**：认证版本 ≠ 当前版本就是 `legacy` |
| 官方发现页 | 完全没接入 | 根目录 `market-index.json`，121 条认证条目 |
| 整合包 | 只能看成员列表 | 可点进详情、一键安装、带简介与安装顺序 |

### 三、这轮更新了什么

0.2.7 的主要变化：顶部标签外壳、百科门控补全、官方发现页接入、认证索引 76 → 121。
完整内容见文末[版本历史](#版本历史)。

---

## 怎么用

装好后**不新增自己的入口**，而是作为一项出现在 DSH 自带的「插件」页里：

```
侧栏「插件」 → 插件商店
```

进去是商店本体，12 个视图全在顶部一排标签上：

```
自动识别 / 认证列表 / 整合包 / 百科* / Skill 商店* / 已安装 /
内置扩展 / 健康度* / 发布 / 开发脚手架 / 审计日志 / 设置
```

带 `*` 的由内建插件提供，插件关掉后标签直接不出现（不是灰掉，是不占位）。

> 0.1.x 上落点不同：那时是侧栏底部一个独立按钮 + 全屏弹层，外加一个独立设置页。
> 0.2.3 起改为嵌进官方「插件」页，看起来就是这个页面本就有的功能。

---

## 一个包，20 个内部插件

0.2 起 hub 的组织方式与 DSH 本体一致 —— `@deepseek-ai/dsh` 是一个包，内部装着 60+ 个
`dsh-*` 条目；hub 同样**一次发布、一次安装**，内部由 **20 个可单独开关**的插件组成，
每个都在 DSH 的「设置 → 插件」清单页里各占一行（共 21 行：本体 + 20）。

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

> `hub-ext-trust`（信任徽章同步）已在 0.2.5 并入质量门禁，名册从 21 条收敛到 20 条。

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
| `hub-ext-baike` | 插件百科 / Plugin Wiki | `pluginWiki` | **关** |
| `hub-ext-skill-store` | 技能商店 / Skill Store | `skillStore` | **关** |

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
  └─→ registry / installer / npm-probe / seed-catalog / update-check / dependency-graph / baike
       全部上报「依赖阻塞」并**主动让位**（不提供服务、不注册 UI、不报错）
  └─→ 把「商店数据库」再打开，整条链自动恢复
```

这样做而不是用 cordis 的 `inject` 硬依赖，是因为硬依赖会造成
**"提供者被用户停用 → 消费者永久 pending"** 的死锁。声明式依赖下，任何一方被关掉都是
干净的「阻塞」状态，随时可逆。

**为什么把实用插件直接装进包里**：插件越多，逐个下载、逐个安装的链路越长（网络、限频、
版本错配、装到一半失败）。内置之后，装一次 hub 就有 20 个能力可用，
仓库里也不必再维护 20 个独立包与 20 套发布流程。

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
2. **日常级**：侧栏「插件」→ 插件商店 →「内置扩展」，按分组管理，写本机
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

### 发布流水线：一个动作从本地到线上
- **一键发布**：GitHub 建仓/推送 + npm 发布双通道，带分段进度；发布前自动过安全扫描。
- **版本一致性守卫**：对齐 `package.json` / README 更新日志 / profile 安装来源 /
  包内子插件 `exports`。专治"包升了文档没升""加了子插件行忘了加 exports"。
- **更新日志生成**（默认关）：从 git 历史按 Conventional Commits 归并成 README 风格草稿。

### 运维：翻车了能回来
- **备份与回滚**：`VACUUM INTO` 导出一致性数据库副本 + 插件开关 + profile 清单，
  只留最近 10 个；回滚前先把当前状态另存，因此回滚本身也可回滚。
- **诊断报告导出**（默认关）：环境 + 20 个内建插件状态 + profile 依赖 + 索引统计 +
  最近审计，打包成 Markdown，不含任何令牌明文。

### 插件百科（默认关，当前停用）
把插件元数据、README 要点、依赖与相关插件汇总成可检索条目。0.2.6 起默认停用：
它依赖的外部目录仓库（Blue-Whale-Harness）数据质量不稳，先关掉，等改成自建目录再开。
0.2.7 补齐了门控 —— 关掉之后导航、详情 tab、`wikiHub` / `wiki` 接口全部让位。

### 技能商店（默认关）
跨生态收集 `SKILL.md` 技能包，检索并一键安装到本地技能目录。

---

## 商店核心功能

- **自动识别**：从 GitHub `topic:dsh-plugin` 自动同步来的条目，12 分类、7 种排序
  （随机 / 健康度 / stars / 评分 / 下载 / 更新 / 名称）、搜索、已安装过滤
- **认证列表**：只显示经人工核验、且认证版本与当前版本一致的条目（见下节）
- **整合包**：按场景组好的成套插件，可看简介、安装顺序、一键装
- **安装**：npm registry 直装或 GitHub 克隆；写 profile 的 `cordis.patch.yml`，由 cordis 实时生效
- **已安装**：`系统 / 下载 / 自创作` 三类之下再按**归属分组**展示 —— 商店自己的插件单列
  「插件商店」组，与系统组件彻底分开；逐条启停（受保护的系统条目会被拦截）、按分类批量开关、卸载
- **质量门**：依赖完整性 + 启动目录需求检查，装前拦截
- **安全扫描**：发布前扫描高风险模式（自动驳回）
- **发布**：填 Markdown 图文介绍 → GitHub + npm 双通道一键发布（自备 token）
- **审计**：安装 / 卸载 / 启停 / 评分 / 发布全量落库，带操作者身份，可追溯
- **镜像同步**：把 GitHub 上 `topic:dsh-plugin` 仓库元数据缓存进本地 SQLite（并发池 + 会话缓存），
  列表与搜索不再受网络与限频影响
- **依赖拓扑**：插件的依赖与被依赖关系图
- **生态接入**：跑分机（dsh-bench）的本地状态读写与一键触发跑分

---

## 认证列表与整合包

认证不是「这个包不错」，而是**某个具体版本的可用性结论**：

```
plugin_certs(package_name PK, version, publisher, certified_at)
状态 = cert.version === 当前版本 ? certified : legacy
```

升级一次就要重新核验一次，这样才不会出现「半年前认证过 0.3.0，仓库早改成 0.9.0 了，
页面上还挂着认证标」。认证写入是 `insert or replace`，同一插件反复认证只会覆盖那一行，
**不需要先删旧记录**；新增条目也一样 —— 幂等。

当前数据（`dsh-plugin-registry` 仓库）：

| 指标 | 数量 |
|---|---|
| 插件表条目 | 171 |
| 已认证 | 171（其中 121 条的认证版本 = 当前版本） |
| 官方索引收录 | 121 |
| 整合包 | 3（日常增强 13 / 开发与调试 14 / 读写与创作 11） |

整合包按**场景**手工组包，不是「某个分类的合集」：成员互斥（一个插件只属于一个包），
有安装顺序与角色（如「模型来源」「记忆后端」），并经过三重验证 —— npm 可解析、
tarball 可取、整包 `pnpm install --lockfile-only` 能解出完整依赖图。验证不过的成员会被剔除，
并在包说明里写明剔除了谁。

---

## 接进官方「发现」页

官方插件市场（`@deepseek-ai/dsh-plugin-market`）只认它自己的索引格式，配置项是
`Config.indexes`。hub 仓库根目录的 `market-index.json` 就是按 **format 1** 生成的，
在 profile 的 `cordis.patch.yml` 里加一段即可：

```yaml
- id: plugin-market
  name: "@deepseek-ai/dsh-plugin-market"
  config:
    indexes:
      - "https://gh-proxy.com/https://raw.githubusercontent.com/yunhuantian/dsh-plugin-hub/main/market-index.json"
    cacheTtlMs: 300000
```

几点实测结论：

- 官方读取器用 `fetch(url, { redirect: 'error' })`，**索引地址不能 302**。
  `raw.githubusercontent.com` 直连不通，改成 gh-proxy 前缀后是 200；
- 索引里只放**已认证**条目，全部打 `certified` 标签，与商店的「认证列表」同一套数据；
- 硬规则：`versions` 非空、精确 SemVer、`publishTimestamp` 是整数秒、
  `localizedText` 必须含 `en`、git 源要 40 位小写 commit、分类/label 只能引用顶部声明过的 id。
  生成脚本跑完会逐条过一遍官方 `parseMarketIndex`，不合法不落盘。

同步是**单向**的：商店自己的列表与整合包仍走 DPMIDX，官方索引只是它的一个只读投影。
两边的定位也不同 —— 官方发现页负责「发现 + 安装」，商店负责健康度、依赖图、认证、整合包、
发布与审计。

---

## 自己做列表 / 整合包

`.dpmidx` 不绑定本商店 —— 任何人都能生成一份自己的列表或整合包，别人用链接或文件导入即可。

- **手把手教程**：[`docs/build-list-and-pack.md`](docs/build-list-and-pack.md) —— 输入怎么写、怎么构建、怎么自检、常见错误
- **二进制格式规范**：[`docs/market-index-format.md`](docs/market-index-format.md) —— 头部布局、记录结构、多源合并规则
- **整合包设计**：[`docs/modpack-architecture.md`](docs/modpack-architecture.md) —— 为什么列表和整合包要用 `kind` 分开

最小例子（整合包）：

```json
{
  "kind": 1,
  "meta": { "name": "我的包", "publisher": "我", "description": "一句话", "intro": "详细说明\n第二行" },
  "entries": [
    { "name": "dsh-ops", "url": "https://registry.npmjs.org/dsh-ops/-/dsh-ops-0.4.1.tgz" }
  ]
}
```

```bash
node scripts/build-market-index.mjs my-pack.json my-pack.dpmidx
```

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

装好后：侧栏「插件」页里多出 **插件商店** 一项，点进去就是商店本体；
GitHub Token、镜像同步、内置扩展开关都在它的「设置」/「内置扩展」里。
首次使用建议先在「设置」里点「立即同步」。

> **桌面端要完全退出再启动**（含托盘图标）。profile 的补丁与依赖是在启动时读的，
> 只关窗口不退出进程，装完看不到新界面。

---

## 架构

```
dsh-plugin-hub（一个 npm 包，单仓五区）
├─ packages/hub/            商店本体：contracts / host / extensions / client
├─ packages/hub-health/     健康度（依赖 hub-score）
├─ packages/hub-score/      跑分：computeHealth 纯算法
├─ packages/hub-wiki/       百科
├─ packages/hub-market-index/  DPMIDX v2/v3 索引格式（零依赖，第三方可直接 import）
├─ cordis.patch.yml         一次插入 21 行：本体 + 20 个内建插件
├─ lib/                     分发产物（build 生成）
├─ market-index.json        官方 format 1 索引（121 条认证条目）
└─ docs/                    格式规范、组包教程、整合包设计
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
- **数据与代码分家**：插件表、认证、整合包放在 `dsh-plugin-registry` 仓库，
  hub 只负责读；改数据不必发 hub 版本，商店用「资源清单」一次注册全部来源。

---

## 开发

```bash
npm run build:host     # tsc -p tsconfig.host.json
npm run build:client   # node scripts/build-client.mjs → lib/client.js
npm run build          # 两者
npm run typecheck      # host + client 双侧类型检查
npm run check:contract # 契约往返自检：host 返回体 ⨯ zod 契约（防「字段被剥离 → UI 空白」）
```

> 若 `tsc` 不在 PATH：`node node_modules/typescript/bin/tsc -p tsconfig.host.json`。
> 构建脚本**不许**清空 `dist/` —— 那里放的是分发产物（表格与下载文件），
> 历史上被清过三次。

### 加一个内建插件

1. `packages/hub/src/host/plugins-state.ts` 的 `HUB_PLUGINS` 里加一条描述符
   （id / 分组 / `requires` / 行 id / 服务名 / 默认开关）；
2. 该插件要用到的新逻辑放 `packages/hub/src/host/<name>.ts`（纯函数/类，可被 host 与插件共用）；
3. `packages/hub/src/extensions/<id>.ts` 写 host 半边，形状固定：

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
packages/
  hub/src/
    contracts/
      remote.ts           # zod v4 wire 契约（TYPERT_REMOTE / TYPERT），20+ 个 Remote
      pricing.ts          # 版本化价格表（带生效日期）+ 费用计算（host/client 共用）
    host/
      index.ts            # PluginStoreService（Remote + 定时同步 + 内建插件开关）
      plugins-state.ts    # 20 个内建插件的名册 + 依赖判定 + 开关/状态文件
      store-db.ts         # SQLite（镜像缓存 / 评分 / 审计 / 依赖边 / 认证）
      list-sources.ts     # 资源清单注册 + 来源刷新（数据与代码分离）
      seed-catalog.ts     # 离线预置插件目录（16 个，只插不覆盖）
      github.ts           # GitHub 搜索 + 镜像同步（并发池）
      installer.ts        # 安装 / 卸载 + profile 补丁
      quality-gate.ts     # 质量门
      conflict-check.ts   # 安装冲突检查
      security-scan.ts    # 安全扫描
      publish.ts          # GitHub + npm 双通道发布
      version-guard.ts    # 版本一致性检查
      changelog.ts        # 从 git 历史起草更新日志
      update-check.ts     # 已装版本 vs 上游最新
      backup.ts           # 快照 / 回滚（VACUUM INTO）
      diagnostics.ts      # 诊断报告生成
    extensions/           # 20 个内建插件的 host 半边（各为一个独立 cordis 条目）
      _runtime.ts         # activate()：开关 + 依赖判定 + 状态上报的唯一实现
    client/
      index.tsx           # 核心 UI 注册（官方「插件」页条目 / 字典 / 内建插件 UI 挂载）
      StoreApp.tsx        # 商店外壳（顶部标签 + 视图切换 + 门控）
      views.tsx           # 自动识别 / 认证列表 / 整合包 / 详情 / 已安装 / 发布 / 审计 / 健康度
      extensions-view.tsx # 内置扩展开关
      icons.tsx           # 跨版本图标适配层（0.1.x 与 0.2.x 的图标导出名不同）
      store.css           # 样式（--dsw-* 主题变量）
  hub-health/  hub-score/  hub-wiki/  hub-market-index/
scripts/
  build-market-index.mjs  # ← DPMIDX 构建（随包分发）
  contract-check.mjs      # 契约 1:1 自检
docs/
  market-index-format.md  build-list-and-pack.md  modpack-architecture.md
```

---

## 版本历史

项目 **2026 年 7 月**起步（本地迭代，未公开），8 月 14 日发布第一个公开版本。
下面按时间正序列出全部公开版本；再往下是逐版详情。

| 日期 | 版本 | 这一版干了什么 |
|---|---|---|
| 2026-07 | — | 项目起步，本地迭代（无公开版本） |
| 2026-08-14 | 0.1.0 | 首个公开版本：图形化商店、评分、依赖图、审计、镜像同步 |
| 2026-08-15 | 0.1.1 | 已安装三分类管理 + 质量门 + 自创作插件识别 |
| 2026-08-15 | 0.1.3 | 「用量」tab、多模型费用估算、npm / GitHub 双下载源 |
| 2026-08-16 | 0.1.4 | 一键发布 + 发布前安全扫描 + 全框架国际化 |
| 2026-08-16 | 0.1.5 | 插件百科、健康度排行榜、冲突检查、分类 6 → 12 |
| 2026-08-16 | 0.1.6 | 随机推荐防刷榜 + 7 种排序 |
| 2026-08-19 | 0.1.7 | Skill 商店、同步提速（20 分钟 → 2-3 分钟）、跑分 tab |
| 2026-08-19 | 0.1.8 | 修构建产物（0.1.7 是残缺产物，请用 0.1.8） |
| 2026-09-12 | 0.2.0 | 一个包 20+ 内建插件、离线预置目录、价格表版本化 |
| 2026-10-14 | 0.2.1 | 适配 DSH 0.2.x（peer 范围 + 质量门误报 + 设置页 i18n） |
| 2026-10-14 | 0.2.2 | 修 typert codec：0.2.x 上 Remote 契约被拒 |
| 2026-10-14 | 0.2.3 | 商店融进官方「插件」页，去掉独立入口与设置页 |
| 2026-10-14 | 0.2.4 | 商店条目改成「点进去」，不再把整块商店铺在列表里 |
| 2026-10-25 | 0.2.5 | **未发布**：版本号在 npm 侧被一条清不掉的暂存记录占住，跳过 |
| 2026-10-26 | 0.2.6 | DPMIDX v2/v3、版本级认证、整合包、数据与代码分家 |
| 2026-10-28 | 0.2.7 | 顶部标签外壳、百科门控补全、官方发现页接入（121 条） |

> `0.1.2` 从未发布，版本号直接跳过。

### 怎么查看某个历史版本

不依赖 GitHub Release，直接看 npm 上的包：

```bash
npm view dsh-plugin-hub versions --json          # 所有已发布版本
npm view dsh-plugin-hub@0.1.8 dist.tarball       # 那个版本的 tarball 地址
npm pack dsh-plugin-hub@0.1.8                    # 下下来解开
```

解开的包里就带着**当时的 README**（每个版本都把自己的更新日志写进去），
`lib/` 里是当时的真实产物。0.1.x 的日志记得最细，可以当编年史看。

---

### 0.2.7（2026-10-28）

**商店外壳：左栏取消，改顶部标签**

左侧 176px 竖排导航实际只放了 12 个词，却把内容区挤到 856px。改成顶部横向标签后：

- 内容区回到 1020px（面板固定 1060px，两侧各留 20px）；
- 卡片网格按 `minmax(240px, 1fr)` 自动填充，同一宽度下从 3 列变回 4 列；
- 12 个视图（自动识别 / 认证列表 / 整合包 / 百科 / Skill 商店 / 已安装 / 内置扩展 /
  健康度 / 发布 / 开发脚手架 / 审计日志 / 设置）平铺，不再需要"先找左栏"；
- 窄窗口下标签横向滚动，不会挤成一团；
- 当前视图被门控掉时自动退回「自动识别」，不会停在空白页。

**百科：从「关了个壳」到「真关」**

0.2.6 把 `baike` 的 `defaultEnabled` 设成 `false`，但：

- 顶部导航是硬编码数组，百科标签照旧显示；
- 详情页的百科 tab 只看插件有没有注册 UI；
- host 的 `wikiHub` / `wiki` 直接读库，不看开关。

于是插件"关了"、内容还在。0.2.7 三处一起补：导航项带 `gate: 'baike'`，
详情 tab 过滤，`wikiHub` 返回空集、`wiki` 抛「已关闭」错误。数据保留，开回来即可用。

**接进官方「发现」页**

- 新增根目录 `market-index.json`：官方 format 1，121 条，全部 `certified` 标签；
- profile 里给 `plugin-market` 配 `indexes`（配置见上文），官方「插件 → 发现」不再是空态；
- 生成脚本在 `dsh-plugin-registry` 仓库，三层过滤：npm 上存在 → 有认证 → 认证版本 = 最新版本；
- 只同步认证条目，不把 171 条全丢过去 —— 官方页面上「能装」比「很多」重要。

**认证索引三轮扩充**

| 轮次 | 条目 | 做了什么 |
|---|---|---|
| 首轮 | 76 | 只收「认证版本 = 当前版本」的条目 |
| 第二轮 | 100 | 刷新 24 条过期认证 |
| 第三轮 | 121 | 新增 21 个插件并逐条核验 |

仍有 17 条挂在 `legacy`（16 条是作者改了 dist-tag 回退、1 条 npm 上查不到），
宁可不收，也不给"认证"两个字掺水。

---

### 0.2.6（2026-10-26）

**数据与代码分家**

插件表、认证、整合包原本写在 hub 包里，改一行数据就要发一个 npm 版本。现在搬到
`dsh-plugin-registry` 独立仓库：

- `sources.json` 是单一入口，`{ kind, name, file, entries }`，`file` 按清单自身位置解析；
- 商店「资源清单」一次注册全部来源；同一 URL 重导时 id 不变（id = sha1(URL)），
  于是「刷新」就是原地覆盖，不会出现同名两份；
- 改数据只推数据仓库，hub 版本不动。

**DPMIDX v2 / v3**

- 魔数 `DPMIDX` + 版本字节 + **kind 字节**（0 列表 / 1 整合包），记录 28 字节；
- v3 头部第 32 字节起是 metaBytes，其后是 UTF-8 JSON 元数据
  `{ name, publisher, description, intro, createdAt, certification }`；
- `description` 是一句话，`intro` 是多行详细简介（整合包页展示）；
- 去重按「名称 + 地址」，但只有指向具体产物的地址才参与判重 ——
  仓库根地址只进 `repoGroups()`，否则 monorepo 里不同插件会被错误合并。

**认证改成版本级**

`plugin_certs(package_name, version, publisher, certified_at)`，
`cert.version === 当前版本` 才算 `certified`，否则 `legacy`。写入用 `insert or replace`，
反复认证幂等，不需要先删旧行。

**商店拆成两区 + 独立整合包页**

- 自动识别：GitHub 同步来的全部条目；
- 认证列表：人工核验过的条目，带署名与认证时间；
- 整合包：独立一页，显示简介、安装顺序、成员角色，可一键装。

**整合包**

按场景手工组包（日常增强 / 开发与调试 / 读写与创作），成员互斥、独占角色唯一，
逐个验证 npm 可解析、tarball 可取、整包依赖图可解；验证不过的成员剔除并在说明里写明。

**其它**

- 单仓五区（`packages/hub` + `hub-health` + `hub-score` + `hub-wiki` + `hub-market-index`），
  入口名不变，重构对运行时零影响；
- 删除 `trust` 子插件，信任相关判定并入质量门禁，名册 21 → 20；
- 外部目录同步默认停用（`external_sync` 门控）；
- 插件表 150 条，附署名与分类。

---

### 0.2.5（2026-10-25，未发布）

内容只有一条：**修 issue #7 —— 自指激活行被误判为「未安装的包」，bundle 型插件全装不上**。

安装器在检查依赖时，把插件补丁里指向自己的那一行当成"要装但没装的包"，
于是 bundle 型插件（自带 `cordis.patch.yml` 的那种）一律装不上。修法是识别自指行并跳过。

这个版本号没能发出去：npm 侧留下了一条 approve / reject 都返回 404 的暂存记录，
任何凭证都清不掉，只能跳过。**代码全部包含在 0.2.6 里**，功能上没有缺失。

---

### 0.2.4（2026-10-14）

**商店条目改成「点进去」**

0.2.3 把商店注册进官方「插件」页后，`plugins.item` 的 `summary` 与 `page` 两个视图
被同一个组件渲染 —— 结果整块商店界面（含顶部导航、列表、工具栏）被塞进了插件列表里，
那一行比别的条目高十几倍。现在按 `view` 分流：`summary` 只出标题、简介与「打开」按钮，
`page` 才是商店本体。

---

### 0.2.3（2026-10-14）

**商店融进官方「插件」页，不再有自己的一套入口**

0.1.x 时商店是侧栏底部一个独立按钮 + 全屏弹层，外加一个独立的设置页。0.2 起改为注册进
**官方「插件」页**（`plugins.item`，与官方自带的插件条目并列），点开即进入商店本体 ——
界面上看不出这是额外装的一个插件。同时：

- 去掉侧栏按钮与全屏弹层（连同它的 CSS 与文案键）；
- 去掉 hub 自己的设置页（`settings.section`）：Token 与镜像同步在商店的「设置」里本来
  就有，只有**内置扩展开关**是独有的，拆成商店内的「内置扩展」视图；
- **hub 自身的插件组成没有变**：bundle patch、内部扩展名册、client inject 都原样。

**跨版本图标适配（0.2.x 上侧栏按钮整块消失的那个 bug）**

0.1.x 把尺寸写进图标名（`IconCloseOutline16`），0.2.x 改成不带尺寸后缀 + Regular/Medium
变体（`IconCloseOutlineRegular`，尺寸走 `size` prop）。按某个版本的名字直接 import，
在另一个版本上拿到的是 `undefined`，渲染时 React 抛 error #130
（"Element type is invalid"）—— 它发生在 slot 里，**整条 slot 会崩掉**，界面上什么都不出现。

- 新增 `icons.tsx`：按「0.2.x 名 → 0.1.x 名」依次取，都取不到用内置 SVG 兜底，
  保证任何版本上都渲染出真组件；图标集中在一处，以后换版本只改一个文件。

**清理**

- 删除 `_archived-insights-0.1.x/`（0.1.x 遗留的死代码）；
- 删除 38 条无人使用的 CSS 规则（整组 `dps-job-*`、`dps-ins-*`、健康度排名残留，
  以及随弹层一起消失的 `dps-overlay` / `dps-mask` / `dps-entry*`）；
- 删除 19 个无人引用的 i18n 键（zh/en 同步删）；
- 删除 `openStore` / `openStoreStore` / `closeStore` 三个已无用的导出。

实测（真实 dsh `0.2.0-rc.2`）：`tsc` 双通过、`check:contract` 全部通过、启动 0 条
`did not activate`、浏览器 0 条 console 错误，「插件」页里能看到「插件商店」条目并使用。

---

### 0.2.2（2026-10-14）

**修 dsh 0.2.x 上 typert 契约不兼容（0.2.1 的补漏）**

0.2.1 放宽 peer 范围后 hub 能在 0.2.x 上安装，但**启动时 typert-loader 会拒绝 hub 的
Remote 契约**：`invocation "dsh-plugin-hub#pluginStore/list" parameter codec has no
create() factory`，整条 typert-loader 条目激活失败 → 商店的 Remote 接口全部不可用。
（这个失败在 0.2.1 之前被「整包被跳过」掩盖着，所以一直没暴露。）

根因：0.2.x 把 wire codec 取 schema 的方式从**直挂字段**改成了**惰性工厂** ——
`requireStrictCodec` 现在要求 `typeof codec.create === 'function'`。
官方生成物（`*.typert.host.js`）的形状是
`{ mode: 'strict', typeSymbol, create: () => zodSchema }`。

- `strict()` 现在**两个字段都给**：`create` 喂 0.2.x、`schema` 留给 0.1.x，
  老 runtime 忽略未知字段、新 runtime 只认 `create`，互不干扰；
- 实测（真实 0.2.0-rc.2 启动）：告警从 `2 entries did not activate` 降到 **1**
  —— typert-loader 不再失败，只剩尚未适配 0.2.x 设置 API 的 dsh-connector。

---

### 0.2.1（2026-10-14）

**适配 dsh 0.2.x（issue #6）**

- 7 个 `@deepseek-ai/dsh-*` peer 由 `^0.1.0-rc.6` 拓宽为 `^0.1.0-rc.6 || ^0.2.0-rc.1`：
  原范围在 semver 上**结构性排除**所有 0.2.x，导致 dsh `0.2.0-rc.2` 上安装被兼容性
  检查拒绝，而且 9 个已发布版本共用同一组范围、没有可降级的目标；
- 移除 `@deepseek-ai/dsh-client-runtime` peer：该包在 0.2 线上已不再发布（停在
  `0.1.1-rc.2`），而内建 client 产物自 0.2 适配起就不再引用它 —— 这条 peer 是漏清理的残留；
- `version-guard` 新增一项发布前检查：逐个核对 `dsh-*` peer 的范围是否覆盖
  **运行中的** harness 版本，覆盖不到就给出该补哪一段范围。补上这次漏掉的那道闸。

**质量门误报修复（issue #4）**

- 提取 import 的正则原本允许关键字紧贴一个**收尾**引号，于是
  `if (argument === "--import" || argument === "--loader")` 被读成
  `import" || argument === "`，提出 ` || argument === ` 这种伪包名 → 判定「依赖不完整」
  → 拦截安装并回滚。受害插件（`dsh-damage-pulse@4.0.8`）的真实依赖其实是完整的；
- 现在按三种真实形态提取（`from '…'` / `import '…'` / `import('…')` / `require('…')`），
  关键字与引号之间必须有真分隔符；并加一道兜底：裸名要长得像 npm 包名才认；
- 拦截回滚时一并 reconcile `dsh.profile.bundles`，避免出现「依赖已删、bundle 条目还在」
  的悬空 profile。

**设置页跟随 Harness 语言（PR #5，来自 @Oonatech）**

- 设置区此前完全没拿到 `t`，42 处可见文案是硬编码字面量，所以无论 Harness 语言是什么
  都显示中文（不是缺翻译，是组件从没去查）；
- 现在全部走词表（新增 57 个 `settings.*` 键，zh/en 对称），`label` 也不再绕过词表。

**其它**

- 移除 hub 代管的「连接器」设置与配套 Remote（`connectorStatus` / `connectorConfigSet`）：
  dsh-connector 0.2 起自带设置命名空间与浏览器卡片，两个入口改同一份配置只会互相打架。

---

### 0.2.0（2026-09-12）

**架构：一个包、20+ 个可开关的内部插件（与 DSH 本体同构）**

- 4 个曾独立发包的扩展（`dsh-usage` / `dsh-health` / `dsh-baike` / `dsh-skill-store`）
  并入 hub，改为包内独立 cordis 条目（`dsh-plugin-hub/extensions/*`）；
- 名册扩到 21 条（0.2.5 并入 trust 后为 20 条），分 5 组
  （基础内核 / 安全与质量 / 发布流水线 / 洞察与内容 / 运维）；
- 内建插件**声明依赖**（`registry → store-db + github`、`publish → security` 等），
  运行时由 `activate()` 递归判定；依赖没开就上报 `blocked` 并主动让位，随时可逆
  —— 不用 cordis 硬 inject，避免"提供者停用 → 消费者永久 pending"死锁；
- patch 一次插入 22 行（本体 + 21），在「设置 → 插件」清单页每行可见、可单独停用；
- 设置页新增按分组的插件管理区：状态（运行中 / 已关闭 / 依赖阻塞 / 加载失败）、
  依赖与被依赖、开关计数；
- ⚠️ 默认关闭的插件在 patch 里**不写** `disabled: true`（写了设置页开关就失效）。

**离线预置目录（新增能力）**

- `seed-catalog` 内建插件随包发布 16 个实用插件清单，装好即可浏览/安装，
  不必等镜像同步（492 个仓库、几分钟）跑完；
- 写入**只插不覆盖**：真实同步数据永远优先；目录版本按日期，升级后自动刷新自己的行；
  列表里标「预置」徽章。

**新增能力**

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

- 新增「插件商店」分组：商店本体 + 包内子插件（`dsh-plugin-hub/extensions/*`）
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

---

### 0.1.8（2026-08-19）

**修复构建产物缺失**：`build-client` 的清理步骤在部分沙箱/环境下被安全组件拦截，
构建中断，`lib/client.js` 长期未更新 —— 连接器设置区、跑分 tab 等新功能没进产物。
本次修复构建（清理失败不再中断），并重新发布完整产物。

说明：0.1.7 是残缺产物版本（npm 已锁定无法覆盖），请用 0.1.8。

### 0.1.7（2026-08-19）

- **Skill 商店**：浏览、搜索、一键安装对话中可调用的技能（`SKILL.md`），
  装进 `$DSH_HOME/skills/`，重启后直接说「用 xx 技能」；
- **全生态收录**：从 5 个 GitHub 主题（dsh-skill / claude-skills / agent-skills /
  skills / claude-skill）合并 150 个仓库，首批 28 个技能；
- 双维分类（生态：DSH 专用 / 通用；用途 12 类）；SKILL.md 全文渲染 + 一键装卸；
- **详情页「跑分」tab**：消费 dsh-bench 报告，支持现场 Mock 跑分（零 token）与端到端跑分；
- **设置页「连接器」区**：dsh-connector 的 IM 桥接配置（0.2.1 已移除，交由插件自管）；
- **镜像同步提速**：并发池（认证 8 / 匿名 4）+ npm 下载量缓存，200+ 仓库从约 20 分钟降到 2-3 分钟。

### 0.1.6（2026-08-16）

- **防刷榜排序**：发现页默认「随机推荐」—— 每日种子伪随机（当天顺序稳定、次日轮换、
  无法预测），刷 star / 下载量排不到前面；另提供 7 种排序可选并记忆选择；
- 列表每行附带健康度快照分，可一键按健康度降序；
- 修复客户端契约不同步导致的 `list rejected "filters"`。

### 0.1.5（2026-08-16）

- **插件百科**：百科页 + 详情页百科 tab，回答"这插件有什么用、能带来什么价值"；
- 接入 Blue-Whale-Harness 目录，合并 1800+ 社区条目（去重后 1953 条）；
- 对接 dsh-hub-index 信任徽章（官方 / 认证 / 社区 / 未审核）；
- **健康度排行榜**：Top 20，五项加权（活跃度 30 / 发布渠道 15 / Bug 信号 25 /
  社区规模 20 / 版本节奏 10），前三名金/银/铜；详情页附评分构成与 SVG 趋势图；
- GitHub 讨论区 tab（只读 issue，5 分钟缓存）；
- 安装冲突检查、版本更新检测、已安装归属校验、安装后提示所需环境变量；
- 分类 6 → 12；写操作限流；开发脚手架改走"本地安装 → 商店一键发布"。

### 0.1.4（2026-08-16）

- **一键发布**：GitHub 建仓 + 推代码 + topics + Release，和 / 或 npm 发布；
  Markdown 图文介绍、公开 / 私人、标签选择、全程进度；
- **发布安全扫描**：8 类高风险（远程下载执行 / 环境变量外传 / 恶意依赖等）直接驳回；
- 令牌仅本次使用，绝不持久化；
- 下载量改为 npm 官方真实数据，未发布的显示「未查询到」；
- 全框架国际化（跟随 dsh 界面语言）；安装进度条；
- 修复重复激活行导致启动崩溃、git push 波动重试。

### 0.1.3（2026-08-15）

- **对话用量 tab**：逐请求 token 折线图（输入 / 输出 / 缓存命中率），可缩放拖拽；
- 多模型费用估算，价格表带版本号与生效日期，未知模型不估算；
- 详情页同时提供 npm / GitHub 两个安装按钮，GitHub 失败自动 clone 兜底；
- 安装失败可展开 pnpm 完整报错；
- 修复缓存命中率算出 >100%、GitHub 装到 Release 版本而非默认分支、Windows 下 pnpm 转义。

### 0.1.1（2026-08-15）

- 已安装三分类（系统 / 下载 / 自创作）+ 子分组折叠 + 分类级一键启停 + 18 个核心组件保护；
- **质量门**：依赖完整性（缺依赖自动回滚）+ 启动目录需求（缺目录装好保持禁用）；
- 自创作插件识别（`file:` / `link:` / `workspace:`），显示源码路径与发布状态；
- 商店自身可管理、可卸载；下载来源标注（npm 直装 / GitHub 源码）；
- 修复禁用行没写真实 loader entry id、同步后搜不到自己。

### 0.1.0（2026-08-14）

首个发布：图形化插件商店（浏览 / 搜索 / 筛选 / 一键安装）、本地评分评论、
依赖拓扑图、操作审计日志、GitHub Token 配置、定时镜像同步、插件开发脚手架、下载来源标注。

---

## 许可

MIT
