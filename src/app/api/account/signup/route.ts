import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { signupSchema } from "@/lib/security/validators";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = signupSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const { username, email, password, ageVerified } = parsed.data;
  const admin = supabaseAdmin();

  // Check username uniqueness
  const { data: existing, error: exErr } = await admin
    .from("profiles")
    .select("id")
    .eq("username", username)
    .limit(1);
  if (exErr) return NextResponse.json({ ok: false, error: exErr.message }, { status: 500 });
  if (existing && existing.length) {
    return NextResponse.json({ ok: false, error: "USERNAME_TAKEN" }, { status: 409 });
  }

  const { data: userRes, error: userErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });
  if (userErr || !userRes.user) {
    return NextResponse.json({ ok: false, error: userErr?.message ?? "Failed to create user" }, { status: 500 });
  }

  const userId = userRes.user.id;
  const { error: profErr } = await admin.from("profiles").insert({
    id: userId,
    username,
    email,
    age_verified: ageVerified,
    intent: "open",
    score_hidden: 0,
    score_confidence: 0
  });

  if (profErr) {
    // Best effort cleanup: delete auth user to avoid orphan
    await admin.auth.admin.deleteUser(userId).catch(() => undefined);
    return NextResponse.json({ ok: false, error: profErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
