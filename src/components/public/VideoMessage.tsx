"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

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
    <section className="relative isolate flex min-h-[75vh] items-center overflow-hidden text-sidebar-foreground">
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-sidebar via-sidebar/55 to-sidebar/20" />

      <Container className="flex flex-col items-center gap-5 py-20 text-center sm:py-28">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-light">
          Uma palavra de Nivaldo
        </span>
        <h2 className="max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
          Um convite direto de quem cuida dessa obra
        </h2>
        <p className="max-w-lg text-sidebar-foreground-muted">
          Nivaldo, responsável pela obra, gravou esse convite direto do
          templo. Ative o som para ouvir por que sua participação faz toda a
          diferença.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={toggleSound}
            className="flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors hover:brightness-110"
          >
            {muted ? <Volume2 size={17} /> : <VolumeX size={17} />}
            {muted ? "Ativar som" : "Silenciar"}
          </button>
          <LinkButton href="/contribuir" variant="secondary" size="md">
            Quero contribuir →
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
