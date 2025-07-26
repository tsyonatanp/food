'use client';
import { useEffect, useState } from 'react';

export default function ShelegCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 שניות
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div className="w-full max-w-[400px] px-4 mx-auto" role="region" aria-label="גלריית תמונות שלג">
      <div className="relative">
        {/* Main image */}
        <img
          src={images[index]}
          alt={`שלג - אוכל מוכן, תמונה ${index + 1} מתוך ${images.length}`}
          className="rounded-xl shadow-lg w-full h-48 sm:h-64 object-cover"
          onError={(e) => {
            console.warn(`Failed to load image: ${images[index]}`);
            // אם התמונה לא נטענת, ננסה את התמונה הבאה
            const nextIndex = (index + 1) % images.length;
            if (nextIndex !== index) {
              setIndex(nextIndex);
            }
          }}
        />

        {/* Status announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          תמונה {index + 1} מתוך {images.length}
        </div>
      </div>
    </div>
  );
} 