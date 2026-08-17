// Smoke test: materialize the client bundle with stubbed externals + a fake
// DOM, then check the exports (apply/inject) are present and the CSS tag lands.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---- fake DOM ---------------------------------------------------------------
const styleTags = [];
globalThis.document = {
  querySelector: (sel) => (sel.includes('data-plugin-css') && styleTags.length ? {} : null),
  createElement: (tag) => ({ tagName: tag, dataset: {}, textContent: '' }),
  head: { appendChild: (el) => styleTags.push(el) },
};
globalThis.window = globalThis;
try {
  Object.defineProperty(globalThis, 'navigator', { value: { clipboard: { writeText: async () => {} } }, configurable: true });
} catch { /* node 24 keeps a getter; ignore */ }

// ---- stub externals ---------------------------------------------------------
const reactStub = new Proxy({}, { get: (_, k) => (k === '__esModule' ? true : () => ({})) });
const primitivesStub = new Proxy({}, { get: (_, k) => (k === '__esModule' ? true : () => ({})) });
const externals = {
  react: reactStub,
  'react/jsx-runtime': reactStub,
  'react-dom': { createPortal: () => null },
  'react-dom/client': reactStub,
  '@deepseek-ai/dsh-client-ui-primitives': primitivesStub,
};

let handoff = null;
globalThis.window.__ModuleLoader__ = { load: (h) => { handoff = h; } };

const source = readFileSync(join(root, 'lib', 'client.js'), 'utf8');
// Execute the bundle (it registers the handoff synchronously).
(0, eval)(source);

if (!handoff) { console.error('FAIL: no handoff registered'); process.exit(1); }
if (handoff.id !== 'dsh-plugin-hub') { console.error('FAIL: wrong id', handoff.id); process.exit(1); }

const requireStub = (spec) => {
  if (spec in externals) return externals[spec];
  throw new Error(`unexpected require: ${spec}`);
};

const exports_ = handoff.factory(requireStub);
console.log('exports keys:', Object.keys(exports_));
console.log('has apply:', typeof exports_.apply === 'function');
console.log('has inject:', Array.isArray(exports_.inject) && exports_.inject.join(','));
console.log('has default apply:', typeof exports_.default?.apply === 'function');
console.log('css tags injected:', styleTags.length, styleTags[0]?.dataset?.pluginCss);
if (typeof exports_.apply !== 'function' || !Array.isArray(exports_.inject)) {
  console.error('FAIL: missing apply/inject');
  process.exit(1);
}
console.log('CLIENT BUNDLE OK');
