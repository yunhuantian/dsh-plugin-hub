/**
 * Dependency impact graph: SVG visualization showing what a plugin depends on
 * (underlying libraries, left) and which upper plugins depend on it
 * (dependents, right) — the卸载影响范围 view.
 */
import { type ReactNode } from 'react';
import type { DepEdge, DependentRow } from './api';
interface GraphProps {
    root: string;
    rootName: string;
    dependencies: DepEdge[];
    dependents: DependentRow[];
}
export declare function DependencyGraph({ root, rootName, dependencies, dependents }: GraphProps): ReactNode;
export {};
