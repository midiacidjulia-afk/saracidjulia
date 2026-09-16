import { formatRelativeTime, initials } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import type { Contribution } from "@/lib/types";

export function ContributionsList({
  contributions,
  limit,
}: {
  contributions: Contribution[];
  limit?: number;
}) {
  const list = limit ? contributions.slice(0, limit) : contributions;

  if (list.length === 0) {
    return (
      <Card className="text-center text-sm text-foreground-muted">
        Nenhuma contribuição registrada ainda. Seja o primeiro a fazer parte!
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden">
      <ul className="divide-y divide-border">
        {list.map((c) => (
          <li
            key={c.id}
            className="flex items-center gap-4 p-4 transition-colors hover:bg-background-elevated/50 sm:p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06] font-serif text-sm text-accent-light">
              {initials(c.participantName)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {c.participantName}
              </p>
              <p className="truncate text-xs text-foreground-muted">{c.churchName}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-foreground-muted">{formatRelativeTime(c.createdAt)}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
