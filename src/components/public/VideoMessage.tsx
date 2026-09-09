"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function VideoMessage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <section className="relative isolate flex min-h-[46vh] items-center overflow-hidden text-sidebar-foreground sm:min-h-[52vh]">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        poster="/images/nivaldo-mensagem-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/nivaldo-mensagem.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-sidebar via-sidebar/50 to-sidebar/10" />

      <Container className="flex flex-col items-center gap-4 py-14 text-center sm:py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-light">
          Uma palavra de Nivaldo
        </span>
        <h2 className="max-w-xl font-serif text-2xl leading-tight sm:text-3xl">
          Um convite direto de quem cuida dessa obra
        </h2>
        <p className="max-w-lg text-sm text-sidebar-foreground-muted">
          Ative o som para ouvir por que sua participação faz toda a diferença.
        </p>

        <button
          onClick={toggleSound}
          className="mt-1 flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-sidebar transition-colors hover:brightness-95"
        >
          {muted ? <Volume2 size={17} /> : <VolumeX size={17} />}
          {muted ? "Ativar som" : "Silenciar"}
        </button>
      </Container>
    </section>
  );
}
