'use client'

import { useState, useRef, useEffect } from 'react'
import styles from '../feed/stylesfeed.module.css'
import CommentSection from '../components/commentSection'

export default function Reel({ 
  id, videoUrl, username, profilePic, caption, likes, comments, shares, song, isActive, isLiked,
  onLike, onComment, onShare 
}) {
  const videoRef = useRef(null)
  const commentSectionRef = useRef(null)
  const [isCommenting, setIsCommenting] = useState(false)

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isActive])

  useEffect(() => {
    function handleClickOutside(event) {
      if (commentSectionRef.current && !commentSectionRef.current.contains(event.target)) {
        setIsCommenting(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting)
  }

  return (
    <div className={styles.reelContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        src={videoUrl}
        loop
        muted
        playsInline
      />
      
      <div className={styles.logo}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C14.717 2 17.157 2.004 18.878 2.058C20.488 2.109 21.905 2.419 23.004 3.518C24.103 4.617 24.413 6.034 24.464 7.644C24.518 9.365 24.522 11.805 24.522 14.522C24.522 17.239 24.518 19.679 24.464 21.4C24.413 23.01 24.103 24.427 23.004 25.526C21.905 26.625 20.488 26.935 18.878 26.986C17.157 27.04 14.717 27.044 12 27.044C9.283 27.044 6.843 27.04 5.122 26.986C3.512 26.935 2.095 26.625 0.996 25.526C-0.103 24.427 -0.413 23.01 -0.464 21.4C-0.518 19.679 -0.522 17.239 -0.522 14.522C-0.522 11.805 -0.518 9.365 -0.464 7.644C-0.413 6.034 -0.103 4.617 0.996 3.518C2.095 2.419 3.512 2.109 5.122 2.058C6.843 2.004 9.283 2 12 2Z"/>
        </svg>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={onLike}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "red" : "none"} stroke={isLiked ? "red" : "white"} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <span className={styles.actionCount}>{likes.toLocaleString('en-US')}</span>
        </div>
        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={handleCommentClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </button>
          <span className={styles.actionCount}>{comments.length.toLocaleString('en-US')}</span>
        </div>
        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={() => onShare({id, username, caption})}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
          <span className={styles.actionCount}>{shares.toLocaleString('en-US')}</span>
        </div>
        <button className={styles.moreButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img src={profilePic || "/placeholder.svg"} alt={username} />
          </div>
          <span className={styles.username}>{username}</span>
          <button className={styles.followButton}>
            Follow
          </button>
        </div>
        {/* <div className={styles.caption}>
          {caption}
        </div>
        <div className={styles.songInfo}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          <span>{song}</span>
        </div> */}
       <div className={styles.productButton} onClick={() => window.location.href = "https://www.nykaa.com/eucerin-anti-pigment-dual-serum-with-thiamidol-hyaluronic-acid/p/17487559?transaction_id=155f48f3f1da972f3eda3ccf841dde01&intcmp=nykaa:hp:desktop-homepage:default:Brand_Gold_Takeover_Widget:SLIDING_WIDGET_V2:8:Eucerin:68499:155f48f3f1da972f3eda3ccf841dde01"}>
  <img src="/images/demo-product1.avif" alt="Product" className={styles.productImage} />
  <div className={styles.productInfo}>
    <span className={styles.productPrice}>₹3591</span>
    <span className={styles.productRating}>5% off</span>
  </div>
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

