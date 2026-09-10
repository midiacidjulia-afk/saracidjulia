import { CheckCircle2, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { LogoBadge } from "@/components/ui/Logo";
import { formatCurrency } from "@/lib/utils";

export function ThankYou({
  name,
  cotas,
  amount,
  whatsappNumber,
  whatsappContactName,
}: {
  name: string;
  cotas: number;
  amount: number;
  whatsappNumber: string;
  whatsappContactName: string;
}) {
  const message = encodeURIComponent(
    `Olá, ${whatsappContactName}! Sou ${name} e acabei de fazer parte da campanha Juntos pela Obra com ${cotas} ${
      cotas === 1 ? "cota" : "cotas"
    } (${formatCurrency(amount)}). Segue meu comprovante:`,
  );
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <Card className="mx-auto max-w-2xl text-center glow-gold animate-fade-up">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-success/30 bg-success/[0.08] text-success">
        <CheckCircle2 size={32} strokeWidth={1.5} />
      </span>

      <h1 className="mt-6 font-serif text-3xl text-foreground">
        Obrigado por fazer parte dessa obra!
      </h1>

      <p className="mt-3 text-foreground-muted">Sua participação representa:</p>

      <div className="mx-auto mt-5 w-fit rounded-xl border border-gold/30 bg-gold/10 px-10 py-6">
        <p className="font-serif text-3xl text-gold-gradient">
          {cotas} {cotas === 1 ? "cota" : "cotas"}
        </p>
        <p className="mt-1 text-lg text-foreground">{formatCurrency(amount)}</p>
      </div>

      <div className="mt-8 text-left">
        <p className="text-sm text-foreground-muted">
          Agora envie o comprovante pelo WhatsApp de {whatsappContactName}, responsável
          pela obra, para confirmarmos sua cota.
        </p>
        <LinkButton
          href={whatsappHref}
          target="_blank"
          size="lg"
          className="mt-4 w-full"
        >
          <MessageCircle size={18} />
          Enviar comprovante pelo WhatsApp
        </LinkButton>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <LinkButton href="/" variant="secondary">
          Voltar ao início
        </LinkButton>
        <LinkButton href="/cotas" variant="ghost">
          Ver nossas cotas
        </LinkButton>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 border-t border-border pt-6">
        <LogoBadge />
        <p className="font-serif text-sm italic text-gold-light">Juntos, vamos mais longe!</p>
      </div>
    </Card>
  );
}
