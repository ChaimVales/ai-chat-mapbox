import { create } from 'zustand';

interface LayerState {
    showPoints: boolean;
    showLines: boolean;
    showPolygons: boolean;
    togglePoints: () => void;
    toggleLines: () => void;
    togglePolygons: () => void;
}

export const useLayerStore = create<LayerState>((set) => ({
    showPoints: true,
    showLines: true,
    showPolygons: true,
    togglePoints: () => set((s) => ({ showPoints: !s.showPoints })),
    toggleLines: () => set((s) => ({ showLines: !s.showLines })),
    togglePolygons: () => set((s) => ({ showPolygons: !s.showPolygons })),
}));