"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, HandHeart, Sparkles, Trophy, Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoBadge } from "@/components/ui/Logo";

const links = [
  { href: "/", label: "Início", icon: Home },
  { href: "/contribuir", label: "Quero contribuir", icon: HandHeart },
  { href: "/impacto", label: "Impacto", icon: Sparkles },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/contribuicoes", label: "Últimas contribuições", icon: Clock },
  { href: "/sobre", label: "Sobre a obra", icon: Info },
];

export function PublicSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-border bg-background-card px-4 py-6">
      <Link href="/" className="flex items-center gap-2.5 px-2">
        <LogoBadge />
        <div className="flex flex-col leading-tight">
          <span className="font-serif text-sm text-foreground">Sara Nossa Terra</span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
            Júlia-SP
          </span>
        </div>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-gold/15 text-gold-light"
                  : "text-foreground-muted hover:bg-background-elevated hover:text-foreground",
              )}
            >
              <link.icon size={18} strokeWidth={1.75} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2.5 border-t border-border px-2 pt-5">
        <LogoBadge className="h-8 w-8" />
        <div className="flex flex-col leading-tight">
          <span className="font-serif text-xs text-foreground">Juntos pela Obra</span>
          <span className="text-[10px] text-foreground-muted">
            Um templo renovado. Mais vidas alcançadas.
          </span>
        </div>
      </div>
    </aside>
  );
}
