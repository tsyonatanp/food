'use client'

import { Rubik } from 'next/font/google'
import { CartProvider } from '@/contexts/CartContext'
import dynamic from 'next/dynamic'
import './globals.css'
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';
import { pageview } from '@/utils/gtag';
import ErrorBoundary from '@/components/ErrorBoundary';

const rubik = Rubik({ 
  subsets: ['hebrew', 'latin'],
  variable: '--font-rubik',
})

// Dynamic import של AccessibilityTest כדי למנוע בעיות SSR
const AccessibilityTest = dynamic(() => import('@/components/AccessibilityTest'), {
  ssr: false,
  loading: () => null
})

// Dynamic import של GoogleAnalytics
const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'), {
  ssr: false,
  loading: () => null
})

// Dynamic import של Banner
const Banner = dynamic(() => import('@/components/Banner'), {
  ssr: true,
  loading: () => <div className="h-12 bg-blue-600" />
})

// Dynamic import של Navigation
const Navigation = dynamic(() => import('@/components/Navigation'), {
  ssr: true,
  loading: () => <div className="h-16 bg-white shadow" />
})

// Dynamic import של Accessibility
const Accessibility = dynamic(() => import('@/components/Accessibility'), {
  ssr: false,
  loading: () => null
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        pageview(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, pathname);
      }
    } catch (error) {
      // Silent error handling for analytics
      console.warn('Analytics error:', error);
    }
  }, [pathname]);

  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body className="font-sans bg-gray-50">
        {/* Skip link for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          דלג לתוכן הראשי
        </a>
        
        <ErrorBoundary>
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
          <AccessibilityTest />
          <CartProvider>
            <Banner />
            <Navigation />
            <Accessibility />
            <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
              {children}
            </main>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
} 