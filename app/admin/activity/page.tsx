"use client";

import { useState, useEffect } from "react";

interface ProductItem {
  productId: string;
  title?: string;
  name?: string;
  price?: number;
  quantity?: number;
  imageUrl?: string;
  image?: string;
  product?: {
    name?: string;
    price?: number;
    imageUrl?: string;
  };
}

interface ActivityItem {
  id?: string;
  userId: string;
  user?: {
    name?: string;
    email?: string;
  };
  itemsCount?: number;
  items?: ProductItem[];
  updatedAt?: string;
}

export default function AdminActivityPage() {
  const [activeTab, setActiveTab] = useState<"carts" | "wishlists">("carts");
  const [carts, setCarts] = useState<ActivityItem[]>([]);
  const [wishlists, setWishlists] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  useEffect(() => {
    fetchActivityData();
  }, []);

  async function fetchActivityData() {
    try {
      setLoading(true);

      try {
        const cartsRes = await fetch("/api/admin/activity");
        if (cartsRes.ok) {
          const data = await cartsRes.json();
          setCarts(Array.isArray(data) ? data : data.carts || data.items || []);
        }
      } catch (err) {
        console.warn("Carts fetch notice:", err);
      }

      try {
        const wishlistsRes = await fetch("/api/admin/wishlists");
        if (wishlistsRes.ok) {
          const data = await wishlistsRes.json();
          setWishlists(Array.isArray(data) ? data : data.wishlists || data.items || []);
        }
      } catch (err) {
        console.warn("Wishlists fetch notice:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  const currentData = activeTab === "carts" ? carts : wishlists;

  // Calcul du total d'une activité
  const calculateTotal = (items?: ProductItem[]) => {
    if (!items) return 0;
    return items.reduce((acc, item) => {
      const price = item.price ?? item.product?.price ?? 0;
      const qty = item.quantity ?? 1;
      return acc + price * qty;
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Carts & Wishlists Activity</h1>
        <p className="text-slate-400 text-sm">
          Monitor live customer cart and wishlist interactions
        </p>
      </div>

      <div className="flex border-b border-slate-800 space-x-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab("carts")}
          className={`pb-3 transition ${
            activeTab === "carts"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Active Carts ({carts.length})
        </button>

        <button
          onClick={() => setActiveTab("wishlists")}
          className={`pb-3 transition ${
            activeTab === "wishlists"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-slate-400 hover:text-yellow-300"
          }`}
        >
          Saved Wishlists ({wishlists.length})
        </button>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-800/60 text-slate-400 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">{activeTab === "carts" ? "Items in Cart" : "Saved Items"}</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-slate-500">
                  Loading activity...
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-slate-500">
                  No active {activeTab} records found.
                </td>
              </tr>
            ) : (
              currentData.map((item, idx) => (
                <tr key={item.id || item.userId || idx} className="hover:bg-slate-800/30 transition">
                  <td className="p-4">
                    <p className="font-bold text-white">
                      {item.user?.name || item.user?.email || "Anonymous User"}
                    </p>
                    <p className="font-mono text-[10px] text-slate-500">{item.userId}</p>
                  </td>
                  <td className="p-4 font-bold text-white">
                    {item.itemsCount ?? (item.items?.length || 0)} item(s)
                  </td>
                  <td className="p-4 text-slate-400">
                    {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "Recently"}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedActivity(item)}
                      className="text-blue-400 hover:text-blue-300 font-bold transition"
                    >
                      Inspect Items
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* MODALE DETAILS DU PANIER / WISHLIST */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white">
                User {activeTab === "carts" ? "Cart" : "Wishlist"} Details
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-mono">
                {selectedActivity.items?.length || 0} items
              </span>
            </div>

            <div className="space-y-4">
              {/* Information client */}
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-xs">
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Client</p>
                <p className="text-white font-bold text-sm">
                  {selectedActivity.user?.name || selectedActivity.user?.email || "Utilisateur Anonyme"}
                </p>
                {selectedActivity.user?.email && (
                  <p className="text-slate-400">{selectedActivity.user.email}</p>
                )}
                <p className="text-slate-500 font-mono text-[10px] mt-1">
                  ID: {selectedActivity.userId}
                </p>
              </div>

              {/* Liste des produits */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {selectedActivity.items && selectedActivity.items.length > 0 ? (
                  selectedActivity.items.map((prod, idx) => {
                    const title = prod.title || prod.name || prod.product?.name || `Product ID: ${prod.productId}`;
                    const price = prod.price ?? prod.product?.price ?? 0;
                    const qty = prod.quantity ?? 1;
                    const img = prod.imageUrl || prod.image || prod.product?.imageUrl;

                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {img ? (
                            <img
                              src={img}
                              alt={title}
                              className="w-10 h-10 object-cover rounded-lg bg-slate-700 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-slate-500 flex-shrink-0">
                              📦
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-white truncate">{title}</p>
                            <p className="text-slate-400 text-[11px]">
                              {qty} × ${price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-emerald-400 whitespace-nowrap">
                          ${(qty * price).toFixed(2)}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-500 text-center py-4">
                    Aucun produit détaillé disponible.
                  </p>
                )}
              </div>

              {/* Total global */}
              {selectedActivity.items && selectedActivity.items.length > 0 && (
                <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm font-bold">
                  <span className="text-slate-400">Total Estimation:</span>
                  <span className="text-emerald-400 text-base">
                    ${calculateTotal(selectedActivity.items).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedActivity(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}