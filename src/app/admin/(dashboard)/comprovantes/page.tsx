import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReceiptsQueue } from "@/components/admin/ReceiptsQueue";
import { getParticipants } from "@/lib/data/queries";

export const metadata = {
  title: "Comprovantes | Painel administrativo",
};

export default async function ComprovantesPage() {
  const participants = await getParticipants();
  const sorted = [...participants].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "pendente" ? -1 : 1;
  });

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        eyebrow="Revisão"
        title="Comprovantes"
        description="Aprove ou reprove os comprovantes enviados pelos participantes."
      />
      <ReceiptsQueue participants={sorted} />
    </div>
  );
}
