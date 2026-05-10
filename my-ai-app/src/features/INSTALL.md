# 📦 הוראות התקנה לפיצ'רים שדורשים npm install

הקבצים מוכנים בתיקיות הפיצ'רים. רק צריך להתקין את החבילות ולחבר אותם.

---

## 1. code-highlighting (צביעת קוד בתשובות)

### התקנה
```powershell
cd "C:\Users\This User\Desktop\chat\my-ai-app"
npm install react-syntax-highlighter
npm install -D @types/react-syntax-highlighter
```

### חיבור
תפתח `src/components/chat/MessageBubble.tsx`. תוסיף import:
```tsx
import { CodeBlock } from '../../features/code-highlighting/feature';
```

תמצא את ה-`<ReactMarkdown>` ותוסיף את `components`:
```tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{ code: CodeBlock as any }}
>
  {message.content}
</ReactMarkdown>
```

תרענן → הקוד בתשובות AI יהיה צבוע יפה.

---

## 2. latex-math (משוואות מתמטיות)

### התקנה
```powershell
cd "C:\Users\This User\Desktop\chat\my-ai-app"
npm install rehype-katex remark-math katex
```

### חיבור

**ב-`src/main.tsx`** - תוסיף בתחילת הקובץ:
```tsx
import 'katex/dist/katex.min.css';
```

**ב-`src/components/chat/MessageBubble.tsx`** - תוסיף import:
```tsx
import { remarkPlugins, rehypePlugins } from '../../features/latex-math/feature';
```

ותחליף ב-`<ReactMarkdown>`:
```tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm, ...remarkPlugins]}
  rehypePlugins={rehypePlugins}
>
  {message.content}
</ReactMarkdown>
```

תרענן → תוכל לכתוב `$x^2 + y^2 = z^2$` בצ'אט וזה יוצג כמשוואה.

---

## 3. mapbox-gl-geocoder (חיפוש מתקדם במפה)

### התקנה
```powershell
cd "C:\Users\This User\Desktop\chat\my-ai-app"
npm install @mapbox/mapbox-gl-geocoder
npm install -D @types/mapbox__mapbox-gl-geocoder
```

ה-MapSearch כבר מקושר ב-MapView. אחרי ההתקנה - תרענן.

---

## הקובץ ה-FEATURES.md המעודכן

אחרי שהתקנת והתחברת - **תוכל לעדכן את `FEATURES.md`** ולהזיז את הפיצ'רים האלה ל"כבר עובדים".

---

## אם נתקעת

**שגיאה:** `Cannot find module 'react-syntax-highlighter'`
→ לא הרצת `npm install`. תריץ.

**שגיאה:** `katex.css 404`
→ שכחת `import 'katex/dist/katex.min.css'` ב-main.tsx.

**שגיאה:** `MapboxGeocoder is not a constructor`
→ ה-types של mapbox geocoder לא מותקנים. תריץ:
```powershell
npm install -D @types/mapbox__mapbox-gl-geocoder
```
