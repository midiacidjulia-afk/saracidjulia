import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-radial-glow">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(201,162,74,0.08),transparent_45%)]" />
      <Container className="relative flex flex-col gap-8 py-20 sm:py-28">
        <div className="flex flex-col gap-6 animate-fade-up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Campanha de arrecadação
            </span>
            <span className="text-xs italic text-foreground-muted">
              &ldquo;Dai, e ser-vos-á dado...&rdquo; — Lucas 6:38
            </span>
          </div>

          <h1 className="max-w-3xl font-serif text-4xl leading-[1.15] text-foreground sm:text-5xl lg:text-6xl">
            Juntos por um templo{" "}
            <span className="text-gold-gradient">mais forte</span> e por mais
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
        </div>
      </Container>
    </section>
  );
}
