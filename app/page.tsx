'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

// Load Carousels dynamically without SSR to prevent Hydration errors
const HeroCarousel = dynamic(() => import('@/components/HeroCarousel'), {
  ssr: false,
});

const ProductCarousel = dynamic(() => import('@/components/ProductCarousel'), {
  ssr: false,
});

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  badge?: string;
  image: string;
  rating: number;
  stock?: number;
}

const flashSaleProducts: Product[] = [
  {
    id: 'flash-1',
    title: 'Limited Edition Earbuds',
    description: 'Ultra-low latency audio with active noise cancellation.',
    price: 119,
    category: 'Electronics',
    badge: 'FLASH SALE',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    rating: 4.9,
  },
  {
    id: 'flash-2',
    title: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches.',
    price: 89,
    category: 'Electronics',
    badge: 'HOT DEAL',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    rating: 4.7,
  },
  {
    id: 'flash-3',
    title: 'Power Bank 20000mAh',
    description: 'Fast charging dual USB ports with digital LED power display.',
    price: 45,
    category: 'Accessories',
    badge: '40% OFF',
    image: 'https://images.unsplash.com/photo-1609592424074-1a3b98ef1b70?w=500&q=80',
    rating: 4.8,
  },
];

const categories = ['All', 'Electronics', 'Accessories'];

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Prevent Hydration Mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch products from DynamoDB API
  useEffect(() => {
    if (!isMounted) return;

    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error loading products from database:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All';

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

        {!isFiltering && <HeroCarousel />}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Reassurance Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Fast Shipping</h4>
                <p className="text-[10px] text-slate-500">Same-day dispatch</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <span className="text-xl">🛡️</span>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Secure Payment</h4>
                <p className="text-[10px] text-slate-500">100% encrypted</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <span className="text-xl">🔄</span>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">30 Days Return</h4>
                <p className="text-[10px] text-slate-500">Money back guarantee</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <span className="text-xl">💬</span>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">24/7 Support</h4>
                <p className="text-[10px] text-slate-500">Dedicated assistance</p>
              </div>
            </div>
          </div>

          {/* Flash Sale Carousel */}
          {!isFiltering && (
            <ProductCarousel products={flashSaleProducts} title="🔥 Limited Time Flash Deals" />
          )}

          {/* Catalog Section */}
          <div id="products" className="scroll-mt-24 pt-2 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg sm:text-2xl font-black text-slate-900">
                  {isFiltering ? 'Search Results' : 'Explore Full Catalog'}
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

            {/* Product List / Loading State */}
            {isLoading ? (
              <div className="py-16 text-center text-slate-500">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="text-sm font-medium">Fetching products from DynamoDB Local...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                <p className="text-base font-semibold text-slate-700">No products found</p>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}