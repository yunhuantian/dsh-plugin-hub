# dsh-plugin-hub — the plugin store for DSH

> A graphical plugin store for DeepSeek Harness, rendered inside the **official Plugins page**:
> auto-discovered listings, a certified list, modpacks, one-click install, health scores,
> publishing and audit. One npm package ships **20 individually switchable internal plugins**
> plus an offline seed catalog of 16 entries, so the store has content on first launch.
>
> The same certification data is also published as an **official format 1** index
> (121 entries today) that can be wired into the official *Plugins → Discover* page.

Built for **DSH `0.1.x` and `0.2.x`** · MIT · current **0.2.7** (2026-10-28)

---

## Current state

### 1. Disabled / off by default

| Feature | Switch | Current state | How to bring it back |
|---|---|---|---|
| Plugin Wiki | `baike` | **Off**, and gated in three places: nav, detail tab and host API | Turn it on under *Built-ins*; external catalogs also need `meta external_sync=1` |
| External catalog sync | `external_sync` meta | **Off** (Blue-Whale and friends) | Set `external_sync=1`, then sync |
| Trust badge sync | — | **Removed** (the `trust` plugin was folded into the quality gate in 0.2.6) | Nothing to restore |
| Changelog drafter | `changelog` | Off by default | Turn it on under *Built-ins* |
| Skill store | `skill-store` | Off by default | Turn it on under *Built-ins* |
| Diagnostics export | `diagnostics` | Off by default | Turn it on under *Built-ins* |

Two things worth spelling out:

- **The wiki is actually off now, not just "disabled".** 0.2.6 set `defaultEnabled: false`,
  but the top nav was a hard-coded array, the detail tab only checked whether a UI was
  registered, and the host's `wikiHub` / `wiki` remotes read the database directly. The
  plugin looked disabled while its content kept showing up. 0.2.7 gates all three: the tab
  disappears, the detail tab disappears, `wikiHub` returns an empty set and `wiki` throws a
  clear "disabled" error. The data stays in the database, so flipping the switch back is
  enough — nothing is deleted.
- **Why external catalogs are off.** The wiki relied on Blue-Whale-Harness, an external
  directory whose quality we cannot control and whose contents can change at any time.
  The whole chain now sits behind the `external_sync` meta flag, default off.

### 2. What improved in this round

| Area | Before | Now |
|---|---|---|
| Shell | 176px vertical nav on the left, content squeezed to 856px | Horizontal tabs on top, 12 views, content back to 1020px |
| Gating | A plugin switch only stopped the service; its entry stayed | Nav, detail tab and host API all follow the switch |
| Data location | Plugin table and modpacks lived in the hub package, so data changes needed a release | Data lives in its own repo; data changes only push data |
| Certification | Per-package | **Per-version**: cert version ≠ current version ⇒ `legacy` |
| Official Discover page | Not wired at all | `market-index.json` at the repo root, 121 certified entries |
| Modpacks | A member list | Detail page, one-click install, intro and install order |

### 3. What changed in this round

0.2.7 is the top-tab shell, complete wiki gating, official Discover integration, and the
certified index growing from 76 to 121. Full details in [Version history](#version-history).

---

## How you reach it

It adds **no entry point of its own**. The store appears as an item on DSH's own
**Plugins** page:

```
sidebar → Plugins → Plugin Store
```

Inside, all 12 views sit on one row of tabs:

```
Auto / Certified / Modpacks / Wiki* / Skill Store* / Installed /
Built-ins / Health* / Publish / Scaffold / Audit / Settings
```

Views marked `*` come from internal plugins; when the plugin is off the tab is not greyed
out — it is simply absent.

> On 0.1.x the landing point differed: a standalone sidebar button plus a full-screen
> overlay, and a separate settings page. Since 0.2.3 it renders inside the official Plugins
> page and reads as something that page always had.

---

## One package, 20 internal plugins

Since 0.2 the hub is organised like DSH itself: `@deepseek-ai/dsh` is one package containing
60+ `dsh-*` entries, and the hub is **published once, installed once** while being made of
**20 individually switchable** plugins. Each occupies its own row in *Settings → Plugins*,
21 rows in total (core + 20).

### Foundation

| Entry | Provides | Default |
|---|---|---|
| `dsh-plugin-hub` | Remote `pluginStore` | on |
| `hub-ext-store-db` | `pluginStoreDb` | on |
| `hub-ext-github` | `pluginGithub` | on |
| `hub-ext-npm-probe` | `pluginNpmProbe` | on |
| `hub-ext-seed-catalog` | `pluginSeedCatalog` | on |
| `hub-ext-registry` | `pluginRegistry` | on |
| `hub-ext-installer` | `pluginInstaller` | on |

### Safety & Quality

| Entry | Provides | Default |
|---|---|---|
| `hub-ext-security` | `pluginSecurity` | on |
| `hub-ext-conflict` | `pluginConflict` | on |
| `hub-ext-quality` | `pluginQuality` | on |

> `hub-ext-trust` (trust badge sync) was folded into the quality gate in 0.2.5; the roster
> went from 21 to 20 entries.

### Publishing

| Entry | Provides | Default |
|---|---|---|
| `hub-ext-publish` | `pluginPublish` | on |
| `hub-ext-version-guard` | `pluginVersionGuard` | on |
| `hub-ext-changelog` | `pluginChangelog` | off |

### Insight & Content

| Entry | Provides | Default |
|---|---|---|
| `hub-ext-usage` | `usagePricing` | on |
| `hub-ext-health` | `pluginHealth` | on |
| `hub-ext-update-check` | `pluginUpdateCheck` | on |
| `hub-ext-dependency-graph` | `pluginDepGraph` | on |
| `hub-ext-baike` | `pluginWiki` | **off** |
| `hub-ext-skill-store` | `skillStore` | **off** |

### Operations

| Entry | Provides | Default |
|---|---|---|
| `hub-ext-backup` | `pluginBackup` | on |
| `hub-ext-diagnostics` | `pluginDiagnostics` | off |

### Dependencies are declared, not hard-injected

Internal plugins **declare** their dependencies (`registry → store-db + github`,
`publish → security`, …) and a single `activate()` decides at runtime:

```
user disables "Store Database"
  └─→ registry / installer / npm-probe / seed-catalog / update-check /
      dependency-graph / baike report "blocked" and step aside
      (no service, no UI, no error)
  └─→ re-enable "Store Database" and the whole chain comes back
```

This is deliberately not cordis `inject`: a hard dependency produces a
**"provider disabled → consumer pending forever"** deadlock. With declared dependencies any
side can be turned off into a clean, reversible "blocked" state.

**Why bundle useful plugins instead of publishing them separately**: every extra plugin adds
another download, install, rate-limit and version-mismatch failure point. Bundled, one
install of the hub yields 20 capabilities and the repo does not need 20 packages and 20
release pipelines.

### Offline seed catalog (no blank store)

Store content normally comes from the GitHub mirror sync (hundreds of repos, hundreds of
requests, minutes). A fresh install would stare at an empty list. `hub-ext-seed-catalog`
ships **16 widely useful plugins** so they are browsable and installable immediately:

| Area | Seeded plugins |
|---|---|
| Vision | `@liustack/modlens`, `@anionex/dsh-vision-toolkit` |
| UI | `dsh-better-sidebar`, `@deepseek-harness-tui/dsh-tui`, `@deepseek-ai/dsh-client-ui-aqua`, `dsh-reasoning-effort` |
| Memory | `@mnemon-dev/dsh-mnemon` |
| Input & dev | `dsh-at-file`, `dsh-open-in-vscode`, `@omdsh-dev/dsh-genui` |
| Cost & context | `dsh-cost-meter`, `dsh-context` |
| Efficiency | `dsh-notification`, `dsh-skill-viewer` |
| Store peers | `dshmarket`, `dsh-web-plugin-manager` |

Writes are **insert-only**: once a package has been written by a real sync, the seed never
overwrites it (real data has a README, version history and issues). The catalog is dated, so
an upgrade refreshes its own rows on the next start. Such rows carry a "seed" badge.

### Two levels of switches

1. **Install level** — any row in the hub's `cordis.patch.yml` may carry `disabled: true`
   (deployment policy);
2. **Daily level** — *Plugins → Plugin Store → Built-ins*, grouped, persisted to
   `storages/plugin-store/plugins.json`, effective **after a DSH restart**.

> ⚠️ The four default-off plugins (changelog / baike / skill-store / diagnostics) must **not**
> carry `disabled: true` in the patch: the loader would never load them, so the module could
> never read the settings switch — the symptom is "I turned it on and nothing happened".
> Default-off is implemented by the module stepping aside at runtime, which keeps the switch
> reversible.

Disabling a plugin means it steps aside at startup (no service, no UI); core store
functionality is unaffected.

---

## What the built-in plugins do

### Usage & cost — dated price tables, history preserved

Per-request tokens and cache-hit charts (wheel zoom, drag pan, double-click reset) in the
conversation view, costed against a **versioned price table** in two ways:

- **Then-price**: the table in effect when the request happened → what was actually billed
- **Now-price**: the latest table → what the same usage would cost today
- A non-zero delta is shown (`+$0.0123 more expensive now` / `−… cheaper now`)

Tables are appended, never edited:

| Version | Effective (UTC) | Key change |
|---|---|---|
| `2026-08-15` | 2026-08-15 00:00 | Baseline: DeepSeek V4 Flash (0731) $0.22 / cache hit $0.007 / output $0.66 |
| `2026-09-10` | 2026-09-10 04:00 | **V4.1 Flash** at $0.15 / cache hit $0.003 / output $0.60, peak ×2 |
| `2026-09-14` | 2026-09-14 04:00 | **V4 Pro billed as Flash** (auto-routed) |

Peak pricing: weekdays **UTC 01:00–04:00 and 06:00–10:00** at ×2, off-peak otherwise.
OpenAI / Anthropic / Google / Qwen / Zhipu / Moonshot prices are built in.

> Metering matches DSH's token-meter: `usage.inputTokens` is the **uncached input bucket**;
> billable input = uncached + cache read + cache write. Unknown models are not estimated —
> the UI says so instead of pretending.

### Health / update check / dependency graph
- **Health**: scores 0–100 from activity, release cadence and community signal
  (stars / downloads / open issues), with healthy / attention / stale grades and a ranking.
- **Update check**: installed version vs upstream latest (npm first, GitHub releases as
  fallback, 6h cache) with an upgrade list.
- **Dependency graph**: what an upgrade or uninstall drags along (direct and reverse deps).

### Safety & quality: examine before installing
- **Security scan**: dangerous scripts, sensitive file access, dynamic eval, suspicious
  outbound hosts; `critical` blocks install and publish.
- **Conflict detection**: UI slot occupancy (`single` slots are exclusive), package-name
  clashes, dependency version conflicts.
- **Quality gate**: 8 pre-publish checks (manifest, build output, README, license, versioning…).

### Publishing: one action from local to live
- **One-click publish**: GitHub repo/push plus npm, with staged progress and a security scan
  before anything leaves the machine.
- **Version guard**: aligns `package.json`, README changelog, profile install spec and
  subpath `exports` — catches "package bumped, docs didn't" and "new plugin row, forgot exports".
- **Changelog drafter** (off by default): README-style draft from Conventional Commits.

### Operations: recoverable
- **Backup & rollback**: `VACUUM INTO` snapshot of the database plus plugin switches and the
  profile manifest, keeping the last 10; the current state is saved before a rollback, so a
  rollback is itself rollback-able.
- **Diagnostics export** (off by default): environment, 20 built-in plugin states, profile
  dependencies, index stats and recent audit as Markdown, with no token material.

### Plugin wiki (off by default, currently disabled)
Aggregates metadata, README highlights and related plugins into searchable entries. Off
since 0.2.6 because its external catalog (Blue-Whale-Harness) is not quality-controlled;
0.2.7 completed the gating so that turning it off actually removes the nav entry, the detail
tab, `wikiHub` and `wiki`.

### Skill store (off by default)
Collects `SKILL.md` packages across ecosystems, searchable and installable into the local
skills directory.

---

## Core store features

- **Auto** — entries synced from GitHub `topic:dsh-plugin`: 12 categories, 7 sort orders
  (random / health / stars / rating / downloads / updated / name), search, installed filter
- **Certified** — only entries verified by hand whose certified version equals the current one
- **Modpacks** — scenario-based bundles with intro, install order and one-click install
- **Install** — npm registry or GitHub clone; writes the profile's `cordis.patch.yml`, which
  cordis applies live
- **Installed** — grouped under `system / downloaded / self-authored`, then by ownership: the
  hub's own plugins get their own "Plugin Store" group instead of masquerading as system
  components. Per-row toggles (protected system entries are blocked), per-category bulk
  toggles, uninstall
- **Quality gate** — dependency completeness and startup-directory requirements, blocking
  before install
- **Security scan** — pre-publish scan with automatic rejection
- **Publish** — Markdown intro → GitHub + npm dual-channel publish (bring your own token)
- **Audit** — install / uninstall / toggle / rating / publish recorded with operator identity
- **Mirror sync** — `topic:dsh-plugin` metadata cached into local SQLite (concurrency pool,
  session cache), so lists and search no longer depend on the network or rate limits
- **Dependency topology** — dependency and reverse-dependency graph
- **Ecosystem hook** — reads and writes dsh-bench state and can trigger a benchmark run

---

## Certified list and modpacks

Certification is not "this package is nice" — it is a statement about **a specific version**:

```
plugin_certs(package_name PK, version, publisher, certified_at)
state = cert.version === currentVersion ? certified : legacy
```

Every upgrade needs a fresh check, so you never see a badge that was earned on 0.3.0 while
the repo has moved to 0.9.0. Writes use `insert or replace`, so re-certifying the same
package overwrites that row — **no need to delete old rows first**, and adding entries is
idempotent too.

Current data (in the `dsh-plugin-registry` repo):

| Metric | Count |
|---|---|
| Plugin table entries | 171 |
| Certified | 171 (121 of them at the current version) |
| Published in the official index | 121 |
| Modpacks | 3 (Daily 13 / Builder 14 / Creator 11) |

Modpacks are hand-assembled by **scenario**, not by category: members are mutually exclusive
(a plugin belongs to one pack), with an install order and roles (e.g. "model source", "memory
backend"). Every member passes three checks — resolvable on npm, tarball fetchable, and a
whole-pack `pnpm install --lockfile-only` resolving a complete dependency graph. Members that
fail are dropped and the pack's description names them.

---

## Wiring into the official Discover page

The official plugin market (`@deepseek-ai/dsh-plugin-market`) only understands its own index
format, configured through `Config.indexes`. `market-index.json` at the hub repo root is
generated as **format 1**; add this to the profile's `cordis.patch.yml`:

```yaml
- id: plugin-market
  name: "@deepseek-ai/dsh-plugin-market"
  config:
    indexes:
      - "https://gh-proxy.com/https://raw.githubusercontent.com/yunhuantian/dsh-plugin-hub/main/market-index.json"
    cacheTtlMs: 300000
```

Field notes:

- The official reader calls `fetch(url, { redirect: 'error' })`, so the **index URL must not
  redirect**. `raw.githubusercontent.com` is unreachable here; the gh-proxy prefix returns 200.
- Only **certified** entries are published, all tagged `certified` — the same data as the
  store's Certified view.
- Hard rules: non-empty `versions`, exact SemVer, integer-second `publishTimestamp`,
  `localizedText` must include `en`, git sources need a 40-char lowercase commit, and
  categories/labels may only reference ids declared at the top. The generator runs every
  entry through the official `parseMarketIndex` and refuses to write an invalid file.

Sync is **one-way**: the store's own lists and modpacks stay in DPMIDX; the official index is
a read-only projection. The roles differ too — Discover handles "find and install", while the
store handles health, dependency graphs, certification, modpacks, publishing and audit.

---

## Building your own list / modpack

`.dpmidx` is not tied to this store — anyone can generate a list or a modpack and share it as
a link or file.

- **Tutorial**: [`docs/build-list-and-pack.md`](docs/build-list-and-pack.md)
- **Binary format**: [`docs/market-index-format.md`](docs/market-index-format.md)
- **Modpack design**: [`docs/modpack-architecture.md`](docs/modpack-architecture.md)

Minimal modpack:

```json
{
  "kind": 1,
  "meta": { "name": "My pack", "publisher": "me", "description": "One line", "intro": "Details\nSecond line" },
  "entries": [
    { "name": "dsh-ops", "url": "https://registry.npmjs.org/dsh-ops/-/dsh-ops-0.4.1.tgz" }
  ]
}
```

```bash
node scripts/build-market-index.mjs my-pack.json my-pack.dpmidx
```

---

## Install

```bash
# from npm (recommended)
dsh plugin --profile web add dsh-plugin-hub

# from a local build (development)
npm install
npm run build          # tsc for host + esbuild for the client bundle
dsh plugin --profile web add <this directory>
```

After installing, the **Plugin Store** item appears on the Plugins page. The GitHub token,
mirror sync and built-in switches all live in its Settings / Built-ins views. On first use,
hit "Sync now" in Settings.

> **On the desktop app, quit completely (including the tray icon) and start again.** The
> profile patch and dependencies are read at startup; closing the window is not enough, and
> the new UI will not appear.

---

## Architecture

```
dsh-plugin-hub (one npm package, five packages in one repo)
├─ packages/hub/                contracts / host / extensions / client
├─ packages/hub-health/         health (depends on hub-score)
├─ packages/hub-score/          pure scoring algorithm
├─ packages/hub-wiki/           wiki
├─ packages/hub-market-index/   DPMIDX v2/v3 format (zero deps, importable by third parties)
├─ cordis.patch.yml             21 rows at once: core + 20 internal plugins
├─ lib/                         distribution output (generated)
├─ market-index.json            official format 1 index (121 certified entries)
└─ docs/                        format spec, packing tutorial, modpack design
```

- **Host**: `PluginStoreService` exposes 20+ methods over a Typert Remote (`pluginStore`);
  `node:sqlite` for persistence; `installer.ts` installs through pnpm and rewrites the profile patch.
- **Switch coupling surface**: only two state files —
  `storages/plugin-store/plugins.json` (switches) and `plugins-status.json` (runtime state).
  Plugins do not depend on each other through cordis services; dependencies are declarations
  in the roster evaluated at runtime, so disabling one never wedges another.
- **Client**: a package may ship exactly one client bundle (DSH's `dsh.client` contract), so
  every built-in plugin's UI lives in that bundle and registers conditionally.
- **Single source of truth for contracts**: `contracts/pricing.ts` is compiled for the host
  and inlined into the client, so the price table cannot diverge.
- **Data and code separated**: plugin table, certifications and modpacks live in
  `dsh-plugin-registry`; the hub only reads them. Data changes need no hub release — the
  store registers all sources at once through its resource manifest.

---

## Development

```bash
npm run build:host     # tsc -p tsconfig.host.json
npm run build:client   # node scripts/build-client.mjs → lib/client.js
npm run build          # both
npm run typecheck      # host + client
npm run check:contract # round-trip: host payloads ⨯ zod contracts
```

> If `tsc` is not on PATH: `node node_modules/typescript/bin/tsc -p tsconfig.host.json`.
> Build scripts must **not** wipe `dist/` — it holds distribution artifacts (tables and
> downloads) and has been emptied by mistake three times.

### Adding an internal plugin

1. Add a descriptor to `HUB_PLUGINS` in `packages/hub/src/host/plugins-state.ts`
   (id / group / `requires` / row id / service / default);
2. Put reusable logic in `packages/hub/src/host/<name>.ts`;
3. Write the host half in `packages/hub/src/extensions/<id>.ts`:

   ```ts
   export const name = 'dsh-plugin-hub/extensions/<id>';
   export const provide = ['<service>'];
   export const inject: string[] = [];
   export function apply(ctx: any): void {
     activate(ctx, '<id>', () => {
       ctx.provide('<service>', () => ({ /* ... */ }));
     });
   }
   ```

   `activate` reads the switch, resolves dependencies recursively and reports
   `disabled` / `blocked` / `active`;
4. Add a row to the hub's `cordis.patch.yml`;
5. Add `./extensions/<id>` to `package.json` `exports` (miss it and the install fails at
   import; `version-guard` checks exactly this).

---

## Layout

```
packages/
  hub/src/
    contracts/
      remote.ts           # zod v4 wire contracts (TYPERT_REMOTE / TYPERT), 20+ remotes
      pricing.ts          # dated price tables + cost math (shared host/client)
    host/
      index.ts            # PluginStoreService (remotes, sync, plugin switches)
      plugins-state.ts    # the 20-plugin roster, dependency resolution, state files
      store-db.ts         # SQLite (mirror cache / ratings / audit / dep edges / certs)
      list-sources.ts     # resource-manifest registration and source refresh
      seed-catalog.ts     # offline seed catalog (16 entries, insert-only)
      github.ts  installer.ts  quality-gate.ts  conflict-check.ts
      security-scan.ts  publish.ts  version-guard.ts  changelog.ts
      update-check.ts  backup.ts  diagnostics.ts
    extensions/           # host half of each internal plugin (one cordis entry each)
      _runtime.ts         # activate(): switches + dependency resolution + status
    client/
      index.tsx           # registration on the official Plugins page, i18n, mounts
      StoreApp.tsx        # shell (top tabs + view switching + gating)
      views.tsx           # auto / certified / modpacks / detail / installed / …
      extensions-view.tsx # built-in switches
      icons.tsx           # icon adapter across DSH versions
      store.css           # styles (--dsw-* theme vars)
  hub-health/  hub-score/  hub-wiki/  hub-market-index/
scripts/
  build-market-index.mjs  # DPMIDX builder (shipped with the package)
  contract-check.mjs      # 1:1 contract self-check
docs/
  market-index-format.md  build-list-and-pack.md  modpack-architecture.md
```

---

## Version history

The project started in **July 2026** (local iteration, nothing public) and shipped its first
public version on 14 August. Below is every public version in chronological order, then the
detailed entries.

| Date | Version | What it did |
|---|---|---|
| 2026-07 | — | Project started, local iteration (no public release) |
| 2026-08-14 | 0.1.0 | First public release: graphical store, ratings, dependency graph, audit, mirror sync |
| 2026-08-15 | 0.1.1 | Installed-view three-way grouping, quality gate, self-authored detection |
| 2026-08-15 | 0.1.3 | Usage tab, multi-model cost estimation, npm / GitHub dual install sources |
| 2026-08-16 | 0.1.4 | One-click publish, pre-publish security scan, full i18n |
| 2026-08-16 | 0.1.5 | Plugin wiki, health leaderboard, conflict check, categories 6 → 12 |
| 2026-08-16 | 0.1.6 | Random recommendation (anti vote-rigging) + 7 sort orders |
| 2026-08-19 | 0.1.7 | Skill store, sync 20 min → 2-3 min, benchmark tab |
| 2026-08-19 | 0.1.8 | Fix the build output (0.1.7 shipped a broken bundle; use 0.1.8) |
| 2026-09-12 | 0.2.0 | One package with 20+ internal plugins, seed catalog, versioned price table |
| 2026-10-14 | 0.2.1 | DSH 0.2.x support (peer range, quality-gate false positive, settings i18n) |
| 2026-10-14 | 0.2.2 | Fix typert codec: remotes rejected on 0.2.x |
| 2026-10-14 | 0.2.3 | Store moves into the official Plugins page |
| 2026-10-14 | 0.2.4 | Store item becomes "click to open" instead of inlining the whole UI |
| 2026-10-25 | 0.2.5 | **Never published**: the version number is held by an unclearable npm staged record |
| 2026-10-26 | 0.2.6 | DPMIDX v2/v3, per-version certification, modpacks, data/code split |
| 2026-10-28 | 0.2.7 | Top-tab shell, complete wiki gating, official Discover integration (121) |

> `0.1.2` was never published; the number was skipped.

### Looking at an old version

No GitHub releases required — read it straight from npm:

```bash
npm view dsh-plugin-hub versions --json          # every published version
npm view dsh-plugin-hub@0.1.8 dist.tarball       # tarball URL for that version
npm pack dsh-plugin-hub@0.1.8                    # download and unpack
```

The tarball contains **the README of that time** (every version wrote its own changelog into
it) and the real build output under `lib/`. The 0.1.x entries are the most detailed and read
like a chronicle.

---

### 0.2.7 (2026-10-28)

**Shell: no more left nav**

A 176px vertical column held twelve words and squeezed content to 856px. With horizontal
tabs on top:

- content area returns to 1020px (fixed 1060px panel, 20px padding each side);
- the card grid (`minmax(240px, 1fr)`) goes from 3 back to 4 columns at the same width;
- all 12 views (Auto / Certified / Modpacks / Wiki / Skill Store / Installed / Built-ins /
  Health / Publish / Scaffold / Audit / Settings) sit on one row;
- tabs scroll horizontally on narrow windows instead of collapsing;
- if the current view is gated off, the store falls back to Auto instead of showing a blank page.

**Wiki: from "disabled shell" to actually disabled**

0.2.6 set `defaultEnabled: false`, but the nav was a hard-coded array, the detail tab only
checked UI registration, and `wikiHub` / `wiki` read the database directly. The plugin was
"off" while its content kept appearing. 0.2.7 gates all three: nav item `gate: 'baike'`,
detail tab filtered, `wikiHub` returns an empty set and `wiki` throws a "disabled" error.
Data is kept, so turning the switch back on restores everything.

**Official Discover integration**

- New `market-index.json` at the repo root: official format 1, 121 entries, all tagged `certified`;
- `plugin-market` gets an `indexes` entry in the profile (see above), so Plugins → Discover is
  no longer an empty state;
- the generator lives in `dsh-plugin-registry` and applies three filters: exists on npm →
  has a certification → certified version is the latest version;
- only certified entries are published — "installable" matters more than "many" on that page.

**Certified index, three passes**

| Pass | Entries | What happened |
|---|---|---|
| 1 | 76 | Only entries whose certified version was current |
| 2 | 100 | 24 stale certifications refreshed |
| 3 | 121 | 21 plugins added and verified one by one |

17 entries remain `legacy` (16 the author reverted a dist-tag, 1 not found on npm). They stay
out rather than diluting the word "certified".

---

### 0.2.6 (2026-10-26)

**Data and code separated**

The plugin table, certifications and modpacks lived inside the hub package, so changing one
row of data required an npm release. They moved to the `dsh-plugin-registry` repo:

- `sources.json` is the single entry: `{ kind, name, file, entries }`, with `file` resolved
  relative to the manifest;
- the store's "resource manifest" registers all sources at once; re-importing the same URL
  keeps the same id (id = sha1(URL)), so "refresh" overwrites in place instead of creating a
  duplicate;
- data changes push only the data repo; the hub version stays put.

**DPMIDX v2 / v3**

- Magic `DPMIDX` + version byte + **kind byte** (0 list / 1 modpack), 28-byte records;
- v3 puts `metaBytes` at offset 32, followed by UTF-8 JSON metadata
  `{ name, publisher, description, intro, createdAt, certification }`;
- `description` is one line, `intro` is the detailed multi-line description shown on modpack pages;
- deduplication is by "name + address", but only addresses pointing at a concrete artifact
  participate — repo roots go to `repoGroups()` only, otherwise different plugins in a
  monorepo would be merged.

**Per-version certification**

`plugin_certs(package_name, version, publisher, certified_at)`; `certified` only when
`cert.version === currentVersion`, otherwise `legacy`. `insert or replace` makes repeat
certification idempotent — no need to delete old rows.

**Store split into two areas plus a modpack page**

- Auto: everything synced from GitHub;
- Certified: hand-verified entries with publisher and date;
- Modpacks: their own page with intro, install order, member roles and one-click install.

**Modpacks**

Hand-assembled by scenario (Daily / Builder / Creator), members mutually exclusive and unique
for exclusive roles, each verified for npm resolution, tarball availability and whole-pack
dependency resolution; failures are dropped and named in the description.

**Other**

- five packages in one repo (`packages/hub` + `hub-health` + `hub-score` + `hub-wiki` +
  `hub-market-index`); entry names unchanged, so the refactor is invisible at runtime;
- the `trust` plugin was removed; trust logic moved into the quality gate, roster 21 → 20;
- external catalog sync off by default (`external_sync` gate);
- plugin table at 150 entries with publisher attribution and categories.

---

### 0.2.5 (2026-10-25, never published)

One fix: **issue #7 — self-referencing activation rows were treated as "packages not
installed", so no bundle-type plugin could be installed**.

The installer's dependency check saw the patch row pointing at the plugin itself as a package
that should be installed but was missing, so bundle-type plugins (those shipping their own
`cordis.patch.yml`) always failed. The fix recognises the self-reference and skips it.

The version number could not be published: npm holds a staged record where both approve and
reject return 404 and no credential can clear it. So the number was skipped. **The code is
entirely contained in 0.2.6** — nothing is missing functionally.

---

### 0.2.4 (2026-10-14)

**The store item becomes "click to open"**

0.2.3 registered the store on the official Plugins page, but `plugins.item` renders `summary`
and `page` with the same component — so the entire store UI (top nav, list, toolbar) was
poured into the plugin list and that row grew ten times taller than its neighbours. The
component now branches on `view`: `summary` shows only the title, description and an "Open"
button; `page` is the store itself.

---

### 0.2.3 (2026-10-14)

**The store moves into the official Plugins page**

On 0.1.x the store was a standalone sidebar button with a full-screen overlay and a separate
settings page. Since 0.2 it registers into the **official Plugins page** (`plugins.item`,
next to the official entries) — visually indistinguishable from a built-in feature:

- removed the sidebar button and overlay (and their CSS/i18n keys);
- removed the hub's own settings page (`settings.section`): token and sync already lived in the
  store's Settings view; only the built-in switches were unique, so they became a Built-ins view;
- the hub's plugin composition was unchanged.

**Cross-version icon adapter (the bug that made the sidebar entry vanish on 0.2.x)**

0.1.x encoded size in icon names (`IconCloseOutline16`); 0.2.x uses no suffix plus
Regular/Medium variants (`IconCloseOutlineRegular`, size via prop). Importing one version's
name on the other yields `undefined`, React throws error #130 ("Element type is invalid") and
**the whole slot collapses** — nothing renders.

- `icons.tsx` tries "0.2.x name → 0.1.x name", falls back to an inline SVG, so a real
  component always renders; all icons live in one file.

**Cleanup**

- deleted `_archived-insights-0.1.x/`;
- deleted 38 unused CSS rules (`dps-job-*`, `dps-ins-*`, leftover ranking styles, and the
  overlay-era `dps-overlay` / `dps-mask` / `dps-entry*`);
- deleted 19 unreferenced i18n keys (zh/en together);
- removed `openStore` / `openStoreStore` / `closeStore`.

Verified on real dsh `0.2.0-rc.2`: both `tsc` passes, `check:contract` all green, zero
`did not activate` warnings, zero browser console errors, and the Plugin Store item is visible
and usable.

---

### 0.2.2 (2026-10-14)

**Fix typert contract incompatibility on dsh 0.2.x (the 0.2.1 follow-up)**

0.2.1 widened the peer range so the hub could install on 0.2.x, but **typert-loader rejected
its Remote contracts at startup**: `invocation "dsh-plugin-hub#pluginStore/list" parameter
codec has no create() factory`, the whole typert-loader entry failed and every store remote
became unavailable. (This had been hidden by the package being skipped entirely.)

Root cause: 0.2.x changed how wire codecs expose their schema from a **direct field** to a
**lazy factory** — `requireStrictCodec` now requires `typeof codec.create === 'function'`.
Official generated files look like `{ mode: 'strict', typeSymbol, create: () => zodSchema }`.

- `strict()` now provides both: `create` for 0.2.x, `schema` for 0.1.x; old runtimes ignore
  unknown fields, new ones only read `create`;
- measured on real `0.2.0-rc.2`: "entries did not activate" dropped from 2 to **1**
  (only dsh-connector, which had not adapted to the 0.2 settings API).

---

### 0.2.1 (2026-10-14)

**DSH 0.2.x support (issue #6)**

- seven `@deepseek-ai/dsh-*` peers widened from `^0.1.0-rc.6` to
  `^0.1.0-rc.6 || ^0.2.0-rc.1`: the old range **structurally excluded** every 0.2.x, so
  installation on dsh `0.2.0-rc.2` was rejected by the compatibility check, and nine published
  versions shared the same range with nothing to downgrade to;
- removed the `@deepseek-ai/dsh-client-runtime` peer: that package stopped at `0.1.1-rc.2` on
  the 0.2 line and the built-in client bundle had not referenced it since the 0.2 adaptation;
- `version-guard` gained a pre-publish check that each `dsh-*` peer range covers the
  **running** harness version and names the missing segment.

**Quality-gate false positive (issue #4)**

- the import regex allowed a keyword to touch a **closing** quote, so
  `if (argument === "--import" || argument === "--loader")` was read as
  `import" || argument === "` and produced the pseudo-package ` || argument === `, which
  looked like an incomplete dependency and blocked installation. The affected plugin
  (`dsh-damage-pulse@4.0.8`) had complete dependencies;
- extraction now follows the three real shapes (`from '…'` / `import '…'` / `import('…')` /
  `require('…')`) with a real separator required, plus a fallback that only accepts
  npm-shaped bare names;
- rollback now reconciles `dsh.profile.bundles` so a failed install cannot leave a dangling
  bundle entry.

**Settings follow the Harness locale (PR #5, by @Oonatech)**

- the settings area never received `t`, so 42 visible strings were hard-coded Chinese
  regardless of locale (not a missing translation — the component never looked it up);
- everything now goes through the dictionary (57 new `settings.*` keys, zh/en symmetric).

**Other**

- removed the hub-managed connector settings and the `connectorStatus` / `connectorConfigSet`
  remotes: dsh-connector 0.2 ships its own settings namespace and browser card, and two entries
  writing the same config only fight each other.

---

### 0.2.0 (2026-09-12)

**Architecture: one package with 20+ switchable internal plugins**

- four previously separate packages (`dsh-usage` / `dsh-health` / `dsh-baike` /
  `dsh-skill-store`) were merged into the hub as cordis entries under
  `dsh-plugin-hub/extensions/*`;
- the roster grew to 21 entries in 5 groups (Foundation / Safety & Quality / Publishing /
  Insight & Content / Operations); 20 after `trust` was folded into quality in 0.2.5;
- internal plugins **declare** dependencies (`registry → store-db + github`,
  `publish → security`, …) resolved recursively by `activate()`; a blocked plugin steps aside
  instead of hanging — avoiding the hard-inject deadlock;
- the patch inserts 22 rows (core + 21), each visible and individually disableable in
  *Settings → Plugins*;
- the settings page gained a grouped plugin manager: state (running / off / blocked / failed),
  dependencies and dependents, switch counts;
- ⚠️ default-off plugins must not carry `disabled: true` in the patch, or the switch can never
  take effect.

**Offline seed catalog**

- `seed-catalog` ships 16 useful plugins so the store is usable before the first mirror sync
  (492 repos, several minutes);
- insert-only, real synced data always wins, dated catalog version, "seed" badge in the list.

**New capabilities**

- `version-guard`, `changelog`, `update-check`, `backup` (`VACUUM INTO`), `diagnostics`.

**Usage & cost: dated price tables**

- versioned tables (`effectiveFrom` / `effectiveTo`), adding `2026-09-10` (V4.1 Flash) and
  `2026-09-14` (V4 Pro billed as Flash);
- every request reports then-price, now-price and the delta;
- peak/off-peak multipliers (weekdays UTC 01:00–04:00 / 06:00–10:00 ×2);
- new `pricingTable` remote so other plugins reuse one table instead of hard-coding prices.

**DSH 0.1.5-rc.1 adaptation**

- client injection drops the removed `dsh-client-runtime` and adds
  `dsh-client-ui-conversation` / `dsh-api-remotes`;
- the externals list follows the new seed table;
- usage data now reads chat targets' `legacy.nodes` (new versions split `ConversationSnapshot`
  into `{views, activeTargets}`).

**Installed view: the hub's own plugins stop posing as system components**

- new "Plugin Store" group for the core plus its `extensions/*` entries, classified by how the
  core was installed (`file:` ⇒ self-authored, npm ⇒ downloaded);
- these entries are independent loader entries not listed in the profile's dependencies, so the
  old logic treated them as DSH infrastructure — **20/21 of them were swept into "other system
  components"**;
- "Other" is now system-only (renamed "Other system components"); the fallback group for
  non-system plugins is "Third-party plugins";
- bundled plugins have no individual uninstall (they ship with the package) but can be toggled
  individually, with their real runtime state shown.

**Fixes**

- host service `ctx` conflicting with the base class (renamed `appCtx`);
- node cost double-subtracting the cache bucket;
- state files renamed from `extensions.json` / `extensions-status.json` to
  `plugins.json` / `plugins-status.json` (old files still read for compatibility).

---

### 0.1.8 (2026-08-19)

**Fix the missing build output**: `build-client`'s clean step was blocked by security tooling
in some sandboxed environments, aborting the build so `lib/client.js` stayed stale and the
connector settings section and benchmark tab never shipped. The clean step no longer aborts
the build, and a complete artifact was republished.

Note: 0.1.7 is a broken-artifact version (npm is immutable), so use 0.1.8.

### 0.1.7 (2026-08-19)

- **Skill store**: browse, search and one-click install `SKILL.md` skills into
  `$DSH_HOME/skills/`; after a restart you can just say "use the xx skill";
- **ecosystem-wide collection**: 150 repos across five GitHub topics, 28 skills in the first batch;
- two-dimensional classification (DSH-specific / generic, plus 12 use cases); full SKILL.md
  rendering and uninstall;
- **benchmark tab** on plugin details: consumes dsh-bench reports, supports a local mock run
  (zero tokens) and an end-to-end run;
- **connector settings section** for dsh-connector IM bridges (removed in 0.2.1);
- **faster mirror sync**: concurrency pool (8 authenticated / 4 anonymous) plus npm download
  caching, 200+ repos from ~20 minutes to 2-3 minutes.

### 0.1.6 (2026-08-16)

- **Anti vote-rigging sort**: Discover defaults to "random recommendation" — a daily seed
  (stable within a day, rotates the next day, unpredictable), so star/download padding cannot
  reach the top; seven sort orders, remembered;
- health snapshot score on every row, sortable by health;
- fixed `list rejected "filters"` caused by a stale client contract.

### 0.1.5 (2026-08-16)

- **Plugin wiki**: a wiki page plus a detail tab answering "what is this for and what value
  does it bring";
- merged the Blue-Whale-Harness catalog: 1800+ community entries (1953 after dedup);
- dsh-hub-index trust badges (official / verified / community / unreviewed);
- **health leaderboard**: Top 20, weighted across activity 30 / release channels 15 / bug
  signal 25 / community 20 / release cadence 10, gold-silver-bronze for the top three;
  detail pages add a score breakdown and SVG trend chart;
- GitHub discussions tab (read-only issues, 5-minute cache);
- install conflict detection, update check, install-ownership validation, post-install
  environment variable hints;
- categories 6 → 12; write throttling; scaffold moved to "install locally → publish from the store".

### 0.1.4 (2026-08-16)

- **One-click publish**: create the GitHub repo, push code, topics and a release, and/or
  publish to npm; Markdown intro, public/private, labels, staged progress;
- **pre-publish security scan**: 8 high-risk classes (remote download-and-execute, environment
  exfiltration, malicious dependencies, …) rejected outright;
- tokens are session-only and never persisted;
- real npm download counts, "not found" otherwise;
- full i18n following the DSH locale; install progress bar;
- fixed duplicate activation rows crashing startup, and git push retries.

### 0.1.3 (2026-08-15)

- **Usage tab**: per-request token chart (input / output / cache hit rate) with zoom and pan;
- multi-model cost estimation with versioned, dated price tables; unknown models are not estimated;
- both npm and GitHub install buttons, with git clone as a fallback;
- expandable pnpm error output on failure;
- fixed a cache-hit rate above 100%, GitHub installing a release instead of the default branch,
  and Windows pnpm argument escaping.

### 0.1.1 (2026-08-15)

- installed view in three groups (system / downloaded / self-authored) with collapsible
  subgroups, per-category bulk toggles and 18 protected core components;
- **quality gate**: dependency completeness (auto-rollback) plus startup-directory requirements
  (installed but left disabled);
- self-authored detection (`file:` / `link:` / `workspace:`) with source path and publish status;
- the store can manage and uninstall itself; install-source badges;
- fixed disabled rows missing the real loader entry id, and the store not finding itself after sync.

### 0.1.0 (2026-08-14)

First release: graphical store (browse / search / filter / one-click install), local ratings
and reviews, dependency graph, audit log, GitHub token configuration, scheduled mirror sync,
plugin scaffolding and install-source badges.

---

## License

MIT
