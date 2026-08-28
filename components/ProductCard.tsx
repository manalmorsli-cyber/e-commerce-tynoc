'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:scale-110 transition-transform"
        aria-label="Add to wishlist"
      >
        <svg
          className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : 'stroke-gray-600 fill-none'}`}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <div>
        {/* Product Image & Link */}
        <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-50 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700">
            {product.category}
          </span>
        </Link>

        {/* Product Details */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <Link href={`/product/${product.id}`} className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.title}
            </Link>
            <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
              ★ <span>{product.rating}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>
      </div>

      {/* Price & Action */}
      <div className="p-5 pt-0 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-gray-400 block">Price</span>
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}