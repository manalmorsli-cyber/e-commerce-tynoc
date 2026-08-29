'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCarousel from '@/components/ProductCarousel';
import ProductCard from '@/components/ProductCard';

const initialProducts = [
  {
    id: '1',
    title: 'Pro Wireless Headphones',
    description: 'Active noise cancellation, 30-hour battery life, and premium spatial sound quality.',
    price: 199,
    category: 'Electronics',
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Heart rate tracking, built-in GPS, active sleep monitoring, and water-resistant up to 50m.',
    price: 149,
    category: 'Electronics',
    badge: 'SPEED EDITION',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    rating: 4.5,
  },
  {
    id: '3',
    title: 'Ergonomic Laptop Backpack',
    description: 'Smart storage, 15-inch padded laptop compartment, and durable water-resistant fabric.',
    price: 89,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    rating: 4.6,
  },
  {
    id: '4',
    title: 'Minimalist Desk Mat',
    description: 'Premium vegan leather desk pad, waterproof surface, and anti-slip rubber base.',
    price: 35,
    category: 'Accessories',
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    rating: 4.9,
  },
];

const categories = ['All', 'Electronics', 'Accessories'];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showSearch={true}
      />

      {/* 1. HERO BANNER EN HAUT */}
      {!isFiltering && <HeroCarousel />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* 2. REASSURANCE BADGES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Fast Shipping</h4>
              <p className="text-[11px] text-slate-500">Same-day dispatch</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Secure Payment</h4>
              <p className="text-[11px] text-slate-500">100% encrypted</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <span className="text-2xl">🔄</span>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">30 Days Return</h4>
              <p className="text-[11px] text-slate-500">Money back guarantee</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">24/7 Support</h4>
              <p className="text-[11px] text-slate-500">Dedicated assistance</p>
            </div>
          </div>
        </div>

        {/* 3. TRENDING CAROUSEL */}
        {!isFiltering && (
          <ProductCarousel products={initialProducts} title="🔥 Trending Fast Deals" />
        )}

        {/* 4. CATALOGUE GENERAL */}
        <div id="products" className="scroll-mt-24 pt-4 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {isFiltering ? 'Search Results' : 'Explore Catalog'}
              </h2>
              <p className="text-xs text-slate-500">
                {isFiltering
                  ? `Showing products matching your criteria (${filteredProducts.length})`
                  : 'Filter by category or browse all items'}
              </p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}