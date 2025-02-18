"use client"

import { useState, useRef, useEffect } from "react"
import Reel from "../components/Reel"
import ShareModal from "../components/ShareModal"
import styles from "./stylesfeed.module.css"
import styleshop from "../shop/StyleShop.module.css"
import Footer from "../components/FooterShop"

export default function ReelsPage() {
  const [reelsData, setReelsData] = useState([])
  const [activeReel, setActiveReel] = useState(0)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [currentShareReel, setCurrentShareReel] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    fetchReels()
  }, [])

  const fetchReels = async () => {
    try {
      const response = await fetch("/api/posts")
      const data = await response.json()
      const videoReels = data.posts.filter((post) => post.video && !post.images.length)
      setReelsData(shuffleArray(videoReels))
    } catch (error) {
      console.error("Error fetching reels:", error)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight)
      setActiveReel(index)
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLike = (reelId) => {
    // Implement like functionality
  }

  const handleComment = (reelId, comment) => {
    // Implement comment functionality
  }

  const handleShare = (reel) => {
    setCurrentShareReel(reel)
    setIsShareModalOpen(true)
  }

  const closeShareModal = () => {
    setIsShareModalOpen(false)
    setCurrentShareReel(null)
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  return (
    <div className={styleshop.bodyShop}>
      <div className={styleshop.smartphoneContainer}>
        <div ref={containerRef} className={styles.reelsContainer}>
          {reelsData.map((reel, index) => (
            <div key={reel._id} className={styles.reelWrapper}>
              <Reel
                {...reel}
                isActive={index === activeReel}
                onLike={() => handleLike(reel._id)}
                onComment={(comment) => handleComment(reel._id, comment)}
                onShare={() => handleShare(reel)}
              />
            </div>
          ))}
        </div>
        <Footer />
      </div>
      {isShareModalOpen && <ShareModal reel={currentShareReel} onClose={closeShareModal} />}
    </div>
  )
}

