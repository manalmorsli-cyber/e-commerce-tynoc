'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const context = useCart();
  const cart = context?.cart || [];
  const clearCart = context?.clearCart;
  const [completed, setCompleted] = useState(false);

  const safeTotalPrice =
    typeof context?.totalPrice === 'number'
      ? context.totalPrice
      : cart.reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clearCart) clearCart();
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Checkout</h1>

        {completed ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-amber-400/20 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
              ✓
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Order Confirmed</h2>
            <p className="text-slate-600 text-xs mb-6">Thank you for your purchase. Your order is being processed for immediate dispatch.</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Shipping Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      className="px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      className="px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Address"
                    className="w-full mt-4 px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Payment</h2>
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Card Payment</span>
                    <span className="text-xs text-amber-500 font-extrabold">🔒 256-Bit Encrypted</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Card Number"
                    className="w-full mt-4 px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20"
                >
                  Complete Order (${safeTotalPrice.toFixed(2)})
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm h-fit space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">Items Summary</h2>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{item.title}</p>
                        <span className="text-slate-400">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total</span>
                  <span className="text-base font-black text-blue-600">${safeTotalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}