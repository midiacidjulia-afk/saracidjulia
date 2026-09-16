import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.06] text-accent-light">
        <Icon size={20} strokeWidth={1.6} />
      </span>
      <div>
        <p className="font-serif text-2xl text-foreground">{value}</p>
        <p className="text-xs text-foreground-muted">{label}</p>
      </div>
    </Card>
  );
}
