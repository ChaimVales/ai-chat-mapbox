# Temperature Slider Feature

סליידר ליצירתיות של ה-AI (0 = יציב, 1 = יצירתי).

## איך להפעיל
1. ב-server/geminiService.ts: `generationConfig: { temperature: req.body.temperature }`
2. ב-chatService.ts: שלח את ה-temperature
3. ב-Header:
```tsx
import { TemperatureSlider } from '../../features/temperature-slider/feature';
<TemperatureSlider />
```

## איך להסיר
מחק תיקייה.
