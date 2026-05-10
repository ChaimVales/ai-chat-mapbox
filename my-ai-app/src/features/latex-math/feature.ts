/**
 * FEATURE: latex-math
 * Renders LaTeX math expressions in markdown ($x^2$, $$\sum$$, etc).
 *
 * Requires: npm install rehype-katex remark-math katex
 * Also import: import 'katex/dist/katex.min.css' (in main.tsx)
 *
 * Files this feature touches:
 *   - src/main.tsx (import katex CSS)
 *   - src/components/chat/MessageBubble.tsx (add plugins to ReactMarkdown)
 *
 * To remove: delete folder + remove plugins + remove katex CSS import.
 */

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export const remarkPlugins = [remarkMath];
export const rehypePlugins = [rehypeKatex];
