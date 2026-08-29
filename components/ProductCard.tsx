'use client';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  badge?: string;
  image: string;
  rating: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300 group">
      <div>
        {/* Image avec hauteur fixe et 'object-cover' */}
        <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-slate-100 mb-3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback image si l'URL échoue
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80';
            }}
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
              {product.badge}
            </span>
          )}

          {/* Bouton Wishlist */}
          <button
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm backdrop-blur-sm transition-all cursor-pointer"
            aria-label="Add to wishlist"
          >
            ♥
          </button>
        </div>

        {/* Informations produit */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
            <span>★ {product.rating}</span>
            <span className="text-slate-400 font-normal">(120)</span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
            {product.title}
          </h3>

          <p className="text-slate-500 text-[11px] line-clamp-2 leading-tight">
            {product.description}
          </p>
        </div>
      </div>

      {/* Prix & Bouton d'action */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Prix</span>
          <span className="text-base font-black text-slate-900">${product.price}</span>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm shadow-blue-600/20 active:scale-95 cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
}