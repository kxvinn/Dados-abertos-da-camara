import EntityList from "@/components/EntityList";
import { fetchBlocks } from "@/services/api";
import { Boxes, Users } from "lucide-react";

export default async function BlocksPage() {
  const items = await fetchBlocks();

  return (
    <EntityList
      title="Blocos Partidários"
      description="Agrupamentos de partidos que atuam de forma conjunta na Câmara."
      items={items}
      searchFields={["nome"]}
      type="blocks"
    />
  );
}
