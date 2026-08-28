import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image */}
        <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700">
            {product.category}
          </span>
        </div>

        {/* Product Details */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
              ★ <span>{product.rating}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="p-5 pt-0 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-gray-400 block">Price</span>
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
}