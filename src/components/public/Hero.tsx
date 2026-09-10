import { HandHeart, Sparkles, Target, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const pillars = [
  { icon: HandHeart, label: "Fé" },
  { icon: Users, label: "Comunidade" },
  { icon: Target, label: "Propósito" },
  { icon: Sparkles, label: "Transformação" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-radial-glow">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(231,224,207,0.14),transparent_45%)]" />
      <Container className="relative py-20 sm:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center animate-fade-up">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Campanha de arrecadação
            </span>
            <span className="text-xs italic text-foreground-muted">
              &ldquo;Dai, e ser-vos-á dado...&rdquo; — Lucas 6:38
            </span>
          </div>

          <h1 className="font-serif text-4xl leading-[1.15] text-foreground sm:text-5xl lg:text-6xl">
            Juntos por uma Obra que fará a diferença em{" "}
            <span className="text-accent-gradient">muitas vidas</span>, inclusive
            na sua
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Nosso objetivo é arrecadar <strong className="text-foreground">R$ 20.000</strong>{" "}
            para reformar o salão e preparar um espaço estruturado para
            acolher, cuidar e transformar vidas.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <LinkButton href="/contribuir" size="lg">
              Quero contribuir →
            </LinkButton>
            <LinkButton href="/impacto" variant="secondary" size="lg">
              Conhecer o impacto
            </LinkButton>
          </div>

          <div className="mt-2 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-border pt-6">
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
      </Container>
    </section>
  );
}
