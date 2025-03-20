"use client";

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts, fetchSavedPosts } from "../store/postSlice"
import styles from "./SearchSection.module.css"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import { LikeProvider } from "../actions/LikeContext"
import Image from "next/image"
import { ChevronDown, Search } from "lucide-react"
import Link from "next/link"
import { BASE_URL } from "../services/api";

export default function SearchSection() {
  const dispatch = useDispatch()
  const { posts = [], savedPosts = [], status, savedPostsStatus, error } = useSelector(s => s.posts)
  const [activeTab, setActiveTab] = useState("Reels")
  const [collectionSubTab, setCollectionSubTab] = useState("Videos")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => { status === "idle" && dispatch(fetchPosts()) }, [status, dispatch])
  useEffect(() => { 
    activeTab === "Collections" && savedPostsStatus === "idle" && dispatch(fetchSavedPosts())
  }, [activeTab, savedPostsStatus, dispatch])

  const filteredPosts = (activeTab === "Collections" ? savedPosts : posts).filter(post => 
    post && (!searchQuery || post.content?.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const renderContent = () => {
    if ([status, savedPostsStatus].includes("loading")) return <div>Loading...</div>
    if ([status, savedPostsStatus].includes("failed")) return <div>Error: {error}</div>

    const content = filteredPosts.filter(post => {
      if (activeTab === "Reels") return post.video
      if (activeTab === "Posts") return post.images?.length
      return collectionSubTab === "Videos" ? post.video : post.images?.length
    })

    return activeTab === "Collections" ? (
      <div className={styles.collectionsContainer}>
        <div className={styles.subTabs}>
          {["Videos", "Images"].map(id => (
            <button key={id} className={`${styles.subTab} ${collectionSubTab === id ? styles.activeSubTab : ""}`}
              onClick={() => setCollectionSubTab(id)}>{id}</button>
          ))}
        </div>
        {content.length ? (
          <div className={styles.gridContainer}>
            {content.map(post => (
              <Link key={post._id} href={`/${collectionSubTab === "Videos" ? "feed?reelId=" : "post/"}${post._id}`}
                className={styles.gridItem}>
                {collectionSubTab === "Videos" ? (
                  <video src={post.video} className={styles.gridVideo} 
                    width={300} height={300} muted preload="metadata" />
                ) : (
                  <Image src={post.images[0]?.[0] || "/placeholder.svg"} 
                    alt={`Post by ${post.user?.username || "unknown"}`} className={styles.gridImage} 
                    width={300} height={300} />
                )}
              </Link>
            ))}
          </div>
        ) : <div className={styles.emptyState}>No saved {collectionSubTab} found</div>}
      </div>
    ) : (
      <div className={styles.gridContainer}>
        {content.map(post => (
          <Link key={post._id} href={`/${activeTab === "Reels" ? "feed?reelId=" : "post/"}${post._id}`} 
            className={styles.gridItem}>
            {activeTab === "Reels" ? (
              <video src={post.video} className={styles.gridVideo} 
                width={300} height={300} />
            ) : (
              <Image src={post.images[0]?.[0] || "/placeholder.svg"} 
                alt={`Post by ${post.user?.username || "unknown"}`} className={styles.gridImage} 
                width={300} height={300} />
            )}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <LikeProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input type="text" placeholder="Search for products, reels & creators" 
              className={styles.searchInput} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
        <div className={styles.filtersContainer}>
          {["Sort By", "All Filters"].map(label => (
            <button key={label} className={styles.filterButton}>{label}</button>
          ))}
          {[["All Categories", "Fashion", "Electronics", "Home", "Beauty"], ["All", "Men", "Women", "Unisex"]].map((options, i) => (
            <div key={i} className={styles.customSelect}>
              <select className={styles.filterSelect} onChange={e => i ? setSelectedGender : setSelectedCategory(e.target.value)}>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <ChevronDown className={styles.selectIcon} />
            </div>
          ))}
        </div>
        <div className={styles.tabsContainer}>
          {["Reels", "Posts", "Collections"].map(id => (
            <div key={id} className={`${styles.tab} ${activeTab === id ? styles.activeTab : ""}`} 
              onClick={() => setActiveTab(id)}>{id}</div>
          ))}
        </div>
        <div className={styles.contentGrid}>{renderContent()}</div>
        <Footer />
      </div>
    </LikeProvider>
  );
}