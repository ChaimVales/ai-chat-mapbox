import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ColorState {
    geoColor: string;
    setColor: (color: string) => void;
}

export const useColorStore = create<ColorState>()(
    persist(
        (set) => ({
            geoColor: '#3b82f6',
            setColor: (color) => set({ geoColor: color }),
        }),
        { name: 'geo-color-v1' },
    ),
);