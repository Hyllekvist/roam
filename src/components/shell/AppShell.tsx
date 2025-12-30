import Link from "next/link";
import styles from "./AppShell.module.css";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/discover" className={styles.brand}>Roam</Link>
      </header>
      <main className={styles.main}>{children}</main>
      <nav className={styles.nav}>
        <Link href="/discover" className={styles.navLink}>Discover</Link>
        <Link href="/matches" className={styles.navLink}>Matches</Link>
        <Link href="/settings" className={styles.navLink}>Settings</Link>
      </nav>
    </div>
  );
}
