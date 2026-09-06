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


const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200/80 p-4 w-full h-[320px] flex flex-col justify-between animate-pulse shadow-sm">
    <div className="h-40 bg-slate-100 rounded-xl mb-4 w-full"></div>
    <div className="space-y-3">
      <div className="h-3 bg-slate-100 rounded-full w-1/4"></div>
      <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
    </div>
    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
      <div className="h-6 bg-slate-100 rounded-full w-1/3"></div>
      <div className="h-8 bg-slate-100 rounded-lg w-1/4"></div>
    </div>
  </div>
);

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

  // Filter products based on search query and category selection
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All';

  // Select items with badges for Flash Deals section or fallback to first 4 items
  const badgedProducts = products.filter((product) => product.badge);
  const flashSaleProducts = badgedProducts.length > 0 ? badgedProducts.slice(0, 4) : products.slice(0, 4);

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
          
          {!isFiltering && flashSaleProducts.length > 0 && (
            

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

            {/* Skeleton Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <ProductSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center max-w-2xl mx-auto mt-8">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 text-2xl border border-slate-100">
                  🔍
                </div>
                <p className="text-lg font-bold text-slate-900">No products found</p>
                <p className="text-xs text-slate-500 mt-2 max-w-sm">
                  We couldn't find any products matching your current filters. Try adjusting your search query or category.
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-6 text-xs font-bold text-blue-600 bg-blue-50 px-5 py-2.5 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  Clear Filters
                </button>
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