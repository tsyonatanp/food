'use client'

import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'

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
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export default function MenuFilters({ selectedCategory, setSelectedCategory, selectedTags, setSelectedTags }: MenuFiltersProps) {
  const handleCategoryChange = (category: { id: string; name: string }) => {
    setSelectedCategory(category.id);
  };
  const toggleTag = (tagId: string) => {
    let newTags: string[];
    if (selectedTags.includes(tagId)) {
      newTags = selectedTags.filter(id => id !== tagId);
    } else {
      newTags = [...selectedTags, tagId];
    }
    setSelectedTags(newTags);
  };
  const selectedCatObj = categories.find(c => c.id === selectedCategory) || categories[0];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Listbox value={selectedCatObj} onChange={handleCategoryChange}>
          <Listbox.Button className="input flex items-center justify-between">
            <span>{selectedCatObj.name}</span>
            <FaChevronDown className="text-gray-400" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
            {categories.map((category) => (
              <Listbox.Option
                key={category.id}
                value={category}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 px-4 ${
                    active ? 'bg-primary-50 text-primary-900' : 'text-gray-900'
                  }`
                }
              >
                {category.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedTags.includes(tag.id)
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
} 