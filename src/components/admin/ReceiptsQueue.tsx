"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { formatCurrency, formatDate, initials } from "@/lib/utils";
import { reviewContribution } from "@/app/admin/(dashboard)/comprovantes/actions";
import type { Participant } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function ReceiptsQueue({ participants }: { participants: Participant[] }) {
  const [items, setItems] = useState(participants);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleReview(id: string, status: "aprovado" | "reprovado") {
    setNotice(null);
    setPendingId(id);
    startTransition(async () => {
      const result = await reviewContribution(id, status);
      if (result.error) {
        setNotice(result.error);
      } else {
        setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
      }
      setPendingId(null);
    });
  }

  if (items.length === 0) {
    return (
      <Card className="text-center text-sm text-foreground-muted">
        Nenhum comprovante para revisar no momento.
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {notice ? (
        <p className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm text-warning">
          {notice}
        </p>
      ) : null}

      <Card className="p-0 overflow-hidden">
        <ul className="divide-y divide-border">
          {items.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-serif text-sm text-accent-light">
                {initials(p.name)}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                <p className="truncate text-xs text-foreground-muted">
                  {p.churchName} · {formatDate(p.date)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-accent-light">
                  {p.cotas} {p.cotas === 1 ? "cota" : "cotas"}
                </p>
                <p className="text-xs text-foreground-muted">{formatCurrency(p.amount)}</p>
              </div>

              <StatusBadge status={p.status} />

              {p.status === "pendente" ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReview(p.id, "aprovado")}
                    disabled={pendingId === p.id || !isSupabaseConfigured}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success transition-colors hover:bg-success/20 disabled:opacity-50"
                    aria-label="Aprovar"
                  >
                    {pendingId === p.id ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  </button>
                  <button
                    onClick={() => handleReview(p.id, "reprovado")}
                    disabled={pendingId === p.id || !isSupabaseConfigured}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-danger/30 bg-danger/10 text-danger transition-colors hover:bg-danger/20 disabled:opacity-50"
                    aria-label="Reprovar"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
