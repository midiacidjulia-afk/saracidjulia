export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Enquanto o projeto Supabase não é provisionado (ou fora do deploy),
 * a aplicação roda com dados de demonstração (`src/lib/mock-data.ts`)
 * em vez de falhar. Isso mantém `npm run dev`/`npm run build` funcionando
 * sem segredos configurados.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
