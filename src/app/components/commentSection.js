"use client"

import { useState } from "react"
import styles from "../feed/stylesfeed.module.css"

export default function CommentSection({ comments, onAddComment, onClose }) {
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment("")
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
  </div>
))}

      </div>
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
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

