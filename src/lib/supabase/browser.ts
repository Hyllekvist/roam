import { createBrowserClient } from "@supabase/ssr";

export function supabaseBrowser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase public env vars missing");
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
