"use client";

import { formatCurrency, formatNumber } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { CountUp } from "@/components/ui/CountUp";

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
  const percent = Math.min(100, (totalRaised / goalAmount) * 100);
  const remaining = Math.max(0, goalAmount - totalRaised);

  return (
    <Card className="glow-gold">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        <ProgressRing percent={percent} label="atingido" />

        <div className="flex flex-1 flex-col gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm text-foreground-muted">Já arrecadamos</p>
            <p className="font-serif text-4xl text-gold-gradient sm:text-5xl">
              <CountUp value={totalRaised} format={formatCurrency} />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-background-elevated px-4 py-3.5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-muted">
                Nosso alvo
              </p>
              <p className="text-lg font-semibold text-foreground">{formatCurrency(goalAmount)}</p>
            </div>
            <div className="rounded-xl border border-border bg-background-elevated px-4 py-3.5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-muted">
                Cada cota
              </p>
              <p className="text-lg font-semibold text-foreground">{formatCurrency(cotaValue)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 border-t border-border pt-6">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-background-elevated">
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
            style={{ width: `${percent}%` }}
          >
            <div className="absolute inset-0 animate-shimmer" />
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-xs text-foreground-muted">
          <span>{formatCurrency(totalRaised)} arrecadados</span>
          <span>{formatCurrency(remaining)} para o objetivo</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-foreground">
            <CountUp value={cotasFilled} format={(n) => formatNumber(Math.round(n))} />
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
