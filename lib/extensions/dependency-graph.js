import { activate } from './_runtime.js';
const ID = 'dependency-graph';
export const name = 'dsh-plugin-hub/extensions/dependency-graph';
export const provide = ['pluginDepGraph'];
export const inject = [];
export function apply(ctx) {
    activate(ctx, ID, () => {
        ctx.provide('pluginDepGraph', () => ({
            /**
             * 以某个插件为起点展开影响图。
             * `installed` 由调用方从 profile 传入（本插件不碰文件系统）。
             */
            impact: (db, packageName, installed) => {
                const edges = db.dependenciesOf(packageName);
                const dependents = db.dependentsOf(packageName);
                const nodes = [
                    { packageName, role: 'root', version: db.getPlugin(packageName)?.version ?? null, installed: installed.has(packageName), rating: null },
                ];
                for (const edge of edges) {
                    const row = db.getPlugin(edge.name);
                    nodes.push({
                        packageName: edge.name,
                        role: 'dependency',
                        version: edge.version,
                        installed: installed.has(edge.name),
                        rating: row === undefined ? null : null,
                    });
                }
                for (const dep of dependents) {
                    nodes.push({
                        packageName: dep.packageName,
                        role: 'dependent',
                        version: dep.version,
                        installed: installed.has(dep.packageName),
                        rating: null,
                    });
                }
                return { root: packageName, nodes, edges, risky: dependents.length > 0 };
            },
            /** 全库依赖边（画全局图用）。 */
            allEdges: (db) => {
                const out = [];
                for (const row of db.allPlugins()) {
                    for (const edge of db.dependenciesOf(row.packageName))
                        out.push({ from: row.packageName, to: edge.name });
                }
                return out;
            },
            ready: true,
        }));
    });
}
export default { name, provide, inject, apply };
