# 五包拆分方案

> 范围：把当前「一个包 + 21 个内建插件」收敛为**五个可单独发布/单独安装的插件**：
> 基础 hub、健康度、跑分、百科、索引格式。
> 本文给出每个包的所有权边界、公开 API、依赖方向、迁移顺序与验收标准。

---

## 1. 拆分结果

| # | 包 | 角色 | 依赖兄弟包 | 当前代码位置 |
|---|---|---|---|---|
| 1 | `dsh-plugin-hub` | **基础**：市场 UI、安装、信任、数据底座 | 索引格式 | `src/client/**`、`src/host/{installer,trust,plugins-state,store}*`、`src/extensions/{store-db,github,npm-probe,seed-catalog,registry,installer,trust}` |
| 2 | `dsh-hub-health` | **健康度**：运行时健康状态 + 排行展示 | 跑分 | `src/extensions/health.ts`、`src/client/views.tsx` 的 HealthHub 部分 |
| 3 | `dsh-hub-score` | **跑分**：纯评分算法（0-100、等级、权重） | 无 | `src/host/health.ts`（`computeHealth`） |
| 4 | `dsh-hub-wiki` | **百科**：插件百科/使用笔记 | 基础（数据） | `src/extensions/baike.ts` + 对应视图 |
| 5 | `dsh-hub-market-index` | **索引格式**：DPMIDX v2 编解码 + 多源合并 + 生产 CLI | 无 | `src/host/index-format.ts`、`scripts/build-market-index.mjs`、`docs/market-index-format.md` |

依赖方向（无环）：

```
dsh-hub-score ──→ dsh-hub-health ──→ dsh-plugin-hub ──→ dsh-hub-wiki
                        │                  ↑
                        └──────────────────┘
dsh-hub-market-index ──────────────→ dsh-plugin-hub
        （0 依赖，可被任意第三方单独使用）
```

---

## 2. 每个包的公开 API

### `dsh-hub-market-index`（已可用）

```js
import {
  encodeMarketIndex, openMarketIndex, mergeMarketIndexes,
  FLAG_ARTIFACT, FLAG_SOURCE, FLAG_OFFICIAL, FLAG_VERIFIED,
} from 'dsh-plugin-hub/market-index'
```

- 0 运行时依赖（只用 `node:buffer`）；
- 只读句柄，字符串按需解码；
- 合并多份索引 → 统一市场视图（去重、来源归属、依赖并集）。
- 生产工具：`node node_modules/dsh-plugin-hub/scripts/build-market-index.mjs in.json out.dpmidx`
  （当前在仓库 `scripts/` 下，拆包后随包发布）

### `dsh-hub-score`

```js
import { computeHealth, LEVEL_LABEL } from 'dsh-hub-score'
computeHealth({ stars, downloads, issues, updatedDaysAgo, hasReadme, hasLicense }) // → { score, level, parts }
```

- 纯函数，不碰 ctx / 不读文件；这是「跑分」的唯一定义处；
- 健康度插件与商店 UI 都调用它，保证口径一致。

### `dsh-hub-health`

- 服务：`ctx.pluginHealth` → `{ score(metrics), labels(), ready }`
- UI：健康度排行页（依赖商店的列表数据）
- 依赖：`dsh-hub-score`

### `dsh-hub-wiki`

- 服务/视图：百科条目与使用笔记
- 依赖：基础包的数据服务（`pluginStoreDb`）

### `dsh-plugin-hub`（基础）

- 市场：DPMIDX 读取/合并、条目页、一键安装（安装委派官方 `pluginManager.installBundle`）
- 底座：`store-db`、`github`、`installer`、`trust`
- 整合包清单：默认装哪些 mod、版本区间
- 依赖：`dsh-hub-market-index`

---

## 3. 迁移顺序与验收

| 阶段 | 动作 | 验收标准（可执行） |
|---|---|---|
| **A** | 抽出索引格式为独立包 | 第三方脚本只依赖该包即可读写索引；`node scripts/test-market-index.mjs` 全绿 |
| **B** | 抽出跑分算法 | `computeHealth` 单测覆盖既有样例值不变；基础包不再 import 它 |
| **C** | 抽出健康度 | 卸载健康度后基础包启动 0 告警；装回后排行恢复正常 |
| **D** | 抽出百科 | 同上；未装时 UI 给出「需要安装百科」提示而非空白 |
| **E** | 基础包收拾 | 名册里 5 个包的条目分别位于各自包；`cordis.patch.yml` 不再插入已迁出的行 |

**每一步都应当能单独发布**：先把新包发成 `1.0.0`，基础包在下一个次版本改为依赖它，
旧的内建实现保留一个版本（标记 deprecated），再删除。

---

## 4. 仓库形态（需要拍板）

| 方案 | 优点 | 代价 |
|---|---|---|
| **单仓 monorepo**（`packages/*` + pnpm workspaces） | 共享 tsconfig/测试/版本矩阵；一次 CI 覆盖五包；重构时跨包改动原子化 | 需要引入 workspace 构建；发布脚本要按包循环 |
| **五仓独立** | 每个包生命周期完全独立 | 版本矩阵与联调成本高；重构需跨仓协调 |

**建议 monorepo**：这五个包共享「dsh 版本线」这一强约束，任何 dsh 升级都要五包同步验证，
分仓只会把同一件事做五遍。

---

## 5. 与「让 hub 成为钠」的关系

钠之所以人人装，是因为**它是底座**，不是因为它功能多。所以：

- 基础包必须薄而稳：市场 + 安装 + 信任 + 整合包清单；
- 跑分/健康度/百科是**上层 mod**，可以快速迭代、可以被人替换；
- 索引格式是**公共契约**，要能脱离我们独立使用 —— 这才是"统一市场"的落点。

---

## 6. 风险

| 风险 | 说明 | 缓解 |
|---|---|---|
| 五包 × 两条 dsh 版本线 = 10 个兼容组合 | peer 范围漂移会导致装不上 | 由基础包用 `version-guard` 统一校验；发布前跑 `dsh-plugin-compat-check` |
| 健康度/跑分拆分后口径漂移 | 两处各算一套 | 跑分是唯一实现，健康度只调用 |
| 百科依赖基础包的数据服务 | 单独装百科会缺数据 | 百科声明对基础包的 peer；未满足时降级为只读提示 |
| 索引格式被第三方实现走样 | 互操作性下降 | 规范文档 + `test-market-index.mjs` 作为一致性用例（可作为跨实现的黄金样例） |
