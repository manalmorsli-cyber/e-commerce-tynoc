'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart, wishlist = [], toggleWishlist } = useCart();

  // États locaux
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Noir Carbone');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // Produit sélectionné
  const product = mockProducts.find((p: any) => String(p.id) === String(id));
  const isWishlisted = product
    ? wishlist.some((item: any) => String(item.id) === String(product.id))
    : false;

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

  // Galerie d'images simulée (Image principale + déclinaisons pour démo)
  const productImages = (product as any).images || [
    product.image,
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
  ];

  const currentImage = productImages[selectedImageIndex] || product.image;

  // Ajout au panier avec la quantité choisie
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full space-y-8">
        
        {/* FIL D'ARIANE (Breadcrumb) */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer">{product.category || 'Accessoires'}</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        {/* BLOC PRINCIPAL PRODUIT (Optimisé pour tenir dans l'écran) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* GALERIE IMAGES (7 Cols sur Desktop) */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
              
              {/* VIGNETTES LATÉRALES */}
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

              {/* IMAGE PRINCIPALE (AVEC SURVOL ET ZOOM) */}
              <div className="relative flex-1 h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-slate-100 group border border-slate-100">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                  onClick={() => setIsZoomOpen(true)}
                />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                    {product.badge}
                  </span>
                )}

                {/* Bouton d'indication Zoom */}
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  🔍 <span>Cliquer pour zoomer</span>
                </button>
              </div>
            </div>

            {/* INFORMATIONS ET ACTIONS (5 Cols sur Desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              
              <div>
                {/* Catégorie & Stock */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {product.category || 'Accessoires'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    En stock (Expédié sous 24h)
                  </span>
                </div>

                {/* Titre */}
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {product.title}
                </h1>

                {/* Évaluation */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <span className="text-xs font-bold text-slate-700">4.9</span>
                  <span className="text-xs text-slate-400">• (128 avis vérifiés)</span>
                </div>

                {/* Prix */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ${(Number(product.price) * 1.25).toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
                    -20%
                  </span>
                </div>

                {/* Court extrait descriptif */}
                <p className="mt-3 text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {product.description ||
                    'Rangement intelligent avec compartiment matelassé pour ordinateur 15", tissu imperméable haute densité et finitions haut de gamme.'}
                </p>
              </div>

              {/* SÉLECTEURS (COULEUR & QUANTITÉ) */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                
                {/* Couleurs */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-2">
                    Couleur : <span className="text-blue-600">{selectedColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {['Noir Carbone', 'Gris Sidéral', 'Bleu Nuit'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantité & Favoris */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden h-11">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 text-sm transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900 min-w-[30px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 text-sm transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Bouton Ajouter au Panier */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold h-11 px-5 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🛒</span>
                    <span>Ajouter au Panier ({quantity})</span>
                  </button>

                  {/* Bouton Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base">{isWishlisted ? '♥' : '♡'}</span>
                  </button>
                </div>
              </div>

              {/* BADGES DE RÉASSURANCE */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <span>🚚</span> <span>Livraison rapide 24/48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛡️</span> <span>Garantie constructeur 2 ans</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔄</span> <span>Retours faciles sous 30j</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔒</span> <span>Paiement 100% sécurisé</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* SECTION ONGLETS DÉTAILLÉS (Description, Specs, Avis) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex border-b border-slate-200 gap-6 mb-6">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === 'desc'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Description détaillée
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === 'specs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Fiche Technique
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Avis Clients (128)
            </button>
          </div>

          {/* Contenu Onglet 1: Description */}
          {activeTab === 'desc' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed max-w-4xl">
              <p>
                Ce produit a été rigoureusement conçu pour allier style moderne et durabilité exceptionnelle. Que ce soit pour une utilisation quotidienne professionnelle, le voyage ou vos activités de loisir, il s'adapte parfaitement à vos besoins.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Matériaux haute résistance et finitions renforcées.</li>
                <li>Ergonomie optimisée pour un confort d'utilisation tout au long de la journée.</li>
                <li>Design élégant et intemporel compatible avec toutes vos tenues.</li>
              </ul>
            </div>
          )}

          {/* Contenu Onglet 2: Spécifications */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Marque</span>
                <span className="font-bold text-slate-800">Veloce Premium</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Matériau principal</span>
                <span className="font-bold text-slate-800">Nylon balistique imperméable</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Compatibilité PC</span>
                <span className="font-bold text-slate-800">Jusqu'à 15.6 pouces</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Poids</span>
                <span className="font-bold text-slate-800">850 g</span>
              </div>
            </div>
          )}

          {/* Contenu Onglet 3: Avis */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-3xl">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Thomas D.</span>
                  <span className="text-amber-400">★★★★★</span>
                </div>
                <p className="text-xs text-slate-600">
                  Excellente qualité ! Reçu en 24h, très bien emballé. La finition est irréprochable.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Sarah M.</span>
                  <span className="text-amber-400">★★★★★</span>
                </div>
                <p className="text-xs text-slate-600">
                  Super produit, très confortable à porter au quotidien. Je recommande vivement.
                </p>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* MODAL LIGHTBOX / ZOOM PLEIN ÉCRAN */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 text-white bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full font-bold flex items-center justify-center text-lg cursor-pointer transition-colors"
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