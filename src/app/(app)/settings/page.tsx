"use client";

import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Settings.module.css";

export default function SettingsPage() {
  const router = useRouter();
  async function logout() {
    const sb = supabaseBrowser();
    await sb.auth.signOut();
    router.replace("/login");
  }

  return (
    <section className={styles.wrap}>
      <h1 className={styles.h1}>Settings</h1>
      <p className={styles.p}>MVP: intent and safety toggles come later.</p>
      <Button onClick={logout} variant="ghost">Log out</Button>
    </section>
  );
}
