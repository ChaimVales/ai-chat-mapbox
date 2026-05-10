/**
 * FEATURE: token-counter
 * Estimates token count of input + total conversation.
 *
 * Files this feature touches:
 *   - src/components/chat/MessageInput.tsx (render <TokenCounter text={text} />)
 */

import { useChatStore } from '../../store/chatStore';

// Rough estimation: 1 token ~= 4 chars (varies by language)
function estimate(text: string): number {
  return Math.ceil(text.length / 4);
}

export function TokenCounter({ text }: { text: string }) {
  const messages = useChatStore((s) => s.messages);
  const inputTokens = estimate(text);
  const totalTokens = messages.reduce((sum, m) => sum + estimate(m.content), 0) + inputTokens;

  return (
    <div className="text-xs text-slate-400 mt-1 px-2">
      Input: ~{inputTokens} | Total: ~{totalTokens} tokens
    </div>
  );
}
