'use client'

import styles from './styles.module.css'
import { ArrowRight, Instagram, Youtube } from 'lucide-react'
import { BrandTelegram } from './icon'
import stylesShop from '../shop/StyleShop.module.css';

export default function Page() {
  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.logo}>wishlink</h1>
        
        <h2 className={styles.title}>Let's verify your social media account</h2>
        <p className={styles.subtitle}>
          Select your primary social media channel that you want to connect with Wishlink
        </p>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Social</h3>
          <button className={styles.button}>
            <div className={styles.buttonContent}>
              <Instagram className={styles.icon} />
              <span>Instagram</span>
            </div>
            <ArrowRight className={styles.arrowIcon} />
          </button>

          <button className={styles.button}>
            <div className={styles.buttonContent}>
              <Youtube className={styles.icon} fill="currentColor" />
              <span>Youtube</span>
            </div>
            <ArrowRight className={styles.arrowIcon} />
          </button>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Affiliate</h3>
          <button className={styles.button}>
            <div className={styles.buttonContent}>
              <BrandTelegram className={styles.icon} />
              <span>Telegram</span>
            </div>
            <ArrowRight className={styles.arrowIcon} />
          </button>
        </div>

        <div className={styles.benefits}>
          <h3 className={styles.benefitsTitle}>Benefits</h3>
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
             
              <p>Seamlessly link products with any of your content</p>
            </div>
            <div className={styles.benefitItem}>
              
              <p>Provide a personalized shopping experience to your audience</p>
            </div>
          </div>
        </div>

        <a href="#" className={styles.verifyLater}>
          Verify Later
        </a>
      </div>
    </main>
    </div>
    </div>
  )
}

