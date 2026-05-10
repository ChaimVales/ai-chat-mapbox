# 🗺️ AI Chat + Mapbox

> צ'אטבוט מבוסס Gemini AI עם מפת Mapbox אינטראקטיבית, 30+ פיצ'רים מודולריים, תמיכה דו-לשונית (עברית/אנגלית) ועיצוב responsive.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_18-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📖 מה זה?

אפליקציית web fullstack שמשלבת:

- 💬 **צ'אט AI חכם** עם Google Gemini - streaming מילה-מילה, multimodal (תמונות), system prompts
- 🗺️ **מפת Mapbox אינטראקטיבית** עם זיהוי אוטומטי של גיאומטריה בתשובות AI
- 🧩 **30+ פיצ'רים מודולריים** - כל אחד עצמאי, ניתן להפעלה/הסרה
- 🌍 **דו-לשוני** - עברית (RTL) ואנגלית (LTR) באותה אפליקציה
- 🎨 **Dark/Light mode** + ערכות צבעים מותאמות

**בדוגמה אמיתית:** תשאל את ה-AI "איפה תל אביב?" → המפה מתחלקת אוטומטית 25/75, מציגה נקודה על המפה ועושה zoom אליה.

---

## 🚀 התקנה והפעלה מהירה

### דרישות מקדימות
- **Node.js 20+** ([הורד מכאן](https://nodejs.org/))
- **Git** ([הורד מכאן](https://git-scm.com/))
- **מפתח Gemini API** - חינם מ-[Google AI Studio](https://aistudio.google.com/apikey)
- **מפתח Mapbox** - חינם מ-[Mapbox Account](https://account.mapbox.com/access-tokens/)

### צעד 1 - Clone

```bash
git clone https://github.com/ChaimVales/ai-chat-mapbox.git
cd ai-chat-mapbox
```

### צעד 2 - התקנת dependencies

```bash
# Frontend
cd my-ai-app
npm install

# Backend
cd ../server
npm install
cd ..
```

### צעד 3 - הגדרת `.env`

**`my-ai-app/.env`** (Frontend):
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_MAPBOX_TOKEN=pk.your-mapbox-token-here
```

**`server/.env`** (Backend):
```env
PORT=3001
GEMINI_API_KEY=AIzaSy-your-gemini-key-here
ALLOWED_ORIGINS=http://localhost:5173
```

### צעד 4 - הפעלה (2 טרמינלים)

**טרמינל 1 - Backend:**
```bash
cd server
npm run dev
```
תראה: `Server running on http://localhost:3001`

**טרמינל 2 - Frontend:**
```bash
cd my-ai-app
npm run dev
```
תראה: `Local: http://localhost:5173`

תפתח את הדפדפן ב-[http://localhost:5173](http://localhost:5173).

---

## 📁 מבנה הפרויקט

```
ai-chat-mapbox/
├── my-ai-app/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # קומפוננטות UI
│   │   │   ├── chat/         # ChatWindow, MessageBubble, etc
│   │   │   ├── map/          # MapView, GeoLayer, LayersControl
│   │   │   ├── welcome/      # WelcomeScreen, toggles
│   │   │   └── layout/       # SplitView
│   │   ├── features/         # 30+ פיצ'רים מודולריים
│   │   │   ├── streaming/
│   │   │   ├── voice-input/
│   │   │   ├── bookmarks/
│   │   │   └── ... (ראה FEATURES.md)
│   │   ├── store/            # Zustand stores
│   │   ├── services/         # API client, geo detector
│   │   ├── i18n/             # תרגומים (he/en)
│   │   └── types/            # TypeScript types
│   ├── public/
│   └── package.json
│
├── server/                   # Backend (Express + Gemini)
│   ├── src/
│   │   ├── routes/           # /api/chat, /api/chat/stream
│   │   ├── services/         # geminiService.ts
│   │   ├── middleware/       # rateLimit, validate, helmet
│   │   └── index.ts
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── README.md                 # אתה כאן
└── .env.example
```

---

## ✨ פיצ'רים

### 💬 Chat (16 פיצ'רים)

| פיצ'ר | תיאור |
|-------|--------|
| 🔄 **Streaming** | תשובות זורמות מילה-מילה (כמו ChatGPT) |
| 🧠 **Thinking display** | "מנתח שאלה...", "כותב..." בזמן עיבוד |
| 🎨 **Code highlighting** | צביעת syntax לבלוקי קוד |
| 📐 **LaTeX math** | רינדור משוואות מתמטיות ($x^2 + y^2$) |
| 🔁 **Regenerate** | "שאל שוב" - מקבל תשובה חדשה לאותה שאלה |
| ✏️ **Edit message** | עריכת הודעה והרצה מחדש מאותה נקודה |
| 🔍 **Search history** | חיפוש בכל השיחות הקודמות |
| 💾 **Export chat** | הורדת שיחה כ-Markdown |
| 🎤 **Voice input** | מיקרופון - דיבור→טקסט (Web Speech API) |
| 🔊 **Voice output** | רמקול - הקראת תשובות (TTS) |
| 🖼️ **Image upload** | העלאת תמונה ושאלה עליה (Gemini multimodal) |
| 🔢 **Token counter** | הערכה של מספר הטוקנים בקלט/שיחה |
| 🤖 **Model selector** | בחירה בין flash/pro/lite |
| 🌡️ **Temperature** | סליידר ליצירתיות (0=יציב, 1=יצירתי) |
| 📝 **System prompt** | אישיות מותאמת ל-AI |
| 📑 **Multi-tab chats** | כמה שיחות פתוחות במקביל |

### 🗺️ Map (10 פיצ'רים)

| פיצ'ר | תיאור |
|-------|--------|
| 👁️ **Layer toggle** | הצגת/הסתרת points/lines/polygons |
| 🎨 **Color picker** | שינוי צבעי גיאומטריות |
| 🔎 **Address search** | חיפוש כתובות ב-Mapbox Geocoder |
| 📏 **Distance** | מדידת מרחק בין נקודות (haversine) |
| 📐 **Area** | מדידת שטח של פוליגון |
| ✏️ **Drawing** | ציור ידני על המפה |
| 💾 **Export GeoJSON** | הורדת הגיאומטריה כקובץ |
| ⭐ **Bookmarks** | שמירת מיקומים אהובים |
| 🏙️ **3D buildings** | בניינים תלת-ממדיים (zoom 14+) |
| 🏔️ **Terrain** | טופוגרפיה תלת-ממדית |
| 💬 **Click popup** | popup עם פרטים בלחיצה על feature |
| 🌐 **Clusters** | קיבוץ של הרבה נקודות |
| 🔥 **Heatmap** | מפת חום מנקודות |

### 🎨 UI (4 פיצ'רים)

| פיצ'ר | תיאור |
|-------|--------|
| 📋 **Copy message** | כפתור Copy בכל הודעה |
| ↔️ **Resizable panels** | גרירת קו האמצע בין צ'אט למפה |
| ⌨️ **Keyboard shortcuts** | Ctrl+K, Ctrl+/, Esc |
| 🚀 **Onboarding tour** | סיור היכרות לראשונה |
| 🎨 **Custom themes** | בחירת צבע ראשי לעיצוב |

📖 **לרשימה מלאה ופירוט** - ראה [`my-ai-app/src/features/FEATURES.md`](my-ai-app/src/features/FEATURES.md)

---

## 🛠️ טכנולוגיות

### Frontend
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - build tool מהיר
- **[Tailwind CSS](https://tailwindcss.com/)** - utility-first CSS + dark mode
- **[Zustand](https://github.com/pmndrs/zustand)** - state management קל
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)** - מפות אינטראקטיביות
- **[react-i18next](https://react.i18next.com/)** - i18n + RTL
- **[lucide-react](https://lucide.dev/)** - אייקונים מודרניים
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering

### Backend
- **[Express](https://expressjs.com/)** - web framework
- **[TypeScript](https://www.typescriptlang.org/)**
- **[@google/generative-ai](https://github.com/google/generative-ai-js)** - Gemini SDK
- **[zod](https://zod.dev/)** - runtime validation
- **[helmet](https://helmetjs.github.io/)** - security headers
- **[express-rate-limit](https://express-rate-limit.mintlify.app/)** - rate limiting
- **[dotenv](https://github.com/motdotla/dotenv)** - environment variables

---

## 🔑 איך משיגים מפתחות API

### Gemini API (חינם!)
1. לך ל-[Google AI Studio](https://aistudio.google.com/apikey)
2. התחבר עם חשבון Google
3. **Create API key** → **Create API key in new project**
4. תעתיק את המפתח (`AIzaSy...`)
5. תדביק ב-`server/.env` תחת `GEMINI_API_KEY`

**Free tier**: 1500 בקשות ליום, 15 לדקה. **ללא כרטיס אשראי**.

### Mapbox Token (חינם!)
1. תירשם ל-[Mapbox](https://account.mapbox.com/auth/signup/)
2. אחרי אימות מייל - לך ל-[Tokens](https://account.mapbox.com/access-tokens/)
3. תעתיק את ה-**Default public token** (`pk.eyJ1...`)
4. תדביק ב-`my-ai-app/.env` תחת `VITE_MAPBOX_TOKEN`

**Free tier**: 50,000 map loads בחודש.

---

## 🧪 דוגמאות שאלות

נסה לשאול את ה-AI:

| שאלה | מה יקרה |
|------|---------|
| "איפה תל אביב?" | יחזיר GeoJSON Point + מפה תופיע אוטומטית |
| "תכנן מסלול עם 5 נקודות מתל אביב לאילת" | יחזיר LineString → קו על המפה |
| "תן לי GeoJSON Polygon של גוש דן" | פוליגון מסומן עם fill |
| "טבלה של 5 הערים הגדולות בישראל" | טבלת Markdown מעוצבת |
| "תן לי דוגמת קוד Python לחישוב haversine" | קוד עם syntax highlighting |

---

## 🏗️ ארכיטקטורת הפיצ'רים

הפרויקט מבוסס על **modular features** - כל פיצ'ר עצמאי בתיקייה משלו:

```
src/features/<feature-name>/
├── feature.tsx (or .ts)    # הקוד עצמו
└── README.md               # מה זה, איך להפעיל, איך להסיר
```

כל פיצ'ר משולב בקוד הליבה עם **הערות מסומנות**:

```tsx
// === FEATURE: voice-input ===
import { VoiceButton } from '../../features/voice-input/feature';
<VoiceButton onTranscript={(t) => setText(t)} />
// === END FEATURE: voice-input ===
```

**להסרת פיצ'ר**: חיפוש את הסטרינג `=== FEATURE: <name> ===` בקוד, מחיקת הבלוק והתיקייה.

📖 פירוט מלא: [`my-ai-app/src/features/FEATURES.md`](my-ai-app/src/features/FEATURES.md)

---

## 📜 רישיון

MIT © 2026 [Chaim Vales](https://github.com/ChaimVales)

---

## 🙏 תודות

- [Google Gemini](https://ai.google.dev/) - מודל AI חינמי וטוב
- [Mapbox](https://www.mapbox.com/) - מפות יפות
- [Anthropic Claude](https://claude.ai/) - בעזרתו נבנה הפרויקט הזה

---

## 📬 יצירת קשר

יש שאלות? פתחו [Issue ב-GitHub](https://github.com/ChaimVales/ai-chat-mapbox/issues).

---

<div align="center">

**⭐ אם הפרויקט עזר לך - תן Star!**

Made with ❤️ in Israel 🇮🇱

</div>
