'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RelatedProducts from '@/components/RelatedProducts';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart, wishlist = [], toggleWishlist } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping'>('specs');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data: Product = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const isWishlisted = product
    ? wishlist.some((item: Product) => String(item.id) === String(product.id))
    : false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar showSearch={false} />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar showSearch={false} />
        <main className="max-w-7xl mx-auto px-4 py-20 text-center flex-grow">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
          <p className="text-slate-500 text-sm mb-6">The requested product does not exist.</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-colors"
          >
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const productImages: string[] =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image];

  const currentImage = productImages[selectedImageIndex] || product.image;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar showSearch={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category || 'General'}</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        {/* Main Product Block */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image Gallery */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
              {productImages.length > 1 && (
                <div className="flex sm:flex-col gap-2 shrink-0 overflow-x-auto sm:overflow-visible">
                  {productImages.map((imgUrl: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all bg-slate-100 p-1 shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-blue-600 ring-2 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image Container */}
              <div className="relative flex-1 h-[350px] sm:h-[420px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 p-4 flex items-center justify-center">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
                  onClick={() => setIsZoomOpen(true)}
                />
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md hover:bg-white transition-all flex items-center gap-1.5"
                >
                  🔍 <span>Zoom</span>
                </button>
              </div>
            </div>

            {/* Product Info & Purchase Panel */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {product.category || 'General'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    In Stock (Ready to ship)
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  {product.title}
                </h1>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400">Taxes included</span>
                </div>

                <p className="mt-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {product.description ||
                    'No detailed description provided for this item.'}
                </p>
              </div>

              {/* Action Panel */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden h-11">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900 min-w-[30px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 px-5 rounded-xl transition-all shadow-lg text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🛒</span>
                    <span>
                      Add to Cart ($
                      {(Number(product.price) * quantity).toFixed(2)})
                    </span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base">{isWishlisted ? '♥' : '♡'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-slate-500 font-medium">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    🚚 Fast Delivery
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    🛡️ 1 Year Warranty
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    ↺ Easy 30-day Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs & Shipping Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex border-b border-slate-200 gap-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'shipping'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Shipping & Returns
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="flex justify-between py-2 px-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Category</span>
                <span className="font-bold text-slate-800 capitalize">
                  {product.category || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-2 px-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Availability</span>
                <span className="font-bold text-emerald-600">In Stock</span>
              </div>
              <div className="flex justify-between py-2 px-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Condition</span>
                <span className="font-bold text-slate-800">Brand New</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-600 space-y-2 pt-2 leading-relaxed">
              <p>• Standard shipping takes 2-4 business days.</p>
              <p>• Free returns within 30 days of purchase.</p>
              <p>• Tracked shipping details sent via email upon dispatch.</p>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </main>

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 text-white bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full font-bold flex items-center justify-center text-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
          <div className="max-w-4xl max-h-[85vh] p-4 bg-white rounded-2xl overflow-hidden flex items-center justify-center">
            <img
              src={currentImage}
              alt="Zoom"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}