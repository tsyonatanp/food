'use client'

import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

interface MenuSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function MenuSearch({ onSearch, placeholder = "חיפוש מנות..." }: MenuSearchProps) {
  const [query, setQuery] = useState('')

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="relative mb-6" role="search">
      <div className="relative">
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          aria-label="חיפוש מנות"
          aria-describedby="search-description"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="נקה חיפוש"
          >
            <FaTimes aria-hidden="true" />
          </button>
        )}
      </div>
      <div id="search-description" className="sr-only">
        הזן שם מנה לחיפוש. התוצאות יתעדכנו בזמן אמת.
      </div>
    </div>
  )
} 