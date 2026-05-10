import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onClick: () => void;
  isOpen: boolean;
}

export function ChatLauncher({ onClick, isOpen }: Props) {
  const { t } = useTranslation();
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      aria-label={t('chat.title')}
      className="fixed bottom-6 end-6 z-40 group flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
    >
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 animate-ping opacity-25" />
      <Sparkles className="relative w-6 h-6 group-hover:rotate-12 transition-transform" />
    </button>
  );
}
