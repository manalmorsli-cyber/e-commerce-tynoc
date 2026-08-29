'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.some((item: any) => item.id === product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-4 transition-all duration-300 hover:border-blue-600/40 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col justify-between">
      <div>
        <div className="relative aspect-square rounded-xl bg-slate-100 overflow-hidden mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 hover:scale-110 transition-all"
          >
            <svg
              className={`w-4 h-4 ${isWishlisted ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          {product.badge && (
            <span className="absolute top-3 left-3 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md tracking-wider">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-2">
          <span className="text-amber-400 text-xs font-bold">★ {product.rating || '4.9'}</span>
          <span className="text-slate-400 text-[11px]">({product.reviews || 120})</span>
        </div>

        <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div>
          <span className="text-xs text-slate-400 font-medium block leading-none">Price</span>
          <span className="text-lg font-black text-slate-900">${product.price}</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}