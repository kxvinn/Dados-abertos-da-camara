import EntityList from "@/components/EntityList";
import { fetchPropositions } from "@/services/api";
import { FileText, Calendar } from "lucide-react";

export default async function PropositionsPage() {
  const items = await fetchPropositions();

  return (
    <EntityList
      title="Proposições"
      description="Projetos de lei, emendas e outras propostas em tramitação na Câmara."
      items={items}
      searchFields={["siglaTipo", "numero", "ano", "ementa"]}
      type="propositions"
    />
  );
}
