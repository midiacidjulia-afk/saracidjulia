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
import { LogoBadge } from "@/components/ui/Logo";

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
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar px-4 py-6">
      <Link href="/admin" className="flex items-center gap-2.5 px-2">
        <LogoBadge />
        <div className="flex flex-col leading-tight">
          <span className="font-serif text-sm text-sidebar-foreground">Juntos pela Obra</span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-sidebar-foreground-muted">
            Painel admin
          </span>
        </div>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-0.5">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-accent/[0.08] text-accent-light"
                  : "text-sidebar-foreground-muted hover:bg-sidebar-elevated hover:text-sidebar-foreground",
              )}
            >
              {active ? (
                <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-accent" />
              ) : null}
              <link.icon size={18} strokeWidth={active ? 2 : 1.6} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={logout}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground-muted transition-colors hover:bg-sidebar-elevated hover:text-danger"
        >
          <LogOut size={18} strokeWidth={1.6} />
          Sair
        </button>
      </form>
    </aside>
  );
}
