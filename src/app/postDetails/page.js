"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import styles from "../postDetails/postDetails.module.css"

export default function PostDetail({ posts, initialPostId, onBack }) {
  const [currentPostId, setCurrentPostId] = useState(initialPostId)
  const currentPost = posts.find((post) => post.id === currentPostId)

  const handlePrevPost = () => {
    const currentIndex = posts.findIndex((post) => post.id === currentPostId)
    if (currentIndex > 0) {
      setCurrentPostId(posts[currentIndex - 1].id)
    }
  }

  const handleNextPost = () => {
    const currentIndex = posts.findIndex((post) => post.id === currentPostId)
    if (currentIndex < posts.length - 1) {
      setCurrentPostId(posts[currentIndex + 1].id)
    }
  }

  if (!currentPost) return null

  return (
    <div className={styles.postDetail}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Main Post Content */}
      <div className={styles.mainPost}>
        <div className={styles.userInfo}>
          <Image
            src={currentPost.user.avatar || "/placeholder.svg"}
            alt={currentPost.user.username}
            width={32}
            height={32}
            className={styles.avatar}
          />
          <span className={styles.username}>{currentPost.user.username}</span>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src={currentPost.image || "/placeholder.svg"}
            alt={`Post ${currentPost.id}`}
            layout="fill"
            objectFit="cover"
            className={styles.postImage}
          />
        </div>

        <div className={styles.postActions}>
          <div className={styles.leftActions}>
            <button className={styles.actionButton}>
              <Heart size={24} />
            </button>
            <button className={styles.actionButton}>
              <MessageCircle size={24} />
            </button>
            <button className={styles.actionButton}>
              <Send size={24} />
            </button>
          </div>
          <button className={styles.actionButton}>
            <Bookmark size={24} />
          </button>
        </div>

        <div className={styles.likes}>{currentPost.likes} likes</div>
        <div className={styles.caption}>
          <span className={styles.username}>{currentPost.user.username}</span> {currentPost.caption}
        </div>
        <div className={styles.comments}>View all {currentPost.comments} comments</div>
        <div className={styles.addComment}>
          <input type="text" placeholder="Add a comment..." className={styles.commentInput} />
          <button className={styles.postButton}>Post</button>
        </div>
      </div>

      <div className={styles.postsFeed}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={`${styles.postThumbnail} ${post.id === currentPostId ? styles.activeThumbnail : ""}`}
            onClick={() => setCurrentPostId(post.id)}
          >
            <Image
              src={post.image || "/placeholder.svg"}
              alt={`Post ${post.id}`}
              width={100}
              height={100}
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
