import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChurchCotasChart, CumulativeChart, StatusPieChart } from "@/components/admin/Charts";
import { formatDate } from "@/lib/utils";
import { getChurches, getParticipants } from "@/lib/data/queries";

export const metadata = {
  title: "Gráficos | Painel administrativo",
};

export default async function GraficosPage() {
  const [churches, participants] = await Promise.all([getChurches(), getParticipants()]);

  const churchData = churches
    .map((c) => ({ name: c.name.replace("Sara Nossa Terra", "SNT"), cotas: c.cotas }))
    .sort((a, b) => b.cotas - a.cotas);

  const approved = participants
    .filter((p) => p.status === "aprovado")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let running = 0;
  const cumulativeByDate = new Map<string, number>();
  for (const p of approved) {
    running += p.cotas;
    cumulativeByDate.set(formatDate(p.date), running);
  }
  const cumulativeData = Array.from(cumulativeByDate, ([date, cotas]) => ({ date, cotas }));

  const statusCounts = { aprovado: 0, pendente: 0, reprovado: 0 };
  for (const p of participants) statusCounts[p.status]++;
  const statusData = [
    { name: "Aprovados", value: statusCounts.aprovado },
    { name: "Pendentes", value: statusCounts.pendente },
    { name: "Reprovados", value: statusCounts.reprovado },
  ];

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        eyebrow="Relatórios"
        title="Gráficos"
        description="Acompanhe a evolução da campanha em tempo real."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChurchCotasChart data={churchData} />
        <StatusPieChart data={statusData} />
        <div className="lg:col-span-2">
          <CumulativeChart data={cumulativeData} />
        </div>
      </div>
    </div>
  );
}
