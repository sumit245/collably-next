"use client";

import { useState } from "react";
import styles from "../CreatorAnalytics/stylesanalytics.module.css";
import { Calendar } from "lucide-react";
import DatePicker from "./DatePicker";
import Image from "next/image";
import ContentAnalytics from "../components/CreatorInsights";
import CommissionSplit from "../components/CommisionSplit";

export default function InsightsTab() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState(null);
  const [viewMode, setViewMode] = useState("Day");

  const formatDateFilter = () => {
    if (!selectedDates) return "Today";

    const isSameDay = (d1, d2) => {
      return d1.toDateString() === d2.toDateString();
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(selectedDates.start, selectedDates.end)) {
      if (isSameDay(selectedDates.start, today)) return "Today";
      if (isSameDay(selectedDates.start, yesterday)) return "Yesterday";
    }

    return "Custom Range";
  };

  return (
    <div className={styles.analyticsTabContent}>
      <div className={styles.analyticsSalesSection}>
        <div className={styles.analyticsSectionHeader}>
          <h2 className={styles.analyticsSectionTitle}>Sales & Commissions</h2>
          <button
            className={styles.analyticsDateFilter}
            onClick={() => setIsDatePickerOpen(true)}
          >
            <Calendar size={16} />
            {formatDateFilter()}
          </button>
        </div>

        <div className={styles.analyticsCard}>
          <div className={styles.analyticsMainMetrics}>
            <div className={styles.analyticsMetric}>
              <div className={styles.analyticsMetricIcon2}>
                <span className={styles.analyticsMetricIcon}>
                  <Image
                    src="/images/totalearnings.png"
                    alt="coin"
                    width={25}
                    height={25}
                  />
                </span>
                <div className={styles.analyticsMetricValue}>₹ 0</div>
              </div>
              <div className={styles.analyticsMetricLabel1}>
                Ordered Commissions
              </div>
            </div>

            <div className={styles.analyticsMetric}>
              <div className={styles.analyticsMetricIcon3}>
                <span className={styles.analyticsMetricIcon}>
                  <Image
                    src="/images/total-sale.png"
                    alt="coin"
                    width={25}
                    height={25}
                  />
                </span>
                <div className={styles.analyticsMetricValue}>₹ 0</div>{" "}
              </div>
              <div className={styles.analyticsMetricLabel}>Ordered Amount</div>
            </div>
          </div>

          <div className={styles.analyticsHorizontalDivider} />

          <div className={styles.analyticsSubMetrics}>
            <div className={styles.analyticsMetric}>
              <div className={styles.analyticsMetricLabel}>Link Clicks</div>
              <div className={styles.analyticsMetricValue}>0</div>
            </div>

            <div className={styles.analyticsMetric}>
              <div className={styles.analyticsMetricLabel}>Orders Placed</div>
              <div className={styles.analyticsMetricValue}>
                0{" "}
                <span className={styles.analyticsMetricSubValue}>(0.00%)</span>
              </div>
            </div>

            <div className={styles.analyticsMetric}>
              <div className={styles.analyticsMetricLabel}>Avg Order Value</div>
              <div className={styles.analyticsMetricValue}>₹ 0</div>
            </div>
          </div>
        </div>

        <div className={styles.analyticsChartArea}>
          <div className={styles.analyticsNotebookLines}>
            <div className={styles.analyticsEmptyMessage}>
              Share Collably's Links & start earning!
            </div>
          </div>
        </div>

        <div className={styles.analyticsViewToggle}>
          <button
            className={`${styles.analyticsToggleButton} ${
              viewMode === "Day" ? styles.analyticsActive : ""
            }`}
            onClick={() => setViewMode("Day")}
          >
            Day
          </button>
          <button
            className={`${styles.analyticsToggleButton} ${
              viewMode === "Week" ? styles.analyticsActive : ""
            }`}
            onClick={() => setViewMode("Week")}
          >
            Week
          </button>
        </div>

        <p className={styles.analyticsDisclaimer}>
          * Results shown doesn't include any non-partner brand
        </p>
      </div>
      <DatePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSelect={(dates) => {
          setSelectedDates(dates);
          setIsDatePickerOpen(false);
        }}
      />
      <CommissionSplit />
      <ContentAnalytics />
    </div>
  );
}
