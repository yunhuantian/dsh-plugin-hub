# 跑分（packages/hub-score）

插件量化评分的唯一实现：`computeHealth(metrics) → { score, level, parts }`。
纯函数，不接触 ctx、不读文件、无依赖。健康度与商店 UI 都调用它，保证口径一致。

目标：拆成独立 npm 包后，任何第三方都能用同一套评分，而不必装上商店。
