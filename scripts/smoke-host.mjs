// Smoke test for the host service: instantiate against a temp DSH_HOME and
// exercise the remote surface without a browser.
import { mkdtempSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const home = mkdtempSync(join(tmpdir(), 'dsh-store-test-'));
const profileDir = join(home, 'profiles', 'web');
mkdirSync(profileDir, { recursive: true });
process.env.DSH_HOME = home;

const { Context } = require('@deepseek-ai/cordis');
const { PluginStoreService } = require('../lib/host/index.js');

const root = new Context();
root.provide('loader', { ctx: { baseUrl: `file:///${profileDir.replace(/\\/g, '/')}/` } });
const service = new PluginStoreService(root, {});

const results = {};
try {
  results.settings = await service.settings();
  results.scaffold = await service.scaffold();
  results.list = await service.list({});
  results.installed = await service.installed();
  results.audit = await service.audit({});
  results.syncStatus = await service.syncStatus();
  // token round-trip
  results.tokenBad = await service.setGithubToken('short', 'tester');
  results.tokenOk = await service.setGithubToken('ghp_abcdefghijklmnopqrstuvwxyz123456', 'tester');
  results.settings2 = await service.settings();
  results.tokenClear = await service.clearGithubToken('tester');
  // rating round-trip
  results.rate = await service.rate('some.pkg', 5, 'great', 'tester');
  results.audit2 = await service.audit({});
  results.depGraph = await service.dependencyGraph('nope').then(() => 'ok').catch((e) => `threw: ${e.message.slice(0, 60)}`);
  results.detail = await service.detail('nope').then(() => 'ok').catch((e) => `threw: ${e.message.slice(0, 60)}`);
  console.log(JSON.stringify(results, null, 2));
} catch (e) {
  console.error('SMOKE FAIL:', e);
  process.exitCode = 1;
} finally {
  service.db.close();
  rmSync(home, { recursive: true, force: true });
}
