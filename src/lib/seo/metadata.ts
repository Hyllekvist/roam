import type { Metadata } from "next";

export function baseMetadata(opts?: {
  title?: string;
  description?: string;
  url?: string;
}): Metadata {
  const title = opts?.title ?? "Roam";
  const description = opts?.description ??
    "Roam is intent-first connection. Minimal profiles. Mutual only. Leave nothing behind.";
  const url = opts?.url ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(url),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
