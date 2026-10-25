import { IconCordisPlugin } from './icons';
/**
 * 内置扩展开关视图（hub 的一个内部导航项）。
 *
 * 原来是独立的 `settings.section` 设置页，四段：操作者 / GitHub Token /
 * 镜像同步 / 扩展开关。0.2 起商店整体融进官方「插件」页，那个独立设置页不再注册
 * —— 免得界面上出现「一个额外插件」的痕迹；其中 Token 与镜像同步在商店自己的
 * 「设置」视图里本来就有，只有**扩展开关**是这里独有的，所以单独拆出来。
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type { ExtensionRow, ExtensionsSnapshot, RemoteApi } from './api';

export function ExtensionsView({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const [extensions, setExtensions] = useState<ExtensionsSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setExtensions(await api.extensions());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [api]);

  useEffect(() => { void refresh(); }, [refresh]);

  /** 开关一个内置扩展：写开关文件，扩展在下次启动时读取。 */
  const toggleExtension = async (id: string, next: boolean) => {
    setBusy(`ext:${id}`);
    setNotice(null);
    try {
      const r = await api.extensionSet(id, next);
      setNotice(r.ok ? `${r.message}${r.detail ? `（${r.detail}）` : ''}` : null);
      setError(r.ok ? null : r.message);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  /** 插件上报阶段 → 展示用标签（含"依赖阻塞"与"开了但没起来"的区分）。 */
  const phaseChip = (row: ExtensionRow): { text: string; cls: string } => {
    if (!row.enabled) return { text: t('settings.stateOff'), cls: 'off' };
    if (row.loaderPhase === 'failed' || row.phase === 'failed') return { text: t('settings.stateLoadFailed'), cls: 'off' };
    if (row.blockedBy.length > 0 || row.phase === 'blocked') return { text: t('settings.stateBlocked'), cls: 'blocked' };
    if (row.phase === 'active') return { text: t('settings.stateRunning'), cls: '' };
    if (row.loaderPhase === null) return { text: t('settings.stateNotLoaded'), cls: 'pending' };
    return { text: t('settings.statePending'), cls: 'pending' };
  };

  return (
    <div className="dps-settings-native">
      {error && (
        <div className="dps-error" role="alert">
          <span className="dps-error-text">{error}</span>
          <button type="button" className="dps-icon-btn" onClick={() => setError(null)} aria-label={t('app.close')}>×</button>
        </div>
      )}
      {notice && <div className="dps-notice">{notice}</div>}

      <section className="dps-section">
        <h4 className="dps-section-title"><IconCordisPlugin size={15} /> {t('settings.builtinTitle')}</h4>
        <p className="dps-hint">
          {t('settings.builtinIntroA')}<strong>{t('settings.builtinIntroStrong1')}</strong>{t('settings.builtinIntroC')}<strong>{t('settings.builtinIntroStrong2')}</strong>{t('settings.builtinIntroE')}
          {extensions && <>{t('settings.priceVersionBefore')}<code>v{extensions.currentPriceVersion}</code>{t('settings.priceVersionAfter')}</>}
        </p>
        {extensions && (
          <div className="dps-ext-summary">
            {t('settings.tallyBefore')}<strong>{extensions.pluginCount}</strong>{t('settings.tallyAfterTotal')}<strong>{extensions.activeCount}</strong>{t('settings.tallyOff')}{extensions.rows.filter((r) => !r.enabled).length}{t('settings.tallyBlocked')}{extensions.rows.filter((r) => r.enabled && r.blockedBy.length > 0).length}
          </div>
        )}
        {(extensions?.groups ?? []).map((group) => {
          const rows = (extensions?.rows ?? []).filter((r) => r.group === group.id).sort((a, b) => a.order - b.order);
          if (rows.length === 0) return null;
          const running = rows.filter((r) => r.phase === 'active').length;
          return (
            <div className="dps-ext-group" key={group.id}>
              <div className="dps-ext-group-head">
                <span className="dps-ext-group-name">{group.name}</span>
                <span className="dps-ext-en">{group.nameEn}</span>
                <span className="dps-ext-group-count">{running}/{rows.length}{t('settings.runningSuffix')}</span>
              </div>
              <p className="dps-hint">{group.description}</p>
              <div className="dps-ext-list">
                {rows.map((row) => {
                  const chip = phaseChip(row);
                  const blocked = row.enabled && row.blockedBy.length > 0;
                  return (
                    <div className="dps-ext-row" key={row.id}>
                      <div className="dps-ext-main">
                        <div className="dps-ext-title">
                          <span>{row.name}</span>
                          <span className="dps-ext-en">{row.nameEn}</span>
                          <span className={`dps-state-chip ${chip.cls}`}>{chip.text}</span>
                        </div>
                        <p className="dps-ext-desc">{row.description}</p>
                        <p className="dps-ext-meta">
                          <code>{row.entry}</code>
                          {row.service !== null && <>{t('settings.serviceLabel')}<code>{row.service}</code></>}
                          {row.ui !== null && <>{t('settings.uiLabel')}{row.ui}</>}
                        </p>
                        {(row.requires.length > 0 || row.dependents.length > 0) && (
                          <p className="dps-ext-deps">
                            {row.requires.length > 0 && (
                              <>
                                <span>{t('settings.dependsOn')}</span>
                                {row.requires.map((dep) => (
                                  <span key={dep} className={`dps-dep-tag${row.blockedBy.some((b) => b.id === dep) ? ' missing' : ''}`}>{dep}</span>
                                ))}
                              </>
                            )}
                            {row.dependents.length > 0 && (
                              <>
                                <span>{t('settings.requiredBy')}</span>
                                {row.dependents.map((d) => (
                                  <span key={d.id} className="dps-dep-tag" title={d.name}>{d.id}</span>
                                ))}
                              </>
                            )}
                          </p>
                        )}
                        {row.detail !== '' && <p className="dps-ext-meta">{row.detail}</p>}
                      </div>
                      <button
                        type="button"
                        className={`dps-btn${row.enabled ? '' : ' dps-btn-primary'}`}
                        disabled={busy === `ext:${row.id}`}
                        title={blocked ? t('settings.blockedTooltip') : undefined}
                        onClick={() => void toggleExtension(row.id, !row.enabled)}
                      >
                        {row.enabled ? t('settings.turnOff') : t('settings.turnOn')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {extensions === null && <p className="dps-hint">{t('settings.builtinLoading')}</p>}
        <p className="dps-hint">{t('settings.switchesBefore')}<code>storages/plugin-store/plugins.json</code>{t('settings.switchesMiddle')}<strong>{t('settings.switchesStrong')}</strong>{t('settings.switchesAfter')}</p>
      </section>
    </div>
  );
}
