import DeputyGrid from "@/components/DeputyGrid";
import { fetchDeputies } from "@/services/api";

export default async function Home() {
  const initialDeputies = await fetchDeputies();

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          <span className="text-gradient">Dados Abertos</span> da Câmara
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Explore dados reais dos deputados federais, gastos declarados e votações recentes de forma simples e intuitiva.
        </p>
      </header>

      <DeputyGrid initialDeputies={initialDeputies} />
      
      <footer className="mt-auto py-8 text-center text-slate-500 border-t border-white/5">
        <p>© 2026 Refatoração Next.js - API Dados Abertos da Câmara</p>
      </footer>
    </main>
  );
}
