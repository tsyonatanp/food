"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchCategories } from '@/lib/fetchCategories';

interface Category {
  name: string;
  image: string;
  description: string;
}

export default function CategoriesGrid() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => router.push(`/order?category=${encodeURIComponent(category.name)}`)}
          className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          <div className="aspect-square relative">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="text-sm opacity-0 transition-opacity group-hover:opacity-100">
                {category.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
} 