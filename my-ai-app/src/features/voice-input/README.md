# Voice Input Feature

כפתור מיקרופון להקלטה (דיבור → טקסט).
משתמש ב-Web Speech API נטיב של הדפדפן (חינם, ללא ספרייה).

## דפדפנים נתמכים
Chrome ✅, Edge ✅, Safari (חלקי), Firefox ❌

## איך להפעיל
ב-MessageInput.tsx:
```tsx
import { VoiceButton } from '../../features/voice-input/feature';
<VoiceButton onTranscript={(text) => setText(text)} />
```

## איך להסיר
מחק תיקייה + הסר את ה-button.
