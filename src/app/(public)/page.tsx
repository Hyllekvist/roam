import Link from "next/link";
import styles from "./PublicHome.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PublicHome() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>Roam</div>
        <Link href="/login" className={styles.login}>
          Log in
        </Link>
      </header>

      <section className={styles.hero} aria-labelledby="roam-hero-title">
        <div className={styles.heroInner}>
          <span className={styles.kicker}>ROAM</span>

          <h1 id="roam-hero-title" className={styles.h1}>
            Meet only <br /> when it matters.
          </h1>

          <p className={styles.sub}>
            No profiles. No feeds. <br />
            Only mutual intent — right now.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/signup" className={styles.primary}>
              Request access
            </Link>
            <span className={styles.secondaryText}>Designed to disappear.</span>
          </div>

          <div className={styles.signal} aria-label="Roam state machine">
            <span>WAITING</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>MUTUAL</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>OPEN</span>
          </div>

          <div className={styles.linksRow}>
            <Link href="/safety" className={styles.ghostLink}>
              Safety
            </Link>
            <Link href="/privacy" className={styles.ghostLink}>
              Privacy
            </Link>
            <Link href="/terms" className={styles.ghostLink}>
              Terms
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
