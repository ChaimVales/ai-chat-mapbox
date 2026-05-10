/**
 * FEATURE: keyboard-shortcuts
 * Global keyboard shortcuts (Ctrl+K to focus chat, Ctrl+/ for help, etc).
 *
 * Files: src/App.tsx (mount <KeyboardShortcuts />)
 */

import { useEffect, useState } from 'react';

const SHORTCUTS = [
  { key: 'Ctrl+K', desc: 'פתח שדה הקלט' },
  { key: 'Ctrl+/', desc: 'הצג עזרה' },
  { key: 'Esc', desc: 'סגור חלונות' },
];

export function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLTextAreaElement>('textarea')?.focus();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowHelp((s) => !s);
      } else if (e.key === 'Escape') {
        setShowHelp(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 flex items-center justify-center" onClick={() => setShowHelp(false)}>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-80" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-semibold mb-3">קיצורי מקלדת</h3>
        {SHORTCUTS.map((s) => (
          <div key={s.key} className="flex justify-between text-sm mb-2">
            <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded font-mono">{s.key}</kbd>
            <span>{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
