"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from "../services/api"
import { trackReferralClick } from "../store/brandSlice"
import styles from "../feed/stylesfeed.module.css"
import CommentSection from "./commentSection"
import Image from "next/image"

export default function Reel({
  _id,
  video,
  images,
  user,
  caption,
  likes = [],
  comments,
  onLike,
  onUnlike,
  onShare,
  onSave,
  onUnsave,
  isSaved,
  isLiked: propIsLiked,
  currentUserId,
}) {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id) || currentUserId
  const [isFollowing, setIsFollowing] = useState(user?.followers?.includes(userId))
  const [isCommenting, setIsCommenting] = useState(false)
  const [isLiked, setIsLiked] = useState(propIsLiked || (Array.isArray(likes) && likes.includes(userId)))
  const commentSectionRef = useRef(null)
  const BASE_URL = "http://localhost:5000/"

  // Update isLiked when props change
  useEffect(() => {
    setIsLiked(propIsLiked || (Array.isArray(likes) && likes.includes(userId)))
  }, [propIsLiked, likes, userId])

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
    if (isLiked) {
      onUnlike(_id)
    } else {
      onLike(_id)
    }
    setIsLiked(!isLiked)
  }

  const handleSaveAction = () => {
    if (isSaved) {
      onUnsave(_id)
    } else {
      onSave(_id)
    }
  }

  return (
    <div className={styles.reelContainer}>
      {video ? (
        <video className={styles.video} loop muted playsInline autoPlay>
          <source src={`${BASE_URL}${video.replace(/\\/g, "/")}`} type="video/mp4" />
        </video>
      ) : images?.[0] ? (
        <Image
          src={`${BASE_URL}${images[0].replace(/\\/g, "/")}`}
          alt="Post"
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      ) : (
        <Image src="/placeholder.svg" alt="Placeholder" layout="fill" objectFit="cover" />
      )}

      <div className={styles.logo}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C14.717 2 17.157 2.004 18.878 2.058C20.488 2.109 21.905 2.419 23.004 3.518C24.103 4.617 24.413 6.034 24.464 7.644C24.518 9.365 24.522 11.805 24.522 14.522C24.522 17.239 24.518 19.679 24.464 21.4C24.413 23.01 24.103 24.427 23.004 25.526C21.905 26.625 20.488 26.935 18.878 26.986C17.157 27.04 14.717 27.044 12 27.044C9.283 27.044 6.843 27.04 5.122 26.986C3.512 26.935 2.095 26.625 0.996 25.526C-0.103 24.427 -0.413 23.01 -0.464 21.4C-0.518 19.679 -0.522 17.239 -0.522 14.522C-0.522 11.805 -0.518 9.365 -0.464 7.644C-0.413 6.034 -0.103 4.617 0.996 3.518C2.095 2.419 3.512 2.109 5.122 2.058C6.843 2.004 9.283 2 12 2Z" />
        </svg>
      </div>

      <div className={styles.actions}>
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
          </button>
          <span className={styles.actionCount}>{likes.length}</span>
        </div>

        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={() => setIsCommenting(!isCommenting)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
          <span className={styles.actionCount}>{comments.length}</span>
        </div>

        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={() => onShare({ _id, user, caption })}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
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

      <div className={styles.info}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img src={user?.avatar || "/placeholder.svg"} alt={user?.fullname} />
          </div>
          <span className={styles.username}>{user?.fullname}</span>
          {userId !== user?._id && (
            <button className={styles.followButton} onClick={handleFollowToggle}>
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <a className={styles.caption} href={caption} onClick={handleCaptionClick} rel="noopener noreferrer">
          {caption}
        </a>
      </div>

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

