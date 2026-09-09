"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function VideoMessage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <section className="border-t border-border bg-radial-glow py-16 sm:py-24">
      <Container className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center">
        <div className="max-w-md text-center lg:text-left">
          <SectionHeading
            eyebrow="Uma palavra de Nivaldo"
            title="Um convite direto de quem cuida dessa obra"
            description="Nivaldo, responsável pela obra, gravou esse convite direto do templo. Assista para entender por que sua participação faz toda a diferença."
          />
        </div>

        <div
          className="relative w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-border glow-accent"
          style={{ aspectRatio: "9 / 16" }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/images/nivaldo-mensagem-poster.jpg"
            controls={playing}
            playsInline
            onPause={() => setPlaying(false)}
          >
            <source src="/video/nivaldo-mensagem.mp4" type="video/mp4" />
          </video>

          {!playing ? (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-foreground/10 transition-colors hover:bg-foreground/20"
              aria-label="Assistir mensagem de Nivaldo"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-background-card glow-accent-sm">
                <Play size={26} fill="currentColor" className="ml-1" />
              </span>
            </button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
