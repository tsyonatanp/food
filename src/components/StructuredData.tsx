'use client';

interface StructuredDataProps {
  type: 'restaurant' | 'organization' | 'breadcrumb' | 'faq' | 'website';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://food-one-cyan.vercel.app';
    
    switch (type) {
      case 'restaurant':
        return {
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "שלג-רוז",
          "alternateName": "שלג רוז",
          "description": "אוכל מוכן טרי במשלוח עד הבית באור יהודה. מנות חמות, תבשילים וסלטים ליום שישי. כשר בהשגחת הרבנות.",
          "url": baseUrl,
          "telephone": "+972-XX-XXXXXXX",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "אור יהודה",
            "addressCountry": "IL"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "32.0238",
            "longitude": "34.8563"
          },
          "openingHours": "Mo-Th 09:00-20:00, Fr 09:00-20:00",
          "priceRange": "₪₪",
          "servesCuisine": ["Israeli", "Middle Eastern", "Kosher"],
          "hasMenu": `${baseUrl}/order`,
          "acceptsReservations": false,
          "deliveryAvailable": true,
          "takeoutAvailable": true,
          "paymentAccepted": ["Cash", "Credit Card", "Bit", "PayBox"],
          "currenciesAccepted": "ILS",
          "image": [
            `${baseUrl}/hero-image.jpeg`,
            `${baseUrl}/images/logo.png`
          ],
          "logo": `${baseUrl}/images/logo.png`,
          "sameAs": [
            "https://www.facebook.com/shelagroz",
            "https://www.instagram.com/shelagroz"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150"
          }
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "שלג-רוז",
          "alternateName": "שלג רוז",
          "description": "מסעדה ומשלוחי אוכל כשרים באור יהודה",
          "url": baseUrl,
          "logo": `${baseUrl}/images/logo.png`,
          "image": `${baseUrl}/hero-image.jpeg`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "אור יהודה",
            "addressCountry": "IL"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+972-XX-XXXXXXX",
            "contactType": "customer service",
            "availableLanguage": ["Hebrew", "English"]
          },
          "sameAs": [
            "https://www.facebook.com/shelagroz",
            "https://www.instagram.com/shelagroz"
          ]
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "שלג-רוז - אוכל מוכן",
          "url": baseUrl,
          "description": "הזמנת אוכל מוכן כשר במשלוח עד הבית באור יהודה",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/order?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "שלג-רוז"
          }
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data || [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "דף הבית",
              "item": baseUrl
            }
          ]
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data || [
            {
              "@type": "Question",
              "name": "איך מזמינים אוכל?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ניתן להזמין דרך האתר או בטלפון עד יום חמישי בשעה 20:00"
              }
            }
          ]
        };

      default:
        return {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
} 