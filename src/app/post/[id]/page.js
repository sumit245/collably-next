"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import styles from "../../postDetails/postDetails.module.css"
import Header from "../../components/HeaderShop"
import Footer from "../../components/FooterShop"
import { LikeProvider } from "../../actions/LikeContext"
import api, { BASE_URL } from "../../services/api"
import { useSelector } from "react-redux"
import { Trash2, Heart, MessageCircle, Send, Bookmark } from "lucide-react"
import CommentSection from "../../components/commentSection"

export default function PostDetail() {
  const { id } = useParams(), router = useRouter()
  const [isLoading, setIsLoading] = useState(true), [error, setError] = useState(null)

  const currentUserId = useSelector((state) => state.auth.user?._id), currentUser = useSelector((state) => state.auth.user)
  const [currentPost, setCurrentPost] = useState({ likes: [], isLiked: false, comments: [], isSaved: false, post: { user: {}, images: [], video: null } })
  const [isFollowing, setIsFollowing] = useState(false), [isCommenting, setIsCommenting] = useState(false)
  const commentSectionRef = useRef(null)

  const fetchPost = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.getPostById(id)
      if (!response?.post) return setError("Failed to load post data.")

      const { post } = response
      const isLiked = post.likes?.some(like => like._id === currentUserId) ?? false
      const isSaved = currentUser?.saved?.includes(id) ?? false

      setCurrentPost(prev => ({
        ...prev, ...post,
        likes: post.likes || [],
        isLiked,
        isSaved,
        comments: post.comments || []
      }))
      setIsFollowing(post.user?.followers?.some(follower => follower._id === currentUserId) ?? false)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [id, currentUserId, currentUser?.saved])

  useEffect(() => { fetchPost() }, [fetchPost])

  useEffect(() => {
    const handleClickOutside = e => {
      if (commentSectionRef.current && !commentSectionRef.current.contains(e.target)) setIsCommenting(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const updatePostState = updates => setCurrentPost(prev => ({ ...prev, ...updates }))

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await api.deletePost(id)
        router.push("/CreatorShop")
      } catch { setError("Failed to delete post") }
    }
  }

  const handleLike = async () => {
    try {
      await (currentPost.isLiked ? api.unlikePost(id) : api.likePost(id))
      updatePostState({
        likes: currentPost.isLiked ? currentPost.likes.filter(uid => uid !== currentUserId) : [...currentPost.likes, currentUserId],
        isLiked: !currentPost.isLiked
      })
    } catch { }
  }

  const handleComment = async comment => {
    try {
      const response = await api.commentOnPost(id, comment)
      if (response?.comments) updatePostState({ comments: response.comments })
      else if (response) updatePostState({ comments: [...currentPost.comments, response] })
      else {
        const updatedPost = await api.getPostById(id)
        if (updatedPost?.post) updatePostState({ comments: updatedPost.post.comments || [] })
      }
    } catch (error) { console.error("Error adding comment:", error) }
  }

  const handleSave = async () => {
    try {
      await (currentPost.isSaved ? api.unsavePost(id) : api.savePost(id))
      updatePostState({ isSaved: !currentPost.isSaved })
    } catch (error) { console.error("Error saving/unsaving post:", error) }
  }

  const handleFollowToggle = async () => {
    try {
      await (isFollowing ? api.unfollowUser(currentPost.user._id) : api.followUser(currentPost.user._id))
      setIsFollowing(!isFollowing)
    } catch { }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!currentPost) return <div>Post not found</div>

  const isOwnPost = currentPost?.user?._id === currentUserId

  return (
    <LikeProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.postDetail}>
          <div className={styles.header}>
            <div className={styles.profile}>
              <button onClick={() => window.history.back()} className={styles.backButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              </button>
              <div className={styles.userInfo}>
                <Image src={currentPost.user?.avatar || "/placeholder.svg"} alt={currentPost.user?.username} width={32} height={32} className={styles.avatar} />
                <span className={styles.username}>{currentPost.user?.fullname}</span>
                {!isOwnPost && <button onClick={handleFollowToggle} className={styles.followButton}>{isFollowing ? "Following" : "Follow"}</button>}
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
              {currentPost.video ? (
                <video onClick={() => router.push(`/feed?reelId=${currentPost._id}`)} src={currentPost.video} controls className={styles.postVideo} />
              ) : (
                <Image src={currentPost.images?.[0]} alt={`Post ${currentPost._id}`} layout="fill" objectFit="cover" className={styles.postImage} />
              )}
            </div>
            <div className={styles.postActions}>
              <button className={styles.actionButton} onClick={handleLike}>
                <Heart size={24} fill={currentPost.isLiked ? "red" : "none"} stroke={currentPost.isLiked ? "red" : "currentColor"} />
              </button>
              <button className={styles.actionButton} onClick={() => setIsCommenting(!isCommenting)}><MessageCircle size={24} /></button>
              <button className={styles.actionButton}><Send size={24} /></button>
              <button className={styles.actionButton} onClick={handleSave}>
                <Bookmark size={24} fill={currentPost.isSaved ? "currentColor" : "none"} />
              </button>
            </div>
            <div className={styles.likes}>{currentPost.likes?.length} likes</div>
            <div className={styles.likes}>{currentPost.comments?.length || 0} Comments</div>
            <div className={styles.caption}>
              <span className={styles.username}>{currentPost.user?.fullname}</span> {currentPost.caption}
            </div>

            <div className={styles.comments}>

              {isCommenting && (
                <div ref={commentSectionRef}>
                  <CommentSection comments={currentPost.comments || []} onAddComment={handleComment} onClose={() => setIsCommenting(false)} postId={id} />
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </LikeProvider>
  )
}
