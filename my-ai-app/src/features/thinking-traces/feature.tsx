/**
 * FEATURE: thinking-traces
 * In-chat thinking display ABOVE the AI answer.
 *
 * Design goals (per user request):
 *   - Show ONLY ONE thought at a time (replaces, no stacking, no expand)
 *   - SLOWER cycling between thoughts (5 seconds each) so it's readable
 *   - Visual style clearly DIFFERENT from answer bubbles:
 *       * amber dashed border + amber background tint
 *       * italic, lighter text
 *       * "🧠 AI חושב..." label so users know this is reasoning, not answer
 *       * subtle progress bar showing position in the thought sequence
 *   - All thoughts (full list) are visible in the side panel (agent-activity).
 *     Here in chat we keep it minimal — just the *current* thought.
 *
 * Files this feature touches:
 *   - src/components/chat/MessageBubble.tsx (renders ABOVE the answer)
 */

import { useState, useEffect } from 'react';
import { Brain, Loader2 } from 'lucide-react';

/** Extracts thinking blocks from text. */
export function extractThinking(text: string): { thoughts: string[]; answer: string } {
  const thoughts: string[] = [];
  let cleanedText = text;

  const patterns = [
    /<think>([\s\S]*?)<\/think>/gi,
    /<thinking>([\s\S]*?)<\/thinking>/gi,
    /\[Thinking\]([\s\S]*?)\[\/Thinking\]/gi,
  ];

  for (const pattern of patterns) {
    const matches = [...text.matchAll(pattern)];
    for (const m of matches) {
      thoughts.push(m[1].trim());
    }
    cleanedText = cleanedText.replace(pattern, '').trim();
  }

  if (thoughts.length === 1) {
    const single = thoughts[0];
    const lines = single.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1) {
      return { thoughts: lines, answer: cleanedText };
    }
  }

  return { thoughts, answer: cleanedText };
}

interface Props {
  thoughts: string[];
  isLive?: boolean;
}

/** How long each thought stays on screen before cycling to the next (ms). */
const THOUGHT_DURATION_MS = 5000;

export function ThinkingTraces({ thoughts, isLive = false }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Slow cycle through thoughts so each one is readable.
  useEffect(() => {
    if (!isLive || thoughts.length <= 1) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % thoughts.length);
    }, THOUGHT_DURATION_MS);
    return () => clearInterval(id);
  }, [isLive, thoughts.length]);

  // When live finishes, show the LAST thought (final reasoning step) as the static view.
  const displayIdx = isLive ? activeIdx : Math.max(0, thoughts.length - 1);

  if (thoughts.length === 0) return null;

  const totalSteps = thoughts.length;
  const currentStep = displayIdx + 1;
  const showText = thoughts[displayIdx];
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-3 w-full max-w-full" dir="rtl">
      {/* Distinct "thinking" container — italic, dashed amber, NOT bubble-style */}
      <div className="px-4 py-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-dashed border-amber-300 dark:border-amber-700/60">
        {/* Header: clear "thinking" label so it's not confused with the answer */}
        <div className="flex items-center gap-2 mb-2">
          {isLive ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600 flex-shrink-0" strokeWidth={2.5} />
          ) : (
            <Brain className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          )}
          <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
            {isLive ? 'AI חושב' : 'תהליך חשיבה'}
          </span>
          <span className="text-[11px] font-mono text-amber-600/70 dark:text-amber-400/70 ms-auto">
            {currentStep}/{totalSteps}
          </span>
        </div>

        {/* The current thought — replaces previous thanks to `key={displayIdx}` */}
        <div
          key={displayIdx}
          className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed animate-fade-in"
        >
          {showText}
        </div>

        {/* Subtle progress bar so user knows there are more thoughts coming */}
        {totalSteps > 1 && (
          <div className="mt-2.5 h-0.5 bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-pink-400 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
