/**
 * FEATURE: multi-tab-chats
 * Tabs at top of chat - switching tabs swaps the conversation.
 *
 * Files this feature touches:
 *   - src/components/chat/ChatWindow.tsx (render <ChatTabs /> at top)
 *   - src/components/chat/ChatPanel.tsx (render <ChatTabs /> at top)
 *
 * To remove: delete folder + remove import + remove <ChatTabs /> from JSX.
 */

import { create } from 'zustand';
import { Plus, X } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useHistoryStore } from '../../store/historyStore';
import type { ChatMessage } from '../../types';

interface Tab {
  id: string;
  title: string;
  messages: ChatMessage[];
}

interface TabsState {
  tabs: Tab[];
  activeId: string | null;
  addTab: () => void;
  closeTab: (id: string) => void;
  setActive: (id: string) => void;
}

export const useTabsStore = create<TabsState>((set, get) => ({
  tabs: [{ id: 'default', title: 'Chat 1', messages: [] }],
  activeId: 'default',

  addTab: () => {
    const currentMsgs = useChatStore.getState().messages;
    const currentId = get().activeId;
    if (currentId) {
      const updated = get().tabs.map((t) => (t.id === currentId ? { ...t, messages: currentMsgs } : t));
      set({ tabs: updated });
    }

    const id = crypto.randomUUID();
    const num = get().tabs.length + 1;
    set({
      tabs: [...get().tabs, { id, title: `Chat ${num}`, messages: [] }],
      activeId: id,
    });
    useChatStore.getState().clearChat();
    useHistoryStore.getState().setActive(null);
  },

  closeTab: (id) => {
    const tabs = get().tabs.filter((t) => t.id !== id);
    if (tabs.length === 0) {
      tabs.push({ id: 'default', title: 'Chat 1', messages: [] });
    }
    const wasActive = get().activeId === id;
    const newActive = wasActive ? tabs[0].id : get().activeId;
    set({ tabs, activeId: newActive });

    if (wasActive) {
      const newTab = tabs.find((t) => t.id === newActive);
      useChatStore.getState().loadConversation(newTab?.messages || []);
    }
  },

  setActive: (newActive) => {
    const currentId = get().activeId;
    const currentMsgs = useChatStore.getState().messages;
    if (currentId && currentId !== newActive) {
      const updated = get().tabs.map((t) => (t.id === currentId ? { ...t, messages: currentMsgs } : t));
      set({ tabs: updated });
    }
    set({ activeId: newActive });
    const tab = get().tabs.find((t) => t.id === newActive);
    useChatStore.getState().loadConversation(tab?.messages || []);
  },
}));

export function ChatTabs() {
  const { tabs, activeId, addTab, closeTab, setActive } = useTabsStore();
  return (
    <div className="flex items-center gap-1 p-1 border-b border-slate-200 dark:border-slate-700 overflow-x-auto bg-slate-50 dark:bg-slate-900/50">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActive(tab.id)}
          className={`group flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer flex-shrink-0 ${
            activeId === tab.id ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <span>{tab.title}</span>
          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              aria-label="Close tab"
            >
              <X className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addTab}
        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
        aria-label="New tab"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
