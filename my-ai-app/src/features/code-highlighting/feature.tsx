/**
 * FEATURE: code-highlighting
 * Syntax highlighting for code blocks in markdown messages.
 *
 * Requires: npm install react-syntax-highlighter @types/react-syntax-highlighter
 *
 * Files this feature touches:
 *   - src/components/chat/MessageBubble.tsx (passes <CodeBlock /> to ReactMarkdown.components)
 *
 * To remove: delete folder + remove `components={{ code: CodeBlock }}` from ReactMarkdown.
 */

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function CodeBlock({ inline, className, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const theme = useThemeStore((s) => s.theme);
  const match = /language-(\w+)/.exec(className || '');
  const code = String(children).replace(/\n$/, '');

  if (inline) {
    return (
      <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-sm">
        {children}
      </code>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-2 rounded-lg overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-2 end-2 z-10 p-1 rounded bg-slate-700/70 text-white hover:bg-slate-600"
        aria-label="Copy code"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      </button>
      <SyntaxHighlighter
        language={match?.[1] || 'text'}
        style={theme === 'dark' ? vscDarkPlus : vs}
        customStyle={{ margin: 0, padding: '1rem', fontSize: '0.85rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
