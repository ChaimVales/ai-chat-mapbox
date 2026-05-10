/**
 * FEATURE: onboarding-tour
 * Shows first-time visitor tour with 3-4 tooltips highlighting features.
 *
 * Files: src/App.tsx (mount <OnboardingTour />)
 */

import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

const STEPS = [
  { title: 'ברוכים הבאים! 👋', text: 'זה צ\'אטבוט עם בינה מלאכותית ומפה.' },
  { title: 'שאל שאלות', text: 'לחץ על הכפתור הצף בפינה התחתונה כדי לפתוח צ\'אט.' },
  { title: 'בקש מיקומים', text: 'תוכל לבקש קואורדינטות ולראות אותן על המפה.' },
  { title: 'בהצלחה! 🚀', text: 'יש לך עוד שאלות? תפתח את ההגדרות בפינה.' },
];

export function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('onboarding-seen');
    if (!seen) setVisible(true);
  }, []);

  const close = () => {
    localStorage.setItem('onboarding-seen', '1');
    setVisible(false);
  };

  if (!visible) return null;
  const current = STEPS[step];

  return (
    <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4" onClick={close}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={close} className="absolute top-2 end-2"><X className="w-4 h-4" /></button>
        <h3 className="text-xl font-bold mb-2">{current.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{current.text}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">{step + 1} / {STEPS.length}</span>
          <button
            onClick={() => step + 1 >= STEPS.length ? close() : setStep(step + 1)}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded"
          >
            {step + 1 >= STEPS.length ? 'סיים' : 'הבא'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
