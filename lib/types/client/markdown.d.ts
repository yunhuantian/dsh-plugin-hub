/**
 * Minimal, dependency-free markdown renderer for plugin READMEs and usage
 * text. Supports headings, paragraphs, lists, code fences, inline code, bold,
 * italic, links, images, blockquotes, tables (basic), and horizontal rules —
 * enough for store descriptions without pulling a markdown engine into the
 * client bundle.
 */
import { type ReactNode } from 'react';
/** Render markdown to React elements. */
export declare function Markdown({ text, className }: {
    text: string;
    className?: string;
}): ReactNode;
