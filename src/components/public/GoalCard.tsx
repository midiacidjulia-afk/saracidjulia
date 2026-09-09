import { formatCurrency, formatNumber } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export function GoalCard({
  totalRaised,
  goalAmount,
  cotasFilled,
  totalCotas,
  cotaValue,
}: {
  totalRaised: number;
  goalAmount: number;
  cotasFilled: number;
  totalCotas: number;
  cotaValue: number;
}) {
  const percent = Math.min(100, Math.round((totalRaised / goalAmount) * 100));

  return (
    <Card className="glow-gold">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-foreground-muted">Já arrecadamos</p>
          <p className="font-serif text-4xl text-gold-gradient sm:text-5xl">
            {formatCurrency(totalRaised)}
          </p>
          <p className="mt-1 text-sm text-foreground-muted">
            da nossa meta de {formatCurrency(goalAmount)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-serif text-3xl text-foreground">{percent}%</p>
          <p className="text-sm text-foreground-muted">da meta</p>
        </div>
      </div>

      <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-background-elevated">
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-foreground">
            {formatNumber(cotasFilled)}
            <span className="text-foreground-muted">/{formatNumber(totalCotas)}</span>
          </p>
          <p className="text-xs text-foreground-muted">cotas preenchidas</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">{formatCurrency(cotaValue)}</p>
          <p className="text-xs text-foreground-muted">valor por cota</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-lg font-semibold text-foreground">
            {formatNumber(totalCotas - cotasFilled)}
          </p>
          <p className="text-xs text-foreground-muted">cotas restantes</p>
        </div>
      </div>
    </Card>
  );
}
