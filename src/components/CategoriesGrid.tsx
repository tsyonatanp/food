"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchCategories } from '@/lib/fetchCategories';

interface Category {
  name: string;
  image: string;
  description: string;
  checkboxes?: boolean | string | number;
}

export default function CategoriesGrid() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        console.log('Fetched categories:', data);
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/order?category=${encodeURIComponent(categoryName)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, categoryName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCategoryClick(categoryName);
    }
  };

  if (loading) {
    return (
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4" role="region" aria-label="טעינת קטגוריות">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" aria-hidden="true" />
        ))}
      </section>
    );
  }

  const enabledCategories = categories.filter((category) => {
    const val = String(category.checkboxes).toLowerCase().trim();
    return val === 'true' || val === '1' || val === 'checked';
  });

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4" role="region" aria-label="בחר קטגוריה להזמנה">
      {enabledCategories.map((category) => (
        <button
          key={category.name}
          onClick={() => handleCategoryClick(category.name)}
          onKeyDown={(e) => handleKeyDown(e, category.name)}
          className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 focus:scale-105"
          aria-label={`בחר קטגוריה: ${category.name}. ${category.description}`}
          role="button"
          tabIndex={0}
        >
          <div className="aspect-square relative">
            <Image
              src={category.image}
              alt={`תמונה של ${category.name}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="text-sm opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                {category.description}
              </p>
            </div>
          </div>
        </button>
      ))}
      {enabledCategories.length === 0 && (
        <div className="col-span-full text-center py-8" role="status" aria-live="polite">
          <p className="text-gray-500">לא נמצאו קטגוריות זמינות</p>
        </div>
      )}
    </section>
  );
} 