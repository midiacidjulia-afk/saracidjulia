import { LoginForm } from "@/components/admin/LoginForm";
import { Card } from "@/components/ui/Card";
import { LogoBadge } from "@/components/ui/Logo";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata = {
  title: "Login administrativo | Juntos pela Obra",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-radial-glow px-5">
      <Card className="w-full max-w-sm glow-accent">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <LogoBadge className="h-11 w-11" />
          <h1 className="font-serif text-xl text-foreground">Painel administrativo</h1>
          <p className="text-sm text-foreground-muted">Juntos pela Obra — Sara Nossa Terra</p>
        </div>

        {isSupabaseConfigured ? (
          <LoginForm />
        ) : (
          <p className="rounded-lg border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
            Supabase não configurado neste ambiente. Defina{" "}
            <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
            <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para habilitar o
            login. Enquanto isso, o painel administrativo está acessível em modo de
            demonstração.
          </p>
        )}
      </Card>
    </main>
  );
}
