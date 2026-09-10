import { cn } from "@/lib/utils";

/**
 * Linhas de uma cruz latina, da largura da haste (mais estreita) até os
 * braços (largura total) e de volta à haste. Cada linha é centralizada
 * horizontalmente pelo container flex, então basta variar o comprimento.
 */
function buildCrossRows(): number[] {
  const stemWidth = 6;
  const armWidth = 16;
  const topStemRows = 3;
  const armRows = 5;
  const bottomStemRows = 17;

  return [
    ...Array(topStemRows).fill(stemWidth),
    ...Array(armRows).fill(armWidth),
    ...Array(bottomStemRows).fill(stemWidth),
  ];
}

export function CotasCross({
  total,
  filled,
}: {
  total: number;
  filled: number;
}) {
  const rows = buildCrossRows();
  const totalCells = rows.reduce((sum, r) => sum + r, 0);
  const filledCells = Math.round((filled / total) * totalCells);

  const rowStarts = rows.map((_, i) =>
    rows.slice(0, i).reduce((sum, r) => sum + r, 0),
  );

  return (
    <div className="flex flex-col items-center gap-[4px] sm:gap-[5px]">
      {rows.map((rowLength, rowIndex) => {
        const rowStart = rowStarts[rowIndex];
        const cells = Array.from(
          { length: rowLength },
          (_, i) => rowStart + i < filledCells,
        );

        return (
          <div key={rowIndex} className="flex gap-[4px] sm:gap-[5px]">
            {cells.map((isFilled, i) => (
              <span
                key={i}
                className={cn(
                  "block h-[13px] w-[13px] shrink-0 transition-colors duration-300 sm:h-[17px] sm:w-[17px] lg:h-[20px] lg:w-[20px]",
                  isFilled
                    ? "bg-gradient-to-b from-gold-light to-gold glow-gold-sm"
                    : "bg-background-elevated border border-border/70",
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
