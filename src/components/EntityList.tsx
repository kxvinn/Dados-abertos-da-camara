"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { 
  FileText, 
  Calendar, 
  Vote, 
  Clock, 
  Flag, 
  Building2, 
  Layers, 
  CalendarDays, 
  MapPin,
  History,
  Boxes,
  LayoutList,
  Milestone
} from "lucide-react";

interface EntityListProps {
  title: string;
  description: string;
  items: any[];
  searchFields: string[];
  type: "propositions" | "votes" | "organisms" | "parties" | "legislatures" | "blocks" | "fronts" | "events";
}

const RenderItem = ({ item, type }: { item: any, type: string }) => {
    switch (type) {
        case "propositions":
            return (
                <div className="glass p-6 rounded-2xl h-full flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-white/5">
                      {item.siglaTipo} {item.numero}/{item.ano}
                    </span>
                  </div>
                  <p className="text-sm text-primary font-medium line-clamp-3">
                    {item.ementa}
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-secondary border-t border-primary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.ano}
                    </span>
                  </div>
                </div>
            );
        case "votes":
            return (
                <div className="glass p-6 rounded-2xl h-full flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                      <Vote className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      #{item.id}
                    </span>
                  </div>
                  <p className="text-sm text-primary font-medium">
                    {item.proposicaoObjeto || "Votação de Proposição"}
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-secondary border-t border-primary">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(item.dataHoraRegistro).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
            );
        case "parties":
            return (
                <div className="glass p-6 rounded-2xl h-full flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 font-black text-xl">
                      {item.sigla}
                    </div>
                    <div>
                        <h3 className="text-primary font-bold">{item.nome}</h3>
                        <p className="text-secondary text-xs uppercase tracking-widest font-bold">Partido Político</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs text-secondary border-t border-primary">
                     <span className="flex items-center gap-1 italic">
                        ID: {item.id}
                     </span>
                  </div>
                </div>
            );
        case "organisms":
            return (
                <div className="glass p-6 rounded-2xl h-full flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 font-bold">
                      {item.sigla}
                    </div>
                    <Building2 className="w-5 h-5 text-slate-700" />
                  </div>
                  <h3 className="text-primary font-bold text-sm leading-tight">
                    {item.nome}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-secondary border-t border-primary uppercase tracking-tighter">
                     <Layers className="w-3 h-3" /> {item.tipoOrgao || "Órgão Legislativo"}
                  </div>
                </div>
            );
        case "events":
            return (
                <div className="glass p-6 rounded-2xl h-full flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                     <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                        <CalendarDays className="w-6 h-6" />
                     </div>
                     <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        item.situacao?.includes("Realizado") ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                     }`}>
                        {item.situacao}
                     </span>
                  </div>
                  <p className="text-sm text-primary font-medium leading-relaxed">
                    {item.descricao}
                  </p>
                  <div className="mt-auto pt-4 flex flex-col gap-2 border-t border-primary">
                     <div className="flex items-center gap-2 text-xs text-secondary">
                        <MapPin className="w-3 h-3" /> {item.localCamara?.nome || "Local não informado"}
                     </div>
                     <div className="flex items-center gap-2 text-xs text-secondary">
                        <Clock className="w-3 h-3" /> {new Date(item.dataHoraInicio).toLocaleString('pt-BR')}
                     </div>
                  </div>
                </div>
            );
        case "legislatures":
            return (
                <div className="glass p-6 rounded-2xl h-full flex items-center gap-6">
                  <div className="p-5 rounded-2xl bg-indigo-500/10 text-indigo-400 font-black text-2xl">
                    {item.id}
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-primary font-bold">{item.id}ª Legislatura</h3>
                     <div className="flex items-center gap-4 text-xs text-secondary">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(item.dataInicio).getFullYear()} - {new Date(item.dataFim).getFullYear()}</span>
                     </div>
                  </div>
                </div>
            );
        case "blocks":
            return (
                <div className="glass p-6 rounded-2xl h-full flex flex-col gap-4">
                  <div className="p-3 w-fit rounded-xl bg-yellow-500/10 text-yellow-500">
                    <Boxes className="w-6 h-6" />
                  </div>
                  <h3 className="text-primary font-bold text-lg leading-tight">
                    {item.nome}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs text-secondary border-t border-primary">
                     <span className="uppercase font-black text-slate-700/20 tracking-widest">{item.id}</span>
                  </div>
                </div>
            );
        case "fronts":
            return (
                <div className="glass p-6 rounded-2xl h-full flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                     <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                        <LayoutList className="w-6 h-6" />
                     </div>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                        Legislatura {item.idLegislatura}
                     </span>
                  </div>
                  <p className="text-sm text-primary font-bold leading-snug">
                    {item.titulo}
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-secondary border-t border-primary italic">
                     <Milestone className="w-3 h-3" /> ID: {item.id}
                  </div>
                </div>
            );
        default:
            return null;
    }
}

export default function EntityList({ title, description, items, searchFields, type }: EntityListProps) {
  const [search, setSearch] = useState("");
  const [displayLimit, setDisplayLimit] = useState(20);

  const filteredItems = items.filter((item) => {
    const lowerSearch = search.toLowerCase();
    return searchFields.some((field) => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], item);
        return String(value || "").toLowerCase().includes(lowerSearch);
    });
  });

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight font-outfit">
          <span className="text-gradient">{title}</span>
        </h1>
        <p className="text-secondary text-lg max-w-2xl">
          {description}
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <div className="glass p-4 md:p-6 rounded-3xl flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 group-focus-within:text-cyan-400 transition-colors" />
                <input
                    type="text"
                    placeholder="Buscar registros..."
                    className="w-full bg-white/5 border border-primary rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/10 transition-all font-medium text-primary placeholder:text-secondary/50"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="flex gap-2 text-[10px] uppercase tracking-widest text-secondary font-bold whitespace-nowrap px-4">
                <span className="text-cyan-400">{filteredItems.length}</span> resultados
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.slice(0, displayLimit).map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 10) * 0.05 }}
            >
              <RenderItem item={item} type={type} />
            </motion.div>
          ))}
        </div>

        {displayLimit < filteredItems.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setDisplayLimit((prev) => prev + 20)}
              className="glass px-10 py-4 rounded-2xl font-bold hover:bg-cyan-500/10 transition-all text-cyan-400 border border-cyan-500/20 uppercase text-xs tracking-widest"
            >
              Carregar mais
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
