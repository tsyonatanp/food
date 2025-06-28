'use client'

import { FaPhone } from 'react-icons/fa'

export default function FloatingPhone() {
  const phoneNumber = '050-9555755'
  
  const handleClick = () => {
    // פתיחת הטלפון עם מספר הטלפון
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${phoneNumber}`
    }
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-200 hover:scale-110"
      aria-label={`התקשר אלינו: ${phoneNumber}`}
      title={`התקשר אלינו: ${phoneNumber}`}
    >
      <FaPhone className="text-xl" />
    </button>
  )
} 