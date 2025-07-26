'use client';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ShelegCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  const goToPrevious = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };



  const goToSlide = (slideIndex: number) => {
    setIndex(slideIndex);
  };

  return (
    <div className="w-full max-w-[400px] px-4 mx-auto" role="region" aria-label="גלריית תמונות שלג">
      <div className="relative">
        {/* Main image */}
        <div className="relative">
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
          
          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 focus:bg-opacity-75"
                aria-label="תמונה קודמת"
              >
                <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 focus:bg-opacity-75"
                aria-label="תמונה הבאה"
              >
                <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Controls */}
        {images.length > 1 && (
          <div className="flex justify-center items-center mt-2 sm:mt-4">
            {/* Slide indicators */}
            <div className="flex space-x-1 space-x-reverse" role="tablist" aria-label="ניווט בין תמונות">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === index ? 'bg-blue-600' : 'bg-gray-300'
                  } hover:bg-gray-400`}
                  aria-label={`עבור לתמונה ${i + 1}`}
                  aria-selected={i === index}
                  role="tab"
                />
              ))}
            </div>
          </div>
        )}

        {/* Status announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          תמונה {index + 1} מתוך {images.length}
        </div>
      </div>
    </div>
  );
} 