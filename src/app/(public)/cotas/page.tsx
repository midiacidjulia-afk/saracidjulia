import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CotasPyramid } from "@/components/public/CotasPyramid";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { getCampaignStats, getSettings } from "@/lib/data/queries";

export const metadata = {
  title: "Cotas | Juntos pela Obra",
};

export default async function CotasPage() {
  const [settings, stats] = await Promise.all([getSettings(), getCampaignStats()]);
  const percent = Math.min(100, (stats.totalCotasFilled / settings.totalCotas) * 100);
  const remaining = Math.max(0, settings.totalCotas - stats.totalCotasFilled);
  const milestones = [0.25, 0.5, 0.75, 1].map((f) => Math.round(settings.totalCotas * f));

  return (
    <>
      <section className="border-b border-border bg-radial-glow py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Nossas cotas"
            title={`${formatNumber(settings.totalCotas)} cotas para um templo renovado`}
            description={`Cada cota vale ${formatCurrency(settings.cotaValue)} e representa um passo em direção à nossa meta de ${formatCurrency(settings.goalAmount)}.`}
            className="mx-auto"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Card className="relative flex flex-col items-center gap-8 p-6 sm:p-10">
            <Badge className="absolute right-6 top-6 sm:right-8 sm:top-8">
              {percent.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%
            </Badge>

            <CotasPyramid total={settings.totalCotas} filled={stats.totalCotasFilled} />

            <div className="text-center">
              <p className="font-serif text-3xl text-gold-gradient">
                {formatNumber(stats.totalCotasFilled)}
              </p>
              <p className="text-sm text-foreground-muted">cotas preenchidas</p>
            </div>

            <div className="w-full max-w-xl">
              <div className="h-3 w-full overflow-hidden rounded-full bg-background-elevated">
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
                        stats.totalCotasFilled >= m ? "bg-gold" : "bg-border",
                      )}
                    />
                    <span className={stats.totalCotasFilled >= m ? "text-gold-light" : undefined}>
                      {formatNumber(m)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-foreground-muted">
                {formatNumber(remaining)} cotas restantes
              </p>
            </div>

            <p className="max-w-md text-center font-serif text-lg italic text-foreground-muted">
              &ldquo;Cada cota é um tijolo na construção de um futuro melhor.&rdquo;
            </p>
          </Card>
        </Container>
      </section>
    </>
  );
}
