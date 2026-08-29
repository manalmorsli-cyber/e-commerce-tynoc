'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const context = useCart();
  const cart = context?.cart || [];
  const removeFromCart = context?.removeFromCart;
  const updateQuantity = context?.updateQuantity;

  // Calcul sécurisé si totalPrice est absent du Context
  const safeTotalPrice =
    typeof context?.totalPrice === 'number'
      ? context.totalPrice
      : cart.reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🛒
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 text-xs mb-6">Explore our catalog and add high-performance items to your order.</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item: any) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover bg-slate-100" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                      <span className="text-xs font-black text-blue-600">${item.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                      <button
                        onClick={() => updateQuantity && updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-all"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity && updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-all"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart && removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-500 text-xs font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm sticky top-28 space-y-6">
                <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-4">Order Summary</h2>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${safeTotalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-bold text-amber-500 uppercase">Free Express</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-black text-slate-900">
                    <span>Total</span>
                    <span className="text-blue-600">${safeTotalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}