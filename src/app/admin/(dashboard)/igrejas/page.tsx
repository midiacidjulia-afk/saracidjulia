import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { NewChurchForm } from "@/components/admin/NewChurchForm";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { getChurches } from "@/lib/data/queries";

export const metadata = {
  title: "Igrejas | Painel administrativo",
};

export default async function IgrejasPage() {
  const churches = await getChurches();

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        eyebrow="Gestão"
        title="Igrejas participantes"
        description="Acompanhe as cotas preenchidas por igreja e cadastre novas igrejas participantes."
      />

      <NewChurchForm />

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground-muted">
                <th className="px-5 py-3 font-medium">Igreja</th>
                <th className="px-5 py-3 font-medium">Cidade</th>
                <th className="px-5 py-3 font-medium">Participantes</th>
                <th className="px-5 py-3 font-medium">Cotas</th>
                <th className="px-5 py-3 font-medium">Valor arrecadado</th>
              </tr>
            </thead>
            <tbody>
              {churches.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-foreground">{c.name}</td>
                  <td className="px-5 py-3 text-foreground-muted">{c.city}</td>
                  <td className="px-5 py-3 text-foreground-muted">{formatNumber(c.participants)}</td>
                  <td className="px-5 py-3 text-gold-light">{formatNumber(c.cotas)}</td>
                  <td className="px-5 py-3 text-foreground-muted">{formatCurrency(c.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
