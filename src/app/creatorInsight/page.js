'use client'

import { ArrowLeft, Headphones, Info } from "lucide-react"
import { Button } from "../components/Cards/button"
import { Card } from "../components/Cards/card"
import FooterCreator from "../components/FooterCreator"
import { CommissionSplit } from "../components/CommissionSplit"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/Cards/select"
import styles from "./stylesinsight.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import { useState } from "react"

export default function InsightsDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <Button variant="ghost" size="icon" className={styles.button}>
                <ArrowLeft className={styles.icon} />
              </Button>
              <h1 className={styles.headerText}>Insights & Payouts</h1>
            </div>
            <Button variant="ghost" size="icon" className={styles.button}>
              <Headphones className={styles.icon} />
            </Button>
          </div>

          {/* Learn Banner */}
          <div className={styles.learnBanner}>
            <div className={styles.learnBannerText}>
              <div className={styles.learnImage}>
                <img src="https://via.placeholder.com/150" alt="" className={styles.learnImageImg} />
              </div>
              <div>
                <h2 className={styles.learnTitle}>Understand Your Payouts</h2>
                <p className={styles.learnDescription}>Click here to learn more</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" className={styles.learnButton}>Learn</Button>
          </div>

          {/* Insights Content */}
          <div className={styles.insightsContent}>
            <div className={styles.insightsHeader}>
              <h3 className={styles.insightsTitle}>Sales & Commissions</h3>
              <Select defaultValue="today">
                <SelectTrigger className={styles.selectTrigger} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <SelectValue className={styles.selectValue}>Today</SelectValue>
                </SelectTrigger>
                <SelectContent className={`${styles.selectContent} ${isDropdownOpen ? "show" : ""}`}>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main Metrics */}
          <div className={styles.metricsGrid}>
            {['Ordered Commissions', 'Ordered Amount'].map((text, index) => (
              <Card className={styles.card} key={index}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardAmount}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.amount}>0</span>
                  </div>
                  <Info className={styles.infoIcon} />
                </div>
                <p className={styles.cardText}>{text}</p>
              </Card>
            ))}
          </div>

          {/* Secondary Metrics */}
          <div className={styles.secondaryMetrics}>
            {[
              { amount: 0, text: 'Link Clicks' },
              { amount: 0, text: 'Orders Placed', percentage: '0.00%' },
              { amount: 0, text: 'Avg Order Value', currency: '₹' },
            ].map(({ amount, text, percentage, currency }, index) => (
              <div key={index} className={styles.secondaryMetric}>
                <p className={styles.secondaryAmount}>{currency}{amount}</p>
                {percentage && <span className={styles.percentage}>{percentage}</span>}
                <div className={styles.secondaryDescription}>
                  <p className={styles.secondaryText}>{text}</p>
                  <Info className={styles.infoIcon} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <CommissionSplit className="max-w-md mx-auto" />
        <FooterCreator />
      </div>
    </div>
  )
}