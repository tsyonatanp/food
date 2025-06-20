'use client'

import { useCart } from '@/contexts/CartContext'
import { FaTrash } from 'react-icons/fa'
import Link from 'next/link'

export default function CartSummary() {
  const { state, removeItem, updateWeight, updateQuantity } = useCart()
  const { items, total, deliveryFee } = state

  const freeDeliveryThreshold = Number(process.env.FREE_DELIVERY_THRESHOLD) || 500
  const actualDeliveryFee = total >= freeDeliveryThreshold ? 0 : deliveryFee
  const finalTotal = total + actualDeliveryFee

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sticky top-4" role="region" aria-label="סיכום הזמנה">
      <h2 className="text-xl font-semibold mb-4">סיכום הזמנה</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8" aria-live="polite">העגלה ריקה</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.isByWeight ? (
                    <>
                      <label htmlFor={`cart-weight-input-${item.id}`} className="sr-only">בחר משקל בגרם עבור {item.name}</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          id={`cart-weight-input-${item.id}`}
                          type="number"
                          min="100"
                          max="1000"
                          step="50"
                          value={item.weight}
                          onChange={(e) => updateWeight(item.id, parseInt(e.target.value))}
                          className="input w-20 py-1"
                          aria-label={`בחר משקל בגרם עבור ${item.name}`}
                        />
                        <span className="text-sm text-gray-500">גרם</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        ₪{((item.weight || 0) * (item.pricePerGram || 0)).toFixed(2)}
                      </div>
                    </>
                  ) : (
                    <>
                      <label htmlFor={`cart-quantity-input-${item.id}`} className="sr-only">בחר כמות עבור {item.name}</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          id={`cart-quantity-input-${item.id}`}
                          type="number"
                          min="1"
                          max="10"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="input w-20 py-1"
                          aria-label={`בחר כמות עבור ${item.name}`}
                        />
                        <span className="text-sm text-gray-500">יחידות</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        ₪{item.estimatedUnitPrice && item.quantity ? (item.estimatedUnitPrice * item.quantity).toFixed(2) : ((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                        {item.averageWeightPerUnit && item.estimatedUnitPrice ? (
                          <>
                            <br />
                            <span className="text-xs text-gray-500">
                              (הערכה: {item.quantity! * item.averageWeightPerUnit} גרם, מחיר משוער: ₪{(item.estimatedUnitPrice * item.quantity!).toFixed(2)})
                            </span>
                          </>
                        ) : null}
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label={`הסר את ${item.name} מהעגלה`}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>סכום ביניים:</span>
              <span>₪{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>דמי משלוח:</span>
              <span>
                {actualDeliveryFee === 0 ? (
                  <span className="text-green-600">חינם!</span>
                ) : (
                  `₪${actualDeliveryFee.toFixed(2)}`
                )}
              </span>
            </div>
            {total < freeDeliveryThreshold && (
              <div className="text-sm text-gray-600">
                הוסף עוד ₪{(freeDeliveryThreshold - total).toFixed(2)} למשלוח חינם
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>סה"כ:</span>
              <span>₪{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="btn-primary w-full text-center mt-6"
            aria-label="המשך לתשלום"
          >
            המשך לתשלום
          </Link>
        </>
      )}
    </div>
  )
} 