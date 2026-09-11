import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  dotColor?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  dotColor = "bg-blue-500",
}: StatCardProps) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="text-2xl">{icon}</div>
        <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
      </div>
      <div className="mt-4">
        <p className="text-xs text-slate-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  );
}