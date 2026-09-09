import { Building2, Heart, Home, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";
import { getImpactStats } from "@/lib/data/queries";

export const metadata = {
  title: "Impacto | Juntos pela Obra",
};

export default async function ImpactoPage() {
  const impact = await getImpactStats();

  const items = [
    { icon: Users, value: impact.peopleReached, label: "Pessoas alcançadas" },
    { icon: Sparkles, value: impact.livesTransformed, label: "Vidas transformadas" },
    { icon: Heart, value: impact.familiesSupported, label: "Famílias acompanhadas" },
    { icon: Home, value: impact.newPeople, label: "Novas pessoas na igreja" },
    { icon: Building2, value: impact.projectsCompleted, label: "Projetos realizados" },
  ];

  return (
    <>
      <section className="border-b border-border bg-radial-glow py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Impacto real"
            title="Mais do que um templo. Mais vidas."
            className="mx-auto"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Card className="mx-auto max-w-xl">
            <div className="flex flex-col divide-y divide-border">
              {items.map((item) => (
                <div key={item.label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light">
                    <item.icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-serif text-2xl leading-tight text-foreground">
                      {formatNumber(item.value)}
                    </p>
                    <p className="text-sm text-foreground-muted">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-foreground-muted">
              Cada cota representa muito mais do que R$ 100 — ela representa um
              espaço melhor para acolher, ensinar, cuidar, servir e alcançar
              novas pessoas.
            </p>
          </Card>
        </Container>
      </section>
    </>
  );
}
