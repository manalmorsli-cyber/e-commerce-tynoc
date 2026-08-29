'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  const values = [
    {
      icon: '⚡',
      title: 'Ultra-Fast Dispatch',
      desc: 'Every order is processed through our automated distribution hubs within hours.',
    },
    {
      icon: '💎',
      title: 'Uncompromised Quality',
      desc: 'We strictly partner with verified manufacturers to guarantee premium grade materials.',
    },
    {
      icon: '🛡️',
      title: 'Buyer Protection',
      desc: '30-day hassle-free returns and end-to-end encrypted transactions for total peace of mind.',
    },
    {
      icon: '🌱',
      title: 'Sustainable Packaging',
      desc: '100% recyclable, plastic-free eco-boxes designed to reduce carbon footprint.',
    },
  ];

  const milestones = [
    { year: '2023', title: 'The Genesis', desc: 'Founded with a vision to redefine e-commerce speed.' },
    { year: '2024', title: 'Global Reach', desc: 'Expanded shipping logistics to over 45 countries worldwide.' },
    { year: '2025', title: '100k+ Customers', desc: 'Passed 100,000 active happy tech enthusiasts.' },
    { year: '2026', title: 'Next-Gen Platform', desc: 'Launched VeloceStore v2 with real-time tracking.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="overflow-hidden">
        <section className="relative bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-4 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Driven by Speed & Precision</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              We Build the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">Shopping</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              VeloceStore was engineered for people who demand excellence without the wait. High-performance technology, curated accessories, and frictionless logistics.
            </p>

            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/#products"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-blue-600/30 active:scale-95"
              >
                Explore Catalog
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50 text-center">
              <span className="text-3xl sm:text-4xl font-black text-blue-600 block mb-1">24h</span>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Average Dispatch</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50 text-center">
              <span className="text-3xl sm:text-4xl font-black text-amber-500 block mb-1">99.8%</span>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Satisfaction Rate</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50 text-center">
              <span className="text-3xl sm:text-4xl font-black text-blue-600 block mb-1">150k+</span>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Orders Delivered</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50 text-center">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 block mb-1">4.9 ★</span>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Global Rating</span>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-black text-amber-500 uppercase tracking-widest">Our DNA</span>
            <h2 className="text-3xl font-black text-slate-900">Why Modern Shoppers Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-blue-600/40 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-amber-400/20 text-2xl flex items-center justify-center mb-4 transition-colors">
                  {val.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-blue-600 transition-colors">{val.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border-y border-slate-200/80 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Roadmap</span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">Our Journey So Far</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {milestones.map((item, idx) => (
                <div key={idx} className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <span className="text-xs font-black text-amber-500 bg-amber-400/10 px-2.5 py-1 rounded-md">
                    {item.year}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm pt-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-slate-900 rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-4 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Ready to Experience True Speed?</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Join thousands of satisfied customers who receive their premium gear with express delivery today.
              </p>
              <div className="pt-2">
                <Link
                  href="/#products"
                  className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold px-8 py-3.5 rounded-xl text-xs transition-all shadow-md active:scale-95"
                >
                  Start Shopping Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}