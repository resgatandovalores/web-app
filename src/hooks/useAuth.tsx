"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser, login, logout, signUp } from "@/services/authService";
import type { LoginCredentials, SignUpCredentials, User } from "@/types/api";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ error: string | null }>;
  signUp: (credentials: SignUpCredentials) => Promise<{ error: string | null; needsEmailConfirmation: boolean }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { user } = await getCurrentUser();
    setUser(user);
  }, []);

  useEffect(() => {
    let mounted = true;

    getCurrentUser().then(({ user }) => {
      if (mounted) {
        setUser(user);
        setIsLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        const { user } = await getCurrentUser();
        if (mounted) setUser(user);
      }
      if (event === "SIGNED_OUT") {
        if (mounted) setUser(null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    const { error } = await login(credentials);
    if (!error) {
      await refresh();
    }
    return { error };
  };

  const handleSignUp = async (credentials: SignUpCredentials) => {
    const { user, error } = await signUp(credentials);
    const needsEmailConfirmation = !user && !error;
    if (user) {
      await refresh();
    }
    return { error, needsEmailConfirmation };
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login: handleLogin,
        signUp: handleSignUp,
        logout: handleLogout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
