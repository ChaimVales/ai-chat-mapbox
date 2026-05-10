# LaTeX Math Feature

רינדור משוואות מתמטיות בתשובות AI ($x^2 + y^2$).

## דורש התקנה
```
npm install rehype-katex remark-math katex
```

## איך להפעיל
ב-main.tsx:
```tsx
import 'katex/dist/katex.min.css';
```

ב-MessageBubble.tsx:
```tsx
import { remarkPlugins, rehypePlugins } from '../../features/latex-math/feature';
<ReactMarkdown remarkPlugins={[remarkGfm, ...remarkPlugins]} rehypePlugins={rehypePlugins}>
```

## איך להסיר
מחק תיקייה + הסר את ה-plugins.
