"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../store/postSlice"
import { useRouter, useParams } from "next/navigation"
import styles from "../creatorFeedProfile/profile.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import Image from "next/image"
import Link from "next/link"
import Footer from "../components/FooterShop"
import Header from "../components/HeaderShop"
import api from "../services/api"
import { LikeProvider } from "../actions/LikeContext"
import { BASE_URL } from "../services/api"

const changeEscapeChar = (path) => path?.replace(/\\/g, "/") || ""

export default function CreatorProfile() {
  const router = useRouter()
  const params = useParams()
  const creatorId = params?.id
  const dispatch = useDispatch()
  const { posts, status, error } = useSelector((state) => state.posts)
  const [activeTab, setActiveTab] = useState("posts")
  const [creator, setCreator] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = useSelector((state) => state.auth.user)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (!creatorId) {
      router.push("/creatorDisplay")
      return
    }

    if (status === "idle") {
      dispatch(fetchPosts())
    }
  }, [creatorId, router, status, dispatch])

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (creatorId) {
        try {
          const response = await api.fetch(`/user/${creatorId}`)
          if (response.user) {
            setCreator(response.user)
            if (currentUser && response.user.followers) {
              setIsFollowing(response.user.followers.includes(currentUser._id))
            }
          }
        } catch (err) {
          console.error("Error fetching creator:", err)
        }
        setIsLoading(false)
      }
    }
    fetchCreatorData()
  }, [creatorId, currentUser])

  const handleFollowToggle = async () => {
    if (!currentUser) {
      router.push(`/login?redirect=${encodeURIComponent(`/creator/${creatorId}`)}`)
      return
    }

    try {
      if (isFollowing) {
        await api.unfollowUser(creatorId)
      } else {
        await api.followUser(creatorId)
      }
      setIsFollowing(!isFollowing)

      const response = await api.fetch(`/user/${creatorId}`)
      if (response.user) {
        setCreator(response.user)
      }
    } catch (error) {
      console.error("Follow toggle error:", error)
    }
  }

  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "reels", label: "Reels" },
  ]

  const filteredPosts = posts.filter(
    (post) => post.user?._id === creatorId && (activeTab === "reels" ? post.video : post.images?.length > 0),
  )

  if (isLoading) {
    return (
      <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />
          <div className={styles.container}>
            <div>Loading...</div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  if (!creator) {
    return (
      <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />
          <div className={styles.container}>
            <div>Creator not found</div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <LikeProvider>
       <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />
          <div className={styles.container}>
            <section className={styles.profileInfo}>
              <div className={styles.profileHeader}>
                <div className={styles.profileSubHeader}>
                <Image
                  src={creator.avatar || "/placeholder.svg"}
                  alt={creator.fullname || creator.username || "Creator"}
                  width={100}
                  height={100}
                  className={styles.profileImage}
                />
                <span>
                  {" "}
                  <h2 className={styles.profileName}>
                    {creator.fullname || creator.username}
                  </h2>
                </span>
                </div>
                <div className={styles.stats}>
                  {[
                    ["posts", filteredPosts.length],
                    ["followers", creator?.followers?.length || 0],
                    ["following", creator?.following?.length || 0],
                  ].map(([label, value]) => (
                    <div key={label} className={styles.statItem}>
                      <span className={styles.statNumber}>{value}</span>
                      <span className={styles.statLabel}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.profileActions}>
                {currentUser && currentUser._id !== creatorId && (
                  <button
                    className={`${styles.followButton} ${isFollowing ? styles.followingButton : ""}`}
                    onClick={handleFollowToggle}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            </section>

            <div className={styles.tabsContainer}>
              {tabs.map((tab) => (
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
              {status === "loading" ? (
                <div>Loading posts...</div>
              ) : status === "failed" ? (
                <div>Error: {error}</div>
              ) : (
                <div className={styles.gridContainer}>
                  {filteredPosts.length === 0 ? (
                    <div className={styles.noContent}>No {activeTab} to display</div>
                  ) : (
                    filteredPosts.map((post) => (
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
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}

