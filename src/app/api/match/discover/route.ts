import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return NextResponse.json({ ok: false, error: "UNAUTH" }, { status: 401 });

  // TODO: replace with RPC discover_candidates() returning minimal cards
  return NextResponse.json({ ok: true, cards: [] });
}
