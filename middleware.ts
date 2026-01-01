import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

function isSafeNext(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;

  // Hvis ikke logged in og prøver at gå på private routes → send til login med next=
  if (!user) {
    const next = `${pathname}${search}`;
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", isSafeNext(next) ? next : "/discover");
    return NextResponse.redirect(loginUrl);
  }

  // Hvis logged in og går på /login eller /signup → send til /discover
  if (pathname === "/login" || pathname === "/signup") {
    const u = req.nextUrl.clone();
    u.pathname = "/discover";
    u.search = "";
    return NextResponse.redirect(u);
  }

  return res;
}

export const config = {
  matcher: ["/discover/:path*", "/match/:path*", "/account/:path*", "/login", "/signup"],
};