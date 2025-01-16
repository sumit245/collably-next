'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Rss, ShoppingBag, Search, User } from 'lucide-react'
import styles from '../shop/StyleShop.module.css'

const navItems = [
  { name: 'Home', href: '/shop', icon: Home },
  { name: 'Feed', href: '/feed', icon: Rss },
  { name: 'My Items', href: '/login', icon: ShoppingBag },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Me', href: '/login', icon: User },
]

export default function FooterShop() {
  const pathname = usePathname()

  return (
    
    <footer className={styles.bottomNavShop}>
      {navItems.map((item) => (
        <Link 
          key={item.name}
          href={item.href} 
          className={`${styles.navItemShop} ${
            pathname === item.href ? styles.activeShop : ''
          }`}
        >
          <item.icon className={styles.icon} />
          <span>{item.name}</span>
        </Link>
      ))}
    </footer>

  )
}

