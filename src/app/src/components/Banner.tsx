'use client'

import { useState, useEffect } from 'react'

const promotions = [
  {
    id: 1,
    text: 'משלוח חינם בהזמנה מעל 500 גרם! 🚚',
    bgColor: 'bg-primary-500',
  },
  {
    id: 2,
    text: 'מבצע השבוע: 20% הנחה על תבשילי בשר! 🥩',
    bgColor: 'bg-secondary-500',
  },
]

export default function Banner() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromoIndex((prev: number) => (prev + 1) % promotions.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const currentPromo = promotions[currentPromoIndex]

  return (
    <div 
      className={`${currentPromo.bgColor} text-white py-3 text-center transition-colors duration-500`}
    >
      <div className="container">
        <p className="text-lg font-medium">{currentPromo.text}</p>
      </div>
    </div>
  )
} 