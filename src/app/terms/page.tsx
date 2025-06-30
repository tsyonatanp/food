export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">תקנון שימוש והזמנה באתר</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">מידע כללי</h2>
          <p>
            האתר מופעל על ידי שלג (להלן: &quot;המפעיל&quot;), שפועל כעוסק פטור ומבצע משלוחים של אוכל מוכן מאת &quot;רוז&quot;.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">אופן הפעילות</h2>
          <p>
            האתר מציג תפריט מנות מוכנות. ההזמנה מבוצעת ישירות דרך האתר, אך האוכל נשקל, נארז ונשלח ללקוח – ללא בישול או הכנה באתר של &quot;שלג&quot;.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">אזורי חלוקה</h2>
          <p>
            המשלוחים זמינים באזור &quot;בית בפארק&quot; אור יהודה בלבד. המשלוח הוא בתשלום, לפי תעריף עדכני שיופיע בעמוד ההזמנה.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">תשלומים</h2>
          <p>
            ניתן לשלם באמצעות ביט, מזומן או פייבוקס. בעתיד תתווסף אפשרות לתשלום בכרטיס אשראי מאובטח.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">כשרות</h2>
          <p>
            כל האוכל תחת השגחת הרבנות רחובות.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">אחריות והחזרות</h2>
          <p>
            האוכל מסופק על ידי רוז, והאחריות לטיבו חלה עליהם. במידה ויש בעיה בתכולה, ניתן לפנות לשירות הלקוחות לבירור. ביטולים יבוצעו בהתאם לחוק הגנת הצרכן.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">שמירה על פרטיות</h2>
          <p>
            האתר אינו אוסף מידע אישי מהמשתמשים. כל הזמנה נמסרת באופן ידני באמצעות טלגרם או אמצעי תשלום חיצוניים.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">שינויים בתקנון</h2>
          <p>
            הנהלת האתר רשאית לעדכן את תנאי השימוש מעת לעת. העדכון ייכנס לתוקף עם פרסומו באתר.
          </p>
        </section>
      </div>
    </main>
  );
} 