# harness 0.1.5-alpha.1 适配点清单（P0 产出）

> 2026-09-09 · 升级实测记录。基准：本机全局 @deepseek-ai/dsh 0.1.0-rc.6 → 0.1.5-alpha.1（npm 全局区 `C:\Users\12339\AppData\Roaming\npm`，117 装 / 106 删 / 422 改）。

## 已完成

1. **升级成功**：`dsh --version` = 0.1.5-alpha.1；平台包 237 个（dsh 自包含 node_modules）。
2. **profile 静态组合 OK**：`dsh --profile web --dump-config` 155 entries、无告警。hub / dsh-bench / dsh-connector 均在组合树。
3. **profile 清理（顺手完成）**：
   - `package.json` bundles 移除残留 `gal-view`
   - `cordis.patch.yml` 删除失效禁用行 `{ id: code-pet, name: deepseek-pet }`（新版报 `entry "code-pet" not found` 的来源）
   - 注：`gal-view` 目录仍残留在 web/node_modules、`_hub_tmp_*` / `*.bak-*` 历史文件仍在 —— 0.2 后统一清
4. **boot 实测通过**：`dsh --profile web` 起服务 3080（PID 22040），**dsh-connector 正常加载并输出启动日志**（`[dsh-connector] 未启用任何平台…`），无 host 报错。

## 适配点（0.2 重做必须覆盖）

| # | 项 | 现象 | 影响 / 待办 |
|---|---|---|---|
| A1 | profile 残留引用 | gal-view bundle + code-pet patch | 已清；0.2 hub 的卸载/管理要能自动清 patch 行（根治 code-pet 这类残留） |
| A2 | **client bundle 静态路径变更** | `/plugins/dsh-plugin-hub/client.js` → **404**（旧版机制失效） | 需探明新版 client 模块挂载方式；0.2 client 构建/rev 逻辑要跟新版 |
| A3 | **平台注入 `dsh-client-runtime` 缺失** | 新版 @deepseek-ai 包列表无 dsh-client-runtime（有 client-modules / client-connection / cordis-client-runner 等替代） | 0.2 inject 名单需按新版核对；实测 UI 呈现确认 |
| A4 | web 鉴权带 token | boot URL 形如 `http://127.0.0.1:3080/?token=<T>`；curl 根 303→401（query token 不续传） | 浏览器直开正常；脚本化验证需 header/cookie 方式 |
| A5 | typert 协议 | `dsh-typert-protocol` 仍在（0.1.5-alpha.1） | host Remote 面基本兼容，0.2 沿用并核对版本 |
| A6 | 客户端注入其余 5 项 | dsh-client-ui-settings / client-locale / api-gateway / client-ui-sidebar / client-ui-settings-general 均保留 | 0.2 沿用 |

## 待人工验证（UI 会话，留给用户自测）

- hub「插件商店」入口与各页是否在新版 UI 呈现/可用（依赖 A2/A3 结论）
- dsh-bench / dsh-connector 在新版下的呈现与配置

## 验证命令速记

```bash
# 全局 dsh 入口
node "C:/Users/12339/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/lib/bin.js" --profile web --dump-config
# boot（观察加载）
node ".../bin.js" --profile web --no-open   # --no-open 避免弹浏览器
```
