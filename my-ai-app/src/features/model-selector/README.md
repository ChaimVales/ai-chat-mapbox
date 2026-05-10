# Model Selector Feature

תפריט נגלל לבחירת מודל Gemini.

## איך להפעיל
1. ב-chatService.ts תוסיף `model` ל-body
2. ב-server: `model: req.body.model || 'gemini-2.5-flash'`
3. ב-Header של ChatWindow:
```tsx
import { ModelSelector } from '../../features/model-selector/feature';
<ModelSelector />
```

## איך להסיר
מחק תיקייה + החזר את model הקבוע ב-server.
