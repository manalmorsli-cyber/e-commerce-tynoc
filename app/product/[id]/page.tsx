'use client';

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

  // Recherche du produit par ID (sécurisé)
  const product = mockProducts.find((p: any) => String(p.id) === String(id));

  // Vérification Wishlist directe sans utiliser isInWishlist qui faisait planter la page
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Image Produit */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title || (product as any).name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-md shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Informations Produit */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {product.category || 'Électronique'}
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {product.title || (product as any).name}
              </h1>

              <div className="text-3xl font-black text-slate-900">
                ${product.price}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {product.description ||
                  "Un produit d'exception conçu pour répondre à tous vos besoins quotidiens avec performance, élégance et durabilité."}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-blue-600/20 text-sm cursor-pointer text-center"
              >
                Ajouter au Panier 🛒
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title="Wishlist"
              >
                <span className="text-lg">♥</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}