"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import Reel from "../components/Reel"
import ShareModal from "../components/ShareModal"
import Footer from "../components/FooterShop"
import api from "../services/api"
import styles from "./stylesfeed.module.css"
import styleshop from "../shop/StyleShop.module.css"
import { BASE_URL } from "../services/api";

export default function ReelsPage() {
  const [reelsData, setReelsData] = useState([])
  const [activeReel, setActiveReel] = useState(0)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [currentShareReel, setCurrentShareReel] = useState(null)
  const containerRef = useRef(null)
  const currentUserId = useSelector((state) => state.auth.user?._id)
  const currentUser = useSelector((state) => state.auth.user)

  useEffect(() => {
    fetchReels()
    const handleScroll = () => setActiveReel(Math.round(containerRef.current.scrollTop / window.innerHeight))
    containerRef.current?.addEventListener("scroll", handleScroll, { passive: true })
    return () => containerRef.current?.removeEventListener("scroll", handleScroll)
  }, [])

  const fetchReels = async () => {
    try {
      const { posts } = await api.getPosts()
      if (Array.isArray(posts)) {
        setReelsData(
          shuffleArray(
            posts
              .filter((post) => post.video && !post.images.length)
              .map((reel) => ({
                ...reel,
                isLiked: (reel.likes || []).some((like) => like._id === currentUserId),
                isSaved: currentUser?.saved?.includes(reel._id),
              })),
          ),
        )
      }
    } catch (error) {
      console.error("Error fetching reels:", error)
    }
  }

  const updateReel = async (reelId, action, apiCall) => {
    try {
      await apiCall(reelId)
      setReelsData((prevReels) => prevReels.map((reel) => (reel._id === reelId ? { ...reel, ...action(reel) } : reel)))
    } catch (error) {
      console.error(`Error updating reel:`, error)
    }
  }

  const handleLike = (reelId) =>
    updateReel(reelId, (reel) => ({ isLiked: true, likes: [...reel.likes, currentUserId] }), api.likePost)
  const handleUnlike = (reelId) =>
    updateReel(
      reelId,
      (reel) => ({ isLiked: false, likes: reel.likes.filter((id) => id !== currentUserId) }),
      api.unlikePost,
    )
  const handleSave = (reelId) => updateReel(reelId, () => ({ isSaved: true }), api.savePost)
  const handleUnsave = (reelId) => updateReel(reelId, () => ({ isSaved: false }), api.unsavePost)

  const handleComment = async (reelId, comment) => {
    try {
      const updatedPost = await api.commentOnPost(reelId, comment)
      setReelsData((prevReels) =>
        prevReels.map((reel) => (reel._id === reelId ? { ...reel, comments: updatedPost.comments } : reel)),
      )
    } catch (error) {
      console.error("Error commenting on post:", error)
    }
  }

  const handleShare = (reel) => {
    setCurrentShareReel(reel)
    setIsShareModalOpen(true)
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
                onUnlike={() => handleUnlike(reel._id)}
                onComment={(comment) => handleComment(reel._id, comment)}
                onShare={() => handleShare(reel)}
                onSave={() => handleSave(reel._id)}
                onUnsave={() => handleUnsave(reel._id)}
                src={`${BASE_URL}${reel.video?.replace(/\\/g, "/")}`}
                currentUserId={currentUserId}
              />
            </div>
          ))}
        </div>
        <Footer />
      </div>
      {isShareModalOpen && <ShareModal reel={currentShareReel} onClose={() => setIsShareModalOpen(false)} />}
    </div>
  )
}

