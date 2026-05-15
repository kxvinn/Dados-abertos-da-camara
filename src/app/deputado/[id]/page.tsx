import { 
  fetchDeputyDetails, 
  fetchDeputyExpenses, 
  fetchDeputySpeeches, 
  fetchDeputyProfessions, 
  fetchDeputyOrganisms 
} from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Building2, 
  Mic2, 
  Briefcase, 
  PieChart,
  Calendar,
  ExternalLink
} from "lucide-react";

export default async function DeputyDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const deputyId = parseInt(id);

  const [details, expenses, speeches, professions, organisms] = await Promise.all([
    fetchDeputyDetails(deputyId),
    fetchDeputyExpenses(deputyId),
    fetchDeputySpeeches(deputyId),
    fetchDeputyProfessions(deputyId),
    fetchDeputyOrganisms(deputyId)
  ]);

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Deputado não encontrado</h1>
          <Link href="/" className="text-emerald-400 hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar para a lista
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.valorDocumento, 0);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-4">
          <ArrowLeft className="w-5 h-5" /> Voltar para o Dashboard
        </Link>

        <div className="glass p-6 md:p-10 rounded-3xl flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10 rounded-full" />
          
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-emerald-500/20 flex-shrink-0">
            <Image
              src={details.ultimoStatus.urlFoto}
              alt={details.nomeCivil}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white">{details.ultimoStatus.nomeEleitoral}</h1>
              <p className="text-xl text-emerald-400 font-medium">{details.ultimoStatus.siglaPartido} — {details.ultimoStatus.siglaUf}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${details.ultimoStatus.email}`} className="hover:text-emerald-400 truncate">
                  {details.ultimoStatus.email || "Não informado"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Natural de {details.municipioNascimento} - {details.ufNascimento}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Nascimento: {new Date(details.dataNascimento).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Gabinete: {details.ultimoStatus.gabinete.sala}, Anexo {details.ultimoStatus.gabinete.anexo}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
                Situação: {details.ultimoStatus.situacao}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider">
                Condição: {details.ultimoStatus.condicaoEleitoral}
              </span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats & Info */}
          <div className="space-y-8">
            <div className="glass p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-widest">
                <PieChart className="w-4 h-4" /> Gastos Recentes
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-white">{formatCurrency(totalSpent)}</p>
                <p className="text-slate-500 text-sm">Soma das últimas 50 despesas</p>
              </div>
              <div className="pt-4 border-t border-white/5 space-y-3">
                {expenses.slice(0, 3).map((exp, i) => (
                  <div key={i} className="flex justify-between items-start text-sm">
                    <span className="text-slate-400 truncate max-w-[150px]">{exp.tipoDespesa}</span>
                    <span className="font-bold text-slate-200">{formatCurrency(exp.valorDocumento)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-blue-400 font-bold uppercase text-xs tracking-widest">
                <Briefcase className="w-4 h-4" /> Profissões e Formação
              </div>
              <div className="flex flex-wrap gap-2">
                {professions.length > 0 ? professions.map((p, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 rounded-lg text-sm border border-white/5">
                    {p.titulo}
                  </span>
                )) : <span className="text-slate-500 italic">Nenhuma profissão declarada</span>}
              </div>
            </div>
          </div>

          {/* Right Column: Speeches & Participation */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-bold uppercase text-xs tracking-widest">
                  <Mic2 className="w-4 h-4" /> Últimos Discursos
                </div>
                <span className="text-xs text-slate-500">{speeches.length} registros encontrados</span>
              </div>
              
              <div className="space-y-4">
                {speeches.length > 0 ? speeches.map((s, i) => (
                  <div key={i} className="p-4 bg-slate-900/40 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(s.dataHoraInicio).toLocaleDateString('pt-BR')}</span>
                      <span className="uppercase font-bold text-purple-400/80">{s.tipoDiscurso}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-300 line-clamp-2">{s.sumario || "Sem sumário disponível."}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" /> {s.keywords || "Geral"}
                    </div>
                  </div>
                )) : <div className="text-center py-8 text-slate-500">Nenhum discurso registrado recentemente.</div>}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl space-y-6">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-widest">
                <Building2 className="w-4 h-4" /> Órgãos e Comissões
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {organisms.length > 0 ? organisms.map((o, i) => (
                  <div key={i} className="p-4 bg-slate-900/40 rounded-xl border border-white/5 text-sm space-y-1">
                    <div className="font-bold text-slate-200">{o.siglaOrgao}</div>
                    <div className="text-slate-500 text-xs">{o.nomeOrgao}</div>
                    <div className="text-emerald-400/80 text-xs font-bold uppercase pt-1">{o.titulo}</div>
                  </div>
                )) : <div className="text-center py-8 text-slate-500 col-span-2">Nenhuma participação em órgãos registrada.</div>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
