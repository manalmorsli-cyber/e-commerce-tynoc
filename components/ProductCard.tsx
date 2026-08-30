'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  badge?: string;
  image: string;
  rating: number;
  stock?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist = [] } = useCart();
  
  // Vérifie si le produit est déjà dans la wishlist
  const isFavorite = wishlist.some((item: any) => item.id === product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (toggleWishlist) {
      toggleWishlist(product);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (addToCart) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative group">
      <div>
        {/* Container Image */}
        <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden bg-slate-100">
          {product.badge && (
            <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}

          {/* Bouton Favoris (Cœur) */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:text-red-500 hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFavorite ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-slate-600'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>

          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Catégorie */}
        <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Titre */}
        <Link href={`/product/${product.id}`} className="block mt-1">
          <h3 className="font-bold text-slate-900 text-base hover:text-blue-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Prix & Bouton Ajout Panier */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Price</span>
          <span className="text-lg font-black text-slate-900">${product.price}</span>
        </div>

        <button
          type="button"
          onClick={handleAddToCartClick}
          className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}