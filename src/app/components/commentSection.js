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

  const [likedComments, setLikedComments] = useState(
    comments.reduce((acc, comment) => {
      acc[comment._id] = comment.isLiked || false;
      return acc;
    }, {})
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        await onAddComment(newComment);
        setNewComment("");
        router.refresh();
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleLikeComment = async (commentId) => {
    try {

      const newLikedComments = { ...likedComments };
      newLikedComments[commentId] = !newLikedComments[commentId];

      setLikedComments(newLikedComments);

      if (newLikedComments[commentId]) {
        await api.likeComment(commentId);
      } else {
        await api.unlikeComment(commentId);
      }
    } catch (error) {
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      await api.deleteComment(commentId);

      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      onAddComment(updatedComments);
      onClose();
    } catch (error) {
    }
  };

  return (
    <div className={styles.commentSection}>
      <button onClick={onClose} className={styles.closeButtonComment}>
        &times;
      </button>
      <div className={styles.comments}>
        {[...new Set(comments)].map((comment) => {
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
