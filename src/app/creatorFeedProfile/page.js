"use client";

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../store/postSlice"
import styles from "./profile.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import Image from "next/image"
import Link from "next/link"
import FooterCreator from "../components/FooterCreator"
import CreatorHome from '../components/CreatorHome'
import { Heart, MessageCircle } from 'lucide-react'
import api from "../services/api"
import { useRouter } from "next/navigation"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000"

const changeEscapeChar = (path) => path.replace(/\\/g, "/")

export default function Profile() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { posts, status, error } = useSelector((state) => state.posts)
  const [activeTab, setActiveTab] = useState("posts")
  const user = useSelector((state) => state.auth.user)
// console.log(user.user._id)
useEffect(() => {
  if (!user) {
    
    router.push(`/login?redirect=${encodeURIComponent("/CreatorHome")}`)
  }
}, [user, router])

if (!user) {
  return null 
}
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        await api.getUserPosts(user.user._id);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    if (user?.user?._id) {

      fetchUserPosts()
    }
  }, [user])
console.log(posts)
  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "reels", label: "Reels" },
  ];

  const renderContent = () => {
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (status === "failed") {
      return <div>Error: {error}</div>;
    }

    const filteredPosts = posts.filter((post) => {
      if (!post.user || post.user._id !== user?.user?._id) return false;
      if (activeTab === "reels" && !post.video) return false;
      if (activeTab === "posts" && (!post.images || post.images.length === 0)) return false;
      return true;
    });
    

    switch (activeTab) {
      case "reels":
        return (
          <div className={styles.gridContainer}>
            {filteredPosts.map((post) => (
              <Link
                href={`/feed?reelId=${post._id}`}
                key={post._id}
                className={styles.gridItem}
              >
                <video
                  src={`${BASE_URL}${changeEscapeChar(post.video)}`}
                  className={styles.gridVideo}
                  width={300}
                  height={300}
                />
              </Link>
            ))}
          </div>
        );
      case "posts":
        return (
          <div className={styles.gridContainer}>
            {filteredPosts.map((post) => (
              <Link
                href={`/post/${post._id}`}
                key={post._id}
                className={styles.gridItem}
              >
                <Image
                  src={`${BASE_URL}/${changeEscapeChar(post.images[0])}` || "/placeholder.svg"}
                  alt={`Post by ${post.user?.username || "unknown"}`}
                  className={styles.gridImage}
                  width={300}
                  height={300}
                />
                {/* <div className={styles.postOverlay}>
                  <div className={styles.postStats}>
                    <span className={styles.postStat}>
                      <Heart size={20} /> {post.likes.length}
                    </span>
                    <span className={styles.postStat}>
                      <MessageCircle size={20} /> {post.comments.length}
                    </span>
                  </div>
                </div> */}
              </Link>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <CreatorHome />
        <div className={styles.container}>
          <section className={styles.profileInfo}>
            <div className={styles.profile}>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>
                    {
                      posts.filter((post) => post.user._id === user.user._id)
                        .length
                    }
                  </span>
                  <span className={styles.statLabel}>posts</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>
                    {user.user.followers.length}
                  </span>
                  <span className={styles.statLabel}>followers</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>
                    {user.user.following.length}
                  </span>
                  <span className={styles.statLabel}>following</span>
                </div>
              </div>
            </div>

            <div className={styles.profileActions}>
              <button className={styles.editButton}>Edit profile</button>
              <button className={styles.shareButton}>Share profile</button>
            </div>
          </section>

          <div className={styles.tabsContainer}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`${styles.tab} ${
                  activeTab === tab.id ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>

          <div className={styles.contentGrid}>{renderContent()}</div>
        </div>
        <FooterCreator />
      </div>
    </div>
  );
}
