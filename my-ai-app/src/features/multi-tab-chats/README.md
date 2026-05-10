# Multi-Tab Chats Feature

טאבים בראש הצ'אט - כמה שיחות פתוחות במקביל.

## ⚠️ פיצ'ר מורכב
דורש refactor של chatStore לתמוך ב-Map<tabId, messages[]>.

## איך להפעיל בסיסי (UI בלבד)
ב-ChatWindow header:
```tsx
import { ChatTabs } from '../../features/multi-tab-chats/feature';
<ChatTabs />
```

## איך להפעיל מלא
לעדכן chatStore כך ש-`messages` יהיה `Record<tabId, ChatMessage[]>` ולקרוא תמיד עם `useTabsStore.getState().activeId`.

## איך להסיר
מחק תיקייה.
