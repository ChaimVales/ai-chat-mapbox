import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Square } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useHistoryStore } from '../../store/historyStore';
// === FEATURE: voice-input ===
import { VoiceButton } from '../../features/voice-input/feature';
// === END FEATURE: voice-input ===
// === FEATURE: token-counter ===
import { TokenCounter } from '../../features/token-counter/feature';
// === END FEATURE: token-counter ===
// === FEATURE: image-upload ===
import { ImageButton } from '../../features/image-upload/feature';
// === END FEATURE: image-upload ===

export function MessageInput() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  // === FEATURE: image-upload ===
  const [imageBase64, setImageBase64] = useState<string>('');
  // === END FEATURE: image-upload ===
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = useChatStore((s) => s.sendMessage);
  const stopGeneration = useChatStore((s) => s.stopGeneration);
  const isLoading = useChatStore((s) => s.isLoading);
  const saveConversation = useHistoryStore((s) => s.saveConversation);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 128)}px`;
  }, [text]);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    const value = text.trim();
    if ((!value && !imageBase64) || isLoading) return;

    setText('');
    const img = imageBase64;
    setImageBase64('');
    await sendMessage(value || '(image)', img || undefined);

    const updatedMessages = useChatStore.getState().messages;
    if (updatedMessages.length > 0) saveConversation(updatedMessages);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chat.placeholder')}
          disabled={isLoading}
          rows={1}
          className="flex-1 resize-none bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 max-h-32 text-base"
        />

        {/* === FEATURE: voice-input === */}
        <VoiceButton onTranscript={(t) => setText((prev) => prev + ' ' + t)} />
        {/* === END FEATURE: voice-input === */}

        {/* === FEATURE: image-upload === */}
        <ImageButton onSelect={setImageBase64} />
        {/* === END FEATURE: image-upload === */}

        {isLoading ? (
          <button
            type="button"
            onClick={stopGeneration}
            aria-label={t('chat.stop')}
            className="p-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            <Square className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!text.trim() && !imageBase64}
            aria-label={t('chat.send')}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* === FEATURE: token-counter === */}
      <TokenCounter text={text} />
      {/* === END FEATURE: token-counter === */}
    </div>
  );
}
