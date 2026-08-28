import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/products';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Banner */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-12 relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              New Collection 2026
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Premium Products for Your Everyday Life.
            </h1>
            <p className="text-slate-300 text-base mb-6">
              Discover our curated selection of high-quality items delivered straight to your door.
            </p>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}