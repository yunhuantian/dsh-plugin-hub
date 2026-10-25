# 基础 hub（packages/hub）

市场 UI、安装、信任、数据底座。这是唯一对外发布为 `dsh-plugin-hub` 的区域。

```
src/client/      浏览器半边（商店界面、整合在官方「插件」页里）
src/host/        宿主半边（Remote 契约、安装器、名册、市场数据）
src/extensions/  其余内建插件（store-db / github / installer / trust / registry …）
src/contracts/   TYPERT Remote 契约
```

依赖：`hub-market-index`（索引格式）、`hub-score`（跑分）、`hub-health`、`hub-wiki`
（后两者目前通过相对路径复用本区域的 `extensions/_runtime`，拆成独立 npm 包时应把
`_runtime` 提升为公共 plugin-kit）。
