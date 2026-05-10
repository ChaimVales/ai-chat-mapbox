# 📦 קטלוג כל הפיצ'רים

זה הרישום המרכזי של **34 פיצ'רים** מודולריים בפרויקט. כל פיצ'ר עצמאי, יושב בתיקייה משלו, ניתן להפעלה/הסרה ללא השפעה על האחרים.

## 🏗️ ארכיטקטורה

```
src/features/
├── FEATURES.md                  ← אתה כאן
├── <feature-name>/
│   ├── feature.tsx (or .ts)     ← הקוד עצמו
│   └── README.md                ← מה זה, איך להפעיל, איך להסיר
```
חחח 😊
## 🔍 איך למצוא פיצ'ר בקוד

חפש בקוד את הסטרינג:
```
FEATURE: <feature-name>
```

זה יכוון אותך לכל הקבצים שהפיצ'ר נוגע בהם.

## 📋 רשימת הפיצ'רים

### 🤖 Chat (16 פיצ'רים)

| # | שם | מה זה עושה | צריך npm install? |
|---|----|-----------|-------------------|
| 1 | `streaming` | תשובות זורמות (אות-אות) | ❌ |
| 2 | `thinking-display` | "מנתח שאלה...", "כותב..." | ❌ |
| 3 | `code-highlighting` | צביעת קוד בתוך תשובות | ✅ react-syntax-highlighter |
| 4 | `latex-math` | רינדור משוואות מתמטיות | ✅ rehype-katex remark-math katex |
| 5 | `regenerate` | "שאל שוב" | ❌ |
| 6 | `edit-message` | עריכת הודעה והרצה מחדש | ❌ |
| 7 | `search-history` | חיפוש בשיחות קודמות | ❌ |
| 8 | `export-chat` | הורדת שיחה כ-Markdown | ❌ |
| 8b | `export-excel` | הורדת תשובה כ-Excel (RTL/LTR אוטומטי) | ✅ xlsx |
| 9 | `voice-input` | מיקרופון (דיבור→טקסט) | ❌ Web Speech API |
| 10 | `voice-output` | רמקול (TTS) בכל הודעה | ❌ Web Speech API |
| 11 | `image-upload` | העלאת תמונה (Gemini multimodal) | ❌ |
| 12 | `token-counter` | הערכת טוקנים | ❌ |
| 13 | `model-selector` | בחירת מודל (flash/pro/lite) | ❌ |
| 14 | `temperature-slider` | סליידר ליצירתיות | ❌ |
| 15 | `system-prompt` | אישיות / הוראות קבועות | ❌ |
| 16 | `multi-tab-chats` | טאבים של שיחות מקבילות | ❌ (דורש refactor) |

### 🗺️ Map (10 פיצ'רים)

| # | שם | מה זה עושה | צריך npm install? |
|---|----|-----------|-------------------|
| 17 | `layer-toggle` | הצגת/הסתרת points/lines/polygons | ❌ (כבר מוטמע) |
| 18 | `polygon-color` | בחירת צבע לגיאומטריות | ❌ (כבר מוטמע) |
| 19 | `map-search` | חיפוש כתובות ב-Mapbox Geocoder | ✅ @mapbox/mapbox-gl-geocoder |
| 20 | `distance-measurement` | מדידת מרחק בין נקודות | ❌ |
| 21 | `area-measurement` | מדידת שטח של פוליגון | ❌ |
| 22 | `drawing-tools` | ציור ידני על המפה | ⚠️ פשוט - בלי lib |
| 23 | `export-geojson` | הורדת הגיאומטריה כ-.geojson | ❌ |
| 24 | `bookmarks` | שמירת מיקומים אהובים | ❌ |
| 25 | `buildings-3d` | בניינים תלת-ממדיים | ❌ |
| 26 | `terrain-toggle` | טופוגרפיה תלת-ממדית | ❌ |
| 27 | `click-popup` | popup עם פרטים בלחיצה | ❌ |
| 28 | `clusters` | קיבוץ של הרבה נקודות | ❌ |
| 29 | `heatmap` | מפת חום | ❌ |

### 🎨 UI (4 פיצ'רים)

| # | שם | מה זה עושה | צריך npm install? |
|---|----|-----------|-------------------|
| 30 | `copy-message` | כפתור Copy בכל הודעה | ❌ (כבר מוטמע) |
| 31 | `resizable-panels` | גרירת קו האמצע בין צ'אט למפה | ❌ |
| 32 | `keyboard-shortcuts` | Ctrl+K, Ctrl+/, Esc | ❌ |
| 33 | `onboarding-tour` | סיור היכרות לראשונה | ❌ |
| 34 | `custom-themes` | בחירת צבע ראשי | ❌ |

## 📦 חבילות npm להתקנה

אם תרצה להפעיל את כל הפיצ'רים שדורשים חבילות:

```bash
cd "C:\Users\This User\Desktop\chat\my-ai-app"
npm install react-syntax-highlighter rehype-katex remark-math katex jspdf re-resizable @mapbox/mapbox-gl-geocoder
npm install -D @types/react-syntax-highlighter @types/mapbox__mapbox-gl-geocoder
```

## ✅ איזה פיצ'רים כבר פעילים בקוד שלך?

הפיצ'רים האלה כבר מוטמעים ועובדים:
- `copy-message` - בכל הודעת AI
- `layer-toggle` - בצד המפה
- `polygon-color` - בצד המפה
- `map-search` - בצד המפה
- `chat-minimize` - בכותרת הצ'אט (מוטמע ב-ChatWindow.tsx)
- Markdown rendering בסיסי - כבר ב-MessageBubble

## 🔌 איך להפעיל פיצ'ר חדש?

### דוגמה: הפעלת `regenerate`

1. תפתח `src/features/regenerate/README.md`
2. העתק את הקוד שכתוב שם
3. ב-`src/store/chatStore.ts` הוסף את ה-action `regenerate`
4. ב-`src/components/chat/MessageBubble.tsx` הוסף:
   ```tsx
   import { RegenerateButton } from '../../features/regenerate/feature';
   {isAssistant && <RegenerateButton />}
   ```
5. תשמור → תראה את הכפתור

## 🗑️ איך להסיר פיצ'ר?

### דוגמה: הסרת `voice-input`

1. תמחק את התיקייה: `src/features/voice-input/`
2. תחפש בקוד "voice-input" - תמחק כל שימוש (import + JSX)
3. גמרת!

ה-README של כל פיצ'ר מסביר בדיוק איפה הוא משתלב בקוד.

## 💡 כלל הזהב

**כל פיצ'ר נמצא בתיקייה אחת + לכל היותר מכיר את 1-2 קבצי ליבה בקוד.**

אין תלויות בין פיצ'רים. זה אומר: אם פיצ'ר A שובר משהו - פיצ'ר B עדיין יעבוד.

---

## הקטגוריות בסיכום

- **כבר עובדים** (4): copy-message, layer-toggle, polygon-color, map-search
- **קוד מוכן** (30): כל השאר - רק להעתיק להיכן שצריך לפי ה-README שלהם
