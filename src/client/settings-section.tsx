/**
 * Native Settings page for the plugin store: operator identity (audit
 * attribution), GitHub private token, mirror-sync schedule + manual sync, and
 * a shortcut back into the store. Registered into the `settings.section` slot
 * so it renders inside the Harness Settings panel like any native section.
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { IconCordisPluginOutline14, IconRefreshOutline16, IconSettingsOutline16, IconUserOutline16, IconWarningOutline16 } from '@deepseek-ai/dsh-client-ui-primitives';
import { actorDisplay, formatDate, getActor, setActor as persistActor, type ExtensionRow, type ExtensionsSnapshot, type RemoteApi } from './api';

interface SectionProps {
  api: RemoteApi;
  openStore: () => void;
  close?: () => void;
  /** Bound to the `pluginStore` namespace by `apply()`, exactly as the
   *  sidebar entry receives it. */
  t: (k: string) => string;
}

export function StoreSettingsSection({ api, openStore, t }: SectionProps): ReactNode {
  const [settings, setSettings] = useState<Awaited<ReturnType<RemoteApi['settings']>> | null>(null);
  const [status, setStatus] = useState<Awaited<ReturnType<RemoteApi['syncStatus']>> | null>(null);
  const [extensions, setExtensions] = useState<ExtensionsSnapshot | null>(null);
  const [token, setToken] = useState('');
  const [hours, setHours] = useState('24');
  const [actor, setActorName] = useState(actorDisplay());
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [s, st, ext] = await Promise.all([api.settings(), api.syncStatus(), api.extensions()]);
      setSettings(s);
      setStatus(st);
      setExtensions(ext);
      setHours(String(st.scheduleHours));
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [api]);

  useEffect(() => { void refresh(); }, [refresh]);

  useEffect(() => {
    if (status?.state !== 'syncing') return;
    const id = window.setInterval(() => { void refresh(); }, 1500);
    return () => window.clearInterval(id);
  }, [status?.state, refresh]);

  const saveToken = async () => {
    setBusy('token');
    setNotice(null);
    try {
      const r = await api.setGithubToken(token, getActor());
      if (r.ok) { setToken(''); setNotice(r.message); await refresh(); } else setError(r.message);
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(null); }
  };

  const clearToken = async () => {
    setBusy('token');
    try {
      const r = await api.clearGithubToken(getActor());
      setNotice(r.ok ? r.message : null);
      setError(r.ok ? null : r.message);
      await refresh();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(null); }
  };

  const saveSchedule = async () => {
    setBusy('schedule');
    try {
      const r = await api.setSchedule(Number(hours), getActor());
      setNotice(r.ok ? r.message : null);
      setError(r.ok ? null : r.message);
      await refresh();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(null); }
  };

  const syncNow = async () => {
    setBusy('sync');
    setNotice(null);
    try {
      const r = await api.syncNow();
      setError(r.ok ? null : r.message);
      setNotice(r.ok ? r.message : null);
      await refresh();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(null); }
  };

  const saveActor = () => {
    persistActor(actor);
    setNotice(t('settings.actorSaved'));
  };

  /** 开关一个内置扩展：写开关文件，扩展在下次启动时读取。 */
  const toggleExtension = async (id: string, next: boolean) => {
    setBusy(`ext:${id}`);
    setNotice(null);
    try {
      const r = await api.extensionSet(id, next);
      setNotice(r.ok ? `${r.message}${r.detail ? `（${r.detail}）` : ''}` : null);
      setError(r.ok ? null : r.message);
      await refresh();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(null); }
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
      <div className="dps-native-hero">
        <IconCordisPluginOutline14 size={18} />
        <span>{t('settings.title')}</span>
        <button type="button" className="dps-btn dps-btn-sm dps-btn-primary" onClick={openStore}>{t('settings.open')}</button>
      </div>
      {error && <div className="dps-error" role="alert"><IconWarningOutline16 size={16} /><span className="dps-error-text">{error}</span><button type="button" className="dps-icon-btn" onClick={() => setError(null)} aria-label={t('app.close')}>×</button></div>}
      {notice && <div className="dps-notice">{notice}</div>}

      <section className="dps-section">
        <h4 className="dps-section-title"><IconUserOutline16 size={15} /> {t('settings.operator')}</h4>
        <div className="dps-row">
          <input className="dps-input" value={actor} placeholder={t('settings.actorPlaceholder')} maxLength={64} onChange={(e) => setActorName(e.target.value)} />
          <button type="button" className="dps-btn" onClick={saveActor}>{t('settings.saveActor')}</button>
        </div>
        <p className="dps-hint">{t('settings.operatorHint')}</p>
      </section>

      <section className="dps-section">
        <h4 className="dps-section-title"><IconSettingsOutline16 size={15} /> {t('settings.githubToken')}</h4>
        <p className="dps-hint">
          {t('settings.tokenHintBefore')}<code>ghp_…</code>{t('settings.tokenHintAfter')}
        </p>
        <div className="dps-row">
          <input className="dps-input" type="password" value={token} placeholder={settings?.tokenConfigured ? `${t('settings.tokenConfigured')}${settings.tokenMasked}` : t('settings.tokenPastePlaceholder')} onChange={(e) => setToken(e.target.value)} autoComplete="off" />
          <button type="button" className="dps-btn dps-btn-primary" disabled={busy === 'token' || !token.trim()} onClick={() => void saveToken()}>{t('settings.save')}</button>
          {settings?.tokenConfigured && <button type="button" className="dps-btn" disabled={busy === 'token'} onClick={() => void clearToken()}>{t('settings.clear')}</button>}
        </div>
        {settings && (
          <p className="dps-hint">
            {t('settings.quotaLabel')}{settings.rateLimitRemaining === null ? t('settings.uncached') : `${t('settings.quotaRemainingBefore')}${settings.rateLimitRemaining}${t('settings.quotaRemainingAfter')}`}{t('settings.mirroredBefore')}{settings.pluginCount}{t('settings.mirroredAfter')}{t('settings.databaseLabel')}<code>{settings.dbPath}</code>
          </p>
        )}
      </section>

      <section className="dps-section">
        <h4 className="dps-section-title"><IconCordisPluginOutline14 size={15} /> {t('settings.builtinTitle')}</h4>
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

      <section className="dps-section">
        <h4 className="dps-section-title"><IconRefreshOutline16 size={15} /> {t('settings.mirror')}</h4>
        <p className="dps-hint">
          {t('settings.syncHintBefore')}<code>topic:dsh-plugin</code>{t('settings.syncHintOr')}<code>#dsh-plugin</code>{t('settings.syncHintAfter')}
        </p>
        <div className="dps-row">
          <label className="dps-inline-label">{t('settings.syncIntervalLabel')}</label>
          <input className="dps-input dps-input-num" type="number" min={0} max={168} value={hours} onChange={(e) => setHours(e.target.value)} />
          <button type="button" className="dps-btn" disabled={busy === 'schedule'} onClick={() => void saveSchedule()}>{t('settings.savePlan')}</button>
          <button type="button" className="dps-btn dps-btn-primary" disabled={busy === 'sync' || status?.state === 'syncing'} onClick={() => void syncNow()}>
            {status?.state === 'syncing' ? t('settings.syncingEllipsis') : t('settings.syncNow')}
          </button>
        </div>
        {status && (
          <div className="dps-status">
            <div className="dps-status-line">
              {t('settings.statusLabel')}<span className={`dps-state-chip${status.state === 'error' ? ' off' : ''}`}>{status.state === 'syncing' ? t('settings.stateSyncing') : status.state === 'error' ? t('settings.stateError') : t('settings.idle')}</span>
              {status.lastSyncAt && <>{t('settings.lastSyncLabel')}{formatDate(status.lastSyncAt)}{t('settings.repoCountBefore')}{status.lastSyncTotal}{t('settings.repoCountAfter')}</>}
              {status.nextSyncAt && <>{t('settings.nextSyncLabel')}{formatDate(status.nextSyncAt)}</>}
            </div>
            {status.lastError && <div className="dps-status-error"><IconWarningOutline16 size={14} /> {status.lastError}</div>}
          </div>
        )}
      </section>
    </div>
  );
}
