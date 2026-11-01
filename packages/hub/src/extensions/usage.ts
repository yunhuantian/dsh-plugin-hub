/**
 * 内建插件 · `usage_report` —— insight 组。
 *
 * 目的：让 **DeepSeek 自己看见花了多少钱**，而不只是让人在「用量」tab 里看图。
 *
 * 三件事：
 *   1. `ctx.tools.register(usage_report)` —— 模型可以主动查当前会话（或本次运行）
 *      的累计花费、按模型分布、当前单价，以及"这次调用自身"的用量；
 *   2. `systemPrompt` 里挂一小段 **运行时上下文**（不是 prompt section，见下文），
 *      每步自动带上累计已花金额 —— 模型不必主动查也能知道量级；
 *   3. 提供 `usagePricing` 服务（与扩展 `usage.ts` 同名的服务在它关闭时仍可用），
 *      让其它插件复用同一份价格表。
 *
 * 为什么上下文用 `systemPrompt.context()` 而不是 `section()`：
 * 上下文每步重新求值（`refreshContext`），金额随请求推进而更新；section 的文本
 * 只在装配时求值一次，会把一个**过时的**金额写进提示词，比不写更糟。
 *
 * 为什么金额只放"一句话"：
 * 这段文本每一步都会进请求，属于**长期成本**。只写累计金额 + 未收录笔数，
 * 细节留给工具按需取 —— 模型一查就有，不查也不烧 token。
 */
import { fmtUsd, historySnapshot, latestTable } from '../contracts/pricing.js';
import { currentTableId, summarizeLedger, type SessionLedger } from '../host/usage-ledger.js';
import { averageRequestUsd, sharedLedgerReader } from '../host/usage-reader.js';
import { activate, note } from './_runtime.js';

const ID = 'usage';

export const name = 'dsh-plugin-hub/extensions/usage';
export const provide = ['usagePricing'];
/**
 * ⚠️ 只声明**本模块真的会读**的服务。cordis 的 fiber inject 是硬依赖：
 * 少写一个服务名 → `ctx.x` 直接抛 "cannot get property without inject"；
 * 多写一个不存在的 → 整个条目 pending/失败。
 * `systemPrompt` / `tools` / `sessionProjections` 都是 dsh-base 的 core 行。
 */
export const inject = ['tools', 'systemPrompt', 'sessionProjections'];

/** 工具名：模型侧可见的稳定名字，改它等于破坏用户既有习惯。 */
const TOOL_NAME = 'usage_report';

/** `render` 收到的结果形状（只声明渲染用到的字段）。 */
interface ReportValue {
  summary: string;
  at_today_price_usd: number;
  price_version: string;
  unpriced_requests: number;
}

/**
 * 累计金额的读取（取会话 → 折账本 → 缓存）由 `host/usage-reader` 提供；
 * 这里只消费。缓存键是 `(session, 事件数)`，因此工具与系统提示在同一步里
 * 拿到的是同一次折叠 —— 不会一边 $0.12 一边 $0.13。
 */
const { ledgerOf } = sharedLedgerReader;

/** 模型侧看到的单价表（只列当前版本里 DeepSeek 自己的价，避免长表格）。 */
function rateSummary(): string {
  const table = latestTable();
  const lines: string[] = [];
  for (const key of Object.keys(table.input).sort()) {
    if (!key.startsWith('deepseek:')) continue;
    if (key.endsWith(':*')) continue;
    const model = key.slice('deepseek:'.length);
    const pin = table.input[key];
    const pout = table.output[key];
    if (pin === undefined || pout === undefined) continue;
    const pcr = table.cacheRead[key] ?? table.cacheRead['deepseek:*'] ?? 0;
    lines.push(`- ${model}: 输入 $${pin}/M，缓存命中 $${pcr}/M，输出 $${pout}/M`);
  }
  const peak = table.peak === null ? '' : `；高峰（工作日 01–04 / 06–10 UTC）×${table.peak.multiplier}`;
  return [`价格表 v${table.id}（${table.label}）${peak}`, ...lines].join('\n');
}

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    // ── 1. 给模型的工具 ────────────────────────────────────────────────────
    ctx.tools.register({
      name: TOOL_NAME,
      description:
        'Report how much money this session has spent so far, from the provider usage recorded in the session log '
        + 'and the versioned price table. Use it when the user asks about cost, token spend, or budget — do not guess '
        + 'prices yourself. Returns: totals in USD (charged at the price table in force at request time, plus what the '
        + 'same usage would cost today), per-model breakdown, the current unit prices, and whether any requests were '
        + 'unpriced.',
      // ⚠️ `parameters` 必须是**完整 JSON Schema**（显式 object 根），
      //    因为这里用的是 `ctx.tools.register()`，不是 `defineTool()`。
      //
      // 两条路径的差别是致命的，别再搞反：
      //
      //   · `tools.defineTool(def)` —— 收**属性映射** `{ name: {type,...} }`，
      //     内部 `parameterSchemaSpecToJsonSchema()` 无条件补上
      //     `{ type:'object', properties }`，所以裸映射是合法的。
      //   · `tools.register(def)` —— **原样存** definition，不做任何编译，
      //     只校验 `output.schema`。宿主往外发时按
      //     `spec.properties ?? ...` 取值，裸映射里没有 `properties` 键，
      //     于是取到 undefined → 序列化成 `"type": null` → 服务端拒绝
      //     **整个请求**（不是只拒绝这个工具）：
      //
      //       Invalid schema for function 'usage_report':
      //       schema must be a JSON Schema of 'type: "object"', got 'type: null'.
      //
      // 0.2.8 之前这里写的就是裸属性映射。当年的「验证」只跑了
      // `defineTool` 那条路（它会把根补全），所以一直显示"没问题" —— 真正的
      // 注册路径根本没被覆盖。现在 `check:contract` 同时验两条路的产物。
      parameters: {
        type: 'object',
        properties: {
          scope: {
            type: 'string',
            enum: ['session', 'last_request'],
            description: 'session (default) = whole session; last_request = the most recent completed request only.',
          },
          include_rates: {
            type: 'boolean',
            description: 'Include the current unit-price table for DeepSeek models. Default true.',
          },
        },
      },
      // ⚠️ 输出 schema 的规则（实测，比文档严得多）：
      //
      //   `assertSupportedJsonSchema` 只认标准关键字，而 `required: true`
      //   写在**任何**节点上都不合法（叶子属性上同样报错）：
      //
      //     schema.properties.summary.required is not supported on type "string"
      //
      //   **结论：output.schema 一个 required 都不要写。** 必填性对渲染没有
      //   影响（render 只读字段），对模型也没有意义（输出不走参数校验）。
      //
      // 0.2.8 首版先把它写在 tokens(object)/models(array) 上，修掉后又留在叶子
      // 属性上，两次都是同一个坑：**整个 usage 扩展装配失败 → 用量页黑屏**，
      // 而界面上一个字都不说为什么。现在 `npm run check:contract` 会用宿主
      // app.asar 里的真 SDK 跑一遍 `assertSupportedJsonSchema`，直接拦住。
      output: {
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            summary: { type: 'string' },
            currency: { type: 'string' },
            charged_usd: { type: 'number' },
            at_today_price_usd: { type: 'number' },
            price_version: { type: 'string' },
            requests: { type: 'integer' },
            unpriced_requests: { type: 'integer' },
            average_request_usd: { type: 'number' },
            tokens: {
              type: 'object',
              additionalProperties: false,
              properties: {
                uncached_input: { type: 'integer' },
                cache_read: { type: 'integer' },
                output: { type: 'integer' },
              },
            },
            models: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  model: { type: 'string' },
                  requests: { type: 'integer' },
                  charged_usd: { type: 'number' },
                  priced: { type: 'boolean' },
                },
              },
            },
            rates: { type: 'string' },
          },
        },
        render: (_args: unknown, value: ReportValue) => [{
          type: 'text',
          text: [
            value.summary,
            `今日价折算 ${value.at_today_price_usd.toFixed(4)} USD（价格表 v${value.price_version}）`,
            value.unpriced_requests > 0 ? `注意：${value.unpriced_requests} 次请求的模型未收录单价，未计入金额。` : '',
          ].filter((line) => line !== '').join('\n'),
        }],
      },
      execute(args: { scope?: string; include_rates?: boolean }, exec: any) {
        const session = exec?.agent?.session ?? null;
        const ledger = ledgerOf(session);
        if (ledger === null) {
          return Promise.resolve({
            summary: '当前没有可读的会话，无法统计花费。',
            currency: 'USD',
            charged_usd: 0,
            at_today_price_usd: 0,
            price_version: currentTableId(),
            requests: 0,
            unpriced_requests: 0,
            average_request_usd: 0,
            tokens: { uncached_input: 0, cache_read: 0, output: 0 },
            models: [],
            ...(args.include_rates === false ? {} : { rates: rateSummary() }),
          });
        }

        const lastOnly = args.scope === 'last_request';
        const avg = averageRequestUsd(ledger);
        const t = ledger.totals;
        const charged = lastOnly && ledger.entries.length > 0 ? ledger.entries[ledger.entries.length - 1].chargedUsd : t.chargedUsd;
        const now = lastOnly && ledger.entries.length > 0 ? ledger.entries[ledger.entries.length - 1].nowUsd : t.nowUsd;

        return Promise.resolve({
          summary: lastOnly
            ? `最近一次请求：${fmtUsd(charged)}（会话累计 ${fmtUsd(t.chargedUsd)}）`
            : summarizeLedger(ledger),
          currency: 'USD',
          charged_usd: Number(charged.toFixed(6)),
          at_today_price_usd: Number(now.toFixed(6)),
          price_version: currentTableId(),
          requests: lastOnly ? Math.min(1, ledger.entries.length) : t.requests,
          unpriced_requests: t.requests - t.priced,
          average_request_usd: Number(avg.usd.toFixed(6)),
          tokens: {
            uncached_input: t.uncachedInput,
            cache_read: t.cacheRead,
            output: t.output,
          },
          models: ledger.models.map((m) => ({
            model: m.model ?? '(未记录)',
            requests: m.requests,
            charged_usd: Number(m.chargedUsd.toFixed(6)),
            priced: m.known,
          })),
          ...(args.include_rates === false ? {} : { rates: rateSummary() }),
        });
      },
      presentCall(args: { scope?: string }) {
        return {
          card: 'generic',
          title: args.scope === 'last_request' ? 'Usage: last request' : 'Usage: session spend',
          kind: 'other',
        };
      },
    });

    // ── 2. 每步自动带上的一句话（运行时上下文，不是静态 section）──────────
    try {
      ctx.systemPrompt.context({
        name: 'plugin-hub:usage',
        order: 220, // 紧跟在 WEB_SURFACE(210) 之后：属于"运行环境事实"这一类
        // ⚠️ 作用域兜底：上下文是在**每个 agent 的 scope** 里求值的，但个别版本的
        //    调用方未必传 `scope`。求不到会话就返回空串（空上下文会被丢弃），
        //    绝不能让这里抛错 —— 抛错会打断整条装配，等于把工具也一起废掉。
        text: (assembly: any) => {
          const scoped = assembly?.scope?.agent ?? assembly?.agent ?? null;
          const session = scoped?.session ?? null;
          const ledger = ledgerOf(session);
          if (ledger === null || ledger.totals.requests === 0) return '';
          const t = ledger.totals;
          const unpriced = t.requests - t.priced;
          const parts = [
            `本会话已花 ${fmtUsd(t.chargedUsd)}（${t.requests} 次模型请求，按请求当时的价格表 v${currentTableId()} 计价）。`,
          ];
          if (unpriced > 0) parts.push(`其中 ${unpriced} 次因模型未收录单价未计入。`);
          parts.push(`用户问到费用时调用 ${TOOL_NAME} 取准确数字，不要自行估算。`);
          return parts.join('');
        },
      });
    } catch (error) {
      // 上下文挂不上不影响工具本身 —— 工具才是主路径。
      note(ID, `运行时上下文未挂载：${error instanceof Error ? error.message : String(error)}`);
    }

    // ── 3. 服务：价格表只读入口（供其它插件复用）──────────────────────────
    ctx.provide('usagePricing', () => ({
      /** 当前生效的价格表版本号（如 2026-09-14）。 */
      currentVersion: () => latestTable().id,
      /** 全部价格表版本（旧 → 新）的快照。 */
      history: () => historySnapshot(),
      /** 某会话的累计花费（USD）；读不到会话返回 null。 */
      sessionSpend: (session: any) => {
        const ledger = ledgerOf(session);
        return ledger === null ? null : { chargedUsd: ledger.totals.chargedUsd, requests: ledger.totals.requests };
      },
      ready: true,
    }));

    const table = latestTable();
    note(ID, `价格表 ${table.id}（${table.label}），工具 ${TOOL_NAME} 已注册`);
  });
}

export default { name, provide, inject, apply };
