'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'
import styles from '../CreatorHome/stylescreator.module.css'

export default function SaleCalendar() {
  const [showAllSales, setShowAllSales] = useState(false)

  const sales = [
   
    {
      brand: 'Ajio',
      logo: '/images/ajio-icon.jpg',
      title: 'Giant Fashion Sale',
      date: 'Ends on 12 Jan'
    },
    {
      brand: 'H&M',
      logo: '/images/hm_icon.png',
      title: 'Winter Sale: Upto 70% off',
      date: 'Ends on 19 Jan'
    },
    {
      brand: 'Myntra',
      logo: '/images/myntra_icon.png',
      title: 'Right to Fashion Sale',
      subtitle: 'Myntra - Fashion Shopping App',
      date: '15 Jan - 21 Jan'
    },
    {
      brand: 'NykaaFashion',
      logo: '/images/nykaa_icon.png',
      title: 'EOSS: Upto 75% off',
      date: 'Live now'
    }
  ]

  const displayedSales = showAllSales ? sales : [sales[0]]

  return (
   
    <div className={styles.saleCalendarWrapper}>
       
      <div className={styles.saleCalendarHeader}>
        <div className={styles.saleCalendarTitleGroup}>
          <h2 className={styles.saleCalendarTitle}>SALE CALENDAR</h2>
          <div className={styles.saleCalendarSubtitle}>
            <Info size={16} />
            <span>Make the best out of festive carnival</span>
          </div>
        </div>
        <div className={styles.saleCalendarNavigation}>
        
             <button 
            className={`${styles.saleCalendarNavButton} ${showAllSales ? styles.saleCalendarNavDisabled : ''}`}
            onClick={() => setShowAllSales(true)}
            disabled={showAllSales}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className={`${styles.saleCalendarNavButton} ${!showAllSales ? styles.saleCalendarNavDisabled : ''}`}
            onClick={() => setShowAllSales(false)}
            disabled={!showAllSales}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.saleCalendarContent}>
        <div className={styles.saleCalendarGrid}>
          <div className={styles.saleCalendarLabels}>
            <span>Brand Name</span>
            <span>Sale Dates</span>
          </div>
          {displayedSales.map((sale, index) => (
            <div key={`${sale.brand}-${index}`} className={styles.saleCalendarCard}>
              <div className={styles.saleCalendarBrandInfo}>
                <div className={styles.saleCalendarLogoWrapper}>
                  <Image
                    src={sale.logo}
                    alt={sale.brand}
                    width={40}
                    height={40}
                    className={styles.saleCalendarLogo}
                  />
                </div>
                <div className={styles.saleCalendarBrandDetails}>
                  <h3 className={styles.saleCalendarSaleTitle}>{sale.title}</h3>
                  {sale.subtitle && (
                    <p className={styles.saleCalendarBrandSubtitle}>{sale.subtitle}</p>
                  )}
                  <p className={styles.saleCalendarBrandName}>{sale.brand}</p>
                </div>
              </div>
              <div className={styles.saleCalendarDate}>
                {sale.date}
              </div>
            </div>
           
          ))}
        </div>
      </div>
    </div>
   
  )
}

