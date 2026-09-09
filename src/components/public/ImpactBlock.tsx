import { HeartHandshake, Home, Sparkles, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { formatNumber } from "@/lib/utils";
import type { ImpactStats } from "@/lib/types";

export function ImpactBlock({ impact }: { impact: ImpactStats }) {
  const items = [
    { icon: Users, value: impact.peopleReached, label: "Pessoas alcançadas" },
    { icon: Sparkles, value: impact.livesTransformed, label: "Vidas transformadas" },
    { icon: HeartHandshake, value: impact.familiesSupported, label: "Famílias acompanhadas" },
    { icon: Home, value: impact.newPeople, label: "Novas pessoas na igreja" },
  ];

  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Impacto real"
          title="Reformar o templo é preparar o lugar para o que Deus ainda vai fazer"
          description="Cada cota preenchida representa mais do que uma reforma — é um passo em direção a mais vidas alcançadas e transformadas."
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <Card key={item.label} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light">
                <item.icon size={22} strokeWidth={1.75} />
              </span>
              <p className="mt-4 font-serif text-3xl text-foreground">
                {formatNumber(item.value)}
              </p>
              <p className="mt-1 text-xs text-foreground-muted">{item.label}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
