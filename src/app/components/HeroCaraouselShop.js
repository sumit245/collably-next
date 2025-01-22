"use client";

import { useState, useEffect } from "react";
import VideoCarouselCard from "./Cards/VideoCard";
import styles from "../cart/styleCart.module.css";

export default function HeroCarousel() {
  const [data, setData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {

  }, []);

  return (
    <main>
      {isLoading ? (
       
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonSubtitle}></div>
          <div className={styles.skeletonVideos}>
            {Array.from({ length: 3}).map((_, index) => (
              <div key={index} className={styles.skeletonVideo}></div>
            ))}
          </div>
        </div>
      ) : (

        data ? (
          <VideoCarouselCard
            videos={data.videos}
            title={data.title}
            subtitle={data.subtitle}
          />
        ) : (
          <div className={styles.noDataContainer}>
            <p>No data available yet.</p>
          </div>
        )
      )}
    </main>
  );
}
