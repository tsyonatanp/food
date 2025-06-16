'use client'

import { Rubik } from 'next/font/google'
import { CartProvider } from '@/contexts/CartContext'
import Banner from '@/components/Banner'
import Navigation from '@/components/Navigation'
import './globals.css'

const rubik = Rubik({ 
  subsets: ['hebrew', 'latin'],
  variable: '--font-rubik',
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body className="font-sans bg-gray-50">
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