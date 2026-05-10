# Voice Output Feature

כפתור רמקול בכל הודעת AI - מקריא בקול (Speech Synthesis נטיב).

## איך להפעיל
ב-MessageBubble.tsx:
```tsx
import { SpeakButton } from '../../features/voice-output/feature';
{isAssistant && <SpeakButton text={message.content} />}
```

## איך להסיר
מחק תיקייה + הסר את ה-button.
