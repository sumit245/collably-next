'use client'

import { Crown } from 'lucide-react'
import React, { useState } from "react"
import styles from '../shop/StyleShop.module.css';

export default function TrendingUsers() {
  const [activeTab, setActiveTab] = useState('Today');

  const users = {
    Today: [
      { id: 1, name: 'Arya', rank: 1, type: 'heart', image: 'images/image24.webp' },
      { id: 2, name: 'Avi', rank: 2, type: 'heart', image: 'images/image25.jpeg' },
      { id: 3, name: 'Nya', rank: 1, type: 'heart', image: 'images/image26.webp' },
      { id: 4, name: 'Leo', rank: 2, type: 'star', image: 'images/image27.webp' },
    ],
    Weekly: [
      { id: 3, name: 'Nya', rank: 1, type: 'heart', image: 'images/image26.webp' },
      { id: 4, name: 'Leo', rank: 2, type: 'star', image: 'images/image27.webp' },
    ],
    Monthly: [
      { id: 5, name: 'Sam', rank: 1, type: 'crown', image: 'images/image28.webp' },
      { id: 6, name: 'Olivia', rank: 2, type: 'heart', image: 'images/image29.webp' },
    ]
  };

  const tabs = ['Today', 'Weekly', 'Monthly'];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header2}>
        <Crown className={styles.crown} />
        <h2 className={styles.title}>WHO'S TRENDING?</h2>
      </div>

      {/* Tabs */}
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tab} ${
              activeTab === tab ? styles.tabActive : styles.tabInactive
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* User List */}
      <div className={styles.userList}>
        {users[activeTab].map((user) => (
          <div key={user.id} className={styles.userItem}>
            {/* Rank Badge */}
            <div
              className={`${styles.rankBadge} ${
                user.type === 'heart'
                  ? styles.rankBadgeHeart
                  : user.type === 'star'
                  ? styles.rankBadgeHeart
                  : user.type === 'crown'
                  ? styles.rankBadgeHeart
                  : ''
              }`}
            >
              {user.rank}
            </div>

            {/* Profile Picture */}
            <div className={styles.profilePic}>
              <img
                src={user.image}
                alt={`${user.name}'s profile`}
                className={styles.profileImage}
              />
            </div>

            {/* User Name */}
            <span className={styles.userName}>{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

