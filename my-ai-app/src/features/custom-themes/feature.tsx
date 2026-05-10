/**
 * FEATURE: custom-themes
 * Pick a custom accent color for the UI (beyond just dark/light).
 *
 * Files: src/index.css (use --accent CSS variable for primary color)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';
import { Palette } from 'lucide-react';
import { useState } from 'react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

interface ThemeColorState {
  accent: string;
  setAccent: (a: string) => void;
}

export const useAccentStore = create<ThemeColorState>()(
  persist(
    (set) => ({
      accent: '#3b82f6',
      setAccent: (accent) => set({ accent }),
    }),
    { name: 'accent-color-v1' },
  ),
);

export function ThemePicker() {
  const { accent, setAccent } = useAccentStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-slate-200">
        <Palette className="w-4 h-4" style={{ color: accent }} />
      </button>
      {open && (
        <div className="absolute top-10 end-0 bg-white dark:bg-slate-800 rounded-lg shadow p-2 flex gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => { setAccent(c); setOpen(false); }}
              className="w-6 h-6 rounded-full border-2 border-white shadow"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
