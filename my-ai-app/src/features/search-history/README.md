# Search History Feature

חיפוש בשיחות הקודמות (בכותרת ובתוכן).

## איך להפעיל
ב-HistorySidebar:
```tsx
import { SearchInput, filterConversations } from '../../features/search-history/feature';
const [query, setQuery] = useState('');
const filtered = filterConversations(conversations, query);
// במקום `conversations.map(...)` השתמש ב-`filtered.map(...)`
<SearchInput onChange={setQuery} />
```

## איך להסיר
מחק תיקייה + הסר את ה-import וה-state.
