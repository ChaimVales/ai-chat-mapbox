# Routing Feature

מסלול ניווט בין שתי נקודות.
- מאיפה: המיקום של המשתמש (אם יש user-location) או כתובת
- לאן: כתובת
- בחירה: רכב או הליכה

מציג על המפה:
- 🟢 נקודת התחלה
- 🏁 נקודת סיום
- קו המסלול
- מרחק + זמן נסיעה

## איך להפעיל
ב-MapView.tsx:
```tsx
import { RoutingButton } from '../../features/routing/feature';
<RoutingButton />
```

## איך להסיר
מחק תיקייה.
