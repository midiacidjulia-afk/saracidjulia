import { cn } from "@/lib/utils";
import { Church } from "lucide-react";

export function CotasGrid({
  total,
  filled,
  limit,
}: {
  total: number;
  filled: number;
  limit?: number;
}) {
  const count = limit ? Math.min(limit, total) : total;
  const cells = Array.from({ length: count }, (_, i) => i < filled);

  return (
    <div className="grid grid-cols-[repeat(10,minmax(0,1fr))] gap-1.5 sm:grid-cols-[repeat(16,minmax(0,1fr))] md:grid-cols-[repeat(20,minmax(0,1fr))] lg:grid-cols-[repeat(25,minmax(0,1fr))]">
      {cells.map((isFilled, i) => (
        <div
          key={i}
          className={cn(
            "flex aspect-square items-center justify-center rounded-[4px] transition-colors",
            isFilled
              ? "bg-gold/90 text-black glow-gold-sm"
              : "bg-background-elevated text-foreground-muted/40 border border-border",
          )}
          title={`Cota ${i + 1}${isFilled ? " — preenchida" : ""}`}
        >
          <Church size={10} strokeWidth={2.5} />
        </div>
      ))}
    </div>
  );
}
