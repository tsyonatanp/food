import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'שלג-רוז - אוכל מוכן במשלוח עד הבית | מנות חמות, תבשילים וסלטים',
  description: 'אוכל מוכן טרי במשלוח עד הבית באור יהודה. מנות חמות, תבשילים וסלטים ליום שישי. הזמנה עד חמישי 20:00. כשר בהשגחת הרבנות. תשלום בביט, פייבוקס או מזומן.',
  keywords: 'אוכל מוכן, משלוח אוכל, אור יהודה, מנות חמות, תבשילים, סלטים, אוכל כשר, הזמנת אוכל, אוכל ליום שישי, משלוח עד הבית',
  authors: [{ name: 'שלג-רוז' }],
  creator: 'שלג-רוז',
  publisher: 'שלג-רוז',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://food-one-cyan.vercel.app'),
  openGraph: {
    title: 'שלג-רוז - אוכל מוכן במשלוח',
    description: `🍽 שלג – אוכל מוכן באהבה\nהכי טעים, הכי טרי, הכי נוח!\n\n✨ מגוון ענק של מנות חמות, תבשילים, סלטים ותוספות – פשוט לבחור וליהנות\n💬 טעמים של בית בלי להיכנס למטבח!\n👉 https://food-one-cyan.vercel.app/\n🕕 ניתן להזמין עד יום חמישי בשעה 20:00\n📦 ההזמנות מיועדות ליום שישי\n💳 ניתן לשלם באמצעות Bit, פייבוקס או מזומן\n✔ כשר – בהשגחת הרבנות`,
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
    description: `🍽 שלג – אוכל מוכן באהבה\nהכי טעים, הכי טרי, הכי נוח!\n\n✨ מגוון ענק של מנות חמות, תבשילים, סלטים ותוספות – פשוט לבחור וליהנות\n💬 טעמים של בית בלי להיכנס למטבח!\n👉 https://food-one-cyan.vercel.app/\n🕕 ניתן להזמין עד יום חמישי בשעה 20:00\n📦 ההזמנות מיועדות ליום שישי\n💳 ניתן לשלם באמצעות Bit, פייבוקס או מזומן\n✔ כשר – בהשגחת הרבנות`,
    images: ['https://food-one-cyan.vercel.app/hero-image.jpeg'],
  },
} 