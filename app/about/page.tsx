'use client';

import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mb-12">
          <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md tracking-wider">
            À Propos
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3 mb-4">
            Des produits de haute qualité, livrés rapidement.
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            VeloceStore est une boutique en ligne spécialisée dans la sélection d'équipements technologiques et d'accessoires premium. Notre objectif est d'offrir une expérience d'achat fluide, transparente et ultra-rapide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
              ⚡
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">Expédition Express</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Toutes les commandes sont traitées et préparées le jour même pour une réception dans les plus brefs délais.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center font-bold text-lg mb-4">
              🛡️
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">Produits Garantis</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nous sélectionnons uniquement des articles vérifiés répondant aux normes de qualité les plus strictes.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
              💬
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">Support Réactif</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Notre équipe d'assistance est à votre disposition pour répondre à toutes vos questions avant et après votre achat.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}