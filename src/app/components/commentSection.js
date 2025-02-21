"use client"

import { useState } from "react"
import styles from "../feed/stylesfeed.module.css"
import api from "../services/api"

export default function CommentSection({
  comments,
  onAddComment,
  onClose,
  postId
}) {
  const [newComment, setNewComment] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    if (newComment.trim()) {
      try {
        await onAddComment(newComment)
        setNewComment("")
      } catch (error) {
        console.error("Error adding comment:", error)
      }
    }
  }

  const handleLikeComment = async commentId => {
    try {
      await api.likeComment(commentId)
      // You might want to update the UI to reflect the like
    } catch (error) {
      console.error("Error liking comment:", error)
    }
  }

  const handleUnlikeComment = async commentId => {
    try {
      await api.unlikeComment(commentId)
      // You might want to update the UI to reflect the unlike
    } catch (error) {
      console.error("Error unliking comment:", error)
    }
  }

  const handleDeleteComment = async commentId => {
    try {
      await api.deleteComment(commentId)
      // You might want to update the UI to remove the deleted comment
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  return (
    <div className={styles.commentSection}>
      <button onClick={onClose} className={styles.closeButtonComment}>
        &times;
      </button>
      <div className={styles.comments}>
        {[...new Set(comments)].map((comment, index) => (
          <div key={index} className={styles.comment}>
            <strong>{comment.user?.username || "Anonymous"}: </strong>
            {comment.text || comment.content}
            <button onClick={() => handleLikeComment(comment._id)}>Like</button>
            <button onClick={() => handleUnlikeComment(comment._id)}>
              Unlike
            </button>
            <button onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className={styles.commentInput}
        />
        <button type="submit" className={styles.commentSubmit}>
          Post
        </button>
      </form>
    </div>
  )
}
