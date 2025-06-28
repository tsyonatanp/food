'use client'

import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'

// TODO: Replace static categories with dynamic fetch from Google Sheets and filter by enabled field
const categories = [
  { id: 'all', name: 'הכל' },
  { id: 'meat', name: 'בשר' },
  { id: 'chicken', name: 'עוף' },
  { id: 'fish', name: 'דגים' },
  { id: 'sides', name: 'תוספות' },
  { id: 'salads', name: 'סלטים' },
]

const tags = [
  { id: 'popular', name: 'פופולרי' },
  { id: 'vegan', name: 'טבעוני' },
  { id: 'vegetarian', name: 'צמחוני' },
  { id: 'gluten-free', name: 'ללא גלוטן' },
  { id: 'spicy', name: 'חריף' },
]

interface MenuFiltersProps {
  onFilterChange: (filters: FilterOptions) => void
}

interface FilterOptions {
  vegetarian: boolean
  glutenFree: boolean
  priceRange: string
}

export default function MenuFilters({ onFilterChange }: MenuFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    vegetarian: false,
    glutenFree: false,
    priceRange: 'all'
  })

  const handleFilterChange = (key: keyof FilterOptions, value: boolean | string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg" role="region" aria-label="פילטרים">
      <fieldset>
        <legend className="text-lg font-semibold mb-4">סינון מנות</legend>
        
        <div className="space-y-4">
          {/* Dietary Preferences */}
          <div role="group" aria-labelledby="dietary-prefs">
            <h3 id="dietary-prefs" className="text-sm font-medium mb-2">העדפות תזונתיות</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.vegetarian}
                  onChange={(e) => handleFilterChange('vegetarian', e.target.checked)}
                  className="mr-2"
                  aria-describedby="vegetarian-desc"
                />
                <span>צמחוני</span>
                <span id="vegetarian-desc" className="sr-only">הצג רק מנות צמחוניות</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.glutenFree}
                  onChange={(e) => handleFilterChange('glutenFree', e.target.checked)}
                  className="mr-2"
                  aria-describedby="gluten-free-desc"
                />
                <span>ללא גלוטן</span>
                <span id="gluten-free-desc" className="sr-only">הצג רק מנות ללא גלוטן</span>
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div role="group" aria-labelledby="price-range">
            <h3 id="price-range" className="text-sm font-medium mb-2">טווח מחירים</h3>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              aria-describedby="price-range-desc"
            >
              <option value="all">כל המחירים</option>
              <option value="low">עד 50 ₪</option>
              <option value="medium">50-100 ₪</option>
              <option value="high">מעל 100 ₪</option>
            </select>
            <div id="price-range-desc" className="sr-only">
              בחר טווח מחירים לסינון המנות
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              const resetFilters = { vegetarian: false, glutenFree: false, priceRange: 'all' }
              setFilters(resetFilters)
              onFilterChange(resetFilters)
            }}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
            aria-label="נקה את כל הפילטרים"
          >
            נקה פילטרים
          </button>
        </div>
      </fieldset>
    </div>
  )
} 