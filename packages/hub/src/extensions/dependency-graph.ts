/**
 * hub 内建插件 · 依赖影响图谱（dependency-graph）—— insight 组。
 *
 * 服务 `pluginDepGraph`：把插件之间的依赖 / 被依赖关系整理成图数据，
 * 让「升级这个会不会牵连别的」「卸了它谁会坏」在动手前就看得见。
 * 依赖 `store-db`（依赖边存在 dependencies 表里）。
 */
import type { StoreDB, DepEdge } from '../host/store-db.js';
import { activate } from './_runtime.js';

const ID = 'dependency-graph';

export const name = 'dsh-plugin-hub/extensions/dependency-graph';
export const provide = ['pluginDepGraph'];
export const inject: string[] = [];

export interface ImpactNode {
  packageName: string;
  /** root = 起点，dependency = 它依赖的，dependent = 依赖它的。 */
  role: 'root' | 'dependency' | 'dependent';
  version: string | null;
  installed: boolean;
  rating: number | null;
}

export interface ImpactGraph {
  root: string;
  nodes: ImpactNode[];
  /** 直接依赖边。 */
  edges: DepEdge[];
  /** 会不会牵连到别人（有 dependent 就是会）。 */
  risky: boolean;
}

export function apply(ctx: any): void {
  activate(ctx, ID, () => {
    ctx.provide('pluginDepGraph', () => ({
      /**
       * 以某个插件为起点展开影响图。
       * `installed` 由调用方从 profile 传入（本插件不碰文件系统）。
       */
      impact: (db: StoreDB, packageName: string, installed: Set<string>): ImpactGraph => {
        const edges = db.dependenciesOf(packageName);
        const dependents = db.dependentsOf(packageName);
        const nodes: ImpactNode[] = [
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
      allEdges: (db: StoreDB): Array<{ from: string; to: string }> => {
        const out: Array<{ from: string; to: string }> = [];
        for (const row of db.allPlugins()) {
          for (const edge of db.dependenciesOf(row.packageName)) out.push({ from: row.packageName, to: edge.name });
        }
        return out;
      },
      ready: true,
    }));
  });
}

export default { name, provide, inject, apply };
