import { create } from 'zustand';

// === FEATURE: clusters + heatmap ===
export type RenderMode = 'normal' | 'clusters' | 'heatmap';

interface RenderModeState {
  mode: RenderMode;
  setMode: (m: RenderMode) => void;
}

export const useRenderModeStore = create<RenderModeState>((set) => ({
  mode: 'normal',
  setMode: (mode) => set({ mode }),
}));
// === END FEATURE: clusters + heatmap ===
