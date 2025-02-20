"use client";

import { useState, useEffect } from "react";
import VideoCarouselCard from "./Cards/VideoCard";
import styles from "../cart/styleCart.module.css";
import api from "../services/api"; // Assuming you have a `services/api.js` file with your API calls

const BASE_URL = "http://localhost:5000/";

export default function HeroCarousel() {
  const [data, setData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetchReels()
  }, [])

  const fetchReels = async () => {
    try {
      const response = await api.getPosts();
      console.log(response);  // Log the response to inspect its structure
      if (response && Array.isArray(response.posts)) {
        const videoReels = response.posts.filter((post) => post.video && !post.images.length);
        setData({ videos: videoReels, title: "Featured Reels", subtitle: "Check out these awesome reels!" });
      } else {
        setData(null); // Set null if data is not in expected format
      }
      setIsLoading(false); // Update loading state
    } catch (error) {
      console.error("Error fetching reels:", error);
      setIsLoading(false); // Stop loading on error
      setData(null); // Set to null in case of an error
    }
  };
  

  return (
    <main>
      {isLoading ? (
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonSubtitle}></div>
          <div className={styles.skeletonVideos}>
            {Array.from({ length: 3 }).map((_, index) => (
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
