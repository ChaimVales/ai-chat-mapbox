/**
 * FEATURE: resizable-panels
 * Drag to resize the chat/map split.
 *
 * Files: src/components/layout/SplitView.tsx (replace fixed widths with resizable)
 */

import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Props {
  chat: ReactNode;
  map: ReactNode;
}

export function ResizableSplitView({ chat, map }: Props) {
  const [chatWidth, setChatWidth] = useState(25); // percentage
  const dragging = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const w = (e.clientX / window.innerWidth) * 100;
      setChatWidth(Math.max(15, Math.min(70, w)));
    };
    const onUp = () => { dragging.current = false; document.body.style.cursor = ''; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  return (
    <div className="flex w-full h-screen relative">
      <div style={{ width: `${chatWidth}%` }} className="border-e border-slate-200 dark:border-slate-700">
        {chat}
      </div>
      <div
        onMouseDown={() => { dragging.current = true; document.body.style.cursor = 'col-resize'; }}
        className="w-1 cursor-col-resize bg-slate-300 hover:bg-blue-500 transition-colors"
      />
      <div className="flex-1">{map}</div>
    </div>
  );
}
