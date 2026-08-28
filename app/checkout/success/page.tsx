'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'VS-123456';

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-100 max-w-lg mx-auto my-12 shadow-sm">
      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
        Order Confirmed
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-2">Thank you for your order!</h1>
      <p className="text-gray-500 text-sm mb-6">
        We have received your order <span className="font-bold text-gray-800">#{orderId}</span> and are getting it ready.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10 flex-1 w-full">
        <Suspense fallback={<div className="text-center py-20">Loading order details...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}