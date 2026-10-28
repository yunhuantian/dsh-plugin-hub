import { IconCordisPlugin, IconDownload, IconRefresh, IconSettings, IconUser, IconWarning } from './icons';
/**
 * StoreApp: the store's shell — left navigation + detail navigation.
 *
 * 0.2 起商店不再是一个自带遮罩的独立弹层：它作为**官方「插件」页里的一个 tab**
 * 内嵌渲染（`embedded`），外观沿用该页的 section / panel 语言，避免在一个设置页里
 * 弹出一个悬浮对话框那种突兀感。
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { viewStore, type RemoteApi } from './api';
import { Detail, StoreViewBody, type StoreView } from './views';

const NAV_KEYS: Array<{ key: StoreView; labelKey: string; icon?: ReactNode; gate?: string }> = [
  { key: 'discover', labelKey: 'nav.discover', icon: <IconCordisPlugin size={16} /> },
  { key: 'certified', labelKey: 'nav.certified', icon: <IconWarning size={16} /> },
  { key: 'modpack', labelKey: 'nav.modpack', icon: <IconDownload size={16} /> },
  // 以下三项由内建插件提供，插件关掉就没有入口（gate = HUB_PLUGINS 里的 id）。
  { key: 'wiki', labelKey: 'nav.wiki', icon: <IconWarning size={16} />, gate: 'baike' },
  { key: 'skill', labelKey: 'nav.skill', icon: <IconCordisPlugin size={16} />, gate: 'skill-store' },
  { key: 'installed', labelKey: 'nav.installed', icon: <IconRefresh size={16} /> },
  { key: 'extensions', labelKey: 'nav.extensions', icon: <IconSettings size={16} /> },
  { key: 'health', labelKey: 'nav.health', icon: <IconWarning size={16} />, gate: 'health' },
  { key: 'publish', labelKey: 'nav.publish', icon: <IconUser size={16} /> },
  { key: 'scaffold', labelKey: 'nav.scaffold', icon: <IconUser size={16} /> },
  { key: 'audit', labelKey: 'nav.audit', icon: <IconUser size={16} /> },
  { key: 'settings', labelKey: 'nav.settings', icon: <IconSettings size={16} /> },
];

export function StoreApp({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const [view, setViewState] = useState<StoreView>(() => viewStore.getSnapshot());
  const [detailName, setDetailName] = useState<string | null>(null);
  const [changedTick, setChangedTick] = useState(0);
  /**
   * 内建插件是否在跑。`null` = 还没问到 / 问失败 —— 此时**不隐藏任何入口**，
   * 免得接口抖一下就把功能藏起来。
   */
  const [gates, setGates] = useState<Record<string, boolean> | null>(null);

  useEffect(() => viewStore.subscribe(() => setViewState(viewStore.getSnapshot())), []);

  useEffect(() => {
    let cancelled = false;
    void api.extensions()
      .then((snap) => {
        if (cancelled) return;
        const map: Record<string, boolean> = {};
        for (const row of snap.rows) map[row.id] = row.runnable;
        setGates(map);
      })
      .catch(() => { if (!cancelled) setGates(null); });
    return () => { cancelled = true; };
  }, [api, changedTick]);

  // 当前视图所属插件被关掉（或依赖没开）时退回「发现」，避免停在空页面。
  useEffect(() => {
    if (gates === null) return;
    const item = NAV_KEYS.find((n) => n.key === view);
    if (item?.gate !== undefined && gates[item.gate] === false) {
      setViewState('discover');
      viewStore.set('discover');
    }
  }, [gates, view]);

  // cross-view navigation: dependency graph nodes and installed rows open details
  useEffect(() => {
    const onNavigate = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (name) setDetailName(name);
    };
    window.addEventListener('dps-navigate', onNavigate);
    return () => window.removeEventListener('dps-navigate', onNavigate);
  }, []);

  const openDetail = useCallback((name: string) => setDetailName(name), []);
  const onChanged = useCallback(() => setChangedTick((n) => n + 1), []);
  const NAV = NAV_KEYS
    .filter((n) => n.gate === undefined || gates === null || gates[n.gate] !== false)
    .map((n) => ({ ...n, label: t(n.labelKey) }));

  return (
    <div className="dps-panel dps-panel-tabs">
      {/* 0.2.7：不再用左侧竖排导航。所有区块都是「发现」这一页里的标签，
          少一列 176px 的竖栏，内容区更宽，视线也不用左右来回跳。 */}
      <div className="dps-topbar">
        <div className="dps-topbar-head">
          <span className="dps-header-title">{detailName ? t('app.detail') : NAV.find((n) => n.key === view)?.label}</span>
        </div>
        <nav className="dps-topnav" role="tablist" aria-label={t('nav.discover')}>
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={view === item.key && !detailName}
              className={`dps-topnav-cell${view === item.key && !detailName ? ' active' : ''}`}
              onClick={() => { setViewState(item.key); viewStore.set(item.key); setDetailName(null); }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="dps-body">
        {detailName ? (
          <Detail
            key={`detail-${detailName}-${changedTick}`}
            api={api}
            packageName={detailName}
            onBack={() => setDetailName(null)}
            onChanged={onChanged}
            t={t}
            gates={gates ?? undefined}
          />
        ) : (
          <StoreViewBody view={view} api={api} onOpen={openDetail} onChanged={onChanged} t={t} />
        )}
      </div>
    </div>
  );
}
