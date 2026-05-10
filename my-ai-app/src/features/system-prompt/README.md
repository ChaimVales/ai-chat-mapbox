# System Prompt Feature

הוראות קבועות ל-AI (אישיות / סגנון).

## איך להפעיל
ב-chatStore.ts בתוך sendMessage, הוסף לפני שליחה:
```ts
const sysPrompt = useSystemPromptStore.getState().systemPrompt;
const messages = [...];
if (sysPrompt) messages.unshift({ role: 'system', content: sysPrompt });
```

ב-Header:
```tsx
import { SystemPromptEditor } from '../../features/system-prompt/feature';
<SystemPromptEditor />
```

## איך להסיר
מחק תיקייה.
