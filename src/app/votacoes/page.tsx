import EntityList from "@/components/EntityList";
import { fetchVotesList } from "@/services/api";
import { Vote, Clock } from "lucide-react";

export default async function VotesPage() {
  const items = await fetchVotesList();

  return (
    <EntityList
      title="Votações"
      description="Acompanhe as últimas decisões e votações realizadas em plenário."
      items={items}
      searchFields={["id", "dataHoraRegistro", "proposicaoObjeto"]}
      type="votes"
    />
  );
}
