import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/config/env";
import { loginSchema } from "@/lib/security/validators";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const { identifier, password } = parsed.data;
  let email = identifier;

  if (!identifier.includes("@")) {
    // Map username -> email server-side (no email leakage)
    const admin = supabaseAdmin();
    const { data, error } = await admin
      .from("profiles")
      .select("email")
      .eq("username", identifier.toLowerCase())
      .limit(1)
      .maybeSingle();
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    if (!data?.email) return NextResponse.json({ ok: false, error: "INVALID_CREDENTIALS" }, { status: 401 });
    email = data.email;
  }

  const res = NextResponse.json({ ok: true });
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name) {
        return req.cookies.get(name)?.value;
      },
      set(name, value, options) {
        res.cookies.set({ name, value, ...options });
      },
      remove(name, options) {
        res.cookies.set({ name, value: "", ...options, maxAge: 0 });
      }
    }
  });

  const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
  if (signInErr) {
    const fail = NextResponse.json({ ok: false, error: "INVALID_CREDENTIALS" }, { status: 401 });
    return fail;
  }

  return res;
}
