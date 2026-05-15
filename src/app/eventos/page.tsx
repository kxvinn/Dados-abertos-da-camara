import EntityList from "@/components/EntityList";
import { fetchEvents } from "@/services/api";
import { CalendarDays, MapPin, Clock } from "lucide-react";

export default async function EventsPage() {
  const items = await fetchEvents();

  return (
    <EntityList
      title="Eventos"
      description="Sessões, reuniões e audiências públicas programadas."
      items={items}
      searchFields={["descricao", "local", "situacao"]}
      type="events"
    />
  );
}
