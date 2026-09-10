import { cn } from "@/lib/utils";

/**
 * Marca em forma de chama de duas pétalas, aproximada a partir do logo real
 * enviado pelo cliente (chama/folha branca sobre fundo escuro, ao lado do
 * wordmark "Sara Nossa Terra — Cidade Júlia"). Como a imagem chegou colada
 * no chat (sem arquivo anexado), este é um redesenho manual — não uma
 * extração vetorial exata do arquivo original. Duas pétalas simples e sem
 * autointerseção (uma alta à esquerda, uma mais baixa e "atrás" à direita)
 * evitam o efeito de bico/garra que uma curva interna mal calculada causava
 * na versão anterior.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 44"
      fill="none"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      <path
        d="M19 40C28 34 29 22 23 14C20 20 19 30 19 40Z"
        fill="currentColor"
        opacity="0.82"
      />
      <path
        d="M17 40C2 32 1 16 11 4C15 12 16 26 17 40Z"
        fill="currentColor"
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
