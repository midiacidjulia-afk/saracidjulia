"use client";

import { useState } from "react";
import { Check, Coins, Copy, Upload, UserPlus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const pixKey = "cidadejuliaev@cesnt.com.br";

const steps = [
  {
    icon: Coins,
    title: "Escolha sua cota",
    description: "Cada cota vale R$ 100. Você pode contribuir com uma ou quantas quiser.",
  },
  {
    icon: Copy,
    title: "Faça o Pix",
    description: "Transfira o valor para a chave Pix da campanha, abaixo.",
  },
  {
    icon: UserPlus,
    title: "Faça seu cadastro",
    description: "Preencha seus dados no formulário — leva menos de 2 minutos.",
  },
  {
    icon: Upload,
    title: "Envie o comprovante",
    description: "Anexe na hora ou depois, sem problema — você escolhe.",
  },
] as const;

export function HowToParticipate({ cotaValue }: { cotaValue: number }) {
  const [copied, setCopied] = useState(false);

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível — a chave já está visível para copiar manualmente
    }
  }

  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-8">
        <SectionHeading
          eyebrow="Como participar"
          title="É simples: faça sua parte em 4 passos"
          description={`Cada cota vale R$ ${cotaValue.toFixed(0)}. Veja como contribuir em poucos minutos.`}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="card-surface flex flex-col gap-3 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent-light">
                  {i + 1}
                </span>
                <step.icon size={18} className="text-accent" strokeWidth={1.6} />
              </div>
              <div>
                <p className="font-medium text-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-foreground-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card-surface flex flex-col items-start gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">
              Chave Pix da campanha
            </p>
            <p className="mt-1.5 break-all font-mono text-sm text-foreground">{pixKey}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copyPixKey}
              className={cn(
                "flex items-center gap-1.5 rounded-full border border-gold/30 px-4 py-2 text-xs text-gold-light transition-colors hover:bg-gold/10",
              )}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copiado!" : "Copiar chave"}
            </button>
            <LinkButton href="/contribuir" size="md">
              Quero fazer parte →
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
