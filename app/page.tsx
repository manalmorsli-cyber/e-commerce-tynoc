'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
    image: 'https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=500&q=80',
    rating: 4.9,
  },
];

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showSearch={true}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-slate-900">Featured Products</h1>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto">
              <span className="text-3xl block mb-2">🔍</span>
              <h3 className="text-sm font-bold text-slate-900">No products found</h3>
              <p className="text-slate-500 text-xs mt-1">
                Try searching for something else or change category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>


    </div>
  );
}