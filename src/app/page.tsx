"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoriesGrid from '@/components/CategoriesGrid';
import CartSummary from '@/components/CartSummary';
import { fetchTitle } from '@/lib/fetchTitle';
import { fetchSheleg } from '@/lib/fetchSheleg';
import ShelegCarousel from '@/components/ShelegCarousel';
import StructuredData from '@/components/StructuredData';

export default function HomePage() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        // טוען כותרת
        const titleData = await fetchTitle();
        setTitle(titleData[0]?.['פרסום'] || '');
        
        // טוען תמונות
        const imageData = await fetchSheleg();
        setImages(imageData);
      } catch (error) {
        console.error('Error loading page data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
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
    <>
      <StructuredData 
        type="restaurant" 
        data={{}} 
      />
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
              title || 'ברוכים הבאים לשלג-רוז'
            )}
          </h1>
          {loading && (
            <p className="text-gray-500 mt-2 text-center text-sm" role="status" aria-live="polite">
              טוען...
            </p>
          )}
          {!loading && images.length === 0 && (
            <p className="text-gray-600 mt-4 text-center text-lg">
              אוכל מוכן טרי במשלוח עד הבית
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
    </>
  );
} 