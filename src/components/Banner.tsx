'use client'

import { useEffect, useState } from 'react'
import { fetchBanner } from '@/lib/fetchBanner'

export default function Banner() {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    fetchBanner().then(data => {
      setMessages(data.map((row: any) => row['פרסום']).filter(Boolean))
    })
  }, [])

  if (messages.length === 0) return null

  return (
    <div className="bg-yellow-100 text-yellow-900 text-center py-2 font-bold">
      {messages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
    </div>
  )
} 