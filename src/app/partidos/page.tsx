import EntityList from "@/components/EntityList";
import { fetchParties } from "@/services/api";
import { Flag, Users } from "lucide-react";

export default async function PartiesPage() {
  const items = await fetchParties();

  return (
    <EntityList
      title="Partidos"
      description="Partidos políticos com representação na Câmara dos Deputados."
      items={items}
      searchFields={["sigla", "nome"]}
      type="parties"
    />
  );
}
