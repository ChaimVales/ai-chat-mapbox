# Custom Themes Feature
בחירת צבע ראשי לאתר (מעבר ל-dark/light).

## איך להפעיל
ב-WelcomeScreen או Header:
```tsx
import { ThemePicker } from '../../features/custom-themes/feature';
<ThemePicker />
```

ב-index.css תוסיף:
```css
:root { --accent: #3b82f6; }
```
ובמקום `bg-blue-600` השתמש ב-`bg-[color:var(--accent)]`.

## איך להסיר
מחק תיקייה.
