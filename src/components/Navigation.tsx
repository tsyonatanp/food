'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchLogoUrl } from '@/lib/fetchLogo';
import { FaPhone } from 'react-icons/fa';
import KosherStamp from './KosherStamp';

const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="animate-pulse"
  >
    <path d="M12.04 2.003c-5.514 0-9.973 4.46-9.973 9.973 0 1.756.462 3.478 1.336 4.992l-1.428 5.207 5.352-1.403a10.06 10.06 0 004.713 1.196h.001c5.514 0 9.974-4.46 9.974-9.973s-4.46-9.992-9.975-9.992zm5.827 14.815c-.245.684-1.437 1.34-1.984 1.43-.507.082-1.145.116-1.847-.116-.425-.134-.974-.317-1.681-.622-2.961-1.278-4.885-4.418-5.038-4.633-.145-.214-1.204-1.601-1.204-3.053 0-1.451.763-2.166 1.035-2.45.272-.283.594-.354.792-.354.198 0 .396.002.57.01.184.009.429-.069.672.514.245.592.833 2.047.906 2.195.072.146.12.316.024.53-.095.214-.143.345-.278.532-.134.187-.283.417-.404.56-.134.156-.274.326-.117.64.157.313.698 1.153 1.496 1.868 1.028.914 1.894 1.194 2.21 1.33.314.135.498.113.684-.068.184-.183.79-.921 1.003-1.237.214-.314.428-.262.712-.157.284.105 1.797.85 2.105 1.003.31.156.517.23.594.36.077.128.077.743-.168 1.428z"/>
  </svg>
);

const navLinks = [
  { name: 'משלוחים ואיזורי חלוקה', href: '/delivery' },
  { name: 'עלינו', href: '/about' },
  { name: 'שאלות ותשובות', href: '/faq' },
  { name: 'שרות לקוחות', href: '/support' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>('/logo.png');

  useEffect(() => {
    fetchLogoUrl().then(setLogoUrl).catch(() => setLogoUrl('/logo.png'));
  }, []);

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:050-9555755';
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full" role="navigation" aria-label="ניווט ראשי">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Desktop menu */}
          <div className="hidden w-full sm:flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-8">
              <Link href="/delivery" className="text-gray-900 hover:text-gray-600 font-medium text-base">משלוחים ואיזורי חלוקה</Link>
              <Link href="/catering" className="text-gray-900 hover:text-gray-600 font-medium text-base">🎉 קייטרינג</Link>
              <Link href="/about" className="text-gray-900 hover:text-gray-600 font-medium text-base">עלינו</Link>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center gap-2">
              <KosherStamp />
              <Link href="/" aria-label="דף הבית">
                <Image 
                  src={logoUrl} 
                  alt="לוגו" 
                  width={45} 
                  height={48} 
                  priority 
                  quality={60}
                  style={{
                    aspectRatio: '45/48',
                    objectFit: 'contain'
                  }}
                />
              </Link>
            </div>
            <div className="flex items-center space-x-reverse space-x-8">
              <Link href="/faq" className="text-gray-900 hover:text-gray-600 font-medium text-base">שאלות ותשובות</Link>
              <Link href="/support" className="text-gray-900 hover:text-gray-600 font-medium text-base">שרות לקוחות</Link>
              <Link href="/terms" className="text-gray-900 hover:text-gray-600 font-medium text-base">תקנון</Link>
              <Link href="/accessibility-statement" className="text-gray-900 hover:text-gray-600 font-medium text-base">הצהרת נגישות</Link>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="flex items-center sm:hidden w-full justify-between">
            {/* WhatsApp button on the left */}
            <a
              href="https://wa.me/972509555755"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-6 text-green-600 hover:text-green-700 transition-colors duration-200"
              aria-label="הזמן בוואטסאפ"
              title="הזמן בוואטסאפ"
            >
              <WhatsappIcon />
            </a>
            
            {/* Logo in center */}
            <div className="flex items-center justify-center gap-1">
              <KosherStamp />
              <Link href="/" className="flex-shrink-0 flex items-center justify-center" aria-label="דף הבית">
                <Image 
                  src={logoUrl} 
                  alt="לוגו" 
                  width={40} 
                  height={43} 
                  priority 
                  quality={60}
                  style={{
                    aspectRatio: '40/43',
                    objectFit: 'contain'
                  }}
                />
              </Link>
            </div>
            
            {/* Menu button on the right */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="sm:hidden bg-white border-t" role="menu" aria-label="תפריט ניווט">
          <div className="flex flex-col items-center py-2 space-y-2">
            <Link href="/delivery" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">משלוחים ואיזורי חלוקה</Link>
            <Link href="/catering" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">🎉 קייטרינג</Link>
            <Link href="/about" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">עלינו</Link>
            <Link href="/faq" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">שאלות ותשובות</Link>
            <Link href="/support" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">שרות לקוחות</Link>
            <Link href="/terms" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">תקנון</Link>
            <Link href="/accessibility-statement" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">הצהרת נגישות</Link>
          </div>
        </div>
      )}
    </nav>
  );
} 