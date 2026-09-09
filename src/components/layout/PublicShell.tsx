"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PublicSidebar } from "@/components/layout/PublicSidebar";
import { LogoBadge } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";

export function PublicShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-1">
      <div className="hidden lg:block">
        <PublicSidebar />
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative" onClick={() => setOpen(false)}>
            <PublicSidebar />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-6 text-sidebar-foreground-muted"
              aria-label="Fechar menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-3 border-b border-sidebar-border bg-sidebar px-5 lg:hidden">
          <button onClick={() => setOpen(true)} aria-label="Abrir menu" className="text-sidebar-foreground">
            <Menu size={22} />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <LogoBadge className="h-7 w-7" />
            <span className="font-serif text-sm text-sidebar-foreground">Juntos pela Obra</span>
          </Link>
          <LinkButton href="/contribuir" size="md" className="h-9 px-4 text-xs">
            Contribuir
          </LinkButton>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
