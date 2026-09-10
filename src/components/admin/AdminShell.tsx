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
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative">
            <AdminSidebar />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-elevated text-sidebar-foreground-muted transition-colors hover:text-sidebar-foreground"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-sidebar-border bg-sidebar/90 px-5 backdrop-blur-md lg:hidden">
          <button onClick={() => setOpen(true)} aria-label="Abrir menu" className="text-sidebar-foreground">
            <Menu size={22} />
          </button>
          <span className="font-serif text-sm text-sidebar-foreground">Painel administrativo</span>
        </header>
        <main className="flex-1 bg-background p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
