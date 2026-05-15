import EntityList from "@/components/EntityList";
import { fetchFronts } from "@/services/api";
import { LayoutList, Milestone } from "lucide-react";

export default async function FrontsPage() {
  const items = await fetchFronts();

  return (
    <EntityList
      title="Frentes Parlamentares"
      description="Associações de deputados de vários partidos para defesa de temas específicos."
      items={items}
      searchFields={["titulo", "idLegislatura"]}
      type="fronts"
    />
  );
}
