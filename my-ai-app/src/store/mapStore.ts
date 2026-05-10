import { create } from 'zustand';
import type { FeatureCollection } from '../types';

interface MapState {
  geo: FeatureCollection | null;
  setGeo: (geo: FeatureCollection | null) => void;
  clearGeo: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  geo: null,
  setGeo: (geo) => set({ geo }),
  clearGeo: () => set({ geo: null }),
}));
