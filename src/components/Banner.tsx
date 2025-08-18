'use client'

import { useEffect, useState } from 'react'
import { fetchBanner } from '@/lib/fetchBanner'

export default function Banner() {
  const [messages, setMessages] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBanner()
      .then((data) => {
        // תמיכה בעמודות 'באנר', 'פרסום', 'פירסום'
        const possibleKeys = ['באנר', 'Banner', 'פרסום', 'פירסום']
        const msgs = data
          .map((row: any) => {
            for (const key of possibleKeys) {
              if (row[key]) return row[key]
            }
            return null
          })
          .filter((msg: string | null) => !!msg)
        setMessages(msgs)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Banner fetch error:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (messages.length > 1) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % messages.length)
      }, 5000) // כל 5 שניות
      return () => clearInterval(timer)
    }
  }, [messages])

  if (loading) {
    return (
      <div className="bg-yellow-100 border-b border-yellow-200" role="banner" aria-label="באנר מידע">
        <div className="container mx-auto px-4 py-2">
          <div className="animate-pulse bg-yellow-200 h-4 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  if (!messages.length) {
    console.warn('Banner: No messages found')
    return null
  }

  return (
    <div className="bg-yellow-100 border-b border-yellow-200" role="banner" aria-label="באנר מידע">
      <div className="container mx-auto px-4 py-2">
        <p className="text-yellow-800 text-center text-sm font-medium" aria-live="polite">
          {messages[index]}
        </p>
      </div>
    </div>
  )
} 