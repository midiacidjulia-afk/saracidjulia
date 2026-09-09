import { formatCurrency, formatNumber } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import type { Church } from "@/lib/types";
import { cn } from "@/lib/utils";

export function RankingList({ churches, limit }: { churches: Church[]; limit?: number }) {
  const list = limit ? churches.slice(0, limit) : churches;
  const max = Math.max(...churches.map((c) => c.cotas), 1);

  return (
    <Card className="p-0 overflow-hidden">
      <ul className="divide-y divide-border">
        {list.map((church, index) => (
          <li key={church.id} className="flex items-center gap-4 p-4 sm:p-5">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-sm",
                index === 0
                  ? "bg-gold text-background"
                  : index === 1
                    ? "bg-foreground-muted/60 text-background"
                    : index === 2
                      ? "bg-gold-dark/50 text-gold-light"
                      : "bg-background-elevated text-foreground-muted",
              )}
            >
              {index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{church.name}</p>
              <p className="text-xs text-foreground-muted">
                {church.city} · {formatNumber(church.participants)} participantes
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background-elevated">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light"
                  style={{ width: `${Math.max(4, (church.cotas / max) * 100)}%` }}
                />
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-gold-light">
                {formatNumber(church.cotas)} cotas
              </p>
              <p className="text-xs text-foreground-muted">{formatCurrency(church.amount)}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
