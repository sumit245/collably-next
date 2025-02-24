"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import styles from "../../shop/VideoCard.module.css"

const VideoCarouselCard = ({ videos, title = "Trending Today", subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (videos.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [videos.length])

  if (videos.length === 0) {
    return <div>No videos available</div>
  }

  const getVideoIndex = (index) => {
    return (index + videos.length) % videos.length
  }

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.sectionTitleHero}>{title}</h2>
      {subtitle && <h3 className={styles.subHeadingHero}>{subtitle}</h3>}
      <div className={styles.carousel}>
        {[-1, 0, 1].map((offset) => {
          const videoIndex = getVideoIndex(currentIndex + offset)
          const video = videos[videoIndex]
          return (
            <Link href={`/feed?reelId=${video.id}`} key={`${video.id}-${offset}`} className={styles.carouselItemLink}>
              <div className={`${styles.carouselItem} ${offset === 0 ? styles.active : ""}`}>
                <video src={video.src} muted loop playsInline autoPlay className={styles.carouselVideo} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default VideoCarouselCard

