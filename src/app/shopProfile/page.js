"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../store/postSlice"
import { useRouter } from "next/navigation"
import styles from "../creatorFeedProfile/profile.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import Image from "next/image"
import Link from "next/link"
import Footer from "../components/FooterShop"
import Header from "../components/HeaderShop"
import api from "../services/api"
import { LikeProvider } from "../actions/LikeContext"
<<<<<<< HEAD

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/"
=======
import { BASE_URL } from "../services/api";
>>>>>>> 87a10b86bd0f13a52859a3d0a13831d7e1e54d09
const changeEscapeChar = (path) => path?.replace(/\\/g, "/") || ""

export default function Profile() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { posts, status, error } = useSelector((state) => state.posts)
  const [activeTab, setActiveTab] = useState("posts")
  const user = useSelector((state) => state.auth.user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) router.push(`/login?redirect=${encodeURIComponent("/CreatorHome")}`)
    if (status === "idle") dispatch(fetchPosts())
  }, [user, router, status, dispatch])

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id) try {
        await api.getUserPosts(user._id)
      } catch (err) { console.error("Error fetching posts:", err) }
      setIsLoading(false)
    }
    fetchUserData()
  }, [user])

  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "reels", label: "Reels" },
  ]

  const filteredPosts = posts.filter(post => 
    post.user?._id === user?._id && (
      activeTab === "reels" ? post.video : 
      post.images?.length > 0
    )
  )

  return (
     <LikeProvider>
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <Header />
        <div className={styles.container}>
          <section className={styles.profileInfo}>
            <div className={styles.profile}>
              <div className={styles.stats}>
                {[ 
                  ['posts', posts.filter(p => p.user?._id === user?._id).length], 
                  ['followers', user?.followers?.length], 
                  ['following', user?.following?.length]
                ].map(([label, value]) => (
                  <div key={label} className={styles.statItem}>
                    <span className={styles.statNumber}>{value}</span>
                    <span className={styles.statLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.profileActions}>
              <button className={styles.editButton}>Edit profile</button>
              <button className={styles.shareButton}>Share profile</button>
            </div>
          </section>

          <div className={styles.tabsContainer}>
            {tabs.map(tab => (
              <div 
                key={tab.id} 
                className={`${styles.tab} ${activeTab === tab.id && styles.activeTab}`} 
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>

          <div className={styles.contentGrid}>
            {isLoading || status === "loading" ? <div>Loading...</div> :
             status === "failed" ? <div>Error: {error}</div> :
             <div className={styles.gridContainer}>
              {filteredPosts.map(post => (
                <Link href={`/post/${post._id}`} key={post._id} className={styles.gridItem}>
                  {activeTab === "reels" ? (
                    <video className={styles.gridVideo} width={300} height={300}>
                      <source src={`${BASE_URL}${changeEscapeChar(post.video)}`} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={`${BASE_URL}${changeEscapeChar(post.images[0])}` || "/placeholder.svg"}
                      alt={`Post by ${post.user?.username || "unknown"}`}
                      className={styles.gridImage}
                      width={300}
                      height={300}
                    />
                  )}
                </Link>
              ))}
            </div>}
          </div>
        </div>
        <Footer />
      </div>
    </div>
    </LikeProvider>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 87a10b86bd0f13a52859a3d0a13831d7e1e54d09
