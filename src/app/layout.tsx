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
        
        {/* Preload critical resources */}
        <link rel="preload" href="/תמונת רקע.jpg" as="image" />
        <link rel="preload" href="/hero-image.jpeg" as="image" />
        <link rel="preload" href="/images/logo.png" as="image" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://drive.google.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://drive.google.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" as="style" />
        <link rel="preload" href="https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Font loading with fallback */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Fallback font styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 300;
              font-display: swap;
              src: url('https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80.woff2') format('woff2');
            }
            @font-face {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url('https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80.woff2') format('woff2');
            }
            @font-face {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src: url('https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80.woff2') format('woff2');
            }
            @font-face {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: url('https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80.woff2') format('woff2');
            }
            @font-face {
              font-family: 'Rubik';
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: url('https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80.woff2') format('woff2');
            }
          `
        }} />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
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