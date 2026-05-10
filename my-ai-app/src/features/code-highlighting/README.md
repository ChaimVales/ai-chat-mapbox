# Code Highlighting Feature

צביעת syntax לבלוקי קוד בתשובות AI (Python, JS, SQL...).

## דורש התקנה
```
npm install react-syntax-highlighter
npm install -D @types/react-syntax-highlighter
```

## איך להפעיל
ב-MessageBubble.tsx:
```tsx
import { CodeBlock } from '../../features/code-highlighting/feature';
<ReactMarkdown components={{ code: CodeBlock }} ...>
```

## איך להסיר
מחק את התיקייה + הסר את `components={{ code: CodeBlock }}`.
