# User Location Feature

מבקש את המיקום הגיאוגרפי של המשתמש (geolocation) ושומר ב-localStorage.
משמש בפיצ'רים אחרים: `nearby-poi`, `routing`, וגם system-prompt.

## איך להפעיל
ב-WelcomeScreen.tsx (או Header):
```tsx
import { LocationButton } from '../../features/user-location/feature';
<LocationButton />
```

ב-chatStore.ts (אופציונלי - להוסיף ל-context של AI):
```tsx
import { useUserLocationStore } from '../features/user-location/feature';
const loc = useUserLocationStore.getState();
if (loc.hasLocation()) {
  systemPrompt += `\n\nמיקום נוכחי של המשתמש: ${loc.city} (${loc.lat}, ${loc.lng})`;
}
```

## איך להסיר
מחק תיקייה + הסר את ה-button.
