'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState('Order Status');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How fast will my order ship?',
      a: 'All orders placed before 2:00 PM EST are dispatched the exact same business day. Delivery takes 1-3 days.',
    },
    {
      q: 'What is your return & refund policy?',
      a: 'We offer a 30-day money-back guarantee. Return any item in original condition for a 100% full refund.',
    },
    {
      q: 'How can I track my shipment?',
      a: 'Once shipped, you will instantly receive an automated email containing your tracking link.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 px-3.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">24/7 Dedicated Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">How Can We Help You?</h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Have a question about an order, shipment, or tech spec? Send a message and our team will respond within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center text-xl shrink-0 font-bold">
                ✉️
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Direct Email</h3>
                <p className="text-xs text-slate-500 mb-1">Our support team reads every email.</p>
                <a href="mailto:support@velocestore.com" className="text-xs font-extrabold text-blue-600 hover:underline">
                  support@velocestore.com
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-slate-900 flex items-center justify-center text-xl shrink-0 font-bold">
                ⚡
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Live Assistance</h3>
                <p className="text-xs text-slate-500 mb-1">Available Monday to Friday (9am - 8pm EST).</p>
                <span className="text-xs font-extrabold text-amber-500 uppercase tracking-wider">Fast Response Guaranteed</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl shrink-0 font-bold">
                📍
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Headquarters</h3>
                <p className="text-xs text-slate-500">100 Innovation Boulevard, Tech District</p>
                <span className="text-xs font-semibold text-slate-400">San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-amber-400/20 text-slate-900 text-2xl font-black rounded-full flex items-center justify-center mx-auto">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto">
                    Thank you for contacting us regarding <span className="font-bold text-slate-800">"{topic}"</span>. We will review your request and reply shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subject Category</label>
                    <div className="flex flex-wrap gap-2">
                      {['Order Status', 'Product Question', 'Returns & Refunds', 'Other'].map((item) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => setTopic(item)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                            topic === item
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Message</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 bg-slate-50"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-xs transition-all shadow-md shadow-blue-600/20 active:scale-95"
                  >
                    Submit Support Ticket
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <section className="max-w-3xl mx-auto pt-8 border-t border-slate-200/80">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <span className="text-blue-600 font-extrabold">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}