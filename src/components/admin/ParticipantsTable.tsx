"use client";

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { inputClass } from "@/components/ui/Field";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { downloadCsv, toCsv } from "@/lib/csv";
import type { Participant, ReceiptStatus } from "@/lib/types";

const statusFilters: Array<{ key: ReceiptStatus | "todos"; label: string }> = [
  { key: "todos", label: "Todos" },
  { key: "aprovado", label: "Aprovados" },
  { key: "pendente", label: "Pendentes" },
  { key: "reprovado", label: "Reprovados" },
];

export function ParticipantsTable({ participants }: { participants: Participant[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ReceiptStatus | "todos">("todos");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return participants.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.churchName.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q);
      const matchesStatus = status === "todos" || p.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [participants, query, status]);

  function handleExport() {
    const rows = filtered.map((p) => ({
      Nome: p.name,
      WhatsApp: p.whatsapp,
      Cidade: p.city,
      Igreja: p.churchName,
      Cotas: p.cotas,
      Valor: p.amount,
      Data: formatDate(p.date),
      Status: p.status,
    }));
    downloadCsv(`participantes-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(rows));
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
          />
          <input
            className={`${inputClass} pl-10`}
            placeholder="Buscar por nome, igreja ou cidade"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1.5">
            {statusFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setStatus(f.key)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors",
                  status === f.key
                    ? "border-accent bg-accent text-sidebar"
                    : "border-border text-foreground-muted hover:border-accent/50",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <Button type="button" variant="secondary" size="md" onClick={handleExport}>
            <Download size={16} />
            Exportar CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground-muted">
              <th className="px-5 py-3 font-medium">Nome</th>
              <th className="px-5 py-3 font-medium">WhatsApp</th>
              <th className="px-5 py-3 font-medium">Igreja</th>
              <th className="px-5 py-3 font-medium">Cidade</th>
              <th className="px-5 py-3 font-medium">Cotas</th>
              <th className="px-5 py-3 font-medium">Valor</th>
              <th className="px-5 py-3 font-medium">Data</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-5 py-3 text-foreground">{p.name}</td>
                <td className="px-5 py-3 text-foreground-muted">{p.whatsapp}</td>
                <td className="px-5 py-3 text-foreground-muted">{p.churchName}</td>
                <td className="px-5 py-3 text-foreground-muted">{p.city}</td>
                <td className="px-5 py-3 text-foreground-muted">{p.cotas}</td>
                <td className="px-5 py-3 text-foreground-muted">{formatCurrency(p.amount)}</td>
                <td className="px-5 py-3 text-foreground-muted">{formatDate(p.date)}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-8 text-center text-foreground-muted">
                  Nenhum participante encontrado.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
