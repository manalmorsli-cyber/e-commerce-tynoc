'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="border-b border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Fast Dispatch</h4>
              <p className="text-xs text-slate-400">Same day processing on all orders</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold text-lg">
              🛡️
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Secure Checkout</h4>
              <p className="text-xs text-slate-400">100% encrypted transactions</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold text-lg">
              💬
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Assistance</h4>
              <p className="text-xs text-slate-400">Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Logo />
          <p className="text-xs text-slate-400 leading-relaxed pt-2">
            High-performance e-commerce platform delivering quality products with speed and precision.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Navigation</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Account & Support</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/cart" className="hover:text-amber-400 transition-colors">View Cart</Link></li>
            <li><Link href="/wishlist" className="hover:text-amber-400 transition-colors">Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Newsletter</h3>
          <p className="text-xs text-slate-400 mb-3">Subscribe for exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-600"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © 2026 VeloceStore. All rights reserved.
      </div>
    </footer>
  );
}