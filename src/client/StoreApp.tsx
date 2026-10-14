import { IconCordisPlugin, IconRefresh, IconSettings, IconUser, IconWarning } from './icons';
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

const NAV_KEYS: Array<{ key: StoreView; labelKey: string; icon?: ReactNode }> = [
  { key: 'discover', labelKey: 'nav.discover', icon: <IconCordisPlugin size={16} /> },
  { key: 'wiki', labelKey: 'nav.wiki', icon: <IconWarning size={16} /> },
  { key: 'skill', labelKey: 'nav.skill', icon: <IconCordisPlugin size={16} /> },
  { key: 'installed', labelKey: 'nav.installed', icon: <IconRefresh size={16} /> },
  { key: 'extensions', labelKey: 'nav.extensions', icon: <IconSettings size={16} /> },
  { key: 'health', labelKey: 'nav.health', icon: <IconWarning size={16} /> },
  { key: 'publish', labelKey: 'nav.publish', icon: <IconUser size={16} /> },
  { key: 'scaffold', labelKey: 'nav.scaffold', icon: <IconUser size={16} /> },
  { key: 'audit', labelKey: 'nav.audit', icon: <IconUser size={16} /> },
  { key: 'settings', labelKey: 'nav.settings', icon: <IconSettings size={16} /> },
];

export function StoreApp({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const [view, setViewState] = useState<StoreView>(() => viewStore.getSnapshot());
  const [detailName, setDetailName] = useState<string | null>(null);
  const [changedTick, setChangedTick] = useState(0);

  useEffect(() => viewStore.subscribe(() => setViewState(viewStore.getSnapshot())), []);

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
  const NAV = NAV_KEYS.map((n) => ({ ...n, label: t(n.labelKey) }));

  return (
    <div className="dps-panel">
      <div className="dps-nav">
        <nav className="dps-nav-list" aria-label={t('nav.discover')}>
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`dps-nav-cell${view === item.key && !detailName ? ' active' : ''}`}
              onClick={() => { setViewState(item.key); viewStore.set(item.key); setDetailName(null); }}
            >
              {item.icon}
              <span className="dps-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="dps-content">
        <div className="dps-header">
          <span className="dps-header-title">{detailName ? t('app.detail') : NAV.find((n) => n.key === view)?.label}</span>
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
            />
          ) : (
            <StoreViewBody view={view} api={api} onOpen={openDetail} onChanged={onChanged} t={t} />
          )}
        </div>
      </div>
    </div>
  );
}
