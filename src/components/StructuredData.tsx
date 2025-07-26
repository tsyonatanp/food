'use client'

import Script from 'next/script'

interface StructuredDataProps {
  type: 'restaurant' | 'organization' | 'breadcrumb' | 'faq'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'restaurant':
        return {
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "שלג-רוז",
          "description": "אוכל מוכן טרי במשלוח עד הבית - מנות, תבשילים וסלטים ליום שישי",
          "url": "https://food-one-cyan.vercel.app",
          "telephone": "+972-50-9555755",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "אור יהודה",
            "addressRegion": "מרכז",
            "addressCountry": "IL"
          },
          "servesCuisine": ["מזרחי", "יהודי", "איטלקי", "אסייתי"],
          "priceRange": "₪₪",
          "openingHours": "Mo-Th 09:00-20:00",
          "deliveryAvailable": true,
          "hasMenu": "https://food-one-cyan.vercel.app/order",
          "image": "https://food-one-cyan.vercel.app/hero-image.jpeg",
          "logo": "https://food-one-cyan.vercel.app/images/logo.png",
          "sameAs": [
            "https://wa.me/972509555755"
          ]
        }
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "שלג-רוז",
          "url": "https://food-one-cyan.vercel.app",
          "logo": "https://food-one-cyan.vercel.app/images/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+972-50-9555755",
            "contactType": "customer service",
            "availableLanguage": ["Hebrew", "English"]
          }
        }
      
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.breadcrumbs.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }
      
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.faqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      
      default:
        return {}
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  )
} 