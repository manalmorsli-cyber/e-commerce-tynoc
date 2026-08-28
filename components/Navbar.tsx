'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Navbar({ onSearch, searchQuery = '' }: NavbarProps) {
  const { totalItems, wishlist } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo VeloceStore */}
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <span className="bg-blue-600 text-white px-2.5 py-1 rounded-lg">V</span>
          <span>VeloceStore</span>
        </Link>

        {/* Dynamic Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 border-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-6">
          <Link href="/wishlist" className="relative text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center gap-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center gap-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

      </div>
    </header>
  );
}