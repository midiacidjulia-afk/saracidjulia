"use client";

import { useMemo, useState, useTransition } from "react";
import { CalendarDays, Check, Copy, Loader2, Upload, X } from "lucide-react";
import { Stepper } from "./Stepper";
import { ThankYou } from "./ThankYou";
import { Field, inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { submitContribution } from "@/app/(public)/contribuir/actions";
import type { Church, Settings } from "@/lib/types";

const cotaPresets = [1, 5, 10, 20, 50];
const pixKey = "cidadejuliaev@cesnt.com.br";

type FormState = {
  name: string;
  whatsapp: string;
  city: string;
  churchName: string;
  cotas: number;
  contributionDate: string;
  receipt: File | null;
  hideFromRanking: boolean;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function Wizard({
  churches,
  settings,
}: {
  churches: Church[];
  settings: Settings;
}) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [pixCopied, setPixCopied] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    whatsapp: "",
    city: "",
    churchName: "",
    cotas: 1,
    contributionDate: todayISO(),
    receipt: null,
    hideFromRanking: false,
  });

  const amount = form.cotas * settings.cotaValue;

  const canAdvance = useMemo(() => {
    if (step === 1) return form.name.trim().length > 2 && form.whatsapp.trim().length >= 10 && form.city.trim().length > 1 && form.churchName.trim().length > 1;
    if (step === 2) return form.cotas >= 1;
    if (step === 3) return Boolean(form.contributionDate);
    return true;
  }, [step, form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function next() {
    setError(null);
    if (!canAdvance) {
      setError("Preencha os campos obrigatórios para continuar.");
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(pixKey);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2000);
    } catch {
      // clipboard indisponível — a chave já está visível para copiar manualmente
    }
  }

  function handleSubmit() {
    setError(null);
    const data = new FormData();
    data.set("name", form.name);
    data.set("whatsapp", form.whatsapp);
    data.set("city", form.city);
    data.set("churchName", form.churchName);
    data.set("cotas", String(form.cotas));
    data.set("amount", String(amount));
    data.set("contributionDate", form.contributionDate);
    data.set("hideFromRanking", String(form.hideFromRanking));
    if (form.receipt) data.set("receipt", form.receipt);

    startTransition(async () => {
      const result = await submitContribution(data);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error ?? "Não foi possível enviar. Tente novamente.");
      }
    });
  }

  if (submitted) {
    return (
      <ThankYou
        name={form.name}
        cotas={form.cotas}
        amount={amount}
        whatsappNumber={settings.whatsappNumber}
        whatsappContactName={settings.whatsappContactName}
      />
    );
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <Stepper current={step} />

      <div className="mt-8 flex flex-col gap-5">
        {step === 1 ? (
          <>
            <Field label="Nome completo">
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Seu nome completo"
              />
            </Field>
            <Field label="WhatsApp" hint="Usaremos apenas para confirmar sua participação.">
              <input
                className={inputClass}
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                placeholder="(11) 99999-9999"
                inputMode="tel"
              />
            </Field>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Cidade">
                <input
                  className={inputClass}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Sua cidade"
                />
              </Field>
              <Field label="Igreja">
                <input
                  className={inputClass}
                  value={form.churchName}
                  onChange={(e) => update("churchName", e.target.value)}
                  placeholder="Sara Nossa Terra Júlia-SP"
                  list="churches-list"
                />
                <datalist id="churches-list">
                  {churches.map((c) => (
                    <option key={c.id} value={c.name} />
                  ))}
                </datalist>
              </Field>
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Field
              label="Quantas cotas você quer fazer parte?"
              hint={`1 cota = ${formatCurrency(settings.cotaValue)}`}
            >
              <div className="flex items-center justify-center gap-6 py-2">
                <button
                  type="button"
                  onClick={() => update("cotas", Math.max(1, form.cotas - 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-xl text-foreground-muted transition-colors hover:border-accent/50 hover:text-foreground"
                  aria-label="Diminuir cotas"
                >
                  −
                </button>
                <span className="w-20 text-center font-serif text-4xl text-foreground">
                  {form.cotas}
                </span>
                <button
                  type="button"
                  onClick={() => update("cotas", form.cotas + 1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-accent text-xl text-sidebar transition-colors hover:brightness-95"
                  aria-label="Aumentar cotas"
                >
                  +
                </button>
              </div>
            </Field>

            <div className="flex flex-wrap justify-center gap-2">
              {cotaPresets.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => update("cotas", n)}
                  className={`h-9 rounded-full border px-3.5 text-xs transition-colors ${
                    form.cotas === n
                      ? "border-accent bg-accent/15 text-accent-light"
                      : "border-border text-foreground-muted hover:border-accent/50"
                  }`}
                >
                  {n} {n === 1 ? "cota" : "cotas"}
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-gold/30 bg-gold/10 p-4 text-center">
              <p className="text-sm text-foreground-muted">Valor total da sua participação</p>
              <p className="font-serif text-2xl text-gold-gradient">{formatCurrency(amount)}</p>
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <Field label="Data da oferta">
            <div className="relative">
              <CalendarDays
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
              />
              <input
                type="date"
                className={`${inputClass} pl-10`}
                value={form.contributionDate}
                onChange={(e) => update("contributionDate", e.target.value)}
                max={todayISO()}
              />
            </div>
          </Field>
        ) : null}

        {step === 4 ? (
          <>
            <div className="rounded-lg border border-gold/30 bg-gold/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-light">
                Faça sua oferta via Pix
              </p>
              <div className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="break-all font-mono text-sm text-foreground">{pixKey}</span>
                <button
                  type="button"
                  onClick={copyPixKey}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1.5 text-xs text-gold-light transition-colors hover:bg-gold/10"
                >
                  {pixCopied ? <Check size={14} /> : <Copy size={14} />}
                  {pixCopied ? "Copiado!" : "Copiar chave"}
                </button>
              </div>
            </div>

            <Field
              label="Comprovante (opcional)"
              hint="Imagem ou PDF, até 10MB. Você também poderá enviar pelo WhatsApp na próxima tela."
            >
            {form.receipt ? (
              <div className="flex items-center justify-between rounded-lg border border-border bg-background-elevated px-4 py-3">
                <span className="truncate text-sm text-foreground">{form.receipt.name}</span>
                <button
                  type="button"
                  onClick={() => update("receipt", null)}
                  className="text-foreground-muted hover:text-danger"
                  aria-label="Remover arquivo"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-background-elevated px-4 py-8 text-center transition-colors hover:border-accent/50">
                <Upload size={22} className="text-accent-light" />
                <span className="text-sm text-foreground">Clique para enviar o comprovante</span>
                <span className="text-xs text-foreground-muted">PNG, JPG ou PDF · até 10MB</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 10 * 1024 * 1024) {
                      setError("O comprovante deve ter até 10MB.");
                      return;
                    }
                    update("receipt", file ?? null);
                  }}
                />
              </label>
            )}
            </Field>
          </>
        ) : null}

        {step === 5 ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-foreground-muted">
              Revise seus dados antes de finalizar sua participação.
            </p>
            <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-background-elevated p-4 text-sm">
              <div>
                <dt className="text-foreground-muted">Nome</dt>
                <dd className="text-foreground">{form.name}</dd>
              </div>
              <div>
                <dt className="text-foreground-muted">WhatsApp</dt>
                <dd className="text-foreground">{form.whatsapp}</dd>
              </div>
              <div>
                <dt className="text-foreground-muted">Igreja</dt>
                <dd className="text-foreground">{form.churchName}</dd>
              </div>
              <div>
                <dt className="text-foreground-muted">Cidade</dt>
                <dd className="text-foreground">{form.city}</dd>
              </div>
              <div>
                <dt className="text-foreground-muted">Cotas</dt>
                <dd className="text-foreground">{form.cotas}</dd>
              </div>
              <div>
                <dt className="text-foreground-muted">Valor</dt>
                <dd className="text-accent-light">{formatCurrency(amount)}</dd>
              </div>
            </dl>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background-elevated p-4 text-sm">
              <input
                type="checkbox"
                checked={form.hideFromRanking}
                onChange={(e) => update("hideFromRanking", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
              />
              <span className="text-foreground-muted">
                Prefiro não aparecer no ranking público
              </span>
            </label>
          </div>
        ) : null}

        {error ? <p className="text-sm text-danger">{error}</p> : null}

        <div className="mt-2 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={back}
            className={step === 1 ? "invisible" : ""}
          >
            Voltar
          </Button>

          {step < 5 ? (
            <Button type="button" onClick={next}>
              {step === 4 && !form.receipt ? "Enviar comprovante depois →" : "Próximo passo →"}
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" size={16} /> : null}
              Confirmar participação
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
