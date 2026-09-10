import { cn } from "@/lib/utils";

/**
 * Marca em forma de chama, extraída por vetorização (potrace) direto do
 * arquivo do logo real enviado pelo cliente em `public/images/`
 * (chama branca sobre fundo preto, ao lado do wordmark "Sara Nossa Terra —
 * Cidade Júlia"). O path abaixo é o contorno exato da chama do arquivo
 * original — não é uma aproximação manual.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 417 809"
      fill="none"
      className={cn("h-6 w-4", className)}
      aria-hidden="true"
    >
      <g transform="translate(0,809) scale(0.1,-0.1)" fill="currentColor" stroke="none">
        <path
          d="M3827 7888 c-10 -181 -67 -349 -164 -486 -70 -101 -196 -226 -418
-417 -226 -194 -387 -358 -458 -462 -167 -251 -188 -445 -83 -768 20 -60 40
-116 45 -124 8 -13 248 168 642 485 325 262 510 528 591 850 19 76 23 116 23
279 0 162 -3 206 -23 300 -24 111 -122 419 -140 437 -6 6 -11 -30 -15 -94z
M4053 6485 c-5 -8 -66 -75 -135 -149 -151 -159 -330 -317 -563 -496 -159
-122 -249 -188 -700 -514 -779 -563 -1337 -1048 -1716 -1491 -493 -577 -773
-1236 -830 -1957 -9 -114 -9 -176 0 -264 14 -144 28 -179 70 -187 64 -13 142
39 339 228 67 64 122 112 122 105 0 -6 -11 -93 -24 -193 -40 -291 -49 -486
-43 -837 6 -275 28 -624 41 -637 6 -7 334 160 453 231 254 151 422 284 659
520 236 237 370 402 591 732 257 383 457 747 662 1202 280 621 475 1192 620
1817 61 266 110 566 92 564 -3 0 -40 -39 -81 -85 -114 -130 -320 -334 -472
-470 -123 -109 -453 -378 -663 -539 -85 -66 -91 -70 -380 -301 -183 -145
-382 -315 -558 -475 l-69 -63 7 40 c13 72 82 268 133 375 166 345 517 748
1108 1269 661 583 938 877 1177 1246 104 162 198 344 177 344 -5 0 -13 -7 -17
-15z
M3815 3682 c-68 -181 -276 -616 -397 -832 -114 -201 -132 -232 -237 -400
-178 -284 -390 -585 -582 -825 -197 -247 -383 -494 -376 -501 13 -13 164 -16
234 -4 258 41 480 184 661 426 335 446 599 1114 692 1755 21 143 40 418 29
425 -4 2 -14 -18 -24 -44z"
        />
      </g>
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
      <LogoMark className="h-5 w-3.5" />
    </span>
  );
}
