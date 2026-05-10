# Thinking Display Feature

מציג סטטוס משתנה בזמן שה-AI עובד (במקום סתם 3 נקודות).

## איך זה עובד
React state עם interval שמחליף בין 4 הודעות כל 1.5 שניות.

## איך להפעיל
ב-`MessageList.tsx`:
```tsx
import { ThinkingIndicator } from '../../features/thinking-display/feature';
{isLoading && <ThinkingIndicator />}
```

## איך להסיר
מחק את התיקייה + השורות מ-MessageList.
