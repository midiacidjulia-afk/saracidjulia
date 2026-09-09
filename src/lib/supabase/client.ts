import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./env";
import type { Database } from "./database.types";

export function createClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase não está configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return createBrowserClient<Database>(supabaseUrl!, supabaseAnonKey!);
}
