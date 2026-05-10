/**
 * FEATURE: help
 * Help button (always visible) - opens modal explaining the app.
 *
 * Files this feature touches:
 *   - src/components/welcome/WelcomeScreen.tsx (add <HelpButton />)
 *   - Optional: src/App.tsx for global help button
 */

import { HelpCircle, X } from 'lucide-react';
import { useState } from 'react';

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
        aria-label="עזרה"
        title="איך להשתמש?"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-2xl max-h-[85vh] overflow-y-auto relative"
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 end-3 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-500" />
              איך להשתמש באתר?
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <section>
                <h3 className="font-semibold text-lg mb-1">💬 צ'אט עם AI</h3>
                <p>
                  לחץ על הכפתור הצף בפינה (⚡ סמל ניצוצות). שאל כל שאלה - האסיסטנט תומך בעברית
                  ובאנגלית.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-1">🗺️ הצגה על מפה</h3>
                <p>שאל על מקום, גבול או מסלול - והתשובה תופיע אוטומטית על המפה. דוגמאות:</p>
                <ul className="list-disc pe-5 mt-1 space-y-1 text-sm">
                  <li>"איפה תל אביב?"</li>
                  <li>"תכנן מסלול מתל אביב לאילת"</li>
                  <li>"גבולות גוש דן"</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-1">📍 מיקום נוכחי + ניווט</h3>
                <p>
                  לחץ <b>"שתף מיקום"</b> במסך הראשי. אז תוכל:
                </p>
                <ul className="list-disc pe-5 mt-1 space-y-1 text-sm">
                  <li>לחפש קרוב אליך (פיצה, קפה, כספומט) - כפתור "קרוב אליי" על המפה</li>
                  <li>לקבל מסלול לכתובת - כפתור "ניווט" על המפה</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-1">📊 הורדת תשובה</h3>
                <p>תחת כל הודעת AI יש כפתורים:</p>
                <ul className="list-disc pe-5 mt-1 space-y-1 text-sm">
                  <li>📋 העתק - מעתיק את הטקסט</li>
                  <li>🔊 השמע - מקריא בקול</li>
                  <li>🔄 שאל שוב - מבקש תשובה אחרת</li>
                  <li>📊 Excel - מוריד טבלאות כקובץ Excel</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-1">⚙️ הגדרות מתקדמות</h3>
                <p>בכותרת הצ'אט:</p>
                <ul className="list-disc pe-5 mt-1 space-y-1 text-sm">
                  <li>בחירת מודל (Flash מהיר / Pro איכותי / Lite חסכוני)</li>
                  <li>סליידר Temperature (יציב ↔ יצירתי)</li>
                  <li>System Prompt - אישיות מותאמת ל-AI</li>
                  <li>📥 Export - הורדת השיחה כ-Markdown</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-1">🌗 מצבי תצוגה</h3>
                <p>למעלה מימין:</p>
                <ul className="list-disc pe-5 mt-1 space-y-1 text-sm">
                  <li>🌐 החלפת שפה (עברית/אנגלית)</li>
                  <li>☀️/🌙 מצב יום/לילה</li>
                  <li>🎨 בחירת צבע ראשי</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-1">⌨️ קיצורי מקלדת</h3>
                <ul className="list-disc pe-5 mt-1 space-y-1 text-sm">
                  <li>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">Ctrl+K</kbd> - מעבר לשדה הקלט
                  </li>
                  <li>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">Ctrl+/</kbd> - הצג עזרה
                  </li>
                  <li>
                    <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">Esc</kbd> - סגור חלונות
                  </li>
                </ul>
              </section>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              הבנתי, סגור
            </button>
          </div>
        </div>
      )}
    </>
  );
}
