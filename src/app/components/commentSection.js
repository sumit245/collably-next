"use client";

import { useState } from "react";
import styles from "../feed/stylesfeed.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";
import { useRouter } from "next/navigation";

export default function CommentSection({
  comments,
  onAddComment,
  onClose,
  postId,
}) {
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  console.log("Initial comments:", comments); // Log all comments initially

  const [likedComments, setLikedComments] = useState(
    comments.reduce((acc, comment) => {
      console.log("Processing comment ID:", comment._id); // Log each comment's _id
      acc[comment._id] = comment.isLiked || false;
      return acc;
    }, {})
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        await onAddComment(newComment);
        console.log("Added new comment:", newComment);
        setNewComment("");
        router.refresh();
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      console.log("Liking/unliking comment ID:", commentId); // Log comment ID when liked/unliked

      const newLikedComments = { ...likedComments };
      newLikedComments[commentId] = !newLikedComments[commentId];

      setLikedComments(newLikedComments);

      if (newLikedComments[commentId]) {
        await api.likeComment(commentId);
        console.log("Liked comment ID:", commentId);
      } else {
        await api.unlikeComment(commentId);
        console.log("Unliked comment ID:", commentId);
      }
    } catch (error) {
      console.error("Error liking/unliking comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    console.log("Attempting to delete comment ID:", commentId); // Log before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      await api.deleteComment(commentId);
      console.log("Deleted comment ID:", commentId); // Log after successful deletion

      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      onAddComment(updatedComments);
      onClose();
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
        {[...new Set(comments)].map((comment) => {
          console.log("Rendering comment ID:", comment._id); // Log when rendering each comment
          return (
            <div key={comment._id} className={styles.comment}>
              <div className={styles.commentContent}>
                <strong>{comment.user?.username || "Anonymous"}: </strong>
                <span>{comment.text || comment.content}</span>
                <div className={styles.commentActions}>
                  <button
                    onClick={() => handleLikeComment(comment._id)}
                    className={styles.likeButton}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={
                        likedComments[comment._id]
                          ? styles.liked
                          : styles.unliked
                      }
                    />
                    {comment.likesCount}
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className={styles.deleteButton}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
  );
}
