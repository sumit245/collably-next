'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import stylesShop from '../shop/StyleShop.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Collably</h1>
        
        <div className={styles.content}>
          <h2 className={styles.title}>250+ BRANDS</h2>
          <p className={styles.subtitle}>EXCLUSIVELY ON Collably</p>
          
          <div className={styles.brandCircleWrapper}>
            <Image
              src="/images/creator-entry.webp" 
              alt="Brand Logos"
              width={240}
              height={240}
              className={styles.brandCircleImage}
            />
          </div>

          <Link href="/creatorDashboardVerify"> <button className={styles.button}>Get Started</button></Link>
        </div>
      </div>
    </main>
    </div>
    </div>
  )
}

