import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, MessageSquarePlus, X } from 'lucide-react';
import { useHistoryStore } from '../../store/historyStore';
import { useChatStore } from '../../store/chatStore';
import clsx from 'clsx';
// === FEATURE: search-history ===
import { SearchInput, filterConversations } from '../../features/search-history/feature';
// === END FEATURE: search-history ===

interface Props {
  open: boolean;
  onClose: () => void;
}

export function HistorySidebar({ open, onClose }: Props) {
  const { t } = useTranslation();
  const conversations = useHistoryStore((s) => s.conversations);
  const activeId = useHistoryStore((s) => s.activeId);
  const setActive = useHistoryStore((s) => s.setActive);
  const deleteConv = useHistoryStore((s) => s.deleteConversation);
  const loadConversation = useChatStore((s) => s.loadConversation);
  const clearChat = useChatStore((s) => s.clearChat);

  // === FEATURE: search-history ===
  const [query, setQuery] = useState('');
  const filtered = filterConversations(conversations, query);
  // === END FEATURE: search-history ===

  const handleSelect = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return;
    setActive(id);
    loadConversation(conv.messages);
    onClose();
  };

  const handleNew = () => {
    setActive(null);
    clearChat();
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className={clsx('fixed inset-0 z-50 bg-black/40 transition-opacity', {
          'opacity-100 pointer-events-auto': open,
          'opacity-0 pointer-events-none': !open,
        })}
      />

      <aside
        className={clsx(
          'fixed inset-y-0 start-0 z-50 w-[300px] bg-white dark:bg-slate-800 shadow-2xl flex flex-col transition-transform duration-300',
          { 'translate-x-0': open, '-translate-x-full rtl:translate-x-full': !open },
        )}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold">{t('chat.history')}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <button
          onClick={handleNew}
          className="m-3 px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquarePlus className="w-4 h-4" />
          {t('chat.newChat')}
        </button>

        {/* === FEATURE: search-history === */}
        <SearchInput onChange={setQuery} />
        {/* === END FEATURE: search-history === */}

        <ul className="flex-1 overflow-y-auto px-2">
          {filtered.length === 0 && (
            <li className="text-center text-slate-400 py-8 text-sm">No history yet</li>
          )}
          {filtered.map((c) => (
            <li
              key={c.id}
              className={clsx(
                'group flex items-center gap-2 p-3 rounded-lg cursor-pointer mb-1 transition-colors',
                {
                  'bg-blue-50 dark:bg-blue-900/30': c.id === activeId,
                  'hover:bg-slate-100 dark:hover:bg-slate-700': c.id !== activeId,
                },
              )}
              onClick={() => handleSelect(c.id)}
            >
              <span className="flex-1 truncate text-sm">{c.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConv(c.id);
                }}
                aria-label={t('chat.delete')}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/40"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
