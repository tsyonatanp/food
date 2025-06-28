'use client'

import { Rubik } from 'next/font/google'
import { CartProvider } from '@/contexts/CartContext'
import Banner from '@/components/Banner'
import Navigation from '@/components/Navigation'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import AccessibilityTest from '@/components/AccessibilityTest'
import './globals.css'
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';
import { pageview } from '@/utils/gtag';

const rubik = Rubik({ 
  subsets: ['hebrew', 'latin'],
  variable: '--font-rubik',
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.getElementById("nagish-li-script")) {
      const script = document.createElement("script");
      script.src = "https://nagish.li/accessibility.js";
      script.id = "nagish-li-script";
      script.defer = true;
      document.body.appendChild(script);
    }
    // Load Assistant font for jsPDF (client only)
    if (!document.getElementById('assistant-font-script')) {
      const fontScript = document.createElement('script');
      fontScript.src = '/lib/Assistant-Regular-normal.js';
      fontScript.id = 'assistant-font-script';
      fontScript.async = true;
      document.body.appendChild(fontScript);
    }
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      pageview(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, pathname);
    }
  }, [pathname]);

  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body className="font-sans bg-gray-50">
        {/* Skip link for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          דלג לתוכן הראשי
        </a>
        
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        <AccessibilityTest />
        <CartProvider>
          <Banner />
          <Navigation />
          <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
} 