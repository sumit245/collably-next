'use client';

import React, { useState, useEffect } from 'react';
import styles from '../../shop/StyleShop.module.css';


const VideoCarouselCard = ({ videos, title = "Trending Today", subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [creators, setCreators] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000); 

    return () => clearInterval(interval);

  }, [videos.length]);

  const getVideoIndex = (index) => {
    if (index < 0) return videos.length - 1;
    if (index >= videos.length) return 0;
    return index;
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.sectionTitleHero}>{title}</h2>
      {subtitle && <h3 className={styles.subHeadingHero}>{subtitle}</h3>}
      <div className={styles.carousel}>
        {[-1, 0, 1].map((offset) => {
          const videoIndex = getVideoIndex(currentIndex + offset);
          return (
            <div
              key={videoIndex}
              className={`${styles.carouselItem} ${offset === 0 ? styles.active : ''} ${
                offset === -1 ? styles.prev : offset === 1 ? styles.next : ''
              }`}
            >
              <video
                src={videos[videoIndex].src}
                poster={videos[videoIndex].poster}
                muted
                loop
                playsInline
                autoPlay
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoCarouselCard;