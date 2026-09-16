import { formatCurrency, formatNumber, initials } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import type { TopParticipant } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ParticipantRankingList({
  participants,
  limit,
}: {
  participants: TopParticipant[];
  limit?: number;
}) {
  const list = limit ? participants.slice(0, limit) : participants;

  return (
    <Card className="p-0 overflow-hidden">
      <ul className="divide-y divide-border">
        {list.map((p, index) => (
          <li key={p.name} className="flex items-center gap-4 p-4 sm:p-5">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-sm",
                index === 0
                  ? "bg-gradient-to-br from-gold-light to-gold-dark text-background glow-gold-sm"
                  : index === 1
                    ? "bg-gradient-to-br from-[#EDEAE2] to-[#A7A29A] text-background"
                    : index === 2
                      ? "bg-gradient-to-br from-gold-dark to-[#5c4820] text-gold-light"
                      : "bg-background-elevated text-foreground-muted",
              )}
            >
              {index + 1}
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06] font-serif text-sm text-accent-light">
              {initials(p.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
              <p className="truncate text-xs text-foreground-muted">{p.churchName}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-gold-light">
                {formatNumber(p.cotas)} {p.cotas === 1 ? "cota" : "cotas"}
              </p>
              <p className="text-xs text-foreground-muted">{formatCurrency(p.amount)}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
