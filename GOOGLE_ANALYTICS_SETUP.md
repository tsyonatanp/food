# הגדרת Google Analytics לאפליקציה

## שלב 1: יצירת חשבון Google Analytics

1. היכנס ל-[analytics.google.com](https://analytics.google.com)
2. לחץ על "Start measuring"
3. מלא את הפרטים:
   - שם החשבון: Redy Food
   - שם הנכס: Redy Food Website
   - כתובת האתר: https://redy-food.vercel.app
   - תעשייה: Food & Drink
   - אזור זמן: ישראל

## שלב 2: קבלת Measurement ID

1. לאחר יצירת החשבון, תועבר לדשבורד
2. לחץ על "Data Streams" בתפריט הצד
3. לחץ על "Add stream" → "Web"
4. מלא את הפרטים:
   - שם הסטרים: Redy Food Website
   - כתובת האתר: https://redy-food.vercel.app
5. לחץ על "Create stream"
6. העתק את ה-Measurement ID (נראה כמו G-XXXXXXXXXX)

## שלב 3: הגדרת המשתנה הסביבתי

### עבור פיתוח מקומי:
1. צור קובץ `.env.local` בתיקיית הפרויקט
2. הוסף את השורה הבאה:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
3. החלף G-XXXXXXXXXX עם ה-Measurement ID שקיבלת

### עבור Vercel:
1. היכנס ל-[vercel.com](https://vercel.com)
2. בחר את הפרויקט שלך
3. לך ל-Settings → Environment Variables
4. הוסף משתנה חדש:
   - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX` (החלף עם ה-ID שלך)
5. לחץ על "Save"

## שלב 4: בדיקה

1. העלה את השינויים ל-Vercel
2. פתח את האתר
3. פתח את Developer Tools (F12)
4. לך ל-Network tab
5. חפש בקשות ל-google-analytics.com
6. בדוק ב-Google Analytics שהנתונים מתקבלים

## מה שמוגדר:

✅ **Page Views** - מעקב אחרי כניסות לדפים
✅ **User Sessions** - מעקב אחרי משתמשים
✅ **Traffic Sources** - מאיפה מגיעים המשתמשים
✅ **Device Information** - איזה מכשירים משתמשים
✅ **Geographic Data** - מאיפה המשתמשים

## אירועים נוספים שניתן להוסיף:

- הזמנות (כשמשתמש מזמין)
- הוספה לעגלה
- חיפוש מוצרים
- יצירת קשר

האם תרצה שאוסיף מעקב אחרי אירועים ספציפיים? 