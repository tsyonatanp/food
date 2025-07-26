import { metadata } from './metadata'
import ClientLayout from './layout.client'

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1d4ed8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="שלג-רוז" />
        <title>שלג – אוכל מוכן באהבה</title>
        <meta name="title" content="שלג – אוכל מוכן באהבה" />
        <meta name="description" content="מנות, תבשילים וסלטים ליום שישי. הזמנה עד חמישי ב-20:00. תשלום בביט, פייבוקס או מזומן. כשר בהשגחת הרבנות." />
        <meta property="og:title" content="שלג – אוכל מוכן באהבה" />
        <meta property="og:description" content="מנות, תבשילים וסלטים ליום שישי. הזמנה עד חמישי ב-20:00. תשלום בביט, פייבוקס או מזומן. כשר בהשגחת הרבנות." />
        <meta property="og:image" content="https://food-one-cyan.vercel.app/hero-image.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://food-one-cyan.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="שלג – אוכל מוכן באהבה" />
        <meta name="twitter:description" content="מנות, תבשילים וסלטים ליום שישי. הזמנה עד חמישי ב-20:00. כשר בהשגחת הרבנות." />
        <meta name="twitter:image" content="https://food-one-cyan.vercel.app/hero-image.jpeg" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
} 