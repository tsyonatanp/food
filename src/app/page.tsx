import { fetchMenu } from '@/lib/fetchMenu'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import PopularItems from '@/components/PopularItems'
import Banner from '@/components/Banner'

export default async function HomePage() {
  const menu = await fetchMenu()
  return (
    <main className="min-h-screen">
      <Banner />
      
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ברוכים הבאים ל-Redy Food</h1>
          <Link 
            href="/order"
            className="btn-primary flex items-center gap-2"
          >
            <FaShoppingCart />
            הזמן עכשיו
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">כל המנות שלנו</h2>
          <PopularItems items={menu} />
        </section>
      </div>
    </main>
  )
} 