import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useMapStore } from '../../store/mapStore';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { HistorySidebar } from './HistorySidebar';
// === FEATURE: export-chat ===
import { ExportButton } from '../../features/export-chat/feature';
// === END FEATURE: export-chat ===
// === FEATURE: system-prompt ===
import { SystemPromptEditor } from '../../features/system-prompt/feature';
// === END FEATURE: system-prompt ===

export function ChatPanel() {
  const { t } = useTranslation();
  const [historyOpen, setHistoryOpen] = useState(false);
  const clearGeo = useMapStore((s) => s.clearGeo);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setHistoryOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="font-semibold">{t('chat.title')}</h2>
        <div className="flex gap-1">
          {/* === FEATURE: system-prompt === */}
          <SystemPromptEditor />
          {/* === END FEATURE: system-prompt === */}
          {/* === FEATURE: export-chat === */}
          <ExportButton />
          {/* === END FEATURE: export-chat === */}
          <button
            onClick={clearGeo}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            title="Close map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <MessageList />
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 p-3">
        <MessageInput />
      </div>

      <HistorySidebar open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  );
}
