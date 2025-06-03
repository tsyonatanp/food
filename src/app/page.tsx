"use client";

import Banner from '@/components/Banner';
import CategoriesGrid from '@/components/CategoriesGrid';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Banner />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">תפריט המסעדה</h1>
        <p className="text-center text-gray-600 mb-12">בחר קטגוריה להזמנה</p>
        <CategoriesGrid />
      </div>
    </main>
  );
} 