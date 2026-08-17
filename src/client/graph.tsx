/**
 * Dependency impact graph: SVG visualization showing what a plugin depends on
 * (underlying libraries, left) and which upper plugins depend on it
 * (dependents, right) — the卸载影响范围 view.
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { DepEdge, DependentRow } from './api';

interface GraphProps {
  root: string;
  rootName: string;
  dependencies: DepEdge[];
  dependents: DependentRow[];
}

const NODE_W = 190;
const NODE_H = 30;
const GAP = 10;
const ROOT_W = 220;
const ROOT_H = 40;
const MAX_SIDE = 12;

function SideNode({ x, y, label, sub, tone, installed, onClick }: { x: number; y: number; label: string; sub: string; tone: 'dep' | 'depen'; installed?: boolean; onClick?: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <g
      transform={`translate(${x},${y})`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <rect
        width={NODE_W}
        height={NODE_H}
        rx={8}
        fill={tone === 'dep' ? 'var(--dsw-alias-interactive-bg-hover-danger, rgba(242,90,90,0.10))' : 'var(--dsw-alias-interactive-bg-hover-accent, rgba(65,118,230,0.12))'}
        stroke={tone === 'dep' ? 'var(--dsw-alias-state-error-primary, #e05252)' : 'var(--dsw-alias-brand-primary-new-colorprimary-new-color, #4176e6)'}
        strokeOpacity={hover ? 1 : 0.45}
        strokeWidth={hover ? 1.5 : 1}
      />
      <text x={10} y={13} className="dps-graph-node-label" dominantBaseline="middle" style={{ fontWeight: hover ? 600 : 400 }}>{label.length > 26 ? `${label.slice(0, 25)}…` : label}</text>
      <text x={10} y={23} className="dps-graph-node-sub" dominantBaseline="middle">{sub}</text>
      {installed !== undefined && (
        <circle cx={NODE_W - 9} cy={9} r={4} fill={installed ? 'var(--dsw-alias-state-success-primary, #2e9e5b)' : 'var(--dsw-alias-label-tertiary, #888)'} />
      )}
    </g>
  );
}

export function DependencyGraph({ root, rootName, dependencies, dependents }: GraphProps): ReactNode {
  const deps = useMemo(() => dependencies.filter((d) => d.kind === 'runtime' || d.kind === 'peer').slice(0, MAX_SIDE), [dependencies]);
  const depens = useMemo(() => dependents.slice(0, MAX_SIDE), [dependents]);
  const extraDeps = dependencies.filter((d) => d.kind === 'runtime' || d.kind === 'peer').length - deps.length;
  const extraDepens = dependents.length - depens.length;

  const leftW = NODE_W;
  const rightW = NODE_W;
  const midX = leftW + 60;
  const rootY = 40;
  const sideH = Math.max(deps.length, depens.length, 1) * (NODE_H + GAP) - GAP;
  const height = Math.max(sideH, ROOT_H) + rootY * 2;
  const width = leftW + midX + 60 + rightW;

  const depYs = deps.map((_, i) => rootY + i * (NODE_H + GAP) + NODE_H / 2);
  const depenYs = depens.map((_, i) => rootY + i * (NODE_H + GAP) + NODE_H / 2);

  const rootX = leftW + 60;
  const rootCenterY = rootY + sideH / 2;
  const rootYPos = Math.max(rootCenterY - ROOT_H / 2, 0);

  return (
    <div className="dps-graph">
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${rootName} 依赖拓扑图`}>
        <defs>
          <marker id="dps-arrow-dep" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--dsw-alias-state-error-primary, #e05252)" opacity="0.7" />
          </marker>
          <marker id="dps-arrow-depen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--dsw-alias-brand-primary-new-colorprimary-new-color, #4176e6)" opacity="0.7" />
          </marker>
        </defs>

        {/* edges: dependencies -> root */}
        {deps.map((d, i) => (
          <path
            key={`dep-${d.name}`}
            d={`M ${leftW} ${depYs[i]} C ${leftW + 30} ${depYs[i]}, ${rootX - 30} ${depYs[i]}, ${rootX} ${depYs[i]}`}
            stroke="var(--dsw-alias-state-error-primary, #e05252)"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            fill="none"
            markerEnd="url(#dps-arrow-dep)"
          />
        ))}
        {/* edges: root -> dependents */}
        {depens.map((d, i) => (
          <path
            key={`depen-${d.packageName}`}
            d={`M ${rootX + ROOT_W} ${depenYs[i]} C ${rootX + ROOT_W + 30} ${depenYs[i]}, ${leftW + midX + 30} ${depenYs[i]}, ${leftW + midX + 60} ${depenYs[i]}`}
            stroke="var(--dsw-alias-brand-primary-new-colorprimary-new-color, #4176e6)"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            fill="none"
            markerEnd="url(#dps-arrow-depen)"
          />
        ))}

        {/* root node */}
        <g transform={`translate(${rootX},${rootYPos})`}>
          <rect width={ROOT_W} height={ROOT_H} rx={10} fill="var(--dsw-alias-button-elevated-fill, #333)" stroke="var(--dsw-alias-label-primary, #fff)" strokeWidth="1.5" />
          <text x={ROOT_W / 2} y={16} textAnchor="middle" className="dps-graph-root-label" dominantBaseline="middle">{rootName.length > 24 ? `${rootName.slice(0, 23)}…` : rootName}</text>
          <text x={ROOT_W / 2} y={29} textAnchor="middle" className="dps-graph-root-sub" dominantBaseline="middle">{root}</text>
        </g>

        {/* left column: dependencies */}
        <text x={NODE_W / 2} y={16} textAnchor="middle" className="dps-graph-col-label">依赖的底层库 ({dependencies.length})</text>
        {deps.map((d, i) => (
          <SideNode key={d.name} x={0} y={rootY + i * (NODE_H + GAP)} label={d.name} sub={d.version ?? d.kind} tone="dep" />
        ))}
        {extraDeps > 0 && <text x={NODE_W / 2} y={rootY + deps.length * (NODE_H + GAP) + 10} textAnchor="middle" className="dps-graph-more">另有 {extraDeps} 个开发/其他依赖</text>}

        {/* right column: dependents */}
        <text x={leftW + midX + 60 + rightW / 2} y={16} textAnchor="middle" className="dps-graph-col-label">被上层插件依赖 ({dependents.length})</text>
        {depens.map((d, i) => (
          <SideNode key={d.packageName} x={leftW + midX + 60} y={rootY + i * (NODE_H + GAP)} label={d.name} sub={`评分 ${d.rating.toFixed(1)}${d.installed ? ' · 已安装' : ''}`} tone="depen" installed={d.installed} onClick={() => { window.dispatchEvent(new CustomEvent('dps-open-plugin', { detail: d.packageName })); }} />
        ))}
        {extraDepens > 0 && <text x={leftW + midX + 60 + rightW / 2} y={rootY + depens.length * (NODE_H + GAP) + 10} textAnchor="middle" className="dps-graph-more">另有 {extraDepens} 个上层插件</text>}
      </svg>
      <div className="dps-graph-legend">
        <span className="dps-legend-item"><i className="dps-legend-dep" /> 依赖的底层库（卸载该插件不影响它们）</span>
        <span className="dps-legend-item"><i className="dps-legend-depen" /> 依赖本插件的上层插件（卸载会影响它们）</span>
        <span className="dps-legend-item"><i className="dps-legend-dot" /> 已安装</span>
      </div>
      <p className="dps-graph-hint">卸载前评估影响范围：点击右侧节点可跳转到对应插件详情；红色连线为传入依赖，蓝色连线为传出依赖。</p>
    </div>
  );
}
