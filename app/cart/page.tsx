'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cart.reduce((sum: number, item: any) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar showSearch={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-grow w-full">
        {/* Header panier */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          {cart.length > 0 && (
            <button
              onClick={() => clearCart && clearCart()}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl border border-rose-200/80 transition-all cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-sm max-w-md mx-auto space-y-4">
            <span className="text-5xl block">🛒</span>
            <h2 className="text-lg font-bold text-slate-900">Your cart is empty</h2>
            <p className="text-slate-500 text-xs leading-relaxed">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-600/20"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Liste des produits (Mobile 1 col / PC 8 cols) */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              {cart.map((item: any, index: number) => {
                const title = item.title || item.name || 'Product';
                const price = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 1;
                const itemId = item.id ?? index;

                return (
                  <div
                    key={`cart-item-${itemId}-${index}`}
                    className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm"
                  >
                    {/* Information Produit + Image cadrée */}
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                          {title}
                        </h3>
                        <span className="text-xs text-slate-500 font-medium block mt-0.5">
                          ${price.toFixed(2)} each
                        </span>
                      </div>
                    </div>

                    {/* Quantité & Prix & Bouton Supprimer */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Control quantite */}
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(itemId, -1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold transition-colors text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-900 min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(itemId, 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold transition-colors text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Sous total */}
                      <span className="font-black text-slate-900 text-sm sm:text-base min-w-[65px] text-right">
                        ${(price * quantity).toFixed(2)}
                      </span>

                      {/* Bouton X */}
                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="text-slate-400 hover:text-rose-600 transition-colors text-sm font-bold p-1 cursor-pointer"
                        title="Remove product"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total / Order Summary (PC 4 cols / Mobile 1 col) */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-bold text-slate-900">${shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* BOUTON PROCEED TO CHECKOUT REDIRIGE VERS /checkout */}
                <Link href="/checkout" className="block w-full pt-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-blue-600/20 cursor-pointer text-center">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}