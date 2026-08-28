'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Navbar({ onSearch, searchQuery = '' }: NavbarProps) {
  const { totalItems, wishlist } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                pathname === link.href ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-sm hidden lg:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100/80 text-xs border border-transparent focus:bg-white focus:border-slate-300 focus:outline-none transition-all text-slate-800"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <Link href="/wishlist" className="relative p-2 text-slate-700 hover:text-rose-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Cart</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
              {totalItems}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}