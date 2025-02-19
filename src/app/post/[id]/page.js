"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { fetchPostById } from "../../store/postSlice"
import Image from "next/image"
import { Heart, MessageCircle, Send, Bookmark, ArrowLeft } from 'lucide-react'
import styles from "../../postDetails/postDetails.module.css"

export default function PostDetail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { currentPost, status, error } = useSelector((state) => state.posts)
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/"

  useEffect(() => {
    dispatch(fetchPostById(id))
  }, [dispatch, id])

  const handleLike = () => {
    if (currentPost.isLiked) {
      dispatch(unlikePost(id))
    } else {
      dispatch(likePost(id))
    }
  }

  const handleComment = (comment) => {
    dispatch(commentOnPost({ postId: id, comment }))
  }

  const handleSave = () => {
    if (currentPost.isSaved) {
      dispatch(unsavePost(id))
    } else {
      dispatch(savePost(id))
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }

  if (!currentPost) {
    return <div>Post not found</div>
  }

  return (
    <div className={styles.postDetail}>
      <div className={styles.header}>
        <button onClick={() => window.history.back()} className={styles.backButton}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className={styles.mainPost}>
        <div className={styles.userInfo}>
          <Image
            src={currentPost.user?.avatar || "/placeholder.svg"}
            alt={currentPost.user?.username|| "no user found"}
            width={32}
            height={32}
            className={styles.avatar}
          />
          <span className={styles.username}>{currentPost.user?.username}</span>
        </div>

        <div className={styles.mediaContainer}>
          {currentPost.video ? (
            <video src={`${BASE_URL}${currentPost.video.replace(/\\/g, "/")}`} controls className={styles.postVideo} />
          ) : (
            <Image
              src={`${BASE_URL}${currentPost.images[0].replace(/\\/g, "/")}` || "/placeholder.svg"}
              alt={`Post ${currentPost._id}`}
              layout="fill"
              objectFit="cover"
              className={styles.postImage}
            />
          )}
        </div>

        <div className={styles.postActions}>
          <button className={styles.actionButton} onClick={handleLike}>
            <Heart size={24} fill={currentPost.isLiked ? "red" : "none"} />
          </button>
          <button className={styles.actionButton}>
            <MessageCircle size={24} />
          </button>
          <button className={styles.actionButton}>
            <Send size={24} />
          </button>
          <button className={styles.actionButton} onClick={handleSave}>
            <Bookmark size={24} fill={currentPost.isSaved ? "black" : "none"} />
          </button>
        </div>

        <div className={styles.likes}>{currentPost.likes.length} likes</div>
        <div className={styles.caption}>
          <span className={styles.username}>{currentPost.user?.username}</span> {currentPost.caption}
        </div>
        <div className={styles.comments}>
          {currentPost.comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <span className={styles.commentUsername}>{comment.user.username}</span> {comment.text}
            </div>
          ))}
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
  )
}