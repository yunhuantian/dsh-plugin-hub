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
const entry = join(root, 'src', 'client', 'index.tsx');
const outBody = join(root, 'dist', 'client-body.js');
const outFile = join(root, 'lib', 'client.js');
const outMap = join(root, 'lib', 'client.js.map');

/** Shell-provided modules (the static seed table of the web shell). */
const EXTERNALS = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-web-react',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-attachment',
  '@deepseek-ai/dsh-client-schema-form',
  // 0.1.3 insights: conversation session kit + jobs mirror + token projections.
  '@deepseek-ai/dsh-client-runtime',
  '@deepseek-ai/dsh-client-ui-conversation',
  '@deepseek-ai/dsh-client-ui-layout',
  '@deepseek-ai/dsh-token-meter',
  '@deepseek-ai/dsh-client-connection',
  '@deepseek-ai/dsh-api-remotes',
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
  rmSync(join(root, 'dist'), { recursive: true, force: true });
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
