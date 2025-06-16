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
        className="rounded-xl shadow-lg object-contain"
        style={{
          width: '100%',
          maxWidth: 400,
          height: 'auto',
          maxHeight: '40vh',
          display: 'block',
        }}
      />
    </div>
  );
} 