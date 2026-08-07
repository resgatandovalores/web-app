// `api.ts` é a configuração central da comunicação com o backend.
// No projeto Lovable, usamos o cliente Supabase gerado automaticamente como
// camada de transporte (autenticação, banco, storage). Em vez de criar um
// Axios/fetch manual, exportamos esse cliente.
import { supabase } from "@/integrations/supabase/client";

export const api = supabase;
export type SupabaseClient = typeof supabase;
