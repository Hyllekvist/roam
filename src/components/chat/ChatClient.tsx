"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import styles from "./ChatClient.module.css";

export function ChatClient({ matchId }: { matchId: string }) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function send() {
    setError(null);
    const txt = body.trim();
    if (!txt) return;
    const r = await fetch("/api/message/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, body: txt })
    });
    if (!r.ok) {
      setError("Could not send");
      return;
    }
    setBody("");
  }

  return (
    <section className={styles.wrap}>
      <header className={styles.top}>
        <div className={styles.title}>Chat</div>
        <div className={styles.muted}>Match {matchId.slice(0, 6)}…</div>
      </header>
      <div className={styles.thread}>
        <div className={styles.empty}>No messages yet (MVP).</div>
      </div>
      <div className={styles.composer}>
        <Input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Say less." />
        <Button onClick={send}>Send</Button>
      </div>
      {error ? <div className={styles.err}>{error}</div> : null}
    </section>
  );
}
