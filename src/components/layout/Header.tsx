"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Início" },
  { href: "/impacto", label: "Impacto" },
  { href: "/cotas", label: "Cotas" },
  { href: "/ranking", label: "Ranking" },
  { href: "/contribuicoes", label: "Contribuições" },
  { href: "/sobre", label: "Sobre a obra" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-serif text-lg text-gold-light">
            S
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base text-foreground">Juntos pela Obra</span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
              Sara Nossa Terra · Júlia-SP
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-gold-light",
                pathname === link.href ? "text-gold-light" : "text-foreground-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href="/contribuir" size="md">
            Quero contribuir
          </LinkButton>
        </div>

        <button
          className="text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-border/80 bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm",
                  pathname === link.href
                    ? "bg-gold/10 text-gold-light"
                    : "text-foreground-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
            <LinkButton href="/contribuir" size="md" className="mt-2 w-full">
              Quero contribuir
            </LinkButton>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
