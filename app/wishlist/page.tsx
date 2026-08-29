'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlist } = useCart();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Saved Items</h1>
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
            {wishlist.length} Items
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto">
            <div className="w-16 h-16 bg-amber-400/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ♥
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Wishlist is empty</h2>
            <p className="text-slate-500 text-xs mb-6">Save items you like to view or purchase them later.</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}