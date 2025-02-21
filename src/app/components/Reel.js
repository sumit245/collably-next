"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
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
  isActive,
  onLike,
  onUnlike,
  onComment,
  onShare,
  onSave,
  onUnsave,
  isSaved,
}) {
  const currentUser = useSelector((state) => state.auth.user)
  const currentUserId = currentUser?.user._id

  const mediaRef = useRef(null)
  const commentSectionRef = useRef(null)
  const [isCommenting, setIsCommenting] = useState(false)
  const [isLiked, setIsLiked] = useState(likes.includes(currentUserId))
  const [isSavedState, setIsSavedState] = useState(isSaved)
  const BASE_URL = "http://localhost:5000/"
  const changeEscapeChar = (path) => {
    if (!path) return ""
    return path.replace(/\\/g, "/")
  }

  useEffect(() => {
    if (isActive) {
      mediaRef.current?.play()
    } else {
      mediaRef.current?.pause()
    }
  }, [isActive])
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (commentSectionRef.current && !commentSectionRef.current.contains(event.target)) {
        setIsCommenting(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting)
  }

  const handleLikeClick = () => {
    if (isLiked) {
      onUnlike(_id)
    } else {
      onLike(_id)
    }
    setIsLiked(!isLiked)
    console.log("Attempting to like/unlike post:", _id)
    console.log("Current user ID:", currentUserId)
   
  }

  const handleSaveClick = () => {
    if (isSavedState) {
      onUnsave(_id)
    } else {
      onSave(_id)
    }
    setIsSavedState(!isSavedState)
  }

  return (
    <div className={styles.reelContainer}>
      {video ? (
        <video
          ref={mediaRef}
          className={styles.video}
          src={`${BASE_URL}${changeEscapeChar(video[0])}`}
          loop
          muted
          playsInline
        />
      ) : images && images.length > 0 ? (
        <Image
          src={`${BASE_URL}${changeEscapeChar(images[0])}`}
          alt="Post image"
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      ) : (
        <Image src="/placeholder.svg" alt="Placeholder" layout="fill" objectFit="cover" className={styles.image} />
      )}

      <div className={styles.logo}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C14.717 2 17.157 2.004 18.878 2.058C20.488 2.109 21.905 2.419 23.004 3.518C24.103 4.617 24.413 6.034 24.464 7.644C24.518 9.365 24.522 11.805 24.522 14.522C24.522 17.239 24.518 19.679 24.464 21.4C24.413 23.01 24.103 24.427 23.004 25.526C21.905 26.625 20.488 26.935 18.878 26.986C17.157 27.04 14.717 27.044 12 27.044C9.283 27.044 6.843 27.04 5.122 26.986C3.512 26.935 2.095 26.625 0.996 25.526C-0.103 24.427 -0.413 23.01 -0.464 21.4C-0.518 19.679 -0.522 17.239 -0.522 14.522C-0.522 11.805 -0.518 9.365 -0.464 7.644C-0.413 6.034 -0.103 4.617 0.996 3.518C2.095 2.419 3.512 2.109 5.122 2.058C6.843 2.004 9.283 2 12 2Z" />
        </svg>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={handleLikeClick}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isLiked ? "red" : "none"}
              stroke={isLiked ? "red" : "white"}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <span className={styles.actionCount}>{likes?.length || 0}</span>
        </div>
        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={handleCommentClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
          <span className={styles.actionCount}>{comments?.length || 0}</span>
        </div>
        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={() => onShare({ _id, user, caption })}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={handleSaveClick}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isSavedState ? "white" : "none"}
              stroke="white"
              strokeWidth="2"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
          </div>
          <span className={styles.username}>{user?.username}</span>
          <button className={styles.followButton}>Follow</button>
        </div>
        <div className={styles.caption}>
          <a className={styles.captionLink} href={caption} rel="noopener noreferrer">
            {caption}
          </a>
        </div>
      </div>

      {isCommenting && (
        <div ref={commentSectionRef}>
          <CommentSection
            comments={comments}
            onAddComment={(comment) => {
              onComment(comment)
              setIsCommenting(false)
            }}
            onClose={() => setIsCommenting(false)}
          />
        </div>
      )}
    </div>
  )
}