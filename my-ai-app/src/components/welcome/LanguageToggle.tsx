import { Globe } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export function LanguageToggle() {
  const { language, setLanguage } = useThemeStore();

  const next = language === 'he' ? 'en' : 'he';
  const label = language === 'he' ? 'EN' : 'עב';

  return (
    <button
      onClick={() => setLanguage(next)}
      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      title={`Switch to ${next}`}
      aria-label={`Switch to ${next}`}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
