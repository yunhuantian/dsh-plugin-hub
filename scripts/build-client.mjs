/**
 * Build the client bundle: esbuild bundles src/client into a CommonJS body
 * with only the shell-provided seed modules externalized, then wraps it in the
 * `window.__ModuleLoader__.load({ id, factory })` handoff the web shell's
 * client module system consumes (same shape every dsh client bundle uses).
 *
 * The wrapper factory receives the module-table `require`, so external specs
 * resolve to the shell instances; everything else is inlined.
 */
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(root, 'packages', 'hub', 'src', 'client', 'index.tsx');
const outBody = join(root, 'dist', 'client-body.js');
const outFile = join(root, 'lib', 'client.js');
const outMap = join(root, 'lib', 'client.js.map');

/**
 * Shell-provided modules —— **必须以 0.1.5 的实际种子表为准**。
 *
 * 新版 web 外壳的种子表（dsh-web-frontend/dist 里的 `staticModules`）只有这 9 个：
 *   react / react-dom(+client, jsx-runtime) /
 *   @deepseek-ai/cordis / dsh-client-store / dsh-client-ui-slots /
 *   dsh-client-ui-primitives / dsh-client-ui-dockkit
 *
 * 0.2 适配：`@deepseek-ai/dsh-client-runtime` 与 `dsh-client-web-react`
 * 在新版已被移除（不再出现在任何平台包中）。它们曾在本清单里，一旦保留就会
 * 让 bundle 去 require 一个不存在的模块 —— 这正是必须跟着平台版本走的原因。
 * 除种子表与同图的插件行外，一切依赖都应内联进本 bundle。
 */
const EXTERNALS = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-ui-primitives',
];

const PLUGIN_ID = 'dsh-plugin-hub';

async function main() {
  rmSync(join(root, 'dist'), { recursive: true, force: true });
  mkdirSync(dirname(outFile), { recursive: true });

  const result = await build({
    entryPoints: [entry],
    bundle: true,
    format: 'cjs',
    platform: 'browser',
    target: ['es2020'],
    jsx: 'automatic',
    outfile: outBody,
    external: EXTERNALS,
    sourcemap: true,
    minify: false,
    logLevel: 'info',
    loader: { '.css': 'text' },
  });

  // The `.css` text loader inlines store.css as a string default export; the
  // bundle injects it as a <style data-plugin-css> tag at materialization.
  const body = readFileSync(outBody, 'utf8');

  // Source map: keep a reference but keep the bundle self-contained.
  const map = readFileSync(`${outBody}.map`, 'utf8');
  writeFileSync(outMap, map);

  const wrapped = `window.__ModuleLoader__.load({
\tid: ${JSON.stringify(PLUGIN_ID)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
${indent(body, 2)}
\t\treturn module.exports;
\t}
});

//# sourceMappingURL=client.js.map
`;

  writeFileSync(outFile, wrapped);
  // Cleanup of the staging dir is best-effort only: on some sandboxes the
  // safe-delete shim intercepts rmSync and throws — the bundle is already
  // written at this point, so a failed cleanup must NOT fail the build.
  try {
    rmSync(join(root, 'dist'), { recursive: true, force: true });
  } catch { /* non-fatal */ }
  console.log(`client bundle written: ${outFile} (${wrapped.length} bytes)`);
}

function indent(text, level) {
  const pad = '\t'.repeat(level);
  return text.split('\n').map((line) => (line ? pad + line : line)).join('\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
