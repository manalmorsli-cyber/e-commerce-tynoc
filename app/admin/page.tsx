"use client";
import { useEffect, useState } from "react";

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading admin metrics...</div>;
  }

  const statCards = [
    { label: "Total Users", value: stats?.totalUsers ?? 0, icon: "👥", color: "bg-blue-500" },
    { label: "Total Products", value: stats?.totalProducts ?? 0, icon: "📦", color: "bg-green-500" },
    { label: "Total Categories", value: stats?.totalCategories ?? 0, icon: "🏷️", color: "bg-purple-500" },
    { label: "Active Carts", value: stats?.totalCarts ?? 0, icon: "🛒", color: "bg-orange-500" },
    { label: "Saved Wishlists", value: stats?.totalWishlists ?? 0, icon: "❤️", color: "bg-pink-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time stats from AWS DynamoDB instance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{card.icon}</span>
              <span className={`w-3 h-3 rounded-full ${card.color}`} />
            </div>
            <p className="text-sm font-medium text-gray-500 mt-3">{card.label}</p>
            <p className="text-2xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}