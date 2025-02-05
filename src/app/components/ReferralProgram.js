"use client";

import { Copy } from "lucide-react";
import styles from '../CreatorHome/ReferralProgram.module.css'

export default function ReferralProgram() {
  return (
    <section className={styles.section}>
      <h2 className={`${styles.heading} text-xl`}>Collably Referral Program</h2>
      <div className={styles.container}>
        <p className={styles.text}>
          When you refer a friend to Collably, you can earn{" "}
          <span className={styles.link}>10% of the total commissions</span> they earn during their{" "}
          <span className={styles.link}>first 6 months</span>.
        </p>
        <div className={styles.buttonContainer}>
          <span className={styles.linkText}>collably.app.link/HfDoN9qa7pb</span>
          <div className={styles.iconCard}>
            <button className={styles.button}>
              <Copy className={styles.icon} />
            </button>
            <button className={styles.button}>
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
