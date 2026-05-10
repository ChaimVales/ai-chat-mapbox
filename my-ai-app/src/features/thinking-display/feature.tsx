/**
 * FEATURE: thinking-display
 * Shows what the AI is doing right now (analyzing, generating, etc).
 *
 * Files this feature touches:
 *   - src/components/chat/MessageList.tsx (render <ThinkingIndicator/> when loading)
 *
 * To remove: delete this folder + remove import in MessageList.
 */

import { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';

const STAGES = [
  '🔍 מנתח את השאלה...',
  '💭 חושב על תשובה...',
  '✨ מנסח...',
  '📝 כותב...',
];

export function ThinkingIndicator() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
        <Brain className="w-4 h-4 text-white" />
      </div>
      <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-2.5">
        <p className="text-sm text-slate-600 dark:text-slate-300">{STAGES[stage]}</p>
      </div>
    </div>
  );
}
