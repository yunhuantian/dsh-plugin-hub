/**
 * 模型价格表 —— 版本化 + 生效日期（host / client 共用的单一来源）。
 *
 * 为什么要有版本：模型会调价（如 DeepSeek V4.1 Flash 于 2026-09-10 04:00 UTC
 * 生效的新计价），而会话日志是历史的。只保留"最新价"会让过去的花费被新价重算，
 * 既算不出当时的真实成本，也看不出调价前后的差。
 *
 * 因此这里按**生效日期**分版本，每条记录带 `effectiveFrom` / `effectiveTo`：
 *   - 「当时价」= 用请求发生时刻生效的表 → 等于当时实际计费
 *   - 「现价」  = 用最新表                  → 用于对比"同样的用量今天要多少钱"
 * 调价只**追加**新版本，永不修改历史版本（历史数据不可变）。
 *
 * 计费口径（与 dsh token-meter 一致）：usage.inputTokens **就是未缓存输入桶**
 * （token-meter 的 bucketsFrom 把 inputTokens → uncachedInputTokens），
 * 因此不要再减 cacheRead/cacheWrite，否则未缓存输入会变成负数。
 * 计费输入 = inputTokens + cacheReadTokens + cacheWriteTokens。
 *
 * 本模块同时被两处编译：host build 产出 `lib/contracts/pricing.js`，
 * client build 内联进 `lib/client.js`（与 remote.ts 相同的单一来源约定）。
 */
/**
 * 非 DeepSeek 厂商的价格（跨版本不变的部分）。
 * 这些厂商在观察期内没有调价记录，因此在各版本中原样沿用。
 */
const OTHER_VENDORS = {
    input: {
        'openai:gpt-4o': 2.5, 'openai:gpt-4o-mini': 0.15, 'openai:gpt-4.1': 2, 'openai:gpt-4.1-mini': 0.4, 'openai:o3': 2, 'openai:o4-mini': 1.1,
        'anthropic:claude-sonnet-4-20250514': 3, 'anthropic:claude-3-5-haiku-20241022': 0.8, 'anthropic:claude-3-5-sonnet-20241022': 3,
        'google:gemini-2.5-pro': 1.25, 'google:gemini-2.5-flash': 0.3,
        'qwen:qwen-plus': 0.4, 'qwen:qwen-max': 2.4, 'qwen:qwen-turbo': 0.3,
        'zhipu:glm-4': 0.2, 'zhipu:glm-4-air': 0.06,
        'moonshot:moonshot-v1-8k': 0.6, 'moonshot:moonshot-v1-32k': 1.2, 'moonshot:moonshot-v1-128k': 6,
    },
    cacheRead: {
        'openai:*': 1.25, 'anthropic:*': 0.3, 'google:*': 0.1,
        'qwen:*': 0.1, 'zhipu:*': 0.05, 'moonshot:*': 0.1,
    },
    cacheWrite: {
        'openai:*': 2.5, 'anthropic:*': 3.75, 'google:*': 1.25,
        'qwen:*': 0.4, 'zhipu:*': 0.2, 'moonshot:*': 0.6,
    },
    output: {
        'openai:gpt-4o': 10, 'openai:gpt-4o-mini': 0.6, 'openai:gpt-4.1': 8, 'openai:gpt-4.1-mini': 1.6, 'openai:o3': 8, 'openai:o4-mini': 4.4,
        'anthropic:claude-sonnet-4-20250514': 15, 'anthropic:claude-3-5-haiku-20241022': 4, 'anthropic:claude-3-5-sonnet-20241022': 15,
        'google:gemini-2.5-pro': 10, 'google:gemini-2.5-flash': 2.5,
        'qwen:qwen-plus': 1.2, 'qwen:qwen-max': 9.6, 'qwen:qwen-turbo': 0.6,
        'zhipu:glm-4': 0.2, 'zhipu:glm-4-air': 0.06,
        'moonshot:moonshot-v1-8k': 0.6, 'moonshot:moonshot-v1-32k': 1.2, 'moonshot:moonshot-v1-128k': 6,
    },
};
/**
 * DeepSeek V4.1 Flash 的高峰规则（2026-09-10 起）。
 * 高峰 = 工作日 UTC 01:00–04:00 与 06:00–10:00（每周 35/168 小时），单价 ×2。
 */
const DEEPSEEK_PEAK = {
    multiplier: 2,
    windowsUtc: [[1, 4], [6, 10]],
    weekdaysOnly: true,
    note: '高峰时段 01:00–04:00 / 06:00–10:00 UTC（周一至周五）单价翻倍；其余为空闲价',
};
/**
 * 历史价格表（旧 → 新）。**只追加，不修改。**
 *
 * 数据来源：DeepSeek 开放平台定价公告与厂商定价页（见各版本 `source`）。
 */
export const PRICE_HISTORY = [
    {
        id: '2026-08-15',
        label: '基线（V4 Flash 0731 版）',
        effectiveFrom: '2026-08-15T00:00:00Z',
        effectiveTo: '2026-09-10T04:00:00Z',
        note: 'DeepSeek V4 Flash（0731）计价：输入 $0.22 / 缓存命中 $0.007 / 输出 $0.66；chat 与 reasoner 仍按旧价单列。',
        source: 'DeepSeek 开放平台定价页（V4 Flash 0731 价单）',
        peak: null,
        input: {
            ...OTHER_VENDORS.input,
            'deepseek:deepseek-chat': 0.27, 'deepseek:deepseek-reasoner': 0.55,
            'deepseek:deepseek-v4-flash': 0.22, 'deepseek:deepseek-v4-flash-vision-exp': 0.22,
        },
        cacheRead: {
            ...OTHER_VENDORS.cacheRead,
            'deepseek:*': 0.07, 'deepseek:deepseek-reasoner': 0.14, 'deepseek:deepseek-v4-flash': 0.007,
        },
        cacheWrite: {
            ...OTHER_VENDORS.cacheWrite,
            'deepseek:*': 0.27, 'deepseek:deepseek-reasoner': 0.55, 'deepseek:deepseek-v4-flash': 0.22,
        },
        output: {
            ...OTHER_VENDORS.output,
            'deepseek:deepseek-chat': 1.1, 'deepseek:deepseek-reasoner': 2.19,
            'deepseek:deepseek-v4-flash': 0.66,
        },
    },
    {
        id: '2026-09-10',
        label: 'V4.1 Flash 计价',
        effectiveFrom: '2026-09-10T04:00:00Z',
        effectiveTo: '2026-09-14T04:00:00Z',
        note: 'V4.1 Flash 上线（空闲价）：输入 $0.15 / 缓存命中 $0.003 / 输出 $0.60，高峰翻倍。' +
            '旧名 deepseek-v4-flash 与 *-vision-exp 仍可解析并按本价单计费；' +
            'deepseek-chat / deepseek-reasoner 对应 flash 的非思考/思考模式，同价。',
        source: 'DeepSeek 开放平台定价公告（2026-09-10 12:00 北京时间起执行）',
        peak: DEEPSEEK_PEAK,
        input: {
            ...OTHER_VENDORS.input,
            'deepseek:deepseek-flash': 0.15,
            'deepseek:deepseek-v4.1-flash': 0.15,
            'deepseek:deepseek-v4-flash': 0.15,
            'deepseek:deepseek-v4-flash-vision-exp': 0.15,
            'deepseek:deepseek-chat': 0.15, 'deepseek:deepseek-reasoner': 0.15,
        },
        cacheRead: {
            ...OTHER_VENDORS.cacheRead,
            'deepseek:*': 0.003, 'deepseek:deepseek-flash': 0.003, 'deepseek:deepseek-reasoner': 0.003,
        },
        cacheWrite: {
            ...OTHER_VENDORS.cacheWrite,
            'deepseek:*': 0.15, 'deepseek:deepseek-flash': 0.15, 'deepseek:deepseek-reasoner': 0.15,
        },
        output: {
            ...OTHER_VENDORS.output,
            'deepseek:deepseek-flash': 0.60,
            'deepseek:deepseek-v4.1-flash': 0.60,
            'deepseek:deepseek-v4-flash': 0.60,
            'deepseek:deepseek-v4-flash-vision-exp': 0.60,
            'deepseek:deepseek-chat': 0.60, 'deepseek:deepseek-reasoner': 0.60,
        },
    },
    {
        id: '2026-09-14',
        label: 'V4 Pro 并入 Flash 计费',
        effectiveFrom: '2026-09-14T04:00:00Z',
        effectiveTo: null,
        note: 'deepseek-v4-pro 的请求自动路由至 V4.1 Flash，并按 Flash 单价计费（V4.1 Pro 发布前一直如此）。' +
            '本版仅新增 pro 的价单，其余与 2026-09-10 相同。',
        source: 'DeepSeek 开放平台公告（2026-09-14 12:00 北京时间起路由）',
        peak: DEEPSEEK_PEAK,
        input: {
            ...OTHER_VENDORS.input,
            'deepseek:deepseek-flash': 0.15,
            'deepseek:deepseek-v4.1-flash': 0.15,
            'deepseek:deepseek-v4-flash': 0.15,
            'deepseek:deepseek-v4-flash-vision-exp': 0.15,
            'deepseek:deepseek-v4-pro': 0.15,
            'deepseek:deepseek-chat': 0.15, 'deepseek:deepseek-reasoner': 0.15,
        },
        cacheRead: {
            ...OTHER_VENDORS.cacheRead,
            'deepseek:*': 0.003, 'deepseek:deepseek-flash': 0.003, 'deepseek:deepseek-reasoner': 0.003,
        },
        cacheWrite: {
            ...OTHER_VENDORS.cacheWrite,
            'deepseek:*': 0.15, 'deepseek:deepseek-flash': 0.15, 'deepseek:deepseek-reasoner': 0.15,
        },
        output: {
            ...OTHER_VENDORS.output,
            'deepseek:deepseek-flash': 0.60,
            'deepseek:deepseek-v4.1-flash': 0.60,
            'deepseek:deepseek-v4-flash': 0.60,
            'deepseek:deepseek-v4-flash-vision-exp': 0.60,
            'deepseek:deepseek-v4-pro': 0.60,
            'deepseek:deepseek-chat': 0.60, 'deepseek:deepseek-reasoner': 0.60,
        },
    },
];
/** 解析版本生效时刻为毫秒。 */
function ms(iso) {
    return Date.parse(iso);
}
/** 返回 `timeMs` 时刻生效的价格表版本；早于最早版本时回退到最早版本。 */
export function tableAt(timeMs, history = PRICE_HISTORY) {
    let picked = history[0];
    for (const table of history) {
        if (ms(table.effectiveFrom) <= timeMs)
            picked = table;
        else
            break;
    }
    return picked;
}
/** 最新（当前生效）的价格表版本。 */
export function latestTable(history = PRICE_HISTORY) {
    return history[history.length - 1];
}
/** `timeMs` 是否落在该版本的高峰时段内。 */
export function isPeak(table, timeMs) {
    const rule = table.peak;
    if (rule === null)
        return false;
    const d = new Date(timeMs);
    if (rule.weekdaysOnly) {
        const day = d.getUTCDay();
        if (day === 0 || day === 6)
            return false;
    }
    const hour = d.getUTCHours() + d.getUTCMinutes() / 60;
    return rule.windowsUtc.some(([start, end]) => hour >= start && hour < end);
}
/**
 * 查单价：精确 `provider:model` → 通配 `provider:*`。
 * 未收录返回 undefined（调用方决定是否给"未收录"提示）。
 */
export function rateFor(table, kind, provider, model) {
    if (provider === null || model === null || provider === '' || model === '')
        return undefined;
    const row = table[kind];
    return row[`${provider}:${model}`] ?? row[`${provider}:*`];
}
/**
 * 算一次请求在**指定价格表版本**下的费用。
 * `timeMs` 只用于判断峰谷，不影响选表（选表由调用方用 `tableAt` 决定）。
 */
export function costUnder(table, usage, provider, model, timeMs) {
    const peak = isPeak(table, timeMs);
    const k = peak && table.peak !== null ? table.peak.multiplier : 1;
    const pIn = rateFor(table, 'input', provider, model);
    const pOut = rateFor(table, 'output', provider, model);
    const pCr = rateFor(table, 'cacheRead', provider, model);
    const pCw = rateFor(table, 'cacheWrite', provider, model);
    if (pIn === undefined || pOut === undefined)
        return { usd: 0, known: false, peak };
    const usd = (usage.inputTokens ?? 0) / 1e6 * pIn * k
        + (usage.cacheReadTokens ?? 0) / 1e6 * (pCr ?? pIn) * k
        + (usage.cacheWriteTokens ?? 0) / 1e6 * (pCw ?? pIn) * k
        + (usage.outputTokens ?? 0) / 1e6 * pOut * k;
    return { usd, known: true, peak };
}
/** 算一次请求的「当时价 / 现价」。 */
export function compareCost(usage, provider, model, timeMs, history = PRICE_HISTORY) {
    const chargedTable = tableAt(timeMs, history);
    const nowTable = latestTable(history);
    const charged = costUnder(chargedTable, usage, provider, model, timeMs);
    // 现价对比沿用同一时刻的峰谷判定，以隔离"价单变化"这一变量。
    const now = costUnder(nowTable, usage, provider, model, timeMs);
    return {
        usd: now.usd,
        known: charged.known || now.known,
        peak: charged.peak,
        chargedUsd: charged.usd,
        nowUsd: now.usd,
        chargedTable,
        nowTable,
        deltaUsd: now.usd - charged.usd,
        chargedKnown: charged.known,
    };
}
/** 需要对比"现价 vs 当时价"时，两版是否同一个（相同则无需展示差额）。 */
export function sameTableNumber(a, b) {
    return a.id === b.id;
}
/** 把版本压成快照（供 UI/其他插件读取）。 */
export function snapshot(table) {
    const models = new Set();
    for (const kind of ['input', 'output', 'cacheRead', 'cacheWrite']) {
        for (const key of Object.keys(table[kind]))
            models.add(key);
    }
    return {
        version: table.id,
        label: table.label,
        effectiveFrom: table.effectiveFrom,
        effectiveTo: table.effectiveTo,
        note: table.note,
        source: table.source,
        peakMultiplier: table.peak?.multiplier ?? null,
        peakNote: table.peak?.note ?? null,
        models: [...models].sort(),
    };
}
/** 全部版本（旧 → 新）的快照。 */
export function historySnapshot(history = PRICE_HISTORY) {
    return history.map(snapshot);
}
/** 当前版本号（UI 展示用）。 */
export function currentVersion(history = PRICE_HISTORY) {
    return latestTable(history).id;
}
