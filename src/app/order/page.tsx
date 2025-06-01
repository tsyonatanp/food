"use client";
export const dynamic = "force-dynamic";

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
    fetchMenu().then(data => {
      console.log('menu:', data);
      setMenu(data);
    });
  }, []);

  // מצא את המפתח שמכיל 'קטגוריה' (גם אם יש רווחים)
  const categoryKey = menu.length > 0
    ? Object.keys(menu[0]).find(key => key.replace(/\s/g, '') === 'קטגוריה') || 'קטגוריה'
    : 'קטגוריה';

  console.log('selectedCategory:', selectedCategory);
  console.log('categoryKey:', categoryKey);

  const filteredMenu = selectedCategory === 'all'
    ? menu
    : categoryKey
      ? menu.filter(item => {
          const value = item[categoryKey];
          console.log('item:', item.מנה, '| value:', value);
          return value && value.split(',').map((s: string) => s.trim()).includes(selectedCategory);
        })
      : [];

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
              {filteredMenu.length === 0 ? (
                <div className="text-center text-gray-500 py-12 text-xl">
                  אין מנות זמינות בקטגוריה זו כרגע
                </div>
              ) : (
                <MenuItems items={filteredMenu} />
              )}
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