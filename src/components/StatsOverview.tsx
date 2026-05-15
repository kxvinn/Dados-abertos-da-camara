"use client";

import { Deputy } from "../types";
import { Users, TrendingUp, Landmark } from "lucide-react";
import { motion } from "framer-motion";

interface StatsOverviewProps {
  deputies: Deputy[];
}

export default function StatsOverview({ deputies }: StatsOverviewProps) {
  const stats = [
    {
      label: "Total de Deputados",
      value: deputies.length,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/5",
    },
    {
      label: "Legislatura Atual",
      value: deputies[0]?.idLegislatura || "57",
      icon: Landmark,
      color: "text-cyan-500",
      bg: "bg-cyan-500/5",
    },
    {
      label: "Estados Representados",
      value: new Set(deputies.map((d) => d.siglaUf)).size,
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="glass p-6 rounded-3xl flex items-center gap-6 border-white/5"
        >
          <div className={`p-4 rounded-2xl ${stat.bg} border border-white/5`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
            <span className="text-3xl font-black text-primary font-outfit">{stat.value}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
