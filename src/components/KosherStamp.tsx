'use client';

import Image from 'next/image';

export default function KosherStamp() {
  return (
    <>
      <style>{`
        .kosher-stamp {
          width: 80px;
          height: 80px;
          position: relative;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 4px;
        }
        @media (max-width: 640px) {
          .kosher-stamp {
            width: 60px;
            height: 60px;
            margin-right: 8px;
          }
        }
        .kosher-stamp img {
          border-radius: 50%;
        }
      `}</style>
      <div className="kosher-stamp">
        <Image
          src="/images/kosher-stamp.png"
          alt="תעודת כשרות"
          width={80}
          height={80}
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