import { NextResponse } from "next/server";

export async function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const lines = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /discover",
    "Disallow: /matches",
    "Disallow: /chat",
    "Disallow: /after",
    "Disallow: /settings",
    `Sitemap: ${site}/api/seo/sitemap`
  ];
  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
