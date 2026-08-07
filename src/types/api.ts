import type { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;
export type AppRole = "admin" | "volunteer" | "user";

export interface User extends Profile {
  email: string;
  roles: AppRole[];
}

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  full_name: string;
}

export interface UpdateProfileData {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}
