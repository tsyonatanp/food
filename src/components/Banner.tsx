'use client'

import { useEffect, useState } from 'react'
import { fetchBanner } from '@/lib/fetchBanner'

export default function Banner() {
  const [bannerText, setBannerText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBanner()
      .then((data) => {
        console.log('Banner fetch result:', data)
        if (data && data.length > 0) {
          setBannerText(data[0]?.['באנר'] || '')
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Banner fetch error:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-yellow-100 border-b border-yellow-200" role="banner" aria-label="באנר מידע">
        <div className="container mx-auto px-4 py-2">
          <div className="animate-pulse bg-yellow-200 h-4 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  if (!bannerText) {
    console.warn('Banner: No bannerText found')
    return null
  }

  return (
    <div className="bg-yellow-100 border-b border-yellow-200" role="banner" aria-label="באנר מידע">
      <div className="container mx-auto px-4 py-2">
        <p className="text-yellow-800 text-center text-sm font-medium" aria-live="polite">
          {bannerText}
        </p>
      </div>
    </div>
  )
} 