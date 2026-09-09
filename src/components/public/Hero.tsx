import { HandHeart, Sparkles, Target, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatNumber } from "@/lib/utils";
import type { ImpactStats } from "@/lib/types";

const pillars = [
  { icon: HandHeart, label: "Fé" },
  { icon: Users, label: "Comunidade" },
  { icon: Target, label: "Propósito" },
  { icon: Sparkles, label: "Transformação" },
];

export function Hero({ impact }: { impact: ImpactStats }) {
  const stats = [
    { icon: Users, value: impact.peopleReached, label: "Pessoas alcançadas" },
    { icon: Sparkles, value: impact.livesTransformed, label: "Vidas transformadas" },
    { icon: HandHeart, value: impact.familiesSupported, label: "Famílias acompanhadas" },
    { icon: Target, value: impact.newPeople, label: "Novas pessoas na igreja" },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border bg-radial-glow">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(47,128,196,0.08),transparent_45%)]" />
      <Container className="relative grid grid-cols-1 gap-12 py-20 sm:py-28 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div className="flex flex-col gap-6 animate-fade-up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Campanha de arrecadação
            </span>
            <span className="text-xs italic text-foreground-muted">
              &ldquo;Dai, e ser-vos-á dado...&rdquo; — Lucas 6:38
            </span>
          </div>

          <h1 className="max-w-3xl font-serif text-4xl leading-[1.15] text-foreground sm:text-5xl lg:text-6xl">
            Juntos por um templo{" "}
            <span className="text-accent-gradient">mais forte</span> e por mais
            vidas!
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Nosso objetivo é arrecadar <strong className="text-foreground">R$ 100.000</strong>{" "}
            para reformar o templo e preparar um espaço ainda melhor para
            acolher, cuidar e transformar vidas.
          </p>

          <div className="flex flex-wrap gap-4">
            <LinkButton href="/contribuir" size="lg">
              Quero contribuir →
            </LinkButton>
            <LinkButton href="/impacto" variant="secondary" size="lg">
              Conhecer o impacto
            </LinkButton>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
            {pillars.map((p) => (
              <span key={p.label} className="flex items-center gap-2 text-sm text-foreground-muted">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-light">
                  <p.icon size={15} strokeWidth={1.75} />
                </span>
                {p.label}
              </span>
            ))}
          </div>
        </div>

        <div className="card-surface glow-accent animate-fade-up rounded-2xl p-6 lg:mt-0">
          <p className="font-serif text-lg text-foreground">
            Mais do que um templo.
            <br />
            <span className="text-accent-gradient">Mais vidas.</span>
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-light">
                  <s.icon size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-serif text-xl leading-none text-foreground">
                    {formatNumber(s.value)}
                  </p>
                  <p className="text-xs text-foreground-muted">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
