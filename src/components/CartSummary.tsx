'use client'

import { useCart } from '@/contexts/CartContext'
import { FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'

export default function CartSummary() {
  const { state, removeItem, updateWeight, updateQuantity } = useCart()
  const { items, total, deliveryFee } = state
  const [isExpanded, setIsExpanded] = useState(false)

  const freeDeliveryThreshold = Number(process.env.FREE_DELIVERY_THRESHOLD) || 500
  const actualDeliveryFee = total >= freeDeliveryThreshold ? 0 : deliveryFee
  const finalTotal = total + actualDeliveryFee

  return (
    <div className="bg-white p-4 lg:rounded-lg lg:shadow-md lg:sticky lg:top-4" role="region" aria-label="סיכום הזמנה">
      <h2 className="text-xl font-semibold mb-4 hidden lg:block">סיכום הזמנה</h2>
      
      {items.length === 0 ? (
        <div className="lg:py-8 lg:text-center">
          <p className="text-gray-500 lg:py-8" aria-live="polite">העגלה ריקה</p>
        </div>
      ) : (
        <>
          {/* תצוגה מקוצרת במובייל */}
          <div className="lg:hidden">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">{items.length} פריטים</span>
              <span className="font-semibold">₪{finalTotal.toFixed(2)}</span>
            </div>
            
            {/* כפתור הרחבה */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex justify-between items-center py-2 text-sm text-gray-600 border-t border-gray-200"
            >
              <span>פרטי הזמנה</span>
              {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
            </button>

            {/* פרטי הזמנה מורחבים */}
            {isExpanded && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 text-sm">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        {item.isByWeight ? (
                          <>
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="number"
                                min="100"
                                max="1000"
                                step="50"
                                value={item.weight}
                                onChange={(e) => updateWeight(item.id, parseInt(e.target.value))}
                                className="input w-16 py-1 text-xs"
                              />
                              <span className="text-xs text-gray-500">גרם</span>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              ₪{((item.weight || 0) * (item.pricePerGram || 0)).toFixed(2)}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                className="input w-16 py-1 text-xs"
                              />
                              <span className="text-xs text-gray-500">יחידות</span>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              ₪{item.estimatedUnitPrice && item.quantity ? (item.estimatedUnitPrice * item.quantity).toFixed(2) : ((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                            </div>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors text-xs"
                        aria-label={`הסר את ${item.name} מהעגלה`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-1 text-sm border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span>סכום ביניים:</span>
                    <span>₪{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
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
                    <div className="text-xs text-gray-600">
                      הוסף עוד ₪{(freeDeliveryThreshold - total).toFixed(2)} למשלוח חינם
                    </div>
                  )}
                </div>
              </div>
            )}

            <Link
              href="/checkout"
              className="btn-primary w-full text-center py-3 mt-3"
              aria-label="המשך לתשלום"
            >
              המשך לתשלום
            </Link>
          </div>

          {/* תצוגה מלאה בדסקטופ */}
          <div className="hidden lg:block">
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
          </div>
        </>
      )}
    </div>
  )
} 