"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./DiscoverClient.module.css";

type Candidate = { id: string; distance_km: number; intent: "now" | "tonight" | "open" };

export function DiscoverClient() {
  const [items, setItems] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/match/discover", { cache: "no-store" });
        const j = await r.json();
        if (!alive) return;
        setItems(j?.candidates ?? []);
      } catch {
        // ignore
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className={styles.wrap}>
      <div className={styles.head}>
        <h1 className={styles.h1}>Discover</h1>
        <p className={styles.sub}>Minimal profiles. Mutual only.</p>
      </div>

      {loading ? (
        <div className={styles.empty}>Loading…</div>
      ) : items.length === 0 ? (
        <div className={styles.empty}>
          No candidates yet.
          <div className={styles.actions}>
            <Button variant="ghost" full onClick={() => location.reload()}>Refresh</Button>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((c) => (
            <article key={c.id} className={styles.card}>
              <div className={styles.meta}>
                <span className={styles.pill}>{c.intent}</span>
                <span className={styles.muted}>{Math.round(c.distance_km)} km</span>
              </div>
              <div className={styles.photo} aria-hidden="true" />
              <Button full>Connect</Button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
