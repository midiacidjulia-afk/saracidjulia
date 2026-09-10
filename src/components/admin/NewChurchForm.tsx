"use client";

import { useState, useTransition } from "react";
import { Loader2, Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Field, inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createChurch } from "@/app/admin/(dashboard)/igrejas/actions";

export function NewChurchForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createChurch(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <Card>
      <p className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
        <Plus size={16} className="text-accent-light" />
        Cadastrar igreja
      </p>
      <form action={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <Field label="Nome da igreja">
          <input name="name" required className={inputClass} placeholder="Sara Nossa Terra ..." />
        </Field>
        <Field label="Cidade">
          <input name="city" required className={inputClass} placeholder="Cidade" />
        </Field>
        <Button type="submit" disabled={isPending} className="h-11">
          {isPending ? <Loader2 className="animate-spin" size={16} /> : null}
          Adicionar
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
    </Card>
  );
}
