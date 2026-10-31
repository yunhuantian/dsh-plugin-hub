export declare const name = "dsh-plugin-hub/extensions/usage";
export declare const provide: string[];
/**
 * ⚠️ 只声明**本模块真的会读**的服务。cordis 的 fiber inject 是硬依赖：
 * 少写一个服务名 → `ctx.x` 直接抛 "cannot get property without inject"；
 * 多写一个不存在的 → 整个条目 pending/失败。
 * `systemPrompt` / `tools` / `sessionProjections` 都是 dsh-base 的 core 行。
 */
export declare const inject: string[];
export declare function apply(ctx: any): void;
declare const _default: {
    name: string;
    provide: string[];
    inject: string[];
    apply: typeof apply;
};
export default _default;
