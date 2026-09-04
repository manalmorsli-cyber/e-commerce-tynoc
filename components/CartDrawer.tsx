'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart = [], isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();

  if (!isCartOpen) return null;

  const total = cart.reduce((sum: number, item: any) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  const cartCount = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* dark font */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* cart */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 p-6 overflow-y-auto">
        
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-900">My cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <span className="text-4xl block">🛒</span>
              <p className="text-slate-500 text-xs">Votre panier est vide.</p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {cart.map((item: any, index: number) => {
                const itemId = item.id ?? index;
                const price = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 1;

                return (
                  <div
                    key={`drawer-item-${itemId}-${index}`}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 gap-3"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-xs truncate">
                        {item.title || item.name}
                      </h3>
                      <p className="text-blue-600 font-black text-xs mt-0.5">
                        ${price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(itemId, -1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-900">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(itemId, 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(itemId)}
                      className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors shrink-0 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between text-base">
              <span className="text-slate-500 font-medium">Total :</span>
              <span className="font-black text-slate-900 text-xl">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-center text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              Shop ({cartCount})
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}