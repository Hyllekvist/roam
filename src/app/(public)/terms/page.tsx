import Link from "next/link";
import styles from "../PublicPage.module.css";

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Roam</Link>
        <Link href="/login" className={styles.link}>Log in</Link>
      </header>
      <section className={styles.body}>
        <h1 className={styles.h1}>Terms</h1>
        <p className={styles.p}>
          You must be 18+ to use Roam. You are responsible for your behavior and for ensuring mutual consent.
        </p>
        <ul className={styles.list}>
          <li>No harassment, coercion, or non-consensual content.</li>
          <li>No doxxing, threats, or intimidation.</li>
          <li>Violations may result in restrictions or removal.</li>
        </ul>
      </section>
    </main>
  );
}
