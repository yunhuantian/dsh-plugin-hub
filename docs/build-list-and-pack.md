# 自己做一份插件列表 / 整合包

这份文档给**第三方作者**：不需要改我们的代码，也不需要装任何依赖，
用一个 Node.js 就能把「一组插件」做成商店能直接导入的 `.dpmidx` 文件。

> 想读格式的二进制细节，看 [`market-index-format.md`](./market-index-format.md)；
> 想知道整合包为什么这样设计，看 [`modpack-architecture.md`](./modpack-architecture.md)。

---

## 0. 先分清两样东西

| | 列表（List） | 整合包（Pack） |
|---|---|---|
| 是什么 | 一份**可选插件目录**，用户在里面挑着装 | 一组**应该一起装**的插件，带简介 |
| `kind` | `0` | `1` |
| 商店位置 | 「插件商店」的自动识别 / 认证列表两区 | 单独的「整合包」页 |
| 导入后 | 可以逐条点安装 | 有「一键安装」按钮，串行装完整个包 |
| 适合 | 收录很多插件、做排行榜、做镜像 | 表达「这样配一套就能干活」 |

**商店会拒绝把整合包当列表导入**，反之亦然。这不是限制，是防呆 ——
把别人写的整合包塞进列表区，用户会看到一堆点不动的条目。

---

## 1. 你需要准备什么

- **Node.js 18+**（只用标准库，不需要 `npm install`）
- 若干个插件包的**可安装地址**：
  - npm 上的包 → `https://registry.npmjs.org/<包名>/-/<包名>-<版本>.tgz`
  - GitHub Release 产物 → `https://github.com/<owner>/<repo>/releases/download/<tag>/<file>.tgz`
  - 源码仓库 → `https://github.com/<owner>/<repo>`（消费者侧要装依赖并构建，慢但通用）

⚠️ 地址要指向**具体产物**（带版本号的 `.tgz`），不要写 `latest` 或仓库根：
前者会让「同一地址不同内容」无法判重，后者在 monorepo 里会误合并不同插件。

---

## 2. 写输入文件

### 2.1 一份列表（`kind` 缺省 = 0）

`my-list.json`，一个对象数组：

```json
[
  {
    "name": "dsh-ops",
    "url": "https://registry.npmjs.org/dsh-ops/-/dsh-ops-0.4.1.tgz",
    "category": "tool",
    "description": "运维巡检：健康检查、日志与资源占用一目了然。"
  },
  {
    "name": "billion-context",
    "url": "https://github.com/owner/billion-context",
    "category": "model",
    "deps": []
  }
]
```

| 字段 | 必填 | 说明 |
|---|---|---|
| `name` | ✅ | npm 包名。同名只保留第一条，保证构建结果确定 |
| `url` | ✅ | 安装地址，见上 |
| `category` | | 分类键，如 `tool` / `model` / `ui` / `data`；留空算未分类 |
| `description` | | **一句话**介绍，商店卡片上显示 |
| `deps` | | 依赖的包名数组（提示用） |
| `flags` | | 见 §2.3；不填会自动推断 |

### 2.2 一份整合包（`kind: 1`，带简介）

`my-pack.json`，一个**对象**（不是数组）：

```json
{
  "kind": 1,
  "meta": {
    "name": "写小说这套",
    "publisher": "你的名字",
    "description": "从大纲到章节、从插图到配音，一条链走完。",
    "intro": "为什么挑这几个：\n· 写作用 X，因为它能直接改本地 md 文件；\n· 插图用 Y，出图不占上下文；\n· 配音用 Z，可离线跑。\n装完在「插件」页把 X 打开就能用。"
  },
  "entries": [
    { "name": "dsh-openwrite", "url": "https://registry.npmjs.org/dsh-openwrite/-/dsh-openwrite-1.2.0.tgz" },
    { "name": "dsh-image-gen", "url": "https://registry.npmjs.org/dsh-image-gen/-/dsh-image-gen-0.5.0.tgz" }
  ]
}
```

`meta` 的四个文字字段各有分工：

- `name` —— 包名（导入商店后就是来源的展示名）
- `description` —— **一句话**，出现在整合包列表里
- `intro` —— **详细简介**，可换行。整合包页会在选中后展开显示。建议：
  - 第一行说清「这套是给谁用的」
  - 中间逐条说明为什么选这些成员（同类为什么只留一个）
  - 最后写一句使用前提（需要哪个插件先打开、要不要额外配置）
  - 每行 ≤ 40 字，总长 ≤ 300 字
- `publisher` —— 署名。**这只是署名，不是认证**；商店不会因为它给你任何特权

### 2.3 `flags`：一键安装怎么知道该干嘛

| 值 | 含义 | 行为 |
|---:|---|---|
| `1` | 成品包 | 下载 + 解压，无需构建 |
| `2` | 源码仓库 | 需要装依赖并构建 |
| `0` | 未标注 | 消费端按 URL 后缀再判断一次 |

不填时的推断规则：`.tgz` / `.tar.gz` / `.zip` → 成品；`git+` / `.git` /
github.com 等仓库地址 → 源码。猜错的后果只是多一次判断，不会装坏。

---

## 3. 构建

把 `build-market-index.mjs` 抄到本地（`scripts/` 下），然后：

```bash
# 列表
node build-market-index.mjs my-list.json my-list.dpmidx

# 整合包
node build-market-index.mjs my-pack.json my-pack.dpmidx
```

输出会告诉你写了几条、跳过几条（缺 `name`/`url`、同名重复会被跳过）、
文件多大、比输入 JSON 小多少。**出现「跳过」就要回头改输入**，别直接分发。

脚本是纯 ESM、零外部依赖，唯一的 import 是 `lib/hub-market-index/src/index.js`
（编解码器）。想彻底脱离仓库，把那个文件一起拷走即可。

---

## 4. 自己先验一遍

分发之前，花两分钟确认三件事：

```bash
node -e "
const m = require('./lib/hub-market-index/src/index.js');
const fs = require('fs');
const idx = m.openMarketIndex(fs.readFileSync('my-pack.dpmidx'));
console.log('kind', idx.kind, 'count', idx.count);
console.log('meta', idx.meta);
for (let i = 0; i < idx.count; i++) console.log(' -', idx.name(i), idx.url(i));
"
```

① `kind` 对不对（列表 0 / 整合包 1）；
② `count` 和你数的条目数一致；
③ 每条地址都能 `curl -I` 到 200 —— 地址写错是最常见的失败原因，而且
   发现得越晚代价越大（用户点「一键安装」时才发现 404）。

完整自检脚本：`node scripts/verify-packs.mjs <pack.dpmidx>`（如果仓库里有）。

---

## 5. 发布与让别人导入

`.dpmidx` 只是一个文件，放哪都行（GitHub Release、自己的服务器、网盘直链）。

- **用户用链接导入**：插件商店 → 添加来源 → 粘贴 URL
- **用户用文件导入**：添加来源 → 上传文件
- **别人想核对内容**：把同名 `.json` 一并放出（可读版），`.dpmidx` 是给机器读的

如果你希望自己的列表进入「认证列表」区而不是「自动识别」，
需要走我们的签发流程（`docs/` 里认证相关章节）。**没认证完全不影响使用**，
只是会显示为自动识别的第三方来源 —— 这也是诚实的做法：文件可以被任意复制，
信任只能由消费端校验。

---

## 6. 常见错误

| 现象 | 原因 |
|---|---|
| 导入报「这是整合包，不是列表」 | 把 `kind: 1` 的文件放进了列表区 |
| 导入后条目是 0 条 | 输入用了 `{ "kind": 1, "entries": … }` 但忘了 `kind` 之外的 `entries` 键名 |
| 一键安装全部失败 | 地址指向 `latest`、404，或指向了源码仓库但用户没有网络/构建环境 |
| 装完某个成员后功能重复 | 整合包里放了同类插件（两个皮肤、两个记忆后端）。**同类只留一个** |
| 简介显示成一大坨 | `intro` 里没写换行。用 `\n` 分行 |
| 中文变成问号 | 输入文件不是 UTF-8。用 `JSON.stringify` 写出，别手抄 |

---

## 7. 给整合包作者的建议

1. **一个包解决一类事**。包越大越难解释，用户也越不敢点。
2. **同类只留一个**。独占角色（皮肤、记忆后端、默认终端）冲突时后装的会覆盖前面的。
3. **写清前提**。「需要 A 先打开」比「装完就能用」有用得多。
4. **别塞自己没跑过的插件**。成员地址失效，整个包的信任就没了。
5. **留 `publisher`**。匿名不是特色，署名让人知道出了问题找谁。
