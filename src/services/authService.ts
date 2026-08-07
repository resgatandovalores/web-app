import { supabase } from "@/integrations/supabase/client";
import type {
  AuthResponse,
  LoginCredentials,
  SignUpCredentials,
  UpdateProfileData,
  User,
} from "@/types/api";

async function enrichUser(authUserId: string, email: string): Promise<User | null> {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUserId)
    .maybeSingle();

  if (profileError || !profile) {
    console.error("Erro ao buscar perfil:", profileError);
    return null;
  }

  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", authUserId);

  return {
    ...profile,
    email,
    roles: roles?.map((r) => r.role) ?? ["user"],
  };
}

export async function login({ email, password }: LoginCredentials): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { user: null, error: error.message };
  }

  if (!data.user) {
    return { user: null, error: "Usuário não encontrado." };
  }

  const user = await enrichUser(data.user.id, data.user.email ?? email);
  return { user, error: null };
}

export async function signUp({
  email,
  password,
  full_name,
}: SignUpCredentials): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) {
    return { user: null, error: error.message };
  }

  // Quando a confirmação de email está ativa (padrão), o usuário ainda não
  // está logado após o signUp. Não devemos tratar data.user como sessão ativa.
  if (!data.user) {
    return { user: null, error: null };
  }

  const user = await enrichUser(data.user.id, data.user.email ?? email);
  return { user, error: null };
}

export async function getCurrentUser(): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return { user: null, error: error?.message ?? null };
  }

  const user = await enrichUser(data.user.id, data.user.email ?? "");
  return { user, error: null };
}

export async function logout(): Promise<{ error: string | null }> {
  const { error } = await supabase.auth.signOut();
  return { error: error?.message ?? null };
}

export async function sendPasswordReset(email: string): Promise<{ error: string | null }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { error: error?.message ?? null };
}

export async function updatePassword(password: string): Promise<{ error: string | null }> {
  const { error } = await supabase.auth.updateUser({ password });
  return { error: error?.message ?? null };
}

export async function updateProfile(data: UpdateProfileData): Promise<{ error: string | null }> {
  const { data: authUser, error: authError } = await supabase.auth.getUser();
  if (authError || !authUser.user) {
    return { error: authError?.message ?? "Não autenticado." };
  }

  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", authUser.user.id);

  return { error: error?.message ?? null };
}

export function hasRole(user: User | null, role: "admin" | "volunteer" | "user"): boolean {
  return user?.roles.includes(role) ?? false;
}
