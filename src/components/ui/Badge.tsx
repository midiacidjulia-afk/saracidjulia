import { cn } from "@/lib/utils";
import type { ReceiptStatus } from "@/lib/types";

const statusStyles: Record<ReceiptStatus, string> = {
  aprovado: "bg-success/15 text-success border-success/30",
  pendente: "bg-warning/15 text-warning border-warning/30",
  reprovado: "bg-danger/15 text-danger border-danger/30",
};

const statusLabels: Record<ReceiptStatus, string> = {
  aprovado: "Aprovado",
  pendente: "Pendente",
  reprovado: "Reprovado",
};

export function StatusBadge({ status }: { status: ReceiptStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-light",
        className,
      )}
    >
      {children}
    </span>
  );
}
