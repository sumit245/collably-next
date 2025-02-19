"use client"

import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Reel from "../components/Reel"
import ShareModal from "../components/ShareModal"
import styles from "./stylesfeed.module.css"
import styleshop from "../shop/StyleShop.module.css"
import Footer from "../components/FooterShop"
import { fetchPosts, likePost, unlikePost, commentOnPost, savePost, unsavePost } from "../store/postSlice"

const BASE_URL = "http://localhost:5000/"

const changeEscapeChar = (path) => {
  if (!path) return "" // Ensure path is not undefined
  return path.replace(/\\/g, "/")
}

export default function ReelsPage() {
  const dispatch = useDispatch()
  const { posts, status, error } = useSelector((state) => state.posts)
  const [activeReel, setActiveReel] = useState(0)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [currentShareReel, setCurrentShareReel] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

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
    dispatch(likePost(reelId))
  }

  const handleUnlike = async (reelId) => {
    dispatch(unlikePost(reelId))
  }

  const handleComment = async (reelId, comment) => {
    dispatch(commentOnPost({ postId: reelId, comment }))
  }

  const handleSave = async (reelId) => {
    dispatch(savePost(reelId))
  }

  const handleUnsave = async (reelId) => {
    dispatch(unsavePost(reelId))
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

  const videoReels = posts.filter((post) => post.video && !post.images.length)
  const shuffledReels = shuffleArray([...videoReels])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }

  return (
    <div className={styleshop.bodyShop}>
      <div className={styleshop.smartphoneContainer}>
        <div ref={containerRef} className={styles.reelsContainer}>
          {shuffledReels.map((reel, index) => (
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
                src={`${BASE_URL}${changeEscapeChar(reel.video[0])}`}
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