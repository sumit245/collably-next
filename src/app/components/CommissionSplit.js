"use client";

import React, { useState } from "react";
import styles from "../creatorInsight/stylescommision.module.css";

export function CommissionSplit({ className }) {
  const [view, setView] = useState("brand");

  return (
    <div className={styles.container}>
    <div className={`${styles.wrapper} ${className}`}>
      {/* Title Section */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Split of Ordered Commissions</h2>

        {/* Toggle Buttons */}
        <div className={styles.toggleButtons}>
          <button
            onClick={() => setView("brand")}
            className={`${styles.toggleButton} ${
              view === "brand" ? styles.activeButton : styles.inactiveButton
            }`}
          >
            Brand-wise
          </button>
          <button
            onClick={() => setView("channel")}
            className={`${styles.toggleButton} ${
              view === "channel" ? styles.activeButton : styles.inactiveButton
            }`}
          >
            Channel-wise
          </button>
        </div>

        <p className={styles.subtitle}>
          Check out which brands are working for you
        </p>
      </div>

      {/* Donut Chart */}
      <div className={styles.donutChartContainer}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            className={styles.donutBackground}
          />
        </svg>
        <div className={styles.donutCenter}>
          <div className={styles.donutText}>
            <span className={styles.donutCurrency}>₹</span>
            <span className={styles.donutValue}>0</span>
          </div>
        </div>
      </div>

      {/* No Data Message */}
      <p className={styles.noDataMessage}>
        * You don&apos;t have any commissions in the selected time period.
        Share Wishlinks and earn
      </p>
    </div>
    </div>
  );
}
