'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  searchQuery?: string;
  onSearch?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function Navbar({
  searchQuery = '',
  onSearch,
  selectedCategory = 'All',
  onCategoryChange,
}: NavbarProps) {
  const { cart, wishlist } = useCart();
  const cartCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-8">
        
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Barre de Recherche Style Amazon avec Sélecteur de Catégorie */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 overflow-hidden transition-all">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2.5 border-r border-slate-300 outline-none cursor-pointer h-10 transition-colors"
            >
              <option value="All">Toutes catégories</option>
              <option value="Electronics">Électronique</option>
              <option value="Accessories">Accessoires</option>
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              placeholder="Rechercher un produit, une marque..."
              className="w-full px-3 py-2 bg-transparent text-xs text-slate-900 placeholder-slate-400 outline-none h-10"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 h-10 flex items-center justify-center transition-colors shrink-0">
              🔍
            </button>
          </div>
        </div>

        {/* Liens rapides & Panier */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <Link href="/about" className="hidden md:block text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
            À propos
          </Link>
          <Link href="/contact" className="hidden md:block text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
            Contact
          </Link>

          <Link href="/wishlist" className="relative p-2 text-slate-600 hover:text-amber-500 transition-colors">
            <span className="text-lg">♥</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20"
          >
            <span>🛒</span>
            <span>Panier</span>
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-md text-[10px] font-black">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}