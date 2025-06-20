"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts, fetchSavedPosts } from "../store/postSlice"
import { useRouter, useParams } from "next/navigation"
import styles from "../creator/[id]/page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import stylesSearch from "../search/SearchSection.module.css"
import Image from "next/image"
import Link from "next/link"
import Footer from "../components/FooterShop"
import Header from "../components/HeaderShop"
import api from "../services/api"
import { LikeProvider } from "../actions/LikeContext"

export default function CreatorProfile() {
  const router = useRouter()
  const params = useParams()
  const creatorId = params?.id
  const dispatch = useDispatch()
  const { posts, savedPosts = [], status, savedPostsStatus, error } = useSelector((state) => state.posts)
  const [activeTab, setActiveTab] = useState("posts")
  const [collectionSubTab, setCollectionSubTab] = useState("Videos")
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
    if (activeTab === "collections" && savedPostsStatus === "idle") {
      dispatch(fetchSavedPosts())
    }
  }, [activeTab, savedPostsStatus, dispatch])

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
    { id: "collections", label: "Collections" },
  ]

  const getFilteredContent = () => {
    if (activeTab === "collections") {
      // Show ALL saved posts (like in search.js), not filtered by creator
      return savedPosts.filter((post) => {
        if (!post) return false
        return collectionSubTab === "Videos" ? post.video : post.images?.length > 0
      })
    } else {
      // Regular posts and reels filtering for the specific creator
      return posts.filter(
        (post) => post.user?._id === creatorId && (activeTab === "reels" ? post.video : post.images?.length > 0),
      )
    }
  }

  const filteredPosts = getFilteredContent()

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
                    <h2 className={styles.profileName}>{creator.fullname || creator.username}</h2>
                  </span>
                </div>
                <div className={styles.stats}>
                  {(() => {
                    const totalPostsCount = posts.filter((post) => post.user?._id === creatorId).length

                    return [
                      ["posts", totalPostsCount],
                      ["followers", creator?.followers?.length || 0],
                      ["following", creator?.following?.length || 0],
                    ].map(([label, value]) => (
                      <div key={label} className={styles.statItem}>
                        <span className={styles.statNumber}>{value}</span>
                        <span className={styles.statLabel}>{label}</span>
                      </div>
                    ))
                  })()}
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

            {activeTab === "collections" && (
              <div className={stylesSearch.subTabs}>
                {["Videos", "Images"].map((id) => (
                  <button
                    key={id}
                    className={`${stylesSearch.subTab} ${collectionSubTab === id ? stylesSearch.activeSubTab : ""}`}
                    onClick={() => setCollectionSubTab(id)}
                  >
                    {id}
                  </button>
                ))}
              </div>
            )}

            <div className={styles.contentGrid}>
              {status === "loading" || (activeTab === "collections" && savedPostsStatus === "loading") ? (
                <div className={activeTab === "collections" ? stylesSearch.loadingState : ""}>
                  Loading {activeTab === "collections" ? "saved posts" : "posts"}...
                </div>
              ) : status === "failed" || savedPostsStatus === "failed" ? (
                <div className={activeTab === "collections" ? stylesSearch.errorState : ""}>Error: {error}</div>
              ) : (
                <div className={activeTab === "collections" ? stylesSearch.gridContainer : styles.gridContainer}>
                  {filteredPosts.length === 0 ? (
                    <div className={activeTab === "collections" ? stylesSearch.emptyState : styles.noContent}>
                      {activeTab === "collections"
                        ? `No saved ${collectionSubTab.toLowerCase()}`
                        : `No ${activeTab} to display`}
                    </div>
                  ) : (
                    filteredPosts.map((post) => {
                      const isVideo =
                        activeTab === "reels" || (activeTab === "collections" && collectionSubTab === "Videos")
                      const linkPath = isVideo ? `/feed/${post._id}` : `/post/${post._id}`

                      return (
                        <Link
                          href={linkPath}
                          key={post._id}
                          className={activeTab === "collections" ? stylesSearch.gridItem : styles.gridItem}
                        >
                          {isVideo ? (
                            <video
                              className={activeTab === "collections" ? stylesSearch.gridVideo : styles.gridVideo}
                              width={300}
                              height={300}
                              muted
                              preload="metadata"
                            >
                              <source src={post.video} type="video/mp4" />
                            </video>
                          ) : (
                            <Image
                              src={post.images?.[0] || "/placeholder.svg"}
                              alt={`Post by ${post.user?.username || "unknown"}`}
                              className={activeTab === "collections" ? stylesSearch.gridImage : styles.gridImage}
                              width={300}
                              height={300}
                            />
                          )}
                        </Link>
                      )
                    })
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
