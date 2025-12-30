import Link from "next/link";
import styles from "../AuthSimple.module.css";

export default function ConfirmPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.h1}>Account ready</h1>
        <p className={styles.p}>You can log in now.</p>
        <Link href="/login" className={styles.primary}>Log in</Link>
      </section>
    </main>
  );
}
