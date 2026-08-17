/**
 * Minimal, dependency-free markdown renderer for plugin READMEs and usage
 * text. Supports headings, paragraphs, lists, code fences, inline code, bold,
 * italic, links, images, blockquotes, tables (basic), and horizontal rules —
 * enough for store descriptions without pulling a markdown engine into the
 * client bundle.
 */
import { Fragment, type ReactNode } from 'react';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

interface InlineToken {
  type: 'text' | 'code' | 'bold' | 'italic' | 'link' | 'image';
  text?: string;
  href?: string;
  title?: string;
}

const INLINE_RE = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\))|(\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\))/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(INLINE_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) nodes.push(<Fragment key={`${keyPrefix}-t${i++}`}>{text.slice(last, idx)}</Fragment>);
    const [, code, bold, italic, , alt, imgSrc, imgTitle, , linkText, linkHref, linkTitle] = m;
    if (code !== undefined) {
      nodes.push(<code key={`${keyPrefix}-c${i++}`} className="dps-md-code">{code.slice(1, -1)}</code>);
    } else if (bold !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${i++}`}>{renderInline(bold.slice(2, -2), `${keyPrefix}-b`)}</strong>);
    } else if (italic !== undefined) {
      nodes.push(<em key={`${keyPrefix}-i${i++}`}>{renderInline(italic.slice(1, -1), `${keyPrefix}-i`)}</em>);
    } else if (imgSrc !== undefined) {
      nodes.push(<img key={`${keyPrefix}-img${i++}`} className="dps-md-img" src={imgSrc} alt={alt ?? ''} title={imgTitle} loading="lazy" />);
    } else if (linkHref !== undefined) {
      nodes.push(<a key={`${keyPrefix}-a${i++}`} className="dps-md-link" href={linkHref} title={linkTitle} target="_blank" rel="noreferrer">{renderInline(linkText ?? '', `${keyPrefix}-a`)}</a>);
    }
    last = idx + m[0].length;
  }
  if (last < text.length) nodes.push(<Fragment key={`${keyPrefix}-t${i++}`}>{text.slice(last)}</Fragment>);
  return nodes;
}

interface Block {
  kind: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'code' | 'quote' | 'ul' | 'ol' | 'hr' | 'table';
  text?: string;
  rows?: string[][];
  items?: string[];
  lang?: string;
}

function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) { i++; continue; }
    const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (heading) {
      blocks.push({ kind: `h${heading[1].length}` as Block['kind'], text: heading[2] });
      i++;
      continue;
    }
    if (/^(---+|\*\*\*+)$/.test(trimmed)) {
      blocks.push({ kind: 'hr' });
      i++;
      continue;
    }
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i]);
        i++;
      }
      i++; // closing fence
      blocks.push({ kind: 'code', text: code.join('\n'), lang });
      continue;
    }
    if (trimmed.startsWith('>')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ kind: 'quote', text: quote.join('\n') });
      continue;
    }
    if (/^[-*+]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const ordered = /^\d+\.\s+/.test(trimmed);
      const items: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (/^[-*+]\s+/.test(t) || /^\d+\.\s+/.test(t)) {
          items.push(t.replace(/^[-*+]\s+/, '').replace(/^\d+\.\s+/, ''));
          i++;
        } else if (/^\s{2,}\S/.test(lines[i]) && items.length) {
          items[items.length - 1] += ` ${lines[i].trim()}`;
          i++;
        } else break;
      }
      blocks.push(ordered ? { kind: 'ol', items } : { kind: 'ul', items });
      continue;
    }
    if (trimmed.includes('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().includes('|')) {
        const cells = lines[i].trim().split('|').slice(1, -1).map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      if (rows.length) {
        blocks.push({ kind: 'table', rows });
        continue;
      }
    }
    // paragraph: gather until blank line or block start
    const para: string[] = [trimmed];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,4})\s/.test(lines[i].trim()) && !lines[i].trim().startsWith('```')) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ kind: 'p', text: para.join(' ') });
  }
  return blocks;
}

/** Render markdown to React elements. */
export function Markdown({ text, className }: { text: string; className?: string }): ReactNode {
  if (!text) return null;
  const blocks = parseBlocks(text);
  let key = 0;
  const out = blocks.map((block) => {
    const k = `md-${key++}`;
    switch (block.kind) {
      case 'h1': return <h1 key={k} className="dps-md-h1">{renderInline(block.text ?? '', k)}</h1>;
      case 'h2': return <h2 key={k} className="dps-md-h2">{renderInline(block.text ?? '', k)}</h2>;
      case 'h3': return <h3 key={k} className="dps-md-h3">{renderInline(block.text ?? '', k)}</h3>;
      case 'h4': return <h4 key={k} className="dps-md-h4">{renderInline(block.text ?? '', k)}</h4>;
      case 'p': return <p key={k} className="dps-md-p">{renderInline(block.text ?? '', k)}</p>;
      case 'code': return (
        <pre key={k} className="dps-md-pre"><code className={`dps-md-pre-code${block.lang ? ` lang-${escapeHtml(block.lang)}` : ''}`}>{block.text}</code></pre>
      );
      case 'quote': return <blockquote key={k} className="dps-md-quote">{renderInline(block.text ?? '', k)}</blockquote>;
      case 'ul': return <ul key={k} className="dps-md-ul">{block.items?.map((it, j) => <li key={`${k}-${j}`}>{renderInline(it, `${k}-${j}`)}</li>)}</ul>;
      case 'ol': return <ol key={k} className="dps-md-ol">{block.items?.map((it, j) => <li key={`${k}-${j}`}>{renderInline(it, `${k}-${j}`)}</li>)}</ol>;
      case 'hr': return <hr key={k} className="dps-md-hr" />;
      case 'table': return (
        <div key={k} className="dps-md-table-wrap">
          <table className="dps-md-table">
            <tbody>
              {block.rows?.map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => (ri === 0 ? <th key={ci}>{renderInline(cell, `${k}-${ri}-${ci}`)}</th> : <td key={ci}>{renderInline(cell, `${k}-${ri}-${ci}`)}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      default: return null;
    }
  });
  return <div className={className ?? 'dps-md'}>{out}</div>;
}
