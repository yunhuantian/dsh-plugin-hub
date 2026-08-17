/**
 * Native Settings page for the plugin store: operator identity (audit
 * attribution), GitHub private token, mirror-sync schedule + manual sync, and
 * a shortcut back into the store. Registered into the `settings.section` slot
 * so it renders inside the Harness Settings panel like any native section.
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { IconCordisPluginOutline14, IconRefreshOutline16, IconSettingsOutline16, IconUserOutline16, IconWarningOutline16 } from '@deepseek-ai/dsh-client-ui-primitives';
import { actorDisplay, formatDate, getActor, setActor as persistActor, type RemoteApi } from './api';

interface SectionProps {
  api: RemoteApi;
  openStore: () => void;
  close?: () => void;
}

export function StoreSettingsSection({ api, openStore }: SectionProps): ReactNode {
  const [settings, setSettings] = useState<Awaited<ReturnType<RemoteApi['settings']>> | null>(null);
  const [status, setStatus] = useState<Awaited<ReturnType<RemoteApi['syncStatus']>> | null>(null);
  const [token, setToken] = useState('');
  const [hours, setHours] = useState('24');
  const [actor, setActorName] = useState(actorDisplay());
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [s, st] = await Promise.all([api.settings(), api.syncStatus()]);
      setSettings(s);
      setStatus(st);
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
