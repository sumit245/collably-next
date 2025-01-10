'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import styles from '../shop/StyleShop.module.css';
import { LikeContext } from '../actions/LikeContext'; 

export default function Header() {
  const { likeCount, cartCount } = useContext(LikeContext); // Accessing like count

  return (
    <header className={styles.header}>
      <button className={styles.menuBtn}>
        <Link href="/">
          <Image src="/images/hamburger.svg" alt="Menu" width={24} height={24} />
        </Link>
      </button>
      <div className={styles.logo}>
        <Link href="/shop">
          <Image src="/images/c-official-logo.png" alt="logo" width={90} height={40} />
        </Link>
      </div>
      <div className={styles.headerIconsShop}>
        <button className={styles.iconBtnShop}>
          <Image src="images/search-blue.svg" alt="Search" width={24} height={24} />
        </button>
        <button className={styles.iconBtnShop}>
        <Link href="/product">
          <Image src="images/wishlist-blue.svg" alt="Wishlist" width={24} height={24} />
          </Link>
          <span className={styles.counter}>{likeCount}</span>
        </button>
        <button className={styles.iconBtnShop}>
          <Link href="/cart">
            <Image src="images/cart-blue.svg" alt="Cart" width={24} height={24} />
          </Link>
          <span className={styles.counter}>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}