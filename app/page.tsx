'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/products';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extraction des catégories uniques à partir des produits
  const categories = ['All', ...Array.from(new Set(mockProducts.map((p) => p.category)))];

  // Filtrage combiné : Recherche texte + Catégorie
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Banner */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              New Collection 2026
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Premium Products for Your Everyday Life.
            </h1>
            <p className="text-slate-300 text-base">
              Discover our curated selection of high-quality items delivered straight to your door.
            </p>
          </div>
        </section>

        {/* Categories & Filter Bar */}
        <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">
            Showing {filteredProducts.length} product{filteredProducts.length > 1 ? 's' : ''}
          </span>
        </section>

        {/* Products Grid */}
        <section>
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your search or category filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}