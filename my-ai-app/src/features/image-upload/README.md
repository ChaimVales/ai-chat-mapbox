# Image Upload Feature

העלאת תמונה לצ'אט. Gemini תומך ב-multimodal (תמונה + שאלה).

## איך להפעיל

### 1. ב-types/chat.ts
```ts
export interface ChatMessage {
  // ...
  imageBase64?: string;
}
```

### 2. ב-MessageInput.tsx
```tsx
import { ImageButton } from '../../features/image-upload/feature';
const [image, setImage] = useState<string>('');
<ImageButton onSelect={setImage} />
// כשולחים: sendMessage(text, image);
```

### 3. ב-chatStore.ts: עדכן sendMessage לקבל image
### 4. ב-server/geminiService.ts: שלח לGemini עם inlineData

## איך להסיר
מחק תיקייה + החזר את הקבצים שעודכנו.
