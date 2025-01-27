"use client"; // Mark this as a client component

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use usePathname
import { FiHome, FiShoppingCart, FiBarChart2 } from 'react-icons/fi'; 
import { FaPlus } from 'react-icons/fa'; // Only import FaPlus from 'react-icons/fa'
import styles from '../CreatorHome/stylescreator.module.css';

export default function Footer() {
  const pathname = usePathname(); // Get the current path

  return (
    <nav className={styles.navigation}>
      <Link href="/CreatorHome" className={`${styles.navItem} ${pathname === '/CreatorHome' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
          <FiHome size={20} />
        </span>
        <span className={styles.navText}>HOME</span>
      </Link>

      <Link href="/CreatorShop" className={`${styles.navItem} ${pathname === '/CreatorShop' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
          <FiShoppingCart size={20} />
        </span>
        <span className={styles.navText}>MY SHOP</span>
      </Link>

      <Link href="/videoRec" className={`${styles.navItem} ${pathname === '/videoRec' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
          <FaPlus size={20} />
        </span>
        <span className={styles.navText}>CREATE</span>
      </Link>

      <Link href="/CreatorAnalytics" className={`${styles.navItem} ${pathname === '/CreatorAnalytics' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
          <FiBarChart2 size={20} />
        </span>
        <span className={styles.navText}>ANALYTICS</span>
      </Link>

      <Link href="/creatorFeedProfile" className={`${styles.navItem} ${pathname === '/creatorFeedProfile' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
          <FiShoppingCart size={20} />
        </span>
        <span className={styles.navText}> MY FEED</span>
      </Link>
    </nav>
  );
}