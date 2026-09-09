import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoBadge } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-sidebar-border bg-sidebar pb-24 pt-12 text-sidebar-foreground lg:pb-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <LogoBadge />
            <span className="font-serif text-base text-sidebar-foreground">Juntos pela Obra</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-sidebar-foreground-muted">
            Um templo renovado. Mais vidas alcançadas. Uma campanha da igreja
            Sara Nossa Terra — Júlia-SP, para reformar o templo e preparar um
            espaço ainda melhor para acolher, cuidar e transformar vidas.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:flex sm:gap-16">
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
              Navegação
            </span>
            <Link href="/impacto" className="text-sidebar-foreground-muted hover:text-accent-light">
              Impacto
            </Link>
            <Link href="/cotas" className="text-sidebar-foreground-muted hover:text-accent-light">
              Cotas
            </Link>
            <Link href="/ranking" className="text-sidebar-foreground-muted hover:text-accent-light">
              Ranking
            </Link>
            <Link href="/sobre" className="text-sidebar-foreground-muted hover:text-accent-light">
              Sobre a obra
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
              Contato
            </span>
            <span className="text-sidebar-foreground-muted">Nivaldo — responsável pela obra</span>
            <span className="text-sidebar-foreground-muted">Comprovantes via WhatsApp</span>
          </div>
        </div>
      </Container>

      <Container className="mt-10 flex flex-col gap-3 border-t border-sidebar-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-serif text-sm italic text-gold-light">Juntos, vamos mais longe!</p>
        <p className="text-[11px] uppercase tracking-[0.16em] text-sidebar-foreground-muted">
          Um templo renovado <span className="mx-2 text-accent-light">·</span> Mais vidas alcançadas
        </p>
      </Container>
    </footer>
  );
}
