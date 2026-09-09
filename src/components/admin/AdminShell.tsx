"use client";

import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative">
            <AdminSidebar />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-6 text-foreground-muted"
              aria-label="Fechar menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b border-border bg-background-card px-5 lg:hidden">
          <button onClick={() => setOpen(true)} aria-label="Abrir menu">
            <Menu size={22} />
          </button>
          <span className="font-serif text-sm text-foreground">Painel administrativo</span>
        </header>
        <main className="flex-1 bg-background p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
