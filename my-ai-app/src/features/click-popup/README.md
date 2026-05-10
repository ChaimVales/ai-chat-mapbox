# Click Popup Feature
לחיצה על נקודה/קו/פוליגון → מציג popup עם הפרטים.

## איך להפעיל
ב-GeoLayer.tsx, אחרי שהוספת את ה-layers:
```ts
import { attachClickPopup } from '../../features/click-popup/feature';
const cleanup = attachClickPopup(map);
// ב-cleanup function: cleanup();
```

## איך להסיר
מחק תיקייה.
