'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../CreatorShop/styles.creatorShop.module.css'
import { Menu, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import PostsTab from './postsTab'
import CollectionsTab from './collectionsTab'
import DraftsTab from './DraftsTab'
import SingleProductLinksTab from './singleProductTab'

export default function Shop() {
  const [activeTab, setActiveTab] = useState('posts')
  const [activeCount, setActiveCount] = useState(0)
  
  const tabs = [
    { id: 'drafts', label: 'Drafts', count: 0, disabled: true },
    { id: 'posts', label: 'Posts', count: 0 },
    { id: 'collections', label: 'Collections', count: 0 },
    { id: 'links', label: 'Single Product Links', count: 0 }
  ]

  useEffect(() => {
    const tab = tabs.find(t => t.id === activeTab)
    setActiveCount(tab?.count || 0)
  }, [activeTab])

  const handleTabClick = (tabId) => {
    if (tabId === 'drafts') return 
    setActiveTab(tabId)
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsTab />
      case 'collections':
        return <CollectionsTab />
      case 'drafts':
        return <DraftsTab />
      case 'links':
        return <SingleProductLinksTab />
      default:
        return null
    }
  }

  return (
    <div className={styles.containerShop}>
      <header className={styles.header}>
        <button className={styles.menuButton}>
          <Menu size={24} />
        </button>
        
        <div className={styles.profileSection}>
          <Image 
            src="/images/banavt1.png"
            alt="Shop profile"
            width={36}
            height={36}
            className={styles.profileImage}
          />
          
          <div className={styles.shopInfo}>
            <h1 className={styles.shopName}>My Shop</h1>
            <p className={styles.username}>dheeraj861</p>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Link href="/creatorDashboardVerify">
            <button className={styles.iconButton}>
              <Image 
                src="/images/eye-v2.svg"
                alt="View"
                width={16}
                height={16}
                className={styles.iconImage}
              />
            </button>
          </Link>

          <Link href="/creatorDashboardVerify">
            <button className={styles.iconButton}>
              <Image 
                src="/images/share-v2.svg"
                alt="Share"
                width={16}
                height={16}
                className={styles.iconImage}
              />
            </button>
          </Link>
        </div>
      </header>

      <div className={styles.filterBar}>
        <button className={styles.filterButton}>
          Sort By: Newest first
        </button>
        <button className={styles.filterButton}>
          All Filters
        </button>
        <button className={styles.filterButton}>
          All Time <ChevronDown size={16} />
        </button>
        <button className={styles.filterButton}>
          View All <ChevronDown size={16} />
        </button>
      </div>

      <ul className={styles.tabList}>
        {tabs.map(tab => (
          <li 
            key={tab.id}
            className={`${styles.tabItem} ${tab.disabled ? styles.tabDisabled : ''}`}
            data-active={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && tab.count > 0 && (
              <span className={styles.tabCounter}>({tab.count})</span>
            )}
          </li>
        ))}
      </ul>

      {renderTabContent()}
    </div>
  )
}

