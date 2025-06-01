"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchMenu } from '@/lib/fetchMenu';
import MenuItems from '@/components/MenuItems';
import MenuFilters from '@/components/MenuFilters';
import CartSummary from '@/components/CartSummary';

export default function OrderPage() {
  const [menu, setMenu] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    fetchMenu().then(setMenu);
  }, []);

  // סינון לפי קטגוריה (תומך בריבוי קטגוריות מופרדות בפסיק)
  const filteredMenu = selectedCategory === 'all'
    ? menu
    : menu.filter(item =>
        item.קטגוריה &&
        item.קטגוריה.split(',').map((s: string) => s.trim()).includes(selectedCategory)
      );

  return (
    <main className="min-h-screen py-8">
      <div className="container">
        {/* CartSummary בראש הדף במובייל בלבד */}
        <div className="block lg:hidden mb-4">
          <CartSummary />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">תפריט</h1>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* MenuFilters removed */}
              </div>
              <MenuItems items={filteredMenu} />
            </div>
          </div>
          {/* Cart Sidebar בדסקטופ בלבד */}
          <div className="lg:w-80 hidden lg:block">
            <CartSummary />
          </div>
        </div>
      </div>
    </main>
  );
} 