"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Products", href: "/admin/products", icon: "📦" },
  { name: "Categories", href: "/admin/categories", icon: "🏷️" },
  { name: "Users", href: "/admin/users", icon: "👥" },
  { name: "Carts & Wishlists", href: "/admin/activity", icon: "🛒" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col justify-between border-r border-gray-800">
      <div>
        <div className="p-3 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-3">
            <img 
              src="/icon.svg" 
              alt="VeloceStore Logo" 
              className="w-8 h-8 object-contain shrink-0" 
            />
            
            <span className="text-base font-bold text-white tracking-wide">
              Admin Panel
            </span>
          </Link>
        </div>

        <nav className="mt-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-gray-400 hover:bg-gray-800/80 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-gray-800 text-xs text-gray-500">
        <Link
          href="/"
          className="hover:underline flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Storefront
        </Link>
      </div>
    </aside>
  );
}