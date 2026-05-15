"use client";

import { Vote } from "../types";
import { format } from "date-fns"; // I'll need to install date-fns too
import { ptBR } from "date-fns/locale";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface VoteListProps {
  votes: Vote[];
}

export default function VoteList({ votes }: VoteListProps) {
  if (votes.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 glass rounded-xl">
        Nenhuma votação recente encontrada.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {votes.map((vote, index) => (
        <div 
          key={index} 
          className="glass p-4 rounded-xl flex flex-col gap-2 border-l-4 border-emerald-500"
          style={{ borderLeftColor: vote.tipoVoto === "Sim" ? "#10b981" : vote.tipoVoto === "Não" ? "#ef4444" : "#94a3b8" }}
        >
          <div className="flex justify-between items-start gap-4">
            <h4 className="font-semibold text-sm leading-tight">
              {vote.descricao}
            </h4>
            <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${
              vote.tipoVoto === "Sim" ? "bg-emerald-500/20 text-emerald-400" : 
              vote.tipoVoto === "Não" ? "bg-red-500/20 text-red-400" : 
              "bg-slate-500/20 text-slate-400"
            }`}>
              {vote.tipoVoto}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(vote.dataHora).toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
