import { fetchMenu } from '@/lib/fetchMenu';
import MenuItems from '@/components/MenuItems';
import MenuFilters from '@/components/MenuFilters';
import MenuSearch from '@/components/MenuSearch';
import CartSummary from '@/components/CartSummary';

export default async function OrderPage() {
  const menu = await fetchMenu();

  return (
    <main className="min-h-screen py-8">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">תפריט</h1>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <MenuSearch />
                </div>
                <div className="md:w-64">
                  <MenuFilters />
                </div>
              </div>
              <MenuItems items={menu} />
            </div>
          </div>
          {/* Cart Sidebar */}
          <div className="lg:w-80">
            <CartSummary />
          </div>
        </div>
      </div>
    </main>
  );
} 