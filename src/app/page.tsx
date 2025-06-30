"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoriesGrid from '@/components/CategoriesGrid';
import CartSummary from '@/components/CartSummary';
import { fetchTitle } from '@/lib/fetchTitle';
import { fetchSheleg } from '@/lib/fetchSheleg';
import ShelegCarousel from '@/components/ShelegCarousel';

export default function HomePage() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const router = useRouter();

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

  // פונקציה לטיפול בלחיצות במקום ריק
  const handleEmptySpaceClick = () => {
    const now = Date.now();
    
    // אם עבר יותר מ-3 שניות מהלחיצה האחרונה, מאפסים את המונה
    if (now - lastClickTime > 3000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    
    setLastClickTime(now);
    
    // אם הגענו ל-10 לחיצות, עוברים למחשבון הפרטי
    if (clickCount + 1 >= 10) {
      router.push('/private-calculator');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50" onClick={handleEmptySpaceClick}>
      {/* Hero Section - קרוסלה בראש הדף */}
      {images.length > 0 ? (
        <ShelegCarousel images={images} />
      ) : (
        <div className="flex flex-col items-center mb-8 min-h-[2.5rem]">
          <h1 className="text-4xl font-bold text-center">
            {loading ? (
              <span className="inline-block bg-gray-200 rounded w-40 h-8 animate-pulse" aria-hidden="true"></span>
            ) : (
              title || 'ברוכים הבאים ל-Redy Food'
            )}
          </h1>
          {loading && (
            <p className="text-red-500 mt-2 text-center text-sm" role="status" aria-live="polite">
              לא נמצאה תמונה בגליון sheleg או שיש בעיה בטעינה. בדוק את הקישור בגליון ואת ההרשאות.
            </p>
          )}
        </div>
      )}
      
      {/* Categories Section */}
      <div className="container mx-auto py-12">
        <section role="region" aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="text-center text-gray-600 mb-12 text-xl font-semibold">
            בחר קטגוריה להזמנה
          </h2>
          <CategoriesGrid />
        </section>
      </div>
      
      {/* עגלה צפה במובייל - מוצגת רק ככפתור צף */}
      <div className="lg:hidden">
        <CartSummary />
      </div>
    </main>
  );
} 