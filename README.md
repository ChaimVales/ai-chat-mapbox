# AI Chat + Mapbox

צ'אטבוט AI עם תמיכה במפות Mapbox.

## הפעלה
```bash
# התקנה
npm install
cd server && npm install && cd ..

# קונפיגורציה
cp .env.example .env
cp server/.env.example server/.env
# (ערוך את שני קבצי ה-.env עם המפתחות שלך)

# הרצה (בשני טרמינלים)
cd server && npm run dev
npm run dev
טכנולוגיות
React 18 + TypeScript + Vite
Tailwind CSS + dark mode
Zustand (state)
Axios (HTTP)
Mapbox GL JS (מפות)
react-i18next (he/en + RTL)
Express + OpenAI SDK (backend proxy)

### 7. וודא שכל הפיצ'רים עובדים
רשימה:
- [ ] מסך כניסה נטען
- [ ] toggle theme עובד
- [ ] toggle language עובד (כולל RTL)
- [ ] לחיצה על launcher → צ'אט נפתח
- [ ] שולח הודעה → מקבל תשובה
- [ ] Stop באמצע - עובד
- [ ] היסטוריה - שיחות נשמרות
- [ ] new chat מנקה
- [ ] מקבל גיאומטריה → split view + נקודה על המפה
- [ ] בדיקת mobile

## קומיט סופי
```bash
git add .
git commit -m "chore(stage-1): code cleanup, formatting, and documentation"
git tag stage-1-complete