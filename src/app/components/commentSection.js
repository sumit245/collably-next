"use client"

import { useState } from "react"
import styles from "../feed/stylesfeed.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import api from "../services/api"

export default function CommentSection({
  comments,
  onAddComment,
  onClose,
  postId
}) {
  const [newComment, setNewComment] = useState("")

  // Track the liked state of each comment
  const [likedComments, setLikedComments] = useState(
    comments.reduce((acc, comment) => {
      acc[comment._id] = comment.isLiked || false; // Initialize liked state
      return acc;
    }, {})
  )

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

  const handleLikeComment = async (commentId) => {
    try {
      // Toggle the liked state
      const newLikedComments = { ...likedComments }
      newLikedComments[commentId] = !newLikedComments[commentId]

      // Update local state
      setLikedComments(newLikedComments)

      // Call API to update like status
      if (newLikedComments[commentId]) {
        await api.likeComment(commentId)
      } else {
        await api.unlikeComment(commentId)
      }
    } catch (error) {
      console.error("Error liking/unliking comment:", error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;
  
    try {
      await api.deleteComment(commentId);
      
      // Remove the deleted comment from the UI
      const updatedComments = comments.filter(comment => comment._id !== commentId);
      onAddComment(updatedComments); // Update the comments state
  
      onClose(); // Close the chatbox after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  

  return (
    <div className={styles.commentSection}>
      <button onClick={onClose} className={styles.closeButtonComment}>
        &times;
      </button>
      <div className={styles.comments}>
        {[...new Set(comments)].map((comment) => (
          <div key={comment._id} className={styles.comment}>
            <div className={styles.commentContent}>
              <strong>{comment.user?.user.username || "Anonymous"}: </strong>
              <span>{comment.text || comment.content}</span>
              <div className={styles.commentActions}>
              {/* Like/Unlike button */}
              <button 
                onClick={() => handleLikeComment(comment._id)} 
                className={styles.likeButton}
              >
                <FontAwesomeIcon 
                  icon={faHeart} 
                  className={likedComments[comment._id] ? styles.liked : styles.unliked} 
                />
                {comment.likesCount}
              </button>

              {/* Delete button */}
              <button onClick={() => handleDeleteComment(comment._id)} className={styles.deleteButton}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
            </div>
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