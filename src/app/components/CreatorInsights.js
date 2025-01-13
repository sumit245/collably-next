'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../CreatorAnalytics/stylesanalytics.module.css'
import { ArrowUpDown, SlidersHorizontal } from 'lucide-react'
import PostsTab from './postsTab'
import CollectionsTab from './collectionsTab'
import SingleProductLinksTab from './singleProductTab'

export default function ContentAnalytics() {
  const [activeTab, setActiveTab] = useState('posts')
  const [activeCount, setActiveCount] = useState(0)
  
  const tabs = [
    { id: 'posts', label: 'Posts', count: 0 },
    { id: 'collections', label: 'Collections', count: 0 },
    { id: 'links', label: 'Single Products', count: 0 }
  ]

  useEffect(() => {
    const tab = tabs.find(t => t.id === activeTab)
    setActiveCount(tab?.count || 0)
  }, [activeTab])

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsTab />
      case 'collections':
        return <CollectionsTab />
      case 'links':
        return <SingleProductLinksTab />
      default:
        return null
    }
  }

  return (
    <div className={styles.containerInsights}>
      <div className={styles.headerInsights}>
        <h1 className={styles.titleInsights}>Content Analytics</h1>
        <div className={styles.actionButtonsInsights}>
          <button className={styles.filterButtonInsights}>
            <ArrowUpDown size={16} />
            Sort
          </button>
          <button className={styles.filterButtonInsights}>
            <SlidersHorizontal size={16} />
            Filter
          </button>
        </div>
      </div>

      <ul className={styles.tabListInsights}>
        {tabs.map(tab => (
          <li 
            key={tab.id}
            className={styles.tabItemInsights}
            data-active={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && tab.count > 0 && (
              <span className={styles.tabCounterInsights}>({tab.count})</span>
            )}
          </li>
        ))}
      </ul>

      {renderTabContent()}
    </div>
  )
}

