/**
 * FEATURE: search-history
 * Search bar in HistorySidebar to filter conversations.
 *
 * Files this feature touches:
 *   - src/components/chat/HistorySidebar.tsx (render <SearchInput /> at top)
 */

import { Search } from 'lucide-react';
import { useState } from 'react';
import type { Conversation } from '../../types';

export function SearchInput({ onChange }: { onChange: (q: string) => void }) {
  const [q, setQ] = useState('');
  return (
    <div className="relative px-3 mb-2">
      <Search className="absolute top-2.5 start-5 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={q}
        onChange={(e) => { setQ(e.target.value); onChange(e.target.value); }}
        placeholder="חפש בשיחות..."
        className="w-full ps-8 pe-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export function filterConversations(conversations: Conversation[], query: string): Conversation[] {
  if (!query.trim()) return conversations;
  const q = query.toLowerCase();
  return conversations.filter((c) =>
    c.title.toLowerCase().includes(q) ||
    c.messages.some((m) => m.content.toLowerCase().includes(q))
  );
}
