import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { useChatStore } from '../../store/chatStore.ts';
import { MessageBubble } from './MessageBubble.tsx';
import { TypingIndicator } from './TypingIndicator.tsx';
// === FEATURE: thinking-display ===
import { ThinkingIndicator } from '../../features/thinking-display/feature';
// === END FEATURE: thinking-display ===

export function MessageList() {
  const { t } = useTranslation();
  const messages = useChatStore((s) => s.messages);
  const isLoading = useChatStore((s) => s.isLoading);
  const error = useChatStore((s) => s.error);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll לתחתית כשמגיע תוכן חדש
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isLoading]);

  // מצב ריק - הודעת welcome
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-500 dark:text-slate-400">
        <Sparkles className="w-12 h-12 mb-4 text-blue-500" />
        <p>{t('chat.placeholder')}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && <ThinkingIndicator />}
      {/* {isLoading && <TypingIndicator />} */}

      {error && <div className="text-sm text-red-600 dark:text-red-400 px-4 py-2">{error}</div>}

      <div ref={bottomRef} />
    </div>
  );
}
