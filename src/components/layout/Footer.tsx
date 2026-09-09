import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pb-24 pt-12 lg:pb-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-serif text-lg text-gold-light">
              S
            </span>
            <span className="font-serif text-base text-foreground">Juntos pela Obra</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
            Um templo renovado. Mais vidas alcançadas. Uma campanha da igreja
            Sara Nossa Terra — Júlia-SP, para reformar o templo e preparar um
            espaço ainda melhor para acolher, cuidar e transformar vidas.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:flex sm:gap-16">
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Navegação
            </span>
            <Link href="/impacto" className="text-foreground-muted hover:text-gold-light">
              Impacto
            </Link>
            <Link href="/cotas" className="text-foreground-muted hover:text-gold-light">
              Cotas
            </Link>
            <Link href="/ranking" className="text-foreground-muted hover:text-gold-light">
              Ranking
            </Link>
            <Link href="/sobre" className="text-foreground-muted hover:text-gold-light">
              Sobre a obra
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Contato
            </span>
            <span className="text-foreground-muted">Nivaldo — responsável pela obra</span>
            <span className="text-foreground-muted">Comprovantes via WhatsApp</span>
          </div>
        </div>
      </Container>

      <Container className="mt-10 border-t border-border pt-6">
        <p className="text-xs text-foreground-muted">
          &ldquo;Dai, e ser-vos-á dado...&rdquo; — Lucas 6:38
        </p>
      </Container>
    </footer>
  );
}
