"use client";

import { Crown } from "lucide-react";
import React, { useState } from "react";
import styles from "../shop/StyleShop.module.css";
 
export default function TrendingUsersLeaderBoard() {
  const [users, setUsers] = useState(null); // Placeholder for data from DB

  const tabs = ["Today", "Weekly", "Monthly"];
  const [activeTab, setActiveTab] = useState("Today");

  // Conditional Rendering
  if (!users) {
    // Skeleton Loader
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

        {/* Skeleton User List */}
        <div className={styles.userList}>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className={styles.skeletonUserItem1}>
              <div className={styles.skeletonRank1}></div>
              <div className={styles.skeletonImage1}></div>
              <div className={styles.skeletonText1}></div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    // Future Condition for Showing User Data
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

        {/* Placeholder for Actual User Data */}
        <div className={styles.userList}>
          {users[activeTab].map((user) => (
            <div key={user.id} className={styles.userItem}>
              {/* Rank Badge */}
              <div
                className={`${styles.rankBadge} ${
                  user.type === "heart"
                    ? styles.rankBadgeHeart
                    : user.type === "star"
                    ? styles.rankBadgeHeart
                    : user.type === "crown"
                    ? styles.rankBadgeHeart
                    : ""
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
}
