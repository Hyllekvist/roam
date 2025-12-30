"use client";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <span className={styles.kicker}>ROAM</span>

        <h1 className={styles.title}>
          Meet only <br /> when it matters.
        </h1>

        <p className={styles.subtitle}>
          No profiles. No feeds. <br />
          Only mutual intent — right now.
        </p>

        <div className={styles.actions}>
          <button className={styles.primary}>Request access</button>
          <span className={styles.secondary}>
            Designed to disappear.
          </span>
        </div>

        <div className={styles.signal}>
          <span>WAITING</span>
          <span className={styles.dot} />
          <span>MUTUAL</span>
          <span className={styles.dot} />
          <span>OPEN</span>
        </div>
      </div>
    </section>
  );
}
