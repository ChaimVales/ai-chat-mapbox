# Reset User Feature

כפתור איפוס מלא - מוחק את כל הנתונים השמורים ב-localStorage ו-sessionStorage,
ואז טוען מחדש את העמוד. שימושי לדמו או להתחיל מאפס.

## מה נמחק
- היסטוריית שיחות
- סימניות
- מיקום
- הגדרות (theme, language, model, temp, system prompt)
- כל ה-stores ב-Zustand persist

## מה לא נמחק
- קבצי `.env` עם המפתחות
- הקוד עצמו

## איך להפעיל
ב-WelcomeScreen.tsx:
```tsx
import { ResetButton } from '../../features/reset-user/feature';
<ResetButton />
```

## איך להסיר
מחק תיקייה.
