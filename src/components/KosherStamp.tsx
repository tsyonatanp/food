'use client';

import Image from 'next/image';

export default function KosherStamp() {
  return (
    <>
      <style>{`
        .kosher-stamp {
          width: 40px;
          height: 40px;
          position: relative;
          margin-right: 8px;
        }
        @media (max-width: 640px) {
          .kosher-stamp {
            width: 32px;
            height: 32px;
            margin-right: 4px;
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