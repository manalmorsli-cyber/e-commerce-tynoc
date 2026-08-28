'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Ultra-Smart Watch Series V',
    subtitle: 'Real-time performance tracking with up to 7-day battery life.',
    price: '$299.99',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80',
  },
  {
    id: 2,
    title: 'Next-Gen Wireless Headphones',
    subtitle: 'Active noise cancellation engineered for high-fidelity audio.',
    price: '$199.99',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full bg-slate-100 overflow-hidden min-h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Info */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {slide.title}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-lg">
            {slide.subtitle}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="#products"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md"
            >
              Start Shopping
            </Link>
            <div className="px-5 py-3 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-900">
              {slide.price}
            </div>
          </div>
        </div>

        {/* Right Side Visual Frame */}
        <div className="flex justify-center items-center relative">
          <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border-4 border-blue-500/30 p-2 relative shadow-2xl">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-full bg-white"
            />
          </div>
        </div>

      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              current === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}