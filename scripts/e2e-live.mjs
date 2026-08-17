// End-to-end test of the LIVE plugin store service via the /api RPC bridge.
const BASE = 'http://127.0.0.1:3080';
let rpcId = 0;

async function rpc(method, args = {}) {
  const body = JSON.stringify({ type: 'client-request', rpcId: `e2e-${++rpcId}`, method, payload: { args } });
  const res = await fetch(`${BASE}/api/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  const json = await res.json();
  if (json.result?.ok === false) throw new Error(`${method}: ${json.result.error?.code} ${json.result.error?.message}`);
  return json.result?.value;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const results = {};
try {
  // 1. scaffold
  results.scaffold = await rpc('pluginStore/scaffold');
  results.scaffoldOk = !!results.scaffold?.templateRepo;

  // 2. start mirror sync
  results.syncNow = await rpc('pluginStore/syncNow');
  let status;
  for (let i = 0; i < 120; i++) {
    await sleep(3000);
    status = await rpc('pluginStore/syncStatus');
    if (status.state !== 'syncing') break;
    console.log(`  sync... ${i + 1}/120 state=${status.state}`);
  }
  results.syncStatus = status;
  console.log('sync done:', JSON.stringify(status));

  // 3. list
  const list = await rpc('pluginStore/list', { filters: { limit: 30 } });
  results.listTotal = list.total;
  results.sample = list.plugins?.slice(0, 5).map((p) => ({ name: p.name, pkg: p.packageName, cat: p.categories, stars: p.stars, rating: p.rating, dl: p.downloads }));

  // 4. detail of the first plugin (if any)
  const first = list.plugins?.[0];
  if (first) {
    const d = await rpc('pluginStore/detail', { packageName: first.packageName });
    results.detail = {
      name: d.name,
      versions: d.versions?.length,
      deps: d.dependencies?.length,
      dependents: d.dependents?.length,
      screenshots: d.screenshots?.length,
      usageLen: (d.usage || '').length,
      reviews: d.reviews?.length,
    };
    // 5. dependency graph
    results.graph = await rpc('pluginStore/dependencyGraph', { packageName: first.packageName });
    // 6. rate + reviews
    results.rate = await rpc('pluginStore/rate', { packageName: first.packageName, score: 5, comment: 'e2e 测试：很棒！', actor: 'e2e-tester' });
    results.reviews = await rpc('pluginStore/listReviews', { packageName: first.packageName });
    results.detailAfterRate = (await rpc('pluginStore/detail', { packageName: first.packageName })).rating;
  }

  // 7. search + category filter
  results.search = await rpc('pluginStore/list', { filters: { query: 'harness', limit: 5 } });
  results.byCategory = await rpc('pluginStore/list', { filters: { category: 'tool', limit: 5 } });

  // 8. installed + audit
  results.installed = await rpc('pluginStore/installed');
  results.audit = await rpc('pluginStore/audit', { query: { limit: 20 } });

  console.log(JSON.stringify(results, null, 2));
} catch (e) {
  console.error('E2E FAIL:', e);
  process.exit(1);
}
