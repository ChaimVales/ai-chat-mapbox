/**
 * FEATURE: edit-message
 * Edit your previous message and re-run the conversation from there.
 *
 * Files this feature touches:
 *   - src/components/chat/MessageBubble.tsx (add <EditButton /> on user messages)
 *   - src/store/chatStore.ts (add editMessage action - see README)
 */

import { Pencil, Check, X } from 'lucide-react';
import { useState } from 'react';
import { useChatStore } from '../../store/chatStore';
import type { ChatMessage } from '../../types';

export function EditButton({ message }: { message: ChatMessage }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(message.content);
  const editMessage = useChatStore((s) => s.editMessage);

  if (message.role !== 'user') return null;

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="inline-flex items-center text-xs text-slate-400 hover:text-blue-500 ms-2"
        aria-label="Edit"
      >
        <Pencil className="w-3 h-3" />
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1 mt-1">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        className="text-sm bg-slate-100 dark:bg-slate-700 rounded p-1 text-slate-900 dark:text-slate-100"
      />
      <div className="flex gap-1">
        <button onClick={() => { editMessage?.(message.id, text); setEditing(false); }} className="text-green-500">
          <Check className="w-4 h-4" />
        </button>
        <button onClick={() => { setText(message.content); setEditing(false); }} className="text-red-500">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
