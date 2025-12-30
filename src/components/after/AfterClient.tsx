"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./AfterClient.module.css";

export function AfterClient({ matchId }: { matchId: string }) {
  const [again, setAgain] = useState<boolean | null>(null);
  const [respectful, setRespectful] = useState<boolean | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit() {
    setErr(null);
    if (again === null || respectful === null) {
      setErr("Answer both questions.");
      return;
    }
    const res = await fetch("/api/feedback/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, again, respectful })
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j.error ?? "Failed");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <section className={styles.wrap}>
        <h1 className={styles.h1}>Done.</h1>
        <p className={styles.p}>Thanks. Outcomes are mutual. Matches may close automatically.</p>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <h1 className={styles.h1}>After</h1>
      <p className={styles.p}>Two taps. No commentary.</p>

      <div className={styles.block}>
        <div className={styles.q}>Again?</div>
        <div className={styles.row}>
          <Button variant={again === true ? "primary" : "ghost"} onClick={() => setAgain(true)} full>Yes</Button>
          <Button variant={again === false ? "primary" : "ghost"} onClick={() => setAgain(false)} full>No</Button>
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.q}>Respectful?</div>
        <div className={styles.row}>
          <Button variant={respectful === true ? "primary" : "ghost"} onClick={() => setRespectful(true)} full>Yes</Button>
          <Button variant={respectful === false ? "primary" : "ghost"} onClick={() => setRespectful(false)} full>No</Button>
        </div>
      </div>

      {err ? <div className={styles.err}>{err}</div> : null}
      <Button onClick={submit} full>Submit</Button>
    </section>
  );
}
