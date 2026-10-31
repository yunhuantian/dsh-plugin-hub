export declare const name = "dsh-plugin-hub/extensions/diagnostics";
export declare const provide: string[];
/**
 * 不硬依赖任何服务：诊断读的都是 host 侧文件/数据库，会话只是**可选的**补充
 * （有就带上花费，没有就少一节）。硬 inject 一个服务会让"该服务不可用"变成
 * "诊断不可用" —— 而恰恰是那种时候最需要诊断。
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
