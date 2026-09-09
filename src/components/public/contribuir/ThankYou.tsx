import { CheckCircle2, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
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
  const firstName = name.trim().split(/\s+/)[0] ?? "";
  const message = encodeURIComponent(
    `Olá, ${whatsappContactName}! Sou ${name} e acabei de fazer parte da campanha Juntos pela Obra com ${cotas} ${
      cotas === 1 ? "cota" : "cotas"
    } (${formatCurrency(amount)}). Segue meu comprovante:`,
  );
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <Card className="mx-auto max-w-2xl text-center glow-gold animate-fade-up">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
        <CheckCircle2 size={32} strokeWidth={1.5} />
      </span>

      <h1 className="mt-6 font-serif text-3xl text-foreground">
        Obrigado por fazer parte, {firstName}!
      </h1>

      <p className="mt-3 text-foreground-muted">
        Sua participação com{" "}
        <strong className="text-gold-light">
          {cotas} {cotas === 1 ? "cota" : "cotas"}
        </strong>{" "}
        no valor de <strong className="text-gold-light">{formatCurrency(amount)}</strong> foi
        registrada. Agora falta um último passo.
      </p>

      <div className="mt-8 rounded-xl border border-gold/30 bg-gold/10 p-6 text-left">
        <p className="text-sm font-semibold text-foreground">
          Envie seu comprovante pelo WhatsApp
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          Para confirmarmos sua cota, envie o comprovante da oferta para{" "}
          {whatsappContactName}, responsável pela obra.
        </p>
        <LinkButton
          href={whatsappHref}
          target="_blank"
          size="lg"
          className="mt-4 w-full sm:w-auto"
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
    </Card>
  );
}
