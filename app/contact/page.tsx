'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar showSearch={false} />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <span className="bg-blue-600/10 text-blue-600 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md tracking-wider">
              Contact Us
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-2">Get in Touch</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Have questions about your order or products? Send us a message below.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <span className="text-3xl block">✓</span>
                <h3 className="text-lg font-bold text-slate-900">Message Sent!</h3>
                <p className="text-xs text-slate-500">Thank you for reaching out. We will get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-blue-600"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-md shadow-blue-600/20"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </main>
      </div>

    </div>
  );
}