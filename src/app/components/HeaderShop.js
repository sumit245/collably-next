'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <button className={styles.menuBtn}>
        <Image src="/images/hamburger.svg" alt="Menu" width={24} height={24} />
      </button>
      <div className={styles.logo}>
        <Link href="/">Collably</Link>
      </div>
      <div className={styles.headerIconsShop}>
        <button className={styles.iconBtnShop}>
          <Image src="images/search-blue.svg" alt="Search" width={24} height={24} />
        </button>
        <button className={styles.iconBtnShop}>
          <Image src="images/wishlist-blue.svg" alt="Wishlist" width={24} height={24} />
          <span className={styles.counter}>0</span>
        </button>
        <button className={styles.iconBtnShop}>
          <Image src="images/cart-blue.svg" alt="Cart" width={24} height={24} />
          <span className={styles.counter}>0</span>
        </button>
      </div>
    </header>
  )
}

