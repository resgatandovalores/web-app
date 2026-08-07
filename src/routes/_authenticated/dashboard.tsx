import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight">
            Resgatando <span className="text-muted-foreground">Valores</span>
          </Link>
          <Button variant="outline" onClick={() => logout()}>
            Sair
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="font-display text-4xl font-medium tracking-tight">
          Olá, {user?.full_name ?? "voluntário(a)"}!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Esta é a área logada da ONG. Aqui você poderá acompanhar projetos,
          agendar atividades e acessar conteúdos internos.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-medium">Seu perfil</h2>
            <p className="mt-2 text-sm text-muted-foreground">E-mail: {user?.email}</p>
            <p className="text-sm text-muted-foreground">Papéis: {user?.roles?.join(", ") ?? "user"}</p>
          </div>
        </div>

        <div className="mt-10">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Voltar para o site público
          </Link>
        </div>
      </main>
    </div>
  );
}
