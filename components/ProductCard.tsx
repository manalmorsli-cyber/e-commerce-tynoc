'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string | number;
  title: string;
  description?: string;
  price: number;
  category?: string;
  badge?: string;
  image: string;
  rating?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const isWishlisted = wishlist.some((item) => String(item.id) === String(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group relative">
      
      {/* CLIC SUR LE PRODUIT -> REDIRIGE VERS /product/[id] */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {product.badge && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
              {product.badge}
            </span>
          )}

          <button
            type="button"
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors shadow-sm cursor-pointer z-10"
          >
            <span className={isWishlisted ? 'text-rose-500' : 'text-slate-400'}>
              {isWishlisted ? '♥' : '♡'}
            </span>
          </button>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>{product.category || 'General'}</span>
            {product.rating && <span>⭐ {product.rating}</span>}
          </div>
          <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
      </Link>

      {/* BOUTON D'AJOUT AU PANIER (ne déclenche pas la navigation) */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
        <span className="text-base font-black text-slate-900">
          ${Number(product.price).toFixed(2)}
        </span>

        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center gap-1.5 shrink-0 z-10"
        >
          <span>🛒</span>
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
}