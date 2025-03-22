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
          <p className={styles.subtitle}>India ka apna Social Commerce Platform</p>
          
          <div className={styles.brandCircleWrapper}>
            <Image
              src="/images/creator-entry-vector.jpg" 
              alt="Brand Logos"
              width={240}
              height={240}
              className={styles.brandCircleImage}
            />
          </div>
          <p className={styles.subtitle}>Make your content shoppable <br/> with product links</p>
          
          <Link href="/creatorDashboardVerify"> <button className={styles.button}>Get Started</button></Link>
        </div>
      </div>
    </main>
    </div>
    </div>
  )
}