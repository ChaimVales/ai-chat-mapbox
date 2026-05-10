/**
 * FEATURE: system-prompt
 * Custom system instruction (persona) for the AI.
 *
 * Files this feature touches:
 *   - src/store/chatStore.ts (prepend system message to conversation)
 *   - Optional: server already supports system messages
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useState } from 'react';
import { Settings } from 'lucide-react';

interface PromptState {
  systemPrompt: string;
  setPrompt: (p: string) => void;
}

export const useSystemPromptStore = create<PromptState>()(
  persist(
    (set) => ({
      systemPrompt: '',
      setPrompt: (systemPrompt) => set({ systemPrompt }),
    }),
    { name: 'system-prompt-v1' },
  ),
);

export function SystemPromptEditor() {
  const { systemPrompt, setPrompt } = useSystemPromptStore();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-slate-200">
        <Settings className="w-4 h-4" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 w-96" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold mb-2">System Prompt</h3>
            <textarea
              value={systemPrompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              placeholder="לדוגמה: אתה מומחה למפות. ענה בקצרה."
              className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded text-sm"
            />
            <button onClick={() => setOpen(false)} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">סגור</button>
          </div>
        </div>
      )}
    </>
  );
}
