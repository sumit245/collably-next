"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import styles from "../../postDetails/postDetails.module.css"
import Header from "../../components/HeaderShop"
import Footer from "../../components/FooterShop"
import { LikeProvider } from "../../actions/LikeContext"
import api from "../../services/api"
import { useSelector } from "react-redux"
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
    likes: [], isLiked: false, comments: [], isSaved: false, post: { user: {}, images: [], video: null }
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
        likes: post.likes || [],
        isLiked: post.likes?.includes(currentUserId) || false,
        comments: post.comments || [],
      })
      setIsFollowing(post.post.user?.followers?.includes(currentUserId))
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }, [id, currentUserId])



  useEffect(() => { fetchPost() }, [fetchPost])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (commentSectionRef.current && !commentSectionRef.current.contains(e.target)) {
        setIsCommenting(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      await api.deletePost(id)
      router.push("/creatorFeedProfile")
    } catch (error) {
      console.error("Error deleting post:", error)
      setError("Failed to delete post")
    }
  }

  const handleLike = async () => {
    try {
      await (currentPost.isLiked ? api.unlikePost(id) : api.likePost(id))
      setCurrentPost(prev => ({
        ...prev,
        likes: currentPost.isLiked 
          ? prev.likes.filter(id => id !== currentUserId) 
          : [...prev.likes, currentUserId],
        isLiked: !prev.isLiked
      }))
    } catch (error) {
      console.error("Error liking/unliking post:", error)
    }
  }

  const handleComment = async (comment) => {
    try {
      const newComment = await api.commentOnPost(id, comment)
      setCurrentPost(prev => ({ ...prev, comments: [...prev.comments, newComment] }))
      setIsCommenting(false)
    } catch (error) {
      console.error("Error commenting on post:", error)
    }
  }

  const handleSave = async () => {
    try {
      await (currentPost.isSaved ? api.unsavePost(id) : api.savePost(id))
      setCurrentPost(prev => ({ ...prev, isSaved: !prev.isSaved }))
    } catch (error) {
      console.error("Error saving/unsaving post:", error)
    }
  }

  const handleFollowToggle = async () => {
    try {
      await (isFollowing ? api.unfollowUser(currentPost.post.user._id) : api.followUser(currentPost.post.user._id))
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error("Error following/unfollowing user:", error)
    }
  }

  const handleCommentClick = () => setIsCommenting(!isCommenting)

  const updateComments = (updateFn) => {
    setCurrentPost(prev => ({ ...prev, comments: updateFn(prev.comments) }))
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!currentPost) return <div>Post not found</div>

  const isOwnPost = currentPost.post?.user?._id === currentUserId
  console.log(currentPost)
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
              <button onClick={handleDelete} className={styles.deleteButton} style={{ background: "none", border: "none", cursor: "pointer", color: "red", padding: "8px" }}>
                <Trash2 size={24} />
              </button>
            )}
          </div>

          <div className={styles.mainPost}>
            <div className={styles.mediaContainer}>
              {currentPost.post.video ? (
                <video
                  onClick={() => router.push(`/feed?reelId=${currentPost.post._id}`)}
                  src={`${BASE_URL}${currentPost.post.video.replace(/\\/g, "/")}`}
                  controls
                  className={styles.postVideo}
                />
              ) : (
                <Image
                  src={`${BASE_URL}${currentPost.post.images[0].replace(/\\/g, "/")}`}
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
              <button className={styles.actionButton}><Send size={24} /></button>
              <button className={styles.actionButton} onClick={handleSave}>
                <Bookmark size={24} fill={currentPost.isSaved ? "currentColor" : "none"} />
              </button>
            </div>

            <div className={styles.likes}>{currentPost.likes.length} likes</div>
            <div className={styles.caption}>
              <span className={styles.username}>{currentPost.post.user?.fullname}</span> {currentPost.caption}
            </div>

            <div className={styles.comments}>
              {currentPost.comments?.length > 0 ? currentPost.comments.map((comment, index) => (
                <div key={index} className={styles.comment}>
                  <span className={styles.commentUsername}>{comment.user?.username}</span> {comment.text}
                </div>
              )) : <div>No comments yet</div>}
            </div>

            {isCommenting && (
              <div ref={commentSectionRef}>
                <CommentSection
                  comments={currentPost.comments}
                  onAddComment={handleComment}
                  onClose={() => setIsCommenting(false)}
                  postId={id}
                  onLikeComment={(id) => api.likeComment(id).then(updateComments)}
                  onUnlikeComment={(id) => api.unlikeComment(id).then(updateComments)}
                  onDeleteComment={(id) => {
                    if (!confirm("Are you sure?")) return
                    api.deleteComment(id).then(() => 
                      setCurrentPost(prev => ({ ...prev, comments: prev.comments.filter(c => c._id !== id) }))
                    )
                  }}
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