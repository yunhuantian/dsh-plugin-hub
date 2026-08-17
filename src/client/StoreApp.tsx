/**
 * StoreApp: the full-store modal shell — overlay + panel + left navigation +
 * detail navigation — rendered via a portal so it floats above the Harness UI
 * exactly like the native settings dialog.
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { IconCloseOutline16, IconCordisPluginOutline14, IconRefreshOutline16, IconSettingsOutline16, IconUserOutline16, IconWarningOutline16 } from '@deepseek-ai/dsh-client-ui-primitives';
import { closeStore, openStoreStore, viewStore, type RemoteApi } from './api';
import { Detail, StoreViewBody, type StoreView } from './views';

const NAV_KEYS: Array<{ key: StoreView; labelKey: string; icon?: ReactNode }> = [
  { key: 'discover', labelKey: 'nav.discover', icon: <IconCordisPluginOutline14 size={16} /> },
  { key: 'wiki', labelKey: 'nav.wiki', icon: <IconWarningOutline16 size={16} /> },
  { key: 'skill', labelKey: 'nav.skill', icon: <IconCordisPluginOutline14 size={16} /> },
  { key: 'installed', labelKey: 'nav.installed', icon: <IconRefreshOutline16 size={16} /> },
  { key: 'health', labelKey: 'nav.health', icon: <IconWarningOutline16 size={16} /> },
  { key: 'publish', labelKey: 'nav.publish', icon: <IconUserOutline16 size={16} /> },
  { key: 'scaffold', labelKey: 'nav.scaffold', icon: <IconUserOutline16 size={16} /> },
  { key: 'audit', labelKey: 'nav.audit', icon: <IconUserOutline16 size={16} /> },
  { key: 'settings', labelKey: 'nav.settings', icon: <IconSettingsOutline16 size={16} /> },
];

function useSyncExternalStoreShim<T>(store: { getSnapshot: () => T; subscribe: (l: () => void) => () => void }): T {
  const [value, setValue] = useState(store.getSnapshot);
  useEffect(() => store.subscribe(() => setValue(store.getSnapshot())), [store]);
  return value;
}

export function StoreApp({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const open = useSyncExternalStoreShim(openStoreStore);
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeStore();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  const openDetail = useCallback((name: string) => setDetailName(name), []);
  const onChanged = useCallback(() => setChangedTick((n) => n + 1), []);
  const NAV = NAV_KEYS.map((n) => ({ ...n, label: t(n.labelKey) }));

  return createPortal(
    <div className="dps-overlay" role="dialog" aria-modal="true" aria-label={t('app.title')}>
      <div className="dps-mask" onClick={closeStore} />
      <div className="dps-panel">
        <div className="dps-nav">
          <div className="dps-nav-title">{t('app.title')}</div>
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
          <div className="dps-nav-foot">
            <button type="button" className="dps-icon-btn" onClick={closeStore} aria-label={t('app.close')}>×</button>
          </div>
        </div>
        <div className="dps-content">
          <div className="dps-header">
            <span className="dps-header-title">{detailName ? t('app.detail') : NAV.find((n) => n.key === view)?.label}</span>
            <div className="dps-actions">
              <button type="button" className="dps-close" onClick={closeStore} aria-label={t('app.close')}><IconCloseOutline16 size={16} /></button>
            </div>
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
    </div>,
    document.body,
  );
}
