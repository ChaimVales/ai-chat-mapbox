/**
 * FEATURE: temperature-slider
 * Slider to control AI creativity (0 = deterministic, 1 = creative).
 *
 * Files this feature touches:
 *   - server/src/services/geminiService.ts (accept temperature)
 *   - src/services/chatService.ts (pass temperature)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TempState {
  temperature: number;
  setTemperature: (t: number) => void;
}

export const useTemperatureStore = create<TempState>()(
  persist(
    (set) => ({
      temperature: 0.7,
      setTemperature: (temperature) => set({ temperature }),
    }),
    { name: 'temperature-v1' },
  ),
);

export function TemperatureSlider() {
  const { temperature, setTemperature } = useTemperatureStore();
  return (
    <div className="flex items-center gap-2 text-xs">
      <span>🧊</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={temperature}
        onChange={(e) => setTemperature(Number(e.target.value))}
        className="w-20"
      />
      <span>🔥</span>
      <span className="font-mono w-8">{temperature.toFixed(1)}</span>
    </div>
  );
}
