"use client";

import React, { useState } from "react";
import styles from "../search/stylesSearch.module.css";
import Header from "../components/HeaderShop";
import Footer from "../components/FooterShop";
import { LikeProvider } from "../actions/LikeContext";
import Image from 'next/image'

function SearchSection() {
  const [activeTab, setActiveTab] = useState("reels");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "reels", label: "Reels" },
    { id: "collections", label: "Collections" },
    { id: "posts", label: "Posts" },
    { id: "videos", label: "Videos" },
  ];

  const images = [
    { id: 1, height: 300 },
    { id: 2, height: 400 },
    { id: 3, height: 250 },
    { id: 4, height: 350 },
    { id: 5, height: 450 },
    { id: 6, height: 300 },
    { id: 7, height: 400 },
    { id: 8, height: 250 },
    { id: 9, height: 350 }
  ]

  const categories = [
    "All Categories",
    "Fashion",
    "Electronics",
    "Home",
    "Beauty",
  ];

  const genders = ["All", "Men", "Women", "Unisex"];

  return (
    <LikeProvider>
      <div className={styles.container}>
        <Header />
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <div style={{ position: "relative" }}>
            <div className={styles.searchIcon}>
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for products, reels & creators"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersContainer}>
          <button className={styles.filterButton}>
            <svg
              width="14"
              height="14"
              className={styles.navIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            Sort By
          </button>

          <button className={styles.filterButton}>All Filters</button>

          <select className={styles.filterSelect}>
            <option value="">Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>

          <select className={styles.filterSelect}>
            <option value="">Gender</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender.toLowerCase()}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          <div className={styles.gridContainer}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className={styles.gridItem}>
                <img
                  src={`https://picsum.photos/300/300?random=${i}`}
                  alt={`Content thumbnail ${i + 1}`}
                  className={styles.gridImage}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          {/* Bottom navigation buttons are commented out as per the last edit */}
        </div>
        <Footer />
      </div>
    </LikeProvider>
  );
}

export default SearchSection;
