import { cn } from "@/lib/utils";

/**
 * Marca em forma de chama, aproximada a partir do logo real enviado pelo
 * cliente (chama/folha branca sobre fundo escuro, ao lado do wordmark
 * "Sara Nossa Terra — Cidade Júlia"). Como a imagem chegou colada no chat
 * (sem arquivo anexado), este é um redesenho manual — não uma extração
 * vetorial exata do arquivo original.
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
        d="M12.4 1C9.6 3.6 7.6 6.6 7.6 9.6c0 1.6.6 2.9 1.6 3.8-.9-2.8-.4-5.4 1.4-7.7-.3 2.7.1 5.2 1.6 7.1 1.1 1.4 1.4 2.9 1 4.5C14 15.8 15.3 13.5 15.3 11c0-1.7-.8-3.2-2-4.4.8.3 1.5.8 2.1 1.5-.4-2.9-1.4-5.1-3-7.1Z"
        fill="currentColor"
      />
      <path
        d="M9.4 12.6c.6 2.9 2 5 4.2 6.3-2.6.6-4.8-.1-6.2-2.1-1-1.5-1.2-3.2-.6-5"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M11.6 20.3c.5-1.9.3-3.6-.8-5.3"
        stroke="var(--background)"
        strokeWidth="1"
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
