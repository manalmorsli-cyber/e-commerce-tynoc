'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/types';

const HeroCarousel = dynamic(() => import('@/components/HeroCarousel'), {
  ssr: false,
});

const ProductCarousel = dynamic(() => import('@/components/ProductCarousel'), {
  ssr: false,
});

const flashSaleProducts: Product[] = [
  {
    id: 'flash-1',
    title: 'Limited Edition Earbuds',
    description: 'Ultra-low latency audio with active noise cancellation.',
    price: 119,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    rating: { rate: 4.9, count: 128 },
  }
];

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    async function fetchData() {
      try {
        setIsLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);

        if (productsRes.ok) {
          const productsData: Product[] = await productsRes.json();
          setProducts(productsData);
        }

        if (categoriesRes.ok) {
          const categoriesData: Category[] = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error loading data from database:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Fast Shipping</h4>
                <p className="text-[10px] text-slate-500">Same-day dispatch</p>
              </div>
            </div>
          </div>

          {!isFiltering && (
            

<ProductCarousel products={flashSaleProducts} title="🔥 Limited Time Flash Deals" />
          )}

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
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'All'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat.name
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

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