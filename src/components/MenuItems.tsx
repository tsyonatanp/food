'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'

interface MenuItem {
  קטגוריה: string
  מנה: string
  'מחיר (₪)': string
  צמחוני: string
  'ללא גלוטן': string
  תמונה?: string
  'סוג מכירה'?: string // 'משקל' או 'יחידה'
  checkboxes?: string | boolean
}

export default function MenuItems({ items }: { items: MenuItem[] }) {
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({})
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({})
  const { addItem } = useCart()

  const handleWeightChange = (name: string, weight: number) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [name]: weight
    }))
  }

  const handleQuantityChange = (name: string, quantity: number) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [name]: quantity
    }))
  }

  const handleAddToCart = (item: MenuItem) => {
    const id = item.מנה.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const isByWeight = item['סוג מכירה'] !== 'יחידה'
    
    if (isByWeight) {
      const weight = selectedWeights[item.מנה] || 100
      addItem({
        id,
        name: item.מנה,
        weight,
        pricePerGram: Number(item['מחיר (₪)']) / 100, // מחיר ל-100 גרם
        isByWeight: true
      })
    } else {
      const quantity = selectedQuantities[item.מנה] || 1
      addItem({
        id,
        name: item.מנה,
        quantity,
        price: Number(item['מחיר (₪)']), // מחיר ליחידה
        isByWeight: false
      })
    }
  }

  // סינון לפי checkboxes
  const filteredItems = items.filter(item => {
    // Google Sheets מחזיר TRUE/true/false/FALSE/ריק
    return item.checkboxes === true || item.checkboxes === 'TRUE' || item.checkboxes === 'true';
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item) => {
        const isByWeight = item['סוג מכירה'] !== 'יחידה'
        const weight = selectedWeights[item.מנה] ?? 100
        const quantity = selectedQuantities[item.מנה] ?? 1
        return (
          <div key={item.מנה} className="bg-white rounded-lg shadow-md overflow-hidden" role="region" aria-labelledby={`menu-item-title-${item.מנה}`}>
            {item.תמונה ? (
              <div className="relative h-48">
                <Image
                  src={item.תמונה}
                  alt={item.מנה}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-gray-200 w-full h-48 flex items-center justify-center text-gray-400">אין תמונה</div>
            )}
            <div className="p-4">
              <h3 id={`menu-item-title-${item.מנה}`} className="text-xl font-semibold mb-2">{item.מנה}</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">
                  {isByWeight ? (
                    `₪${item['מחיר (₪)']} / 100 גרם`
                  ) : (
                    `₪${item['מחיר (₪)']} ליחידה`
                  )}
                </span>
                <div className="flex gap-2">
                  {item.צמחוני === 'כן' && (
                    <span className="px-2 py-1 bg-green-100 text-sm rounded-full">צמחוני</span>
                  )}
                  {item['ללא גלוטן'] === 'כן' && (
                    <span className="px-2 py-1 bg-yellow-100 text-sm rounded-full">ללא גלוטן</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 items-stretch">
                <div className="flex items-center gap-2 w-full">
                  {isByWeight ? (
                    <>
                      <button
                        type="button"
                        className="btn-secondary px-2 py-1 text-lg"
                        onClick={() => handleWeightChange(item.מנה, Math.max(100, weight - 50))}
                        aria-label={`הפחת 50 גרם עבור ${item.מנה}`}
                        disabled={weight <= 100}
                      >
                        <FaMinus />
                      </button>
                      <input
                        id={`weight-input-${item.מנה}`}
                        type="number"
                        min={100}
                        max={1000}
                        step={50}
                        value={weight}
                        onChange={(e) => handleWeightChange(item.מנה, parseInt(e.target.value))}
                        className="input w-24 text-center"
                        aria-label={`בחר משקל בגרם עבור ${item.מנה}`}
                      />
                      <button
                        type="button"
                        className="btn-secondary px-2 py-1 text-lg"
                        onClick={() => handleWeightChange(item.מנה, Math.min(1000, weight + 50))}
                        aria-label={`הוסף 50 גרם עבור ${item.מנה}`}
                        disabled={weight >= 1000}
                      >
                        <FaPlus />
                      </button>
                      <span className="text-gray-500">גרם</span>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn-secondary px-2 py-1 text-lg"
                        onClick={() => handleQuantityChange(item.מנה, Math.max(1, quantity - 1))}
                        aria-label={`הפחת יחידה עבור ${item.מנה}`}
                        disabled={quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <input
                        id={`quantity-input-${item.מנה}`}
                        type="number"
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(item.מנה, parseInt(e.target.value))}
                        className="input w-20 text-center"
                        aria-label={`בחר כמות עבור ${item.מנה}`}
                      />
                      <button
                        type="button"
                        className="btn-secondary px-2 py-1 text-lg"
                        onClick={() => handleQuantityChange(item.מנה, Math.min(10, quantity + 1))}
                        aria-label={`הוסף יחידה עבור ${item.מנה}`}
                        disabled={quantity >= 10}
                      >
                        <FaPlus />
                      </button>
                      <span className="text-gray-500">יחידות</span>
                    </>
                  )}
                </div>
                <button
                  className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
                  onClick={() => handleAddToCart(item)}
                  aria-label={`הוסף את ${item.מנה} לעגלה`}
                >
                  <FaPlus size={14} className="text-white" />
                  הוסף לעגלה
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 