import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint ? <span className="text-xs text-foreground-muted">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "h-12 w-full rounded-xl border border-border bg-background-elevated px-4 text-sm text-foreground placeholder:text-foreground-muted/60 outline-none transition-all focus:border-accent/60 focus:ring-2 focus:ring-accent/15";
