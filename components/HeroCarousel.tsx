'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Next-Gen Audio Experience',
    subtitle: 'PRO WIRELESS HEADPHONES',
    description: 'Immerse yourself in active noise cancellation and 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
    buttonText: 'Shop Now',
    badge: 'NEW ARRIVAL',
  },
  {
    id: 2,
    title: 'Track Your Speed & Fitness',
    subtitle: 'SMART FITNESS WATCH',
    description: 'Built-in GPS, active sleep monitoring, and water resistance up to 50 meters.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80',
    buttonText: 'Explore Gear',
    badge: 'SPEED EDITION',
  },
  {
    id: 3,
    title: 'Ergonomic Daily Carry',
    subtitle: 'PREMIUM LAPTOP BACKPACK',
    description: 'Smart storage organization crafted with ultra-durable water-resistant fabric.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80',
    buttonText: 'View Collection',
    badge: 'BEST SELLER',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl mb-10 group">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative h-[360px] sm:h-[420px] flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-xl px-6 sm:px-12 space-y-4">
              <span className="inline-block bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1 rounded-md">
                {slide.badge}
              </span>
              <p className="text-amber-400 font-bold text-xs uppercase tracking-widest">
                {slide.subtitle}
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {slide.title}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm line-clamp-2">
                {slide.description}
              </p>
              <div>
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {slide.buttonText} <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-amber-500 text-white hover:text-slate-950 flex items-center justify-center backdrop-blur-md transition-all border border-white/10 cursor-pointer"
        aria-label="Previous Slide"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-amber-500 text-white hover:text-slate-950 flex items-center justify-center backdrop-blur-md transition-all border border-white/10 cursor-pointer"
        aria-label="Next Slide"
      >
        ›
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              current === index ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}