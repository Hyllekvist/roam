import Link from "next/link";
import styles from "../PublicPage.module.css";

export default function SafetyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Roam</Link>
        <Link href="/login" className={styles.link}>Log in</Link>
      </header>
      <section className={styles.body}>
        <h1 className={styles.h1}>Safety</h1>
        <p className={styles.p}>Roam is mutual-only. You control pace. Leave if anything feels off.</p>
        <ul className={styles.list}>
          <li>Meet in public first. Trust your intuition.</li>
          <li>Share your plan with a friend.</li>
          <li>Consent can be withdrawn at any time.</li>
          <li>Block/report anything abusive (v1 adds this in Settings).</li>
        </ul>
      </section>
    </main>
  );
}
