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
  averageWeightPerUnit?: number // משקל ממוצע ליחידה
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
      // אם יש averageWeightPerUnit, נחשב גם משקל משוער ומחיר לגרם
      if (item.averageWeightPerUnit) {
        const estimatedUnitPrice = (item.averageWeightPerUnit / 100) * Number(item['מחיר (₪)'])
        addItem({
          id,
          name: item.מנה,
          quantity,
          estimatedUnitPrice, // מחיר ליחידה משוער
          averageWeightPerUnit: item.averageWeightPerUnit, // משקל ממוצע ליחידה
          isByWeight: false
        })
      } else {
        addItem({
          id,
          name: item.מנה,
          quantity,
          price: Number(item['מחיר (₪)']), // מחיר ליחידה
          isByWeight: false
        })
      }
    }
  }

  // סינון לפי checkboxes
  const filteredItems = items.filter(item => {
    return item.checkboxes === true || item.checkboxes === 'TRUE' || item.checkboxes === 'true';
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item) => {
        const isByWeight = item['סוג מכירה'] !== 'יחידה';
        const weight = selectedWeights[item.מנה] ?? 100;
        const quantity = selectedQuantities[item.מנה] ?? 1;

        return (
          <div key={item.מנה} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative h-48">
              {item.תמונה ? (
                <Image
                  src={item.תמונה}
                  alt={item.מנה}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-200 w-full h-48 flex items-center justify-center text-gray-400">אין תמונה</div>
              )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{item.מנה}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">
                    {isByWeight ? (
                      `₪${item['מחיר (₪)']} / 100 גרם`
                    ) : (
                      item.averageWeightPerUnit ?
                        `₪${((item.averageWeightPerUnit / 100) * Number(item['מחיר (₪)'])).toFixed(2)} ליחידה`
                        : `₪${item['מחיר (₪)']} ליחידה`
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

                {!isByWeight && item.averageWeightPerUnit && (
                  <div className="text-xs text-black mb-2 flex flex-col gap-0.5">
                    <div>מחיר ל-100 גרם: ₪{item['מחיר (₪)']}</div>
                    <div>משקל ממוצע ליחידה: {item.averageWeightPerUnit} גרם</div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 items-stretch mt-auto">
                <div className="flex items-center gap-2 w-full">
                  {isByWeight ? (
                    <>
                      <button type="button" className="btn-secondary px-2 py-1 text-lg" onClick={() => handleWeightChange(item.מנה, Math.max(100, weight - 50))} disabled={weight <= 100}>
                        <FaMinus />
                      </button>
                      <input type="number" min={100} max={1000} step={50} value={weight} onChange={(e) => handleWeightChange(item.מנה, parseInt(e.target.value))} className="input w-24 text-center" />
                      <button type="button" className="btn-secondary px-2 py-1 text-lg" onClick={() => handleWeightChange(item.מנה, Math.min(1000, weight + 50))} disabled={weight >= 1000}>
                        <FaPlus />
                      </button>
                      <span className="text-gray-500">גרם</span>
                    </>
                  ) : (
                    <>
                      <button type="button" className="btn-secondary px-2 py-1 text-lg" onClick={() => handleQuantityChange(item.מנה, Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                        <FaMinus />
                      </button>
                      <input type="number" min={1} max={10} step={1} value={quantity} onChange={(e) => handleQuantityChange(item.מנה, parseInt(e.target.value))} className="input w-24 text-center" />
                      <button type="button" className="btn-secondary px-2 py-1 text-lg" onClick={() => handleQuantityChange(item.מנה, Math.min(10, quantity + 1))} disabled={quantity >= 10}>
                        <FaPlus />
                      </button>
                      <span className="text-gray-500">יחידות</span>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => handleAddToCart(item)}
                >
                  הוספה להזמנה
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}