import { AdminShell } from "@/components/admin/AdminShell";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isSupabaseConfigured ? (
        <div className="border-b border-warning/30 bg-warning/10 px-5 py-2.5 text-center text-xs text-warning">
          Modo de demonstração — configure o Supabase para habilitar autenticação e dados reais.
        </div>
      ) : null}
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
