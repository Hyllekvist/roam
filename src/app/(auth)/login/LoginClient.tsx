"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import styles from "../AuthForm.module.css";

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const r = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error ?? "Login failed");
      const raw = sp.get("next");
const next =
  raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : "/discover";
router.replace(next);

    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Log in" subtitle="No feeds. No noise. Just access.">

      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          label="Email or username"
          autoComplete="username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="you@domain.com or roamname"
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error ? <p className={styles.err}>{error}</p> : null}
        <Button type="submit" full disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </Button>
        <div className={styles.row}>
          <Link href="/signup" className={styles.smallLink}>
            Create account
          </Link>
          <Link href="/reset" className={styles.smallLink}>
            Forgot password
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
