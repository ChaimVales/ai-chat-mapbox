import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Conversation, ChatMessage } from '../types';

interface HistoryState {
  conversations: Conversation[];
  activeId: string | null;

  // Actions
  saveConversation: (messages: ChatMessage[]) => string; // returns id
  deleteConversation: (id: string) => void;
  setActive: (id: string | null) => void;
  getActive: () => Conversation | null;
  clearAll: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeId: null,

      saveConversation: (messages) => {
        const existing = get().activeId
          ? get().conversations.find((c) => c.id === get().activeId)
          : null;

        const id = existing?.id || crypto.randomUUID();
        const title = messages[0]?.content.slice(0, 60) || 'New chat';
        const now = Date.now();

        const updated: Conversation = {
          id,
          title,
          messages,
          createdAt: existing?.createdAt || now,
          updatedAt: now,
        };

        const conversations = existing
          ? get().conversations.map((c) => (c.id === id ? updated : c))
          : [updated, ...get().conversations];

        set({ conversations, activeId: id });
        return id;
      },

      deleteConversation: (id) => {
        set({
          conversations: get().conversations.filter((c) => c.id !== id),
          activeId: get().activeId === id ? null : get().activeId,
        });
      },

      setActive: (id) => set({ activeId: id }),

      getActive: () => {
        const id = get().activeId;
        return id ? get().conversations.find((c) => c.id === id) || null : null;
      },

      clearAll: () => set({ conversations: [], activeId: null }),
    }),
    { name: 'chat-history-v1' }, // המפתח ב-localStorage
  ),
);
