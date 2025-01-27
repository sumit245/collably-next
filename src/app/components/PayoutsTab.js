'use client'

import { Info } from 'lucide-react'
import styles from '../CreatorAnalytics/stylesanalytics.module.css'
import Image from 'next/image'
import Faq from '../components/FAQCreator'

export default function PayoutsTab() {
  return (
    <div className={styles.containerPayout}>
      <h2 className={styles.titlePayout}>Payout Status</h2>

      <div className={styles.cardPayout} data-type="pending">
        <div className={styles.cardHeaderPayout}>
          <span className={styles.cardLabelPayout}>All Time Pending Commissions</span>
          <span className={styles.statusPayout}>
            
            <Image 
                src="/images/pending-clock.svg"
                alt="View"
                width={16}
                height={16}
                className={styles.iconPayout}
              /> Pending from Brands
          </span>
        </div>
        <div className={styles.amountRowPayout}>
          <div className={styles.amountPayout}>
            <span className={styles.currencyPayout}>₹</span>
            <span className={styles.valuePayout}>000</span>
            <span className={styles.decimalPayout}>.00</span>
          </div>
          <span className={styles.arrowPayout}>›</span>
        </div>
        <div className={styles.returnsPayout}>
          <span className={styles.returnsTextPayout}>Potential Returns : 0%</span>
          <span className={styles.datePayout}>Since Apr, 2024</span>
        </div>
      </div>

      <div className={styles.cardPayout} data-type="confirmed">
        <div className={styles.cardHeaderPayout}>
          <span className={styles.cardLabelPayout}>Commissions confirmed in January</span>
          <span className={styles.statusPayout}>
          
            <Image 
                src="/images/confirmed-check.svg"
                alt="View"
                width={16}
                height={16}
                className={styles.iconPayout}
              />
              Confirmed from Brands
          </span>
        </div>
        <div className={styles.amountRowPayout}>
          <div className={styles.amountPayout}>
            <span className={styles.currencyPayout}>₹</span>
            <span className={styles.valuePayout}>000</span>
            <span className={styles.decimalPayout}>.00</span>
          </div>
          <span className={styles.arrowPayout}>›</span>
        </div>
        <div className={styles.returnsPayout}>
          <span className={styles.returnsTextPayout}>Actual Returns : 0%</span>
        </div>
      </div>

      <div className={styles.cardPayout} data-type="payout">
        <div className={styles.cardHeaderPayout}>
          <span className={styles.cardLabelPayout}>January Payout</span>
          <span className={styles.statusPayout}>
         
            <Image 
                src="/images/payout-info-icon-blue.svg"
                alt="View"
                width={16}
                height={16}
                className={styles.iconPayout}
              /> Collably Payout
          </span>
        </div>
        
        <div className={styles.amountRowPayout}>
          <div className={styles.amountPayout}>
            <span className={styles.currencyPayout}>₹</span>
            <span className={styles.valuePayout}>000</span>
            <span className={styles.decimalPayout}>.00</span>
          </div>
        </div>

        <div className={styles.breakdownPayout}>
          <div className={styles.breakdownRowPayout}>
            <span>Commissions confirmed</span>
            <div className={styles.amountPayout}>
              <span className={styles.currencyPayout}>₹</span>
              <span>000</span>
              <span className={styles.decimalPayout}>.00</span>
            </div>
          </div>

          <div className={styles.breakdownRowPayout}>
            <span>Rewards & Referral</span>
            <div className={styles.amountPayout}>
              <span className={styles.currencyPayout}>₹</span>
              <span>000</span>
              <span className={styles.decimalPayout}>.00</span>
            </div>
          </div>

          <div className={styles.breakdownRowPayout}>
            <span className={styles.tdsLabelPayout}>
              TDS
              <Info size={14} className={styles.infoIconPayout} />
            </span>
            <div className={styles.amountPayout}>
              <span>- ₹</span>
              <span>000</span>
              <span className={styles.decimalPayout}>.00</span>
            </div>
          </div>
        </div>

        <div className={styles.noticePayout}>
          Note : There has been change in TDS % for Commission and Rewards.
        </div>
      </div>
      <div className={styles.containerCard}>
      <div className={styles.leftContent}>
        <div className={styles.iconWrapper}>
          <Image
            src="/images/what_in_gift.svg"
            alt="Profile icon"
            width={24}
            height={24}
            className={styles.icon}
          />
        </div>
        <span className={styles.text}>Lifetime payouts on Collably</span>
      </div>
      <div className={styles.amountPayout}>₹0</div>
    </div>
      <Faq />
        
    </div>
  )
}

