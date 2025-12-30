import styles from "./AuthCard.module.css";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.head}>
          <div className={styles.brand}>Roam</div>
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
        {children}
      </section>
    </main>
  );
}
