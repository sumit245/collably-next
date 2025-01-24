"use client";

import { Search, Home, Plus, Video, User, Heart, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';
import styles from "./profile.module.css";
import stylesShop from "../shop/StyleShop.module.css";
import Image from "next/image";
import FooterCreator from "../components/FooterCreator";

export default function Profile() {
  const posts = [
    {
      id: 1,
      image: "/images/image22.webp",
      likes: 124,
      comments: 12,
    },
    {
      id: 2,
      image: "/images/image25.jpeg",
      likes: 89,
      comments: 8,
    },
    {
      id: 3,
      image: "/images/image26.webp",
      likes: 256,
      comments: 24,
    },
    {
      id: 4,
      image: "/images/image28.webp",
      likes: 167,
      comments: 15,
    },
    {
      id: 5,
      image: "/images/image31.jpg",
      likes: 198,
      comments: 18,
    },
  ];

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          {/* Profile Header */}
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.lockIcon}>🔒</span>
              <span className={styles.username}>collably_creator</span>
              <span className={styles.dropdown}>▼</span>
            </div>
            <div className={styles.headerRight}>
              <button className={styles.iconButton}>
                <Plus />
              </button>
              <button className={styles.menuButton}>☰</button>
            </div>
          </header>

          {/* Profile Info */}
          <section className={styles.profileInfo}>
            <div className={styles.profile}>
              <div className={styles.profileImageContainer}>
                <Image
                  src="/images/image26.webp"
                  alt="Profile"
                  width={70}
                  height={70}
                  className={styles.profileImage}
                />
                <button className={styles.addButton}>+</button>
              </div>

              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>5</span>
                  <span className={styles.statLabel}>posts</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>2</span>
                  <span className={styles.statLabel}>followers</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>145</span>
                  <span className={styles.statLabel}>following</span>
                </div>
              </div>
            </div>

            <p className={styles.bio}>collably Content Creator</p>

            <div className={styles.profileActions}>
              <button className={styles.editButton}>Edit profile</button>
              <button className={styles.shareButton}>Share profile</button>
              <button className={styles.addPeopleButton}>
                <User size={20} />
              </button>
            </div>
          </section>

          {/* Posts Grid */}
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postItem}>
                <div className={styles.postImageContainer}>
                  <Image
                    src={post.image}
                    alt={`Post ${post.id}`}
                    width={300}
                    height={300}
                    className={styles.postImage}
                  />
                  <div className={styles.postOverlay}>
                    <div className={styles.postStats}>
                      <span className={styles.postStat}>
                        <Heart size={20} /> {post.likes}
                      </span>
                      <span className={styles.postStat}>
                        <MessageCircle size={20} /> {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FooterCreator />
      </div>
    </div>
  );
}