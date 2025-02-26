"use client"

import { useState, useEffect, useCallback, useRef } from "react"
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
import CommentSection from "../../components/commentSection"

export default function PostDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/"
  const currentUser = useSelector((state) => state.auth.user)
  const currentUserId = currentUser?._id
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
  const [isFollowing, setIsFollowing] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)
  const commentSectionRef = useRef(null)

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
      setIsFollowing(post.post.user.followers.includes(currentUserId))
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }, [id, currentUserId])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

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
      const newComment = await api.commentOnPost(id, comment)
      setCurrentPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }))
      setIsCommenting(false)
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

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await api.unfollowUser(currentPost.post.user._id)
      } else {
        await api.followUser(currentPost.post.user._id)
      }
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error("Error following/unfollowing user:", error)
    }
  }

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting)
  }

  const handleLikeComment = async (commentId) => {
    try {
      const updatedComment = await api.likeComment(commentId)
      setCurrentPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.map((comment) => (comment._id === commentId ? updatedComment : comment)),
      }))
    } catch (error) {
      console.error("Error liking comment:", error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return
    }
    try {
      await api.deleteComment(commentId)
      setCurrentPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter((comment) => comment._id !== commentId),
      }))
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  const handleUnlikeComment = async (commentId) => {
    try {
      const updatedComment = await api.unlikeComment(commentId)
      setCurrentPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.map((comment) => (comment._id === commentId ? updatedComment : comment)),
      }))
    } catch (error) {
      console.error("Error unliking comment:", error)
    }
  }
console.log(currentPost)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!currentPost) return <div>Post not found</div>

  const isOwnPost = currentPost.post?.user?._id === currentUserId

  return (
    <LikeProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.postDetail}>
          <div className={styles.header}>
            <div className={styles.profile}>
              <button onClick={() => window.history.back()} className={styles.backButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={styles.userInfo}>
                <Image
                  src={currentPost.post.user?.avatar || "/placeholder.svg"}
                  alt={currentPost.post.user?.username}
                  width={32}
                  height={32}
                  className={styles.avatar}
                />
                <span className={styles.username}>{currentPost.post.user?.fullname}</span>
                {!isOwnPost && (
                  <button className={styles.followButton} onClick={handleFollowToggle}>
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            </div>
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
            <div className={styles.mediaContainer}>
              {currentPost.post.video ? (
                <video
                  onClick={() => handleVideoClick(currentPost.post._id, !!currentPost.post.video)}
                  src={`${BASE_URL}${currentPost.post.video.replace(/\\/g, "/")}`}
                  controls
                  className={styles.postVideo}
                />
              ) : (
                <Image
                  // src={
                  //   currentPost.images?.[0]
                  //     ? `${BASE_URL}${currentPost.post.images[0].replace(/\\/g, "/")}`
                  //     
                  // }
                  src={`${BASE_URL}${currentPost.post.images[0].replace(/\\/g, "/")}` }
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
              <button className={styles.actionButton} onClick={handleCommentClick}>
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

            {isCommenting && (
              <div ref={commentSectionRef}>
                <CommentSection
                  comments={currentPost.comments}
                  onAddComment={handleComment}
                  onClose={() => setIsCommenting(false)}
                  postId={id}
                  onLikeComment={handleLikeComment}
                  onUnlikeComment={handleUnlikeComment}
                  onDeleteComment={handleDeleteComment}
                />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </LikeProvider>
  )
}

