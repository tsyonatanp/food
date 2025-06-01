'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import MenuItems from './MenuItems'

interface FoodItem {
  id: number
  name: string
  description: string
  pricePerGram: number
  imageUrl: string
  category: string
  tags: string[]
}

interface MenuItem {
  קטגוריה: string
  מנה: string
  'מחיר (₪)': string
  צמחוני: string
  'ללא גלוטן': string
}

const popularItems: FoodItem[] = [
  {
    id: 1,
    name: 'עוף בגריל',
    description: 'עוף טרי בתיבול ביתי צלוי בגריל',
    pricePerGram: 0.08,
    imageUrl: '/images/grilled-chicken.jpg',
    category: 'עוף',
    tags: ['פופולרי', 'ללא גלוטן']
  },
  {
    id: 2,
    name: 'קציצות ברוטב',
    description: 'קציצות בקר ברוטב עגבניות ביתי',
    pricePerGram: 0.12,
    imageUrl: '/images/meatballs.jpg',
    category: 'בשר',
    tags: ['פופולרי']
  },
  {
    id: 3,
    name: 'אורז לבן',
    description: 'אורז בסמטי מבושל בניחוח הל',
    pricePerGram: 0.04,
    imageUrl: '/images/white-rice.jpg',
    category: 'תוספות',
    tags: ['צמחוני', 'ללא גלוטן']
  }
]

export default function PopularItems({ items }: { items: MenuItem[] }) {
  const [selectedWeights, setSelectedWeights] = useState<Record<number, number>>({})

  const handleWeightChange = (itemId: number, weight: number) => {
    setSelectedWeights((prev: Record<number, number>) => ({
      ...prev,
      [itemId]: weight
    }))
  }

  return (
    <MenuItems items={items} />
  )
} 