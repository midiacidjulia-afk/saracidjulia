import { cn } from "@/lib/utils";

/**
 * Marca em forma de folha/chama, evocando o símbolo da Sara Nossa Terra,
 * usada no lugar de um logotipo real (não temos o asset da marca).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      <path
        d="M12 2C7 4 4 8.5 4 13a8 8 0 0 0 16 0c0-3-1.4-5.7-3.5-7.7.4 2-.1 3.7-1.3 5C14.3 9 13.6 6.3 12 2Z"
        fill="currentColor"
      />
      <path
        d="M12 22v-7"
        stroke="var(--background)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-light",
        className,
      )}
    >
      <LogoMark className="h-4.5 w-4.5" />
    </span>
  );
}
