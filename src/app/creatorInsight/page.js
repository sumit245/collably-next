"use client";

import { ArrowLeft, Headphones, Info } from "lucide-react";
import { Button } from "../components/Cards/button";
import { Card } from "../components/Cards/card";
import FooterCreator from "../components/FooterCreator";
import { CommissionSplit } from "../components/CommissionSplit"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Cards/select";
import styles from "./stylesinsight.module.css";
import stylesShop from "../shop/StyleShop.module.css";
import { useState } from "react";

export default function InsightsDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
                {/* Image removed for now */}
                <img
                  src="https://via.placeholder.com/150"
                  alt=""
                  className={styles.learnImageImg}
                />
              </div>
              <div>
                <h2 className={styles.learnTitle}>Understand Your Payouts</h2>
                <p className={styles.learnDescription}>
                  Click here to learn more
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className={styles.learnButton}
            >
              Learn
            </Button>
          </div>

          {/* Insights Content */}
          <div className={styles.insightsContent}>
            <div className={styles.insightsHeader}>
              <h3 className={styles.insightsTitle}>Sales & Commissions</h3>
              <Select defaultValue="today">
                <SelectTrigger
                  className={styles.selectTrigger}
                  onClick={handleDropdownToggle}
                >
                  <SelectValue className={styles.selectValue}>
                    Today
                  </SelectValue>
                </SelectTrigger>
                <SelectContent
                  className={`${styles.selectContent} ${
                    isDropdownOpen ? "show" : ""
                  }`}
                >
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main Metrics */}
          <div className={styles.metricsGrid}>
            <Card className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardAmount}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>0</span>
                </div>
                <Info className={styles.infoIcon} />
              </div>
              <p className={styles.cardText}>Ordered Commissions</p>
            </Card>
            <Card className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardAmount}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>0</span>
                </div>
                <Info className={styles.infoIcon} />
              </div>
              <p className={styles.cardText}>Ordered Amount</p>
            </Card>
          </div>

          {/* Secondary Metrics */}
          <div className={styles.secondaryMetrics}>
            <div className={styles.secondaryMetric}>
              <p className={styles.secondaryAmount}>0</p>
              <div className={styles.secondaryDescription}>
                <p className={styles.secondaryText}>Link Clicks</p>
                <Info className={styles.infoIcon} />
              </div>
            </div>
            <div className={styles.textCenter}>
              <div className={styles.secondaryMetric}>
                <p className={styles.secondaryAmount}>0</p>
                <span className={styles.percentage}>(0.00%)</span>
                <Info className={styles.infoIcon} />
              </div>
              <p className={styles.secondaryText}>Orders Placed</p>
            </div>
            <div className={styles.secondaryMetric}>
              <div className={styles.secondaryAmountContainer}>
                <span className={styles.currency}>₹</span>
                <p className={styles.secondaryAmount}>0</p>
                <Info className={styles.infoIcon} />
              </div>
              <p className={styles.secondaryText}>Avg Order Value</p>
            </div>
          </div>
        </div>
        <CommissionSplit className="max-w-md mx-auto" />
        <FooterCreator />
      </div>
    </div>
    // </div>
  );
}
