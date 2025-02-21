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
import { useRouter } from "next/navigation"
import { Trash2, Heart, MessageCircle, Send, Bookmark } from "lucide-react"

export default function PostDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/"
  const currentUser = useSelector((state) => state.auth.user)
  const currentUserId = currentUser?.user._id
  const [currentPost, setCurrentPost] = useState({
    likes: [],
    isLiked: false,
    comments: [],
    isSaved: false,
    post: {
      user: {},
      images: [],
      video: null,
    },
  })

  const fetchPost = useCallback(async () => {
    try {
      setIsLoading(true)
      const post = await api.getPostById(id)
      setCurrentPost({
        ...post,
        likes: Array.isArray(post.likes) ? post.likes : [],
        isLiked: Array.isArray(post.likes) ? post.likes.includes(currentUserId) : false,
        comments: Array.isArray(post.comments) ? post.comments : [],
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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return
    }

    try {
      await api.deletePost(id)
      router.push("/creatorFeedProfile")
    } catch (error) {
      console.error("Error deleting post:", error)
      setError("Failed to delete post")
    }
  }

  const handleVideoClick = (postId, isVideo) => {
    if (isVideo) {
      router.push(`/feed?reelId=${postId}`)
    }
  }

  const handleLike = async () => {
    try {
      if (currentPost.isLiked) {
        await api.unlikePost(id)
      } else {
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
      return {
        ...prevPost,
        likes: updatedLikes,
        isLiked: isLiking,
      }
    })
  }

  const handleComment = async (comment) => {
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
    try {
      if (currentPost.isSaved) {
        await api.unsavePost(id)
      } else {
        await api.savePost(id)
      }
      updatePostSaveStatus(!currentPost.isSaved)
    } catch (error) {
      console.error("Error saving/unsaving post:", error)
    }
  }

  const updatePostSaveStatus = (isSaving) => {
    setCurrentPost((prevPost) => ({
      ...prevPost,
      isSaved: isSaving,
    }))
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!currentPost) return <div>Post not found</div>
  console.log(currentPost)

  const isOwnPost = currentPost.post?.user?._id === currentUserId

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
            {isOwnPost && (
              <button
                onClick={handleDelete}
                className={styles.deleteButton}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "red",
                  padding: "8px",
                }}
              >
                <Trash2 size={24} />
              </button>
            )}
          </div>

          <div className={styles.mainPost}>
            <div className={styles.userInfo}>
              <Image
                src={currentPost.post.user?.avatar || "/placeholder.svg"}
                alt={currentPost.post.user?.username}
                width={32}
                height={32}
                className={styles.avatar}
              />
              <span className={styles.username}>{currentPost.post.user?.fullname}</span>
            </div>

            <div
              className={styles.mediaContainer}
             
            >
              {currentPost.post.video ? (
                <video
                onClick={() => handleVideoClick(currentPost.post._id, !!currentPost.post.video)}
                  src={`${BASE_URL}${currentPost.post.video.replace(/\\/g, "/")}`}
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
                <Heart
                  className={currentPost.isLiked ? styles.likedHeart : ""}
                  size={24}
                  fill={currentPost.isLiked ? "red" : "none"}
                  stroke={currentPost.isLiked ? "red" : "currentColor"}
                />
              </button>
              <button className={styles.actionButton}>
                <MessageCircle size={24} />
              </button>
              <button className={styles.actionButton}>
                <Send size={24} />
              </button>
              <button className={styles.actionButton} onClick={handleSave}>
                <Bookmark size={24} fill={currentPost.isSaved ? "currentColor" : "none"} />
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
              className={styles.commentForm}
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


