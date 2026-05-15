// Legislaturas
import EntityList from "@/components/EntityList";
import { fetchLegislatures } from "@/services/api";
import { History, Calendar } from "lucide-react";

export default async function LegislaturesPage() {
  const items = await fetchLegislatures();

  return (
    <EntityList
      title="Legislaturas"
      description="Histórico de períodos de mandatos da Câmara dos Deputados."
      items={items}
      searchFields={["id", "dataInicio", "dataFim"]}
      type="legislatures"
    />
  );
}
