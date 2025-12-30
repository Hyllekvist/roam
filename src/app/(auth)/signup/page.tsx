"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import styles from "../AuthForm.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageVerified, setAgeVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/account/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, email, password, ageVerified })
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) {
        setError(j.error ?? "Signup failed");
        return;
      }

      // Auto-login
      const loginRes = await fetch("/api/account/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ identifier: email, password })
      });
      const lj = await loginRes.json().catch(() => ({}));
      if (!loginRes.ok || !lj.ok) {
        router.push("/login");
        return;
      }
      router.push("/discover");
    } catch (e: any) {
      setError(e?.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Create account" subtitle="Minimal profile. Intent-first.">
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="roamname"
          required
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="you@domain.com"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label style={{ display: "flex", gap: 10, alignItems: "center", color: "var(--color-text-muted)", fontSize: 13 }}>
          <input
            type="checkbox"
            checked={ageVerified}
            onChange={(e) => setAgeVerified(e.target.checked)}
          />
          I confirm I’m 18+
        </label>

        {error ? <p className={styles.err}>{error}</p> : null}
        <Button type="submit" full disabled={loading}>
          {loading ? "Creating…" : "Create"}
        </Button>

        <div style={{ textAlign: "center" }}>
          <Link href="/login" className={styles.smallLink}>Already have an account?</Link>
        </div>
      </form>
    </AuthCard>
  );
}
