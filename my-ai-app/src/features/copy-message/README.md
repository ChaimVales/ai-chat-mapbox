# Copy Message Feature

Adds a copy-to-clipboard button to every AI message.

## How to use in a project

1. Copy `feature.tsx` to your project
2. In the message renderer:
   ```tsx
   import { CopyButton } from './path/to/CopyButton';
   {showCopy && <CopyButton text={message.content} />}
Dependencies
lucide-react (Icons: Copy, Check)
React 18+
Permissions
Browser must support navigator.clipboard.writeText(). Fallback: use document.execCommand('copy').


#### 4. השתמש בפיצ'ר ב-`MessageBubble.tsx`
```tsx
import { useFeature } from '../../features/useFeature';
import { CopyButton } from '../../features/copy-message/feature';

export function MessageBubble({ message }: Props) {
  const showCopy = useFeature('copy-message');
  const isAssistant = message.role === 'assistant';
  // ... existing code ...

  return (
    <div className="...">
      {/* ... bubble content ... */}
      {isAssistant && showCopy && (
        <div className="mt-1">
          <CopyButton text={message.content} />
        </div>
      )}
    </div>
  );
}
תבנית - חזור על זה לכל פיצ'ר נוסף
src/features/<feature-name>/
├── feature.tsx          ← הקוד עצמו
├── feature.config.ts    ← מטה
└── README.md            ← הסבר
ואז ב-_registry.ts:

import { config as myFeature } from './<feature-name>/feature.config';

export const featuresRegistry: FeatureMeta[] = [
  // ...,
  myFeature,
];
הערה - פיצ'רים שדורשים שינוי בלוגיקה (לא רק UI)
חלק מהפיצ'רים (כמו streaming או chat-position) דורשים גם שינוי במקומות אחרים בקוד. הפתרון: בכל מקום שצריך, תעטוף ב-useFeature():

לדוגמה - streaming:

// ב-chatStore.ts
async sendMessage(content) {
  const useStreaming = useFeatureStore.getState().isEnabled('streaming');
  if (useStreaming) {
    // קוד streaming
  } else {
    // קוד רגיל
  }
}