"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from "../services/api"
import { trackReferralClick } from "../store/brandSlice"
import styles from "../feed/reel.module.css"
import CommentSection from "./commentSection"
import Image from "next/image"
import Link from "next/link"

export default function Reel({
  _id,
  video,
  images,
  productTitle,
  productImage,
  productUrl,
  productPrice,
  user,
  caption,
  likes = [],
  comments,
  onLike,
  onUnlike,
  onShare,
  onSave,
  onUnsave,
  isSaved: propIsSaved,
  isLiked: propIsLiked,
  currentUserId,
  isActive,
  isLoggedIn,
  onLoginRequired,
}) {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id) || currentUserId
  const currentUser = useSelector((state) => state.auth.user)
  const [isFollowing, setIsFollowing] = useState(user?.followers?.includes(userId))
  const [isCommenting, setIsCommenting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)

  const commentSectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    setIsLiked(propIsLiked || likes.includes(userId))
    setIsSaved(propIsSaved || currentUser?.saved?.includes(_id))
  }, [propIsLiked, propIsSaved, likes, userId, _id, currentUser?.saved])

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      if (!isPaused) {
        videoRef.current.play().catch((err) => console.error("Error playing video:", err))
      }
      videoRef.current.muted = false
    } else {
      videoRef.current.pause()
      videoRef.current.muted = true
      videoRef.current.currentTime = 0
    }
  }, [isActive, isPaused])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (commentSectionRef.current && !commentSectionRef.current.contains(e.target)) {
        setIsCommenting(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleFollowToggle = async () => {
    if (!isLoggedIn) {
      onLoginRequired()
      return
    }

    try {
      await (isFollowing ? api.unfollowUser(user._id) : api.followUser(user._id))
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error("Follow toggle error:", error)
    }
  }

  const handleCaptionClick = async (e) => {
    e.preventDefault()
    const referralCode = caption?.match(/referralCode=([A-Za-z0-9]{6})/)?.[1]
    if (referralCode) {
      try {
        await dispatch(trackReferralClick(referralCode)).unwrap()
      } catch (error) {
        console.error("Tracking failed:", error)
      }
    }
    window.location.href = caption
  }

  const handleLikeAction = () => {
    if (!isLoggedIn) {
      onLoginRequired()
      return
    }

    isLiked ? onUnlike(_id) : onLike(_id)
    setIsLiked(!isLiked)
  }

  const handleSaveAction = () => {
    if (!isLoggedIn) {
      onLoginRequired()
      return
    }

    isSaved ? onUnsave(_id) : onSave(_id)
    setIsSaved(!isSaved)
  }

  const handleCommentAction = () => {
    if (!isLoggedIn) {
      onLoginRequired()
      return
    }

    setIsCommenting(!isCommenting)
  }

  const handleVideoClick = () => {
    if (!videoRef.current) return

    if (isPaused) {
      videoRef.current.play().catch((err) => console.error("Error playing video:", err))
    } else {
      videoRef.current.pause()
    }

    setIsPaused(!isPaused)
  }

  return (
    <div className={styles.reelContainer}>
      <div className={styles.videoContainer}>
        {video ? (
          <>
            <video ref={videoRef} className={styles.video} loop playsInline onClick={handleVideoClick} controls={false}>
              <source src={video} type="video/mp4" />
            </video>
            {isPaused && (
              <div className={styles.playIconOverlay} onClick={handleVideoClick}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </>
        ) : images?.[0] ? (
          <Image
            src={images[0]?.[0] || "/placeholder.svg"}
            alt="Post"
            fill
            className={styles.image}
            objectFit="cover"
          />
        ) : (
          <Image src="/placeholder.svg" alt="Placeholder" fill objectFit="cover" />
        )}
      </div>

      <div className={styles.actions}>
        {/* Like, Share, Save Buttons */}
        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={handleLikeAction}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isLiked ? "red" : "none"}
              stroke={isLiked ? "red" : "white"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className={styles.actionCount}>{likes.length}</span>
          </button>
        </div>

        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={() => onShare({ _id, user, caption })}>
            {/* Share Icon */}
            <svg width="24" height="24" viewBox="0 0 512 512" fill="white">
              <path d="M501.8 213.4L324.9 36.5V142.9h-59.9c-140.7 0-254.8 114.1-254.8 254.8v77.8l93-101.7c52.4-57.3 126.5-90 204.1-90h17.6v106.5L501.8 213.4z" />
            </svg>
          </button>
        </div>

        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={handleSaveAction}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "white" : "none"} stroke="white">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.userProfile}>
        <div className={styles.profileContainer}>
          <Link href={`/creator/${user?._id}`}>
            <img src={user?.avatar || "/placeholder.svg"} alt={user?.fullname} className={styles.profileImage} />
          </Link>
          <div className={styles.profileInfo}>
            <Link href={`/creator/${user?._id}`} className={styles.profileName}>{user?.fullname}</Link>
            {userId !== user?._id && (
              <button className={styles.followButton} onClick={handleFollowToggle}>
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Row */}
      <div className={styles.productRow}>
        {productTitle && productImage && (
          <div className={styles.productCard}>
            <a
              href={productUrl || caption}
              onClick={handleCaptionClick}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.productImage}>
                <img src={productImage || "/placeholder.svg"} alt={productTitle} />
              </div>
              <div className={styles.productBrand}>{productTitle}</div>
            </a>
          </div>
        )}
      </div>

      {/* View Product Button */}
      {productTitle && productImage && (
        <div className={styles.viewProductWrapper}>
          <button
            className={styles.viewProductButton}
            onClick={() => setShowProductModal(true)}
          >
            View Product
          </button>
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className={styles.productModalOverlay} onClick={() => setShowProductModal(false)}>
          <div className={styles.productModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{productTitle}</h3>
              <button className={styles.closeButton} onClick={() => setShowProductModal(false)}>×</button>
            </div>
            <div className={styles.modalContent}>
              <img src={productImage || "/placeholder.svg"} alt={productTitle} />
              {/* <p>{productPrice && Price: ${productPrice}}</p> */}
              {productUrl && (
                <a href={productUrl || caption} target="_blank" rel="noopener noreferrer" className={styles.productLink}>
                  Visit Product Page
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {caption && !productUrl && (
        <div className={styles.captionContainer}>
          <a
            className={styles.caption}
            href={caption}
            onClick={handleCaptionClick}
            rel="noopener noreferrer"
            target="_blank"
          >
            {caption}
          </a>
        </div>
      )}

      {isCommenting && (
        <div ref={commentSectionRef}>
          <CommentSection
            comments={comments}
            onAddComment={(c) => api.commentOnPost(_id, c).then(() => setIsCommenting(false))}
            onClose={() => setIsCommenting(false)}
          />
        </div>
      )}
    </div>
  )
}