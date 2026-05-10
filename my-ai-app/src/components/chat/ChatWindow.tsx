import { Menu, X, Minimize2, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { HistorySidebar } from './HistorySidebar';
import { useChatUIStore } from '../../store/chatUIStore';
// === FEATURE: export-chat ===
import { ExportButton } from '../../features/export-chat/feature';
// === END FEATURE: export-chat ===
// === FEATURE: system-prompt ===
import { SystemPromptEditor } from '../../features/system-prompt/feature';
// === END FEATURE: system-prompt ===
// === FEATURE: temperature-slider ===
import { TemperatureSlider } from '../../features/temperature-slider/feature';
// === END FEATURE: temperature-slider ===
// === FEATURE: model-selector ===
import { ModelSelector } from '../../features/model-selector/feature';
// === END FEATURE: model-selector ===
// === FEATURE: multi-tab-chats ===
import { ChatTabs } from '../../features/multi-tab-chats/feature';
// === END FEATURE: multi-tab-chats ===

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ChatWindow({ open, onClose }: Props) {
  const { t } = useTranslation();
  const [historyOpen, setHistoryOpen] = useState(false);
  const { isMinimized, toggleMinimized } = useChatUIStore();

  if (!open) return null;

  const sizeClasses = isMinimized
    ? 'lg:bottom-6 lg:end-6 lg:w-[300px] lg:h-auto'
    : 'inset-0 lg:inset-auto lg:bottom-6 lg:end-6 lg:w-[440px] lg:h-[640px]';

  return (
    <>
      {!isMinimized && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/30" onClick={onClose} />
      )}

      <div
        className={`fixed z-50 ${sizeClasses} bg-white dark:bg-slate-800 lg:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700`}
      >
        <header className="flex flex-col gap-2 p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setHistoryOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label={t('chat.history')}
            >
              <Menu className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold">{t('chat.title')}</h2>

            <div className="flex gap-1">
              {/* === FEATURE: system-prompt === */}
              <SystemPromptEditor />
              {/* === END FEATURE: system-prompt === */}

              {/* === FEATURE: export-chat === */}
              <ExportButton />
              {/* === END FEATURE: export-chat === */}

              <button
                onClick={toggleMinimized}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                aria-label="Minimize"
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                aria-label={t('common.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex justify-between items-center gap-2">
              {/* === FEATURE: model-selector === */}
              <ModelSelector />
              {/* === END FEATURE: model-selector === */}
              {/* === FEATURE: temperature-slider === */}
              <TemperatureSlider />
              {/* === END FEATURE: temperature-slider === */}
            </div>
          )}
        </header>

        {!isMinimized && (
          <>
            {/* === FEATURE: multi-tab-chats === */}
            <ChatTabs />
            {/* === END FEATURE: multi-tab-chats === */}
            <div className="flex-1 overflow-y-auto">
              <MessageList />
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 p-3">
              <MessageInput />
            </div>
          </>
        )}
      </div>

      <HistorySidebar open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </>
  );
}
