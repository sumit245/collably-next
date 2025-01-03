'use client';

import { useEffect, useRef } from 'react';
import styles from '../../shop/StyleShop.module.css';

function VideoCarouselCard({ videos, title = "Scroll and Shop", subtitle = "From Your ❤ Creators & Brands" }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const slides = carousel.querySelectorAll(`.${styles.videoSlide}`);
    if (slides.length === 0) return; 

    let currentIndex = 0;

    const firstClone = slides[0]?.cloneNode(true);
    const lastClone = slides[slides.length - 1]?.cloneNode(true);

    if (firstClone) carousel.appendChild(firstClone);
    if (lastClone) carousel.insertBefore(lastClone, slides[0]);

    const totalSlides = slides.length + (firstClone ? 1 : 0) + (lastClone ? 1 : 0);
    carousel.style.transform = `translateX(-${100 / totalSlides}%)`;

    function nextSlide() {
      currentIndex++;
      carousel.style.transition = 'transform 0.5s ease';
      carousel.style.transform = `translateX(-${(currentIndex + 1) * 100 / totalSlides}%)`;

      if (currentIndex === slides.length) {
        setTimeout(() => {
          carousel.style.transition = 'none';
          currentIndex = 0;
          carousel.style.transform = `translateX(-${100 / totalSlides}%)`;
        }, 500);
      }
    }

    slides.forEach(slide => {
      const video = slide.querySelector('video');
      if (video) video.play();
    });

    const interval = setInterval(nextSlide, 2000);

    return () => clearInterval(interval);
  }, [videos]);

  return (
    <div className={styles.carouselContainer}>
      <h4 className={styles.sectionTitleHero}>{title}</h4>
      <h5 className={styles.subHeadingHero}>{subtitle}</h5>
      <div className={styles.carousel} ref={carouselRef}>
        {videos.map((video, index) => (
          <div key={index} className={styles.videoSlide}>
            <video src={video.src} muted loop></video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoCarouselCard;

