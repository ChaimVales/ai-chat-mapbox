import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle.tsx';
import { LanguageToggle } from './LanguageToggle.tsx';
// === FEATURE: custom-themes ===
import { ThemePicker } from '../../features/custom-themes/feature';
// === END FEATURE: custom-themes ===
// === FEATURE: example-prompts ===
import { ExamplePrompts } from '../../features/example-prompts/feature';
// === END FEATURE: example-prompts ===

interface Props {
  onPromptSelect?: () => void;
}

export function WelcomeScreen({ onPromptSelect }: Props = {}) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute top-4 end-4 flex gap-2 items-center">
        <LanguageToggle />
        <ThemeToggle />
        {/* === FEATURE: custom-themes === */}
        <ThemePicker />
        {/* === END FEATURE: custom-themes === */}
      </div>

      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl">
        <Sparkles className="w-12 h-12 text-white" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
        {t('welcome.title')}
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mb-6">
        {t('welcome.subtitle')}
      </p>

      {/* === FEATURE: example-prompts === */}
      <ExamplePrompts onSelect={onPromptSelect} />
      {/* === END FEATURE: example-prompts === */}

      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 animate-bounce mt-8">
        <ArrowDown className="w-5 h-5" />
        <span>{t('welcome.cta')}</span>
      </div>
    </div>
  );
}
