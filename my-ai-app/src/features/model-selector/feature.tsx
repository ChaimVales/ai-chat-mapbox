/**
 * FEATURE: model-selector
 * Dropdown to choose which Gemini model to use.
 *
 * Files this feature touches:
 *   - server/src/services/geminiService.ts (accept model from request body)
 *   - src/services/chatService.ts (pass model in body)
 *   - src/store/chatStore.ts (track current model)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MODELS = [
  { id: 'gemini-2.5-flash', label: 'Flash 2.5 (מהיר)' },
  { id: 'gemini-2.5-flash-lite', label: 'Flash Lite (חסכוני)' },
  { id: 'gemini-2.5-pro', label: 'Pro 2.5 (איכותי)' },
];

interface ModelState {
  model: string;
  setModel: (m: string) => void;
}

export const useModelStore = create<ModelState>()(
  persist(
    (set) => ({
      model: 'gemini-2.5-flash',
      setModel: (model) => set({ model }),
    }),
    { name: 'gemini-model-v1' },
  ),
);

export function ModelSelector() {
  const { model, setModel } = useModelStore();
  return (
    <select
      value={model}
      onChange={(e) => setModel(e.target.value)}
      className="text-xs bg-slate-100 dark:bg-slate-700 rounded px-2 py-1"
    >
      {MODELS.map((m) => (
        <option key={m.id} value={m.id}>{m.label}</option>
      ))}
    </select>
  );
}
