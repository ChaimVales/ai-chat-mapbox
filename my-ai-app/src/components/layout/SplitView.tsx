import type { ReactNode } from 'react';

interface Props {
  chat: ReactNode;
  map: ReactNode;
  active: boolean; // האם להציג את חלוקת המסך
}

/**
 * חלוקת מסך 25/75:
 *  - active=true: chat = 25%, map = 75%
 *  - active=false: רק chat (full screen)
 */
export function SplitView({ chat, map, active }: Props) {
  if (!active) return <div className="w-full h-screen">{chat}</div>;

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      {/* Mobile: chat 40% top, map 60% bottom */}
      {/* Desktop: chat 25% start, map 75% end */}
      <div className="h-2/5 lg:h-full lg:w-1/4 lg:min-w-[320px] border-b lg:border-b-0 lg:border-e border-slate-200 dark:border-slate-700">
        {chat}
      </div>
      <div className="flex-1">{map}</div>
    </div>
  );
}
