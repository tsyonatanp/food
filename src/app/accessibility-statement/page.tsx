export default function AccessibilityStatement() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">הצהרת נגישות</h1>
      
      <section className="mb-8">
        <p className="mb-4">
          אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013.
        </p>
        <p className="mb-4">
          התאמות הנגישות בוצעו על פי המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG2.1.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">התאמות הנגישות באתר כוללות</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>התאמה לניווט מלא באמצעות מקלדת</li>
          <li>תמיכה בטכנולוגיות מסייעות (כגון תוכנת הקראת מסך)</li>
          <li>אפשרות לשינוי גודל הטקסט</li>
          <li>אפשרות לשינוי ניגודיות צבעים</li>
          <li>תיאורי תמונות חלופיים</li>
          <li>מבנה אתר סמנטי ועקבי</li>
          <li>כותרות לסעיפים ברורות</li>
          <li>הצהרת נגישות מעודכנת</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">הסדרי נגישות באתר</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>בתפריט הראשי קיים כפתור נגישות המאפשר התאמת האתר לצרכים שונים</li>
          <li>ניתן להפעיל את האתר באמצעות מקלדת. מקש Tab מעביר בין הקישורים השונים בדף</li>
          <li>לחיצה על מקש Enter תפעיל את הקישור המסומן</li>
          <li>בראש כל דף קיים קישור המאפשר לדלג על התפריטים ולעבור ישירות לתוכן המרכזי</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">מידע על אודות נגישות האתר</h2>
        <ul className="list-none space-y-2">
          <li>האתר נבדק על ידי יועץ נגישות מוסמך</li>
          <li>רמת הנגישות היא AA</li>
          <li>תאריך ביצוע הבדיקה האחרונה: {new Date().toLocaleDateString('he-IL')}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">דרכי פנייה לבקשות והצעות לשיפור בנושא נגישות</h2>
        <div className="space-y-2">
          <p>רכז הנגישות: דניאל</p>
          <p>טלפון: 050-9555755</p>
          <p>פניות בנושא נגישות יענו ויטופלו בתוך 48 שעות</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">מסמכים נוספים</h2>
        <p className="mb-4">
          חלק מהמסמכים שנמצאים באתר הם קבצי PDF. לצפייה בהם יש להוריד תוכנת קורא קבצים מסוג זה.
          להורדת תוכנת ADOBE READER לחץ כאן (קישור יפתח בחלון חדש).
        </p>
      </section>

      <footer className="text-sm text-gray-600">
        <p>הצהרת הנגישות עודכנה לאחרונה בתאריך: {new Date().toLocaleDateString('he-IL')}</p>
      </footer>
    </div>
  );
} 