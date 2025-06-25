import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Redy Food - אוכל מוכן במשלוח',
  description: 'הזמנת אוכל מוכן טרי לפי משקל עם משלוח עד הבית',
  openGraph: {
    title: 'Redy Food - אוכל מוכן במשלוח',
    description: 'הזמנת אוכל מוכן טרי לפי משקל עם משלוח עד הבית',
    type: 'website',
    url: 'https://redy-food.vercel.app',
    siteName: 'Redy Food',
    images: [
      {
        url: '/1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Redy Food - אוכל מוכן במשלוח',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redy Food - אוכל מוכן במשלוח',
    description: 'הזמנת אוכל מוכן טרי לפי משקל עם משלוח עד הבית',
    images: ['/1.jpeg'],
  },
} 