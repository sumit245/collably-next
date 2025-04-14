"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from "../services/api"
import { trackReferralClick } from "../store/brandSlice"
import styles from "../feed/stylesfeed.module.css"
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
  const commentSectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    setIsLiked(propIsLiked || likes.includes(userId))
    setIsSaved(propIsSaved || currentUser?.saved?.includes(_id))
  }, [propIsLiked, propIsSaved, likes, userId, _id, currentUser?.saved])

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      videoRef.current.play().catch((err) => console.error("Error playing video:", err))
      videoRef.current.muted = false
    } else {
      videoRef.current.pause()
      videoRef.current.muted = true
      videoRef.current.currentTime = 0
    }
  }, [isActive])

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

  return (
    <div className={styles.reelContainer}>
      <div className={styles.userInfo}>
        <Link href={`/creator/${user?._id}`} className={styles.avatar}>
          <img src={user?.avatar || "/placeholder.svg"} alt={user?.fullname} />
        </Link>
        <Link href={`/creator/${user?._id}`} className={styles.username}>
          {user?.fullname}
        </Link>
        {userId !== user?._id && (
          <button className={styles.followButton} onClick={handleFollowToggle}>
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>

      {video ? (
        <video ref={videoRef} className={styles.video} loop playsInline>
          <source src={video} type="video/mp4" />
        </video>
      ) : images?.[0] ? (
        <Image src={images[0]?.[0] || "/placeholder.svg"} alt="Post" fill className={styles.image} objectFit="cover" />
      ) : (
        <Image src="/placeholder.svg" alt="Placeholder" fill objectFit="cover" />
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
            <span className={styles.actionCount}>{likes.length}</span>
          </button>
        </div>

        {/* <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={handleCommentAction}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className={styles.actionCount}>{comments?.length || 0}</span>
          </button>
        </div> */}

        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={handleSaveAction}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "white" : "none"} stroke="white">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        <div className={styles.actionItem}>
          <button className={styles.actionButton} onClick={() => onShare({ _id, user, caption })}>
            <svg
              height="24px"
              width="24px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill=""
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path
                  style={{ fill: "none" }}
                  d="M501.801,213.374L324.879,36.453V142.94h-59.905c-140.708,0-254.775,114.066-254.775,254.775v77.833l92.966-101.742c52.389-57.335,126.474-89.996,204.14-89.996h17.574v106.487L501.801,213.374z"
                />
                <path
                  style={{ fill: "#fff" }}
                  d="M10.197,485.747c-1.238,0-2.488-0.225-3.687-0.691c-3.925-1.523-6.51-5.3-6.51-9.509v-77.833c0-70.777,27.562-137.318,77.609-187.365c50.047-50.046,116.588-77.609,187.366-77.609h49.705V36.453c0-4.125,2.486-7.844,6.296-9.423c3.811-1.579,8.198-0.707,11.115,2.21l176.923,176.922c1.912,1.912,2.987,4.507,2.987,7.212c0,2.705-1.075,5.299-2.987,7.212L332.09,397.509c-2.917,2.916-7.304,3.791-11.115,2.21c-3.81-1.579-6.296-5.297-6.296-9.423v-96.288h-7.374c-74.616,0-146.278,31.593-196.611,86.677L17.728,482.427C15.758,484.584,13.007,485.747,10.197,485.747zM264.974,153.139c-134.86,0-244.576,109.716-244.576,244.575v51.551l75.237-82.339c54.187-59.303,131.338-93.316,211.669-93.316h17.573c5.632,0,10.199,4.566,10.199,10.199v81.864l152.299-152.299L335.077,61.076v81.864c0,5.633-4.567,10.199-10.199,10.199H264.974z"
                />
                <path
                  style={{ fill: "none" }}
                  d="M247.503,190.884c-5.444,0-9.963-4.3-10.184-9.789c-0.227-5.628,4.152-10.375,9.78-10.601c2.762-0.111,5.571-0.168,8.35-0.168c5.633,0,10.199,4.566,10.199,10.199c0,5.633-4.566,10.199-10.199,10.199c-2.507,0-5.039,0.051-7.529,0.151C247.781,190.882,247.642,190.884,247.503,190.884z"
                />
                <path
                  style={{ fill: "none" }}
                  d="M140.757,228.2c-3.139,0-6.236-1.444-8.234-4.169c-3.33-4.543-2.348-10.925,2.196-14.255c22.329-16.37,47.27-27.846,74.131-34.11c5.49-1.279,10.97,2.131,12.249,7.616c1.279,5.486-2.131,10.97-7.616,12.249c-24.164,5.635-46.607,15.963-66.704,30.696C144.962,227.558,142.85,228.2,140.757,228.2z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.info}>
        {productTitle && productImage ? (
          <a
            className={styles.caption}
            href={productUrl || caption}
            onClick={handleCaptionClick}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className={styles.productPreview}>
              <img src={productImage || "/placeholder.svg"} alt={productTitle} className={styles.productImage} />
              <div className={styles.productDetails}>
                <span className={styles.productTitle}>{productTitle}</span>
                {/* {productPrice && <span className={styles.productPrice}>{productPrice}</span>} */}
              </div>
            </div>
          </a>
        ) : (
          <a
            className={styles.caption}
            href={caption}
            onClick={handleCaptionClick}
            rel="noopener noreferrer"
            target="_blank"
          >
            {caption}
          </a>
        )}
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