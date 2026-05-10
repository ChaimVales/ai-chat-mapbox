# Regenerate Feature

כפתור "שאל שוב" - מסיר את התשובה האחרונה ומבקש מה-AI לענות שוב.

## איך להפעיל
1. ב-chatStore.ts הוסף action `regenerate`:
```ts
regenerate: async () => {
  const msgs = get().messages;
  const lastUser = [...msgs].reverse().find(m => m.role === 'user');
  if (!lastUser) return;
  // הסר את כל ההודעות אחרי ה-user האחרון
  set({ messages: msgs.slice(0, msgs.lastIndexOf(lastUser) + 1) });
  await get().sendMessage(lastUser.content);
},
```

2. ב-MessageBubble.tsx (או MessageList):
```tsx
import { RegenerateButton } from '../../features/regenerate/feature';
{isAssistant && <RegenerateButton />}
```

## איך להסיר
מחק תיקייה + הסר את `regenerate` מ-chatStore + הסר את ה-button.
