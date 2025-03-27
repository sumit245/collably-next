"use client"

import { useSelector, useDispatch } from "react-redux"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { User, Mail, Phone, Globe, Code, Clock, Heart } from "lucide-react"
import styles from "./page.module.css"
import styleSearch from "../search/SearchSection.module.css"
import styleShop from "../shop/StyleShop.module.css"
import { fetchSavedPosts } from "../store/postSlice"
import { fetchCreators } from "../store/creatorSlice"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const { savedPosts = [], savedPostsStatus, error } = useSelector((s) => s.posts)
  const allCreators = useSelector((state) => state.creators?.items || [])
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("info")
  const [collectionSubTab, setCollectionSubTab] = useState("Videos")

  useEffect(() => {
    if (activeTab === "saved" && savedPostsStatus === "idle") {
      dispatch(fetchSavedPosts())
    }
  }, [activeTab, savedPostsStatus, dispatch])

  useEffect(() => {
    if (activeTab === "following") {
      dispatch(fetchCreators())
    }
  }, [activeTab, dispatch])

 
  const handleLoginClick = () => {
    router.push(`/login?redirect=${encodeURIComponent('/userProfile')}`);
  };

  if (!user) {
    return (
      <div className={styles.bodyShop}>
        <div className={styles.smartphoneContainer}>
          <Header />
          <div className={styles.container}>
            <div className={styles.notLoggedIn}>
              <h2>Please log in to view your profile</h2>
              <button onClick={handleLoginClick} className={styles.loginButton}>
                Login / Sign Up
              </button>
            </div>
          </div>
          <Footer />
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

  // Filter saved posts based on selected sub-tab
  const filteredSavedPosts = savedPosts.filter((post) => {
    return collectionSubTab === "Videos" ? post.video : post.images?.length
  })

  // Get following creators
  const followingCreators =
    user.following && user.following.length > 0
      ? allCreators.filter((creator) => user.following.includes(creator._id))
      : []

  return (
    <div className={styleShop.bodyShop}>
        <div className={styleShop.smartphoneContainer}>
          <Header />
    <div className={styles.container}>
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

      <div className={styles.profileContent}>
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === "info" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("info")}
          >
            Personal Info
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "saved" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            Saved Items
          </button>
          {/* <button
            className={`${styles.tabButton} ${activeTab === "following" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button> */}
          <button
            className={`${styles.tabButton} ${activeTab === "activity" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "info" && (
            <div className={styles.infoTab}>
              <div className={styles.infoCard}>
                <h3>Contact Information</h3>
                <div className={styles.infoItem}>
                  <Mail className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoLabel}>Email</p>
                    <p className={styles.infoValue}>{user.email}</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Phone className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoLabel}>Phone</p>
                    <p className={styles.infoValue}>{user.contactNumber || "Not provided"}</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Globe className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoLabel}>Website</p>
                    <p className={styles.infoValue}>{user.website || "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3>Personal Details</h3>
                <div className={styles.infoItem}>
                  <User className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoLabel}>Gender</p>
                    <p className={styles.infoValue}>
                      {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "Not provided"}
                    </p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Code className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoLabel}>Referral Code</p>
                    <p className={styles.infoValue}>{user.referralCode}</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Clock className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoLabel}>Member Since</p>
                    <p className={styles.infoValue}>{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>

              {user.address && (
                <div className={styles.infoCard}>
                  <h3>Address</h3>
                  <p className={styles.address}>{user.address || "No address provided"}</p>
                </div>
              )}

              {user.story && (
                <div className={styles.infoCard}>
                  <h3>About Me</h3>
                  <p className={styles.story}>{user.story || "No bio provided"}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "saved" && (
            <div className={styleSearch.collectionsContainer}>
              <div className={styleSearch.subTabs}>
                {["Videos", "Images"].map((id) => (
                  <button
                    key={id}
                    className={`${styleSearch.subTab} ${collectionSubTab === id ? styleSearch.activeSubTab : ""}`}
                    onClick={() => setCollectionSubTab(id)}
                  >
                    {id}
                  </button>
                ))}
              </div>

              {savedPostsStatus === "loading" ? (
                <div>Loading...</div>
              ) : filteredSavedPosts.length > 0 ? (
                <div className={styleSearch.gridContainer}>
                  {filteredSavedPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/${collectionSubTab === "Videos" ? "feed?reelId=" : "post/"}${post._id}`}
                      className={styleSearch.gridItem}
                    >
                      {collectionSubTab === "Videos" ? (
                        <video
                          src={post.video}
                          className={styleSearch.gridVideo}
                          width={300}
                          height={300}
                          muted
                          preload="metadata"
                        />
                      ) : (
                        <Image
                          src={post.images[0]?.[0] || "/placeholder.svg"}
                          alt={`Post by ${post.user?.username || "unknown"}`}
                          className={styleSearch.gridImage}
                          width={300}
                          height={300}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={styleSearch.emptyState}>No saved {collectionSubTab.toLowerCase()} found</div>
              )}
            </div>
          )}

          {activeTab === "following" && (
            <div className={styles.followingTab}>
              <div className={styleShop.sectionHeader}>
                <h4 className={styleShop.sectionTitleShop}>Creators You Follow</h4>
              </div>
              {followingCreators.length > 0 ? (
                <div className={styleShop.creator}>
                  {followingCreators.map((creator) => (
                    <Link href={`/creator/${creator._id}`} key={creator._id} className={styleShop.creatorLink}>
                      <div className={styleShop.fImg1}>
                        <div className={styleShop.imgBorder}>
                          <Image
                            src={creator.avatar || "/placeholder.svg"}
                            alt={creator.fullname}
                            width={85}
                            height={85}
                          />
                        </div>
                        <span className={styleShop.imgText2}>{creator.fullname.split(" ")[0]}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>You're not following any creators yet</div>
              )}
            </div>
          )}

          {activeTab === "activity" && (
            <div className={styles.activityTab}>
              <h3>Recent Activity</h3>
              <div className={styles.activityInfo}>
                <div className={styles.activityItem}>
                  <p className={styles.activityDate}>Last Updated: {formatDate(user.updatedAt)}</p>
                </div>
                <div className={styles.followSection}>
                  <h4>Following ({user.following?.length || 0})</h4>
                  {user.following && user.following.length > 0 ? (
                    <div className={styles.followGrid}>
                      {user.following.map((follow, index) => (
                        <div key={index} className={styles.followItem}>
                          <Heart className={styles.followIcon} />
                          <p>User ID: {follow}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.emptyState}>You're not following anyone yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
     <Footer />
            </div>
          </div>
  )
}

export default ProfilePage

