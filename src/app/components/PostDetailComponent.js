"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Send, Bookmark, ArrowLeft } from "lucide-react"
import styles from "../postDetails/postDetails.module.css"

export default function PostDetail({ posts, initialPostId, onBack }) {
  const [currentPostId, setCurrentPostId] = useState(initialPostId)
  const [currentPost, setCurrentPost] = useState(null)

  useEffect(() => {
    if (posts.length > 0 && currentPostId) {
      const post = posts.find((p) => p._id === currentPostId)
      setCurrentPost(post)
    }
  }, [posts, currentPostId])

  if (!currentPost) return null

  const handleNextPost = () => {
    const currentIndex = posts.findIndex((p) => p._id === currentPostId)
    if (currentIndex < posts.length - 1) {
      setCurrentPostId(posts[currentIndex + 1]._id)
    }
  }

  const handlePreviousPost = () => {
    const currentIndex = posts.findIndex((p) => p._id === currentPostId)
    if (currentIndex > 0) {
      setCurrentPostId(posts[currentIndex - 1]._id)
    }
  }

  return (
    <div className={styles.postDetail}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className={styles.mainPost}>
        <div className={styles.userInfo}>
          <Image
            src={currentPost.user?.avatar || "/placeholder.svg"}
            alt={currentPost.user?.username}
            width={32}
            height={32}
            className={styles.avatar}
          />
          <span className={styles.username}>{currentPost.user?.username}</span>
        </div>

        <div className={styles.mediaContainer}>
          {currentPost.video ? (
            <video src={currentPost.video} controls className={styles.postVideo} />
          ) : (
            <Image
              src={currentPost.images[0]?.[0] || "/placeholder.svg"}
              alt={`Post ${currentPost._id}`}
              layout="fill"
              objectFit="cover"
              className={styles.postImage}
            />
          )}
        </div>

        <div className={styles.postActions}>
          <button className={styles.actionButton}>
            <Heart size={24} />
          </button>
          <button className={styles.actionButton}>
            <MessageCircle size={24} />
          </button>
          <button className={styles.actionButton}>
            <Send size={24} />
          </button>
          <button className={styles.actionButton}>
            <Bookmark size={24} />
          </button>
        </div>

        <div className={styles.likes}>{currentPost.likes.length} likes</div>
        <div className={styles.caption}>
          <span className={styles.username}>{currentPost.user?.username}</span> {currentPost.caption}
        </div>
        <div className={styles.comments}>View all {currentPost.comments.length} comments</div>
      </div>

      <div className={styles.navigation}>
        <button onClick={handlePreviousPost} disabled={posts.indexOf(currentPost) === 0}>
          Previous
        </button>
        <button onClick={handleNextPost} disabled={posts.indexOf(currentPost) === posts.length - 1}>
          Next
        </button>
      </div>
    </div>
  )
}

