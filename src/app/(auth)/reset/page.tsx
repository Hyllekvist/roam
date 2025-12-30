"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import styles from "../AuthForm.module.css";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const supabase = supabaseBrowser();
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/confirm`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) setStatus(error.message);
    else setStatus("Check your inbox.");
  }

  return (
    <AuthCard title="Reset password" subtitle="We'll email you a reset link.">
      <form onSubmit={onSubmit} className={styles.form}>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" full>Send reset</Button>
        {status ? <p className={styles.smallLink}>{status}</p> : null}
        <Link href="/login" className={styles.smallLink}>Back to login</Link>
      </form>
    </AuthCard>
  );
}
