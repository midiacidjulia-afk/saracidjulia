import { FileCheck2, Landmark, TrendingUp, Users } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import { getCampaignStats, getParticipants, getSettings } from "@/lib/data/queries";

export const metadata = {
  title: "Dashboard | Painel administrativo",
};

export default async function AdminDashboardPage() {
  const [stats, settings, participants] = await Promise.all([
    getCampaignStats(),
    getSettings(),
    getParticipants(),
  ]);

  const percent = Math.min(100, Math.round((stats.totalRaised / settings.goalAmount) * 100));
  const pendingCount = participants.filter((p) => p.status === "pendente").length;
  const recent = participants.slice(0, 8);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading eyebrow="Visão geral" title="Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} value={`${percent}%`} label={`${formatCurrency(stats.totalRaised)} arrecadados`} />
        <StatCard icon={Users} value={formatNumber(stats.totalParticipants)} label="Participantes" />
        <StatCard icon={Landmark} value={formatNumber(stats.totalChurches)} label="Igrejas envolvidas" />
        <StatCard icon={FileCheck2} value={formatNumber(pendingCount)} label="Comprovantes pendentes" />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <p className="text-sm font-medium text-foreground">Participações recentes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground-muted">
                <th className="px-5 py-3 font-medium">Nome</th>
                <th className="px-5 py-3 font-medium">Igreja</th>
                <th className="px-5 py-3 font-medium">Cotas</th>
                <th className="px-5 py-3 font-medium">Valor</th>
                <th className="px-5 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-border transition-colors last:border-0 hover:bg-background-elevated/50"
                >
                  <td className="px-5 py-3 text-foreground">{p.name}</td>
                  <td className="px-5 py-3 text-foreground-muted">{p.churchName}</td>
                  <td className="px-5 py-3 text-foreground-muted">{p.cotas}</td>
                  <td className="px-5 py-3 text-foreground-muted">{formatCurrency(p.amount)}</td>
                  <td className="px-5 py-3 text-foreground-muted">{formatDate(p.date)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
