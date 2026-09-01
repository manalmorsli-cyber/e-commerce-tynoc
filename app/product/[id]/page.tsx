'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart, wishlist = [], toggleWishlist } = useCart();

  // États locaux
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Noir Carbone');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // Fetch product from DynamoDB
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const isWishlisted = product
    ? wishlist.some((item: any) => String(item.id) === String(product.id))
    : false;

  // Écran de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  // Écran Produit introuvable (404 handling exigé par le projet)
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-20 text-center flex-grow">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Produit introuvable</h1>
          <p className="text-slate-500 text-sm mb-6">
            Le produit que vous cherchez n'existe pas ou a été déplacé.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Galerie d'images sécurisée (fallback si pas d'images multiples)
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [
        product.image || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
      ];

  const currentImage = productImages[selectedImageIndex];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full space-y-8">
        {/* FIL D'ARIANE */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">{product.category || 'Accessoires'}</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        {/* BLOC PRINCIPAL PRODUIT */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* GALERIE IMAGES */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
              <div className="flex sm:flex-col gap-2 shrink-0 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                {productImages.map((imgUrl: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-50 shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-blue-600 ring-2 ring-blue-600/20 scale-95'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="relative flex-1 h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-slate-100 group border border-slate-100">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                  onClick={() => setIsZoomOpen(true)}
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  🔍 <span>Cliquer pour zoomer</span>
                </button>
              </div>
            </div>

            {/* INFORMATIONS ET ACTIONS */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {product.category || 'Accessoires'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    En stock
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {product.title}
                </h1>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>

                <p className="mt-3 text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {product.description || 'Description non disponible pour ce produit.'}
                </p>
              </div>

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
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 px-5 rounded-xl transition-all shadow-lg text-xs flex items-center justify-center gap-2"
                  >
                    <span>🛒</span>
                    <span>Ajouter ({quantity})</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base">{isWishlisted ? '♥' : '♡'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ONGLETS REPOSANT SUR DES TEXTES STATIQUES OU DE LA BDD */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex border-b border-slate-200 gap-6 mb-6">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-xs font-bold transition-all border-b-2 ${
                activeTab === 'desc' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
              }`}
            >
              Description détaillée
            </button>
          </div>
          {activeTab === 'desc' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed max-w-4xl">
              <p>{product.description || "Aucune description détaillée disponible."}</p>
            </div>
          )}
        </div>
      </main>

      {/* MODAL LIGHTBOX / ZOOM PLEIN ÉCRAN */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 text-white bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full font-bold flex items-center justify-center text-lg transition-colors"
          >
            ✕
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={currentImage}
              alt="Zoom Produit"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}