import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18next from 'i18next';

export type Theme = 'light' | 'dark';
export type Language = 'he' | 'en';

interface ThemeState {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'en',

      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(next);
      },

      setLanguage: (language) => {
        set({ language });
        applyLanguage(language);
        i18next.changeLanguage(language);
      },
    }),
    {
      name: 'app-prefs-v1',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
          applyLanguage(state.language);
        }
      },
    },
  ),
);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

function applyLanguage(lang: Language) {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'he' ? 'rtl' : 'ltr';
}
