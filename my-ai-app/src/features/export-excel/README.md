# Export Excel Feature

הורדת תשובת AI כקובץ Excel (.xlsx) עם תמיכה ב-RTL לעברית.

## מה זה עושה
- מזהה אוטומטית טבלאות Markdown בתשובת AI ומייצא אותן כ-sheet אמיתי
- אם יש כמה טבלאות → כל אחת ב-sheet נפרד
- אם אין טבלה → מייצא את כל הטקסט שורה-שורה
- **זיהוי שפה אוטומטי**: אם התוכן בעברית → ה-sheet ב-RTL view, אחרת LTR
- רוחב עמודות אוטומטי לפי תוכן

## דורש התקנה
```powershell
cd "C:\Users\This User\Desktop\chat\my-ai-app"
npm install xlsx
```

## איך להפעיל
ב-`MessageBubble.tsx` (אחרי שתתקין):
```tsx
import { ExcelButton } from '../../features/export-excel/feature';
{isAssistant && <ExcelButton text={message.content} />}
```

## איך להסיר
1. תמחק את התיקייה הזו
2. תחפש בקוד `export-excel` - תמחק את הimport וה-button

## דוגמה לשימוש
תשאל את ה-AI:
> "תן לי טבלה של 5 ערים בישראל עם אוכלוסייה ושטח"

תקבל טבלת Markdown. תלחץ על כפתור "Excel" → תקבל קובץ `.xlsx` עם:
- Sheet אחד בשם "Data"
- 6 שורות (כותרת + 5 ערים)
- 3 עמודות
- RTL מופעל אוטומטית כי התוכן בעברית
