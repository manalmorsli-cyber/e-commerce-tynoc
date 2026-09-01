'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{ id: string; title: string; price: number; quantity: number }>;
}

export default function MyOrdersPage() {
  const { user, isMounted } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/orders?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar showSearch={false} />

      <main className="flex-grow max-w-4xl w-full mx-auto py-10 px-4 sm:px-6">
        <h1 className="text-2xl font-black text-slate-900 mb-6">My Orders</h1>

        {!isMounted || loading ? (
          <p className="text-xs text-slate-500">Loading your orders...</p>
        ) : !user ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
            <p className="text-xs text-slate-600">Please sign in to view your order history.</p>
            <Link href="/login" className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs">
              Sign In
            </Link>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
            <p className="text-xs text-slate-500">You haven&apos;t placed any orders yet.</p>
            <Link href="/" className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{order.id}</span>
                    <p className="text-[10px] text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 font-bold rounded-full text-[10px]">
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-slate-600">
                      <span>{item.title} (x{item.quantity || 1})</span>
                      <span className="font-semibold text-slate-900">${(Number(item.price) * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600">Total</span>
                  <span className="text-sm font-black text-blue-600">${Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}