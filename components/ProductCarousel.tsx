'use client';

import { useRef } from 'react';
import ProductCard from '@/components/ProductCard';

interface ProductCarouselProps {
  products: any[];
  title: string;
}

export default function ProductCarousel({ products, title }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">Fast delivery available for all items below</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 bg-white hover:bg-amber-400 hover:border-amber-400 text-slate-700 hover:text-slate-950 font-bold flex items-center justify-center transition-all shadow-sm cursor-pointer"
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            onClick={scrollRight}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 bg-white hover:bg-amber-400 hover:border-amber-400 text-slate-700 hover:text-slate-950 font-bold flex items-center justify-center transition-all shadow-sm cursor-pointer"
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      {/* Conteneur défilant compact */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth py-2 -mx-2 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product.id} className="w-64 sm:w-72 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}