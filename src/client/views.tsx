/**
 * Store views: Discover (cards + search + filters), Detail (tabs incl.
 * dependency graph, version history, reviews), Installed, Settings (token +
 * mirror), Audit log, and the developer Scaffold page.
 */
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode, type WheelEvent as ReactWheelEvent } from 'react';
import { IconCordisPluginOutline14, IconCodeOutline16, IconDownloadOutline16, IconRefreshOutline16, IconSearchOutline16, IconSettingsOutline16, IconTrashOutline16, IconUserOutline16, IconWarningOutline16 } from '@deepseek-ai/dsh-client-ui-primitives';
import type { Category, InstalledPlugin, PluginDetail, PluginSummary, RemoteApi } from './api';
import { formatCount, formatDate, getActor, setActor, actorDisplay } from './api';
import { Markdown } from './markdown';
import { DependencyGraph } from './graph';

const CATEGORY_META: Array<{ key: Category | 'all'; labelKey: string }> = [
  { key: 'all', labelKey: 'category.all' },
  { key: 'tool', labelKey: 'category.tool' },
  { key: 'agent', labelKey: 'category.agent' },
  { key: 'ui', labelKey: 'category.ui' },
  { key: 'data', labelKey: 'category.data' },
  { key: 'vision', labelKey: 'category.vision' },
  { key: 'docs', labelKey: 'category.docs' },
  { key: 'memory', labelKey: 'category.memory' },
  { key: 'usage', labelKey: 'category.usage' },
  { key: 'notify', labelKey: 'category.notify' },
  { key: 'dev', labelKey: 'category.dev' },
  { key: 'chat', labelKey: 'category.chat' },
  { key: 'hub', labelKey: 'category.hub' },
  { key: 'hub-ext', labelKey: 'category.hubExt' },
  { key: 'other', labelKey: 'category.other' },
];

const CATEGORY_LABEL: Record<string, string> = {
  tool: '工具', agent: 'Agent', ui: '界面美化', data: '数据处理', vision: '视觉多模态', docs: '文档办公',
  memory: '记忆知识', usage: '模型用量', notify: '通知通讯', dev: '开发编码', chat: '对话会话', hub: '聚合资源', other: '其他',
};

const ACTION_LABEL: Record<string, string> = {
  install: '安装', uninstall: '卸载', enable: '启用', disable: '禁用',
  rate: '评分', token_set: '设置 Token', token_clear: '清除 Token',
  sync: '镜像同步', schedule_set: '同步计划',
};

function Stars({ rating, count }: { rating: number; count: number }): ReactNode {
  return (
    <span className="dps-stars" title={`${rating.toFixed(1)} / 5（${count} 条评价）`}>
      <span className="dps-stars-icons" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`dps-star${rating >= i - 0.25 ? ' on' : rating >= i - 0.75 ? ' half' : ''}`}>★</span>
        ))}
      </span>
      <span className="dps-stars-num">{rating > 0 ? rating.toFixed(1) : '暂无'}</span>
      {count > 0 && <span className="dps-stars-count">({count})</span>}
    </span>
  );
}

function PluginIcon({ iconUrl, name, size = 44 }: { iconUrl: string | null; name: string; size?: number }): ReactNode {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  return iconUrl
    ? <img className="dps-icon-img" src={iconUrl} alt="" width={size} height={size} style={{ width: size, height: size }} loading="lazy" />
    : <span className="dps-icon-fallback" style={{ width: size, height: size, fontSize: size * 0.42 }}>{initial}</span>;
}

function CategoryBadges({ categories, t }: { categories: string[]; t: (k: string) => string }): ReactNode {
  return (
    <span className="dps-badges">
      {categories.map((c) => <span key={c} className={`dps-badge dps-badge-${c}`}>{t(`category.${c}`) ?? CATEGORY_LABEL[c] ?? c}</span>)}
    </span>
  );
}

const TRUST_META: Record<string, { icon: string; labelKey: string }> = {
  official: { icon: '🏅', labelKey: 'trust.official' },
  verified: { icon: '✅', labelKey: 'trust.verified' },
  community: { icon: '👥', labelKey: 'trust.community' },
  unreviewed: { icon: '⚪', labelKey: 'trust.unreviewed' },
};

/** Trust badge from the ecosystem index (depend-on, work-without). */
function TrustBadge({ level, t }: { level: string | null | undefined; t: (k: string) => string }): ReactNode {
  if (!level) return null;
  const meta = TRUST_META[level] ?? { icon: '⚪', labelKey: 'trust.unreviewed' };
  return <span className={`dps-badge dps-trust-${level}`} title={`${t('trust.sourceHint')}`}>{meta.icon} {t(meta.labelKey)}</span>;
}

/** Download-source badge: npm = direct install, github = clone (may need proxy). */
function SourceBadge({ source, t }: { source: 'npm' | 'github'; t: (k: string) => string }): ReactNode {  return source === 'npm'
    ? <span className="dps-badge dps-badge-npm" title={t('source.npm')}>{t('source.npm')}</span>
    : <span className="dps-badge dps-badge-github" title={t('source.github')}>{t('source.github')}</span>;
}

function ErrorBanner({ error, onDismiss, t }: { error: string | { message: string; detail: string | null } | null; onDismiss: () => void; t?: (k: string) => string }): ReactNode {
  const [expanded, setExpanded] = useState(false);
  if (!error) return null;
  const message = typeof error === 'string' ? error : error.message;
  const detail = typeof error === 'string' ? null : error.detail;
  const tf = t ?? ((k: string) => k);
  return (
    <div className="dps-error" role="alert">
      <IconWarningOutline16 size={16} />
      <span className="dps-error-text">
        {message}
        {detail && (
          <button type="button" className="dps-error-detail-toggle" onClick={() => setExpanded((v) => !v)}>
            {expanded ? `${tf('err.detail.collapse')} ▲` : `${tf('err.detail.toggle')} ▼`}
          </button>
        )}
        {detail && expanded && (
          <pre className="dps-error-detail">{detail}</pre>
        )}
      </span>
      <button type="button" className="dps-icon-btn" onClick={onDismiss} aria-label={tf('app.close')}>×</button>
    </div>
  );
}

// ---- Discover ----------------------------------------------------------------

interface DiscoverProps {
  api: RemoteApi;
  onOpen: (packageName: string) => void;
  onChanged: () => void;
  t: (key: string) => string;
}

function Discover({ api, onOpen, onChanged, t }: DiscoverProps): ReactNode {
  const [plugins, setPlugins] = useState<PluginSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [sort, setSort] = useState<'random' | 'stars' | 'health' | 'rating' | 'downloads' | 'updated' | 'name'>(() => (localStorage.getItem('dps-sort') as 'random' | 'stars' | 'health' | 'rating' | 'downloads' | 'updated' | 'name') || 'random');
  const [installedOnly, setInstalledOnly] = useState(false);
  const [limit] = useState(60);
  const [offset, setOffset] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query), 250);
    return () => window.clearTimeout(id);
  }, [query]);

  const load = useCallback(async (nextOffset: number) => {
    setLoading(true);
    setError(null);
    try {
      const page = await api.list({
        category: category === 'all' ? null : category,
        query: debounced || null,
        sort,
        installedOnly: installedOnly || null,
        limit,
        offset: nextOffset,
      });
      setPlugins(nextOffset === 0 ? page.plugins : (prev) => [...prev, ...page.plugins]);
      setTotal(page.total);
      setOffset(nextOffset);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [api, category, debounced, sort, installedOnly, limit]);

  useEffect(() => { void load(0); }, [load]);

  const install = async (p: PluginSummary) => {
    setBusy(p.packageName);
    try {
      const r = await api.install(p.packageName, getActor());
      setError(r.ok ? null : r.message);
      if (r.ok) onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  const card = (p: PluginSummary) => (
    <div key={p.packageName} className="dps-card" onClick={() => onOpen(p.packageName)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onOpen(p.packageName); }}>
      <div className="dps-card-top">
        <PluginIcon iconUrl={p.iconUrl} name={p.name} />
        <div className="dps-card-head">
          <div className="dps-card-name" title={p.name}>{p.name}</div>
          <div className="dps-card-developer" title={p.developer}>@{p.developer}</div>
        </div>
      </div>
      <p className="dps-card-desc">{p.shortDescription || '（暂无描述）'}</p>
      <div className="dps-card-meta">
        <TrustBadge level={p.trustLevel} t={t} />
        <CategoryBadges categories={p.categories} t={t} />
        <div className="dps-card-stats">
          <SourceBadge source={p.source} t={t} />
          <Stars rating={p.rating} count={p.ratingCount} />
          <span className="dps-stat" title={t('downloads.title')}><IconDownloadOutline16 size={13} />{p.downloads > 0 ? formatCount(p.downloads) : t('downloads.unknown')}</span>
          <span className="dps-stat" title="GitHub Stars">★ {formatCount(p.stars)}</span>
        </div>
      </div>
      <div className="dps-card-actions">
        {p.installed ? (
          <span className={`dps-state-chip${p.enabled === false ? ' off' : ''}`}>{p.enabled === false ? t('state.disabled') : t('state.installed')}</span>
        ) : (
          <button
            type="button"
            className="dps-btn dps-btn-primary dps-btn-sm"
            disabled={busy === p.packageName}
            onClick={(e) => { e.stopPropagation(); void install(p); }}
          >
            {busy === p.packageName ? t('action.installing') : t('action.install')}
          </button>
        )}
        <span className="dps-card-version">{p.version ? `v${p.version}` : ''}</span>
      </div>
    </div>
  );

  return (
    <div className="dps-view">
      <div className="dps-toolbar">
        <div className="dps-search">
          <IconSearchOutline16 size={15} />
          <input
            className="dps-search-input"
            value={query}
            placeholder={t('discover.search')}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t('discover.search')}
          />
        </div>
        <div className="dps-filters">
          <div className="dps-chips" role="group" aria-label={t('category.all')}>
            {CATEGORY_META.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`dps-chip${category === c.key ? ' active' : ''}`}
                onClick={() => setCategory(c.key)}
              >
                {t(c.labelKey)}
              </button>
            ))}
          </div>
          <div className="dps-filter-right">
            <select className="dps-select" value={sort} onChange={(e) => { const v = e.target.value as typeof sort; setSort(v); localStorage.setItem('dps-sort', v); }} aria-label={t('category.tool')}>
              <option value="random">🎲 {t('sort.random')}</option>
              <option value="health">{t('sort.health')}</option>
              <option value="stars">{t('sort.stars')}</option>
              <option value="rating">{t('sort.rating')}</option>
              <option value="downloads">{t('sort.downloads')}</option>
              <option value="updated">{t('sort.updated')}</option>
              <option value="name">{t('sort.name')}</option>
            </select>
            <label className="dps-check">
              <input type="checkbox" checked={installedOnly} onChange={(e) => setInstalledOnly(e.target.checked)} />
              {t('filter.installedOnly')}
            </label>
          </div>
        </div>
      </div>
      <ErrorBanner error={error} onDismiss={() => setError(null)} t={t} />
      {loading && offset === 0 ? (
        <div className="dps-empty">加载中…</div>
      ) : plugins.length === 0 ? (
        <div className="dps-empty">
          <IconCordisPluginOutline14 size={18} />
          <p>{t('discover.empty')}</p>
          {total === 0 && <p className="dps-empty-hint">{t('discover.emptyHint')}</p>}
        </div>
      ) : (
        <>
          <div className="dps-grid">{plugins.map(card)}</div>
          {offset + plugins.length < total && (
            <div className="dps-loadmore">
              <button type="button" className="dps-btn" disabled={loading} onClick={() => void load(offset + plugins.length)}>
                {loading ? '加载中…' : `加载更多（${total - offset - plugins.length}）`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---- Detail ------------------------------------------------------------------

interface DetailProps {
  api: RemoteApi;
  packageName: string;
  onBack: () => void;
  onChanged: () => void;
  t: (key: string) => string;
}

type DetailTab = 'overview' | 'usage' | 'versions' | 'graph' | 'reviews' | 'issues' | 'health' | 'bench' | 'wiki';

export function Detail({ api, packageName, onBack, onChanged, t }: DetailProps): ReactNode {
  const [detail, setDetail] = useState<PluginDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string; detail: string | null } | null>(null);
  const [tab, setTab] = useState<DetailTab>('overview');
  const [busy, setBusy] = useState<string | null>(null);
  const [myScore, setMyScore] = useState(0);
  const [myComment, setMyComment] = useState('');
  const [rateBusy, setRateBusy] = useState(false);
  const [installP, setInstallP] = useState<{ phase: string; percent: number | null; detail: string } | null>(null);
  const [issues, setIssues] = useState<Array<{ number: number; title: string; state: 'open' | 'closed'; comments: number; createdAt: string | null; user: string | null }> | null>(null);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [envHint, setEnvHint] = useState<string[] | null>(null);
  const [health, setHealth] = useState<Awaited<ReturnType<RemoteApi['healthDetail']>> | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [bench, setBench] = useState<Awaited<ReturnType<RemoteApi['bench']>> | null>(null);
  const [benchLoading, setBenchLoading] = useState(false);
  const [benchBusy, setBenchBusy] = useState(false);
  const [benchMsg, setBenchMsg] = useState<string | null>(null);
  const [benchMode, setBenchMode] = useState<'mock' | 'e2e'>('mock');
  const [wiki, setWiki] = useState<Awaited<ReturnType<RemoteApi['wiki']>> | null>(null);
  const [wikiLoading, setWikiLoading] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  useEffect(() => {
    if (tab !== 'wiki' || wiki !== null) return;
    let cancelled = false;
    setWikiLoading(true);
    void api.wiki(packageName).then((w) => { if (!cancelled) setWiki(w); })
      .catch(() => { if (!cancelled) setWiki(null); })
      .finally(() => { if (!cancelled) setWikiLoading(false); });
    return () => { cancelled = true; };
  }, [tab, wiki, api, packageName]);

  const copyCmd = (cmd: string) => {
    void navigator.clipboard?.writeText(cmd).catch(() => undefined);
    setCopiedCmd(cmd);
    window.setTimeout(() => setCopiedCmd(null), 1500);
  };

  // Fetch the health score + activity charts once when the tab is opened.
  useEffect(() => {
    if (tab !== 'health' || health !== null) return;
    let cancelled = false;
    setHealthLoading(true);
    void api.healthDetail(packageName).then((h) => {
      if (!cancelled) setHealth(h);
    }).catch(() => { if (!cancelled) setHealth(null); })
      .finally(() => { if (!cancelled) setHealthLoading(false); });
    return () => { cancelled = true; };
  }, [tab, health, api, packageName]);

  // Fetch the dsh-bench score once when the tab is opened.
  useEffect(() => {
    if (tab !== 'bench' || bench !== null) return;
    let cancelled = false;
    setBenchLoading(true);
    void api.bench(packageName).then((b) => {
      if (!cancelled) setBench(b);
    }).catch(() => { if (!cancelled) setBench(null); })
      .finally(() => { if (!cancelled) setBenchLoading(false); });
    return () => { cancelled = true; };
  }, [tab, bench, api, packageName]);

  // 立即跑分（Mock 零 token，调用 dsh-bench CLI）
  const runBenchNow = async (mode: 'mock' | 'e2e' = 'mock') => {
    if (mode === 'e2e' && !window.confirm(t('bench.e2eConfirm'))) return;
    setBenchBusy(true);
    setBenchMsg(null);
    setBenchMode(mode);
    try {
      const r = await api.benchRun(packageName, mode);
      setBenchMsg(r.message);
      if (r.detail) {
        setBench(r.detail);
      } else {
        setBench(await api.bench(packageName));
      }
    } catch (e) {
      setBenchMsg(e instanceof Error ? e.message : String(e));
    } finally {
      setBenchBusy(false);
    }
  };


  // Fetch the GitHub discussion board once when the tab is opened.
  useEffect(() => {
    if (tab !== 'issues' || issues !== null) return;
    let cancelled = false;
    setIssuesLoading(true);
    void api.issues(packageName).then((list) => {
      if (!cancelled) setIssues(list);
    }).catch(() => { if (!cancelled) setIssues([]); })
      .finally(() => { if (!cancelled) setIssuesLoading(false); });
    return () => { cancelled = true; };
  }, [tab, issues, api, packageName]);

  // Poll install progress while an install is in flight.
  useEffect(() => {
    if (busy !== 'install') { setInstallP(null); return; }
    let cancelled = false;
    const tick = async () => {
      try {
        const p = await api.installProgress(packageName);
        if (!cancelled) setInstallP(p ? { phase: p.phase, percent: p.percent, detail: p.detail } : null);
      } catch { /* ignore */ }
    };
    void tick();
    const timer = setInterval(tick, 500);
    return () => { cancelled = true; clearInterval(timer); };
  }, [api, packageName, busy]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.detail(packageName)
      .then((d) => { if (!cancelled) setDetail(d); })
      .catch((e) => { if (!cancelled) setError({ message: e instanceof Error ? e.message : String(e), detail: null }); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [api, packageName]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (name && name !== packageName) window.dispatchEvent(new CustomEvent('dps-navigate', { detail: name }));
    };
    window.addEventListener('dps-open-plugin', onOpen);
    return () => window.removeEventListener('dps-open-plugin', onOpen);
  }, [packageName]);

  const act = async (action: 'install' | 'uninstall' | 'enable' | 'disable', source?: 'npm' | 'git' | 'auto') => {
    setBusy(action);
    setError(null);
    try {
      let r;
      if (action === 'install') r = await api.install(packageName, getActor(), source === 'auto' ? undefined : source);
      else if (action === 'uninstall') r = await api.uninstall(packageName, getActor());
      else r = await api.setEnabled(packageName, action === 'enable', getActor());
      if (r.ok) {
        onChanged();
        setEnvHint(r.requiredEnv && r.requiredEnv.length > 0 ? r.requiredEnv : null);
        const fresh = await api.detail(packageName);
        setDetail(fresh);
      } else {
        setError({ message: r.message, detail: r.detail ?? null });
      }
    } catch (e) {
      setError({ message: e instanceof Error ? e.message : String(e), detail: null });
    } finally {
      setBusy(null);
    }
  };

  const submitRate = async () => {
    if (myScore < 1) { setError({ message: '请先选择 1-5 星评分', detail: null }); return; }
    setRateBusy(true);
    try {
      const r = await api.rate(packageName, myScore, myComment, getActor());
      setError(r.ok ? null : { message: r.message, detail: r.detail ?? null });
      if (r.ok) {
        setDetail(await api.detail(packageName));
        setMyComment('');
      }
    } catch (e) {
      setError({ message: e instanceof Error ? e.message : String(e), detail: null });
    } finally {
      setRateBusy(false);
    }
  };

  if (loading) return <div className="dps-view dps-empty">加载中…</div>;
  if (!detail) {
    return (
      <div className="dps-view">
        <ErrorBanner error={error ?? '未找到该插件'} onDismiss={() => onBack()} />
      </div>
    );
  }

  const tabs: Array<{ key: DetailTab; label: string }> = [
    { key: 'overview', label: t('detail.tab.overview') },
    { key: 'usage', label: t('detail.tab.usage') },
    { key: 'versions', label: `${t('detail.tab.versions')}${detail.versions.length ? ` (${detail.versions.length})` : ''}` },
    { key: 'graph', label: `${t('detail.tab.graph')} (${detail.dependencies.length}/${detail.dependents.length})` },
    { key: 'reviews', label: `${t('detail.tab.reviews')}${detail.ratingCount ? ` (${detail.ratingCount})` : ''}` },
    { key: 'issues', label: t('detail.tab.issues') },
    { key: 'health', label: t('detail.tab.health') },
    { key: 'bench', label: t('detail.tab.bench') },
    { key: 'wiki', label: t('detail.tab.wiki') },
  ];

  return (
    <div className="dps-view dps-detail">
      <div className="dps-detail-head">
        <button type="button" className="dps-icon-btn dps-back" onClick={onBack} aria-label="返回">←</button>
        <PluginIcon iconUrl={detail.iconUrl} name={detail.name} size={52} />
        <div className="dps-detail-title">
          <div className="dps-detail-name-row">
            <h2 className="dps-detail-name">{detail.name}</h2>
            <SourceBadge source={detail.source} t={t} />
            <TrustBadge level={detail.trustLevel} t={t} />
            <CategoryBadges categories={detail.categories} t={t} />
          </div>
          <div className="dps-detail-sub">
            <span>@{detail.developer}</span>
            <span className="dps-dot">·</span>
            <span>v{detail.version ?? '未知'}</span>
            <span className="dps-dot">·</span>
            <Stars rating={detail.rating} count={detail.ratingCount} />
            <span className="dps-dot">·</span>
            <span title={t('downloads.title')}><IconDownloadOutline16 size={13} />{detail.downloads > 0 ? formatCount(detail.downloads) : t('downloads.unknown')}</span>
            {detail.license && <><span className="dps-dot">·</span><span>{detail.license}</span></>}
          </div>
        </div>
        <div className="dps-detail-actions">
          {!detail.installed && (
            <>
              {detail.hasNpm && (
                <button type="button" className="dps-btn dps-btn-primary" disabled={busy !== null} onClick={() => void act('install', 'npm')}>
                  {busy === 'install' ? t('action.installing') : t('btn.npmInstall')}
                </button>
              )}
              {detail.hasGit && (
                <button type="button" className="dps-btn" disabled={busy !== null} onClick={() => void act('install', 'git')}>
                  {busy === 'install' ? t('action.installing') : t('btn.githubInstall')}
                </button>
              )}
            </>
          )}
          {detail.installed && (
            <>
              {detail.hasUpdate && (
                <button type="button" className="dps-btn dps-btn-primary" disabled={busy !== null} onClick={() => void act('install', 'auto')} title={detail.installedVersion ? `v${detail.installedVersion} → v${detail.version}` : undefined}>
                  {busy === 'install' ? t('action.updating') : `🔄 ${t('action.update')}${detail.version ? ` v${detail.version}` : ''}`}
                </button>
              )}
              <button
                type="button"
                className={`dps-btn${detail.enabled === false ? ' dps-btn-primary' : ''}`}
                disabled={busy !== null}
                onClick={() => void act(detail.enabled === false ? 'enable' : 'disable')}
              >
                {busy === 'enable' || busy === 'disable' ? t('action.processing') : detail.enabled === false ? t('action.enable') : t('action.disable')}
              </button>
              <button type="button" className="dps-btn dps-btn-danger" disabled={busy !== null} onClick={() => void act('uninstall')}>
                {busy === 'uninstall' ? t('action.uninstalling') : t('action.uninstall')}
              </button>
            </>
          )}
          <a className="dps-btn dps-btn-ghost" href={detail.repoUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
        {busy === 'install' && (
          <div className="dps-install-progress" role="progressbar" aria-valuenow={installP?.percent ?? undefined}>
            <div className="dps-install-progress-head">
              <span className="dps-install-progress-label">
                {installP?.percent == null ? t('action.installing') : `${t('action.installing')} ${installP.percent}%`}
              </span>
              {installP?.detail && <span className="dps-muted-sm" title={installP.detail}>{installP.detail}</span>}
            </div>
            <div className="dps-install-progress-track">
              <div
                className={`dps-install-progress-bar${installP?.percent == null ? ' indeterminate' : ''}`}
                style={installP?.percent != null ? { width: `${installP.percent}%` } : undefined}
              />
            </div>
          </div>
        )}
      </div>
      <ErrorBanner error={error} onDismiss={() => setError(null)} t={t} />
      {envHint && (
        <div className="dps-security-warning">
          <p>{t('install.envHintTitle')}</p>
          <div className="dps-security-item">
            <code>{envHint.join('、')}</code>
          </div>
          <p className="dps-muted-sm">{t('install.envHintDesc')}</p>
          <button type="button" className="dps-btn dps-btn-ghost" onClick={() => setEnvHint(null)}>{t('err.dismiss')}</button>
        </div>
      )}
      <div className="dps-tabs" role="tablist">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            type="button"
            role="tab"
            aria-selected={tab === tb.key}
            className={`dps-tab${tab === tb.key ? ' active' : ''}`}
            onClick={() => setTab(tb.key)}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="dps-tab-body">
          {detail.screenshots.length > 0 && (
            <div className="dps-screenshots">
              {detail.screenshots.map((src, i) => (
                <a key={i} href={src} target="_blank" rel="noreferrer" className="dps-screenshot">
                  <img src={src} alt={`截图 ${i + 1}`} loading="lazy" />
                </a>
              ))}
            </div>
          )}
          {detail.fullDescription
            ? <Markdown text={detail.fullDescription} />
            : <p className="dps-muted">（该插件未提供详细描述）</p>}
          {detail.topics.length > 0 && (
            <div className="dps-topics">
              {detail.topics.map((tp) => <span key={tp} className="dps-topic">#{tp}</span>)}
            </div>
          )}
        </div>
      )}

      {tab === 'usage' && (
        <div className="dps-tab-body">
          {detail.usage
            ? <Markdown text={detail.usage} />
            : <div className="dps-empty"><p>（未从 README 中提取到独立的使用说明章节，请参考「概览」中的完整 README。）</p></div>}
        </div>
      )}

      {tab === 'versions' && (
        <div className="dps-tab-body">
          {detail.versions.length === 0 ? (
            <div className="dps-empty"><p>暂无版本记录（GitHub Releases 为空时显示 package.json 中的版本）。</p></div>
          ) : (
            <table className="dps-table">
              <thead><tr><th>版本</th><th>发布日期</th><th>标签</th><th>变更说明</th></tr></thead>
              <tbody>
                {detail.versions.map((v) => (
                  <tr key={`${v.version}-${v.publishedAt ?? ''}`}>
                    <td className="dps-strong">v{v.version}</td>
                    <td>{formatDate(v.publishedAt)}</td>
                    <td>{v.tagName ?? '—'}</td>
                    <td className="dps-cell-ellipsis" title={v.changelog ?? ''}>{v.changelog ? v.changelog.split('\n')[0] : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === 'graph' && (
        <div className="dps-tab-body">
          <DependencyGraph root={detail.packageName} rootName={detail.name} dependencies={detail.dependencies} dependents={detail.dependents} />
        </div>
      )}

      {tab === 'reviews' && (
        <div className="dps-tab-body">
          <div className="dps-rate-box">
            <div className="dps-rate-title">为「{detail.name}」评分（本地企业内部反馈，仅本机可见）</div>
            <div className="dps-rate-row">
              <div className="dps-star-input" role="radiogroup" aria-label="评分">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button" className={`dps-star-btn${s <= myScore ? ' on' : ''}`} onClick={() => setMyScore(s)} aria-label={`${s} 星`}>★</button>
                ))}
              </div>
              <input
                className="dps-input dps-rate-comment"
                value={myComment}
                placeholder="写下使用反馈（可选）"
                maxLength={2000}
                onChange={(e) => setMyComment(e.target.value)}
              />
              <button type="button" className="dps-btn dps-btn-primary" disabled={rateBusy} onClick={() => void submitRate()}>
                {rateBusy ? '提交中…' : '提交评分'}
              </button>
            </div>
          </div>
          {detail.reviews.length === 0 ? (
            <div className="dps-empty"><p>暂无内部评价，成为第一个反馈的人吧。</p></div>
          ) : (
            <ul className="dps-reviews">
              {detail.reviews.map((r) => (
                <li key={r.id} className="dps-review">
                  <div className="dps-review-head">
                    <IconUserOutline16 size={15} />
                    <span className="dps-review-actor">{r.actor}</span>
                    <span className="dps-stars-icons" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <span key={i} className={`dps-star${i < r.score ? ' on' : ''}`}>★</span>)}</span>
                    <span className="dps-review-time">{formatDate(r.createdAt)}</span>
                  </div>
                  {r.comment && <p className="dps-review-comment">{r.comment}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'issues' && (
        <div className="dps-tab-body">
          <div className="dps-issues-head">
            <span>{t('issues.desc')}</span>
            {detail.repoUrl && (
              <a className="dps-btn dps-btn-ghost" href={`${detail.repoUrl}/issues`} target="_blank" rel="noreferrer">
                {t('issues.openBoard')} ↗
              </a>
            )}
          </div>
          {issuesLoading ? (
            <div className="dps-empty">{t('issues.loading')}</div>
          ) : issues === null || issues.length === 0 ? (
            <div className="dps-empty"><p>{t('issues.empty')}</p></div>
          ) : (
            <ul className="dps-issues">
              {issues.map((issue) => (
                <li key={issue.number} className="dps-issue">
                  <a className="dps-issue-link" href={detail.repoUrl ? `${detail.repoUrl}/issues/${issue.number}` : undefined} target="_blank" rel="noreferrer">
                    <span className={`dps-issue-state ${issue.state}`} title={issue.state === 'open' ? 'open' : 'closed'}>
                      {issue.state === 'open' ? '🟢' : '🔵'}
                    </span>
                    <span className="dps-issue-title">#{issue.number} {issue.title}</span>
                  </a>
                  <span className="dps-muted-sm dps-issue-meta">
                    💬 {issue.comments} · @{issue.user ?? 'ghost'} · {issue.createdAt ? formatDate(issue.createdAt) : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'health' && (
        <div className="dps-tab-body">
          {healthLoading ? (
            <div className="dps-empty">{t('health.loading')}</div>
          ) : !health ? (
            <div className="dps-empty"><p>{t('health.noDetail')}</p></div>
          ) : (
            <>
              <div className="dps-h-metrics">
                <div className="dps-h-metric"><span className="dps-h-metric-label">{t('health.title')}</span>
                  <span className="dps-h-level" style={{ color: (HEALTH_META[health.level] ?? HEALTH_META.stale).color }}>● {(HEALTH_META[health.level] ?? HEALTH_META.stale).label} {health.health}/100</span>
                </div>
                <div className="dps-h-metric"><span className="dps-h-metric-label">{t('health.lastUpdate')}</span><span>{health.lastUpdate ? formatDate(health.lastUpdate) : '—'}</span></div>
                <div className="dps-h-metric"><span className="dps-h-metric-label">{t('health.downloads')}</span><span>{formatCount(health.downloads)}</span></div>
                <div className="dps-h-metric"><span className="dps-h-metric-label">{t('health.openIssues')}</span><span>{health.openIssues ?? '—'}</span></div>
                {health.repoFullName && (
                  <a className="dps-h-metric dps-h-repo" href={`https://github.com/${health.repoFullName}`} target="_blank" rel="noreferrer">GitHub ↗</a>
                )}
              </div>

              <div className="dps-section">
                <h4 className="dps-section-title">{t('health.breakdown')}</h4>
                {([
                  [t('health.act'), health.breakdown.activity, 30],
                  [t('health.dist'), health.breakdown.distribution, 15],
                  [t('health.bugs'), health.breakdown.bugs, 25],
                  [t('health.comm'), health.breakdown.community, 20],
                  [t('health.rel'), health.breakdown.releases, 10],
                ] as Array<[string, number, number]>).map(([label, score, max]) => (
                  <div key={label} className="dps-h-bar-row">
                    <span className="dps-h-bar-label">{label}</span>
                    <div className="dps-h-bar-track">
                      <div className={`dps-h-bar-fill lv-${health.level}`} style={{ width: `${(score / max) * 100}%` }} />
                    </div>
                    <span className="dps-h-bar-val">{score}/{max}</span>
                  </div>
                ))}
              </div>

              <div className="dps-section">
                <h4 className="dps-section-title">{t('health.timeline')}</h4>
                <p className="dps-hint">{t('health.timelineHint')}</p>
                <HealthTimeline timeline={health.timeline} trend={health.downloadTrend} t={t} />
              </div>

              <div className="dps-section">
                <h4 className="dps-section-title">{t('health.changeTrend')}</h4>
                <p className="dps-hint">{t('health.changeTrendHint')}</p>
                {health.hasToken ? (
                  <TrendChart
                    series={[
                      { key: 'commits', label: t('health.commitsPerDay'), color: '#378ADD', points: health.commitActivity },
                      { key: 'stars', label: t('health.starsPerDay'), color: '#e0a020', points: health.starGains },
                    ]}
                    t={t}
                  />
                ) : (
                  <>
                    <TrendChart
                      series={[{ key: 'commits', label: t('health.commitsPerDay'), color: '#378ADD', points: health.commitActivity }]}
                      t={t}
                    />
                    <div className="dps-security-warning">
                      <p>{t('health.starsNeedToken')}</p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'bench' && (
        <div className="dps-tab-body">
          <div className="dps-bench-actions" style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <button type="button" className="dps-btn dps-btn-primary" disabled={benchBusy} onClick={() => void runBenchNow('mock')}>
              {benchBusy && benchMode === 'mock' ? t('bench.running') : t('bench.runNow')}
            </button>
            <button type="button" className="dps-btn" disabled={benchBusy} onClick={() => void runBenchNow('e2e')}>
              {benchBusy && benchMode === 'e2e' ? t('bench.e2eRunning') : t('bench.e2e')}
            </button>
            <span className="dps-muted-sm">{t('bench.runHint')}</span>
          </div>
          {benchMsg && <div className="dps-security-warning" style={{ marginBottom: 10 }}><p>{benchMsg}</p></div>}
          {benchLoading ? (
            <div className="dps-empty">{t('bench.loading')}</div>
          ) : !bench || !bench.found || !bench.entry ? (
            <div className="dps-empty">
              <p>{t('bench.noEntry')}</p>
              <p className="dps-muted-sm">{t('bench.hint')}</p>
            </div>
          ) : (
            (() => {
              const e = bench.entry as Record<string, any>;
              const level = String(e.level ?? '—');
              const color = level === 'fast' ? '#4ade80' : level === 'medium' ? '#facc15' : level === 'slow' ? '#f87171' : '#8b93a3';
              const bars = [
                [t('bench.wall'), e.wallMs != null ? `${e.wallMs}ms` : '—', e.wallMs != null ? Math.min(100, e.wallMs / 40) : 0],
                [t('bench.apply'), e.probeApplyMs != null ? `${Number(e.probeApplyMs).toFixed(1)}s` : '—', e.probeApplyMs != null ? Math.min(100, Number(e.probeApplyMs) * 10) : 0],
                [t('bench.bundle'), e.bundle?.clientGzipKb != null ? `${e.bundle.clientGzipKb}KB` : '无', e.bundle?.clientGzipKb != null ? Math.min(100, e.bundle.clientGzipKb / 15) : 0],
                [t('bench.hooks'), e.hookCount != null ? String(e.hookCount) : '—', e.hookCount != null ? Math.min(100, e.hookCount * 2) : 0],
              ] as Array<[string, string, number]>;
              return (
                <>
                  <div className="dps-h-metrics">
                    <div className="dps-h-metric">
                      <span className="dps-h-metric-label">{t('bench.score')}</span>
                      <span className="dps-h-level" style={{ color }}>● {level} {e.score ?? '—'}/100</span>
                    </div>
                    {bench.updatedAt && <div className="dps-h-metric"><span className="dps-h-metric-label">{t('bench.updated')}</span><span>{formatDate(bench.updatedAt)}</span></div>}
                    {bench.ecosystemAvg != null && <div className="dps-h-metric"><span className="dps-h-metric-label">{t('bench.ecoAvg')}</span><span>{bench.ecosystemAvg}/100</span></div>}
                  </div>

                  {e.error && <div className="dps-security-warning"><p>{t('bench.failed')}: {String(e.error)}</p></div>}

                  <div className="dps-section">
                    <h4 className="dps-section-title">{t('bench.metrics')}</h4>
                    {bars.map(([label, val, pct]) => (
                      <div key={label} className="dps-h-bar-row">
                        <span className="dps-h-bar-label">{label}</span>
                        <div className="dps-h-bar-track">
                          <div className="dps-h-bar-fill lv-healthy" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="dps-h-bar-val">{val}</span>
                      </div>
                    ))}
                  </div>

                  <p className="dps-muted-sm">{t('bench.note')}</p>
                </>
              );
            })()
          )}
        </div>
      )}

      {tab === 'wiki' && (
        <div className="dps-tab-body">
          {wikiLoading ? (
            <div className="dps-empty">{t('wiki.loading')}</div>
          ) : !wiki ? (
            <div className="dps-empty"><p>{t('wiki.noEntry')}</p></div>
          ) : (
            <>
              <div className="dps-wiki-head">
                <div>
                  <div className="dps-wiki-name">{wiki.name} <span className="dps-muted-sm">@{wiki.developer}</span></div>
                  {wiki.shortDescription && <p className="dps-wiki-desc">{wiki.shortDescription}</p>}
                </div>
                <TrustBadge level={wiki.trustLevel} t={t} />
              </div>

              <details className="dps-wiki-install">
                <summary className="dps-wiki-install-summary">{t('wiki.install')} <span className="dps-muted-sm">{t('wiki.installHint')}</span></summary>
                <div className="dps-wiki-install-body">
                  {wiki.npmInstall && (
                    <div className="dps-cmd">
                      <code className="dps-cmd-code">dsh plugin add {wiki.npmInstall}</code>
                      <button type="button" className="dps-icon-btn" onClick={() => copyCmd(`dsh plugin add ${wiki.npmInstall}`)} aria-label={t('scaffold.copyAria')} title={t('scaffold.copy')}>
                        {copiedCmd === `dsh plugin add ${wiki.npmInstall}` ? '✓' : t('scaffold.copy')}
                      </button>
                    </div>
                  )}
                  {wiki.gitInstall && (
                    <div className="dps-cmd">
                      <code className="dps-cmd-code">dsh plugin add {wiki.gitInstall}</code>
                      <button type="button" className="dps-icon-btn" onClick={() => copyCmd(`dsh plugin add ${wiki.gitInstall}`)} aria-label={t('scaffold.copyAria')} title={t('scaffold.copy')}>
                        {copiedCmd === `dsh plugin add ${wiki.gitInstall}` ? '✓' : t('scaffold.copy')}
                      </button>
                    </div>
                  )}
                  <div className="dps-wiki-facts">
                    <span className="dps-muted-sm">{t('wiki.latestVer')} {wiki.latestVersion ?? '—'}</span>
                    <span className="dps-dot">·</span>
                    <span className="dps-muted-sm">{t('wiki.verCount')} {wiki.versionCount}</span>
                    <span className="dps-dot">·</span>
                    <span className="dps-muted-sm">{t('wiki.deps')} {wiki.dependencies.length}</span>
                    {wiki.license && <><span className="dps-dot">·</span><span className="dps-muted-sm">{wiki.license}</span></>}
                    {wiki.homepage && <a className="dps-wiki-link" href={wiki.homepage} target="_blank" rel="noreferrer">{t('wiki.homepage')} ↗</a>}
                  </div>
                </div>
              </details>

              <div className="dps-section">
                <h4 className="dps-section-title">{t('wiki.what')}</h4>
                <p className="dps-wiki-text">{wiki.description || wiki.shortDescription || '—'}</p>
              </div>

              {wiki.highlights && (
                <div className="dps-section">
                  <h4 className="dps-section-title">{t('wiki.highlights')}</h4>
                  <div className="dps-wiki-markdown"><Markdown text={wiki.highlights} /></div>
                </div>
              )}

              {wiki.usage && (
                <div className="dps-section">
                  <h4 className="dps-section-title">{t('wiki.howto')}</h4>
                  <div className="dps-wiki-markdown"><Markdown text={wiki.usage} /></div>
                </div>
              )}

              {wiki.bestPractices && (
                <div className="dps-section">
                  <h4 className="dps-section-title">{t('wiki.bestPractices')}</h4>
                  <div className="dps-wiki-markdown"><Markdown text={wiki.bestPractices} /></div>
                </div>
              )}

              {wiki.related.length > 0 && (
                <div className="dps-section">
                  <h4 className="dps-section-title">{t('wiki.related')}</h4>
                  <div className="dps-h-list">
                    {wiki.related.map((r) => (
                      <div key={r.packageName} className="dps-h-row" role="button" tabIndex={0} onClick={() => { setWiki(null); onChanged(); window.dispatchEvent(new CustomEvent('dps-open-plugin', { detail: r.packageName })); }} onKeyDown={(e) => { if (e.key === 'Enter') { setWiki(null); window.dispatchEvent(new CustomEvent('dps-open-plugin', { detail: r.packageName })); } }}>
                        <div className="dps-h-row-main">
                          <div className="dps-h-row-name">{r.name} <span className="dps-muted-sm">@{r.developer}</span></div>
                          {r.shortDescription && <div className="dps-h-row-meta"><span className="dps-muted-sm">{r.shortDescription.slice(0, 80)}</span></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ---- Installed ---------------------------------------------------------------

const INSTALLED_GROUP_LABEL: Record<string, string> = {
  core: '核心服务', ui: '界面增强', tool: '开发工具', llm: '模型与 LLM', agent: 'Agent',
  workflow: '工作流', data: '数据处理', notification: '通知', hubExt: '可扩展类', other: '其他',
};

// Full set of installable group keys — fed into the t() lookup below.
const GROUP_KEYS = ['core', 'ui', 'tool', 'llm', 'agent', 'workflow', 'data', 'notification', 'other'] as const;

function Installed({ api, onOpen, t }: { api: RemoteApi; onOpen: (name: string) => void; t: (key: string) => string }): ReactNode {
  const [list, setList] = useState<InstalledPlugin[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [catBusy, setCatBusy] = useState<'system' | 'download' | 'own' | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    setList(null);
    try { setList(await api.installed()); } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [api]);

  useEffect(() => { void load(); }, [load]);

  const toggle = async (p: InstalledPlugin) => {
    setBusy(p.packageName);
    try {
      const r = await api.setEnabled(p.packageName, !p.enabled, getActor());
      setError(r.ok ? null : r.message);
      if (r.ok) await load();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(null); }
  };

  const remove = async (p: InstalledPlugin) => {
    const isSelf = p.packageName === 'dsh-plugin-hub';
    const msg = isSelf
      ? `确定卸载插件商店（dsh-plugin-hub）？\n\n卸载后插件商店将不再可用，如需恢复请重新安装。`
      : `确定卸载 ${p.packageName}？卸载后将移除该插件及其条目。`;
    if (!window.confirm(msg)) return;
    setBusy(p.packageName);
    try {
      const r = await api.uninstall(p.packageName, getActor());
      setError(r.ok ? null : r.message);
      if (r.ok) await load();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(null); }
  };

  const toggleCategory = async (cat: 'system' | 'download' | 'own', enabled: boolean) => {
    setCatBusy(cat);
    try {
      const r = await api.setCategoryEnabled(cat, enabled, getActor());
      setError(r.ok ? null : r.message);
      if (r.ok) await load();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setCatBusy(null); }
  };

  const switchCtl = (p: InstalledPlugin) => (
    <button
      type="button"
      role="switch"
      aria-checked={p.enabled}
      className={`dps-switch${p.enabled ? ' on' : ''}${p.protected ? ' locked' : ''}`}
      disabled={busy === p.packageName || p.protected}
      onClick={(e) => { e.stopPropagation(); void toggle(p); }}
      title={p.protected ? t('installed.protected') : p.enabled ? t('action.disable') : t('action.enable')}
    >
      <span className="dps-switch-knob" />
    </button>
  );

  const renderGroup = (cat: 'system' | 'download' | 'own', group: string, label: string, items: InstalledPlugin[]) => {
    const key = `${cat}:${group}`;
    const isCollapsed = collapsed[key] === true;
    const allOn = items.length > 0 && items.every((p) => p.enabled);
    const anyOn = items.some((p) => p.enabled);
    return (
      <div key={key} className="dps-inst-group">
        <div className="dps-inst-group-head" role="button" tabIndex={0} onClick={() => setCollapsed((c) => ({ ...c, [key]: !c[key] }))} onKeyDown={(e) => { if (e.key === 'Enter') setCollapsed((c) => ({ ...c, [key]: !c[key] })); }}>
          <span className="dps-inst-caret">{isCollapsed ? '▸' : '▾'}</span>
          <span className="dps-inst-group-label">{label}</span>
          <span className="dps-inst-group-count">{items.length} {t('installed.items')}</span>
          <span className="dps-inst-group-state">{allOn ? t('installed.allEnable') : anyOn ? t('installed.partialEnable') : t('action.disable')}</span>
        </div>
        {!isCollapsed && (
          <div className="dps-inst-group-body">
            {items.map((p) => (
              <div key={p.packageName} className={`dps-inst-row${p.enabled ? '' : ' off'}`}>
                <div className="dps-inst-info" role="button" tabIndex={0} onClick={() => onOpen(p.packageName)} onKeyDown={(e) => { if (e.key === 'Enter') onOpen(p.packageName); }}>
                  <span className="dps-inst-name" title={p.packageName}>{p.name}</span>
                  {p.localPath && <span className="dps-inst-path" title={p.localPath}>📁 {p.localPath}</span>}
                  {p.category === 'own' && p.published && (
                    <a className="dps-badge dps-badge-npm" href={p.repoUrl ?? `https://www.npmjs.com/package/${encodeURIComponent(p.packageName)}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} title={p.repoUrl ?? 'npm 已发布'}>📦 已发布</a>
                  )}
                  {p.category === 'own' && !p.published && (
                    <span className="dps-badge dps-badge-own-unpub" title="本地开发中，尚未发布到 npm">📝 未发布</span>
                  )}
                  {p.hasUpdate && p.latestVersion && (
                    <span className="dps-badge dps-badge-update" title={`${t('installed.updateTitle')} v${p.latestVersion}`}>🔄 v{p.latestVersion}</span>
                  )}
                  {p.managed && <span className="dps-badge dps-badge-npm">{t('installed.managed')}</span>}
                  {p.protected && <span className="dps-badge dps-badge-github">{t('installed.protected')}</span>}
                  {!p.managed && !p.protected && <span className="dps-muted-sm">{t('installed.unmanaged')}</span>}
                </div>
                <div className="dps-inst-actions">
                  {switchCtl(p)}
                  {!p.protected && (
                    <button type="button" className="dps-icon-btn" title={p.packageName === 'dsh-plugin-hub' ? '卸载插件商店' : t('action.uninstall')} disabled={busy === p.packageName} onClick={() => void remove(p)}>
                      <IconTrashOutline16 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCategory = (cat: 'system' | 'download' | 'own', title: string, desc: string, items: InstalledPlugin[]) => {
    const allOn = items.length > 0 && items.every((p) => p.enabled || p.protected);
    const groups = new Map<string, InstalledPlugin[]>();
    for (const p of items) {
      const g = p.group || 'other';
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g)!.push(p);
    }
    const order = cat === 'system' ? ['core', 'ui', 'tool', 'other'] : ['core', 'ui', 'tool', 'llm', 'agent', 'workflow', 'data', 'notification', 'other'];
    const groupKeys = [...groups.keys()].sort((a, b) => {
      const ia = order.indexOf(a); const ib = order.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    return (
      <section className="dps-inst-cat">
        <div className="dps-inst-cat-head">
          <div className="dps-inst-cat-title">
            <h4>{title}</h4>
            <span className="dps-muted-sm">{desc}</span>
          </div>
          <div className="dps-inst-cat-actions">
            <span className={`dps-state-chip${allOn ? '' : ' off'}`}>{allOn ? t('installed.allEnable') : t('installed.partialEnable')}</span>
            <button type="button" className="dps-btn dps-btn-sm" disabled={catBusy === cat} onClick={() => void toggleCategory(cat, !allOn)}>
              {catBusy === cat ? t('action.processing') : allOn ? t('action.disable') : t('installed.allEnable')}
            </button>
          </div>
        </div>
        {groupKeys.length === 0 ? (
          <div className="dps-empty dps-empty-sm"><p>暂无{title}</p></div>
        ) : (
          groupKeys.map((g) => renderGroup(cat, g, t(`installed.group.${g}`) !== `installed.group.${g}` ? t(`installed.group.${g}`) : INSTALLED_GROUP_LABEL[g] ?? groups.get(g)![0]?.groupLabel ?? g, groups.get(g)!))
        )}
      </section>
    );
  };

  const system = (list ?? []).filter((p) => p.category === 'system');
  const download = (list ?? []).filter((p) => p.category === 'download');
  const own = (list ?? []).filter((p) => p.category === 'own');

  return (
    <div className="dps-view">
      <div className="dps-view-head">
        <h3 className="dps-view-title">{t('installed.title')}</h3>
        <button type="button" className="dps-icon-btn" onClick={() => void load()} aria-label={t('app.close')}><IconRefreshOutline16 size={15} /></button>
      </div>
      <ErrorBanner error={error} onDismiss={() => setError(null)} t={t} />
      {list === null ? (
        <div className="dps-empty">加载中…</div>
      ) : list.length === 0 ? (
        <div className="dps-empty"><p>尚未安装任何插件。前往「发现」浏览并一键安装。</p></div>
      ) : (
        <div className="dps-inst">
          {renderCategory('system', t('installed.system'), t('installed.coreDesc'), system)}
          {renderCategory('download', t('installed.download'), t('installed.downloadDesc'), download)}
          {renderCategory('own', t('installed.own'), t('installed.ownDesc'), own)}
        </div>
      )}
    </div>
  );
}

// ---- Settings ----------------------------------------------------------------

function Settings({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
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

  // poll while syncing
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
      if (r.ok) { setToken(''); setNotice(r.message); await refresh(); }
      else setError(r.message);
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
    setActor(actor);
    setNotice(t('settings.tokenSaved') + '：' + actor);
  };

  return (
    <div className="dps-view dps-settings">
      <h3 className="dps-view-title">{t('settings.title')}</h3>
      <ErrorBanner error={error} onDismiss={() => setError(null)} />
      {notice && <div className="dps-notice">{notice}</div>}

      <section className="dps-section">
        <h4 className="dps-section-title"><IconUserOutline16 size={15} /> {t('settings.operator')}</h4>
        <div className="dps-row">
          <input className="dps-input" value={actor} placeholder={t('settings.anonymous')} maxLength={64} onChange={(e) => setActorName(e.target.value)} />
          <button type="button" className="dps-btn" onClick={saveActor}>{t('settings.saveActor')}</button>
        </div>
        <p className="dps-hint">{t('settings.operatorHint')}</p>
      </section>

      <section className="dps-section">
        <h4 className="dps-section-title"><IconSettingsOutline16 size={15} /> {t('settings.githubToken')}</h4>
        <p className="dps-hint" dangerouslySetInnerHTML={{ __html: t('settings.githubTokenHint') }} />
        <div className="dps-row">
          <input className="dps-input" type="password" value={token} placeholder={settings?.tokenConfigured ? `已配置：${settings.tokenMasked}` : t('settings.tokenPlaceholder') + '（ghp_…）'} onChange={(e) => setToken(e.target.value)} autoComplete="off" />
          <button type="button" className="dps-btn dps-btn-primary" disabled={busy === 'token' || !token.trim()} onClick={() => void saveToken()}>{t('settings.saveToken')}</button>
          {settings?.tokenConfigured && (
            <button type="button" className="dps-btn dps-btn-danger" disabled={busy === 'token'} onClick={() => void clearToken()}>{t('settings.clearToken')}</button>
          )}
        </div>
        {settings && (
          <p className="dps-hint">
            当前额度：{settings.rateLimitRemaining === null ? t('settings.uncached') : `剩余 ${settings.rateLimitRemaining} 次（核心）`} · {t('settings.plugins')}：{settings.pluginCount} ·
            {t('settings.dbPath')}：<code>{settings.dbPath}</code>
          </p>
        )}
      </section>

      <section className="dps-section">
        <h4 className="dps-section-title"><IconRefreshOutline16 size={15} /> {t('settings.mirror')}</h4>
        <p className="dps-hint" dangerouslySetInnerHTML={{ __html: t('settings.mirrorHint') }} />
        <div className="dps-row">
          <label className="dps-inline-label">{t('settings.syncInterval')}</label>
          <input className="dps-input dps-input-num" type="number" min={0} max={168} value={hours} onChange={(e) => setHours(e.target.value)} />
          <button type="button" className="dps-btn" disabled={busy === 'schedule'} onClick={() => void saveSchedule()}>{t('settings.savePlan')}</button>
          <button type="button" className="dps-btn dps-btn-primary" disabled={busy === 'sync' || status?.state === 'syncing'} onClick={() => void syncNow()}>
            {status?.state === 'syncing' ? '同步中…' : t('settings.syncNow')}
          </button>
        </div>
        {status && (
          <div className="dps-status">
            <div className="dps-status-line">
              {t('audit.action')}：<span className={`dps-state-chip${status.state === 'error' ? ' off' : ''}`}>
                {status.state === 'syncing' ? '同步中' : status.state === 'error' ? '出错' : t('settings.idle')}
              </span>
              {status.lastSyncAt && <> · {t('settings.lastSync')}：{formatDate(status.lastSyncAt)}（{status.lastSyncTotal} {t('settings.plugins')}）</>}
              {status.nextSyncAt && <> · {t('settings.nextPlan')}：{formatDate(status.nextSyncAt)}</>}
            </div>
            {status.lastError && <div className="dps-status-error"><IconWarningOutline16 size={14} /> {status.lastError}</div>}
          </div>
        )}
      </section>

      {/* dsh-connector：IM/聊天平台桥接配置（官方可扩展类插件） */}
      <ConnectorSettings api={api} t={t} />
    </div>
  );
}

/** 设置页「连接器」区：飞书平台配置 + 状态（dsh-connector 官方插件）。 */
function ConnectorSettings({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const [cs, setCs] = useState<Awaited<ReturnType<RemoteApi['connectorStatus']>> | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [installed, setInstalled] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const r = await api.connectorStatus();
      setCs(r);
      setInstalled(r.installed);
      const f = (r.config.feishu as Record<string, unknown> | undefined) ?? {};
      setForm({
        enabled: f.enabled ? 'on' : 'off',
        appId: String(f.appId ?? ''),
        appSecret: String(f.appSecret ?? ''),
        verifyToken: String(f.verifyToken ?? ''),
        port: String(f.port ?? '8787'),
      });
    } catch { /* keep */ }
  }, [api]);

  useEffect(() => { void refresh(); }, [refresh]);

  const save = async () => {
    setBusy(true);
    try {
      const r = await api.connectorConfigSet('feishu', {
        enabled: form.enabled === 'on',
        appId: form.appId.trim(),
        appSecret: form.appSecret.trim(),
        verifyToken: form.verifyToken.trim(),
        port: Number(form.port || 8787),
      });
      setSaved(r.ok ? r.message : null);
      await refresh();
    } catch (e) { setSaved(e instanceof Error ? e.message : String(e)); } finally { setBusy(false); }
  };

  const feishuStatus = (cs?.status as Record<string, unknown> | undefined)?.feishu as Record<string, unknown> | undefined;

  return (
    <section className="dps-section">
      <h4 className="dps-section-title">🔌 {t('connector.title')}</h4>
      <p className="dps-hint">{t('connector.desc')}</p>
      {!installed && <div className="dps-security-warning"><p>{t('connector.notInstalled')}</p></div>}
      {saved && <div className="dps-notice">{saved}</div>}

      <div className="dps-connector-platform">
        <strong>飞书（Feishu/Lark）</strong>
        {feishuStatus && (
          <span className={`dps-state-chip${feishuStatus.running ? '' : ' off'}`}>
            {feishuStatus.running ? `运行中 (port ${feishuStatus.port ?? '—'})` : feishuStatus.enabled ? '已启用（未运行）' : '未启用'}
          </span>
        )}
        <div className="dps-row">
          <label className="dps-inline-label">启用</label>
          <input type="checkbox" checked={form.enabled === 'on'} onChange={(e) => setForm({ ...form, enabled: e.target.checked ? 'on' : 'off' })} />
        </div>
        <div className="dps-row">
          <label className="dps-inline-label">App ID</label>
          <input className="dps-input" value={form.appId ?? ''} placeholder="cli_xxxxx" onChange={(e) => setForm({ ...form, appId: e.target.value })} />
        </div>
        <div className="dps-row">
          <label className="dps-inline-label">App Secret</label>
          <input className="dps-input" type="password" value={form.appSecret ?? ''} placeholder="应用密钥" onChange={(e) => setForm({ ...form, appSecret: e.target.value })} />
        </div>
        <div className="dps-row">
          <label className="dps-inline-label">Verify Token</label>
          <input className="dps-input" value={form.verifyToken ?? ''} placeholder="事件订阅验证 token" onChange={(e) => setForm({ ...form, verifyToken: e.target.value })} />
        </div>
        <div className="dps-row">
          <label className="dps-inline-label">端口</label>
          <input className="dps-input dps-input-num" value={form.port ?? '8787'} onChange={(e) => setForm({ ...form, port: e.target.value })} />
        </div>
        <div className="dps-row">
          <button type="button" className="dps-btn dps-btn-primary" disabled={busy} onClick={() => void save()}>{t('connector.save')}</button>
          <button type="button" className="dps-btn" disabled={busy} onClick={() => void refresh()}>{t('connector.refresh')}</button>
        </div>
        <p className="dps-hint">{t('connector.restartHint')}</p>
      </div>
    </section>
  );
}

// ---- Audit -------------------------------------------------------------------

function Audit({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const [page, setPage] = useState<Awaited<ReturnType<RemoteApi['audit']>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState('');
  const [actor, setActorFilter] = useState('');
  const [target, setTarget] = useState('');
  const [offset, setOffset] = useState(0);
  const [reload, setReload] = useState(0);
  const LIMIT = 50;

  useEffect(() => {
    let cancelled = false;
    api.audit({ action: action || null, actor: actor || null, target: target || null, limit: LIMIT, offset })
      .then((p) => { if (!cancelled) setPage(p); })
      .catch((e) => { if (!cancelled) setError(e instanceof Error ? e.message : String(e)); });
    return () => { cancelled = true; };
  }, [api, action, actor, target, offset, reload]);

  return (
    <div className="dps-view">
      <div className="dps-view-head">
        <h3 className="dps-view-title">{t('audit.title')}</h3>
        <button type="button" className="dps-icon-btn" onClick={() => setReload((n) => n + 1)} aria-label={t('app.close')}><IconRefreshOutline16 size={15} /></button>
      </div>
      <div className="dps-toolbar dps-toolbar-inline">
        <select className="dps-select" value={action} onChange={(e) => { setAction(e.target.value); setOffset(0); }} aria-label={t('audit.byActor')}>
          <option value="">{t('audit.allActions')}</option>
          {(['install','uninstall','enable','disable','rate','tokenSet','tokenClear','sync','scheduleSet'] as const).map((k) => (
            <option key={k} value={k}>{t(`audit.${k}`)}</option>
          ))}
        </select>
        <input className="dps-input dps-input-sm" placeholder={t('audit.byActor')} value={actor} onChange={(e) => { setActorFilter(e.target.value); setOffset(0); }} />
        <input className="dps-input dps-input-sm" placeholder={t('audit.byTarget')} value={target} onChange={(e) => { setTarget(e.target.value); setOffset(0); }} />
      </div>
      <ErrorBanner error={error} onDismiss={() => setError(null)} />
      {page === null ? (
        <div className="dps-empty">加载中…</div>
      ) : page.rows.length === 0 ? (
        <div className="dps-empty"><p>{t('audit.time') === t('audit.time') ? '暂无审计记录。' : 'No audit records.'}</p></div>
      ) : (
        <>
          <table className="dps-table">
            <thead><tr><th>{t('audit.time')}</th><th>{t('audit.actor')}</th><th>{t('audit.action')}</th><th>{t('audit.target')}</th><th>{t('audit.result')}</th><th>{t('audit.detail')}</th></tr></thead>
            <tbody>
              {page.rows.map((r) => (
                <tr key={r.id}>
                  <td className="dps-cell-nowrap">{formatDate(r.createdAt)}</td>
                  <td className="dps-strong">{r.actor}</td>
                  <td><span className={`dps-action-chip${r.action === 'install' || r.action === 'enable' ? '' : ' alt'}`}>{t(`audit.${r.action}`) !== `audit.${r.action}` ? t(`audit.${r.action}`) : r.action}</span></td>
                  <td className="dps-cell-ellipsis" title={r.target}>{r.target}</td>
                  <td><span className={`dps-result-chip${r.result === 'ok' ? '' : ' fail'}`}>{r.result === 'ok' ? t('audit.ok') : t('audit.failed')}</span></td>
                  <td className="dps-cell-ellipsis" title={r.message}>{r.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dps-pager">
            <button type="button" className="dps-btn dps-btn-sm" disabled={offset === 0} onClick={() => setOffset(Math.max(0, offset - LIMIT))}>上一页</button>
            <span className="dps-pager-info">{offset + 1}–{Math.min(offset + LIMIT, page.total)} / 共 {page.total} 条</span>
            <button type="button" className="dps-btn dps-btn-sm" disabled={offset + LIMIT >= page.total} onClick={() => setOffset(offset + LIMIT)}>下一页</button>
          </div>
        </>
      )}
    </div>
  );
}

// ---- Publish (one-click publish of locally-developed plugins) --------------

type MyPlugin = Awaited<ReturnType<RemoteApi['myPlugins']>>[number];
type PublishTarget = 'github' | 'npm' | 'both';

const PUBLISH_TOPIC_PRESETS = ['dsh-plugin', 'deepseek', 'agent', 'tool', 'ui', 'data', 'workflow', 'llm'];

/** Minimal Markdown → safe HTML for the publish preview (no external libs).
 * HTML is escaped first; only the tags below are re-created. */
function renderMarkdown(md: string): string {
  let s = String(md ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // pull fenced code blocks aside (placeholder keeps them single-line so the
  // paragraph pass cannot wrap their inner lines), restore at the end.
  const codeBlocks: string[] = [];
  s = s.replace(/```([\s\S]*?)```/g, (_m, code: string) => {
    let c = code.trim();
    const lines = c.split('\n');
    // drop the language tag when present (first short token line)
    if (lines.length > 1 && /^[a-zA-Z0-9_+-]{1,20}$/.test(lines[0]!.trim())) c = lines.slice(1).join('\n');
    codeBlocks.push(c);
    return `\u0000DPSCODE${codeBlocks.length - 1}\u0000`;
  });
  // images ![alt](url)
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="dps-md-img" src="$2" alt="$1" loading="lazy" />');
  // links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="dps-md-link" href="$2" target="_blank" rel="noreferrer">$1</a>');
  // headings
  s = s.replace(/^### (.*)$/gm, '<h4>$1</h4>');
  s = s.replace(/^## (.*)$/gm, '<h3>$1</h3>');
  s = s.replace(/^# (.*)$/gm, '<h2>$1</h2>');
  // bold / italic / inline code
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // unordered list items
  s = s.replace(/^\s*[-*] (.*)$/gm, '<li>$1</li>');
  s = s.replace(/(<li>[\s\S]*?<\/li>)/g, (m) => (m.includes('<ul>') ? m : `<ul>${m}</ul>`));
  // remaining blocks become paragraphs (split on blank lines; blocks that
  // already contain generated HTML or a code placeholder are left intact)
  s = s.split(/\n{2,}/).map((block) => {
    if (!block.trim()) return '';
    if (block.startsWith('\u0000DPSCODE') || block.startsWith('<')) return block;
    return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');
  // restore code blocks
  s = s.replace(/\u0000DPSCODE(\d+)\u0000/g, (_m, i: string) => `<pre class="dps-md-pre"><code>${codeBlocks[Number(i)] ?? ''}</code></pre>`);
  return s;
}

function PublishView({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const [plugins, setPlugins] = useState<MyPlugin[] | null>(null);
  const [target, setTarget] = useState<PublishTarget>('github');
  const [githubToken, setGithubToken] = useState('');
  const [npmToken, setNpmToken] = useState('');
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [topics, setTopics] = useState<string[]>(['dsh-plugin']);
  const [descMode, setDescMode] = useState<'edit' | 'preview'>('edit');
  const [writeReadme, setWriteReadme] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<ReturnType<RemoteApi['publish']>> | null>(null);
  const [progress, setProgress] = useState<{ phase: string; percent: number | null; detail: string } | null>(null);

  const load = useCallback(async () => {
    try {
      const list = await api.myPlugins();
      setPlugins(list);
      if (list.length > 0 && !selected) {
        setSelected(list[0].packageName);
        setDescription(list[0].description ?? '');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [api, selected]);

  useEffect(() => { void load(); }, [load]);

  const onSelect = (name: string) => {
    setSelected(name);
    const p = plugins?.find((x) => x.packageName === name);
    if (p) setDescription(p.description ?? '');
  };

  const toggleTopic = (topic: string) => {
    setTopics((prev) => prev.includes(topic) ? prev.filter((x) => x !== topic) : [...prev, topic]);
  };

  const doPublish = async () => {
    if (!selected) { setError(t('publish.errNoPlugin')); return; }
    setBusy(true);
    setError(null);
    setResult(null);
    setProgress({ phase: t('publish.starting'), percent: 0, detail: '' });
    const poll = window.setInterval(() => {
      void api.publishProgress(selected).then((p) => { if (p) setProgress(p); }).catch(() => undefined);
    }, 600);
    try {
      const r = await api.publish(
        {
          packageName: selected,
          target,
          githubToken: githubToken.trim() || undefined,
          npmToken: npmToken.trim() || undefined,
          visibility,
          description,
          topics,
          writeReadme,
        },
        getActor(),
      );
      setResult(r);
      setProgress(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      window.clearInterval(poll);
      // Tokens are session-only for security — always clear after a publish.
      setGithubToken('');
      setNpmToken('');
      setBusy(false);
    }
  };

  const needGithub = target === 'github' || target === 'both';
  const needNpm = target === 'npm' || target === 'both';

  return (
    <div className="dps-view dps-publish">
      <div className="dps-scaffold-hero">
        <div className="dps-scaffold-hero-icon"><IconCodeOutline16 size={26} /></div>
        <div>
          <h3 className="dps-scaffold-title">{t('publish.title')}</h3>
          <p className="dps-scaffold-desc">{t('publish.desc')}</p>
        </div>
      </div>

      <div className="dps-publish-grid">
        {/* 1. target */}
        <section className="dps-section">
          <h4 className="dps-section-title">{t('publish.stepTarget')}</h4>
          <div className="dps-chips" role="group">
            {(['github', 'npm', 'both'] as const).map((k) => (
              <button key={k} type="button" className={`dps-chip${target === k ? ' active' : ''}`} onClick={() => setTarget(k)}>
                {t(`publish.target.${k}`)}
              </button>
            ))}
          </div>
        </section>

        {/* 2. API keys */}
        <section className="dps-section">
          <h4 className="dps-section-title">{t('publish.stepKeys')}</h4>
          {needGithub && (
            <div className="dps-row">
              <input
                className="dps-input"
                type="password"
                value={githubToken}
                placeholder={t('publish.ghTokenPlaceholder')}
                onChange={(e) => setGithubToken(e.target.value)}
                autoComplete="off"
              />
            </div>
          )}
          {needNpm && (
            <div className="dps-row">
              <input
                className="dps-input"
                type="password"
                value={npmToken}
                placeholder={t('publish.npmTokenPlaceholder')}
                onChange={(e) => setNpmToken(e.target.value)}
                autoComplete="off"
              />
            </div>
          )}
          <p className="dps-hint">{t('publish.keysHint')}</p>
        </section>

        {/* 3. pick plugin */}
        <section className="dps-section">
          <h4 className="dps-section-title">{t('publish.stepPlugin')}</h4>
          {plugins === null ? (
            <div className="dps-empty">{t('publish.loading')}</div>
          ) : plugins.length === 0 ? (
            <div className="dps-empty"><p>{t('publish.noOwn')}</p></div>
          ) : (
            <>
              <select className="dps-select" value={selected} onChange={(e) => onSelect(e.target.value)}>
                {plugins.map((p) => (
                  <option key={p.packageName} value={p.packageName}>
                    {p.pkgName}@{p.version ?? '?'}{p.published ? `  📦${t('publish.published')}` : ''} — {p.localPath ?? ''}
                  </option>
                ))}
              </select>
              <p className="dps-hint" title={selected}>{selected ? `📁 ${plugins.find((p) => p.packageName === selected)?.localPath ?? ''}` : ''}</p>
            </>
          )}
        </section>

        {/* 4. description / visibility / topics */}
        {selected && plugins && plugins.length > 0 && (
          <section className="dps-section">
            <h4 className="dps-section-title">{t('publish.stepInfo')}</h4>
            <div className="dps-md-tabs" role="tablist">
              <button type="button" role="tab" aria-selected={descMode === 'edit'} className={`dps-md-tab${descMode === 'edit' ? ' on' : ''}`} onClick={() => setDescMode('edit')}>{t('publish.mdEdit')}</button>
              <button type="button" role="tab" aria-selected={descMode === 'preview'} className={`dps-md-tab${descMode === 'preview' ? ' on' : ''}`} onClick={() => setDescMode('preview')}>{t('publish.mdPreview')}</button>
            </div>
            {descMode === 'edit' ? (
              <textarea
                className="dps-input dps-input-area"
                rows={9}
                value={description}
                placeholder={t('publish.descPlaceholder')}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <div className="dps-md-preview" dangerouslySetInnerHTML={{ __html: renderMarkdown(description || t('publish.mdEmpty')) }} />
            )}
            <p className="dps-hint">{t('publish.mdHint')}</p>
            <label className="dps-check">
              <input type="checkbox" checked={writeReadme} onChange={(e) => setWriteReadme(e.target.checked)} />
              {t('publish.writeReadme')}
            </label>
            <div className="dps-row">
              <span className="dps-inline-label">{t('publish.visibility')}</span>
              <button type="button" className={`dps-chip${visibility === 'public' ? ' active' : ''}`} onClick={() => setVisibility('public')}>{t('publish.public')}</button>
              <button type="button" className={`dps-chip${visibility === 'private' ? ' active' : ''}`} onClick={() => setVisibility('private')}>{t('publish.private')}</button>
              <span className="dps-muted-sm">{t('publish.visibilityHint')}</span>
            </div>
            <div className="dps-row">
              <span className="dps-inline-label">{t('publish.topics')}</span>
              {PUBLISH_TOPIC_PRESETS.map((topic) => (
                <button key={topic} type="button" className={`dps-chip${topics.includes(topic) ? ' active' : ''}`} onClick={() => toggleTopic(topic)}>
                  {topic}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 5. publish */}
        <section className="dps-section">
          <div className="dps-row">
            <button type="button" className="dps-btn dps-btn-primary" disabled={busy || !selected} onClick={() => void doPublish()}>
              {busy ? t('publish.publishing') : t('publish.submit')}
            </button>
            {result?.ok && (
              <span className="dps-notice dps-notice-ok">
                {result.repoUrl && <a href={result.repoUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
                {result.repoUrl && result.npmUrl && '  '}
                {result.npmUrl && <a href={result.npmUrl} target="_blank" rel="noreferrer">npm ↗</a>}
              </span>
            )}
          </div>
          {busy && progress && (
            <div className="dps-install-progress" role="progressbar" aria-valuenow={progress.percent ?? undefined} style={{ marginTop: 10 }}>
              <div className="dps-install-progress-head">
                <span className="dps-install-progress-label">
                  {progress.percent == null ? progress.phase : `${progress.phase} ${progress.percent}%`}
                </span>
                {progress.detail && <span className="dps-muted-sm" title={progress.detail}>{progress.detail}</span>}
              </div>
              <div className="dps-install-progress-track">
                <div
                  className={`dps-install-progress-bar${progress.percent == null ? ' indeterminate' : ''}`}
                  style={progress.percent != null ? { width: `${progress.percent}%` } : undefined}
                />
              </div>
            </div>
          )}
          {result && !result.ok && (
            <div className="dps-publish-result-fail">
              <p>{result.message}</p>
              {result.security && (
                <div className="dps-security-blocked">
                  {result.security.findings.map((f, i) => (
                    <div key={i} className="dps-security-item">
                      <span className="dps-security-sev">🚫 {f.severity === 'critical' ? '高风险' : '警告'}</span>
                      <code>{f.rule}</code> {f.target}: {f.detail}
                    </div>
                  ))}
                </div>
              )}
              {!result.security && result.detail && <pre className="dps-error-detail">{result.detail}</pre>}
            </div>
          )}
          {result && result.ok && result.security?.level === 'warning' && (
            <div className="dps-security-warning">
              <p>{t('publish.secWarningTitle')}</p>
              {result.security.findings.map((f, i) => (
                <div key={i} className="dps-security-item">
                  <span className="dps-security-sev">⚠️ {f.severity === 'critical' ? '高风险' : '警告'}</span>
                  <code>{f.rule}</code> {f.target}: {f.detail}
                </div>
              ))}
            </div>
          )}
          <ErrorBanner error={error} onDismiss={() => setError(null)} t={t} />
        </section>
      </div>
    </div>
  );
}

// ---- Health Hub -------------------------------------------------------------

const HEALTH_META: Record<string, { label: string; color: string }> = {
  healthy: { label: '健康', color: '#2e9e5b' },
  attention: { label: '需关注', color: '#d18a2a' },
  stale: { label: '已停滞', color: '#d64545' },
};

/** Multi-series daily counts chart (commits/stars) with zoom & pan. */
function TrendChart({ series, t }: { series: Array<{ key: string; label: string; color: string; points: Array<{ date: string; count: number }> }>; t: (k: string) => string }): ReactNode {
  const W = 660;
  const H = 210;
  const PAD = { l: 52, r: 14, t: 18, b: 24 };
  const dragRef = useRef<{ x0: number; start0: number; end0: number } | null>(null);
  const [view, setView] = useState<{ start: number; end: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const all = series.flatMap((s) => s.points.map((p) => ({ date: p.date, count: p.count })));
  if (all.length === 0) return <div className="dps-empty"><p>{t('health.noData')}</p></div>;
  const tsList = all.map((p) => Date.parse(p.date)).filter((n) => !Number.isNaN(n));
  const minTs = Math.min(...tsList);
  const maxTs = Math.max(...tsList, Date.now());
  const range = Math.max(maxTs - minTs, 86_400_000);
  const v = view ?? { start: minTs - range * 0.03, end: maxTs + range * 0.02 };
  const span = Math.max(v.end - v.start, 86_400_000);
  const x = (ts: number) => PAD.l + ((ts - v.start) / span) * (W - PAD.l - PAD.r);
  const maxC = Math.max(1, ...all.map((p) => p.count));
  const y = (c: number) => PAD.t + (H - PAD.t - PAD.b) * (1 - c / maxC);

  const zoom = (clientX: number, factor: number) => {
    const ratio = Math.min(1, Math.max(0, (clientX - PAD.l) / (W - PAD.l - PAD.r)));
    const tsAt = v.start + ratio * span;
    const newSpan = span * factor;
    setView({ start: tsAt - ratio * newSpan, end: tsAt + (1 - ratio) * newSpan });
  };
  const onDown = (e: ReactMouseEvent<SVGSVGElement>) => { dragRef.current = { x0: e.clientX, start0: v.start, end0: v.end }; setDragging(true); };
  const onMove = (e: ReactMouseEvent<SVGSVGElement>) => {
    if (!dragRef.current || !dragging) return;
    const dts = ((e.clientX - dragRef.current.x0) / (W - PAD.l - PAD.r)) * (dragRef.current.end0 - dragRef.current.start0);
    setView({ start: dragRef.current.start0 - dts, end: dragRef.current.end0 - dts });
  };
  const onUp = () => { dragRef.current = null; setDragging(false); };

  const day = 86_400_000;
  const ticks: Array<{ ts: number; label: string }> = [];
  for (let ts = Math.ceil(v.start / day) * day; ts <= v.end; ts += day) {
    const d = new Date(ts);
    if (d.getDate() === 1 || d.getDate() === 15 || ticks.length === 0) ticks.push({ ts, label: `${d.getMonth() + 1}/${d.getDate()}` });
    if (ticks.length > 12) break;
  }

  return (
    <svg
      className="dps-h-timeline" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="更新变动趋势"
      style={{ cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
      onWheel={(e) => { e.preventDefault(); zoom(e.clientX, e.deltaY > 0 ? 1.25 : 0.8); }}
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
    >
      {ticks.map((tk, i) => (
        <g key={i}>
          <line x1={x(tk.ts)} y1={PAD.t} x2={x(tk.ts)} y2={H - PAD.b} stroke="var(--dsw-alias-border-l2)" strokeDasharray="3 4" />
          <text x={x(tk.ts)} y={H - 6} textAnchor="middle" fontSize="10" fill="var(--dsw-alias-label-tertiary)">{tk.label}</text>
        </g>
      ))}
      {series.map((s) => {
        const pts = s.points.map((p) => Date.parse(p.date)).filter((n) => !Number.isNaN(n));
        if (pts.length === 0) return null;
        const path = s.points
          .filter((p) => !Number.isNaN(Date.parse(p.date)))
          .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(Date.parse(p.date)).toFixed(1)},${y(p.count).toFixed(1)}`)
          .join(' ');
        return (
          <g key={s.key}>
            <path d={path} fill="none" stroke={s.color} strokeWidth="1.8" opacity="0.9" />
            <path d={path} fill="none" stroke={s.color} strokeWidth="7" opacity="0.07" />
          </g>
        );
      })}
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="var(--dsw-alias-border-l2)" />
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="var(--dsw-alias-border-l2)" />
      <text x={6} y={PAD.t + 10} fontSize="9" fill="var(--dsw-alias-label-tertiary)">{maxC}</text>
      {/* legend */}
      <g transform={`translate(${PAD.l + 4}, ${PAD.t - 2})`}>
        {series.map((s, i) => (
          <g key={s.key} transform={`translate(${i * 150}, 0)`}>
            <line x1={0} y1={-2} x2={18} y2={-2} stroke={s.color} strokeWidth="2.5" />
            <text x={24} y={3} fontSize="10" fill="var(--dsw-alias-label-secondary)">{s.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Interactive release + download timeline (zoom/pan via wheel & drag). */
function HealthTimeline({ timeline, trend, t }: { timeline: Array<{ version: string; publishedAt: string | null }>; trend: Array<{ date: string; downloads: number }>; t: (k: string) => string }): ReactNode {
  const W = 660;
  const H = 240;
  const PAD = { l: 52, r: 14, t: 22, b: 26 };
  const dragRef = useRef<{ x0: number; start0: number; end0: number } | null>(null);
  const [view, setView] = useState<{ start: number; end: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const points = [
    ...timeline.filter((v) => v.publishedAt).map((v) => Date.parse(v.publishedAt!)),
    ...trend.map((d) => Date.parse(d.date)),
  ].filter((n) => !Number.isNaN(n));
  if (points.length === 0) return <div className="dps-empty"><p>{t('health.noData')}</p></div>;
  const minTs = Math.min(...points);
  const maxTs = Math.max(...points, Date.now());
  const range = Math.max(maxTs - minTs, 86_400_000); // at least 1 day
  const v = view ?? { start: minTs - range * 0.03, end: maxTs + range * 0.02 };
  const span = Math.max(v.end - v.start, 86_400_000);
  const x = (ts: number) => PAD.l + ((ts - v.start) / span) * (W - PAD.l - PAD.r);

  const maxDl = Math.max(1, ...trend.map((d) => d.downloads));
  const y = (dl: number) => PAD.t + (H - PAD.t - PAD.b) * (1 - dl / maxDl);

  const zoom = (clientX: number, factor: number) => {
    const rect = dragRef.current && (dragRef.current as unknown as { rect?: DOMRect }).rect;
    const ratio = Math.min(1, Math.max(0, (clientX - PAD.l) / (W - PAD.l - PAD.r)));
    const tsAt = v.start + ratio * span;
    const newSpan = span * factor;
    setView({ start: tsAt - ratio * newSpan, end: tsAt + (1 - ratio) * newSpan });
    void rect;
  };

  const onWheel = (e: ReactWheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    zoom(e.clientX, e.deltaY > 0 ? 1.25 : 0.8);
  };
  const onDown = (e: ReactMouseEvent<SVGSVGElement>) => {
    dragRef.current = { x0: e.clientX, start0: v.start, end0: v.end };
    setDragging(true);
  };
  const onMove = (e: ReactMouseEvent<SVGSVGElement>) => {
    if (!dragRef.current || !dragging) return;
    const dx = e.clientX - dragRef.current.x0;
    const dts = (dx / (W - PAD.l - PAD.r)) * (dragRef.current.end0 - dragRef.current.start0);
    setView({ start: dragRef.current.start0 - dts, end: dragRef.current.end0 - dts });
  };
  const onUp = () => { dragRef.current = null; setDragging(false); };

  // x-axis month ticks
  const ticks: Array<{ ts: number; label: string }> = [];
  const day = 86_400_000;
  for (let ts = Math.ceil(v.start / day) * day; ts <= v.end; ts += day) {
    const d = new Date(ts);
    if (d.getDate() === 1 || d.getDate() === 15 || ticks.length === 0) {
      ticks.push({ ts, label: `${d.getMonth() + 1}/${d.getDate()}` });
    }
    if (ticks.length > 12) break;
  }

  const trendPath = trend.length > 1
    ? trend.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(Date.parse(d.date)).toFixed(1)},${y(d.downloads).toFixed(1)}`).join(' ')
    : '';
  const rel = (v0: string) => v0 === v0 ? v0 : v0; // keep TS happy on narrow

  return (
    <svg
      className="dps-h-timeline" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="插件动态时间轴"
      style={{ cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
      onWheel={onWheel} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
    >
      {/* grid + x labels */}
      {ticks.map((tk, i) => (
        <g key={i}>
          <line x1={x(tk.ts)} y1={PAD.t} x2={x(tk.ts)} y2={H - PAD.b} stroke="var(--dsw-alias-border-l2)" strokeDasharray="3 4" />
          <text x={x(tk.ts)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--dsw-alias-label-tertiary)">{tk.label}</text>
        </g>
      ))}
      {/* download trend (real points, no interpolation) */}
      {trendPath && (
        <>
          <path d={trendPath} fill="none" stroke="#378ADD" strokeWidth="1.6" opacity="0.85" />
          <path d={`${trendPath}`} fill="none" stroke="#378ADD" strokeWidth="6" opacity="0.08" />
        </>
      )}
      {/* release markers */}
      {timeline.filter((v2) => v2.publishedAt).slice(-40).map((rel2, i) => {
        const ts = Date.parse(rel2.publishedAt!);
        if (Number.isNaN(ts) || ts < v.start || ts > v.end) return null;
        const px = x(ts);
        const showLabel = i % Math.max(1, Math.floor(timeline.length / 8)) === 0;
        return (
          <g key={rel2.version + i}>
            <line x1={px} y1={PAD.t} x2={px} y2={H - PAD.b} stroke="#e0a020" strokeWidth="1" opacity="0.5" />
            <circle cx={px} cy={y(maxDl) - 6} r="3.2" fill="#e0a020" />
            {showLabel && (
              <text x={px} y={PAD.t - 6} textAnchor="middle" fontSize="9" fill="var(--dsw-alias-label-secondary)">{rel2.version}</text>
            )}
          </g>
        );
      })}
      {/* y-axis hint */}
      <text x={6} y={PAD.t + 10} fontSize="9" fill="var(--dsw-alias-label-tertiary)">{t('health.axisDownloads')}</text>
      <text x={6} y={H - PAD.b - 8} fontSize="9" fill="var(--dsw-alias-label-tertiary)">0</text>
      {/* axis border */}
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="var(--dsw-alias-border-l2)" />
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="var(--dsw-alias-border-l2)" />
    </svg>
  );
}

function HealthHub({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const [list, setList] = useState<Awaited<ReturnType<RemoteApi['healthHub']>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<Awaited<ReturnType<RemoteApi['healthDetail']>> | null>(null);

  const load = useCallback(async () => {
    setList(null);
    try { setList(await api.healthHub()); } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [api]);
  useEffect(() => { void load(); }, [load]);

  const openDetail = async (name: string) => {
    setSelected(name);
    setDetail(null);
    try { setDetail(await api.healthDetail(name)); } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  };

  if (selected && detail) {
    const bd = detail.breakdown;
    const parts: Array<[string, number, number]> = [
      [t('health.act'), bd.activity, 30],
      [t('health.dist'), bd.distribution, 15],
      [t('health.bugs'), bd.bugs, 25],
      [t('health.comm'), bd.community, 20],
      [t('health.rel'), bd.releases, 10],
    ];
    return (
      <div className="dps-view">
        <div className="dps-h-detail-head">
          <button type="button" className="dps-icon-btn dps-back" onClick={() => { setSelected(null); setDetail(null); }} aria-label="返回">←</button>
          <div>
            <h3 className="dps-h-title">{detail.name}</h3>
            <div className="dps-h-sub">
              <span className="dps-h-score-text">{t('health.title')} {detail.health} / 100</span>
              <span className="dps-dot">·</span>
              <span>@{detail.developer}</span>
            </div>
          </div>
        </div>

        <div className="dps-h-metrics">
          <div className="dps-h-metric"><span className="dps-h-metric-label">{t('health.lastUpdate')}</span><span>{detail.lastUpdate ? formatDate(detail.lastUpdate) : '—'}</span></div>
          <div className="dps-h-metric"><span className="dps-h-metric-label">{t('health.downloads')}</span><span>{formatCount(detail.downloads)}</span></div>
          <div className="dps-h-metric"><span className="dps-h-metric-label">★ stars</span><span>{detail.stars}</span></div>
          <div className="dps-h-metric"><span className="dps-h-metric-label">{t('health.openIssues')}</span><span>{detail.openIssues ?? '—'}</span></div>
          {detail.repoFullName && (
            <a className="dps-h-metric dps-h-repo" href={`https://github.com/${detail.repoFullName}`} target="_blank" rel="noreferrer">GitHub ↗</a>
          )}
        </div>

        <div className="dps-section">
          <h4 className="dps-section-title">{t('health.breakdown')}</h4>
          {parts.map(([label, score, max]) => (
            <div key={label} className="dps-h-bar-row">
              <span className="dps-h-bar-label">{label}</span>
              <div className="dps-h-bar-track">
                <div className={`dps-h-bar-fill lv-${detail.level}`} style={{ width: `${(score / max) * 100}%` }} />
              </div>
              <span className="dps-h-bar-val">{score}/{max}</span>
            </div>
          ))}
        </div>

        <div className="dps-section">
          <h4 className="dps-section-title">{t('health.timeline')}</h4>
          <p className="dps-hint">{t('health.timelineHint')}</p>
          <HealthTimeline timeline={detail.timeline} trend={detail.downloadTrend} t={t} />
        </div>
        <ErrorBanner error={error} onDismiss={() => setError(null)} t={t} />
      </div>
    );
  }

  const items = list?.items ?? [];
  const updatedAt = list?.updatedAt ?? null;

  return (
    <div className="dps-view">
      <div className="dps-scaffold-hero">
        <div className="dps-scaffold-hero-icon"><IconWarningOutline16 size={26} /></div>
        <div>
          <h3 className="dps-scaffold-title">{t('health.title')}</h3>
          <p className="dps-scaffold-desc">
            {t('health.desc')}{updatedAt ? ` ${t('health.updatedAt')} ${formatDate(updatedAt)}` : ''}
          </p>
        </div>
      </div>

      {list === null && !error ? (
        <div className="dps-empty">{t('health.loading')}</div>
      ) : error ? (
        <ErrorBanner error={error} onDismiss={() => setError(null)} t={t} />
      ) : items.length === 0 ? (
        <div className="dps-empty"><p>{t('health.empty')}</p></div>
      ) : (
        <div className="dps-rank-list">
          {items.map((p) => (
            <div key={p.packageName} className="dps-rank-row" role="button" tabIndex={0} onClick={() => void openDetail(p.packageName)} onKeyDown={(e) => { if (e.key === 'Enter') void openDetail(p.packageName); }}>
              <span className={`dps-rank-num${p.rank <= 3 ? ` top${p.rank}` : ''}`}>{p.rank}</span>
              <div className="dps-rank-main">
                <div className="dps-rank-name">{p.name} <span className="dps-muted-sm">@{p.developer}</span></div>
              </div>
              <span className="dps-rank-score">{p.health}<span className="dps-muted-sm">/100</span></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Wiki (plugin encyclopedia) ---------------------------------------------

function WikiExplorer({ api, onOpen, t }: { api: RemoteApi; onOpen: (name: string) => void; t: (k: string) => string }): ReactNode {
  const [list, setList] = useState<Awaited<ReturnType<RemoteApi['wikiHub']>> | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setList(null);
    try { setList(await api.wikiHub({ query, category, source, limit: 300 })); } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [api, query, category, source]);
  useEffect(() => { void load(); }, [load]);

  return (
    <div className="dps-view">
      <div className="dps-scaffold-hero">
        <div className="dps-scaffold-hero-icon"><IconWarningOutline16 size={26} /></div>
        <div>
          <h3 className="dps-scaffold-title">{t('wiki.title')}</h3>
          <p className="dps-scaffold-desc">{t('wiki.desc')}</p>
        </div>
      </div>

      <div className="dps-wiki-toolbar">
        <input
          className="dps-input" style={{ maxWidth: 260 }} value={query} placeholder={t('wiki.search')}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="dps-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">{t('wiki.allCat')}</option>
          {CATEGORY_META.filter((c) => c.key !== 'all').map((c) => <option key={c.key} value={c.key}>{t(c.labelKey)}</option>)}
        </select>
        <select className="dps-select" value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">{t('wiki.allSource')}</option>
          <option value="mirror">{t('wiki.srcMirror')}</option>
          <option value="catalog">{t('wiki.srcCatalog')}</option>
        </select>
      </div>

      {list === null && !error ? (
        <div className="dps-empty">{t('wiki.loading')}</div>
      ) : error ? (
        <ErrorBanner error={error} onDismiss={() => setError(null)} t={t} />
      ) : list && list.items.length === 0 ? (
        <div className="dps-empty"><p>{t('wiki.empty')}</p></div>
      ) : (
        <>
          <div className="dps-muted-sm" style={{ margin: '6px 0' }}>{t('wiki.total')} {list?.total}</div>
          <div className="dps-h-list">
            {list?.items.map((p) => (
              <div key={p.packageName} className="dps-h-row" role="button" tabIndex={0} onClick={() => onOpen(p.packageName)} onKeyDown={(e) => { if (e.key === 'Enter') onOpen(p.packageName); }}>
                <div className="dps-h-row-main">
                  <div className="dps-h-row-name">
                    {p.name} <span className="dps-muted-sm">@{p.developer}</span>
                    {p.source === 'catalog' && <span className="dps-badge dps-badge-github" title={t('wiki.srcCatalogHint')}>{t('wiki.srcCatalog')}</span>}
                    <TrustBadge level={p.trustLevel} t={t} />
                  </div>
                  <div className="dps-h-row-meta">
                    {p.shortDescription ? (
                      <span className="dps-muted-sm">{p.shortDescription.slice(0, 90)}</span>
                    ) : (
                      <span className="dps-muted-sm">{t('wiki.catalogNoDesc')}</span>
                    )}
                  </div>
                </div>
                {p.health !== null && <span className="dps-rank-score">{p.health}</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---- Skill Store -------------------------------------------------------------

type SkillSummary = { id: string; name: string; description: string; descriptionZh: string; version: string; author: string; repoFullName: string; categories: string[]; platform: string; installed: boolean };
type SkillDetail = SkillSummary & { skillPath: string; content: string; installedDir: string | null };

function SkillStore({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const [list, setList] = useState<{ total: number; items: SkillSummary[] } | null>(null);
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [platform, setPlatform] = useState<string>('all');
  const [selected, setSelected] = useState<SkillDetail | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query), 250);
    return () => window.clearTimeout(id);
  }, [query]);

  const load = useCallback(async () => {
    try {
      const r = await api.skillList({ query: debounced || null, category: category === 'all' ? null : category, platform: platform === 'all' ? null : platform });
      setList(r);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [api, debounced, category, platform]);

  useEffect(() => { void load(); }, [load]);

  const openDetail = async (id: string) => {
    try {
      setSelected(await api.skillDetail(id));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const doInstall = async (id: string) => {
    setBusy(id);
    try {
      const r = await api.skillInstall(id, getActor());
      if (!r.ok) setError(r.message);
      void load();
      if (selected) setSelected(await api.skillDetail(id));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  const doUninstall = async (name: string) => {
    setBusy(name);
    try {
      const r = await api.skillUninstall(name, getActor());
      if (!r.ok) setError(r.message);
      void load();
      if (selected) setSelected(await api.skillDetail(selected.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  const copy = async (s: string) => {
    try {
      await navigator.clipboard.writeText(s);
      setCopied(s);
      window.setTimeout(() => setCopied(null), 1500);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="dps-view">
      <div className="dps-scaffold-hero">
        <div className="dps-scaffold-hero-icon"><IconCordisPluginOutline14 size={26} /></div>
        <div>
          <h3 className="dps-scaffold-title">{t('skill.title')}</h3>
          <p className="dps-scaffold-desc">{t('skill.desc')}</p>
        </div>
      </div>

      {selected ? (
        <>
          <button type="button" className="dps-btn dps-btn-back" onClick={() => setSelected(null)}>← {t('skill.back')}</button>
          <div className="dps-wiki-head">
            <div>
              <div className="dps-wiki-name">{selected.name}
                {selected.version && <span className="dps-muted-sm"> v{selected.version}</span>}
                <span className="dps-muted-sm"> @{selected.author}</span>
                <span className={`dps-badge dps-badge-${selected.platform === 'dsh' ? 'update' : 'unreviewed'}`}>{selected.platform === 'dsh' ? t('skill.platformDsh') : t('skill.platformGeneral')}</span>
                {selected.categories.map((c) => <span key={c} className={`dps-badge dps-badge-${c}`}>{t(`category.${c}`) ?? CATEGORY_LABEL[c] ?? c}</span>)}
              </div>
              <p className="dps-wiki-desc">{selected.descriptionZh || selected.description || '—'}</p>
            </div>
            {selected.installed
              ? <button type="button" className="dps-btn dps-btn-danger" disabled={busy !== null} onClick={() => void doUninstall(selected.name)}>{busy === selected.name ? t('action.processing') : t('skill.uninstall')}</button>
              : <button type="button" className="dps-btn dps-btn-primary" disabled={busy !== null} onClick={() => void doInstall(selected.id)}>{busy === selected.id ? t('action.processing') : t('skill.install')}</button>}
          </div>

          <div className="dps-security-warning" style={{ marginBottom: 12 }}>
            <p>{t('skill.howToUse')}</p>
            <div className="dps-cmd">
              <code className="dps-cmd-code">{t('skill.howToUseCmd')}</code>
              <button type="button" className="dps-icon-btn" onClick={() => copy(t('skill.howToUseCmd'))} aria-label={t('scaffold.copyAria')} title={t('scaffold.copy')}>
                {copied === t('skill.howToUseCmd') ? '✓' : t('scaffold.copy')}
              </button>
            </div>
          </div>

          <div className="dps-wiki-facts" style={{ marginBottom: 10 }}>
            <span className="dps-muted-sm">{t('skill.source')} {selected.repoFullName}</span>
            <span className="dps-dot">·</span>
            <span className="dps-muted-sm">{t('skill.path')} {selected.skillPath || 'SKILL.md'}</span>
            {selected.installedDir && <><span className="dps-dot">·</span><span className="dps-muted-sm">{selected.installedDir}</span></>}
          </div>

          <div className="dps-section">
            <h4 className="dps-section-title">{t('skill.content')}</h4>
            <div className="dps-wiki-markdown dps-skill-content"><Markdown text={selected.content} /></div>
          </div>
        </>
      ) : (
        <>
          <div className="dps-toolbar">
            <input className="dps-input dps-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('skill.searchPlaceholder')} />
            {list && <span className="dps-muted-sm">{t('skill.total')} {list.total}</span>}
          </div>

          <div className="dps-filter-row">
            {CATEGORY_META.map((c) => (
              <button key={c.key} type="button" className={`dps-chip${category === c.key ? ' active' : ''}`} onClick={() => setCategory(c.key)}>
                {t(c.labelKey)}
              </button>
            ))}
            <span className="dps-filter-sep" />
            <button type="button" className={`dps-chip${platform === 'all' ? ' active' : ''}`} onClick={() => setPlatform('all')}>{t('skill.platformAll')}</button>
            <button type="button" className={`dps-chip${platform === 'dsh' ? ' active' : ''}`} onClick={() => setPlatform('dsh')}>{t('skill.platformDsh')}</button>
            <button type="button" className={`dps-chip${platform === 'general' ? ' active' : ''}`} onClick={() => setPlatform('general')}>{t('skill.platformGeneral')}</button>
          </div>

          {list === null && !error ? (
            <div className="dps-empty">{t('skill.loading')}</div>
          ) : error ? (
            <ErrorBanner error={error} onDismiss={() => setError(null)} t={t} />
          ) : list && list.items.length === 0 ? (
            <div className="dps-empty"><p>{t('skill.empty')}</p><p className="dps-muted-sm">{t('skill.emptyHint')}</p></div>
          ) : (
            <div className="dps-h-list">
              {list?.items.map((s) => (
                <div key={s.id} className="dps-h-row" role="button" tabIndex={0} onClick={() => void openDetail(s.id)} onKeyDown={(e) => { if (e.key === 'Enter') void openDetail(s.id); }}>
                  <div className="dps-h-row-main">
                    <div className="dps-h-row-name">
                      {s.name}
                      {s.version && <span className="dps-muted-sm"> v{s.version}</span>}
                      <span className="dps-muted-sm"> @{s.author}</span>
                      <span className={`dps-badge dps-badge-${s.platform === 'dsh' ? 'update' : 'unreviewed'}`}>{s.platform === 'dsh' ? t('skill.platformDsh') : t('skill.platformGeneral')}</span>
                      {s.installed && <span className="dps-badge dps-badge-npm">{t('skill.installed')}</span>}
                    </div>
                    {s.description && <div className="dps-h-row-meta"><span className="dps-muted-sm">{s.description.slice(0, 110)}</span></div>}
                  </div>
                  <button
                    type="button"
                    className={`dps-btn${s.installed ? ' dps-btn-danger' : ' dps-btn-primary'}`}
                    disabled={busy !== null}
                    onClick={(e) => { e.stopPropagation(); void (s.installed ? doUninstall(s.name) : doInstall(s.id)); }}
                  >
                    {busy === (s.installed ? s.name : s.id) ? t('action.processing') : s.installed ? t('skill.uninstall') : t('skill.install')}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---- Scaffold ----------------------------------------------------------------

function Scaffold({ api, t }: { api: RemoteApi; t: (k: string) => string }): ReactNode {
  const [info, setInfo] = useState<Awaited<ReturnType<RemoteApi['scaffold']>> | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => { void api.scaffold().then(setInfo).catch(() => undefined); }, [api]);

  const copy = (cmd: string) => {
    void navigator.clipboard?.writeText(cmd).then(() => {
      setCopied(cmd);
      window.setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div className="dps-view">
      <div className="dps-scaffold-hero">
        <div className="dps-scaffold-hero-icon"><IconCodeOutline16 size={26} /></div>
        <div>
          <h3 className="dps-scaffold-title">{t('scaffold.title')}</h3>
          <p className="dps-scaffold-desc">{t('scaffold.desc')}</p>
        </div>
      </div>

      <ol className="dps-steps">
        <li className="dps-step">
          <div className="dps-step-num">1</div>
          <div className="dps-step-body">
            <div className="dps-step-title">{t('scaffold.step1.title')}</div>
            <p className="dps-step-text">
              {t('scaffold.step1.before')}<code>dsh.bundle.patch</code>{t('scaffold.step1.mid')}
              <code>dsh.client.platform: "web"</code>{t('scaffold.step1.after')}
              <a className="dps-md-link" href="https://github.com/hrhgit/deepseek-harness-plugin-manager" target="_blank" rel="noreferrer"> dsh-plugin-manager</a>
              {t('scaffold.step1.sameAs')}
              <a className="dps-md-link" href={info?.docsUrl} target="_blank" rel="noreferrer"> {t('scaffold.step1.docs')}</a>
              {t('scaffold.step1.tail')}
            </p>
          </div>
        </li>
        <li className="dps-step">
          <div className="dps-step-num">2</div>
          <div className="dps-step-body">
            <div className="dps-step-title">{t('scaffold.step2.title')}</div>
            <p className="dps-step-text">{t('scaffold.step2.text')}</p>
            <div className="dps-cmd-list">
              {(info?.commands ?? []).map((cmd) => (
                <div key={cmd} className="dps-cmd">
                  <code className="dps-cmd-code">{cmd}</code>
                  <button type="button" className="dps-icon-btn" onClick={() => copy(cmd)} aria-label={t('scaffold.copyAria')} title={t('scaffold.copy')}>
                    {copied === cmd ? '✓' : t('scaffold.copy')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </li>
        <li className="dps-step">
          <div className="dps-step-num">3</div>
          <div className="dps-step-body">
            <div className="dps-step-title">{t('scaffold.step3.title')}</div>
            <p className="dps-step-text">{t('scaffold.step3.text')}</p>
            <div className="dps-scaffold-cats">
              {t('scaffold.step3.cats')}
              {info?.categories.map((c) => <span key={c} className={`dps-badge dps-badge-${c}`}>{t(`category.${c}`) ?? CATEGORY_LABEL[c] ?? c}</span>)}
              {t('scaffold.step3.catsHint')}
            </div>
          </div>
        </li>
      </ol>

      {info && (
        <div className="dps-scaffold-links">
          <a className="dps-btn" href={info.templateUrl} target="_blank" rel="noreferrer">{t('scaffold.linkRepo')}</a>
          <a className="dps-btn" href={info.docsUrl} target="_blank" rel="noreferrer">{t('scaffold.linkDocs')}</a>
          <a className="dps-btn" href="https://github.com/search?q=topic%3Adsh-plugin&type=repositories" target="_blank" rel="noreferrer">{t('scaffold.linkEco')}</a>
        </div>
      )}
    </div>
  );
}

// ---- view switcher (used by StoreApp) ----------------------------------------

export type StoreView = 'discover' | 'wiki' | 'skill' | 'installed' | 'publish' | 'health' | 'scaffold' | 'audit' | 'settings';

export function StoreViewBody({ view, api, onOpen, onChanged, t }: { view: StoreView; api: RemoteApi; onOpen: (name: string) => void; onChanged: () => void; t: (key: string) => string }): ReactNode {
  switch (view) {
    case 'discover': return <Discover api={api} onOpen={onOpen} onChanged={onChanged} t={t} />;
    case 'wiki': return <WikiExplorer api={api} onOpen={onOpen} t={t} />;
    case 'skill': return <SkillStore api={api} t={t} />;
    case 'installed': return <Installed api={api} onOpen={onOpen} t={t} />;
    case 'publish': return <PublishView api={api} t={t} />;
    case 'health': return <HealthHub api={api} t={t} />;
    case 'scaffold': return <Scaffold api={api} t={t} />;
    case 'audit': return <Audit api={api} t={t} />;
    case 'settings': return <Settings api={api} t={t} />;
    default: return null;
  }
}
