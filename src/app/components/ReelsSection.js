"use client";

import { useState, useEffect } from "react";
import CreatorCard from "./Cards/CreatorCard";
import styles from "../shop/StyleShop.module.css";

export default function ReelsSection({ sectionTitle }) {
  const [creators, setcreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setcreators([]);
        setIsLoading(false);
      }, 2000);
    };
    fetchData();
  }, []);

  return (
    <section className={styles.creatorSection}>
      <h4 className={styles.sectionTitleShop}>{sectionTitle}</h4>

      {creators.length < 1 ? (
        <div className={styles.fImg}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles}>
              <div className={styles.skeletonImage2}></div>
              <div className={styles.skeletonText}></div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.creatorScroll}>
          {creators.map((creator) => (
            <CreatorCard key={creator.id} {...creator} />
          ))}
        </div>
      )}
    </section>
  );
}
