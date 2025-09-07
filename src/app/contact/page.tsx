import StructuredData from '@/components/StructuredData';

export default function ContactPage() {
  return (
    <>
      <StructuredData type="organization" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          יצירת קשר 📞
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* פרטי התקשרות */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">
              פרטי התקשרות
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-600">📞 טלפון</h3>
              <p className="text-lg">050-XXXXXXX</p>
              <p className="text-sm text-gray-600">זמין 24/7</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-600">💬 ווטסאפ</h3>
              <p className="text-lg">050-XXXXXXX</p>
              <p className="text-sm text-gray-600">עדכונים מיידיים</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-600">📧 אימייל</h3>
              <p className="text-lg">info@shelagroz.co.il</p>
              <p className="text-sm text-gray-600">תגובה תוך 24 שעות</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-600">📍 כתובת</h3>
              <p className="text-lg">בקעת אונו, רחובות, כפר הנוער, בן שמן ומצליח, ישראל</p>
              <p className="text-sm text-gray-600">משלוחים בכל רחבי האזור</p>
            </div>
          </div>
          
          {/* שעות פעילות */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">
              שעות פעילות
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">🕒 ימי פעילות</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>ראשון - חמישי:</span>
                  <span className="font-semibold">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>שישי:</span>
                  <span className="font-semibold">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>שבת:</span>
                  <span className="font-semibold text-gray-500">סגור</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">🚚 זמני הזמנה ומשלוח</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>הזמנה עד:</span>
                  <span className="font-semibold">חמישי 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>משלוח:</span>
                  <span className="font-semibold">שישי 8:00-12:00</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">💳 אפשרויות תשלום</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Bit</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>PayBox</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>מזומן</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* רשתות חברתיות */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
            עקבו אחרינו ברשתות החברתיות
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">📘 פייסבוק</h3>
              <p className="text-lg mb-4">שלג-רוז</p>
              <a href="https://www.facebook.com/shelagroz" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                עקבו אחרינו
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4 text-pink-600">📷 אינסטגרם</h3>
              <p className="text-lg mb-4">@shelagroz</p>
              <a href="https://www.instagram.com/shelagroz" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors">
                עקבו אחרינו
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4 text-blue-500">📱 טלגרם</h3>
              <p className="text-lg mb-4">ערוץ שלג-רוז</p>
              <a href="https://t.me/shelagroz" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                הצטרפו לערוץ
              </a>
            </div>
          </div>
        </div>
        
        {/* טופס יצירת קשר */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
            שלחו לנו הודעה
          </h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  שם מלא *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="הכנס את שמך המלא"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  טלפון *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="050-XXXXXXX"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                אימייל
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                נושא *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">בחר נושא</option>
                <option value="order">הזמנה</option>
                <option value="delivery">משלוח</option>
                <option value="payment">תשלום</option>
                <option value="quality">איכות</option>
                <option value="event">אירוע מיוחד</option>
                <option value="other">אחר</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                הודעה *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="כתבו את הודעתכם כאן..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
              >
                שלח הודעה
              </button>
            </div>
          </form>
        </div>
        
        {/* מידע נוסף */}
        <div className="mt-12 text-center bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            למה לבחור בנו?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-600">🍽️ איכות</h3>
              <p className="text-gray-700">חומרי גלם טריים ואיכותיים</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-600">⚡ מהירות</h3>
              <p className="text-gray-700">תגובה תוך 15 דקות</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-600">💝 שירות</h3>
              <p className="text-gray-700">זמינים 24/7 לכל שאלה</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 