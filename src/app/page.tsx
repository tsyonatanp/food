"use client";

import { useEffect, useState } from 'react';
import CategoriesGrid from '@/components/CategoriesGrid';
import CartSummary from '@/components/CartSummary';
import { fetchTitle } from '@/lib/fetchTitle';
import { fetchSheleg } from '@/lib/fetchSheleg';
import ShelegCarousel from '@/components/ShelegCarousel';

export default function HomePage() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchTitle().then(data => {
      // ניקח את הערך הראשון בעמודה 'פרסום'
      setTitle(data[0]?.['פרסום'] || '');
      setLoading(false);
    });
    fetchSheleg().then(data => {
      console.log('sheleg images:', data);
      setImages(data);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-32 lg:pb-0">
      <div className="container mx-auto py-12">
        {images.length > 0 ? (
          <ShelegCarousel images={images} />
        ) : (
          <div className="flex flex-col items-center mb-8 min-h-[2.5rem]">
            <h1 className="text-4xl font-bold text-center">
              {loading ? (
                <span className="inline-block bg-gray-200 rounded w-40 h-8 animate-pulse"></span>
              ) : (
                title
              )}
            </h1>
            <p className="text-red-500 mt-2 text-center text-sm">לא נמצאה תמונה בגליון sheleg או שיש בעיה בטעינה. בדוק את הקישור בגליון ואת ההרשאות.</p>
          </div>
        )}
        <p className="text-center text-gray-600 mb-12">בחר קטגוריה להזמנה</p>
        <CategoriesGrid />
      </div>
      
      {/* עגלה קבועה בתחתית במובייל */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg lg:hidden z-50">
        <CartSummary />
      </div>
    </main>
  );
} 