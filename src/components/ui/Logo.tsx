import { cn } from "@/lib/utils";

/**
 * Marca em forma de chama/folha, evocando o símbolo da Sara Nossa Terra.
 * Não temos o arquivo vetorial real da marca — este é um desenho próprio,
 * aproximado a partir de referências visuais da identidade da igreja.
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
        d="M13 1.3C9 4.3 6.1 8.6 6.1 12.9A5.95 5.95 0 0 0 12 18.9a5.95 5.95 0 0 0 5.9-5.9c0-2.2-1-4.2-2.5-5.6.4 1.5 0 2.8-.9 3.7-.5-4-1.4-6.9-1.5-9.8Z"
        fill="currentColor"
      />
      <path
        d="M12 18.9c-.3-2.2.1-4.3 1.3-6.1"
        stroke="var(--background)"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function LogoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-light",
        className,
      )}
    >
      <LogoMark className="h-4.5 w-4.5" />
    </span>
  );
}
