'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
        <Image
          src={images[index]}
          alt={`שלג - אוכל מוכן, תמונה ${index + 1} מתוך ${images.length}`}
          width={400}
          height={256}
          className="rounded-xl shadow-lg w-full h-48 sm:h-64 object-cover"
          priority={index === 0}
          quality={50}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 400px"
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