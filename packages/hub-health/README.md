# 健康度（packages/hub-health）

把跑分暴露为 cordis 服务 `ctx.pluginHealth`，并提供排行展示。

- 依赖：`hub-score`
- 入口名仍是 `dsh-plugin-hub/extensions/health`（由基础包的 exports 指向本区域产物）
- 卸载后基础包应正常启动，只是没有健康度与排行
