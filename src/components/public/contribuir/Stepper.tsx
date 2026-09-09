import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Dados", "Participação", "Data", "Comprovante", "Finalizar"];

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {steps.map((label, index) => {
        const stepIndex = index + 1;
        const done = stepIndex < current;
        const active = stepIndex === current;

        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  done && "border-accent bg-accent text-sidebar",
                  active && !done && "border-accent text-accent-light",
                  !active && !done && "border-border text-foreground-muted",
                )}
              >
                {done ? <Check size={14} /> : stepIndex}
              </span>
              <span
                className={cn(
                  "hidden text-[11px] sm:block",
                  active ? "text-accent-light" : "text-foreground-muted",
                )}
              >
                {label}
              </span>
            </div>
            {stepIndex < steps.length ? (
              <div
                className={cn(
                  "h-px flex-1",
                  done ? "bg-accent" : "bg-border",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
