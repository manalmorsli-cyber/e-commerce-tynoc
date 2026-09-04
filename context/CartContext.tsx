'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { Product, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product | (CartItem & Product)) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const loadUserData = async () => {
      if (user?.id) {
        try {
          const [cartRes, wishlistRes] = await Promise.all([
            fetch(`/api/cart?userId=${user.id}`),
            fetch(`/api/wishlist?userId=${user.id}`),
          ]);

          const cartData = await cartRes.json();
          const wishlistData = await wishlistRes.json();

          if (cartRes.ok) setCart(cartData.items || []);
          if (wishlistRes.ok) setWishlist(wishlistData.items || []);
        } catch (e) {
          console.error('Error fetching user data:', e);
        }
      } else {
        const savedGuestCart = localStorage.getItem('tynoc_guest_cart');
        const savedGuestWishlist = localStorage.getItem('tynoc_guest_wishlist');

        setCart(savedGuestCart ? JSON.parse(savedGuestCart) : []);
        setWishlist(savedGuestWishlist ? JSON.parse(savedGuestWishlist) : []);
      }
    };

    loadUserData();
  }, [user]);

  const syncCart = async (newCart: CartItem[]) => {
    setCart(newCart);

    if (user?.id) {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, items: newCart }),
        });
      } catch (e) {
        console.error('Failed to sync cart:', e);
      }
    } else if (typeof window !== 'undefined') {
      localStorage.setItem('tynoc_guest_cart', JSON.stringify(newCart));
    }
  };

  const syncWishlist = async (newWishlist: Product[]) => {
    setWishlist(newWishlist);

    if (user?.id) {
      try {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, items: newWishlist }),
        });
      } catch (e) {
        console.error('Failed to sync wishlist:', e);
      }
    } else if (typeof window !== 'undefined') {
      localStorage.setItem('tynoc_guest_wishlist', JSON.stringify(newWishlist));
    }
  };

  const addToCart = (product: Product | any) => {
    const existing = cart.find((item) => String(item.id) === String(product.id));
    let updatedCart: CartItem[];

    if (existing) {
      updatedCart = cart.map((item) =>
        String(item.id) === String(product.id) ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: Number(product.price),
        image: product.image,
        quantity: product.quantity || 1,
        category: product.category,
      };
      updatedCart = [...cart, newItem];
    }

    syncCart(updatedCart);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    syncCart(cart.filter((item) => String(item.id) !== String(productId)));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      syncCart(
        cart.map((item) => (String(item.id) === String(productId) ? { ...item, quantity } : item))
      );
    }
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => String(item.id) === String(product.id));
    const updatedWishlist = exists
      ? wishlist.filter((item) => String(item.id) !== String(product.id))
      : [...wishlist, product];

    syncWishlist(updatedWishlist);
  };

  const clearCart = () => {
    syncCart([]);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        clearCart,
      }}
    >
      {children}

      {isMounted && isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  Your Cart ({totalItemsCount})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 font-bold text-lg rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <p className="text-4xl mb-2">🛍️</p>
                  <p className="text-sm font-medium">Your cart is empty.</p>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/60"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-xl bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs font-black text-blue-600 mt-0.5">
                          ${item.price}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-200 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-slate-600">Total Amount:</span>
                  <span className="text-xl font-black text-slate-900">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}