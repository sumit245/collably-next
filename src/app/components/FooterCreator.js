"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiShoppingCart, FiBarChart2 } from 'react-icons/fi'; 
import { FaPlus } from 'react-icons/fa'; 
import { CgProfile } from "react-icons/cg";
import { FaLink } from "react-icons/fa6";
import styles from '../CreatorHome/stylescreator.module.css';

export default function Footer() {
  const pathname = usePathname(); 

  return (
    <nav className={styles.navigation}>
      <Link href="/CreatorHome" className={`${styles.navItem} ${pathname === '/CreatorHome' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
          <FiHome size={20} />
        </span>
        <span className={styles.navText}>HOME</span>
      </Link>

      <Link href="/brandpartners" className={`${styles.navItem} ${pathname === '/brandpartners' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
          <FiBarChart2 size={20} />
        </span>
        <span className={styles.navText}>BRAND PARTNERS</span>
      </Link>

      <Link href="/linkCreate" className={`${styles.navItem} ${pathname === 'linkCreate' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
        <FaLink size={20}/>
        </span>
        <span className={styles.navText}>LINK</span>
      </Link>
      <Link href="/CreatorShop" className={`${styles.navItem} ${pathname === '/CreatorShop' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
          <FiShoppingCart size={20} />
        </span>
        <span className={styles.navText}>MY SHOP</span>
      </Link>
      

      <Link href="/creatorProfile" className={`${styles.navItem} ${pathname === '/creatorFeedProfile' ? styles.active : ''}`}>
        <span className={styles.navIcon}>
          <CgProfile size={20} />
        </span>
        <span className={styles.navText}>MY PROFILE</span>
      </Link>

    </nav>
  );
}

