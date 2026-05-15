"use client";

import { useState, useEffect } from "react";
import { Deputy } from "../types";
import { fetchDeputies } from "../services/api";
import DeputyCard from "./DeputyCard";
import StatsOverview from "./StatsOverview";
import { Search } from "lucide-react";

export default function DeputyGrid({ initialDeputies }: { initialDeputies: Deputy[] }) {
  const [deputies] = useState<Deputy[]>(initialDeputies);
  const [filteredDeputies, setFilteredDeputies] = useState<Deputy[]>(initialDeputies);
  const [search, setSearch] = useState("");
  const [displayLimit, setDisplayLimit] = useState(24);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredDeputies(
      deputies.filter(
        (d) =>
          d.nome.toLowerCase().includes(lowerSearch) ||
          d.siglaPartido.toLowerCase().includes(lowerSearch) ||
          d.siglaUf.toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, deputies]);

  return (
    <div className="flex flex-col gap-12">
      <StatsOverview deputies={deputies} />
      
      <div className="glass p-4 md:p-6 rounded-3xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Buscar por nome, partido ou estado..."
            className="w-full bg-white/5 border border-primary rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/10 transition-all font-medium text-primary placeholder:text-secondary/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 text-[10px] uppercase tracking-widest text-secondary font-bold whitespace-nowrap px-4">
          <span className="text-cyan-400">{filteredDeputies.length}</span> deputados
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDeputies.slice(0, displayLimit).map((deputy) => (
          <DeputyCard key={deputy.id} deputy={deputy} />
        ))}
      </div>

      {displayLimit < filteredDeputies.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setDisplayLimit((prev) => prev + 24)}
            className="glass px-10 py-4 rounded-2xl font-bold hover:bg-cyan-500/10 transition-all text-cyan-400 border border-cyan-500/20 uppercase text-xs tracking-widest"
          >
            Carregar mais deputados
          </button>
        </div>
      )}
    </div>
  );
}
