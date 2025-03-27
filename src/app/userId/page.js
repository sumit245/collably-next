"use client"

import { useSelector, useDispatch } from "react-redux"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { User, Mail, Phone, Globe, Code, Clock, Heart } from "lucide-react"
import styles from "../userProfileShop/page.module.css"
import styleShop from "../shop/StyleShop.module.css"
import { fetchSavedPosts } from "../store/postSlice"
import { fetchCreators } from "../store/creatorSlice"
import Header from "../components/HeaderShop"
import FooterCreator from "../components/FooterCreator"
import { useRouter } from 'next/navigation';
import CreatorHome from "../components/CreatorHome"

const ProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const { savedPosts = [], savedPostsStatus, error } = useSelector((s) => s.posts)
  const allCreators = useSelector((state) => state.creators?.items || [])
  const router = useRouter();
  
  useEffect(() => {
    if (savedPostsStatus === "idle") {
      dispatch(fetchSavedPosts())
    }
  }, [savedPostsStatus, dispatch])

  const handleLoginClick = () => {
    router.push(`/login?redirect=${encodeURIComponent('/userProfile')}`);
  };

  if (!user) {
    return (
      <div className={styles.bodyShop}>
        <div className={styles.smartphoneContainer}>
          <CreatorHome />
          <div className={styles.container}>
            <div className={styles.notLoggedIn}>
              <h2>Please log in to view your profile</h2>
              <button onClick={handleLoginClick} className={styles.loginButton}>
                Login / Sign Up
              </button>
            </div>
          </div>
          <FooterCreator />
        </div>
      </div>
    );
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Format user ID for better readability
  const formatUserId = (userId) => {
    if (!userId) return "";
    return `${userId.slice(0, 8)}-${userId.slice(8, 16)}-${userId.slice(16, 24)}`;
  }

  // Filter saved posts based on selected sub-tab
  const filteredSavedPosts = savedPosts.filter((post) => {
    return post.video || post.images?.length
  })

  // Get following creators
  const followingCreators =
    user.following && user.following.length > 0
      ? allCreators.filter((creator) => user.following.includes(creator._id))
      : []

  return (
    <div className={styleShop.bodyShop}>
      <div className={styleShop.smartphoneContainer}>
        <CreatorHome />
        <div className={styles.container1}>
          <div className={styles.profileHeader}>
            <div className={styles.coverPhoto}></div>
            <div className={styles.profileInfo}>
              <div className={styles.avatarContainer}>
                <Image
                  src={user.avatar || "/images/banavt1.png"}
                  alt="User Avatar"
                  width={120}
                  height={120}
                  className={styles.avatar}
                />
              </div>
              <div className={styles.userDetails}>
                <h1>{user.fullname}</h1>
                <p className={styles.username}>@{user.username}</p>
                <p className={styles.userId}>User ID: {formatUserId(user._id)}</p> {/* Display formatted User ID */}
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>{user.followers?.length || 0}</span>
                    <span className={styles.statLabel}>Followers</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>{user.following?.length || 0}</span>
                    <span className={styles.statLabel}>Following</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>{user.saved?.length || 0}</span>
                    <span className={styles.statLabel}>Saved</span>
                  </div>
                </div>
              </div>
              <div className={styles.editProfileBtn}>
                <Link href="/updateUser" className={styles.editButton}>
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
{/* 
          <div className={styles.profileContent}>
            <div className={styles.tabsContainer}>
              <button
                className={`${styles.tabButton}`}
                onClick={() => {}}
              >
                Personal Info
              </button>
              <button
                className={`${styles.tabButton}`}
                onClick={() => {}}
              >
                Saved Items
              </button>
              <button
                className={`${styles.tabButton}`}
                onClick={() => {}}
              >
                Activity
              </button>
            </div>

            <div className={styles.tabContent}>
              <div className={styles.collectionsContainer}>
                {savedPostsStatus === "loading" ? (
                  <div>Loading...</div>
                ) : filteredSavedPosts.length > 0 ? (
                  <div className={styles.gridContainer}>
                    {filteredSavedPosts.map((post) => (
                      <Link
                        key={post._id}
                        href={`/${post.video ? "feed?reelId=" : "post/"}${post._id}`}
                        className={styles.gridItem}
                      >
                        {post.video ? (
                          <video
                            src={post.video}
                            className={styles.gridVideo}
                            width={300}
                            height={300}
                            muted
                            preload="metadata"
                          />
                        ) : (
                          <Image
                            src={post.images[0]?.[0] || "/placeholder.svg"}
                            alt={`Post by ${post.user?.username || "unknown"}`}
                            className={styles.gridImage}
                            width={300}
                            height={300}
                          />
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>No saved items found</div>
                )}
              </div>
            </div>
          </div> */}
        </div>
        <FooterCreator />
      </div>
    </div>
  );
}

export default ProfilePage;
