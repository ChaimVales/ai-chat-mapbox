# Token Counter Feature

הערכה גסה של כמות טוקנים בקלט + שיחה. ההערכה: 4 תווים = טוקן 1.

## איך להפעיל
ב-MessageInput.tsx, מתחת ל-textarea:
```tsx
import { TokenCounter } from '../../features/token-counter/feature';
<TokenCounter text={text} />
```

## איך להסיר
מחק תיקייה + הסר את ה-import.
