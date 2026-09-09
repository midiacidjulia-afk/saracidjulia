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
        d="M12.6 1.6C8.4 4.4 5.2 9 5.2 13.3A6.8 6.8 0 0 0 12 20a6.8 6.8 0 0 0 6.8-6.7c0-2.5-1.2-4.7-2.9-6.3.5 1.7 0 3.2-1.1 4.3-.6-4-1.7-7.3-2.2-9.7Z"
        fill="currentColor"
      />
      <path
        d="M12 20c-.3-2.6.1-5 1.5-7"
        stroke="var(--background)"
        strokeWidth="1.3"
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
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light",
        className,
      )}
    >
      <LogoMark className="h-4.5 w-4.5" />
    </span>
  );
}
