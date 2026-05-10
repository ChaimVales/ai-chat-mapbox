import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import { User, Sparkles, AlertCircle } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { CopyButton } from '../../features/copy-message/feature';
// === FEATURE: voice-output ===
import { SpeakButton } from '../../features/voice-output/feature';
// === END FEATURE: voice-output ===
// === FEATURE: regenerate ===
import { RegenerateButton } from '../../features/regenerate/feature';
// === END FEATURE: regenerate ===
// === FEATURE: edit-message ===
import { EditButton } from '../../features/edit-message/feature';
// === END FEATURE: edit-message ===
// === FEATURE: export-excel ===
import { ExcelButton } from '../../features/export-excel/feature';
// === END FEATURE: export-excel ===

interface Props {
  message: ChatMessage;
}

/**
 * Detect text direction based on first strong RTL/LTR character.
 * Returns 'rtl' for Hebrew/Arabic content, 'ltr' otherwise.
 */
function detectDir(text: string): 'rtl' | 'ltr' {
  const stripped = text.replace(/[\s\d\p{P}]/gu, '');
  const rtlMatch = stripped.match(/[֐-׿؀-ۿ܀-߿]/);
  const ltrMatch = stripped.match(/[A-Za-zÀ-ɏ]/);
  if (!rtlMatch && !ltrMatch) return 'ltr';
  if (!rtlMatch) return 'ltr';
  if (!ltrMatch) return 'rtl';
  return rtlMatch.index! < ltrMatch.index! ? 'rtl' : 'ltr';
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const hasError = !!message.error;
  const dir = detectDir(message.content);

  return (
    <div className={clsx('flex gap-2 mb-4', { 'justify-end': isUser, 'justify-start': !isUser })}>
      {isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}

      <div
        dir={dir}
        className={clsx('max-w-[80%] rounded-2xl px-4 py-2.5 break-words', {
          'bg-blue-600 text-white rounded-ee-sm': isUser,
          'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-es-sm':
            isAssistant && !hasError,
          'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200':
            hasError,
        })}
      >
        {hasError && (
          <div className="flex items-center gap-1 mb-1 text-sm font-medium">
            <AlertCircle className="w-4 h-4" />
            <span>Error</span>
          </div>
        )}

        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-1">
          {isAssistant && <CopyButton text={message.content} />}
          {isAssistant && <SpeakButton text={message.content} />}
          {isAssistant && <RegenerateButton />}
          {/* === FEATURE: export-excel === */}
          {isAssistant && <ExcelButton text={message.content} />}
          {/* === END FEATURE: export-excel === */}
          {isUser && <EditButton message={message} />}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
