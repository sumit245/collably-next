'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../CreatorHome/stylescreator.module.css'
import {brandsHome} from '../utils.faker'

export default function TopBrands() {
  const [isHovered, setIsHovered] = useState(false)



  return (
    <div className={styles.topBrandsWrapper}>
      <h2 className={styles.topBrandsTitle}>Click to explore Top Brands</h2>
      
      <div 
        className={styles.topBrandsScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${styles.topBrandsTrack} ${isHovered ? styles.topBrandsPaused : ''}`}>
          {[...brandsHome, ...brandsHome].map((brand, index) => (
            <div key={`${brand.name}-${index}`} className={styles.topBrandsTile}>
              <div className={styles.topBrandsLogoWrapper}>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={40}
                  height={40}
                  className={styles.topBrandsLogo}
                />
              </div>
              <span className={styles.topBrandsName}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

