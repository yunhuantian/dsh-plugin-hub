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
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { ListEntry, ListSource, RemoteApi } from './api';
import { getActor } from './api';
import { IconCordisPlugin, IconDownload, IconRefresh, IconSearch, IconTrash, IconWarning } from './icons';

interface CommonProps {
  api: RemoteApi;
  t: (key: string) => string;
  onChanged: () => void;
  /** 条目在镜像库里时，可以跳到商店的完整详情页。 */
  onOpenPlugin?: (name: string) => void;
}

/** 分块转 base64 —— 直接 spread 整个 Uint8Array 会在几百 KB 的文件上爆栈。 */
function toBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

const FORMAT_LABEL: Record<string, string> = {
  dpmidx: 'src.format.dpmidx',
  json: 'src.format.json',
  ndjson: 'src.format.ndjson',
  crawl: 'src.format.crawl',
};

function formatLabel(source: ListSource, t: (k: string) => string): string {
  return t(FORMAT_LABEL[source.format] ?? 'src.format.dpmidx');
}

/** 来源条目的一张小卡片点进去就是详情。 */
function EntryCard({ entry, sourceId, api, t, onChanged, onOpen }: {
  entry: ListEntry;
  sourceId: string;
  api: RemoteApi;
  t: (k: string) => string;
  onChanged: () => void;
  onOpen: () => void;
}): ReactNode {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const install = async () => {
    setBusy(true);
    setError(null);
    try {
      const r = await api.installFromSource(sourceId, entry.name, getActor());
      if (!r.ok) setError(r.message);
      else onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const host = (() => {
    try { return new URL(entry.url).hostname; } catch { return entry.url ? entry.url.slice(0, 40) : '—'; }
  })();
  const artifact = (entry.flags & 0x01) !== 0;

  return (
    <div
      className="dps-card dps-card-clickable"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
    >
      <div className="dps-card-top">
        <span className="dps-icon-fallback" style={{ width: 44, height: 44, fontSize: 18 }}>
          {(entry.name || '?').charAt(0).toUpperCase()}
        </span>
        <div className="dps-card-head">
          <div className="dps-card-name" title={entry.name}>{entry.name}</div>
          <div className="dps-card-developer" title={entry.url}>{host}</div>
        </div>
      </div>
      <p className="dps-card-desc">{entry.description || '（暂无描述）'}</p>
      <div className="dps-card-meta">
        <span className="dps-badges">
          {entry.cert !== 'none' && (
            <span
              className={`dps-badge dps-cert-${entry.cert}`}
              title={entry.cert === 'legacy' && entry.certVersion
                ? `${t('src.cert.hint')}（认证于 ${entry.certVersion}，当前 ${entry.currentVersion ?? '未知'}）`
                : t('src.cert.hint')}
            >
              ✅ {entry.cert === 'certified' ? t('src.cert.certified') : t('src.cert.legacy')}
            </span>
          )}
          {entry.category !== '' && <span className="dps-badge">{entry.category}</span>}
          <span className={`dps-badge${artifact ? ' dps-badge-npm' : ''}`}>
            {artifact ? t('src.artifact') : t('src.source')}
          </span>
          {entry.deps.length > 0 && <span className="dps-badge">{t('src.deps')} {entry.deps.length}</span>}
        </span>
      </div>
      {error !== null && <p className="dps-card-error">{error}</p>}
      <div className="dps-card-actions">
        {entry.installSpec !== null ? (
          <button
            type="button"
            className="dps-btn dps-btn-primary dps-btn-sm"
            disabled={busy}
            onClick={(e) => { e.stopPropagation(); void install(); }}
          >
            {busy ? '…' : t('src.install')}
          </button>
        ) : entry.url !== '' ? (
          <a
            className="dps-btn dps-btn-sm"
            href={entry.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {t('src.open')}
          </a>
        ) : <span />}
      </div>
    </div>
  );
}

/**
 * 单条目详情页。
 *
 * 列表里的条目不一定在本地镜像库里（很多是 GitHub 现搜出来的），
 * 所以这里不假设有完整详情：先展示列表自带的信息，库里有时再给一个
 * 「在商店中查看详情」的入口 —— 而不是点进去报错。
 */
function EntryDetail({ entry, sourceId, api, t, onBack, onChanged, onOpenPlugin }: {
  entry: ListEntry;
  sourceId: string;
  api: RemoteApi;
  t: (key: string) => string;
  onBack: () => void;
  onChanged: () => void;
  onOpenPlugin?: (name: string) => void;
}): ReactNode {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const install = async () => {
    setBusy(true);
    setError(null);
    try {
      const r = await api.installFromSource(sourceId, entry.name, getActor());
      if (!r.ok) setError(r.message);
      else onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const copy = () => {
    const cmd = entry.installSpec !== null ? `pnpm add ${entry.installSpec}` : `dsh plugin add ${entry.url}`;
    void navigator.clipboard?.writeText(cmd).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const artifact = (entry.flags & 0x01) !== 0;
  const certText = entry.cert === 'certified'
    ? t('src.cert.certified')
    : entry.cert === 'legacy' ? t('src.cert.legacy') : '—';

  return (
    <div className="dps-view">
      <div>
        <button type="button" className="dps-btn dps-btn-sm" onClick={onBack}>← {t('src.back')}</button>
      </div>
      <div className="dps-section dps-entry-detail">
        <div className="dps-entry-head">
          <span className="dps-icon-fallback" style={{ width: 52, height: 52, fontSize: 22 }}>
            {(entry.name || '?').charAt(0).toUpperCase()}
          </span>
          <div className="dps-entry-title">
            <h2 className="dps-entry-name">{entry.name}</h2>
            <div className="dps-badges">
              {entry.cert !== 'none' && (
                <span className={`dps-badge dps-cert-${entry.cert}`}>
                  ✅ {certText}
                </span>
              )}
              {entry.category !== '' && <span className="dps-badge">{entry.category}</span>}
              <span className={`dps-badge${artifact ? ' dps-badge-npm' : ''}`}>
                {artifact ? t('src.artifact') : t('src.source')}
              </span>
            </div>
          </div>
        </div>
        <p className="dps-entry-desc">{entry.description || '（暂无描述）'}</p>
        {error !== null && <p className="dps-hint dps-bad">{error}</p>}
        <div className="dps-entry-actions">
          {entry.installSpec !== null && (
            <button type="button" className="dps-btn dps-btn-primary dps-btn-sm" disabled={busy} onClick={() => void install()}>
              {busy ? '…' : t('src.install')}
            </button>
          )}
          {entry.url !== '' && (
            <a className="dps-btn dps-btn-sm" href={entry.url} target="_blank" rel="noreferrer">{t('src.open')}</a>
          )}
          <button type="button" className="dps-btn dps-btn-sm" onClick={copy}>
            {copied ? t('src.detail.copied') : t('src.detail.copy')}
          </button>
          {entry.inStore && onOpenPlugin && (
            <button type="button" className="dps-btn dps-btn-sm" onClick={() => onOpenPlugin(entry.name)}>
              {t('src.detail.store')}
            </button>
          )}
        </div>
      </div>

      <div className="dps-section">
        <dl className="dps-kv">
          <dt>{t('src.detail.repo')}</dt>
          <dd>{entry.url !== '' ? <a href={entry.url} target="_blank" rel="noreferrer">{entry.url}</a> : '—'}</dd>
          <dt>{t('src.detail.category')}</dt>
          <dd>{entry.category !== '' ? entry.category : '—'}</dd>
          <dt>{t('src.detail.version')}</dt>
          <dd>{entry.currentVersion ?? entry.certVersion ?? '—'}</dd>
          <dt>{t('src.detail.cert')}</dt>
          <dd>
            {certText}
            {entry.certVersion !== null && entry.certVersion !== '' && ` · ${t('src.detail.certVersion')} ${entry.certVersion}`}
          </dd>
          <dt>{t('src.detail.deps')}</dt>
          <dd>{entry.deps.length > 0 ? entry.deps.join(', ') : '—'}</dd>
          <dt>{t('src.detail.spec')}</dt>
          <dd><code>{entry.installSpec ?? '—'}</code></dd>
        </dl>
      </div>
    </div>
  );
}

/** 一个来源的条目网格（带搜索与加载更多）。 */
function ListEntries({ api, source, t, onChanged, onOpenPlugin }: CommonProps & { source: ListSource; onOpenPlugin?: (name: string) => void }): ReactNode {
  const [entries, setEntries] = useState<ListEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<ListEntry | null>(null);

  const load = useCallback(async (offset: number, q: string) => {
    setLoading(true);
    setError(null);
    try {
      const page = await api.listSourceEntries(source.id, q || null, 120, offset);
      setEntries(offset === 0 ? page.items : (prev) => [...prev, ...page.items]);
      setTotal(page.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [api, source.id]);

  useEffect(() => {
    const id = window.setTimeout(() => { void load(0, query); }, 220);
    return () => window.clearTimeout(id);
  }, [load, query]);

  if (active !== null) {
    return (
      <EntryDetail
        entry={active}
        sourceId={source.id}
        api={api}
        t={t}
        onBack={() => setActive(null)}
        onChanged={onChanged}
        onOpenPlugin={onOpenPlugin}
      />
    );
  }

  return (
    <div className="dps-view">
      <div className="dps-toolbar dps-toolbar-inline">
        <div className="dps-search">
          <IconSearch size={15} />
          <input
            className="dps-search-input"
            value={query}
            placeholder={t('src.searchInList')}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t('src.searchInList')}
          />
        </div>
        <span className="dps-count">{t('src.count').replace('{n}', String(total))}</span>
        {source.publisher !== '' && (
          <span className="dps-count dps-publisher">{t('src.publisher').replace('{name}', source.publisher)}</span>
        )}
        <span className="dps-count">{formatLabel(source, t)}</span>
      </div>
      {error !== null && <div className="dps-error" role="alert"><IconWarning size={16} /><span className="dps-error-text">{error}</span></div>}
      {loading && entries.length === 0 ? (
        <div className="dps-empty">加载中…</div>
      ) : entries.length === 0 ? (
        <div className="dps-empty"><IconCordisPlugin size={18} /><p>{t('src.listEmpty')}</p></div>
      ) : (
        <>
          <div className="dps-grid">
            {entries.map((e) => (
              <EntryCard
                key={`${e.name}-${e.url}`}
                entry={e}
                sourceId={source.id}
                api={api}
                t={t}
                onChanged={onChanged}
                onOpen={() => setActive(e)}
              />
            ))}
          </div>
          {entries.length < total && (
            <div className="dps-loadmore">
              <button type="button" className="dps-btn" disabled={loading} onClick={() => void load(entries.length, query)}>
                {loading ? '加载中…' : `加载更多（${total - entries.length}）`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/** 来源标签条：内置爬取 + 已添加的来源。 */
function SourceBar({ sources, selected, onSelect, onAdd, t, extra, showBuiltin = true }: {
  sources: ListSource[];
  selected: string;
  onSelect: (id: string) => void;
  onAdd?: () => void;
  t: (k: string) => string;
  extra?: ReactNode;
  /** 「内置爬取」只属于自动识别区：认证区与整合包页没有这个概念。 */
  showBuiltin?: boolean;
}): ReactNode {
  return (
    <div className="dps-sourcebar">
      <div className="dps-chips">
        {showBuiltin && (
          <button type="button" className={`dps-chip${selected === 'builtin' ? ' active' : ''}`} onClick={() => onSelect('builtin')}>
            {t('src.builtin')}
          </button>
        )}
        {sources.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`dps-chip${selected === s.id ? ' active' : ''}`}
            onClick={() => onSelect(s.id)}
            title={`${s.url || s.label} · ${formatLabel(s, t)}`}
          >
            {s.label}
            <span className="dps-chip-count">{s.entries}</span>
          </button>
        ))}
        {extra}
      </div>
      {onAdd && (
        <button type="button" className="dps-btn dps-btn-sm" onClick={onAdd}>＋ {t('src.add')}</button>
      )}
    </div>
  );
}

/** 添加来源面板：列表（URL / 文件）与自动爬取。 */
function AddPanel({ api, t, expect, onDone }: {
  api: RemoteApi;
  t: (k: string) => string;
  expect: number;
  onDone: () => void;
}): ReactNode {
  const [mode, setMode] = useState<'list' | 'crawl'>(expect === 1 ? 'list' : 'list');
  const [url, setUrl] = useState('');
  const [crawl, setCrawl] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const submitUrl = async () => {
    if (url.trim() === '') return;
    setBusy(true); setError(null); setMessage(null);
    try {
      const r = await api.addListSource({ url: url.trim(), expect });
      if (!r.ok) setError(r.message);
      else { setMessage(`${t('src.importOk')}：${r.message}`); setUrl(''); onDone(); }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setBusy(false); }
  };

  const submitFile = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) { setError('请选择文件'); return; }
    setBusy(true); setError(null); setMessage(null);
    try {
      const buf = await file.arrayBuffer();
      // DPMIDX 是二进制，JSON 是文本 —— 统一走 base64，host 侧按魔数嗅探。
      const base64 = toBase64(buf);
      const r = await api.addListSource({ base64, label: file.name, expect });
      if (!r.ok) setError(r.message);
      else { setMessage(`${t('src.importOk')}：${r.message}`); onDone(); }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setBusy(false); }
  };

  const submitCrawl = async () => {
    if (crawl.trim() === '') return;
    setBusy(true); setError(null); setMessage(null);
    try {
      const r = await api.addCrawlSource(crawl.trim());
      if (!r.ok) setError(r.message);
      else { setMessage(`${t('src.importOk')}：${r.message}`); setCrawl(''); onDone(); }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setBusy(false); }
  };

  return (
    <div className="dps-section dps-addpanel">
      {expect === 0 && (
        <div className="dps-chips">
          <button type="button" className={`dps-chip${mode === 'list' ? ' active' : ''}`} onClick={() => setMode('list')}>{t('src.addList')}</button>
          <button type="button" className={`dps-chip${mode === 'crawl' ? ' active' : ''}`} onClick={() => setMode('crawl')}>{t('src.addCrawl')}</button>
        </div>
      )}

      {mode === 'list' ? (
        <>
          <div className="dps-field">
            <input
              className="dps-input"
              value={url}
              placeholder={t('src.urlPlaceholder')}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') void submitUrl(); }}
            />
            <button type="button" className="dps-btn dps-btn-primary dps-btn-sm" disabled={busy} onClick={() => void submitUrl()}>
              {t('src.addList')}
            </button>
          </div>
          <div className="dps-field">
            <input ref={fileRef} type="file" accept=".dpmidx,.json,.ndjson,application/json" className="dps-file" />
            <button type="button" className="dps-btn dps-btn-sm" disabled={busy} onClick={() => void submitFile()}>
              {t('src.upload')}
            </button>
          </div>
          {expect === 1 && <p className="dps-hint">{t('src.modpackNote')}</p>}
        </>
      ) : (
        <div className="dps-field">
          <input
            className="dps-input"
            value={crawl}
            placeholder={t('src.crawlPlaceholder')}
            onChange={(e) => setCrawl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void submitCrawl(); }}
          />
          <button type="button" className="dps-btn dps-btn-primary dps-btn-sm" disabled={busy} onClick={() => void submitCrawl()}>
            {t('src.addCrawl')}
          </button>
        </div>
      )}

      {message !== null && <p className="dps-hint dps-ok">{message}</p>}
      {error !== null && <p className="dps-hint dps-bad">{error}</p>}
    </div>
  );
}

/** 自动识别：内置爬取 + 任意来源的列表。 */
export function AutoZone({ api, t, onChanged, onOpenPlugin, renderBuiltin }: CommonProps & { renderBuiltin: () => ReactNode }): ReactNode {
  const [sources, setSources] = useState<ListSource[]>([]);
  const [selected, setSelected] = useState('builtin');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const r = await api.listSources();
      setSources(r.items.filter((s) => s.kind === 0 && s.provenance === 'auto'));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [api]);

  useEffect(() => { void reload(); }, [reload]);

  const current = sources.find((s) => s.id === selected) ?? null;

  const remove = async () => {
    if (current === null) return;
    if (!window.confirm(`移除「${current.label}」？`)) return;
    try {
      const r = await api.removeListSource(current.id);
      if (!r.ok) setError(r.message);
      setSelected('builtin');
      await reload();
      onChanged();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  };

  return (
    <div className="dps-zone">
      <SourceBar
        sources={sources}
        selected={selected}
        onSelect={(id) => { setSelected(id); setAdding(false); }}
        onAdd={() => setAdding((v) => !v)}
        t={t}
        extra={current !== null ? (
          <button type="button" className="dps-chip dps-chip-danger" onClick={() => void remove()}>
            <IconTrash size={13} /> {t('src.remove')}
          </button>
        ) : undefined}
      />
      {error !== null && <div className="dps-error" role="alert"><IconWarning size={16} /><span className="dps-error-text">{error}</span></div>}
      {adding && <AddPanel api={api} t={t} expect={0} onDone={() => { setAdding(false); void reload(); onChanged(); }} />}
      {current === null
        ? <>{renderBuiltin()}{sources.length === 0 && <p className="dps-hint">{t('src.builtinHint')}</p>}</>
        : <ListEntries api={api} t={t} source={current} onChanged={onChanged} onOpenPlugin={onOpenPlugin} />}
    </div>
  );
}

/** 认证列表：只有签发记录（provenance=certified）的列表。 */
export function CertifiedZone({ api, t, onChanged, onOpenPlugin }: CommonProps): ReactNode {
  const [sources, setSources] = useState<ListSource[]>([]);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const r = await api.listSources();
        const list = r.items.filter((s) => s.kind === 0 && s.provenance === 'certified');
        setSources(list);
        if (list.length > 0) setSelected(list[0].id);
      } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
    })();
  }, [api]);

  const current = sources.find((s) => s.id === selected) ?? null;

  return (
    <div className="dps-zone">
      {sources.length > 0 && (
        <SourceBar sources={sources} selected={selected} onSelect={setSelected} t={t} showBuiltin={false} />
      )}
      {error !== null && <div className="dps-error" role="alert"><IconWarning size={16} /><span className="dps-error-text">{error}</span></div>}
      {current === null ? (
        <div className="dps-empty">
          <IconRefresh size={18} />
          <p>{t('src.empty.certified')}</p>
          <p className="dps-empty-hint">{t('src.empty.certifiedHint')}</p>
        </div>
      ) : (
        <ListEntries api={api} t={t} source={current} onChanged={onChanged} onOpenPlugin={onOpenPlugin} />
      )}
    </div>
  );
}

/** 整合包：kind=1 的容器，只在本页读取。 */
export function ModpackZone({ api, t, onChanged, onOpenPlugin }: CommonProps): ReactNode {
  const [sources, setSources] = useState<ListSource[]>([]);
  const [selected, setSelected] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const r = await api.listSources();
      const list = r.items.filter((s) => s.kind === 1);
      setSources(list);
      setSelected((prev) => (list.some((s) => s.id === prev) ? prev : (list[0]?.id ?? '')));
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [api]);

  useEffect(() => { void reload(); }, [reload]);

  const current = sources.find((s) => s.id === selected) ?? null;

  const remove = async () => {
    if (current === null) return;
    if (!window.confirm(`移除「${current.label}」？`)) return;
    try {
      await api.removeListSource(current.id);
      await reload();
      onChanged();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  };

  return (
    <div className="dps-zone">
      <SourceBar
        sources={sources}
        selected={selected}
        onSelect={(id) => { setSelected(id); setAdding(false); }}
        onAdd={() => setAdding((v) => !v)}
        t={t}
        showBuiltin={false}
        extra={current !== null ? (
          <button type="button" className="dps-chip dps-chip-danger" onClick={() => void remove()}>
            <IconTrash size={13} /> {t('src.remove')}
          </button>
        ) : undefined}
      />
      {error !== null && <div className="dps-error" role="alert"><IconWarning size={16} /><span className="dps-error-text">{error}</span></div>}
      {adding && <AddPanel api={api} t={t} expect={1} onDone={() => { setAdding(false); void reload(); onChanged(); }} />}
      {current === null ? (
        <div className="dps-empty">
          <IconDownload size={18} />
          <p>{t('src.empty.modpack')}</p>
          <p className="dps-empty-hint">{t('src.empty.modpackHint')}</p>
        </div>
      ) : (
        <>
          <p className="dps-hint">{t('src.modpackNote')} · {formatLabel(current, t)} · {current.entries} {t('src.entries')}</p>
          <ListEntries api={api} t={t} source={current} onChanged={onChanged} onOpenPlugin={onOpenPlugin} />
        </>
      )}
    </div>
  );
}
