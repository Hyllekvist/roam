import type { Metadata } from "next";
import "@/styles/globals.css";
import { baseMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = baseMetadata();

export const viewport = {
  themeColor: "#0b0d10"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
