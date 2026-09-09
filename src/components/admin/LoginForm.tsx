"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Field, inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { login } from "@/app/admin/login/actions";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <Field label="E-mail">
        <input
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="voce@sntjulia.org"
        />
      </Field>
      <Field label="Senha">
        <input
          name="password"
          type="password"
          required
          className={inputClass}
          placeholder="••••••••"
        />
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Loader2 className="animate-spin" size={16} /> : null}
        Entrar
      </Button>
    </form>
  );
}
