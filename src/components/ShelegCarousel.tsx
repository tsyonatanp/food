'use client';
import { useEffect, useState } from 'react';

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

  return (
    <div className="w-full flex justify-center my-6">
      <img
        src={images[index]}
        alt="שלג - אוכל מוכן"
        className="rounded-xl shadow-lg max-h-64 object-contain"
        style={{ maxWidth: 400 }}
      />
    </div>
  );
} 