import EntityList from "@/components/EntityList";
import { fetchOrganismsList } from "@/services/api";
import { Building2, Layers } from "lucide-react";

export default async function OrganismsPage() {
  const items = await fetchOrganismsList();

  return (
    <EntityList
      title="Órgãos"
      description="Comissões, conselhos e outros órgãos técnicos e administrativos."
      items={items}
      searchFields={["sigla", "nome", "apelido"]}
      type="organisms"
    />
  );
}
