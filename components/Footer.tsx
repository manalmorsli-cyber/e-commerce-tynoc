'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4">
          <Logo variant="dark" />
          <p className="text-slate-400 leading-relaxed text-xs">
            High-performance e-commerce platform delivering quality products with speed and precision.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-wider mb-3">Navigation</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-wider mb-3">Account & Support</h4>
          <ul className="space-y-2">
            <li><Link href="/cart" className="hover:text-amber-400 transition-colors">View Cart</Link></li>
            <li><Link href="/wishlist" className="hover:text-amber-400 transition-colors">Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-wider mb-3">Newsletter</h4>
          <p className="mb-3">Subscribe for exclusive offers and updates.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 outline-none w-full"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 pt-6 text-center text-slate-500">
        © 2026 VeloceStore. All rights reserved.
      </div>
    </footer>
  );
}