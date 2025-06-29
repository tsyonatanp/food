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
          display: flex;
          align-items: center;
          justify-content: center;
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
          width={60}
          height={60}
          priority
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
    </>
  );
} 