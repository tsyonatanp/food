'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import StructuredData from '@/components/StructuredData';

interface CateringMenu {
  id: string;
  name: string;
  description: string;
  items: string[];
  price: number;
  image?: string;
}

const cateringMenus: CateringMenu[] = [
  {
    id: 'catering-1',
    name: 'תפריט 1 - דגים',
    description: 'תפריט דגים מלא עם סלטים ותוספות',
    items: [
      '6 סוגי סלטים',
      'דגים: אמנון מטוגן/מבושל, לברק, נסיכה, טונה',
      '3 תוספות',
      'לחמניות'
    ],
    price: 45
  },
  {
    id: 'catering-2', 
    name: 'תפריט 2 - דגים ועופות',
    description: 'תפריט משולב דגים ועופות עם סלטים',
    items: [
      '6 סוגי סלטים',
      'דגים: אמנון, לברק, נסיכה, טונה',
      '2 סוגי עופות',
      '3 תוספות',
      'לחמניות'
    ],
    price: 55
  },
  {
    id: 'catering-3',
    name: 'תפריט 3 - דגים ובשרים',
    description: 'תפריט מלא עם דגים, בשרים וסלטים',
    items: [
      '6 סוגי סלטים',
      'דגים',
      '3 תוספות',
      '3 סוגי בשרים',
      'לחמניות'
    ],
    price: 65
  }
];

export default function CateringPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleMenuSelect = (menuId: string) => {
    setSelectedMenu(menuId);
    setShowOrderForm(true);
  };

  const handleAddToCart = () => {
    if (!selectedMenu) return;
    
    const menu = cateringMenus.find(m => m.id === selectedMenu);
    if (!menu) return;

    addItem({
      id: Date.now(), // Unique ID
      name: `${menu.name} - קייטרינג`,
      quantity: quantity,
      price: menu.price,
      isByWeight: false,
      area: 'קייטרינג'
    });

    // Reset form
    setSelectedMenu(null);
    setQuantity(1);
    setShowOrderForm(false);
    
    // Show success message
    alert(`תפריט ${menu.name} נוסף לעגלה!`);
  };

  const handleGoToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <>
      <StructuredData type="website" />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎉 קייטרינג לאירועים
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              תפריטים מיוחדים לאירועים, מסיבות ומפגשים משפחתיים. 
              אוכל טרי, טעים ומגוון - מוכן במיוחד עבורכם!
            </p>
          </div>

          {/* Catering Menus Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {cateringMenus.map((menu) => (
              <div 
                key={menu.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Menu Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">{menu.name}</h3>
                  <p className="text-blue-100">{menu.description}</p>
                  <div className="text-3xl font-bold mt-4">
                    ₪{menu.price}
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    מה כלול בתפריט:
                  </h4>
                  <ul className="space-y-2">
                    {menu.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Order Button */}
                  <button
                    onClick={() => handleMenuSelect(menu.id)}
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    הזמן תפריט זה
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Form Modal */}
          {showOrderForm && selectedMenu && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  הזמנת קייטרינג
                </h3>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    כמות תפריטים:
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>סה"כ לתשלום:</strong> ₪{cateringMenus.find(m => m.id === selectedMenu)?.price! * quantity}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowOrderForm(false);
                      setSelectedMenu(null);
                      setQuantity(1);
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    ביטול
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    הוסף לעגלה
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              ℹ️ מידע חשוב
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  🕒 זמני הזמנה:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• הזמנה עד יום חמישי בשעה 20:00</li>
                  <li>• משלוח יום שישי בבוקר</li>
                  <li>• ניתן להזמין מראש לאירועים</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  💰 מחירים ותוספות:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• תוספת סלמון במנה: ₪5</li>
                  <li>• מחיר לא כולל משלוח</li>
                  <li>• משלוח: ₪30</li>
                  <li>• הנחות על הזמנות גדולות</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleGoToCheckout}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                🛒 עבור לתשלום
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
