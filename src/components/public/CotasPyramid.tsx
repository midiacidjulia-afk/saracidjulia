import { cn } from "@/lib/utils";

/**
 * Distribui `maxCells` células em linhas triangulares (1, 2, 3, ...) até
 * somar o mais próximo possível de `maxCells`, formando uma pirâmide.
 * Cada célula representa uma fração proporcional do total real de cotas.
 */
function buildPyramid(maxCells: number) {
  const n = Math.floor((Math.sqrt(8 * maxCells + 1) - 1) / 2);
  const rows: number[] = [];
  let used = 0;
  for (let i = 1; i <= n; i++) {
    rows.push(i);
    used += i;
  }
  const remainder = maxCells - used;
  if (remainder > 0) rows.push(remainder);
  return rows;
}

export function CotasPyramid({
  total,
  filled,
  maxCells = 780,
}: {
  total: number;
  filled: number;
  maxCells?: number;
}) {
  const rows = buildPyramid(maxCells);
  const totalCells = rows.reduce((sum, r) => sum + r, 0);
  const filledCells = Math.round((filled / total) * totalCells);

  const rowStarts = rows.map((_, i) =>
    rows.slice(0, i).reduce((sum, r) => sum + r, 0),
  );

  return (
    <div className="flex flex-col items-center gap-[3px]">
      {rows.map((rowLength, rowIndex) => {
        const rowStart = rowStarts[rowIndex];
        const cells = Array.from(
          { length: rowLength },
          (_, i) => rowStart + i < filledCells,
        );

        return (
          <div key={rowIndex} className="flex gap-[3px]">
            {cells.map((isFilled, i) => (
              <span
                key={i}
                className={cn(
                  "block h-[9px] w-[9px] shrink-0 transition-colors sm:h-[11px] sm:w-[11px]",
                  isFilled ? "bg-gold glow-gold-sm" : "bg-background-elevated border border-border",
                )}
                style={{
                  clipPath:
                    "polygon(50% 0%, 63% 35%, 100% 38%, 72% 60%, 82% 100%, 50% 78%, 18% 100%, 28% 60%, 0% 38%, 37% 35%)",
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
