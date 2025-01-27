'use client'

import { useState } from 'react'
import { ArrowLeft, Headphones } from 'lucide-react'
import styles from '../CreatorAnalytics/stylesanalytics.module.css'
import Image from 'next/image'
import InsightsTab from './InsightsTab'
import PayoutsTab from './PayoutsTab'

export default function InsightsDashboard() {
  const [activeTab, setActiveTab] = useState('insights')

  return (
    <div className={styles.containerAnalytics}>
      <header className={styles.analyticsHeader}>
        <button className={styles.analyticsBackButton}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.analyticsTitle}>Insights & Payouts</h1>
        <button className={styles.analyticsSupportButton}>
          <Headphones size={24} />
        </button>
      </header>

      <div className={styles.analyticsBanner}>
        <div className={styles.analyticsBannerContent}>
          <div className={styles.analyticsBannerContent12}>
          <Image 
            src="/images/payouts-prelaunch.png"
            alt="Shop profile"
            width={36}
            height={36}
            className={styles.bannerImage1}
          />
          <div>
            <div className={styles.analyticsBannerTitle}>Understand Your Payouts</div>
            <div className={styles.analyticsBannerSubtitle}>Click here to learn more</div>
          </div>
          </div>
          <button className={styles.analyticsLearnButton}>
            Learn
          </button>
        </div>
      </div>

      <div className={styles.analyticsTabs}>
        <button
          className={`${styles.analyticsTab} ${activeTab === 'insights' ? styles.analyticsActive : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
        <button
          className={`${styles.analyticsTab} ${activeTab === 'payouts' ? styles.analyticsActive : ''}`}
          onClick={() => setActiveTab('payouts')}
        >
          Payouts
        </button>
      </div>

      {activeTab === 'insights' ? <InsightsTab /> : <PayoutsTab />}
    </div>
  )
}

