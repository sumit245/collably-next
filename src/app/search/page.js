"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts, fetchSavedPosts } from "../store/postSlice"
import styles from "./SearchSection.module.css"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import { LikeProvider } from "../actions/LikeContext"
import Image from "next/image"
import { ChevronDown, Search } from 'lucide-react'
import Link from "next/link"

const BASE_URL = "http://localhost:5000/"

const changeEscapeChar = (path) => path.replace(/\\/g, "/")

export default function SearchSection() {
  const dispatch = useDispatch()
  const { posts = [], savedPosts = [], status, savedPostsStatus, error } = useSelector((state) => state.posts)
  const [activeTab, setActiveTab] = useState("reels")
  const [collectionSubTab, setCollectionSubTab] = useState("videos")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedGender, setSelectedGender] = useState("All")

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts())
    }
  }, [status, dispatch])

  useEffect(() => {
    if (activeTab === "collections" && savedPostsStatus === "idle") {
      dispatch(fetchSavedPosts()).then((result) => {
        console.log("Saved Posts API Response:", result)
      })
    }
  }, [activeTab, savedPostsStatus, dispatch])

  const tabs = [
    { id: "reels", label: "Reels" },
    { id: "posts", label: "Posts" },
    { id: "collections", label: "Collections" },
  ]

  const collectionTabs = [
    { id: "videos", label: "Videos" },
    { id: "images", label: "Images" },
  ]

  const categories = ["All Categories", "Fashion", "Electronics", "Home", "Beauty"]
  const genders = ["All", "Men", "Women", "Unisex"]

  const renderContent = () => {
    if (activeTab === "collections" && savedPostsStatus === "loading") {
      return <div>Loading saved posts...</div>
    }

    if (activeTab !== "collections" && status === "loading") {
      return <div>Loading...</div>
    }

    if ((activeTab === "collections" && savedPostsStatus === "failed") || 
        (activeTab !== "collections" && status === "failed")) {
      return <div>Error: {error}</div>
    }

    const postsToUse = activeTab === "collections" ? (savedPosts || []) : (posts || [])
    
    const filteredPosts = postsToUse.filter((post) => {
      if (!post) return false
      if (searchQuery && post.content && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (activeTab === "reels" && !post.video) return false
      if (activeTab === "posts" && !(post.images && post.images.length)) return false
      return true
    })

    switch (activeTab) {
      case "reels":
        return (
          <div className={styles.gridContainer}>
            {filteredPosts.map((post) => (
              <Link href={`/feed?reelId=${post._id}`} key={post._id} className={styles.gridItem}>
                <video src={`${BASE_URL}${changeEscapeChar(post.video)}`} className={styles.gridVideo} width={300} height={300} />
              </Link>
            ))}
          </div>
        )
      case "posts":
        return (
          <div className={styles.gridContainer}>
            {filteredPosts.map((post) => (
              <Link href={`/post/${post._id}`} key={post._id} className={styles.gridItem}>
                <Image
                  src={`${BASE_URL}${changeEscapeChar(post.images[0])}` || "/placeholder.svg"}
                  alt={`Post by ${post.user?.username || "unknown"}`}
                  className={styles.gridImage}
                  width={300}
                  height={300}
                />
              </Link>
            ))}
          </div>
        )
      case "collections":
        const collectionContent = filteredPosts.filter(post => {
          if (collectionSubTab === "videos") return post.video
          if (collectionSubTab === "images") return post.images?.length
          return true
        })

        return (
          <div className={styles.collectionsContainer}>
            <div className={styles.subTabs}>
              {collectionTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.subTab} ${collectionSubTab === tab.id ? styles.activeSubTab : ""}`}
                  onClick={() => setCollectionSubTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {collectionContent.length === 0 ? (
              <div className={styles.emptyState}>
                No saved {collectionSubTab} found
              </div>
            ) : (
              <div className={styles.gridContainer}>
                {collectionContent.map((post) => (
                  <Link 
                    href={`/${collectionSubTab === "videos" ? 'feed?reelId=' : 'post/'}${post._id}`} 
                    key={post._id} 
                    className={styles.gridItem}
                  >
                    {collectionSubTab === "videos" ? (
                      <video 
                        src={`${BASE_URL}${changeEscapeChar(post.video)}`}
                        className={styles.gridVideo}
                        width={300}
                        height={300}
                        muted
                        preload="metadata"
                      />
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
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }
  //     default:
  //       return null
  //   }
  // }

  return (
    <LikeProvider>
      <div className={styles.container}>
        <Header />

        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for products, reels & creators"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filtersContainer}>
          <button className={styles.filterButton}>
            <svg
              width="14"
              height="14"
              className={styles.navIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            Sort By
          </button>

          <button className={styles.filterButton}>All Filters</button>

          <div className={styles.customSelect}>
            <select
              className={styles.filterSelect}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option className={styles.dropdownItem} key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className={styles.selectIcon} />
          </div>

          <div className={styles.customSelect}>
            <select
              className={styles.filterSelect}
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              {genders.map((gender, index) => (
                <option className={styles.itemContainer} key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <ChevronDown className={styles.selectIcon} />
          </div>
        </div>

        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div className={styles.contentGrid}>{renderContent()}</div>

        <Footer />
      </div>
    </LikeProvider>
  )
}