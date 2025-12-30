import Link from "next/link";
import styles from "./PublicHome.module.css";

export default function PublicHome() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>Roam</div>
        <Link href="/login" className={styles.login}>Log in</Link>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.h1}>Here. Now. Mutual.</h1>
        <p className={styles.sub}>
          Intent-first connection with minimal profiles. No public scores. Leave nothing behind.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/signup" className={styles.primary}>Create account</Link>
          <Link href="/safety" className={styles.secondary}>Safety</Link>
        </div>
      </section>

      <section className={styles.cards}>
        <article className={styles.card}>
          <h2 className={styles.h2}>Minimal profiles</h2>
          <p className={styles.p}>Just enough to decide. Nothing to perform.</p>
        </article>
        <article className={styles.card}>
          <h2 className={styles.h2}>Mutual only</h2>
          <p className={styles.p}>Everything requires consent. Everything requires reciprocity.</p>
        </article>
        <article className={styles.card}>
          <h2 className={styles.h2}>Ephemeral by design</h2>
          <p className={styles.p}>Matches and feedback expire. No history, no baggage.</p>
        </article>
      </section>

      <footer className={styles.footer}>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/safety">Safety</Link>
      </footer>
    </main>
  );
}
