import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'שלג-רוז - אוכל מוכן במשלוח',
  description: 'הזמנת אוכל מוכן טרי לפי משקל עם משלוח עד הבית באזור בית בפארק אור יהודה',
  metadataBase: new URL('https://food-one-cyan.vercel.app'),
  openGraph: {
    title: 'שלג-רוז - אוכל מוכן במשלוח',
    description: 'הזמנת אוכל מוכן טרי לפי משקל עם משלוח עד הבית באזור בית בפארק אור יהודה',
    type: 'website',
    url: 'https://food-one-cyan.vercel.app',
    siteName: 'שלג-רוז',
    images: [
      {
        url: 'https://food-one-cyan.vercel.app/hero-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'שלג-רוז - אוכל מוכן במשלוח',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'שלג-רוז - אוכל מוכן במשלוח',
    description: 'הזמנת אוכל מוכן טרי לפי משקל עם משלוח עד הבית באזור בית בפארק אור יהודה',
    images: ['https://food-one-cyan.vercel.app/hero-image.jpeg'],
  },
} 