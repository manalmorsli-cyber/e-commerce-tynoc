'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { wishlist = [], toggleWishlist } = useCart();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const allProducts: Product[] = await res.json();

          // Strict case-insensitive category match and exclusion of current item
          const filtered = allProducts.filter((p) => {
            const matchesCategory =
              p.category &&
              category &&
              p.category.trim().toLowerCase() === category.trim().toLowerCase();
            const isDifferentProduct = String(p.id) !== String(currentProductId);

            return matchesCategory && isDifferentProduct;
          });

          setRelatedProducts(filtered.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentProductId && category) {
      fetchRelatedProducts();
    }
  }, [currentProductId, category]);

  if (isLoading || relatedProducts.length === 0) return null;

  return (
    <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">You Might Also Like</h2>
        <span className="text-xs text-slate-400 capitalize">
          Similar items in {category}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((item) => {
          const isWishlisted = wishlist.some(
            (w: Product) => String(w.id) === String(item.id)
          );

          return (
            <div
              key={item.id}
              className="group relative bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(item);
                }}
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-white/80 text-slate-400 hover:text-slate-700 border border-slate-200'
                }`}
              >
                {isWishlisted ? '♥' : '♡'}
              </button>

              <Link href={`/product/${item.id}`} className="block space-y-3">
                <div className="h-36 w-full rounded-xl bg-white p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {item.category}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                    {item.title}
                  </h3>
                </div>
              </Link>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-200/60">
                <span className="text-sm font-black text-slate-900">
                  ${Number(item.price).toFixed(2)}
                </span>
                <Link
                  href={`/product/${item.id}`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  View →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}