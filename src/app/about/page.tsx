import StructuredData from '@/components/StructuredData';

export default function AboutPage() {
  return (
    <>
      <StructuredData type="organization" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          אודות שלג-רוז 🍽️
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">
              הסיפור שלנו
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              שלג-רוז נולדה מתוך אהבה לאוכל ביתי ומסורתי. לפני 3 שנים, התחלנו במטבח קטן באור יהודה עם חלום גדול - להביא את הטעמים של אמא לכל בית בישראל.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              היום, אנחנו גאים לשרת מאות משפחות מדי שבוע עם מגוון רחב של מנות חמות, תבשילים מסורתיים וסלטים טריים - הכל כשר בהשגחת הרבנות המקומית.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">
              הפילוסופיה שלנו
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">🍽️ איכות ללא פשרות</h3>
                <p className="text-lg leading-relaxed">
                  אנחנו משתמשים רק בחומרי גלם טריים ואיכותיים, קונים יומית בשוק המקומי ומבשלים כמו בבית - עם אהבה ותשומת לב לכל פרט.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">🤝 שירות לקוחות מעולה</h3>
                <p className="text-lg leading-relaxed">
                  הצוות שלנו זמין 24/7 לכל שאלה או בקשה. אנחנו מאמינים שחוויית הלקוח מתחילה מהרגע הראשון ונמשכת הרבה אחרי המשלוח.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">🌱 אחריות חברתית</h3>
                <p className="text-lg leading-relaxed">
                  אנחנו תורמים 5% מהרווחים למשפחות נזקקות, משתפים פעולה עם עמותות מקומיות ומארגנים אירועים קהילתיים.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">💝 תוכנית נאמנות</h3>
                <p className="text-lg leading-relaxed">
                  הלקוחות הקבועים שלנו נהנים מהנחות מיוחדות, מנות מתנה והזמנות מוקדמות. אנחנו מאמינים ביחסים ארוכי טווח.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">
              המטבח שלנו
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-orange-600">🍖 תבשילים מסורתיים</h3>
                <ul className="space-y-2">
                  <li>• חמין צונט מסורתי</li>
                  <li>• קובה במיה וחמוסטה</li>
                  <li>• מוסקה יוונית</li>
                  <li>• תבשילי בשר ועוף</li>
                  <li>• מנות אסייתיות</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-green-600">🥗 סלטים טריים</h3>
                <ul className="space-y-2">
                  <li>• סלטים יווניים</li>
                  <li>• וולדורף קלאסי</li>
                  <li>• אנטיפסטי איטלקי</li>
                  <li>• סלטי ירקות טריים</li>
                  <li>• סלטים מיוחדים</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">🍰 קינוחים</h3>
                <ul className="space-y-2">
                  <li>• עוגות ביתיות</li>
                  <li>• עוגיות טריות</li>
                  <li>• פירות עונתיים</li>
                  <li>• קינוחים מיוחדים</li>
                  <li>• עוגות ימי הולדת</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">
              הנתונים שלנו
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-lg">הזמנות שבועיות</div>
              </div>
              <div className="text-center bg-green-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
                <div className="text-lg">דירוג ממוצע</div>
              </div>
              <div className="text-center bg-purple-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                <div className="text-lg">שביעות רצון</div>
              </div>
              <div className="text-center bg-orange-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">15 דקות</div>
                <div className="text-lg">זמן תגובה ממוצע</div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">
              הצוות שלנו
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">👨‍🍳 השף הראשי</h3>
                <p className="text-lg leading-relaxed">
                  עם 15 שנות ניסיון במטבחים הטובים בישראל, השף שלנו מביא את הניסיון והמומחיות לכל מנה. הוא מאמין שהסוד לאוכל טוב הוא אהבה ותשומת לב לפרטים.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">👩‍💼 מנהלת השירות</h3>
                <p className="text-lg leading-relaxed">
                  הצוות שלנו זמין 24/7 לכל שאלה או בקשה. אנחנו מאמינים שחוויית הלקוח מתחילה מהרגע הראשון ונמשכת הרבה אחרי המשלוח.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">
              הכשרות והסמכות
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul className="space-y-4 text-lg">
                <li className="flex items-center">
                  <span className="text-green-600 mr-3">✓</span>
                  <strong>כשרות:</strong> בהשגחת הרבנות המקומית באור יהודה
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3">✓</span>
                  <strong>היגיינה:</strong> תקן משרד הבריאות - A+ בדירוג
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3">✓</span>
                  <strong>איכות:</strong> ISO 22000 - ניהול בטיחות מזון
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3">✓</span>
                  <strong>סביבה:</strong> תקן ירוק - מחזור וחסכון באנרגיה
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">
              תרומה לקהילה
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-green-600">🤝 פרויקטים חברתיים</h3>
                <ul className="space-y-2 text-lg">
                  <li>• תרומה למשפחות נזקקות</li>
                  <li>• ארוחות לילדים בסיכון</li>
                  <li>• תמיכה בקשישים</li>
                  <li>• אירועים קהילתיים</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-green-600">🌱 אחריות סביבתית</h3>
                <ul className="space-y-2 text-lg">
                  <li>• אריזות מתכלות</li>
                  <li>• מחזור פסולת</li>
                  <li>• חסכון באנרגיה</li>
                  <li>• שימוש בחומרים ירוקים</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="text-center bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">
              הצטרפו למשפחת שלג-רוז
            </h2>
            <p className="text-xl leading-relaxed mb-6">
              בואו להיות חלק מהמשפחה שלנו! הזמינו עכשיו ותיהנו מהאוכל הכי טעים, הכי טרי והכי נוח באור יהודה.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/order" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                הזמינו עכשיו
              </a>
              <a href="/contact" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
                צרו קשר
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
} 