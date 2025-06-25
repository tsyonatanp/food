'use client'

import { Rubik } from 'next/font/google'
import { CartProvider } from '@/contexts/CartContext'
import Banner from '@/components/Banner'
import Navigation from '@/components/Navigation'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'
import Script from "next/script";
import { useEffect } from "react";

const rubik = Rubik({ 
  subsets: ['hebrew', 'latin'],
  variable: '--font-rubik',
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!document.getElementById("nagish-li-script")) {
      const script = document.createElement("script");
      script.src = "https://nagish.li/accessibility.js";
      script.id = "nagish-li-script";
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body className="font-sans bg-gray-50">
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        <CartProvider>
          <Banner />
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
} 