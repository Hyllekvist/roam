import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ margin: 0 }}>404</h1>
        <p style={{ color: "var(--color-text-muted)", margin: "8px 0 16px" }}>Not found.</p>
        <Link href="/" style={{ color: "var(--color-accent-primary)", fontWeight: 600 }}>Go home</Link>
      </div>
    </main>
  );
}
