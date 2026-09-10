"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, HandHeart, Trophy, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Início", icon: Home },
  { href: "/contribuir", label: "Contribuir", icon: HandHeart },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/sobre", label: "Menu", icon: Menu },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 py-3 text-[11px] transition-colors",
                active ? "text-accent-light" : "text-foreground-muted",
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-9 items-center justify-center rounded-full transition-colors",
                  active && "bg-accent/[0.1]",
                )}
              >
                <Icon size={19} strokeWidth={active ? 2.1 : 1.6} />
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
