export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4 text-center">🧾 תקנון אתר – שלג</h1>
      <p className="text-center text-gray-600 mb-8">עודכן: יוני 2025</p>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. מידע כללי</h2>
          <p>
            האתר מופעל על ידי שלג, עסק עצמאי הפועל בהתאם לחוקי מדינת ישראל. שלג אוסף, שוקל, אורז ומשלח מנות אוכל מוכנות, בשיתוף פעולה עם העסק "רוז" המספק את המזון עצמו.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. אזור שירות</h2>
          <p>
            המשלוחים זמינים בשלב זה באזור "בית בפארק" באור יהודה בלבד. תיתכן הרחבה בעתיד.
            <br />
            משלוח חינם – בכפוף לתנאים המשתנים ויעודכנו באתר.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. תשלום</h2>
          <p>ניתן לשלם באמצעות:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Bit</li>
            <li>פייבוקס</li>
            <li>מזומן</li>
          </ul>
          <p>
            בעתיד תתווסף אפשרות לתשלום בכרטיס אשראי דרך דף תשלום חיצוני.
            <br />
            האתר אינו שומר פרטי אשראי.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. אחריות והחזרות</h2>
          <p>
            המזון מופק ונמסר על ידי רוז, והאחריות לטיבו ולטריותו חלה עליהם.
            <br />
            כל פנייה בנוגע למוצר תטופל בהתאם לחוק הגנת הצרכן. החזרים או ביטולים יתבצעו לפי הדרישות הקבועות בחוק בלבד.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. כשרות</h2>
          <p>
            כל המנות בכשרות בהשגחת הרבנות רחובות.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. פרטיות</h2>
          <p>
            האתר אינו אוסף או שומר מידע אישי מהמשתמשים. פרטי ההזמנה מועברים באופן פרטי באמצעות אפליקציית תשלום או טלגרם.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. זכויות יוצרים</h2>
          <p>
            כל התכנים באתר, כולל טקסטים, תמונות, ועיצוב גרפי, שייכים לשלג ואסור להשתמש בהם ללא רשות מראש ובכתב.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. שינוי תקנון</h2>
          <p>
            שלג שומר לעצמו את הזכות לעדכן את התקנון בכל עת. התקנון העדכני יהיה זמין לצפייה באתר, והמשך השימוש באתר מהווה הסכמה לו.
          </p>
        </section>
      </div>
    </main>
  );
} 