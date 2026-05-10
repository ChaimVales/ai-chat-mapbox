/**
 * FEATURE: example-prompts
 * Suggested prompts shown on welcome screen.
 * Click → fills the chat input.
 *
 * Files this feature touches:
 *   - src/components/welcome/WelcomeScreen.tsx (render <ExamplePrompts />)
 */

import { MapPin, Table2, Route, Code2 } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useHistoryStore } from '../../store/historyStore';

interface Example {
  icon: React.ReactNode;
  label: string;
  prompt: string;
}

const EXAMPLES: Example[] = [
  {
    icon: <MapPin className="w-4 h-4" />,
    label: 'מיקום',
    prompt: 'איפה נמצאת חיפה? תן לי GeoJSON Point.',
  },
  {
    icon: <Route className="w-4 h-4" />,
    label: 'מסלול',
    prompt: 'תכנן מסלול עם 5 נקודות מתל אביב לאילת כ-GeoJSON LineString.',
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: 'אזור',
    prompt: 'תן לי GeoJSON Polygon של גבולות גוש דן.',
  },
  {
    icon: <Table2 className="w-4 h-4" />,
    label: 'טבלת ערים',
    prompt: 'תן לי טבלה של 5 הערים הגדולות בישראל עם אוכלוסייה ושטח.',
  },
  {
    icon: <Code2 className="w-4 h-4" />,
    label: 'קוד',
    prompt: 'תן לי דוגמת קוד Python שמחשבת מרחק haversine בין שתי קואורדינטות.',
  },
];

interface Props {
  onSelect?: () => void;
}

export function ExamplePrompts({ onSelect }: Props) {
  const sendMessage = useChatStore((s) => s.sendMessage);
  const saveConversation = useHistoryStore((s) => s.saveConversation);

  const handleClick = async (prompt: string) => {
    onSelect?.();
    await sendMessage(prompt);
    const msgs = useChatStore.getState().messages;
    if (msgs.length > 0) saveConversation(msgs);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-2xl mt-6">
      {EXAMPLES.map((ex) => (
        <button
          key={ex.label}
          onClick={() => handleClick(ex.prompt)}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg shadow text-sm transition-colors"
          title={ex.prompt}
        >
          {ex.icon}
          <span>{ex.label}</span>
        </button>
      ))}
    </div>
  );
}
