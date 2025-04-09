"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../CreatorHome/hero.module.css";

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 8;
  const autoPlayRef = useRef(null);
  const timeoutDuration = 3000; 
  const banners = [
    {
      id: 0,
      imageUrl: "/images/bannercreator.jpg",
      altText: "Myntra 50-90% Off across top brands",
    
    },
    {
      id: 1,
      imageUrl: "/images/bannercreator2.jpg",
      altText: "Amazon Great Indian Sale",
    },
    {
      id: 2,
      imageUrl: "/images/bannercreator3.jpg",
      altText: "Flipkart Big Billion Days",
    },
    {
      id: 3,
      imageUrl: "/images/bannercreator.jpg",
      altText: "Ajio Fashion Sale",
    },
    {
      id: 4,
      imageUrl: "/images/bannercreator2.jpg",
      altText: "Nykaa Beauty Sale",
    },
    {
      id: 5,
      imageUrl: "/images/bannercreator3.jpg",
      altText: "Tata CLiQ Luxury Sale",
    },
    {
      id: 6,
      imageUrl: "/images/bannercreator.jpg",
      altText: "Reliance Digital Electronics Sale",
    },
    {
      id: 7,
      imageUrl: "/images/bannercreator2.jpg",
      altText: "Shoppers Stop Fashion Sale",
    }
  ];

  const getImageUrl = (banner) => {
    return banner.imageUrl || `/placeholder.svg?height=300&width=600&text=${encodeURIComponent(banner.altText)}`;
  };

  useEffect(() => {
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
                src={getImageUrl(banner) || "/placeholder.svg"}
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
