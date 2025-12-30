"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body style={{ background: "var(--color-bg)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)", padding: 24 }}>
        <h1 style={{ marginTop: 0 }}>Something went wrong.</h1>
        <p style={{ color: "var(--color-text-muted)" }}>{error.message}</p>
        <button onClick={() => reset()} style={{ height: 44, padding: "0 16px", borderRadius: 14, border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-primary)" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
