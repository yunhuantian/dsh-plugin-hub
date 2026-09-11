# dsh-plugin-hub 0.2 重构与生态切割蓝图

> 2026-09-09 拟定 · 待评审
> 背景：本机 dsh harness 0.1.0-rc.6（8 月 preview），官方已迭代到 0.1.5-alpha.1（9-8，API 破坏性演进中）。
> 决策已定：① 以官方最新 0.1.5-alpha.1 为适配基准；② 走 0.2.0 重做；③ 遵循 harness「万物皆插件」哲学——hub 只做商店核心，其余能力切成独立扩展插件（归商店「可扩展类」）；④ 全链路性能优化；⑤ 发布（npm/GitHub）暂缓，本地先做扎实。

---

## 一、现状诊断（0.1.8 的问题根源）

| 维度 | 现状 | 问题 |
|---|---|---|
| 代码规模 | ~9500 行 TS（host 5k + client 4k），1 个仓库 20+ 功能 | 单包塞 20 个功能，改一处全量重发 |
| 迭代方式 | 8 天 8 个版本（0.1.0→0.1.8），多为补丁式修复 | 契约三处同步、构建产物缺失、rmSync 沙箱坑，均源于结构脆弱 |
| 架构依赖 | 契约 z 枚举 / host 实现 / client api 三处手写同步 | 已踩坑多次（`list rejected "filters"`、连接器区消失） |
| 平台耦合 | 按 dsh 0.1.0-rc.6 API 编写（client 注入 6 个 @deepseek-ai/* 模块、host 用 dsh-typert-protocol） | harness 已到 0.1.5-alpha.1，cordis 4.0.1→4.0.2，平台包全线升级 |
| 性能 | client bundle 903KB（含全部功能）、镜像同步 200+ 仓库、百科库 1900+ 条目 | 单 bundle 过大、大同步拖慢启动/刷新 |

## 二、目标架构（万物皆插件）

```
harness（DeepSeek Harness 0.1.5-alpha.1，cordis 4.0.2）
├─ dsh-plugin-hub 0.2        ← 商店核心（瘦身）
│    核心职责：插件目录发现/搜索/详情/安装/卸载/启停/已安装管理/发布/审计
│    数据：本地 SQLite（store-db）
│    服务：export provide ['pluginHub']（供扩展插件消费数据的 cordis Service）
│    UI slot：sidebar.footer.action / settings.section / conversation.view
├─ 官方扩展插件（商店中归「可扩展类」，各自独立 npm 包 / git 仓库）
│   ├─ dsh-bench       跑分          （已有，独立）
│   ├─ dsh-connector   IM 桥接        （已有，独立）
│   ├─ dsh-skill-store Skill 商店     （拟切出：对话技能市场）
│   ├─ dsh-baike       插件百科/Blue-Whale（拟切出）
│   ├─ dsh-health      健康度/信任/趋势（拟切出）
│   └─ dsh-usage       用量/费用估算  （拟切出：conversation.view）
└─ 社区插件
```

关键机制：
1. **数据核心 = hub 服务**：hub 0.2 `ctx.provide('pluginHub')` 暴露只读查询（list/detail/health/tagSource…）。扩展插件 `inject: ['pluginHub']` 取数据，独立渲染自己的 UI（挂平台 slot）。无法 inject（跨进程）时沿用状态文件约定。
2. **UI 组合不穿透**：扩展插件的 UI 挂 harness 平台 slot（settings.section / conversation.view / sidebar），不强行侵入 hub 详情页内部 tab，避免 client 跨插件耦合。
3. **契约单一来源**：host/client 共享 schema 生成类型与校验，消灭"三处手写同步"。

## 三、功能切割表

### A. hub 0.2 核心（保留并重写）
| 功能 | 说明 |
|---|---|
| 发现/搜索/筛选/排序/详情 | 商店本职；排序保留防刷榜随机推荐 |
| 一键安装/卸载/启用/禁用 | 安装链路 + 进度/错误详情透出 |
| 已安装管理（系统/下载/自创作 + 可扩展类） | 三分类 + 归属校验 + 版本更新检测 |
| 质量门 + 冲突检查 | 依赖完整性 / 目录需求 / 槽位 / 补丁完整性（**修复 issue #2：剥引号 + 自身放行**） |
| 一键发布 + 发布安全扫描 | 自创作→GitHub/npm 闭环 |
| Token 配置 / 镜像同步（并发池） | 数据基础设施；同步源收窄到 dsh-plugin 主题 |
| GitHub issues 讨论区（详情页只读） | 轻量高价值 |
| 审计日志 | 已内嵌 store-db，保留 |
| i18n | **作为基础设施修好（issue #3：字符串全部进字典，清 CJK 标点 bug）** |

### B. 切为独立扩展插件（拟，逐个实施）
| 现功能 | 新包名 | 挂载点 | 切割价值 |
|---|---|---|---|
| Skill 商店 | `dsh-skill-store` | settings.section | 与插件商店解耦，独立迭代 |
| 百科库 / Blue-Whale 1900+ | `dsh-baike` | settings.section / conversation.view | 大同步源移出核心 |
| 健康度排行榜/信任徽章/趋势图 | `dsh-health` | settings.section | 第三方索引依赖移出核心 |
| 用量视图 / 费用估算 | `dsh-usage` | conversation.view | 本就是会话分析，非商店 |
| 跑分 tab | 已由 dsh-bench 承担 | （详情页内 tab 在 0.2 移除） | — |
| 连接器设置区 | 已由 dsh-connector 承担 | 设置区 | — |

### C. 下线候选（0.2 起不在 hub，也不急于切）
| 功能 | 处置建议 | 理由 |
|---|---|---|
| 本地评分评论 | 保留在 hub（详情页一部分，切割收益低）；如要企业级再独立 | 轻量内嵌 |
| 依赖拓扑图 | 0.2 移除，git 历史保留 | 低使用率、渲染重；需要时再以扩展复活 |
| 下载来源标注/信任徽章 | 来源徽标保留（内联轻逻辑）；信任徽章随 dsh-health 切出 | 徽章依赖 dsh-hub-index 外部源 |

> 以上 B/C 为建议划分，逐项实施前会再过一遍确认。

## 四、harness 升级（0.1.0-rc.6 → 0.1.5-alpha.1）

1. 备份：`~/.dsh` 全量复制 + `dsh dump-config` 留档
2. 升级：`npm i -g @deepseek-ai/dsh@0.1.5-alpha.1`（走官方最新）
3. 差异已知项：cordis 4.0.1→4.0.2；全部 dsh-* 平台包 0.1.0-rc.6→0.1.5-alpha.1；新增 sdk-app / sdk-minimal / hooks-claude-code / hooks-codex / http-proxy / webhook(-github) 等
4. 验证点（升级后逐项确认，形成适配清单）：
   - client 注入模块名是否仍为 `dsh-client-runtime / dsh-client-ui-settings / dsh-client-locale / dsh-api-gateway / dsh-client-ui-sidebar / dsh-client-ui-settings-general`
   - slots：`sidebar.footer.action / settings.section / conversation.view` 是否保留、签名是否变化
   - host：`dsh-typert-protocol` Remote 协议是否兼容
   - profile schema：settings.yaml / package.json 依赖写法是否仍被 loader 接受
5. 兼容过渡：若新版 schema 变更导致现有插件加载失败，先修 profile 再逐插件验证

## 五、性能优化目标（0.2 基线）

| 项 | 0.1.8 | 0.2 目标 |
|---|---|---|
| client bundle | 903KB | 显著缩小（砍功能后自然瘦身 + 构建去重） |
| 同步源规模 | 多主题 + Blue-Whale 1900+ | dsh-plugin 主题，并发池保留 |
| 安装前扫描 | 质量门 + 冲突检查两次遍历 | 合并单次遍历 |
| 启动 | 全量初始化 | SQLite lazy + store 缓存 |

## 六、执行阶段（每阶段可验证、可停）

- **P0 升级 harness** → 备份 → 升级 → 出「新版适配点清单」
- **P1 hub 0.2 骨架** → 契约单一来源改造 + 核心链路（发现/安装/已安装）在新 harness 上跑通
- **P2 补全核心** → 发布/审计/设置/同步 + 修 issue #2 #3 → 0.2.0-alpha 本地全量回归
- **P3 切割首个扩展**（试点 dsh-health 或 dsh-skill-store，验证 pluginHub 服务契约与「可扩展类」呈现闭环）→ 固化切割范式
- **P4 逐个切出/下线** B、C 清单 → 各扩展独立发版
- **P5 收尾** → GitHub main 同步、npm 发布策略（按你节奏）

## 七、issue 落点
- **#2 冲突检查误报** → P2（hub 核心），剥引号 + `name === packageName` 放行 + UI 透出完整 detail
- **#3 i18n 硬编码** → P2（hub 核心），字符串全量进字典 + 修 `publish.mdEmpty` CJK 标点 + main 追平 npm 0.1.8 后欢迎 PR
