import Link from 'next/link';
import { FiHome, FiShoppingCart, FiBarChart2 } from 'react-icons/fi'; 
import styles from '../CreatorHome/stylescreator.module.css';

export default function Footer() {
  return (
    <nav className={styles.navigation}>
      <Link href="#" className={`${styles.navItem} ${styles.active}`}>
        <span className={styles.navIcon}>
          <FiHome size={20} />
        </span>
        <span className={styles.navText}>HOME</span>
      </Link>
      <Link href="#" className={styles.navItem}>
        <span className={styles.navIcon}>
          <FiShoppingCart size={20} />
        </span>
        <span className={styles.navText}>MY SHOP</span>
      </Link>
      <Link href="/admin" className={styles.navItem}>
        <span className={styles.navIcon}>
          <FiBarChart2 size={20} />
        </span>
        <span className={styles.navText}>ANALYTICS</span>
      </Link>
    </nav>
  );
}
