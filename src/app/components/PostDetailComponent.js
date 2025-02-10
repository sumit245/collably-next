"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ArrowLeft,
} from "lucide-react";
import styles from "../postDetails/postDetails.module.css";

export default function PostDetail({ posts, initialPostId, onBack }) {
  const [currentPostId, setCurrentPostId] = useState(initialPostId);
  const currentPost = posts.find((post) => post.id === currentPostId);

  if (!currentPost) return null;

  return (
    <div className={styles.postDetail}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className={styles.mainPost}>
        <div className={styles.userInfo}>
          <Image
            src={currentPost.user.avatar || "/placeholder.svg"}
            alt={currentPost.user.username}
            width={32}
            height={32}
            className={styles.avatar}
          />
          <span className={styles.username}>{currentPost.user.username}</span>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src={currentPost.image || "/placeholder.svg"}
            alt={`Post ${currentPost.id}`}
            layout="fill"
            objectFit="cover"
            className={styles.postImage}
          />
        </div>

        <div className={styles.postActions}>
          <button className={styles.actionButton}><Heart size={24} /></button>
          <button className={styles.actionButton}><MessageCircle size={24} /></button>
          <button className={styles.actionButton}><Send size={24} /></button>
          <button className={styles.actionButton}><Bookmark size={24} /></button>
        </div>

        <div className={styles.likes}>{currentPost.likes} likes</div>
        <div className={styles.caption}>
          <span className={styles.username}>{currentPost.user.username}</span> {currentPost.caption}
        </div>
        <div className={styles.comments}>View all {currentPost.comments} comments</div>
      </div>
    </div>
  );
}
