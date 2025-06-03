'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'

interface MenuItem {
  קטגוריה: string
  מנה: string
  'מחיר (₪)': string
  צמחוני: string
  'ללא גלוטן': string
  תמונה?: string
  'סוג מכירה'?: string // 'משקל' או 'יחידה'
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
      const weight = selectedWeights[item.מנה] || 200
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const isByWeight = item['סוג מכירה'] !== 'יחידה'
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
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {isByWeight ? (
                  <>
                    <label htmlFor={`weight-input-${item.מנה}`} className="sr-only">בחר משקל בגרם עבור {item.מנה}</label>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        id={`weight-input-${item.מנה}`}
                        type="number"
                        min={100}
                        max={1000}
                        step={50}
                        value={selectedWeights[item.מנה] || 200}
                        onChange={(e) => handleWeightChange(item.מנה, parseInt(e.target.value))}
                        className="input w-24"
                        aria-label={`בחר משקל בגרם עבור ${item.מנה}`}
                      />
                      <span className="text-gray-500">גרם</span>
                    </div>
                  </>
                ) : (
                  <>
                    <label htmlFor={`quantity-input-${item.מנה}`} className="sr-only">בחר כמות עבור {item.מנה}</label>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        id={`quantity-input-${item.מנה}`}
                        type="number"
                        min={1}
                        max={10}
                        value={selectedQuantities[item.מנה] || 1}
                        onChange={(e) => handleQuantityChange(item.מנה, parseInt(e.target.value))}
                        className="input w-20"
                        aria-label={`בחר כמות עבור ${item.מנה}`}
                      />
                      <span className="text-gray-500">יחידות</span>
                    </div>
                  </>
                )}
                <button
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 mt-2 sm:mt-0"
                  onClick={() => handleAddToCart(item)}
                  aria-label={`הוסף את ${item.מנה} לעגלה`}
                >
                  <FaPlus size={14} />
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