"use client"

import styles from '../CreatorHome/TopPerformers.module.css';

export default function TopPerformers() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Top Performers</h2>
        <button className={styles.viewButton}>View All →</button>
      </div>
      <div className={styles.gallery}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={styles.avatar} />
        ))}
      </div>
    </section>
  );
}

  