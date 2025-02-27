"use client"

import { useState, useRef, useEffect } from "react"
import Reel from "../components/Reel"
import ShareModal from "../components/ShareModal"
import styles from "./stylesfeed.module.css"
import styleshop from "../shop/StyleShop.module.css"
import Footer from "../components/FooterShop"
import api from "../services/api"

const BASE_URL = "http://localhost:5000/"

const changeEscapeChar = (path) => {
  if (!path) return "" // Ensure path is not undefined
  return path.replace(/\\/g, "/")
}

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
      const data = await api.getPosts()
      console.log("Fetched data:", data)

      if (data && Array.isArray(data.posts)) {
        const videoReels = data.posts.filter((post) => post.video && !post.images.length)
        setReelsData(shuffleArray(videoReels))
      } else {
        console.error("Invalid response format or no posts found.")
      }
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

  const handleLike = async (reelId) => {
    try {
      await api.likePost(reelId)
      updateReelLikes(reelId, true)
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const handleUnlike = async (reelId) => {
    try {
      await api.unlikePost(reelId)
      updateReelLikes(reelId, false)
    } catch (error) {
      console.error("Error unliking post:", error)
    }
  }

  const updateReelLikes = (reelId, isLiking) => {
    setReelsData((prevReels) =>
      prevReels.map((reel) =>
        reel._id === reelId
          ? {
              ...reel,
              likes: isLiking ? [...reel.likes, "currentUserId"] : reel.likes.filter((id) => id !== "currentUserId"),
            }
          : reel,
      ),
    )
  }

  const handleComment = async (reelId, comment) => {
    try {
      const updatedPost = await api.commentOnPost(reelId, comment)
      updateReelComments(reelId, updatedPost.comments)
    } catch (error) {
      console.error("Error commenting on post:", error)
    }
  }

  const updateReelComments = (reelId, newComments) => {
    setReelsData((prevReels) =>
      prevReels.map((reel) => (reel._id === reelId ? { ...reel, comments: newComments } : reel)),
    )
  }

  const handleSave = async (reelId) => {
    try {
      
      await api.savePost(reelId)
      updateReelSaveStatus(reelId, true)
    } catch (error) {
      console.error("Error saving post:", error)
    }
  }

  const handleUnsave = async (reelId) => {
    try {
      await api.unsavePost(reelId)
      updateReelSaveStatus(reelId, false)
    } catch (error) {
      console.error("Error unsaving post:", error)
    }
  }

  const updateReelSaveStatus = (reelId, isSaving) => {
    setReelsData((prevReels) => prevReels.map((reel) => (reel._id === reelId ? { ...reel, isSaved: isSaving } : reel)))
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
  console.log(reelsData)
  {reelsData.map((reel, index) => ( console.log(reel.video)))}

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
                onUnlike={() => handleUnlike(reel._id)}
                onComment={(comment) => handleComment(reel._id, comment)}
                onShare={() => handleShare(reel)}
                onSave={() => handleSave(reel._id)}
                onUnsave={() => handleUnsave(reel._id)}
                src={`${BASE_URL}${changeEscapeChar(reel.video)}`}
                video={reel.video}
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
