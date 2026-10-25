export declare const inject: string[];
/**
 * Mount the Remote contribution and register the native integration points.
 */
export declare function apply(ctx: any): Promise<() => Promise<void>>;
declare const _default: {
    apply: typeof apply;
    inject: string[];
};
export default _default;
