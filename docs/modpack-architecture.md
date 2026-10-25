# 整合包架构（Modpack）—— 从单体到「核心 + mod」

> 参照：籽岷把 DSH 类比为 Minecraft、插件类比为 mod。那我们就按 MC 的成熟形态组织：
> **核心（像 Sodium 那样人人必装）+ 独立 mod + 整合包**。
> 当前 hub 是「一个包里塞 21 个内建插件」，本文描述如何拆成「整合包 + mod」。

---

## 1. 目标形态

```
dsh-plugin-hub（整合包 / 核心）        ← 人人装这一个
├── 市场与索引（DPMIDX v2）
├── 底座：store-db / github / installer / trust
├── 整合包清单：默认装哪些 mod、版本区间
└── 认证与信任（后续项目 2）

dsh-hub-mod-health（mod）             ← 可选，单独发布
dsh-hub-mod-depgraph（mod）
dsh-hub-mod-usage（mod）
…
```

三层职责：

| 层 | 类比 | 职责 | 变化频率 |
|---|---|---|---|
| **核心** | Sodium | 市场、索引、安装底座、信任/认证 | 低（稳） |
| **mod** | Create / JEI | 单一能力（健康度、依赖图、用量…） | 高（各自迭代） |
| **整合包** | 整合包 | 决定装哪些 mod、锁定版本组合 | 中（策展） |

**关键判断**：hub 要成为「钠」，靠的不是功能多，而是**别人离不开**——
市场索引格式、安装底座、认证体系。功能应当外移，否则核心会因功能迭代而不稳。

---

## 2. 现状（事实）

- 21 个内建插件写在 `src/host/plugins-state.ts` 的名册里；
- `cordis.patch.yml` 一次插入 22 行（本体 + 21），全部从**同一个包**的子路径加载：
  `dsh-plugin-hub/extensions/<id>`；
- 依赖是**声明式**的（`requires`），运行时由 `activate()` 判定；依赖被关时消费者
  「干净地让位」，不产生 cordis 硬 inject 死锁。

### 依赖拓扑（实测，来自名册）

- **被依赖最多**：`store-db`（8 个）、`github`（2）、`security`（1）
- **深度 0（无兄弟依赖）**：`store-db`、`github`、`security`、`conflict`、`quality`、
  `version-guard`、`changelog`、`usage`、`health`、`skill-store`、`backup`、`diagnostics`
- **深度 1**：`npm-probe`、`seed-catalog`、`installer`、`trust`、`registry`、
  `update-check`、`dependency-graph`、`baike`
- **深度 2**：`publish`（依赖 `security`）

无环；名册顺序即依赖顺序。

---

## 3. 拆分口径（哪些留在核心）

按「是否属于平台能力」而不是「是否常用」来切：

### 留在核心（4 + 市场/UI）

| 组件 | 理由 |
|---|---|
| `store-db` | 所有数据落点，被 8 个依赖；拆出去会让每个 mod 都要装它 |
| `github` | 通道（限频/退避/token），多 mod 复用 |
| `installer` | 安装底座：**将改为委派官方 `pluginManager`**，核心保留策略与回滚报告 |
| `trust` | 认证与信任的落点（项目 2 的基础） |
| 市场/索引/UI | DPMIDX 读取、合并、条目页、一键安装 |

### 改为独立 mod（17）

`security`、`conflict`、`quality`、`version-guard`、`changelog`、`publish`、
`npm-probe`、`seed-catalog`、`registry`、`update-check`、`usage`、`health`、
`dependency-graph`、`baike`、`skill-store`、`backup`、`diagnostics`

其中用户明确要求保留的 **健康度**（`health`）与 **依赖图**（`dependency-graph`）
只是改成独立包，能力不减。

---

## 4. 一个 mod 的打包契约

```jsonc
// package.json
{
  "name": "dsh-hub-mod-health",
  "version": "1.0.0",
  "dsh": {
    "bundle": { "patch": "cordis.patch.yml" }   // 可选：只注册自己的行
  },
  "peerDependencies": {
    "@deepseek-ai/dsh": "^0.2.0-rc.1",          // 与核心同口径
    "dsh-plugin-hub": "^0.3.0"                   // mod 依赖核心的服务
  }
}
```

```yaml
# cordis.patch.yml（mod 自带，只插自己的行）
- insert:
    - id: hub-mod-health
      name: dsh-hub-mod-health
```

约束（都是踩过的坑）：

1. **mod 不再共用核心的包体**：`entry` 从 `dsh-plugin-hub/extensions/x` 变成
   `<mod 包名>`，因此 `rowId` 与 `entry` 都要重新登记；
2. **peer 范围必须覆盖同一条 dsh 版本线**，否则会被兼容性门禁拒装
   （见 `dsh-plugin-compat-check` 技能）；
3. **默认关闭的 mod 不要写 `disabled: true`**：写了 loader 不加载，模块读不到开关，
   表现为「打开了没反应」；默认关必须由 mod 自己让位；
4. **跨 mod 的服务访问走 cordis 服务**，不要把别的 mod 写成 client external；
5. **client 半边**：每个 mod 若带 UI，必须有独立的 `dsh.client.inject` 与 bundle，
   且 externals 只能落在壳的种子表内。

---

## 5. 迁移顺序（按依赖深度与影响面）

**阶段 A：把核心边界定下来（不动 21 个插件）**
- 抽出 `HubCoreApi`（mod 可用的服务面：`storeDb`、`github`、`installer`、`trust`）；
- 名册增加 `packageName` 字段，为「同一行可由不同包提供」预留；
- 验收：现有 21 个插件在同一包内保持不变，启动 0 告警。

**阶段 B：先拆深度 0 且无被依赖的 5 个（风险最低）**
`usage`、`health`、`skill-store`、`backup`、`diagnostics`
- 每个成为独立包，核心名册改为按 `packageName` 定位；
- 验收：卸掉某个 mod 后核心仍能启动；装回后功能恢复。

**阶段 C：拆质量/安全组**
`security`、`conflict`、`quality`、`version-guard`、`changelog`
- 注意 `publish` 依赖 `security`，先拆 `security` 再拆 `publish`；
- 验收：拦截类能力在「未装 mod」时降级为「不拦截但提示」，不得让安装链路失败。

**阶段 D：拆数据/洞察组**
`npm-probe`、`seed-catalog`、`registry`、`update-check`、`dependency-graph`、`baike`
- 验收：索引同步、依赖图在 mod 缺失时给出明确的「需要安装 X」提示。

**阶段 E：整合包成形**
- 核心的 `cordis.patch.yml` 不再插入 mod 的行；
- 新增 `modpack.json`（或 DPMIDX 的一个分区）声明「默认 mod 集合 + 版本区间」；
- 安装整合包 = 装核心 + 按清单装 mod（可一键，走官方 `installBundle` 或离线包）。

---

## 6. 风险与对策

| 风险 | 影响 | 对策 |
|---|---|---|
| 包数量从 1 变 18，版本矩阵爆炸 | 每次 dsh 升级要发 18 个版本 | mod 的 peer 范围统一由核心生成；用 `version-guard` 批量校验 |
| 槽冲突（多个 mod 注册同一 single 槽） | 启动崩溃 | 保留 `conflict` 作为**核心内置**的轻量检查，或改为核心强制 |
| 安装顺序/依赖缺失 | 用户装了 mod 但缺核心服务 | mod 声明 `dsh-plugin-hub` 为 peer；核心启动时校验并提示 |
| 整合包与单独装 mod 的行为不一致 | 难复现问题 | 整合包只做「清单 + 版本锁定」，不改变加载语义 |
| 认证（项目 2）需要签名 | 索引无签名的老问题 | 认证结果写进 DPMIDX 的 `flags`（`FLAG_VERIFIED`）+ 独立签名文件 |

---

## 7. 与三个项目的关系

1. **hub 内插件的优化与改进**：拆分后每个 mod 独立迭代，核心不再被功能变更拖慢。
2. **DSH 插件认证**：核心提供 `trust` 与 `FLAG_VERIFIED` 落点；认证是「谁有资格被标为可信」，
   这是官方市场明确缺失的一层（其索引无签名）。
3. **整合包整理**：从「一个包塞满」变成「按场景组合 mod」，这就是策展。

**成功判据（可量化）**：
- 核心包体积、启动条目数、启动耗时下降；
- 单 mod 的发布不影响核心版本号；
- 用户能在「插件」页看到整合包与各 mod 分别可开关。
