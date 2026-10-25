# 索引格式（packages/hub-market-index）

DPMIDX v2 的编解码与多源合并。**零运行时依赖**，可被任何第三方单独使用。

```js
import { openMarketIndex, mergeMarketIndexes, encodeMarketIndex } from 'dsh-plugin-hub/market-index'
```

- 规范：`docs/market-index-format.md`
- 生产工具：`scripts/build-market-index.mjs`（JSON/NDJSON → .dpmidx）
- 测试：`scripts/test-market-index.mjs`（13 条断言）
- 基准：`scripts/bench-index-format.mjs`
