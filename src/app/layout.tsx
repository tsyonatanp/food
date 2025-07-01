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
        <meta property="og:title" content="שלג-רוז - אוכל מוכן במשלוח" />
        <meta property="og:description" content="הזמנת אוכל מוכן טרי לפי משקל עם משלוח עד הבית באזור בית בפארק אור יהודה" />
        <meta property="og:image" content="https://food-one-cyan.vercel.app/hero-image.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://food-one-cyan.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="שלג-רוז - אוכל מוכן במשלוח" />
        <meta name="twitter:description" content="הזמנת אוכל מוכן טרי לפי משקל עם משלוח עד הבית באזור בית בפארק אור יהודה" />
        <meta name="twitter:image" content="https://food-one-cyan.vercel.app/hero-image.jpeg" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
} 