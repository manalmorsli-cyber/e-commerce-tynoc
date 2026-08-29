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
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12">
      {/* Header with Navigation Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">Fast delivery available for all items below</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-amber-400 hover:border-amber-400 text-slate-700 hover:text-slate-950 font-bold flex items-center justify-center transition-all shadow-sm cursor-pointer"
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            onClick={scrollRight}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-amber-400 hover:border-amber-400 text-slate-700 hover:text-slate-950 font-bold flex items-center justify-center transition-all shadow-sm cursor-pointer"
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal Scroll List */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-2 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[260px] sm:min-w-[290px] shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}