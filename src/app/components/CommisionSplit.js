'use client'

import { useState } from 'react'
import styles from '../CreatorAnalytics/stylesanalytics.module.css'
import BrandWiseTab from './BrandWiseTab'
import ChannelWiseTab from './ChannelWiseTab'

export default function CommissionSplit() {
  const [activeTab, setActiveTab] = useState('brand')
  
  const tabs = [
    { id: 'brand', label: 'Brand-wise' },
    { id: 'channel', label: 'Channel-wise' }
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'brand':
        return <BrandWiseTab />
      case 'channel':
        return <ChannelWiseTab />
      default:
        return null
    }
  }

  return (
    <div className={styles.containerCommission}>
      <h1 className={styles.titleCommission}>Split of Ordered Commissions</h1>
      
      <ul className={styles.tabListCommission}>
        {tabs.map(tab => (
          <li 
            key={tab.id}
            className={styles.tabItemCommission}
            data-active={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      {renderTabContent()}
    </div>
  )
}

