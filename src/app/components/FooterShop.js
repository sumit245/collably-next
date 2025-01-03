import Link from 'next/link'
import Image from 'next/image'
import styles from '../shop/StyleShop.module.css'

export default function Footer() {
  return (
    <footer>
      <nav className={styles.bottomNavShop}>
        <Link href="/shop" className={styles.navItemShop}>
          <Image src="/images/new-nav-icon-home-active.svg" alt="Home" width={24} height={24} />
          <span>Home</span>
        </Link>
        <Link href="/feed" className={styles.navItemShop}>
          <Image src="/images/new-nav-icon-feed-inactive.svg" alt="Feed" width={24} height={24} />
          <span>Feed</span>
        </Link>
        <Link href="/login" className={styles.navItemShop}>
          <Image src="/images/new-nav-icon-item-inactive.svg" alt="My Items" width={24} height={24} />
          <span>My Items</span>
        </Link>
        <Link href="/login" className={styles.navItemShop}>
          <Image src="/images/new-nav-icon-me-inactive.svg" alt="Me" width={24} height={24} />
          <span>Me</span>
        </Link>
      </nav>
    </footer>
  )
}

