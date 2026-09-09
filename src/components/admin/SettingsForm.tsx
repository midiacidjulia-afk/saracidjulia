"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Field, inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { updateSettings } from "@/app/admin/(dashboard)/configuracoes/actions";
import type { Settings } from "@/lib/types";

export function SettingsForm({ settings }: { settings: Settings }) {
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await updateSettings(formData);
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Configurações salvas com sucesso." });
      }
    });
  }

  return (
    <Card className="max-w-2xl">
      <form action={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Meta financeira (R$)">
            <input
              name="goalAmount"
              type="number"
              min={1}
              defaultValue={settings.goalAmount}
              className={inputClass}
            />
          </Field>
          <Field label="Valor da cota (R$)">
            <input
              name="cotaValue"
              type="number"
              min={1}
              defaultValue={settings.cotaValue}
              className={inputClass}
            />
          </Field>
          <Field label="Total de cotas">
            <input
              name="totalCotas"
              type="number"
              min={1}
              defaultValue={settings.totalCotas}
              className={inputClass}
            />
          </Field>
          <Field label="Nome do responsável (WhatsApp)">
            <input
              name="whatsappContactName"
              defaultValue={settings.whatsappContactName}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Número do WhatsApp" hint="Formato internacional, apenas números. Ex: 5511999999999">
          <input name="whatsappNumber" defaultValue={settings.whatsappNumber} className={inputClass} />
        </Field>

        {message ? (
          <p className={message.type === "error" ? "text-sm text-danger" : "text-sm text-success"}>
            {message.text}
          </p>
        ) : null}

        <Button type="submit" disabled={isPending} className="w-fit">
          {isPending ? <Loader2 className="animate-spin" size={16} /> : null}
          Salvar configurações
        </Button>
      </form>
    </Card>
  );
}
