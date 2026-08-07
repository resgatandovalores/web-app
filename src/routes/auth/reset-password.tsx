import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sendPasswordReset, updatePassword } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"request" | "set">("request");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setMode("set");
    }
  }, []);

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await sendPasswordReset(email);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setSuccess(true);
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await updatePassword(password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    await supabase.auth.signOut();
    navigate({ to: "/auth/login", replace: true });
  }

  if (success && mode === "request") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-md text-center space-y-4">
          <h1 className="font-display text-3xl font-medium tracking-tight">Link enviado</h1>
          <p className="text-muted-foreground">
            Verifique sua caixa de entrada e siga o link para redefinir sua senha.
          </p>
          <Link to="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
            Voltar para o login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-medium tracking-tight">
            {mode === "request" ? "Recuperar senha" : "Nova senha"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "request"
              ? "Enviaremos um link para redefinir sua senha."
              : "Defina uma nova senha para sua conta."}
          </p>
        </div>

        <form
          onSubmit={mode === "request" ? handleRequest : handleSetPassword}
          className="space-y-5"
        >
          {mode === "request" ? (
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="password">Nova senha</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Processando..."
              : mode === "request"
              ? "Enviar link"
              : "Redefinir senha"}
          </Button>
        </form>

        <div className="text-center">
          <Link to="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
            ← Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
