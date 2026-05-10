/**
 * FEATURE: regenerate
 * Button to regenerate the last AI response (asks again with same input).
 *
 * Files this feature touches:
 *   - src/store/chatStore.ts (add regenerate action)
 *   - src/components/chat/MessageBubble.tsx (add <RegenerateButton /> on assistant messages)
 *
 * To remove: delete folder + remove import + remove regenerate from chatStore.
 */

import { RotateCw } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

export function RegenerateButton() {
  const messages = useChatStore((s) => s.messages);
  const isLoading = useChatStore((s) => s.isLoading);
  const regenerate = useChatStore((s) => s.regenerate);

  const lastIsAssistant = messages.length > 0 && messages[messages.length - 1].role === 'assistant';
  if (!lastIsAssistant || isLoading) return null;

  return (
    <button
      onClick={regenerate}
      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-500 ms-2"
      aria-label="Regenerate"
    >
      <RotateCw className="w-3 h-3" />
      Regenerate
    </button>
  );
}
