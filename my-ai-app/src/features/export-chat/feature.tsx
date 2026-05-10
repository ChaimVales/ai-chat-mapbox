/**
 * FEATURE: export-chat
 * Download current conversation as Markdown file.
 *
 * Files this feature touches:
 *   - src/components/chat/ChatWindow.tsx or ChatPanel.tsx (add <ExportButton /> in header)
 */

import { Download } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

export function ExportButton() {
  const messages = useChatStore((s) => s.messages);

  const handleExport = () => {
    if (messages.length === 0) return;
    const md = messages
      .map((m) => `### ${m.role === 'user' ? '🧑 You' : '🤖 Assistant'}\n\n${m.content}\n`)
      .join('\n---\n\n');
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
      aria-label="Export chat"
      title="Export chat as Markdown"
    >
      <Download className="w-5 h-5" />
    </button>
  );
}
