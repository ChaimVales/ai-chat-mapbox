# Streaming Feature

מציג תשובות AI אות-אות (כמו ChatGPT) במקום בבת אחת.

## איך זה עובד
השרת שולח Server-Sent Events. הפרונט קורא אותם בחתיכות עם `ReadableStream` ומציג מיד.

## איך להפעיל
ב-`chatStore.ts` השתמש ב-`streamChat` במקום `sendChat`.

## איך להסיר
1. מחק את התיקייה הזו
2. ב-chatStore.ts החזר את `sendChat` במקום `streamChat`
3. הסר את `/api/chat/stream` מ-server/src/routes/chat.ts
