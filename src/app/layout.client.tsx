'use client'

import { Rubik } from 'next/font/google'
import { CartProvider } from '@/contexts/CartContext'
import Banner from '@/components/Banner'
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
          {children}
        </CartProvider>
      </body>
    </html>
  )
} 