"use client";

import React, { useState } from "react";
import CreatorCard from "./Cards/CreatorCard";
import styles from "../shop/StyleShop.module.css";

export default function ReelsSection() {
  const [creators, setCreators] = useState(null); // State for creators, initially null
  const sectionTitle = "Trending Creators"; // Example static title; adjust as needed

  // Conditional Rendering
  if (!creators) {
    // Skeleton Loader
    return (
      <section className={styles.creatorSection}>
        <h4 className={styles.sectionTitleShop}>{sectionTitle}</h4>
        <div className={styles.creatorScroll}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div className={styles.reel}>
            <div key={index} className={styles.skeletonCreatorCard2}></div>
            <div className={styles.skeletonText2}></div>
            </div>
          ))}
        </div>
      </section>
    );
  } else {
    // Render Creator Cards
    return (
      <section className={styles.creatorSection}>
        <h4 className={styles.sectionTitleShop}>{sectionTitle}</h4>
        <div className={styles.creatorScroll}>
          {creators.map((creator) => (
            <CreatorCard key={creator.id} {...creator} />
          ))}
        </div>
      </section>
    );
  }
}
