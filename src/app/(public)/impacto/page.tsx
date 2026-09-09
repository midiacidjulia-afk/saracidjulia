import { Heart, Home, Sparkles, Users, Building2 } from "lucide-react";
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
    { icon: Users, value: impact.peopleReached, label: "Pessoas alcançadas", description: "Vidas que passaram pela igreja através de cultos, eventos e ações sociais." },
    { icon: Sparkles, value: impact.livesTransformed, label: "Vidas transformadas", description: "Testemunhos de restauração, cura e recomeço dentro da nossa comunidade." },
    { icon: Heart, value: impact.familiesSupported, label: "Famílias acompanhadas", description: "Famílias em acompanhamento pastoral e ações de apoio contínuo." },
    { icon: Home, value: impact.newPeople, label: "Novas pessoas na igreja", description: "Pessoas que encontraram na igreja um novo lugar de pertencimento." },
    { icon: Building2, value: impact.projectsCompleted, label: "Projetos realizados", description: "Iniciativas e obras concluídas para fortalecer a estrutura da igreja." },
  ];

  return (
    <>
      <section className="border-b border-border bg-radial-glow py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Impacto real"
            title="Reformar o templo é preparar o lugar para o que Deus ainda vai fazer"
            description="Cada cota preenchida se traduz em vidas alcançadas, famílias acompanhadas e um espaço mais preparado para acolher quem chega."
            className="mx-auto"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.label} className="flex flex-col gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light">
                <item.icon size={22} strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-serif text-4xl text-foreground">{formatNumber(item.value)}</p>
                <p className="mt-1 text-sm font-medium text-gold-light">{item.label}</p>
              </div>
              <p className="text-sm leading-relaxed text-foreground-muted">{item.description}</p>
            </Card>
          ))}
        </Container>
      </section>
    </>
  );
}
