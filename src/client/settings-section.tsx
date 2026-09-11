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
}

export function StoreSettingsSection({ api, openStore }: SectionProps): ReactNode {
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
    setNotice('显示名已保存，后续操作将以该名称记录到审计日志。');
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
    if (!row.enabled) return { text: '已关闭', cls: 'off' };
    if (row.loaderPhase === 'failed' || row.phase === 'failed') return { text: '加载失败', cls: 'off' };
    if (row.blockedBy.length > 0 || row.phase === 'blocked') return { text: '依赖阻塞', cls: 'blocked' };
    if (row.phase === 'active') return { text: '运行中', cls: '' };
    if (row.loaderPhase === null) return { text: '未加载', cls: 'pending' };
    return { text: '待启动', cls: 'pending' };
  };

  return (
    <div className="dps-settings-native">
      <div className="dps-native-hero">
        <IconCordisPluginOutline14 size={18} />
        <span>插件商店设置</span>
        <button type="button" className="dps-btn dps-btn-sm dps-btn-primary" onClick={openStore}>打开插件商店</button>
      </div>
      {error && <div className="dps-error" role="alert"><IconWarningOutline16 size={16} /><span className="dps-error-text">{error}</span><button type="button" className="dps-icon-btn" onClick={() => setError(null)} aria-label="关闭">×</button></div>}
      {notice && <div className="dps-notice">{notice}</div>}

      <section className="dps-section">
        <h4 className="dps-section-title"><IconUserOutline16 size={15} /> 操作者身份（审计日志用）</h4>
        <div className="dps-row">
          <input className="dps-input" value={actor} placeholder="例如：张三 / zhangsan" maxLength={64} onChange={(e) => setActorName(e.target.value)} />
          <button type="button" className="dps-btn" onClick={saveActor}>保存显示名</button>
        </div>
        <p className="dps-hint">安装、卸载、启用、禁用、评分等操作会以该名称记录到审计日志，满足企业合规追溯要求。</p>
      </section>

      <section className="dps-section">
        <h4 className="dps-section-title"><IconSettingsOutline16 size={15} /> GitHub 私人 Token</h4>
        <p className="dps-hint">
          GitHub API 匿名限频较低（搜索 10 次/分钟、核心 60 次/小时）。配置私人 Token（<code>ghp_…</code>，public_repo 读取权限）后限频大幅提升，
          镜像同步可完整拉取版本历史。Token 仅保存在本机数据库。
        </p>
        <div className="dps-row">
          <input className="dps-input" type="password" value={token} placeholder={settings?.tokenConfigured ? `已配置：${settings.tokenMasked}` : '粘贴 GitHub 私人 Token（ghp_…）'} onChange={(e) => setToken(e.target.value)} autoComplete="off" />
          <button type="button" className="dps-btn dps-btn-primary" disabled={busy === 'token' || !token.trim()} onClick={() => void saveToken()}>保存</button>
          {settings?.tokenConfigured && <button type="button" className="dps-btn" disabled={busy === 'token'} onClick={() => void clearToken()}>清除</button>}
        </div>
        {settings && (
          <p className="dps-hint">
            当前核心额度：{settings.rateLimitRemaining === null ? '未查询' : `剩余 ${settings.rateLimitRemaining} 次`} · 镜像插件：{settings.pluginCount} 个 ·
            数据库：<code>{settings.dbPath}</code>
          </p>
        )}
      </section>

      <section className="dps-section">
        <h4 className="dps-section-title"><IconCordisPluginOutline14 size={15} /> 内建插件（随插件商店一起安装、可单独关闭）</h4>
        <p className="dps-hint">
          插件商店是<strong>一个包、20 个内建插件</strong>（与 DSH 本体同构）：它们随商店一次安装、一次发布，
          但可以单独开关，也<strong>声明了彼此依赖</strong>。关掉的插件在启动时让位，不提供服务也不注册界面；
          依赖没开的插件会显示「依赖阻塞」并自动让位，随时可以开回来。
          每个内建插件在 DSH 的「设置 → 插件」清单页里也各占一行，可在那里看到加载状态。
          {extensions && <> 当前价格表版本 <code>v{extensions.currentPriceVersion}</code>。</>}
        </p>
        {extensions && (
          <div className="dps-ext-summary">
            共 <strong>{extensions.pluginCount}</strong> 个内建插件 · 运行中 <strong>{extensions.activeCount}</strong> ·
            关闭 {extensions.rows.filter((r) => !r.enabled).length} · 依赖阻塞 {extensions.rows.filter((r) => r.enabled && r.blockedBy.length > 0).length}
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
                <span className="dps-ext-group-count">{running}/{rows.length} 运行中</span>
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
                          {row.service !== null && <> · 服务 <code>{row.service}</code></>}
                          {row.ui !== null && <> · 界面：{row.ui}</>}
                        </p>
                        {(row.requires.length > 0 || row.dependents.length > 0) && (
                          <p className="dps-ext-deps">
                            {row.requires.length > 0 && (
                              <>
                                <span>依赖：</span>
                                {row.requires.map((dep) => (
                                  <span key={dep} className={`dps-dep-tag${row.blockedBy.some((b) => b.id === dep) ? ' missing' : ''}`}>{dep}</span>
                                ))}
                              </>
                            )}
                            {row.dependents.length > 0 && (
                              <>
                                <span>被依赖：</span>
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
                        title={blocked ? '依赖的插件没开，开着也不会生效' : undefined}
                        onClick={() => void toggleExtension(row.id, !row.enabled)}
                      >
                        {row.enabled ? '关闭' : '开启'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {extensions === null && <p className="dps-hint">正在读取内建插件状态…</p>}
        <p className="dps-hint">开关写入本机 <code>storages/plugin-store/plugins.json</code>，<strong>重启 dsh 后生效</strong>。关掉被依赖的插件时，下游会自动进入「依赖阻塞」。</p>
      </section>

      <section className="dps-section">
        <h4 className="dps-section-title"><IconRefreshOutline16 size={15} /> 镜像同步（本地数据库缓存）</h4>
        <p className="dps-hint">
          定期将 GitHub 上标记 <code>topic:dsh-plugin</code> 或 <code>#dsh-plugin</code> 的仓库元数据缓存到本地数据库，搜索加载不再受网络与限频影响。
        </p>
        <div className="dps-row">
          <label className="dps-inline-label">间隔（小时，0=关闭）</label>
          <input className="dps-input dps-input-num" type="number" min={0} max={168} value={hours} onChange={(e) => setHours(e.target.value)} />
          <button type="button" className="dps-btn" disabled={busy === 'schedule'} onClick={() => void saveSchedule()}>保存计划</button>
          <button type="button" className="dps-btn dps-btn-primary" disabled={busy === 'sync' || status?.state === 'syncing'} onClick={() => void syncNow()}>
            {status?.state === 'syncing' ? '同步中…' : '立即同步'}
          </button>
        </div>
        {status && (
          <div className="dps-status">
            <div className="dps-status-line">
              状态：<span className={`dps-state-chip${status.state === 'error' ? ' off' : ''}`}>{status.state === 'syncing' ? '同步中' : status.state === 'error' ? '出错' : '空闲'}</span>
              {status.lastSyncAt && <> · 上次：{formatDate(status.lastSyncAt)}（{status.lastSyncTotal} 个仓库）</>}
              {status.nextSyncAt && <> · 下次计划：{formatDate(status.nextSyncAt)}</>}
            </div>
            {status.lastError && <div className="dps-status-error"><IconWarningOutline16 size={14} /> {status.lastError}</div>}
          </div>
        )}
      </section>
    </div>
  );
}
