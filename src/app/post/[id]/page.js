"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import styles from "../../postDetails/postDetails.module.css"
import Header from "../../components/HeaderShop"
import Footer from "../../components/FooterShop"
import { LikeProvider } from "../../actions/LikeContext"
import api from "../../services/api"
import { useSelector } from "react-redux"

export default function PostDetail() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/"
  const currentUser = useSelector((state) => state.auth.user)
  const currentUserId = currentUser?.user._id
  const [currentPost, setCurrentPost] = useState({
    likes: [],
    isLiked: false,
  })
console.log(currentPost)
  const fetchPost = useCallback(async () => {
    try {
      setIsLoading(true)
      const post = await api.getPostById(id)
      console.log("Fetched post data:", post)
      setCurrentPost({
        ...post,
        likes: Array.isArray(post.likes) ? post.likes : [],
        isLiked: Array.isArray(post.likes) ? post.likes.includes(currentUserId) : false,
      })
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }, [id, currentUserId])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const handleLike = async () => {
    console.log("Attempting to like/unlike post:", id)

    try {
      if (currentPost.isLiked) {
        console.log("Unliking post")
        await api.unlikePost(id)
      } else {
        console.log("Liking post")
        await api.likePost(id)
      }
      updatePostLikes(!currentPost.isLiked)
    } catch (error) {
      console.error("Error liking/unliking post:", error)
    }
  }

  const updatePostLikes = (isLiking) => {
    setCurrentPost((prevPost) => {
      const updatedLikes = isLiking
        ? [...prevPost.likes, currentUserId]
        : prevPost.likes.filter((likeId) => likeId !== currentUserId)
      console.log("Updated likes:", updatedLikes)
      return {
        ...prevPost,
        likes: updatedLikes,
        isLiked: isLiking,
      }
    })
  }

  const handleComment = async (comment) => {
    console.log("Attempting to add comment:", comment)
    try {
      const updatedPost = await api.commentOnPost(id, comment)
      updatePostComments(updatedPost.comments)
    } catch (error) {
      console.error("Error commenting on post:", error)
    }
  }

  const updatePostComments = (newComments) => {
    setCurrentPost((prevPost) => ({
      ...prevPost,
      comments: newComments,
    }))
  }

  const handleSave = async () => {
    console.log("Attempting to save/unsave post:", id)
    try {
      if (currentPost.isSaved) {
        console.log("Unsaving post")
        await api.unsavePost(id)
      } else {
        console.log("Saving post")
        await api.savePost(id)
      }
      updatePostSaveStatus(!currentPost.isSaved)
    } catch (error) {
      console.error("Error saving/unsaving post:", error)
    }
  }

  const updatePostSaveStatus = (isSaving) => {
    setCurrentPost((prevPost) => {
      console.log("Updating save status:", isSaving)
      return {
        ...prevPost,
        isSaved: isSaving,
      }
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!currentPost) {
    return <div>Post not found</div>
  }

  return (
    <LikeProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.postDetail}>
          <div className={styles.header}>
            <button onClick={() => window.history.back()} className={styles.backButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className={styles.mainPost}>
            <div className={styles.userInfo}>
              <Image
                src={currentPost.user?.avatar || "/placeholder.svg"}
                alt={currentPost.user?.username || "no user found"}
                width={32}
                height={32}
                className={styles.avatar}
              />
              <span className={styles.username}>{currentPost.post.user?.fullname}</span>
            </div>

            <div className={styles.mediaContainer}>
              {currentPost.video ? (
                <video
                  src={`${BASE_URL}${currentPost.video.replace(/\\/g, "/")}`}
                  controls
                  className={styles.postVideo}
                />
              ) : (
                <Image
                  src={
                    currentPost.images?.[0]
                      ? `${BASE_URL}${currentPost.images[0].replace(/\\/g, "/")}`
                      : "/placeholder.svg"
                  }
                  alt={`Post ${currentPost.post._id}`}
                  layout="fill"
                  objectFit="cover"
                  className={styles.postImage}
                />
              )}
            </div>

            <div className={styles.postActions}>
              <button className={styles.actionButton} onClick={handleLike}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={currentPost.isLiked ? "red" : "none"}
                  stroke={currentPost.isLiked ? "red" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <button className={styles.actionButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </button>
              <button className={styles.actionButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
              <button className={styles.actionButton} onClick={handleSave}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={currentPost.isSaved ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>

            <div className={styles.likes}>{currentPost.likes.length} likes</div>

            <div className={styles.caption}>
              <span className={styles.username}>{currentPost.post.user?.fullname}</span> {currentPost.caption}
            </div>
            <div className={styles.comments}>
              {currentPost.comments?.length > 0 ? (
                currentPost.comments.map((comment, index) => (
                  <div key={index} className={styles.comment}>
                    <span className={styles.commentUsername}>{comment.user?.username}</span> {comment.text}
                  </div>
                ))
              ) : (
                <div>No comments yet</div>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const comment = e.target.comment.value
                if (comment.trim()) {
                  handleComment(comment)
                  e.target.comment.value = ""
                }
              }}
            >
              <input type="text" name="comment" placeholder="Add a comment..." className={styles.commentInput} />
              <button type="submit" className={styles.commentButton}>
                Post
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </LikeProvider>
  )
}

