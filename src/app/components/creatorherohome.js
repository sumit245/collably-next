"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../CreatorHome/hero.module.css";

export default function BannerCarousel({ banners = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef(null);
  const timeoutDuration = 3000;

  const totalSlides = banners.length;

  useEffect(() => {
    if (totalSlides === 0) return;

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    autoPlayRef.current = setTimeout(nextSlide, timeoutDuration);

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, totalSlides]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  const getImageUrl = (banner) => {
    return banner.imageUrl || `/placeholder.svg?height=300&width=600&text=${encodeURIComponent(banner.altText)}`;
  };

  if (banners.length === 0) {
    return <div>No banners available</div>;
  }

  return (
    <div className={styles.profitTrackerContainer}>
      <div className={styles.bannerCarousel}>
        <div className={styles.bannerSlides}>
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`${styles.bannerSlide} ${index === currentSlide ? styles.active : ""}`}
              style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
            >
              <Image
                src={getImageUrl(banner)}
                alt={banner.altText}
                width={600}
                height={500}
                className={styles.bannerImage}
                priority={index === currentSlide}
              />
            </div>
          ))}
        </div>

        <div className={styles.carouselDots}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselDot} ${index === currentSlide ? styles.active : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

