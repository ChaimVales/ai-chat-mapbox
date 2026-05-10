/**
 * FEATURE: example-prompts
 * Suggested prompts shown on welcome screen.
 * Click → fills the chat input + opens chat.
 *
 * Files this feature touches:
 *   - src/components/welcome/WelcomeScreen.tsx (render <ExamplePrompts />)
 */

import { MapPin, Table2, Route, Code2, Pizza, Navigation, Sparkles } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useHistoryStore } from '../../store/historyStore';
import { useUserLocationStore } from '../user-location/feature';

interface Example {
  icon: React.ReactNode;
  label: string;
  prompt: string;
  needsLocation?: boolean;
}

const EXAMPLES: Example[] = [
  {
    icon: <Sparkles className="w-4 h-4" />,
    label: 'כל הפורמטים',
    prompt: `תן לי דוגמה מלאה של כל סוגי העיצוב ב-Markdown שאתה יודע לעשות. כלול:

# כותרת H1
## כותרת H2
### כותרת H3

טקסט רגיל עם **טקסט מודגש** ועם *טקסט נטוי* ועם ~~טקסט מחוק~~.

רשימה עם בולטים:
- פריט ראשון
- פריט שני
- פריט שלישי

רשימה ממוספרת:
1. צעד אחד
2. צעד שני
3. צעד שלישי

טבלה:
| עמודה 1 | עמודה 2 | עמודה 3 |
|---------|---------|---------|
| ערך A   | ערך B   | ערך C   |
| ערך D   | ערך E   | ערך F   |

קוד inline: \`const x = 5\`

בלוק קוד:
\`\`\`javascript
function hello() {
  console.log("שלום עולם");
}
\`\`\`

ציטוט:
> זאת דוגמה לציטוט עם רעיון חכם

קישור: [GitHub שלי](https://github.com/ChaimVales)

קו מפריד:
---

זה הסוף.`,
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: 'מיקום',
    prompt: 'איפה נמצאת חיפה? תן לי GeoJSON Point.',
  },
  {
    icon: <Pizza className="w-4 h-4" />,
    label: 'פיצה קרובה',
    prompt: 'איפה החנות פיצה הקרובה אליי? תן לי GeoJSON Point של 3 פיצריות באזור שלי.',
    needsLocation: true,
  },
  {
    icon: <Navigation className="w-4 h-4" />,
    label: 'איך מגיעים?',
    prompt: 'איך אני מגיע לרחוב רוטשילד ברעננה? תן לי GeoJSON LineString של המסלול.',
    needsLocation: true,
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
  const hasLocation = useUserLocationStore((s) => s.hasLocation());

  const handleClick = async (ex: Example) => {
    if (ex.needsLocation && !hasLocation) {
      alert('צריך לשתף מיקום קודם (כפתור "שתף מיקום" למעלה)');
      return;
    }
    onSelect?.();
    await sendMessage(ex.prompt);
    const msgs = useChatStore.getState().messages;
    if (msgs.length > 0) saveConversation(msgs);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-2xl mt-6">
      {EXAMPLES.map((ex) => (
        <button
          key={ex.label}
          onClick={() => handleClick(ex)}
          disabled={ex.needsLocation && !hasLocation}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg shadow text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          title={ex.needsLocation && !hasLocation ? 'דורש שיתוף מיקום' : ex.prompt}
        >
          {ex.icon}
          <span>{ex.label}</span>
        </button>
      ))}
    </div>
  );
}
