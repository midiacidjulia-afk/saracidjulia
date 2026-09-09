import { Camera } from "lucide-react";

const slots = [
  { caption: "Um culto de adoração e comunhão" },
  { caption: "Um momento de oração e entrega" },
  { caption: "Uma celebração da nossa comunidade" },
];

/**
 * Galeria de fotos da "nossa história". As fotos reais enviadas pelo
 * cliente ainda não chegaram como arquivos (só apareceram embutidas na
 * conversa) — assim que forem enviadas como anexo, basta trocar estes
 * placeholders por <Image src="/images/historia-N.jpg" ... />.
 */
export function PhotoGallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {slots.map((slot, i) => (
        <div
          key={i}
          className="card-surface flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
            <Camera size={20} strokeWidth={1.75} />
          </span>
          <p className="text-xs text-foreground-muted">{slot.caption}</p>
        </div>
      ))}
    </div>
  );
}
