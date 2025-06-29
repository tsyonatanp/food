'use client';

import Image from 'next/image';

export default function KosherStamp() {
  return (
    <>
      <style>{`
        .kosher-stamp {
          position: fixed;
          left: 20px;
          bottom: 80px;
          z-index: 50;
          width: 80px;
          height: 80px;
        }
        @media (max-width: 640px) {
          .kosher-stamp {
            width: 60px;
            height: 60px;
            left: 10px;
            bottom: 70px;
          }
        }
      `}</style>
      <div className="kosher-stamp">
        <Image
          src="/images/kosher-stamp.png"
          alt="תעודת כשרות"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </>
  );
} 