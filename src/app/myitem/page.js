"use client";

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSavedPosts } from "../store/postSlice"
import styles from "../search/SearchSection.module.css"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import { LikeProvider } from "../actions/LikeContext"
import Image from "next/image"
import Link from "next/link"

export default function SearchSection() {
  const dispatch = useDispatch()
  const { savedPosts = [], savedPostsStatus, error } = useSelector(s => s.posts)
  const [collectionSubTab, setCollectionSubTab] = useState("Videos")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => { 
    savedPostsStatus === "idle" && dispatch(fetchSavedPosts())
  }, [savedPostsStatus, dispatch])

  const filteredPosts = savedPosts.filter(post => 
    post && (!searchQuery || post.content?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const content = filteredPosts.filter(post => 
    collectionSubTab === "Videos" ? post.video : post.images?.length
  )

  return (
    <LikeProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.noSavedProductContainer}>
          <h2 className={styles.noSavedProductHeading } >My saved product</h2>
        </div>
        <div className={styles.tabsContainer}>
          <div className={`${styles.tab} ${collectionSubTab === "Videos" ? styles.activeTab : ""}`} 
            onClick={() => setCollectionSubTab("Videos")}>Videos</div>
          <div className={`${styles.tab} ${collectionSubTab === "Images" ? styles.activeTab : ""}`} 
            onClick={() => setCollectionSubTab("Images")}>Images</div>
        </div>
        <div className={styles.contentGrid}>
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
          ) : <div className={styles.emptyStateCard}>
          <p className={styles.emptyStateText}>
            You have no items saved! Save products to find here
          </p>
          <Link href="/feed">
    <button className={styles.continueButton}>Continue Watching</button>
  </Link>
        </div>
        }
        
        </div>
        <Footer />
      </div>
    </LikeProvider>
  );
}