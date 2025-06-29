'use client';

import Image from 'next/image';

export default function KosherStamp() {
  return (
    <>
      <style>{`
        .kosher-stamp {
          width: 60px;
          height: 60px;
          position: relative;
          margin-right: 12px;
        }
        @media (max-width: 640px) {
          .kosher-stamp {
            width: 45px;
            height: 45px;
            margin-right: 8px;
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