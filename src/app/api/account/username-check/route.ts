import { NextResponse } from "next/server";
import { usernameSchema } from "@/lib/security/validators";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const u = usernameSchema.safeParse(json?.username);
  if (!u.success) return NextResponse.json({ ok: false, error: "Invalid username" }, { status: 400 });

  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from("profiles")
    .select("id")
    .eq("username", u.data)
    .limit(1);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, available: !data?.length });
}
