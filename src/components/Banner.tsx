'use client'

import { useEffect, useState } from 'react'
import { fetchBanner } from '@/lib/fetchBanner'

export default function Banner() {
  const [messages, setMessages] = useState<string[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetchBanner().then(data => {
      setMessages(data.map((row: any) => row['פרסום']).filter(Boolean))
    })
  }, [])

  useEffect(() => {
    if (messages.length === 0) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [messages])

  if (messages.length === 0) return null

  return (
    <div className="bg-yellow-300 text-yellow-900 text-center py-4 px-2 font-extrabold text-xl shadow-lg tracking-wide border-b-4 border-yellow-500 animate-fade-in">
      {messages[current]}
    </div>
  )
} 