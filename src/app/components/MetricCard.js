import styles from '../CreatorShop/styles.creatorShop.module.css'

export default function MetricCard({ label, value, subValue, icon }) {
  return (
    <div className={styles.analyticsMetricCard}>
      {icon && <span className={styles.analyticsMetricIcon}>{icon}</span>}
      <div className={styles.analyticsMetricValue}>
        {value}
        {subValue && <span className={styles.analyticsMetricSubValue}>{subValue}</span>}
      </div>
      <div className={styles.analyticsMetricLabel}>{label}</div>
    </div>
  )
}
