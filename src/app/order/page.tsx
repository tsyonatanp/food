"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { fetchMenu } from '@/lib/fetchMenu';
import MenuItems from '@/components/MenuItems';
import CartSummary from '@/components/CartSummary';
import MenuSearch from '@/components/MenuSearch';

function OrderContent() {
  const [menu, setMenu] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    fetchMenu().then(data => {
      setMenu(data);
    });
  }, []);

  const categoryKey = menu.length > 0
    ? Object.keys(menu[0]).find(key => key.replace(/\s/g, '') === 'קטגוריה') || 'קטגוריה'
    : 'קטגוריה';

  const filteredMenu = selectedCategory === 'all'
    ? menu
    : categoryKey
      ? menu.filter(item => {
          const value = item[categoryKey];
          return value && value.split(',').map((s: string) => s.trim()).includes(selectedCategory);
        })
      : [];

  // סינון לפי חיפוש
  const searchFilteredMenu = search.trim() === ''
    ? filteredMenu
    : filteredMenu.filter(item => {
        const name = item.מנה || '';
        const desc = item['תיאור'] || '';
        return name.includes(search) || desc.includes(search);
      });

  return (
    <main className="min-h-screen py-8">
      <div className="container">
        <div className="block lg:hidden mb-4">
          <CartSummary />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">תפריט</h1>
            <MenuSearch value={search} onChange={setSearch} />
            {selectedCategory !== 'all' && (
              <button
                className="mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                onClick={() => router.push('/')}
              >
                חזור לקטגוריות
              </button>
            )}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              {searchFilteredMenu.length === 0 ? (
                <div className="text-center text-gray-500 py-12 text-xl">
                  אין מנות זמינות בקטגוריה זו כרגע
                </div>
              ) : (
                <MenuItems items={searchFilteredMenu} />
              )}
            </div>
          </div>
          <div className="lg:w-80 hidden lg:block">
            <CartSummary />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>טוען...</div>}>
      <OrderContent />
    </Suspense>
  );
} 