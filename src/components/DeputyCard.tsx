"use client";

import Image from "next/image";
import { Deputy } from "../types";
import { useState, useEffect } from "react";
import { fetchLatestExpense } from "../services/api";
import { motion } from "framer-motion";
import { Wallet, User, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DeputyCardProps {
  deputy: Deputy;
}

export default function DeputyCard({ deputy }: DeputyCardProps) {
  const [expense, setExpense] = useState<number | null>(null);

  useEffect(() => {
    fetchLatestExpense(deputy.id)
      .then(setExpense)
      .catch((err) => {
        console.error(`Error fetching expense for ${deputy.id}:`, err);
        setExpense(0);
      });
  }, [deputy.id]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Link href={`/deputado/${deputy.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="glass glass-hover rounded-2xl overflow-hidden flex flex-col p-4 gap-4 h-full"
      >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-800">
        <Image
          src={deputy.urlFoto}
          alt={deputy.nome}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-lg truncate group-hover:text-cyan-400 transition-colors text-primary" title={deputy.nome}>
          {deputy.nome}
        </h3>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-primary text-cyan-500">
            {deputy.siglaPartido}
          </span>
          <span>{deputy.siglaUf}</span>
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-primary flex flex-col gap-1">
        <span className="text-[9px] uppercase tracking-widest text-secondary font-bold">Última Despesa</span>
        <span className="text-sm font-bold text-primary">
          {expense !== null ? formatCurrency(expense) : "---"}
        </span>
      </div>
    </motion.div>
  </Link>
);
}
