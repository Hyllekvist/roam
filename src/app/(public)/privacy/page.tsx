import Link from "next/link";
import styles from "../PublicPage.module.css";

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Roam</Link>
        <Link href="/login" className={styles.link}>Log in</Link>
      </header>
      <section className={styles.body}>
        <h1 className={styles.h1}>Privacy</h1>
        <p className={styles.p}>
          Roam is designed to minimize stored data. App interactions are ephemeral and expire by default.
        </p>
        <ul className={styles.list}>
          <li>We store only what is needed to run the product.</li>
          <li>Matches and feedback expire automatically.</li>
          <li>We do not sell personal data.</li>
        </ul>
      </section>
    </main>
  );
}
