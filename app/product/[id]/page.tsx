'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { mockProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Recherche du produit par son ID
  const product = mockProducts.find((p) => p.id === id);
  const isWishlisted = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-20 text-center flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Breadcrumb / Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to products
        </Link>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Product Image */}
          <div className="relative aspect-square w-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
              {product.category}
            </span>
          </div>

          {/* Product Info & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h1 className="text-3xl font-extrabold text-gray-900">{product.title}</h1>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-3 rounded-full bg-gray-50 hover:bg-rose-50 transition-colors border border-gray-100"
                  aria-label="Wishlist"
                >
                  <svg
                    className={`w-6 h-6 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : 'stroke-gray-600 fill-none'}`}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
                  ★ <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal ml-1">(48 reviews)</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-extrabold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <div className="border-t border-b border-gray-100 py-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}