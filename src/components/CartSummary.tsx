'use client'

import { useCart } from '@/contexts/CartContext'
import { FaTrash, FaChevronUp, FaChevronDown, FaTimes, FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'

export default function CartSummary() {
  const { state, removeItem, updateWeight, updateQuantity } = useCart()
  const { items, total, deliveryFee } = state
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const freeDeliveryThreshold = Number(process.env.FREE_DELIVERY_THRESHOLD) || 500
  const actualDeliveryFee = total >= freeDeliveryThreshold ? 0 : deliveryFee
  const finalTotal = total + actualDeliveryFee

  return (
    <>
      {/* Mobile cart button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="פתח עגלה"
        >
          <div className="relative">
            <FaShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Mobile cart drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">סיכום הזמנה</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="סגור עגלה"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">העגלה ריקה</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 border-b pb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          {item.isByWeight ? (
                            <>
                              <div className="flex items-center gap-2 mt-1">
                                <input
                                  type="number"
                                  min="100"
                                  max="2000"
                                  step="50"
                                  value={item.weight}
                                  onChange={(e) => updateWeight(item.id, parseInt(e.target.value))}
                                  className="input w-20 py-1 text-sm"
                                />
                                <span className="text-sm text-gray-500 unit-label" style={{wordBreak: 'break-word', whiteSpace: 'normal'}}>גרם</span>
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                ₪{((item.weight || 0) * (item.pricePerGram || 0)).toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2 mt-1">
                                <input
                                  type="number"
                                  min="1"
                                  max="50"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                  className="input w-16 py-1 text-sm"
                                />
                                <span className="text-sm text-gray-500 unit-label" style={{wordBreak: 'break-word', whiteSpace: 'normal'}}>יחידות</span>
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                ₪{item.estimatedUnitPrice && item.quantity ? (item.estimatedUnitPrice * item.quantity).toFixed(2) : ((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                              </div>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                          aria-label={`הסר את ${item.name} מהעגלה`}
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-4 space-y-3">
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
                    <div className="text-xs text-gray-600">
                      הוסף עוד ₪{(freeDeliveryThreshold - total).toFixed(2)} למשלוח חינם
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg pt-2">
                    <span>סה"כ:</span>
                    <span>₪{finalTotal.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setIsDrawerOpen(false)}
                    className="btn-primary w-full text-center py-3"
                    aria-label="המשך לתשלום"
                  >
                    המשך לתשלום
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop cart */}
      <div className="hidden lg:block bg-white p-4 rounded-lg shadow-md sticky top-4" role="region" aria-label="סיכום הזמנה">
        <h2 className="text-xl font-semibold mb-4">סיכום הזמנה</h2>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500" aria-live="polite">העגלה ריקה</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.name}</h3>
                    {item.isByWeight ? (
                      <>
                        <label htmlFor={`cart-weight-input-${item.id}`} className="sr-only">בחר משקל בגרם עבור {item.name}</label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            id={`cart-weight-input-${item.id}`}
                            type="number"
                            min="100"
                            max="2000"
                            step="50"
                            value={item.weight}
                            onChange={(e) => updateWeight(item.id, parseInt(e.target.value))}
                            className="input w-28 md:w-32 lg:w-36 py-1"
                            aria-label={`בחר משקל בגרם עבור ${item.name}`}
                          />
                          <span className="text-sm text-gray-500 unit-label" style={{wordBreak: 'break-word', whiteSpace: 'normal', minWidth: '4.5rem', display: 'inline-block'}}>גרם</span>
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
                            max="50"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="input w-24 md:w-28 lg:w-32 py-1"
                            aria-label={`בחר כמות עבור ${item.name}`}
                          />
                          <span className="text-sm text-gray-500 unit-label" style={{wordBreak: 'break-word', whiteSpace: 'normal', minWidth: '4.5rem', display: 'inline-block'}}>יחידות</span>
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
                    className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
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
    </>
  )
} 