"use client";

import { useEffect, useState } from 'react';
import CategoriesGrid from '@/components/CategoriesGrid';
import { fetchTitle } from '@/lib/fetchTitle';

export default function HomePage() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTitle().then(data => {
      // ניקח את הערך הראשון בעמודה 'פרסום'
      setTitle(data[0]?.['פרסום'] || '');
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8 min-h-[2.5rem]">
          {loading ? (
            <span className="inline-block bg-gray-200 rounded w-40 h-8 animate-pulse"></span>
          ) : (
            title
          )}
        </h1>
        <p className="text-center text-gray-600 mb-12">בחר קטגוריה להזמנה</p>
        <CategoriesGrid />
      </div>
    </main>
  );
} 