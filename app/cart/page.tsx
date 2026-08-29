'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar showSearch={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-black text-slate-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto space-y-4">
            <span className="text-4xl block">🛒</span>
            <h2 className="text-lg font-bold text-slate-900">Your cart is empty</h2>
            <p className="text-slate-500 text-xs">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-blue-600/20"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item: any, index: number) => {
                const itemKey = item.id ? `${item.id}-${index}` : index;
                return (
                  <div
                    key={itemKey}
                    className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
                        alt={item.title || 'Product'}
                        className="w-16 h-16 object-cover rounded-xl border border-slate-100 shrink-0"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{item.title}</h3>
                        <span className="text-xs text-slate-500">${item.price} each</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 text-slate-600 hover:bg-slate-200 font-bold transition-colors text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-slate-600 hover:bg-slate-200 font-bold transition-colors text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-black text-slate-900 text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors text-xs font-bold p-1"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-900 text-base">Order Summary</h2>

                <div className="space-y-2 text-xs border-b border-slate-100 pb-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-slate-900">${shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-1">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-md shadow-blue-600/20">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}