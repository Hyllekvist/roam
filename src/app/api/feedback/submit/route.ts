import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const schema = z.object({ matchId: z.string().uuid(), again: z.boolean(), respectful: z.boolean() });

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return NextResponse.json({ ok: false, error: "UNAUTH" }, { status: 401 });
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });

  // TODO: replace with RPC submit_feedback(matchId, again, respectful)
  return NextResponse.json({ ok: true });
}
