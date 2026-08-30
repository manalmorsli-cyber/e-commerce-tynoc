'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  searchQuery?: string;
  onSearch?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  showSearch?: boolean;
}

export default function Navbar({
  searchQuery = '',
  onSearch,
  selectedCategory = 'All',
  onCategoryChange,
  showSearch = true,
}: NavbarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { cart = [], wishlist = [], setIsCartOpen } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);

  const handleOpenCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-0 md:h-20 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        
        {/* LOGO */}
        <div className="w-full md:w-auto flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <Logo variant="light" />
          </Link>

          {/* Boutons d'action rapides (Mobile) */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/wishlist" className="p-2 text-rose-500 font-bold text-sm">
              ♥ <span className="text-xs">({isMounted ? wishlist.length : 0})</span>
            </Link>
            <button
              onClick={handleOpenCart}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              🛒 {isMounted ? cartCount : 0}
            </button>
          </div>
        </div>

        {/* BARRE DE RECHERCHE AU CENTRE */}
        {showSearch && (
          <div className="w-full md:flex-1 md:max-w-xl">
            <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 overflow-hidden transition-all h-10">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] sm:text-xs px-2.5 border-r border-slate-300 outline-none cursor-pointer h-full transition-colors shrink-0 max-w-[110px] sm:max-w-none"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
              </select>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch && onSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 bg-transparent text-xs text-slate-900 placeholder-slate-400 outline-none h-full min-w-0"
              />

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 h-full flex items-center justify-center transition-colors shrink-0 font-bold text-xs">
                🔍
              </button>
            </div>
          </div>
        )}

        {/* LIENS ET BOUTON PANIER (Desktop) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link href="/" className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
            Contact Us
          </Link>

          <Link
            href="/wishlist"
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl text-xs transition-colors border border-slate-200"
          >
            <span className="text-rose-500 text-sm">♥</span>
            <span>Wishlist</span>
            {isMounted && wishlist.length > 0 && (
              <span className="bg-amber-400 text-slate-900 font-black text-[10px] px-1.5 py-0.5 rounded-full ml-0.5">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* CLIC SUR LE PANIER -> OUVRE LE TIROIR LATÉRAL */}
          <button
            onClick={handleOpenCart}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <span>🛒</span>
            <span>Cart</span>
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-md text-[10px] font-black">
              {isMounted ? cartCount : 0}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}