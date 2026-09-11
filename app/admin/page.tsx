"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalUsers: number;
  totalCarts: number;
  totalWishlists: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Users", value: stats?.totalUsers ?? 0, icon: "👥", color: "bg-blue-500" },
    { label: "Total Products", value: stats?.totalProducts ?? 0, icon: "📦", color: "bg-emerald-500" },
    { label: "Total Categories", value: stats?.totalCategories ?? 0, icon: "🏷️", color: "bg-purple-500" },
    { label: "Active Carts", value: stats?.totalCarts ?? 0, icon: "🛒", color: "bg-amber-500" },
    { label: "Saved Wishlists", value: stats?.totalWishlists ?? 0, icon: "❤️", color: "bg-pink-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Overview Dashboard</h1>
      </div>

      {loading ? (
        <div className="p-6 text-slate-500 text-sm font-medium">
          Loading admin metrics...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((card) => (
            <StatCard
              key={card.label}
              title={card.label}
              value={card.value}
              icon={card.icon}
              dotColor={card.color}
            />
          ))}
        </div>
      )}
    </div>
  );
}