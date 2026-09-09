import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CotasGrid } from "@/components/public/CotasGrid";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { getCampaignStats, getSettings } from "@/lib/data/queries";

export const metadata = {
  title: "Cotas | Juntos pela Obra",
};

export default async function CotasPage() {
  const [settings, stats] = await Promise.all([getSettings(), getCampaignStats()]);
  const percent = Math.min(100, (stats.totalCotasFilled / settings.totalCotas) * 100);
  const milestones = [25, 50, 75, 100];

  return (
    <>
      <section className="border-b border-border bg-radial-glow py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Nossas cotas"
            title="1.000 cotas para um templo renovado"
            description={`Cada cota vale ${formatCurrency(settings.cotaValue)} e representa um passo em direção à nossa meta de ${formatCurrency(settings.goalAmount)}.`}
            className="mx-auto"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <Card>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-foreground-muted">Cotas preenchidas</p>
                <p className="font-serif text-4xl text-gold-gradient">
                  {formatNumber(stats.totalCotasFilled)}
                  <span className="text-2xl text-foreground-muted">
                    /{formatNumber(settings.totalCotas)}
                  </span>
                </p>
              </div>
              <p className="font-serif text-3xl text-foreground">{Math.round(percent)}%</p>
            </div>

            <div className="relative mt-8 h-3 w-full overflow-hidden rounded-full bg-background-elevated">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="mt-3 grid grid-cols-4 text-center text-xs text-foreground-muted">
              {milestones.map((m) => (
                <div key={m} className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      percent >= m ? "bg-gold" : "bg-border",
                    )}
                  />
                  <span className={percent >= m ? "text-gold-light" : undefined}>{m}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <CotasGrid total={settings.totalCotas} filled={stats.totalCotasFilled} />
            <div className="mt-6 flex items-center gap-6 text-xs text-foreground-muted">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[3px] bg-gold" /> Cota preenchida
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[3px] border border-border bg-background-elevated" />{" "}
                Cota disponível
              </span>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}
