'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Home, Search, User } from 'lucide-react';
import styles from '../shop/StyleShop.module.css';

export default function ChooseYouSection() {
  return (
    <div className={styles.chooseContainer}>
        <div className={styles.footerContent}>
          <h1 className={styles.title}>Choose You! First</h1>
          <p className={styles.subtitle}>Curated With Love, Made in India</p>
          <div className={styles.poweredBy}>
            <span>Powered by Dash And Dots Technology</span>
            <Link href="/help" className={styles.helpLink}>
              Help Centre
            </Link>
          </div>
        </div>
    </div>
  );
}
