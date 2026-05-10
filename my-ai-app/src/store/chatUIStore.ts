import { create } from 'zustand';

interface ChatUIState {
    isMinimized: boolean;
    toggleMinimized: () => void;
    setMinimized: (m: boolean) => void;
}

export const useChatUIStore = create<ChatUIState>((set) => ({
    isMinimized: false,
    toggleMinimized: () => set((s) => ({ isMinimized: !s.isMinimized })),
    setMinimized: (isMinimized) => set({ isMinimized }),
}));