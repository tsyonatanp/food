'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchLogoUrl } from '@/lib/fetchLogo';
import { FaPhone } from 'react-icons/fa';

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
    window.location.href = 'tel:050-9555755';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full" role="navigation" aria-label="ניווט ראשי">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Desktop menu */}
          <div className="hidden w-full sm:flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-8">
              <Link href="/delivery" className="text-gray-900 hover:text-gray-600 font-medium text-base">משלוחים ואיזורי חלוקה</Link>
              <Link href="/about" className="text-gray-900 hover:text-gray-600 font-medium text-base">עלינו</Link>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link href="/" aria-label="דף הבית">
                <Image src={logoUrl} alt="לוגו" width={48} height={48} priority />
              </Link>
            </div>
            <div className="flex items-center space-x-reverse space-x-8">
              <Link href="/faq" className="text-gray-900 hover:text-gray-600 font-medium text-base">שאלות ותשובות</Link>
              <Link href="/support" className="text-gray-900 hover:text-gray-600 font-medium text-base">שרות לקוחות</Link>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="flex items-center sm:hidden w-full justify-between">
            {/* Phone button on the left */}
            <button
              onClick={handlePhoneClick}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-600 hover:text-green-700 hover:bg-green-50"
              aria-label="התקשר אלינו: 050-9555755"
              title="התקשר אלינו: 050-9555755"
            >
              <FaPhone className="h-5 w-5" />
            </button>
            
            {/* Logo in center */}
            <Link href="/" className="flex-shrink-0 flex items-center justify-center" aria-label="דף הבית">
              <Image src={logoUrl} alt="לוגו" width={40} height={40} priority />
            </Link>
            
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
            <Link href="/about" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">עלינו</Link>
            <Link href="/faq" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">שאלות ותשובות</Link>
            <Link href="/support" className="text-gray-900 hover:text-gray-600 font-medium text-base" role="menuitem">שרות לקוחות</Link>
          </div>
        </div>
      )}
    </nav>
  );
} 