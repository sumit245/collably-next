"use client";
import React, { useEffect, useState } from "react";
import styles from "../brand/rotate.module.css";

// Replace the existing placeholder URLs with a dummy image URL
const images = [
  "/images/image1.webp",
  "/images/image21.webp",
  "/images/image23.webp",
  "/images/image1.webp",
  "/images/image1.webp",
];

const RotatingScreens = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Rotate every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carouselWrapper}>
      <div
        className={styles.carousel}
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.card}
            style={{
              transform: `rotateY(${currentImageIndex * 360 / images.length}deg)`,
            }}
          >
            <img src={image} alt={`Placeholder ${index + 1}`} className={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotatingScreens;
