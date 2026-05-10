/**
 * FEATURE: reset-user
 * "Reset" button - clears ALL localStorage (history, theme, location, settings)
 * and reloads the page. Useful for demos or starting fresh.
 *
 * Files this feature touches:
 *   - src/components/welcome/WelcomeScreen.tsx (add <ResetButton />)
 *   - Optional: src/components/chat/ChatWindow.tsx
 */

import { Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function ResetButton() {
  const [confirm, setConfirm] = useState(false);

  const handleReset = () => {
    // Clear all localStorage
    localStorage.clear();
    // Clear sessionStorage too
    sessionStorage.clear();
    // Reload the page to reset all state
    window.location.reload();
  };

  if (!confirm) {
    return (
      <button
        onClick={() => setConfirm(true)}
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-600 hover:text-red-600 dark:text-slate-300"
        title="איפוס מלא (מוחק היסטוריה והגדרות)"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4" onClick={() => setConfirm(false)}>
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
          <h3 className="text-lg font-bold">איפוס מלא?</h3>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
          הפעולה הזאת תמחק את כל הנתונים השמורים בדפדפן:
        </p>
        <ul className="text-sm text-slate-600 dark:text-slate-300 mb-4 list-disc pe-5 space-y-1">
          <li>היסטוריית שיחות</li>
          <li>סימניות מפה</li>
          <li>מיקום שמור</li>
          <li>הגדרות (theme, language, model, temperature)</li>
          <li>System prompt מותאם</li>
        </ul>
        <p className="text-xs text-slate-500 mb-4">המפתחות ב-.env לא יושפעו.</p>

        <div className="flex gap-2">
          <button
            onClick={() => setConfirm(false)}
            className="flex-1 px-4 py-2 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300"
          >
            ביטול
          </button>
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            כן, אפס הכל
          </button>
        </div>
      </div>
    </div>
  );
}
