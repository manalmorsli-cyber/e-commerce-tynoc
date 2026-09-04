'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar showSearch={false} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mb-12">
            <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md tracking-wider">
              About Us
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-3 mb-4">
              High quality products, delivered at lightning speed.
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              VeloceStore is a modern e-commerce platform dedicated to curating premium tech gear and accessories. Built with speed and customer satisfaction in mind, we offer a seamless shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
                ⚡
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Fast Dispatch</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All orders are processed and shipped same day for maximum delivery speed.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center font-bold text-lg mb-4">
                🛡️
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Verified Quality</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We strictly partner with top manufacturers to ensure every product meets high standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
                💬
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">24/7 Assistance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our support team is available around the clock to answer your queries.
              </p>
            </div>
          </div>
        </main>
      </div>
     <Footer />
    </div>
  );
}