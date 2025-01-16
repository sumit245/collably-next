'use client'

import styles from '../CreatorShop/styles.creatorShop.module.css'

export default function ChannelWiseTab() {
  return (
    <div className={styles.tabContent}>
      <p className={styles.subtitle}>Check out which channels are working for you</p>
      
      <div className={styles.chartContainer}>
        <div className={styles.donutChart}>
          <div className={styles.donutCenter}>
            <span className={styles.amount}>₹0</span>
          </div>
        </div>
      </div>
      
      <p className={styles.emptyMessage}>
        * You don't have any commissions in the selected time period. Share Wishlinks and earn
      </p>
    </div>
  )
}

