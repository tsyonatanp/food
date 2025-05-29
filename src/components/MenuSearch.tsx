'use client'

import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function MenuSearch({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="חפש מנות..."
        className="input pl-10"
      />
      <FaSearch 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
        size={16}
      />
    </form>
  )
} 