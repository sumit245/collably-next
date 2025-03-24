"use client";

import { useState, useEffect } from "react";
import styles from "../../shop/StyleShop.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const VideoCarouselCard = ({ videos = [], title = "Trending Today", subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (videos.length > 0) {
      setIsLoading(false);
    }
  }, [videos]);

  useEffect(() => {
    if (videos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length]);

  const getVideoIndex = (index) => {
    if (videos.length === 1) return 0; // Single video case
    return (index + videos.length) % videos.length; // Ensure cyclic index
  };

  if (isLoading || !videos.length) {
    return <div>No Videos Found</div>;
  }

  const handleVideoClick = (videoId) => {
    if (videoId) {
      router.push(`/feed/${videoId}`); // Updated to use path parameter instead of query
    }
  };

  // If there's only one video, render it without carousel structure
  if (videos.length === 1) {
    const video = videos[0];
    return (
      <div className={styles.carouselContainer}>
        <h2 className={styles.sectionTitleHero}>{title}</h2>
        {subtitle && <h3 className={styles.subHeadingHero}>{subtitle}</h3>}
        <div className={styles.carousel}>
          <div className={`${styles.carouselItem} ${styles.active}`}>
            <Link href={`/feed/${video.id}`} passHref>
              <video src={video.src} poster={video.poster} muted loop playsInline autoPlay />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Regular carousel for multiple videos
  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.sectionTitleHero}>{title}</h2>
      {subtitle && <h3 className={styles.subHeadingHero}>{subtitle}</h3>}
      <div className={styles.carousel}>
        {[-1, 0, 1].map((offset) => {
          const videoIndex = getVideoIndex(currentIndex + offset);
          const video = videos[videoIndex];
          const uniqueKey = `${videoIndex}-${video.id ?? videoIndex}`; // Use backticks here

          return (
            <div
              key={uniqueKey}
              className={`${styles.carouselItem} ${offset === 0 ? styles.active : ""} ${
                offset === -1 ? styles.prev : offset === 1 ? styles.next : ""
              }`}
            >
              <Link href={`/feed/${video.id}`} passHref>
                <video src={video.src} poster={video.poster} muted loop playsInline autoPlay />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoCarouselCard;
