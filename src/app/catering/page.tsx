'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import StructuredData from '@/components/StructuredData';

interface CateringMenu {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  items: {
    category: string;
    options: string[];
    required: number;
  }[];
}

const cateringMenus: CateringMenu[] = [
  {
    id: 'catering-1',
    name: 'תפריט 1 - דגים',
    description: 'תפריט דגים מלא עם סלטים ותוספות',
    basePrice: 45,
    items: [
      {
        category: 'סלטים',
        options: ['סלט יווני', 'סלט וולדורף', 'סלט אנטיפסטי', 'סלט ירקות', 'סלט כרוב וגזר', 'סלט מיונז'],
        required: 6
      },
      {
        category: 'דגים',
        options: ['אמנון מטוגן', 'אמנון מבושל', 'לברק', 'נסיכה', 'טונה', 'סלמון'],
        required: 4
      },
      {
        category: 'תוספות',
        options: ['אורז לבן', 'אורז צהוב', 'פתיתים', 'קוסקוס', 'תפוחי אדמה', 'בורגול'],
        required: 3
      }
    ]
  },
  {
    id: 'catering-2', 
    name: 'תפריט 2 - דגים ועופות',
    description: 'תפריט משולב דגים ועופות עם סלטים',
    basePrice: 55,
    items: [
      {
        category: 'סלטים',
        options: ['סלט יווני', 'סלט וולדורף', 'סלט אנטיפסטי', 'סלט ירקות', 'סלט כרוב וגזר', 'סלט מיונז'],
        required: 6
      },
      {
        category: 'דגים',
        options: ['אמנון', 'לברק', 'נסיכה', 'טונה', 'סלמון'],
        required: 4
      },
      {
        category: 'עופות',
        options: ['חזה עוף בגריל', 'כנפיים', 'פרגיות', 'שניצל עוף', 'עוף ברוטב'],
        required: 2
      },
      {
        category: 'תוספות',
        options: ['אורז לבן', 'אורז צהוב', 'פתיתים', 'קוסקוס', 'תפוחי אדמה', 'בורגול'],
        required: 3
      }
    ]
  },
  {
    id: 'catering-3',
    name: 'תפריט 3 - דגים ובשרים',
    description: 'תפריט מלא עם דגים, בשרים וסלטים',
    basePrice: 65,
    items: [
      {
        category: 'סלטים',
        options: ['סלט יווני', 'סלט וולדורף', 'סלט אנטיפסטי', 'סלט ירקות', 'סלט כרוב וגזר', 'סלט מיונז'],
        required: 6
      },
      {
        category: 'דגים',
        options: ['אמנון', 'לברק', 'נסיכה', 'טונה', 'סלמון'],
        required: 3
      },
      {
        category: 'תוספות',
        options: ['אורז לבן', 'אורז צהוב', 'פתיתים', 'קוסקוס', 'תפוחי אדמה', 'בורגול'],
        required: 3
      },
      {
        category: 'בשרים',
        options: ['קציצות בשר', 'קבב', 'צלי בקר', 'בשר ברוטב', 'בשר בגריל'],
        required: 3
      }
    ]
  }
];

export default function CateringPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{[key: string]: string[]}>({});

  const handleMenuSelect = (menuId: string) => {
    setSelectedMenu(menuId);
    setShowOrderForm(true);
    // Initialize selected items for this menu
    const menu = cateringMenus.find(m => m.id === menuId);
    if (menu) {
      const initialSelections: {[key: string]: string[]} = {};
      menu.items.forEach(item => {
        initialSelections[item.category] = [];
      });
      setSelectedItems(initialSelections);
    }
  };

  const handleItemToggle = (category: string, item: string) => {
    const menu = cateringMenus.find(m => m.id === selectedMenu);
    if (!menu) return;

    const categoryConfig = menu.items.find(i => i.category === category);
    if (!categoryConfig) return;

    setSelectedItems(prev => {
      const current = prev[category] || [];
      let newSelection: string[];

      if (current.includes(item)) {
        // Remove item
        newSelection = current.filter(i => i !== item);
      } else {
        // Add item if we haven't reached the limit
        if (current.length < categoryConfig.required) {
          newSelection = [...current, item];
        } else {
          // Replace the last item
          newSelection = [...current.slice(1), item];
        }
      }

      return {
        ...prev,
        [category]: newSelection
      };
    });
  };

  const isSelectionValid = () => {
    if (!selectedMenu) return false;
    
    const menu = cateringMenus.find(m => m.id === selectedMenu);
    if (!menu) return false;

    return menu.items.every(item => {
      const selected = selectedItems[item.category] || [];
      return selected.length === item.required;
    });
  };

  const handleAddToCart = () => {
    if (!selectedMenu || !isSelectionValid()) return;
    
    const menu = cateringMenus.find(m => m.id === selectedMenu);
    if (!menu) return;

    // Create description of selected items
    const selections = menu.items.map(item => {
      const selected = selectedItems[item.category] || [];
      return `${item.category}: ${selected.join(', ')}`;
    }).join(' | ');

    addItem({
      id: Date.now(), // Unique ID
      name: `${menu.name} - קייטרינג`,
      quantity: quantity,
      price: menu.basePrice,
      isByWeight: false,
      area: 'קייטרינג',
      notes: selections // Store selections as notes
    });

    // Reset form
    setSelectedMenu(null);
    setQuantity(1);
    setShowOrderForm(false);
    setSelectedItems({});
    
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
                    ₪{menu.basePrice}
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
                        <span className="text-gray-700">
                          {item.required} סוגי {item.category}
                        </span>
                      </li>
                    ))}
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">לחמניות</span>
                    </li>
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
              <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  הזמנת קייטרינג - בחירת פריטים
                </h3>
                
                {/* Menu Selection */}
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

                {/* Item Selection */}
                <div className="mb-6">
                  {cateringMenus.find(m => m.id === selectedMenu)?.items.map((item, index) => (
                    <div key={index} className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        {item.category} - בחר {item.required} סוגים:
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {item.options.map((option) => {
                          const isSelected = (selectedItems[item.category] || []).includes(option);
                          const selectedCount = (selectedItems[item.category] || []).length;
                          const isDisabled = !isSelected && selectedCount >= item.required;
                          
                          return (
                            <button
                              key={option}
                              onClick={() => handleItemToggle(item.category, option)}
                              disabled={isDisabled}
                              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                                isSelected
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : isDisabled
                                  ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                  : 'border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        נבחרו: {(selectedItems[item.category] || []).length} / {item.required}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>סה"כ לתשלום:</strong> ₪{cateringMenus.find(m => m.id === selectedMenu)?.basePrice! * quantity}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowOrderForm(false);
                      setSelectedMenu(null);
                      setQuantity(1);
                      setSelectedItems({});
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    ביטול
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={!isSelectionValid()}
                    className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                      isSelectionValid()
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
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
