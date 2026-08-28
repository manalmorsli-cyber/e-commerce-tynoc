'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  // Calcul des frais de port (Gratuit si sous-total > 100$)
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  // Calcul de la taxe estimée (8%)
  const tax = subtotal * 0.08;
  // Total général
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          /* Affichage panier vide */
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12 shadow-sm">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 text-sm mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Contenu du panier */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-20 h-20 rounded-xl object-cover bg-gray-50 flex-shrink-0"
                    />
                    <div>
                      <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                        {item.product.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-base">{item.product.title}</h3>
                      <p className="text-sm font-bold text-gray-700 mt-1">${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    {/* Contrôleur de quantité (+ / -) */}
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-gray-600 hover:text-black font-bold text-lg leading-none"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-gray-600 hover:text-black font-bold text-lg leading-none"
                      >
                        +
                      </button>
                    </div>

                    {/* Prix total pour cet article */}
                    <span className="font-extrabold text-gray-900 text-base w-20 text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Bouton supprimer */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-rose-600 p-2 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé de la commande (Order Summary) */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 h-fit space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? <span className="text-green-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-2xl text-blue-600">${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3.5 rounded-xl transition-colors active:scale-95 shadow-md"
                >
                Proceed to Checkout
                </Link>

              {subtotal > 0 && subtotal < 100 && (
                <p className="text-xs text-center text-gray-500">
                  Add <span className="font-semibold text-gray-700">${(100 - subtotal).toFixed(2)}</span> more to qualify for <span className="font-semibold text-green-600">Free Shipping</span>!
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}