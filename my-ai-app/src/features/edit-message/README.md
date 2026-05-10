# Edit Message Feature

עריכה של הודעה קודמת + הרצה מחדש של השיחה מאותה נקודה.

## איך להפעיל
ב-chatStore.ts הוסף:
```ts
editMessage: async (id: string, newContent: string) => {
  const msgs = get().messages;
  const idx = msgs.findIndex(m => m.id === id);
  if (idx < 0) return;
  set({ messages: msgs.slice(0, idx) });
  await get().sendMessage(newContent);
},
```

ב-MessageBubble:
```tsx
import { EditButton } from '../../features/edit-message/feature';
<EditButton message={message} />
```

## איך להסיר
מחק תיקייה + הסר את `editMessage` + הסר את ה-button.
