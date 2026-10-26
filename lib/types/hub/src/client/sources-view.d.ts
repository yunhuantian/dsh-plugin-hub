/**
 * 商店的「来源」层：自动识别 / 认证列表 / 整合包。
 *
 * 三个视图共用同一份注册表（`list_sources`），区别只在容器类型与来源性质：
 *  - 自动识别：kind=0，任意来源（内置爬取 + 用户添加的列表 + 自动爬取）
 *  - 认证列表：kind=0 且 provenance=certified
 *  - 整合包：kind=1（只在这里读取，商店不识别）
 *
 * 组件刻意**不 import views.tsx**：内置爬取的网格由调用方以 `renderBuiltin`
 * 传入，避免两个视图文件互相引用成环。
 */
import { type ReactNode } from 'react';
import type { RemoteApi } from './api';
interface CommonProps {
    api: RemoteApi;
    t: (key: string) => string;
    onChanged: () => void;
    /** 条目在镜像库里时，可以跳到商店的完整详情页。 */
    onOpenPlugin?: (name: string) => void;
}
/** 自动识别：内置爬取 + 任意来源的列表。 */
export declare function AutoZone({ api, t, onChanged, onOpenPlugin, renderBuiltin }: CommonProps & {
    renderBuiltin: () => ReactNode;
}): ReactNode;
/** 认证列表：只有签发记录（provenance=certified）的列表。 */
export declare function CertifiedZone({ api, t, onChanged, onOpenPlugin }: CommonProps): ReactNode;
export declare function ModpackZone({ api, t, onChanged, onOpenPlugin }: CommonProps): ReactNode;
export {};
