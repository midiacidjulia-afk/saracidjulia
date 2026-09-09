import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParticipantsTable } from "@/components/admin/ParticipantsTable";
import { getParticipants } from "@/lib/data/queries";

export const metadata = {
  title: "Participantes | Painel administrativo",
};

export default async function ParticipantesPage() {
  const participants = await getParticipants();

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        eyebrow="Gestão"
        title="Participantes"
        description="Busque, filtre por status e exporte a lista de participantes da campanha."
      />
      <ParticipantsTable participants={participants} />
    </div>
  );
}
