import Image from "next/image";

const slots = [
  { src: "/images/historia-culto.jpg", caption: "Um culto de adoração e comunhão" },
  { src: "/images/historia-oracao.jpg", caption: "Um momento de oração e entrega" },
  { src: "/images/historia-celebracao.jpg", caption: "Uma celebração da nossa comunidade" },
];

/** Galeria de fotos reais da "nossa história", enviadas pelo cliente. */
export function PhotoGallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {slots.map((slot) => (
        <figure
          key={slot.src}
          className="card-surface group relative aspect-[3/4] overflow-hidden rounded-2xl"
        >
          <Image
            src={slot.src}
            alt={slot.caption}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm text-foreground">
            {slot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
