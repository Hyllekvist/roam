import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const schema = z.object({ targetUserId: z.string().uuid() });

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return NextResponse.json({ ok: false, error: "UNAUTH" }, { status: 401 });
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid" }, { status: 400 });

  // TODO: RPC create_match(target)
  return NextResponse.json({ ok: true, matchId: crypto.randomUUID() });
}
