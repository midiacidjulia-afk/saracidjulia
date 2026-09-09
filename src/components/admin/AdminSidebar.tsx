"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Landmark,
  FileCheck2,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/admin/login/actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/participantes", label: "Participantes", icon: Users },
  { href: "/admin/igrejas", label: "Igrejas", icon: Landmark },
  { href: "/admin/comprovantes", label: "Comprovantes", icon: FileCheck2 },
  { href: "/admin/graficos", label: "Gráficos", icon: BarChart3 },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-background-card px-4 py-6">
      <Link href="/admin" className="flex items-center gap-2.5 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-serif text-lg text-gold-light">
          S
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-serif text-sm text-foreground">Juntos pela Obra</span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
            Painel admin
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

      <form action={logout}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-background-elevated hover:text-danger"
        >
          <LogOut size={18} strokeWidth={1.75} />
          Sair
        </button>
      </form>
    </aside>
  );
}
