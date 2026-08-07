"use client";

import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function HeaderAuth() {
  const { isAuthenticated, user, logout } = useAuth();

  if (isLoading()) {
    return null;
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/dashboard"
          className="hidden sm:inline-flex text-sm font-medium text-foreground/80 hover:text-foreground"
        >
          {user.full_name ?? "Minha conta"}
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => logout()}
          className="hidden sm:inline-flex"
        >
          Sair
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/auth/login"
        className="hidden sm:inline-flex text-sm font-medium text-foreground/80 hover:text-foreground"
      >
        Entrar
      </Link>
      <Link
        to="/auth/signup"
        className="hidden sm:inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-accent"
      >
        Criar conta
      </Link>
    </div>
  );
}

function isLoading() {
  // O hook carrega assíncrono; usamos window para evitar SSR hydration mismatch
  return typeof window === "undefined";
}
